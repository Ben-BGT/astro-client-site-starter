# Deploying the site

The starter uses the Astro Node adapter, so it runs on any modern JS host. Pick one of Vercel, Netlify, or Cloudflare Pages. All three work, all three are either free or cheap at client traffic levels.

## Before you deploy

Open `astro.config.mjs` and set `site: 'https://yourclient.com'` so the sitemap and RSS feed use the correct URL. Commit, push.

## Recommendation: create the hosting account in the client's name

Sign the client up for the hosting account (Vercel / Netlify / Cloudflare) with their email. Add yourself as a team member. That way, if you part ways later, the billing, the control, and the deploy history all transfer with the site. The client doesn't get locked into your account.

Same for the GitHub repo and the domain registrar. Client owns the stack. You're the maintainer, not the gatekeeper.

## Vercel

1. **Fork or push** the repo to the client's GitHub account.
2. **Create a Vercel account** in the client's name, log in, click `Add New > Project`.
3. **Connect the repo** and accept the default build settings. Vercel detects Astro automatically.
4. **Set the custom domain** under `Project Settings > Domains`. Add the client's domain, and follow the DNS instructions Vercel gives you.

That's the whole deploy. Every push to `main` re-deploys.

## Netlify

1. **Fork or push** the repo to the client's GitHub account.
2. **Create a Netlify account** in the client's name, click `Add new site > Import an existing project`.
3. **Connect the repo.** Netlify picks up the Astro build settings from `astro.config.mjs`.
4. **Add the custom domain** under `Site settings > Domain management`. Point the client's DNS at Netlify.

## Cloudflare Pages

1. **Fork or push** the repo to the client's GitHub account.
2. **Create a Cloudflare account** in the client's name, go to `Workers & Pages > Create > Pages > Connect to Git`.
3. **Select the repo**, pick the `Astro` framework preset, accept the defaults.
4. **Add the custom domain** under `Custom domains`. If the domain is already on Cloudflare DNS, it's one click.

## Going to production with GitHub OAuth for Keystatic

Out of the box, `keystatic.config.ts` uses `storage: { kind: 'local' }`. That only works when the site is running on someone's laptop. If you want the client to edit the live site from their browser, switch Keystatic to GitHub mode.

This is the step most people skip, and it's the one that unlocks the whole "client edits their own site" promise.

**1. Create a GitHub OAuth App**

In the client's GitHub account, go to `Settings > Developer settings > OAuth Apps > New OAuth App`.

- **Application name:** something like `Acme Website CMS`.
- **Homepage URL:** `https://yourclient.com`
- **Authorization callback URL:** `https://yourclient.com/api/keystatic/github/oauth/callback`

Save. GitHub gives you a **Client ID**. Generate a new **Client Secret**. Copy both.

**2. Add the credentials to your host as environment variables**

On Vercel / Netlify / Cloudflare Pages, open the project's environment variables panel and add:

- `KEYSTATIC_GITHUB_CLIENT_ID` = the Client ID from step 1
- `KEYSTATIC_GITHUB_CLIENT_SECRET` = the Client Secret from step 1

**3. Switch storage in `keystatic.config.ts`**

```ts
storage: {
  kind: 'github',
  repo: { owner: 'client-github-user', name: 'client-site-repo' },
},
```

Replace `client-github-user` and `client-site-repo` with the real GitHub username / organisation and the real repo name.

**4. Redeploy**

Push the config change, trigger a fresh deploy, and visit `https://yourclient.com/keystatic`. Click `Sign in with GitHub`, authorise the app, and you're in. Any edit commits straight to the `main` branch of the GitHub repo, which kicks off a new build. Edits go live in about a minute.

Full Keystatic GitHub docs: [https://keystatic.com/docs/github-model](https://keystatic.com/docs/github-model)

## Rollbacks

Because content is in git, a rollback is just `git revert` (or a click in the host's deploy history). No DB restore, no backup file to find. That's one of the quiet benefits of a git-based CMS that's worth mentioning to clients.
