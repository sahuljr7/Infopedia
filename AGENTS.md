# Infopedia contributor guide

## Project structure

- This is a static site built with Eleventy 0.11 (`.eleventy.js`).
- Author public encyclopedia pages as Markdown files in `content/pages/`.
- `content/pages/pages.json` supplies the `layouts/page.njk` layout to pages in that directory. The layout renders the page title, Markdown content, optional comments, and optional next/previous navigation.
- Shared templates are in `_includes/`; site-wide settings are in `_data/site.json`.
- The site navigation is built from each page's `eleventyNavigation` front matter. Navigation entries are sorted by `order` in `.eleventy.js`.
- The generated site goes to `_site/`; do not hand-edit generated output.

## Adding or editing a page

1. Read nearby pages in `content/pages/` and preserve their Markdown style and the shared layout.
2. Put each new public page in `content/pages/<Readable-Slug>.md` with YAML front matter between `---` delimiters. Use this shape, adapting values to the page:

   ```yaml
   ---
   title: Page title
   date: YYYY-MM-DD
   permalink: /Readable-Slug/index.html
   comments: 0
   eleventyNavigation:
     key: Page title
     title: Page title
     order: 20
   ---
   ```

3. Keep the homepage at `content/pages/home.md` with `title: Getting started`, `permalink: /`, and navigation key/title `Getting started` at order `0`.
4. Give every page a title, a unique permalink, and an `eleventyNavigation` object with a key and numeric order. Keep navigation keys unique and choose an order that places the page correctly in the menu. Use the Garud Puran page as the reference for a regular article page.
5. Use a real YAML date (for example, `YYYY-MM-DD`) for new or edited pages. The current homepage and existing articles contain the literal `Last Modified`; preserve that legacy value unless the task specifically includes correcting dates. The templates format page dates as dates, so check the build output when changing date handling.
6. Write the article body in Markdown after the closing front matter delimiter. Use descriptive headings, valid links, and accurate, source-supported claims. Keep `comments: 0` when comments should be suppressed; the layout also requires comments to be enabled in `_data/site.json` before comment markup is rendered.
7. If adding images, place source files under `content/images/` and follow the configured image shortcode conventions in `.eleventy.js`; provide descriptive alt text.
8. Article Markdown pages under `content/pages/` are automatically included on Home and Explore, except for the home and About pages. Do not rely on `topics` being present for an article to appear; topics only control its topic labels and tag routes. Update the front matter `date` when updating an article so it moves to the correct position in the newest-first lists. Explore shows three articles per page and generates numbered pages for older articles.

## Review and verification for every page change

- Review every changed or newly added file under `content/pages/`, not only the page named in the task.
- Check that front matter parses, required fields are present, permalink and navigation key are unique, navigation order is numeric, and the homepage conventions remain intact.
- Check that the body starts after the front matter and that links, image paths, Markdown headings, and any page-specific metadata are intentional.
- Confirm that each changed or new article appears in the expected newest-first position on Home and in the correct three-article Explore page; verify that older articles remain reachable through numbered pagination.
- Build the site with `npm run build` after page or template changes. Confirm the command succeeds and the expected output appears in `_site/` at the page's permalink. Do not commit generated `_site/` files.
- If the build fails, report the relevant failure and distinguish pre-existing/environment issues from changes in the task; do not claim successful verification.

## Scope and safety

- Keep edits focused on the requested page/content or shared behavior. Do not rewrite unrelated articles or configuration.
- Do not add dependencies for routine content changes.
- Preserve existing user changes and inspect `git status` before committing. Commit only the intended source files.
