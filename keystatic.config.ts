import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    // Local storage: writes straight to the filesystem while running locally.
    // For a production site editable through the browser, switch to:
    //   kind: 'github',
    //   repo: { owner: 'your-org', name: 'your-repo' },
    // and set up the GitHub OAuth app (see README).
    kind: 'local',
  },
  ui: {
    brand: { name: 'Site CMS' },
  },
  collections: {
    posts: collection({
      label: 'Posts',
      slugField: 'title',
      path: 'src/content/posts/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        date: fields.date({
          label: 'Published date',
          defaultValue: { kind: 'today' },
        }),
        excerpt: fields.text({
          label: 'Excerpt',
          description: 'Short summary shown on the listing page',
          multiline: true,
        }),
        cover: fields.image({
          label: 'Cover image',
          directory: 'public/images/posts',
          publicPath: '/images/posts/',
        }),
        content: fields.markdoc({
          label: 'Body',
          options: {
            image: {
              directory: 'public/images/posts',
              publicPath: '/images/posts/',
            },
          },
        }),
      },
    }),
  },
});
