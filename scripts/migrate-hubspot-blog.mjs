import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import TurndownService from 'turndown';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const BLOG_DIR = path.join(ROOT, 'src', 'content', 'blog');
const IMAGE_DIR = path.join(ROOT, 'public', 'images', 'blog');
const API_BASE = 'https://api.hubapi.com/cms/v3/blogs';

const args = process.argv.slice(2);
const limit = args.includes('--limit')
  ? Number(args[args.indexOf('--limit') + 1])
  : undefined;
const dryRun = args.includes('--dry-run');
const clean = args.includes('--clean');

const token = process.env.HUBSPOT_TOKEN?.trim();
if (!token) {
  console.error('Mangler HUBSPOT_TOKEN. Kjør: npm run migrate:blog');
  process.exit(1);
}
if (token.startsWith('pat-na1-pat-na1')) {
  console.error('HUBSPOT_TOKEN ser ut til å ha dobbel "pat-na1-" prefiks.');
  console.error('Lim inn nøkkelen én gang, uten å legge til pat-na1- manuelt.');
  process.exit(1);
}

const turndown = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  emDelimiter: '_',
});

turndown.addRule('removeHubSpotCta', {
  filter: (node) =>
    node.nodeName === 'SPAN' &&
    (node.getAttribute?.('class') || '').includes('hs-cta'),
  replacement: () => '',
});

function slugToFilename(slug) {
  const normalized = slug.replace(/^blogg\//, '').replace(/\/$/, '');
  return normalized || 'untitled';
}

function escapeYaml(value) {
  return String(value).replace(/"/g, '\\"');
}

function sanitizeFilename(name) {
  return (
    decodeURIComponent(name)
      .replace(/[<>:"/\\|?*]/g, '-')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '') || 'image.jpg'
  );
}

function cleanHtml(html) {
  return html
    .replace(/\{%[\s\S]*?%\}/g, '')
    .replace(/\{\{cta\([^)]+\)\}\}/gi, '')
    .replace(/<!--more-->/gi, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/&nbsp;/gi, ' ')
    .replace(/<hr\s*\/?>/gi, '\n\n---\n\n')
    .replace(/<li>\s*<p[^>]*>([\s\S]*?)<\/p>\s*<\/li>/gi, '<li>$1</li>')
    .replace(/<p[^>]*>\s*(?:&nbsp;|\u00a0)?\s*<\/p>/gi, '')
    .replace(/<span[^>]*data-hs-cos-type=["'][^"']*["'][^>]*>[\s\S]*?<\/span>/gi, '');
}

function formatMarkdown(markdown) {
  return markdown
    .replace(/\{%[\s\S]*?%\}/g, '')
    .replace(/\{\{cta\([^)]*\)\}\}/gi, '')
    .replace(/\{\{\s*script\\?_embed\([^}]+\}\}/gi, '')
    .replace(/\{\{[\s\S]*?\}\}/g, '')
    .replace(/!\[([^\]]*)\]\(<([^>]+)>\)/g, '![$1]($2)')
    .replace(/\]\(<([^>]+)>\)/g, ']($1)')
    .replace(/(^[*+-] .+)\n\n+(?=^[*+-] )/gm, '$1\n')
    .replace(/(^\d+\. .+)\n\n+(?=^\d+\. )/gm, '$1\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function pickCategory(tagNames) {
  if (!tagNames.length) return 'Innsikt';
  const preferred = tagNames.find((tag) =>
    /crm|ai|salg|hubspot|inbound|marketing/i.test(tag),
  );
  return preferred || tagNames[0];
}

async function hubspotFetch(url) {
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error(`HubSpot API ${response.status}: ${await response.text()}`);
  }

  return response.json();
}

async function fetchAllTags() {
  const tags = new Map();
  let after;

  do {
    const params = new URLSearchParams({ limit: '100' });
    if (after) params.set('after', after);
    const data = await hubspotFetch(`${API_BASE}/tags?${params}`);
    for (const tag of data.results ?? []) {
      tags.set(String(tag.id), tag.name);
    }
    after = data.paging?.next?.after;
  } while (after);

  return tags;
}

async function fetchAllPosts() {
  const posts = [];
  let after;

  do {
    const params = new URLSearchParams({ limit: '100' });
    if (after) params.set('after', after);
    const data = await hubspotFetch(`${API_BASE}/posts?${params}`);
    const published = (data.results ?? []).filter(
      (post) => post.currentlyPublished && post.state === 'PUBLISHED',
    );
    posts.push(...published);
    after = data.paging?.next?.after;
  } while (after);

  posts.sort(
    (a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime(),
  );

  return typeof limit === 'number' ? posts.slice(0, limit) : posts;
}

function extractImageUrls(html) {
  const urls = new Set();
  const pattern = /<img[^>]+src=["']([^"']+)["']/gi;
  let match = pattern.exec(html);
  while (match) {
    urls.add(match[1]);
    match = pattern.exec(html);
  }
  return [...urls];
}

async function withTimeout(promise, timeoutMs, label) {
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(
      () => reject(new Error(`Timeout etter ${timeoutMs}ms: ${label}`)),
      timeoutMs,
    );
  });

  try {
    return await Promise.race([promise, timeout]);
  } finally {
    clearTimeout(timer);
  }
}

