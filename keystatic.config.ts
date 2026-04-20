import { config, fields, collection, singleton } from '@keystatic/core';

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
    navigation: {
      'Site content': ['homepage', 'aboutPage', 'services', 'team', 'testimonials', 'caseStudies', 'posts'],
      'Configuration': ['siteSettings'],
    },
  },
  singletons: {
    siteSettings: singleton({
      label: 'Site settings',
      path: 'src/content/settings/site',
      format: { data: 'json' },
      schema: {
        siteName: fields.text({ label: 'Site name', defaultValue: 'Your Site' }),
        tagline: fields.text({ label: 'Tagline', defaultValue: 'A short line that describes the business.' }),
        description: fields.text({
          label: 'Meta description',
          description: 'Used in the page <meta name="description"> tag.',
          multiline: true,
          defaultValue: 'A fast, git-based Astro site with a built-in CMS.',
        }),
        contactEmail: fields.text({ label: 'Contact email', defaultValue: 'hello@example.com' }),
        socialLinks: fields.array(
          fields.object({
            label: fields.text({ label: 'Label', description: 'e.g. LinkedIn, Twitter' }),
            url: fields.text({ label: 'URL' }),
          }),
          {
            label: 'Social links',
            itemLabel: (props) => props.fields.label.value || 'Social link',
          }
        ),
        footerText: fields.text({
          label: 'Footer text',
          description: 'Short line shown in the footer. Year is added automatically.',
          defaultValue: 'Your Company.',
        }),
      },
    }),
    homepage: singleton({
      label: 'Homepage',
      path: 'src/content/pages/homepage',
      format: { data: 'json' },
      schema: {
        heroOverline: fields.text({ label: 'Hero overline', defaultValue: 'Welcome' }),
        heroHeadline: fields.text({
          label: 'Hero headline',
          defaultValue: 'A simple, fast site you actually own.',
        }),
        heroSubhead: fields.text({
          label: 'Hero subhead',
          multiline: true,
          defaultValue:
            "Write posts in the browser. Commits land in git. Deploy for a few dollars a month. Swap the copy, pick your colours, and you're live.",
        }),
        heroCtaText: fields.text({ label: 'Hero CTA text', defaultValue: 'Read the blog' }),
        heroCtaUrl: fields.text({ label: 'Hero CTA URL', defaultValue: '/blog' }),
        featuredSectionTitle: fields.text({
          label: 'Featured section title',
          defaultValue: 'What I do',
        }),
        featuredSectionText: fields.text({
          label: 'Featured section text',
          multiline: true,
          defaultValue: 'A short line that introduces the services grid below.',
        }),
      },
    }),
    aboutPage: singleton({
      label: 'About page',
      path: 'src/content/pages/about',
      format: { contentField: 'content' },
      schema: {
        title: fields.text({ label: 'Title', defaultValue: 'About' }),
        tagline: fields.text({
          label: 'Tagline',
          defaultValue: 'A short line about who runs the business.',
        }),
        content: fields.markdoc({
          label: 'Body',
          options: {
            image: {
              directory: 'public/images/about',
              publicPath: '/images/about/',
            },
          },
        }),
      },
    }),
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
    services: collection({
      label: 'Services',
      slugField: 'title',
      path: 'src/content/services/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        summary: fields.text({
          label: 'Summary',
          description: 'One or two sentences, shown on the services grid.',
          multiline: true,
        }),
        icon: fields.text({
          label: 'Icon',
          description: 'An emoji or short label (e.g. 🎨, "Brand", "01").',
        }),
        order: fields.integer({
          label: 'Order',
          description: 'Lower numbers show first.',
          defaultValue: 10,
        }),
        content: fields.markdoc({
          label: 'Body',
          options: {
            image: {
              directory: 'public/images/services',
              publicPath: '/images/services/',
            },
          },
        }),
      },
    }),
    team: collection({
      label: 'Team',
      slugField: 'name',
      path: 'src/content/team/*',
      format: { data: 'json' },
      schema: {
        name: fields.slug({ name: { label: 'Name' } }),
        role: fields.text({ label: 'Role', description: 'e.g. Founder, Designer, Developer' }),
        bio: fields.text({ label: 'Bio', multiline: true }),
        photo: fields.image({
          label: 'Photo',
          directory: 'public/images/team',
          publicPath: '/images/team/',
        }),
        links: fields.array(
          fields.object({
            label: fields.text({ label: 'Label', description: 'e.g. LinkedIn, Email, Website' }),
            url: fields.text({ label: 'URL' }),
          }),
          {
            label: 'Links',
            itemLabel: (props) => props.fields.label.value || 'Link',
          }
        ),
        order: fields.integer({
          label: 'Order',
          description: 'Lower numbers show first.',
          defaultValue: 10,
        }),
      },
    }),
    testimonials: collection({
      label: 'Testimonials',
      slugField: 'author',
      path: 'src/content/testimonials/*',
      format: { data: 'json' },
      schema: {
        author: fields.slug({ name: { label: 'Author' } }),
        quote: fields.text({ label: 'Quote', multiline: true }),
        role: fields.text({ label: 'Role', description: 'e.g. Head of Marketing' }),
        company: fields.text({ label: 'Company' }),
        photo: fields.image({
          label: 'Photo (optional)',
          directory: 'public/images/testimonials',
          publicPath: '/images/testimonials/',
        }),
        featured: fields.checkbox({
          label: 'Featured',
          description: 'Show prominently on the homepage / landing page.',
          defaultValue: false,
        }),
      },
    }),
    caseStudies: collection({
      label: 'Case studies',
      slugField: 'title',
      path: 'src/content/caseStudies/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        client: fields.text({ label: 'Client' }),
        summary: fields.text({ label: 'Summary', multiline: true }),
        metrics: fields.array(
          fields.object({
            label: fields.text({ label: 'Label', description: 'e.g. Revenue lift' }),
            value: fields.text({ label: 'Value', description: 'e.g. +42%' }),
          }),
          {
            label: 'Metrics',
            itemLabel: (props) =>
              `${props.fields.label.value || 'Metric'}: ${props.fields.value.value || ''}`,
          }
        ),
        cover: fields.image({
          label: 'Cover image',
          directory: 'public/images/caseStudies',
          publicPath: '/images/caseStudies/',
        }),
        content: fields.markdoc({
          label: 'Body',
          options: {
            image: {
              directory: 'public/images/caseStudies',
              publicPath: '/images/caseStudies/',
            },
          },
        }),
      },
    }),
  },
});
