import { ORG_ID, SITE, absoluteUrl } from './site';

type ArticleInput = {
  title: string;
  description: string;
  url: string;
  pubDate: Date;
  author?: string;
  image?: string;
};

export function organizationSchema() {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE.name,
    url: SITE.url,
    email: SITE.email,
  };
}

export function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    description: SITE.defaultDescription,
    publisher: { '@id': ORG_ID },
    inLanguage: SITE.language,
  };
}

export function webPageSchema({
  title,
  description,
  url,
}: {
  title: string;
  description: string;
  url: string;
}) {
  return {
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: title,
    description,
    isPartOf: { '@id': `${SITE.url}/#website` },
    inLanguage: SITE.language,
  };
}

export function articleSchema({
  title,
  description,
  url,
  pubDate,
  author,
  image,
}: ArticleInput) {
  const schema: Record<string, unknown> = {
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: title,
    description,
    url,
    datePublished: pubDate.toISOString(),
    dateModified: pubDate.toISOString(),
    mainEntityOfPage: { '@id': `${url}#webpage` },
    publisher: { '@id': ORG_ID },
    isPartOf: { '@id': `${SITE.url}/#website` },
    inLanguage: SITE.language,
  };

  if (author) {
    schema.author = {
      '@type': 'Person',
      name: author,
    };
  }

  if (image) {
    schema.image = absoluteUrl(image);
  }

  return schema;
}

export function schemaGraph(...nodes: Record<string, unknown>[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes,
  };
}
