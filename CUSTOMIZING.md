# Customising the starter

How to turn the generic starter into a site that looks and feels like a specific client's brand.

## Editing the theme from the CMS

From v0.3.0 onwards, the client can change colors, fonts, radius, and pick Header / Footer / Hero variants directly from `/keystatic`. No code edits, no deploys beyond a normal save-and-rebuild.

### Walkthrough: rebrand in four clicks

1. Open `/keystatic` in the browser.
2. Click **Site settings** in the sidebar, then scroll to the **Design** section.
3. Pick a theme preset for a starting point (Startup, Editorial, Agency, Boutique, Brutalist, or Custom).
4. Optionally override:
   - **Primary color** — hex like `#E11D48`. Overrides the preset primary.
   - **Primary hover color** — usually a slightly darker shade.
   - **Accent color** — used sparingly for eyebrows and callouts.
   - **Body font stack** and **Display font stack** — full CSS font-family strings (e.g. `Inter, system-ui, sans-serif`). Pair with the Google Fonts URL below if loading a web font.
   - **Google Fonts URL** — paste the full `https://fonts.googleapis.com/css2?...` URL.
   - **Corner radius** — Sharp (0px), Near-sharp (2px), Subtle (4px), Soft (8px).
   - **Header variant** — Minimal, Centered, Split.
   - **Footer variant** — Simple, Columns, Minimal.
   - **Homepage hero variant** — Left-aligned, Centered, Split with image, Dark bold.
5. Hit **Save**. The browser tab running `npm run dev` refreshes and the site is rebranded.

### How the overrides and presets interact

- `global.css` sets sensible defaults.
- The chosen preset (`public/themes/<preset>.css`) loads next and sets its opinionated tokens.
- Anything typed into the Design fields in Keystatic wins last. Blanks mean "keep whatever the preset gave me".
- So `themePreset: boutique` + `primaryColor: #0A0A0A` = boutique look but with a black primary.

Pick `Custom` in the theme preset dropdown to skip the preset entirely and run pure global defaults plus your own overrides.

## Theme presets (one-line rebrand)

The recommended way to swap presets is from Keystatic (see above). This section covers the code-level mechanism for developers who want to understand or extend it.

The starter ships with five ready-made theme presets. Swap the active theme from Keystatic, or hard-code it by editing `src/content/settings/site.json`.

| Preset | Feel |
|--------|------|
| `editorial` | Serif display, restrained neutrals, deep red accent, magazine-grade whitespace |
| `startup` | Clean sans-serif pair, confident blue primary, warm off-white backgrounds (the default) |
| `agency` | Mono display, high-contrast monochrome, hot orange accent, zero radius |
| `boutique` | Soft warm palette, sepia neutrals, gold/tan primary, gentle 6px radius |
| `brutalist` | Raw black-on-white, heavy borders, chunky type, zero radius, no accent colour |

### How to swap

Open `/keystatic` → Site settings → Design → Theme preset and pick a new value. Save. Every button, card, border radius, font, and colour follows the new theme. No component edits required.

Under the hood, `Layout.astro` reads `siteSettings.design.themePreset` and loads the matching CSS from `public/themes/<preset>.css`.

### How the theme system works

Every design token lives as a CSS custom property on `:root` in `src/styles/global.css`. Theme files in `src/styles/themes/*.css` are tiny override files, each defining a single `:root` block that replaces the default token values. Tailwind 4's `@theme` block maps those tokens through to utility classes (`bg-primary`, `text-foreground`, `font-sans`, etc.), so the whole site picks up the new values through the cascade.

### Token reference

Defined in `src/styles/global.css`:

```css
:root {
  /* Colours */
  --color-background: #ffffff;
  --color-foreground: #0f172a;
  --color-primary: #1f6feb;
  --color-primary-hover: #1a5fcc;
  --color-primary-foreground: #ffffff;
  --color-accent: #0ea5a4;
  --color-muted: #f5f5f5;
  --color-muted-foreground: #64748b;
  --color-border: #e2e8f0;

  /* Typography */
  --font-body: "Oxanium", ui-sans-serif, system-ui, sans-serif;
  --font-display: "Oxanium", ui-sans-serif, system-ui, sans-serif;
  --font-mono: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;

  /* Radius */
  --radius-sm: 2px;
  --radius-md: 2px;
  --radius-lg: 2px;

  /* Spacing */
  --space-xs, --space-sm, --space-md, --space-lg, --space-xl, --space-2xl, --space-3xl
}
```

