# Table notes

A small React + Vite site for personal restaurant reviews. Routes: home (`/`), all reviews (`/reviews`), and individual posts (`/reviews/:slug`).

Review content lives under **`content/reviews/<slug>/`**: put **`index.md`** (YAML frontmatter + Markdown body) and any images in that folder. Reference images with relative paths, e.g. `![](./photo.jpg)` — the first image in the body is used as the list thumbnail and detail hero. The app loads posts at build time via `src/data/reviews.ts` (no CMS required).

## Prerequisites

- **Node.js** 18+ (LTS recommended). The project uses **Vite 5** so `npm run dev` and `npm run build` work on common installs without requiring the newest Node for Vite 8.

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Production build

```bash
npm run build
npm run preview
```

`preview` serves the contents of `dist/` locally so you can check the production bundle before deploy.
