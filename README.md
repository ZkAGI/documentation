# zkAGI Documentation

Docs for zkAGI: user-defined trust domains, tiers of assurance, the Altaica
compiler, verifiable receipts, and selective disclosure. Built with
[Docusaurus](https://docusaurus.io/) 3.

## Develop

```bash
npm install
npm start          # dev server at localhost:3000
```

## Build

```bash
npm run build      # static site into build/
npm run serve      # preview the production build
```

## Deploy on Vercel

Zero config. Import the repo in Vercel; it auto-detects Docusaurus:

- Build command: `npm run build`
- Output directory: `build`

Then point `docs.zkagi.ai` at the project.

## Things to know

- **Contact form** (`/contact` and every "Talk to us" CTA) delivers by email
  to `suraj@zkagi.ai` via FormSubmit's AJAX endpoint. The **first real
  submission triggers a one-time activation email** to that inbox; click the
  confirmation link once and all subsequent messages flow. To route through a
  webhook/CRM instead, change `ENDPOINT` in `src/pages/contact.tsx`.
- **Status board** (`docs/trust-center/status.md`) is the single source of
  truth for live vs R&D capability labels. Review it with every significant
  release; every page's status pill should agree with it.
- **Concept animations** in `static/videos/` are rendered with Manim
  (source scene file kept alongside the brand tooling). Regenerate rather
  than hand-edit.
- **House style:** no em dashes, no hype words, honest R&D labels, civilian
  use only. The Disclosures page (`docs/trust-center/disclosures.md`) is
  load-bearing; don't ship copy that contradicts it.