The tokens that matter most for rebranding:

- `--color-primary` — the accent colour used for buttons, links, focus rings, and callouts. The single biggest visual change.
- `--color-primary-hover` — the hover state for `--color-primary`. Usually a slightly darker shade.
- `--color-accent` — a secondary accent. Used sparingly. Set it to something complementary, or match `--color-primary` if the brand only has one colour.
- `--color-foreground` — the main body text colour.
- `--color-muted` / `--color-muted-foreground` — soft background blocks and secondary text.
- `--color-border` — hairlines, dividers, card outlines.
- `--font-body` — every paragraph, button, and piece of UI copy.
- `--font-display` — headings (`h1` through `h6`).
- `--radius-md` — the site-wide corner radius. Every card, button, and image uses this.

### Creating a custom theme

1. Copy any preset, for example `cp src/styles/themes/startup.css src/styles/themes/acme.css`.
2. Edit the token values inside the `:root` block.
3. Swap the import in `Layout.astro` to `import "../styles/themes/acme.css";`.

You only need to declare the tokens you want to override. Anything you leave out falls back to the defaults in `global.css`.

## Google Fonts

The starter no longer hard-codes a Google Fonts link. Instead, the Layout exposes a `fontsHref` prop. Two ways to load a web font:

**Option 1 — pass the URL through the layout prop.** Good when one page needs a different font, or when you want the URL in a single place.

```astro
<Layout title="Home" fontsHref="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap">
  ...
</Layout>
```

When `fontsHref` is set, the Layout emits the standard preconnect + stylesheet tags. When it's `null` (the default) nothing is loaded, so the site falls back to whatever system fonts are in the theme's `--font-body` stack.

**Option 2 — paste the `<link>` tags directly into `Layout.astro`.** Good for the single-brand site where the font never changes.

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
```

Whichever you pick, make sure your active theme's `--font-body` and `--font-display` put the new font first in the stack.

## Header, Footer, and Hero variants

Three Header variants, three Footer variants, four homepage Hero variants. All pick-able from Keystatic → Site settings → Design.

### Header variants (`src/components/headers/`)

| Variant | When to use |
|---------|------------|
| `minimal` | Default. Name left, nav right. Works for most business sites. |
| `centered` | Name centered on top, nav below. Best for boutique brands, blogs, editorial. |
| `split` | Three nav items, centered name, three more nav items. Best for premium / luxury. |

### Footer variants (`src/components/footers/`)

| Variant | When to use |
|---------|------------|
| `simple` | Default. One row: brand + copyright + quick links. |
| `columns` | Three columns: About, Links, Connect. Good for content-heavy sites. |
| `minimal` | Just copyright on one line. Good for portfolios and landing pages. |

### Homepage hero variants (`src/components/heroes/`)

| Variant | When to use |
|---------|------------|
| `left-aligned` | Default. Text left, CTAs below. Practical, works everywhere. |
| `centered` | Text centered and stacked. Calmer, balanced, good for landing pages. |
| `split-with-image` | Text left, photo/illustration right. Good for products and personal brands. Set the **Hero image** field on the Homepage singleton. Falls back to a subtle placeholder if blank. |
| `dark-bold` | Inverted background, oversize type, accent eyebrow. Statement hero for agencies and studios. |

All variants inherit the active theme tokens. Switching the corner-radius selector, for example, updates every variant's cards and buttons without touching a component file.

## Layout structure

The site's chrome lives in two dispatcher components that read `siteSettings.design` and render the right variant:

- `src/components/Header.astro` — picks from `headers/HeaderMinimal.astro`, `headers/HeaderCentered.astro`, or `headers/HeaderSplit.astro`.
- `src/components/Footer.astro` — picks from `footers/FooterSimple.astro`, `footers/FooterColumns.astro`, or `footers/FooterMinimal.astro`.

`src/pages/index.astro` does the same for the homepage hero, picking from the four files in `src/components/heroes/`.

`src/layouts/Layout.astro` is the wrapper every page uses. That's where the theme preset stylesheet, CMS overrides, Google Fonts, `<head>`, and body structure live. Edit it when you need to add global scripts or meta tags.

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

- No rounded corners. Cards use `border-radius: 2px` max. The one sanctioned deviation is the `boutique` theme, which goes to 6px intentionally to match the softer brand feel.
- No gradients. Solid colours only.
- Accent borders as straight lines (e.g. a left border on a card), not curves.
- No em dashes in copy.

The goal is a site that reads as sharp and intentional, not AI-generic.
