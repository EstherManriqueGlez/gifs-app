# GifsApp

Discover and search trending GIFs, powered by the [Giphy API](https://developers.giphy.com/). Built with **Angular 19**, **Angular Signals** and **Tailwind CSS 4**.

![Angular](https://img.shields.io/badge/Angular-19-DD0031) ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4) ![License](https://img.shields.io/badge/license-MIT-blue)

## Features

- **Trending GIFs** with infinite scroll and 20-item pagination.
- **GIF search** with a search history persisted in `localStorage`.
- **Search history** accessible from the sidebar, including a dedicated page per query.
- **Light/Dark theme** toggle that persists your choice and respects the OS preference.
- **Skeleton loaders** while images are loading.
- **HTTP error interceptor** that surfaces friendly toast notifications on API failures.
- **Fully responsive** layout with a collapsible sidebar on mobile.

## Tech Stack

| Technology     | Purpose                                |
| -------------- | -------------------------------------- |
| Angular 19     | Framework (standalone components)      |
| Angular Signals| Reactive state management              |
| RxJS           | Async HTTP streams and operators       |
| Tailwind CSS 4 | Styling (utility-first)                |
| Giphy REST API | GIF data source                        |
| Font Awesome   | Icons (loaded via CDN)                 |

## Prerequisites

- [Node.js](https://nodejs.org/) >= 20
- npm (bundled with Node)

## Configuration: Giphy API Key

This app reads the Giphy API key from an environment file. **The real key is never committed** to the repository.

1. Create a free API key at [Giphy Developers](https://developers.giphy.com/).
2. Copy `src/environments/environment.local.ts` values into your local setup by adding your real key there:

   ```ts
   // src/environments/environment.local.ts (gitignored)
   export const environment = {
     production: false,
     giphyApiKey: 'YOUR_REAL_GIPHY_KEY',
     giphyUrl: 'https://api.giphy.com/v1',
   };
   ```

3. The `development` build configuration automatically swaps `environment.ts` for `environment.local.ts` via `fileReplacements` (see `angular.json`).

## Installation & Run

```bash
npm install
npm start
```

Then open `http://localhost:4200/`. The app hot-reloads whenever you edit source files.

## Build

```bash
npm run build
```

The compiled artifacts are stored in `dist/gifs-app/browser/`. By default the production build is optimized for performance. A `prebuild` step injects the `GIPHY_API_KEY` environment variable (if present) into the production environment file.

## Tests

```bash
npm test
```

Unit tests run with [Karma](https://karma-runner.github.io) and [Jasmine](https://jasmine.github.io/).

## Project Structure

```
src/
├─ app/
│  ├─ gifs/                     # GIF feature module
│  │  ├─ components/            # UI components (gif-list, side-menu, skeletons, ...)
│  │  ├─ interfaces/            # Giphy API + domain models
│  │  ├─ mapper/                # Maps Giphy items → domain Gif model
│  │  ├─ pages/                 # dashboard, trending, search, gif-history
│  │  └─ services/              # GifsService (trending, search, history)
│  └─ shared/                   # Cross-cutting concerns
│     ├─ interceptors/          # HTTP error toast interceptor
│     └─ services/              # ThemeService, ScrollStateService
├─ environments/                # Per-environment configuration
└─ index.html
```

## Routes

| Path                        | Description                          |
| --------------------------- | ------------------------------------ |
| `/dashboard`                | Dashboard shell (redirects)          |
| `/dashboard/trending`       | Trending GIFs with infinite scroll   |
| `/dashboard/search`         | Search GIFs                          |
| `/dashboard/history/:query` | History page for a given query       |

## Deployment (Netlify)

See the detailed step-by-step guide below.

1. Connect your repository in [Netlify](https://app.netlify.com).
2. Build command: `npm run build` (auto-detected from `netlify.toml`).
3. Publish directory: `dist/gifs-app/browser/` (auto-detected from `netlify.toml`).
4. Add the environment variable `GIPHY_API_KEY` with your real key in **Site settings → Environment variables**.
5. Deploy and verify the trending page loads correctly.

## Notes

It was created for learning purposes following the [Udemy](https://www.udemy.com).