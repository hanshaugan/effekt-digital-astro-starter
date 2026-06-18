# Blogg-jukseark (Effekt Digital)

> Denne filen publiseres **ikke** på nettsiden. Den ligger her som referanse når du redigerer innlegg i Cursor.

---

## Filplassering

- **Innlegg:** `src/content/blog/ditt-innlegg-slug.mdx`
- **URL:** `https://www.effektdigital.no/blogg/ditt-innlegg-slug/`
- **Bilder:** `public/images/blog/ditt-innlegg-slug/bilde.jpg`
- **Forhåndsvis:** `npm run dev` → åpne `http://localhost:4321/blogg/...`

---

## Frontmatter (øverst i hvert innlegg)

```yaml
---
title: "Tittel som vises på siden"
description: "Kort beskrivelse – brukes i SEO og på bloggoversikten"
pubDate: 2025-01-16
category: "Innsikt"
author: "Hans Haugan"
image: "/images/blog/ditt-innlegg/forsidebilde.jpg"
---
```

| Felt | Påkrevd | Merknad |
|------|---------|---------|
| `title` | Ja | Hovedoverskrift |
| `description` | Ja | 1–2 setninger, maks ~160 tegn for SEO |
| `pubDate` | Ja | Format: `YYYY-MM-DD` |
| `category` | Ja | F.eks. `Innsikt`, `CRM`, `AI`, `b2b salg` |
| `author` | Nei | Valgfritt |
| `image` | Nei | Forsidebilde på `/blogg/` – utelat for tekst-only kort. Brukes også for deling (Open Graph) og Schema.org |

---

## SEO (automatisk)

Følgende genereres automatisk for alle sider — du trenger ikke gjøre noe ekstra:

- `title` og `description` → meta-tagger, Open Graph og Twitter Cards
- Canonical URL (unngår duplikat-innhold)
- Schema.org JSON-LD (strukturert data for Google og AI-søk)
- `sitemap.xml` og `robots.txt` ved build/deploy

**Blogginnlegg** får i tillegg `BlogPosting`-schema med `pubDate`, `author` og valgfritt `image`.

**Tips for bedre synlighet:**
- Skriv gode, unike `title` og `description` per innlegg
- Bruk tydelige `##`-overskrifter som svarer på reelle spørsmål
- Legg til `image` når du vil at innlegget skal se bra ut ved deling på LinkedIn

---

## Markdown – vanlig tekst

```markdown
## Overskrift nivå 2
### Overskrift nivå 3

Vanlig avsnitt med tekst.

**Fet tekst** og _kursiv tekst_.

- Punktliste
- Neste punkt

1. Nummerert liste
2. Neste punkt

[Lenketekst](https://eksempel.no)
[Intern lenke](/tjenester/)
```

---

## Bilder

### I artikkelteksten

```markdown
![Beskrivende alt-tekst](/images/blog/mitt-innlegg/mitt-bilde.jpg)
```

1. Legg bildefilen i `public/images/blog/mitt-innlegg/`
2. Bruk absolutt sti fra `public/` (starter med `/images/...`)
3. Skriv alltid **alt-tekst** inne i `![...]` – viktig for SEO og tilgjengelighet

### Forsidebilde på blogg-oversikten (valgfritt)

Legg til `image` i frontmatter for å vise bilde på kortet på `/blogg/`:

```yaml
image: "/images/blog/mitt-innlegg/forsidebilde.jpg"
```

- **Uten `image`:** tekst-only kort (standard nå)
- **Med `image`:** bilde øverst på kortet, 16:9-format
- Kan være samme bilde som i artikkelen, eller et eget forsidebilde

---

## Video i blogginnlegg

Bruk `<VideoEmbed />`-komponenten midt i teksten. Lim inn **delingslenken** fra plattformen – embed-URL genereres automatisk.

```mdx
<VideoEmbed
  src="https://www.youtube.com/watch?v=VIDEO_ID"
  title="Kort beskrivelse av videoen"
  caption="Valgfri bildetekst under videoen"
/>
```

### Støttede plattformer

| Plattform | Eksempel på `src` | Tips |
|-----------|-------------------|------|
| **YouTube** | `https://www.youtube.com/watch?v=abc123` | Vanlig delingslenke fungerer |
| **Tella** | `https://tv.effektdigital.no/video/slug` | `/embed` legges til automatisk |
| **Tella** | `https://www.tella.tv/video/...` | Samme prinsipp |
| **Vidyard** | `https://share.vidyard.com/watch/abc123` | Delingslenke fra Vidyard |
| **Wistia** | `https://dittfirma.wistia.com/medias/abc123` | Delingslenke fra Wistia |
| **Vimeo** | `https://vimeo.com/123456789` | Vanlig delingslenke |
| **Egen .mp4** | `/video/demo.mp4` | Legg fil i `public/video/` |

Tving plattform manuelt hvis auto-gjenkjenning feiler:

```mdx
<VideoEmbed src="https://share.vidyard.com/watch/abc" type="vidyard" />
```

---

## Video på vanlige sider (ikke blogg)

For hero-seksjoner med tittel og brødtekst, bruk `VideoSection` i `.astro`-filer:

```astro
---
import VideoSection from '../components/VideoSection.astro';
---

<VideoSection
  eyebrow="Handslag"
  title="Ditt nye digitale salgsrom"
  text="Kort beskrivelse under tittelen."
  src="https://tv.effektdigital.no/video/din-video"
  type="tella"
/>
```

---

## Nyttige snarveier i Cursor

| Snarvei | Handling |
|---------|----------|
| `Ctrl + S` | Lagre og oppdater forhåndsvisning |
| `Ctrl + Shift + V` | Markdown-forhåndsvisning |
| `Ctrl + P` | Hurtigsøk fil (f.eks. `trender-innen`) |

---

## Sjekkliste før publisering

- [ ] Tittel og description er oppdatert
- [ ] `pubDate` er riktig
- [ ] Bilder har alt-tekst
- [ ] Interne lenker fungerer (`/blogg/`, `/tjenester/` osv.)
- [ ] Forhåndsvist i nettleser med `npm run dev`
