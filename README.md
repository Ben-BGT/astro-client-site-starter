# astro-client-site-starter

A client-ready Astro site with a built-in CMS and a real library of page templates. Git-based content, zero lock-in. Clone it, swap the branding, and hand a client a site they can actually edit themselves.

## What it is

A small, opinionated starter that pairs:

- **Astro** for fast static pages and routing
- **Keystatic** for a friendly CMS editor at `/keystatic`
- **Tailwind CSS** for styling with theme tokens you can rebrand in minutes
- **Markdoc** for Markdown content with richer components when you need them

The client edits content in their browser, the edits save straight into the git repo, and the site redeploys. No database. No monthly CMS fee. No lock-in.

## Quick start

```bash
git clone <your-fork-url> my-client-site
cd my-client-site
npm install
npm run dev
```

Open `http://localhost:4321` for the site and `http://localhost:4321/keystatic` for the CMS.

## What you can edit via `/keystatic`

Open `/keystatic` in the browser and the editor groups everything into two sections.

### Site content (collections)

- **Posts** — blog posts. Title, date, excerpt, cover image, markdoc body.
- **Services** — what the business does. Title, summary, icon (emoji or short label), sort order, markdoc body.
- **Team** — people profiles. Name, role, bio, photo, social links, sort order.
- **Testimonials** — client quotes. Author, quote, role, company, optional photo, `featured` flag for homepage/landing.
- **Case studies** — project write-ups. Title, client, summary, metrics (label + value array), cover image, markdoc body.

### Configuration (singletons)

- **Site settings** — site name, tagline, meta description, contact email, social links, footer text. Drives the header, footer, and contact page.
- **Homepage** — hero overline, headline, subhead, CTA text and URL, featured section title and text.
- **About page** — title, tagline, and full markdoc body for `/about`.

Singletons are one-of-a-kind records (there's only ever one homepage). Collections are lists (add as many posts, services, or team members as you like).

## Page templates included

| Page | File | Content source |
|------|------|----------------|
| Home | `src/pages/index.astro` | Singleton: `homepage` + collections: `services`, `testimonials` (featured only) |
| Services index | `src/pages/services/index.astro` | Collection: `services` (sorted by `order`) |
| Service detail | `src/pages/services/[...slug].astro` | Collection: `services` (one entry) |
| Team | `src/pages/team.astro` | Collection: `team` (sorted by `order`) |
| Pricing | `src/pages/pricing.astro` | Static (edit the file directly) |
| Landing example | `src/pages/landing-example.astro` | Static copy + collection: `testimonials` |
| Blog index | `src/pages/blog/index.astro` | Collection: `posts` (featured first, rest in grid) |
| Blog detail | `src/pages/blog/[...slug].astro` | Collection: `posts` (with reading time) |
| About | `src/pages/about.astro` | Singleton: `aboutPage` |
| Contact | `src/pages/contact.astro` | Singleton: `siteSettings.contactEmail` |
| 404 | `src/pages/404.astro` | Static |
| RSS | `src/pages/rss.xml.js` | Collection: `posts` |

Pricing is deliberately static, not CMS-driven. Pricing changes should go through a developer review rather than a client update, so the copy lives in the `.astro` file.

The landing page example (`/landing-example`) is a conversion-focused single-page template (hero / problem / solution / features / testimonials / pricing / FAQ / final CTA). Use it as a scaffold for client landing pages. Testimonials pull from the CMS so the client can swap them without touching code.

## Adding a new page type (5 steps)

Say the client wants a new "Events" section.

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
2. **Register it in `src/content.config.ts`:**
   ```ts
   const events = defineCollection({
     loader: glob({ pattern: "**/*.mdoc", base: "./src/content/events" }),
     schema: z.object({
       title: z.string(),
       date: z.coerce.date(),
       location: z.string().optional(),
     }),
   });
   // and add `events` to the exported `collections` object.
   ```
3. **Create `src/pages/events/index.astro`** that calls `getCollection('events')` and renders a list. Copy `src/pages/services/index.astro` as a starting point.
4. **Create `src/pages/events/[...slug].astro`** that renders a single entry. Copy `src/pages/services/[...slug].astro`.
5. **Seed one entry** by running `npm run dev`, opening `/keystatic`, clicking `Events` > `Add Event`, filling in the fields, and saving. A new `.mdoc` file appears in `src/content/events/`.

## How the CMS works

Keystatic runs as part of the site at `/keystatic`. Editors see a normal-looking admin UI with lists and forms. When they hit save, Keystatic writes a file (markdoc or JSON) into `src/content/` and commits it to git. The build then picks up the new content on the next deploy.

In local mode (the default in this starter) saves write to your filesystem. In production you switch Keystatic's storage to GitHub, and editors log in with their GitHub account to edit the live site from their browser. Details below.

## Theming

All the colour and font tokens live in `src/styles/global.css` inside the `@theme { ... }` block. Change `--color-primary`, `--color-accent`, and the neutrals, and the whole site follows. The starter uses Oxanium as a default but falls back to `system-ui`, so if you delete the Google Fonts preconnect in `Layout.astro` the site still looks fine. Clients can pick their own font at any time.

The starter uses only generic tokens (`primary`, `foreground`, `muted`, `border`). Swap colours to match any brand in seconds.

Design rules baked into the templates:
- No rounded corners. Cards use `border-radius: 2px` max.
- No gradients.
- No em dashes in copy.

## Deploying

This starter uses the Astro Node adapter in standalone mode, so it runs on any Node host. The easiest options:

- **Replit** — import the repo, set the run command to `npm run build && node ./dist/server/entry.mjs`.
- **Netlify** — connect the repo and deploy.
- **Cloudflare Pages** — connect the repo, pick the Astro framework preset.

For client work, create the hosting account in the client's name. That way the whole stack (domain, repo, host) stays with them if you part ways.

Before deploying, open `astro.config.mjs` and set `site: 'https://yourclient.com'` so the sitemap and RSS feed use the right URL.

## Going to production with GitHub OAuth for Keystatic

`storage: { kind: 'local' }` in `keystatic.config.ts` only works when the site is running on someone's laptop. To let the client edit the live site from their browser:

1. Create a GitHub OAuth App in the client's GitHub account. Callback URL: `https://yourclient.com/api/keystatic/github/oauth/callback`.
2. Add the client ID and secret as environment variables on your host (`KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`).
3. In `keystatic.config.ts`, switch storage to:
   ```ts
   storage: {
     kind: 'github',
     repo: { owner: 'client-github-user', name: 'client-site-repo' },
   },
   ```
4. Deploy. Editors visit `/keystatic`, click `Sign in with GitHub`, and can edit the live site from any browser.

Full Keystatic GitHub setup docs: https://keystatic.com/docs/github-model

## Why this stack

- **Git-based content.** The repo is the site. Nothing to export, nothing to migrate.
- **No database.** Hosting stays cheap and there's nothing to back up or patch.
- **Astro is fast.** Static HTML by default, almost no JavaScript shipped to the browser.
- **Template library.** Services, team, blog, testimonials, case studies, landing pages, pricing. A client can run most of a small business from this set of pages on day one.

## License

MIT. See [LICENSE](LICENSE).
