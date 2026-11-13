# Infopedia

Infopedia is a source-linked knowledge site about technology, industries, and innovation. It is a static website built with Eleventy and styled with Tailwind CSS.

## Site features

- **Home (`/`)** — shows the latest articles, topic links, and a short introduction.
- **Explore (`/explore/`)** — lists all article pages.
- **Tags (`/tags/`)** — lists topics and their article counts. Each topic has its own route at `/tags/<topic-slug>/`.
- **About (`/about/`)** — describes the site's purpose and research principles.
- **Search** — opens from the search button or with `Ctrl+K` (`Cmd+K` on macOS). Type to search page titles, descriptions, and article content; use the arrow keys and Enter to select a result.
- **Dark mode** — available from the header controls.

The current article profiles cover Hibu, Yext, and Yelp. Site navigation and topic routes are generated from page metadata and article `topics` fields.

## Project structure

```text
_data/                  Site-wide settings
_includes/components/   Shared header, footer, and head templates
_includes/layouts/      Home, article, Explore, Tags, and tag detail layouts
_includes/assets/js/    Site interactions and search behavior
content/pages/          Markdown articles and route source files
content/images/         Source images used by articles
filters/searchFilter.js Search index generation
styles/tailwind.css     Tailwind entry point and site styles
.eleventy.js            Eleventy collections, filters, and build configuration
AGENTS.md               Contributor instructions and page review checklist
_site/                  Generated site output (do not edit by hand)
```

## Local development

Install the dependencies and start the Eleventy development server with the project scripts:

```sh
npm install
npm run start
```

The project declares Node.js `26.x` in `package.json`. Build the production site with:

```sh
npm run build
```

The generated files go into `_site/`. Do not commit generated output. See `AGENTS.md` for detailed page authoring and review instructions.

## Adding an article

Create a Markdown file in `content/pages/`, for example `content/pages/Example.md`, and provide the required Eleventy front matter:

```yaml
---
title: Example
date: 2026-11-14
permalink: /Example/index.html
comments: 0
description: A short summary used in article lists and search results.
topics:
  - Example topic
eleventyNavigation:
  key: Example
  title: Example
  order: 50
---

Write the article in Markdown below the front matter. Link claims to reliable sources.
```

Use a unique permalink and navigation key, and choose an unused numeric navigation order. The `topics` field is an optional YAML list; when present, its entries appear on the article, in the home and Explore lists, and in the Tags directory. Tag routes are generated from those values. Follow `AGENTS.md` to review page metadata, links, and build output.

The home route is defined by `content/pages/home.md` and must keep `title: Getting started`, `permalink: /`, and the navigation order `0`. The static Explore, Tags, and About route metadata is in `content/pages/explore.njk`, `content/pages/tags.njk`, and `content/pages/about.md`.

## Search implementation

Eleventy generates `/search-index.json` from Markdown files under `content/pages/`. The `filters/searchFilter.js` filter indexes each page's title, description, and text content with Elasticlunr. The browser code in `_includes/assets/js/search.js` loads that index and renders matching pages in the header search dialog. Keep the generated index and its source filter in sync when changing searchable content or behavior.

## Deployment

The GitHub repository is `sahuljr7/Infopedia`. The site is configured for deployment from the `main` branch, and the production project should use Node.js `26.x`.
