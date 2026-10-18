export const wheelData = {
  strategi: {
    color: '#1f5f54',
    tag: 'Sentrum',
    title: 'Strategi',
    bullets: [
      ['Mål', 'hva vekst faktisk skal bety for dere'],
      ['Målgruppe', 'hvem som er relevante – og hvem som ikke er det'],
      ['Posisjonering', 'hvorfor kunden skal velge dere'],
      ['Prioriteringer', 'hvilke områder som gir størst effekt nå'],
      ['KPI-er', 'hva dere måler for å styre og forbedre'],
    ],
    intro:
      'Strategien ligger i sentrum: mål, målgruppe, posisjonering, prioriteringer og KPI-er. Derfra forbedrer vi de områdene som har størst betydning for din bedrift.',
  },
  synlighet: {
    color: '#185FA5',
    tag: 'Element',
    title: 'Synlighet & innhold',
    bullets: [
      ['Nettsider', 'klar posisjonering og vei til kontakt'],
      ['Video', 'lederprofilering og tillit raskere enn tekst alene'],
      ['Webinar', 'engasjement og leads gjennom faglig innhold'],
      ['Faglig innhold', 'nyhetsbrev, artikler og materiel knyttet til salg'],
      ['Kundetillit', 'referanser og synlighet hos riktige beslutningstakere'],
    ],
    intro:
      'Nettsider, video, webinar, faglig innhold, lederprofilering og kundetillit – synlighet som skaper salgsmuligheter.',
  },
  prospektering: {
    color: '#BA7517',
    tag: 'Element',
    title: 'Prospektering',
    bullets: [
      ['ICP og målgruppe', 'tydelig bilde av hvem dere skal snakke med'],
      ['Identifisere bedrifter', 'rette selskaper, ikke tilfeldige lister'],
      ['Kontaktpersoner', 'finne riktige beslutningstakere'],
      ['Kontaktårsaker', 'relevante grunner til å ta kontakt'],
      ['Datakvalitet', 'lister og kilder dere kan stole på'],
    ],
    intro:
      'Målgruppe/ICP, identifisere riktige bedrifter og kontaktpersoner, og relevante kontaktårsaker.',
  },
  salgsaktiviteter: {
    color: '#D85A30',
    tag: 'Element',
    title: 'Salgsaktiviteter',
    bullets: [
      ['Dialog', 'samtaler som kvalifiserer og bygger tillit'],
      ['Kvalifisering', 'vite hvem som er klare for møte'],
      ['Møtebooking', 'systematisk booking – ikke tilfeldig volume'],
      ['Kontaktsekvenser', 'tydelig neste steg i flere kanaler'],
      ['Oppfølging', 'ingen leads som faller mellom stolene'],
    ],
    intro:
      'Dialog, kvalifisering, møtebooking, kontaktsekvenser og oppfølging – aktiviteter som faktisk fyller kalenderen.',
  },
  salgsprosess: {
    color: '#534AB7',
    tag: 'Element',
    title: 'Salgsprosess',
    bullets: [
      ['Behovsavklaring', 'strukturert vei fra første møte til tilbud'],
      ['Pipeline', 'oversikt og forutsigbarhet'],
      ['Metodikk og playbooks', 'samme kvalitet uavhengig av selger'],
      ['Salgstrening', 'coaching som forbedrer resultatet'],
      ['Konvertering', 'tilbud, oppfølging og avslutning'],
    ],
    intro:
      'Behovsavklaring, tilbud, pipeline, metodikk, salgstrening, coaching og playbooks.',
  },
  crm: {
    color: '#1d9e75',
    tag: 'Element',
    title: 'CRM & Sales Tech',
    bullets: [
      ['Valg og implementering', 'system som passer prosessen – ikke omvendt'],
      ['Automatisering', 'mindre manuelt arbeid, mer konsistens'],
      ['Integrasjoner', 'nettside, e-post, kalender og CRM snakker sammen'],
      ['Adopsjon', 'selgerne bruker systemet i hverdagen'],
      ['Rapportering', 'tall som styrer prioritering'],
    ],
    intro:
      'Valg, implementering, automatisering, integrasjoner, adopsjon og rapportering.',
  },
} as const;

export type WheelKey = keyof typeof wheelData;

/** Legend order (strategy is center-only; listed first for accessibility). */
export const wheelLegendKeys = [
  'synlighet',
  'prospektering',
  'salgsaktiviteter',
  'salgsprosess',
  'crm',
] as const satisfies readonly WheelKey[];
