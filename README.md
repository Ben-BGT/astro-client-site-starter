# astro-client-site-starter

A client-ready Astro site with a built-in CMS. Git-based content, zero lock-in. Clone it, swap the branding, and hand a site to a client that they can edit themselves.

## What it is

A small, opinionated starter that pairs:

- **Astro** for fast static pages and routing
- **Keystatic** for a friendly CMS editor at `/keystatic`
- **Tailwind CSS** for styling with theme tokens you can rebrand in minutes
- **Markdoc** for Markdown content with richer components when you need them

The client edits posts in their browser, the edits save straight into the git repo, and the site redeploys. No database. No monthly CMS fee. No lock-in.

## Quick start

```bash
git clone <your-fork-url> my-client-site
cd my-client-site
npm install
npm run dev
```

Open `http://localhost:4321` for the site and `http://localhost:4321/keystatic` for the CMS.

## How the CMS works

Keystatic runs as part of the site at `/keystatic`. Editors see a normal-looking admin UI with lists and forms. When they hit save, Keystatic writes a markdown file (with frontmatter) into `src/content/posts/` and commits it to git. The build then picks up the new content on the next deploy.

In local mode (the default in this starter) saves write to your filesystem. In production you switch Keystatic's storage to GitHub, and editors log in with their GitHub account to edit the live site from their browser. Details below.

## Adding content

**New blog post:** open `/keystatic`, choose `Posts`, click `Add Post`. Fill in the title, date, excerpt, cover image, and body. Save.

**New page:** create a new `.astro` file under `src/pages/`. Copy one of the existing pages (about, contact) as a starting point. The filename becomes the URL.

**New navigation link:** edit the `navigation` array at the top of `src/components/Header.astro` and the footer links in `src/components/Footer.astro`.

## Theming

All the colour and font tokens live in `src/styles/global.css` inside the `@theme { ... }` block. Change `--color-primary`, `--color-accent`, and the neutrals, and the whole site follows. The font is Oxanium from Google Fonts, loaded in `src/layouts/Layout.astro`. Swap it out the same way.

## Deploying

This starter uses the Astro Node adapter in standalone mode, so it runs on any Node host. The easiest options:

- **Vercel** — connect the GitHub repo, Vercel detects Astro, and you're live.
- **Netlify** — same flow, connect the repo and deploy.
- **Cloudflare Pages** — connect the repo, pick the Astro framework preset.
- **Replit** — import the repo, set the run command to `npm run build && node ./dist/server/entry.mjs`.

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

- **Git-based content** — the repo is the site. Nothing to export, nothing to migrate.
- **No database** — hosting stays cheap and there's nothing to back up or patch.
- **Astro is fast** — static HTML by default, almost no JavaScript shipped to the browser.

## License

MIT. See [LICENSE](LICENSE).

## Credits

Based on the pattern used at [mikerhodes.com.au](https://mikerhodes.com.au). Shared with the Ads to AI community.
