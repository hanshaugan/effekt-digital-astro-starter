# Effekt Digital Astro Starter

Et enkelt Astro + Tailwind CSS startpunkt for en moderne Effekt Digital-nettside.

## Innhold

- Forside
- Tjenesteside
- Blogg/innsikt med MDX
- Landingsside for CRM-helsesjekk
- Kontakt-side
- Gjenbrukbare komponenter

## Kom i gang

```bash
npm install
npm run dev
```

Bygg for produksjon:

```bash
npm run build
npm run preview
```

## Netlify

Push prosjektet til GitHub og koble repoet til Netlify.

Build command:

```bash
npm run build
```

Publish directory:

```bash
dist
```

## Tilpasninger

- Endre globale farger i `src/styles/global.css`
- Endre navigasjon i `src/components/Navbar.astro`
- Legg til blogginnlegg i `src/content/blog/`
- Bytt kontaktbokser med Fillout embed eller Netlify Forms