async function fetchWithTimeout(url, timeoutMs = 15000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, { signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function downloadImage(url, postSlug) {
  const parsed = new URL(url);
  const rawName = path.basename(parsed.pathname).split('?')[0] || 'image.jpg';
  const basename = sanitizeFilename(rawName);
  const safeDir = slugToFilename(postSlug);
  const targetDir = path.join(IMAGE_DIR, safeDir);
  const targetPath = path.join(targetDir, basename);
  const publicPath = `/images/blog/${safeDir}/${basename}`;

  if (dryRun) return { from: url, to: publicPath };

  await fs.mkdir(targetDir, { recursive: true });

  try {
    const existing = await fs.stat(targetPath).catch(() => null);
    if (existing?.isFile()) {
      return { from: url, to: publicPath };
    }

    await withTimeout(
      (async () => {
        const response = await fetchWithTimeout(url);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const buffer = Buffer.from(await response.arrayBuffer());
        await fs.writeFile(targetPath, buffer);
      })(),
      30000,
      basename,
    );

    return { from: url, to: publicPath };
  } catch {
    console.warn(`  Timeout/feil ved bilde: ${url}`);
    return { from: url, to: url };
  }
}

async function replaceImages(html, postSlug) {
  const urls = extractImageUrls(html);
  if (!urls.length) return html;

  console.log(`  Laster ned ${urls.length} bilde(r)...`);
  const replacements = await Promise.all(
    urls.map(async (url) => {
      const replacement = await downloadImage(url, postSlug);
      return [url, replacement.to];
    }),
  );

  let output = html;
  for (const [from, to] of replacements) {
    output = output.split(from).join(to);
  }

  return output;
}

function buildFrontmatter(post, category) {
  const pubDate = new Date(post.publishDate).toISOString().slice(0, 10);
  const lines = [
    '---',
    `title: "${escapeYaml(post.htmlTitle || post.name)}"`,
    `description: "${escapeYaml(post.metaDescription || '')}"`,
    `pubDate: ${pubDate}`,
    `category: "${escapeYaml(category)}"`,
  ];

  if (post.authorName) {
    lines.push(`author: "${escapeYaml(post.authorName)}"`);
  }

  lines.push('---', '');
  return lines.join('\n');
}

async function writePost(post, tagMap) {
  const filename = `${slugToFilename(post.slug)}.mdx`;
  const tagNames = (post.tagIds ?? [])
    .map((id) => tagMap.get(String(id)))
    .filter(Boolean);
  const category = pickCategory(tagNames);
  const cleaned = cleanHtml(post.postBody || '');
  const withImages = await replaceImages(cleaned, post.slug);
  const markdown = formatMarkdown(turndown.turndown(withImages));
  const content = `${buildFrontmatter(post, category)}${markdown}\n`;

  if (dryRun) {
    console.log(`[dry-run] ${filename} (${post.url})`);
    return;
  }

  await fs.writeFile(path.join(BLOG_DIR, filename), content, 'utf8');
  console.log(`✓ ${filename}`);
}

async function main() {
  console.log('Henter tags og blogginnlegg fra HubSpot...');
  const [tagMap, posts] = await Promise.all([fetchAllTags(), fetchAllPosts()]);
  console.log(`Fant ${posts.length} publiserte innlegg.`);

  if (clean && !dryRun) {
    const existing = await fs.readdir(BLOG_DIR);
    await Promise.all(
      existing
        .filter((file) => (file.endsWith('.mdx') || file.endsWith('.md')) && !file.startsWith('_'))
        .map((file) => fs.unlink(path.join(BLOG_DIR, file))),
    );
    console.log('Fjernet eksisterende bloggfiler.');
  }

  if (!dryRun) {
    await fs.mkdir(BLOG_DIR, { recursive: true });
    await fs.mkdir(IMAGE_DIR, { recursive: true });
  }

  let imported = 0;

  for (const post of posts) {
    const filename = `${slugToFilename(post.slug)}.mdx`;
    console.log(`Importerer ${imported + 1}/${posts.length}: ${filename}`);

    try {
      await writePost(post, tagMap);
      imported += 1;
    } catch (error) {
      console.error(`✗ ${filename}: ${error.message}`);
    }
  }

  console.log(
    dryRun
      ? 'Dry-run fullført.'
      : `Migrering fullført. ${imported}/${posts.length} innlegg importert.`,
  );
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
