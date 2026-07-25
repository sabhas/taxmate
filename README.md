# Taxmate

Taxmate is a Gatsby-based website for a Pakistan tax consultancy firm. It
provides information about the firm's services, an income-tax calculator, a
Punjab property-transfer-fee calculator, and a tax-news feed.

## Features

- **Home** — hero with calls-to-action, services, tools, team, testimonials,
  and a contact form (EmailJS) with an embedded Google Map.
- **Tax Calculator** — Pakistan income tax and reverse (income-from-tax)
  calculators across multiple tax years (2020–2026).
- **Property Transfer Fees** — Punjab residential/commercial and agricultural
  transfer-fee calculators (registration, stamp duty, PLRA, advance/gain tax,
  7E, etc.).
- **News** — searchable, filterable feed of tax updates and deadlines.
- Responsive layout, MUI v5 (CSS variables theme) with light/dark palettes,
  accessible navigation, WhatsApp floating button, and a site footer.

## Tech stack

- [Gatsby](https://www.gatsbyjs.com/) 5 (TypeScript)
- [MUI](https://mui.com/) v5 (`experimental_extendTheme`, CSS variables)
- SCSS modules for page-level styling
- EmailJS for the contact form
- `@react-google-maps/api` for the office map (lazy-loaded)

## Quick start

```shell
npm install
npm run develop
```

The site is now running at http://localhost:8000.

## Available scripts

- `npm run develop` — start the dev server
- `npm run build` — production build
- `npm run serve` — serve the production build locally
- `npm run clean` — clear the Gatsby cache
- `npm run typecheck` — run `tsc --noEmit`

## Environment variables

Copy `.env.example` (or create `.env`) and fill in:

- `GATSBY_EMAIL_SERVICE_ID` — EmailJS service id
- `GATSBY_EMAIL_TEMPLATE_ID` — EmailJS template id
- `GATSBY_EMAIL_ACCOUNT_ID` — EmailJS account/public key
- `GATSBY_GOOGLE_MAP_API_KEY` — Google Maps JS API key
- `GATSBY_RECAPTCHA_SITE_KEY` — reCAPTCHA v2 site key (optional; if omitted the
  captcha widget is not rendered)

## License

© Taxmate. All rights reserved.