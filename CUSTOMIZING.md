# Customising the starter

How to turn the generic starter into a site that looks and feels like a specific client's brand.

## Colours and fonts

All the design tokens live in one place: `src/styles/global.css`, inside the `@theme` block.

```css
@theme {
  --font-sans: "Oxanium", ui-sans-serif, system-ui, sans-serif;

  --color-background: #ffffff;
  --color-foreground: #0f172a;
  --color-muted: #f5f5f5;
  --color-muted-foreground: #64748b;
  --color-border: #e2e8f0;

  --color-primary: #1f6feb;
  --color-primary-hover: #1a5fcc;
  --color-primary-foreground: #ffffff;

  --color-accent: #0ea5a4;
}
```

The tokens that matter for branding:

- `--color-primary` — the accent colour used for buttons, links, focus rings, and any callouts. This is the single biggest visual change when you rebrand.
- `--color-primary-hover` — the hover state for `--color-primary`. Usually a slightly darker shade.
- `--color-accent` — a secondary accent. Used sparingly. Set it to something complementary, or match `--color-primary` if the brand only has one colour.
- `--color-foreground` — the main body text colour.
- `--color-muted` / `--color-muted-foreground` — soft background blocks and secondary text.
- `--color-border` — hairlines, dividers, card outlines.

Change these values, save, and the whole site follows. No component edits needed for a rebrand.

## Fonts

The starter uses Oxanium as the default. To swap it:

1. Pick a font on [Google Fonts](https://fonts.google.com/) or self-host one.
2. In `src/layouts/Layout.astro`, replace the Oxanium preconnect and stylesheet link with the new font's link tags.
3. In `src/styles/global.css`, update `--font-sans` to put the new font first in the stack.

Example for Inter:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

```css
--font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
```

If you delete the Google Fonts link entirely, the site falls back to the native system font stack. That's a fine default for projects where loading a web font isn't worth the extra weight.

## Layout structure

The site's chrome lives in two components:

- `src/components/Header.astro` — top navigation. Edit the links here, and the logo / brand mark.
- `src/components/Footer.astro` — footer. Reads from `siteSettings` in the CMS for footer text and social links, so most footer edits happen in `/keystatic`.

`src/layouts/Layout.astro` is the wrapper every page uses. That's where the `<head>`, font links, and body structure live. Edit it when you need to add global scripts, change meta tags, or restructure the page shell.

## Adding pages

Any new `.astro` file in `src/pages/` becomes a route.

- `src/pages/faq.astro` → `/faq`
- `src/pages/legal/privacy.astro` → `/legal/privacy`

For static pages (FAQ, privacy, terms), this is all you need. Drop in a new file, import the layout, write the content in plain HTML / JSX-style markup.

For pages that pull from the CMS, follow the pattern in `src/pages/services/index.astro` — it calls `getCollection('services')` and renders the list.

## Adding a Keystatic collection

The starter has five collections out of the box (posts, services, team, testimonials, case studies). Adding a sixth is two config edits and a couple of page files.

**1. Add the collection in `keystatic.config.ts`:**

```ts
events: collection({
  label: 'Events',
  slugField: 'title',
  path: 'src/content/events/*',
  format: { contentField: 'content' },
  entryLayout: 'content',
  schema: {
    title: fields.slug({ name: { label: 'Title' } }),
    date: fields.date({ label: 'Date', defaultValue: { kind: 'today' } }),
    location: fields.text({ label: 'Location' }),
    content: fields.markdoc({ label: 'Body' }),
  },
}),
```

Add `'events'` to the `ui.navigation` config so it shows up in the CMS sidebar:

```ts
navigation: {
  'Site content': ['homepage', 'aboutPage', 'services', 'team', 'testimonials', 'caseStudies', 'posts', 'events'],
  'Configuration': ['siteSettings'],
},
```

**2. Register the collection in `src/content.config.ts`:**

```ts
const events = defineCollection({
  loader: glob({ pattern: "**/*.mdoc", base: "./src/content/events" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    location: z.string().optional(),
  }),
});

// then add `events` to the exported `collections` object at the bottom of the file.
```

**3. Build the pages** — see the "Adding a new page type" section in the main README for the five-step walkthrough.

## Branding the CMS

The CMS brand name at `/keystatic` is set in `keystatic.config.ts`:

```ts
ui: {
  brand: { name: 'Site CMS' },
  ...
},
```

Change `'Site CMS'` to the client's business name, or something like `'Acme CMS'`. It appears in the top-left of the admin UI. Low-effort, high-impact. Makes the CMS feel like it belongs to the client, not like a generic tool.

## Design rules baked into the templates

These are opinionated defaults. Keep them unless the client explicitly wants something different.

- No rounded corners. Cards use `border-radius: 2px` max.
- No gradients. Solid colours only.
- Accent borders as straight lines (e.g. a left border on a card), not curves.
- No em dashes in copy.

The goal is a site that reads as sharp and intentional, not AI-generic.
