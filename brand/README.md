# Effekt Digital – logo og merke

Enkel merkevarepakke for nettside, e-post, partnere og trykk.

## Farger

| Rolle | Hex | Bruk |
| --- | --- | --- |
| Accent / merke | `#1f5f54` | Prikker, lenker, highlight |
| Ink | `#151515` | Tekst på lys bakgrunn |
| Sand | `#f7f5f0` | Lys bakgrunn / invers tekst |

## Filtyper

### SVG (`brand/svg/`)
- `mark.svg` – kun ikon (grønn), transparent
- `mark-inverse.svg` – kun ikon (sand), til mørk/farget flate
- `logo.svg` – ikon + «Effekt Digital» (mørk tekst)
- `logo-on-dark.svg` – ikon + lys tekst

### PNG (`brand/png/`)
Rasterversjoner i flere størrelser. Bruk PNG når SVG ikke støttes (PowerPoint, enkelte CMS, LinkedIn-profil osv.).

## Bruk

- **Lys bakgrunn:** `logo.svg` / `logo-*.png`
- **Mørk bakgrunn:** `logo-on-dark.svg` / `logo-on-dark-*.png` (grønt merke fungerer også direkte på mørkt)
- **Favicon / app-ikon:** `mark-*.png` eller `mark.svg`
- **Font i logo:** Outfit SemiBold (600). TTF ligger i `brand/fonts/`.

## Betydning

De fem prikkene signaliserer vekst og kobling – og speiler de fem elementene i VekstPilot.

## Regenerere PNG

```bash
node scripts/export-brand-assets.mjs
```
