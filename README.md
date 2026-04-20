# astro-client-site-starter

A client-ready Astro site with a built-in CMS, so a business owner can edit their own website without touching code.

## Live demo

[https://astro-starter-demo.vercel.app](https://astro-starter-demo.vercel.app)

(Demo URL will be updated once the site is deployed.)

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
3. Click `Homepage`, change the hero headline, hit `Save`.
4. Flip back to the public tab and refresh. Your edit is live.

That's the full loop. Clone, run, edit, see it change. From here, customise the branding and add a client's real content.

## What you can edit

The starter is customisable on three levels.

### Theme presets (one-line rebrand)

Five built-in theme presets ship out of the box. Swap the active theme by changing a single import in `src/layouts/Layout.astro`.

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
- **Testimonials** — client quotes. Author, quote, role, company, optional photo, `featured` flag for the homepage.
- **Case studies** — project write-ups. Title, client, summary, metrics, cover image, Markdoc body.

### Singletons (one-of-a-kind records)

- **Site settings** — site name, tagline, meta description, contact email, social links, footer text.
- **Homepage** — hero copy, CTA, featured-section intro.
- **About page** — title, tagline, and the full Markdoc body for `/about`.

## Page templates included

| Route | Content source | Intended use |
|-------|----------------|--------------|
| `/` | Singleton `homepage` + collections `services` and featured `testimonials` | Homepage |
| `/services` | Collection `services` (sorted by `order`) | Services index |
| `/services/[slug]` | Collection `services` (one entry) | Service detail page |
| `/team` | Collection `team` | Who's behind the business |
| `/pricing` | Static `.astro` file | Pricing (deliberately not CMS-driven) |
| `/landing-example` | Static copy + collection `testimonials` | Reusable conversion landing page |
| `/blog` | Collection `posts` | Blog index |
| `/blog/[slug]` | Collection `posts` | Individual blog post |
| `/about` | Singleton `aboutPage` | About page |
| `/contact` | Singleton `siteSettings.contactEmail` | Contact page |
| `/404` | Static | Not-found page |
| `/rss.xml` | Collection `posts` | RSS feed |

## Customising for a client

See [CUSTOMIZING.md](CUSTOMIZING.md) for colours, fonts, layout, and how to add new CMS collections.

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
Yes. Once the site is deployed with Keystatic in GitHub mode, they sign in with GitHub and edit every collection and singleton from the browser. No dev involvement needed for routine content changes.

**What if the client leaves?**
Everything is theirs. The repo, the domain, the hosting account (if set up in their name), the content files. There's no database to migrate, no proprietary CMS to exit. They clone the repo and keep going, or they hand it to another developer.

**How do I charge?**
Common patterns: a flat build fee, plus an optional monthly retainer for hosting, monitoring, and changes the client doesn't want to make themselves. Because there's no CMS licence fee, the margin's yours.

**Do I need a server?**
No. The site deploys as static-first with a small Node adapter for Keystatic. Vercel, Netlify, and Cloudflare Pages all run it on their free or cheap tiers.

**How do I rebrand?**
Swap the theme preset by changing one import line in `src/layouts/Layout.astro`. Five presets ship with the starter (editorial, startup, agency, boutique, brutalist). For finer control, override individual CSS custom property tokens in `src/styles/global.css` or a custom theme file. Full walkthrough in [CUSTOMIZING.md](CUSTOMIZING.md).

## Credits

Based on the pattern I use at [mikerhodes.com.au](https://mikerhodes.com.au). Shared with the Ads to AI community.

## License

MIT. See [LICENSE](LICENSE).
