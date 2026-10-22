# Francis Codes — Developer Portfolio

A responsive developer portfolio built with **React, TypeScript, and Vite** and deployed on GitHub Pages.

## Stack

- React 18 + TypeScript
- Vite production bundling
- Lucide icons
- Responsive CSS design system with dark/light themes and motion
- GitHub public events API for a live activity panel

## Highlights

- Modular React interface and typed project data
- Responsive navigation and project filters
- Persistent dark/light mode
- Project previews, source links, and contact actions
- Public GitHub activity with loading and error states
- Reduced-motion support, semantic landmarks, and visible keyboard focus
- GitHub Actions type-checks and builds before deploying only `dist/`

## Run locally

```bash
npm install
npm run dev
```

## Validate and build

```bash
npm run typecheck
npm run build
npm run preview
```

## Deployment

Pushes to `main` run `.github/workflows/pages.yml`. Vite is configured for the project-site base path:

https://ezikechikelu.github.io/Portfolio-/

If Pages has not been configured, open **Settings → Pages** and select **GitHub Actions** as the deployment source.

Edit project metadata in `src/data.ts`, the interface in `src/App.tsx`, and styling in `src/styles.css`. Verify live URLs and contribution status before describing a project as deployed or a pull request as merged.
