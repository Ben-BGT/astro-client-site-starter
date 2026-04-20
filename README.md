# astro-client-site-starter

A client-ready Astro site with a built-in CMS, so a business owner can edit their own website without touching code. Copy, colors, fonts, corner radius, whole layout variants (Header, Footer), and now the entire page structure are all editable from `/keystatic`.

From v0.4.0 onwards, the homepage, about page, and any number of landing pages are built from a library of reusable **blocks**. The client picks blocks, reorders them, and fills in fields. No page template to rewrite, no code to deploy.

## Live demo

[https://astro-client-site-starter.vercel.app](https://astro-client-site-starter.vercel.app)

Poke the homepage, services, team, blog, pricing, landing page. Everything's editable once you clone it. The `/keystatic` editor isn't exposed on the demo — it runs in local mode only until you wire up GitHub OAuth, which members do when they deploy for their own client. See [DEPLOY.md](DEPLOY.md).

## Screenshots

Public site, CMS editor, and a page rendered from the CMS:

![Home page](docs/screenshots/home.png)

![Keystatic CMS](docs/screenshots/keystatic.png)

![Services page](docs/screenshots/services.png)

## 5-minute quickstart

```bash
git clone https://github.com/mikerhodesideas/astro-client-site-starter.git my-client-site
cd my-client-site
npm install
npm run dev
```

Then:

1. Open `http://localhost:4321/` — the public site.
2. Open `http://localhost:4321/keystatic` — the CMS.
3. Click `Homepage`, click a block, change a field, hit `Save`.
4. Flip back to the public tab and refresh. Your edit is live.

That's the full loop. Clone, run, edit, see it change. From here, customise the branding, build pages with blocks, and add the client's real content.

## What you can edit

The starter is customisable on four levels, all reachable from `/keystatic` without touching code.

### Design (from /keystatic)

Open `/keystatic` → Site settings → **Design** to change:

- **Theme preset** — Editorial, Startup, Agency, Boutique, Brutalist, or Custom.
- **Primary / Primary hover / Accent color** — hex overrides that win over the preset.
- **Body and display font stacks** — CSS font-family values.
- **Google Fonts URL** — paste the import URL straight from fonts.google.com.
- **Corner radius** — Sharp (0), Near-sharp (2), Subtle (4), Soft (8).
- **Header variant** — Minimal, Centered, Split.
- **Footer variant** — Simple, Columns, Minimal.

Save, refresh the public tab. The entire site rebrands.

Hero style is no longer a site-level setting. It's picked per-page inside each Hero block, so one page can be dark-bold while another is left-aligned.

### Theme presets

Five opinionated starting points ship out of the box:

| Preset | Feel |
|--------|------|
| `editorial` | Serif display, restrained neutrals, deep red accent, magazine whitespace |
| `startup` | Clean sans-serif pair, blue primary, warm off-white backgrounds (the default) |
| `agency` | Mono display, monochrome palette, hot orange accent, zero radius |
| `boutique` | Soft warm palette, sepia neutrals, gold/tan primary, gentle 6px radius |
| `brutalist` | Black-on-white, heavy borders, chunky type, zero radius, no accent |

![Theme preview](docs/screenshots/themes.png)

Full walkthrough and a token reference are in [CUSTOMIZING.md](CUSTOMIZING.md).

### Content via /keystatic

Open `/keystatic` in the browser and the editor groups everything into two sections.

### Collections (lists)

- **Posts** — blog posts. Title, date, excerpt, cover image, Markdoc body.
- **Services** — what the business does. Title, summary, icon, sort order, Markdoc body.
- **Team** — people profiles. Name, role, bio, photo, social links, sort order.
- **Testimonials** — client quotes. Author, quote, role, company, optional photo, `featured` flag used by the Testimonial wall block.
- **Case studies** — project write-ups. Title, client, summary, metrics, cover image, Markdoc body.
- **Landing pages** — stand-alone block-driven pages at `/landing/<slug>`. Toggle `showChrome` off for pure conversion pages.

### Singletons (one-of-a-kind records)

- **Site settings** — site name, tagline, meta description, contact email, social links, footer text, design.
- **Homepage** — page blocks (hero, features, stats, testimonials, CTA bands, etc).
- **About page** — title + page blocks.

## Block library

Every block below is a self-contained `.astro` component in `src/components/blocks/` and a matching schema entry in `keystatic.config.ts`. Homepage, about page, and landing pages all draw from the same library.

| Block | What it does | Fields |
|-------|--------------|--------|
| `hero` | Renders one of the 4 hero variants | variant, overline, headline, subhead, ctaText, ctaUrl, image (split-with-image only) |
| `feature-grid` | 3 or 4 column grid of icon + title + body | title, intro, columns, items |
| `testimonial-wall` | Reads the testimonials collection, renders a wall | title, intro, source (featured/all), limit |
| `cta-band` | Full-bleed headline + button. Light or dark tone | headline, subhead, ctaText, ctaUrl, tone |
| `faq` | Native accordion of question/answer pairs | title, intro, items |
| `stats` | Big-number grid, tabular-nums | title, items (value + label) |
| `pricing-tiers` | Tier cards with features list, one featured | title, intro, tiers |
| `logo-cloud` | Grayscale logos, colour on hover | title, logos |
| `content-block` | Long-form text in a narrow column | body (multiline) |
| `cta-split` | Image + headline + button, side by side | image, headline, subhead, ctaText, ctaUrl, imageSide |

Adding a new block type takes three steps: schema in `keystatic.config.ts`, component in `src/components/blocks/`, case in `src/components/BlockRenderer.astro`.

## Page templates included

| Route | Content source | Intended use |
|-------|----------------|--------------|
| `/` | Singleton `homepage.blocks` (block-driven) | Homepage |
| `/about` | Singleton `aboutPage.blocks` (block-driven) | About page |
| `/landing/<slug>` | Collection `landingPages.blocks` (block-driven) | Conversion / campaign landing pages |
| `/services` | Collection `services` (sorted by `order`) | Services index |
| `/services/[slug]` | Collection `services` (one entry) | Service detail page |
| `/team` | Collection `team` | Who's behind the business |
| `/pricing` | Static `.astro` file | Static pricing (deliberately not CMS-driven) |
| `/landing-example` | Static legacy landing | Reference implementation kept for comparison |
| `/blog` | Collection `posts` | Blog index |
| `/blog/[slug]` | Collection `posts` | Individual blog post |
| `/contact` | Singleton `siteSettings.contactEmail` | Contact page |
| `/404` | Static | Not-found page |
| `/rss.xml` | Collection `posts` | RSS feed |

Plus 3 Header variants (Minimal, Centered, Split) and 3 Footer variants (Simple, Columns, Minimal), all pick-able from Keystatic → Site settings → Design.

## Customising for a client

See [CUSTOMIZING.md](CUSTOMIZING.md) for colours, fonts, layout, block-building, and how to add new CMS collections.

## Deploying

See [DEPLOY.md](DEPLOY.md) for Vercel, Netlify, and Cloudflare Pages, plus the steps to switch Keystatic from local mode to GitHub mode so the client can edit the live site.

## Adding a new page type

Say the client wants an `Events` section. Five steps.

1. **Add the collection to `keystatic.config.ts`:**
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
2. **Register it in `src/content.config.ts`** alongside the other collections.
3. **Create `src/pages/events/index.astro`** — a list page. Copy `src/pages/services/index.astro` as a starting point.
4. **Create `src/pages/events/[...slug].astro`** — a detail page. Copy `src/pages/services/[...slug].astro`.
5. **Seed one entry** — run `npm run dev`, open `/keystatic`, click `Events`, `Add Event`, save. A new `.mdoc` file appears in `src/content/events/`.

## FAQ

**Can clients edit without my help?**
Yes. Once the site is deployed with Keystatic in GitHub mode, they sign in with GitHub and edit every collection, singleton, and page block from the browser. No dev involvement needed for routine content changes.

**What if the client leaves?**
Everything is theirs. The repo, the domain, the hosting account (if set up in their name), the content files. There's no database to migrate, no proprietary CMS to exit. They clone the repo and keep going, or they hand it to another developer.

**How do I charge?**
Common patterns: a flat build fee, plus an optional monthly retainer for hosting, monitoring, and changes the client doesn't want to make themselves. Because there's no CMS licence fee, the margin's yours.

**Do I need a server?**
No. The site deploys as static-first with a small Node adapter for Keystatic. Vercel, Netlify, and Cloudflare Pages all run it on their free or cheap tiers.

**How do I rebrand?**
Open `/keystatic` → Site settings → Design. Pick a preset, override colors and fonts, switch Header / Footer variants. Save. Five presets ship with the starter (editorial, startup, agency, boutique, brutalist). Full walkthrough in [CUSTOMIZING.md](CUSTOMIZING.md).

## Ideas to extend (good member builds)

The starter ships a production-ready base, but a handful of high-value upgrades are deliberately left for members to build, so you can pick whichever matches the client. Every item below has a TODO comment in the relevant file to show exactly where the code goes.

### Setup-time polish (do once per client)

- **Set the site URL.** Open `astro.config.mjs` and set `site: 'https://yourclient.com'`. The sitemap integration is already wired, so a valid sitemap-index.xml appears in `dist/` at build time.
- **Swap the favicon.** Replace `public/favicon.svg` and add apple-touch-icon and PNG fallbacks.
- **Pick an analytics provider.** Drop a Plausible, Fathom, or GTM snippet into `src/layouts/Layout.astro` where the TODO comment sits in `<head>`.

### Content and interaction upgrades

- **Real contact form.** `src/pages/contact.astro` is a `mailto:` link today. Swap for Tally, Netlify Forms, Formspree, or a Resend-powered Astro API route.
- **AI hero image generator.** Add a small `/api/generate-hero-image` route that calls Fal.ai Seedream, Replicate, or the OpenAI images endpoint, then wires the result into the Hero block's image field.
- **Rich text in ContentBlock.** Current block splits paragraphs only. Run the body through `marked` or `markdown-it`, or add a dedicated `longform` Keystatic collection with `fields.markdoc` for proper long-form prose.
- **Better font picker.** `keystatic.config.ts` exposes three font fields that can go out of sync. Collapse to one "Font pair" select that maps to both the font stacks and the Google Fonts URL server-side. Keep the three raw fields as an "Advanced" escape hatch.

### SEO and performance

- **Per-page OG images.** Use `satori` + `@vercel/og` to render SVG to PNG at build time, then point `og:image` at the generated asset. Big uplift for social share previews.
- **Structured data (JSON-LD).** Paste an `Organization`, `LocalBusiness`, or `Article` block in `Layout.astro`, keyed off `Astro.url.pathname`. Helps SEO and AI surfaces parse the site.
- **Responsive images.** Swap `<img>` for Astro's `<Image />` component in Hero, CtaSplit, LogoCloud. Generates srcset plus WebP/AVIF variants at build.

### Blog upgrades

- **Pagination.** Use Astro's native `getStaticPaths` pagination once posts exceed 50.
- **On-site search.** Pagefind drops in with `npm i -D pagefind` plus a post-build step plus one UI snippet. No infra.
- **Tag archives.** Add `tags: fields.array(...)` to the posts schema and generate `/blog/tag/[tag]` with `getStaticPaths`.

### Visual polish

- **Dark mode.** Add a `@media (prefers-color-scheme: dark)` layer inside each theme file, or wire a manual toggle that flips `[data-theme="dark"]` and persists to localStorage.
- **Theme preview page.** A `/theme-preview` route that renders every hero, header, footer, and block variant in one place is the fastest way to screenshot the starter for sales.

Each item is a small, self-contained win. Ship one, use it on a client, and the starter gets stronger for everyone.

## Credits

Based on the pattern I use at [mikerhodes.com.au](https://mikerhodes.com.au). Shared with the Ads to AI community.

## License

MIT. See [LICENSE](LICENSE).
