import fs from 'node:fs';
import path from 'node:path';

const PARTNERS_DIR = path.join(process.cwd(), 'public', 'images', 'partners');
const EXTENSIONS = ['svg', 'png', 'webp'] as const;

/** Returnerer public-URL hvis logo finnes i public/images/partners/{slug}.{ext}. */
export function partnerLogo(slug: string): string | undefined {
  for (const ext of EXTENSIONS) {
    const file = path.join(PARTNERS_DIR, `${slug}.${ext}`);
    if (fs.existsSync(file)) {
      return `/images/partners/${slug}.${ext}`;
    }
  }
  return undefined;
}
