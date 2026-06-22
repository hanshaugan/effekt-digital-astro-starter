export const SITE = {
  name: 'Effekt Digital',
  legalName: 'Effekt Digital AS',
  orgNumber: '916 282 818',
  url: 'https://www.effektdigital.no',
  defaultTitle: 'Effekt Digital – CRM, AI og moderne salgsprosesser',
  defaultDescription:
    'CRM, AI og sales-tech for B2B-selskaper som vil ha bedre salgsflyt.',
  locale: 'nb_NO',
  language: 'no',
  email: 'hans@effektdigital.no',
  phone: '+47 906 35 579',
  address: {
    street: 'Langbråten 53',
    postalCode: '2063',
    city: 'Jessheim',
    country: 'Norge',
  },
  /** Lim inn Calendly-lenke for å vise «Book møte» på kontaktsiden. La stå tom for å skjule. */
  calendlyUrl: 'https://calendly.com/hans-effektdigital/30min',
} as const;

export const ORG_ID = `${SITE.url}/#organization`;

export function absoluteUrl(path: string) {
  return new URL(path, SITE.url).href;
}
