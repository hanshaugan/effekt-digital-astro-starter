export const SITE = {
  name: 'Effekt Digital',
  url: 'https://www.effektdigital.no',
  defaultTitle: 'Effekt Digital – Moderne salgsoperasjoner',
  defaultDescription:
    'CRM, AI og sales-tech for B2B-selskaper som vil ha bedre salgsflyt.',
  locale: 'nb_NO',
  language: 'no',
  email: 'hans@effektdigital.no',
  /** Lim inn Calendly-lenke for å vise «Book møte» på kontaktsiden. La stå tom for å skjule. */
  calendlyUrl: 'https://calendly.com/hans-effektdigital/30min',
} as const;

export const ORG_ID = `${SITE.url}/#organization`;

export function absoluteUrl(path: string) {
  return new URL(path, SITE.url).href;
}
