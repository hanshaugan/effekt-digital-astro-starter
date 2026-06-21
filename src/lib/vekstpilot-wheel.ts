export const wheelData = {
  nettsider: {
    color: '#1d9e75',
    tag: 'Indre lag · Motor',
    title: 'Nettsider',
    bullets: [
      ['Klar posisjonering', 'besøkende forstår hvem dere hjelper på 5 sekunder'],
      ['Kjøpsreise', 'tydelig vei fra første besøk til møte eller henvendelse'],
      ['Lavterskelinngang', 'helsesjekk, demo eller kalkulator — ikke bare «kontakt oss»'],
      ['Tracking', 'dere vet hvor trafikken kommer fra og hva den gjør'],
      ['Integrert i salg', 'selgerne bruker siden aktivt i salgsprosessen'],
    ],
    intro:
      'Nettsiden din skal jobbe som en selger døgnet rundt — struktur, budskap og konvertering.',
  },
  salgsaktiviteter: {
    color: '#D85A30',
    tag: 'Indre lag · Motor',
    title: 'Salgsaktiviteter',
    bullets: [
      ['Definert salgsprosess', 'ikke ulik fra selger til selger'],
      ['Forutsigbar pipeline', 'dere vet alltid hvor leadsene befinner seg'],
      ['Lead-kilder', 'nok leads av riktig kvalitet fra forutsigbare kanaler'],
      ['Follow-up-struktur', 'klart neste steg etter første kontakt, alltid'],
      ['Selgertid', 'mest mulig tid på kundekontakt, minst mulig på admin'],
    ],
    intro:
      'Riktig frekvens, riktig kanal og riktig timing — salgsaktiviteter som faktisk passer hverdagen.',
  },
  innhold: {
    color: '#534AB7',
    tag: 'Indre lag · Motor',
    title: 'Innhold',
    bullets: [
      ['Koblet til salgsprosessen', 'ikke bare markedsinnhold for markedets skyld'],
      ['Svarer på kundespørsmål', 'besvarer det potensielle kunder faktisk lurer på'],
      ['Case studies', 'konkrete resultater, ikke vage sitater'],
      ['Video', 'bygger personlig tillit raskere enn tekst alene'],
      ['Lead-generator', 'innhold som faktisk henter inn henvendelser'],
    ],
    intro: 'Innhold som bygger tillit og autoritet over tid — og trekker til seg de rette kundene.',
  },
  teknologi: {
    color: '#185FA5',
    tag: 'Ytre lag · Fundament',
    title: 'Teknologi',
    bullets: [
      ['CRM som selgerne bruker', 'HubSpot, Pipedrive eller Dult tilpasset prosessen'],
      ['Automasjon', 'follow-up, dataregistrering og lead-routing på autopilot'],
      ['AI i hverdagen', 'møtenotater, e-postutkast, lead-scoring'],
      ['Integrert stack', 'nettside, CRM, e-post og kalender snakker sammen'],
      ['Digitalt salgsrom', 'Handslag samler kundeinformasjon på ett sted'],
    ],
    intro: 'Riktig teknologi — ikke mest mulig. CRM, AI og automasjon som støtter selgerne.',
  },
  prestasjonskultur: {
    color: '#BA7517',
    tag: 'Ytre lag · Fundament',
    title: 'Prestasjonskultur',
    bullets: [
      ['Tydelige forventninger', 'selgerne vet hva som forventes daglig, ukentlig og månedlig'],
      ['Riktige KPIer', 'dere måler aktivitet og pipeline, ikke bare sluttsalg'],
      ['Salgsmøter som gir verdi', 'læring og justering, ikke bare rapportering'],
      ['Tilbakemeldingskultur', 'trygt å feile og lære'],
      ['Lederskap i salg', 'salgsleder coacher, ikke bare kontrollerer'],
    ],
    intro:
      'Uten riktig kultur spiller resten liten rolle. Mål, vaner og ledelse som får teamet til å følge systemet.',
  },
} as const;

export type WheelKey = keyof typeof wheelData;
