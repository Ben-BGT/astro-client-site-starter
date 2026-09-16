import { config, fields, collection, singleton } from '@keystatic/core';

/*
  Shared block library. Every page-level singleton or collection that supports
  block-based editing uses `pageBlocks()` so the block schema stays identical
  across homepage, about page, and landing pages.
*/
const heroBlock = fields.object({
  variant: fields.select({
    label: 'Hero variant',
    description:
      'Left-aligned: default workhorse. Centered: balanced, good for landing pages. Split with image: text left, photo right. Dark bold: inverted statement hero.',
    options: [
      { label: 'Left-aligned', value: 'left-aligned' },
      { label: 'Centered', value: 'centered' },
      { label: 'Split with image', value: 'split-with-image' },
      { label: 'Dark bold', value: 'dark-bold' },
    ],
    defaultValue: 'left-aligned',
  }),
  overline: fields.text({ label: 'Overline', defaultValue: 'Welcome' }),
  headline: fields.text({
    label: 'Headline',
    defaultValue: 'A simple, fast site you actually own.',
  }),
  subhead: fields.text({
    label: 'Subhead',
    multiline: true,
    defaultValue: '',
  }),
  ctaText: fields.text({ label: 'CTA text', defaultValue: '' }),
  ctaUrl: fields.text({ label: 'CTA URL', defaultValue: '' }),
  image: fields.image({
    label: 'Image',
    description:
      'Only shown by the "Split with image" variant. Ignored otherwise.',
    directory: 'public/images/blocks',
    publicPath: '/images/blocks/',
  }),
  imageAlt: fields.text({
    label: 'Image alt text',
    description:
      'Describes the image for screen readers and search engines. Leave blank to fall back to the headline.',
    defaultValue: '',
  }),
});

const featureGridBlock = fields.object({
  title: fields.text({ label: 'Title', defaultValue: '' }),
  intro: fields.text({ label: 'Intro', multiline: true, defaultValue: '' }),
  columns: fields.select({
    label: 'Columns',
    options: [
      { label: 'Three', value: '3' },
      { label: 'Four', value: '4' },
    ],
    defaultValue: '3',
  }),
  items: fields.array(
    fields.object({
      icon: fields.text({
        label: 'Icon',
        description: 'An emoji or short label (e.g. "01", "Brand").',
      }),
      title: fields.text({ label: 'Title' }),
      body: fields.text({ label: 'Body', multiline: true }),
    }),
    {
      label: 'Items',
      itemLabel: (props) => props.fields.title.value || 'Feature',
    }
  ),
});

const testimonialWallBlock = fields.object({
  overline: fields.text({
    label: 'Overline',
    description: 'Small label above the heading. Leave blank to hide it.',
    defaultValue: 'Testimonials',
  }),
  title: fields.text({ label: 'Title', defaultValue: 'What clients say' }),
  intro: fields.text({ label: 'Intro', multiline: true, defaultValue: '' }),
  source: fields.select({
    label: 'Source',
    description:
      'Featured: only testimonials with the "featured" flag. All: everything in the testimonials collection.',
    options: [
      { label: 'Featured testimonials only', value: 'featured' },
      { label: 'All testimonials', value: 'all' },
    ],
    defaultValue: 'featured',
  }),
  limit: fields.integer({
    label: 'Limit',
    description: 'Maximum testimonials to show. Leave blank for no limit.',
    defaultValue: 6,
  }),
});

const ctaBandBlock = fields.object({
  headline: fields.text({
    label: 'Headline',
    defaultValue: 'Ready to get started?',
  }),
  subhead: fields.text({ label: 'Subhead', multiline: true, defaultValue: '' }),
  ctaText: fields.text({ label: 'CTA text', defaultValue: 'Book a call' }),
  ctaUrl: fields.text({ label: 'CTA URL', defaultValue: '/contact' }),
  tone: fields.select({
    label: 'Tone',
    options: [
      { label: 'Light', value: 'light' },
      { label: 'Dark', value: 'dark' },
    ],
    defaultValue: 'light',
  }),
});

const faqBlock = fields.object({
  overline: fields.text({
    label: 'Overline',
    description: 'Small label above the heading. Leave blank to hide it.',
    defaultValue: 'FAQ',
  }),
  title: fields.text({ label: 'Title', defaultValue: 'Questions' }),
  intro: fields.text({ label: 'Intro', multiline: true, defaultValue: '' }),
  items: fields.array(
    fields.object({
      question: fields.text({ label: 'Question' }),
      answer: fields.text({ label: 'Answer', multiline: true }),
    }),
    {
      label: 'Items',
      itemLabel: (props) => props.fields.question.value || 'FAQ item',
    }
  ),
});

const statsBlock = fields.object({
  title: fields.text({ label: 'Title', defaultValue: '' }),
  items: fields.array(
    fields.object({
      value: fields.text({
        label: 'Value',
        description: 'e.g. "98%", "10K+", "$2.4M"',
      }),
      label: fields.text({ label: 'Label' }),
    }),
    {
      label: 'Items',
      itemLabel: (props) =>
        `${props.fields.value.value || ''} ${props.fields.label.value || ''}`.trim() || 'Stat',
    }
  ),
});

const pricingTiersBlock = fields.object({
  overline: fields.text({
    label: 'Overline',
    description: 'Small label above the heading. Leave blank to hide it.',
    defaultValue: 'Pricing',
  }),
  title: fields.text({ label: 'Title', defaultValue: 'Pricing' }),
  intro: fields.text({ label: 'Intro', multiline: true, defaultValue: '' }),
  tiers: fields.array(
    fields.object({
      name: fields.text({ label: 'Name' }),
      price: fields.text({
        label: 'Price',
        description: 'e.g. "$2,500", "Custom"',
      }),
      period: fields.text({
        label: 'Period',
        description: 'e.g. "one-off", "per month". Leave blank if none.',
        defaultValue: '',
      }),
      description: fields.text({
        label: 'Description',
        multiline: true,
        defaultValue: '',
      }),
      featured: fields.checkbox({
        label: 'Featured',
        description: 'Highlight this tier.',
        defaultValue: false,
      }),
      ctaText: fields.text({ label: 'CTA text', defaultValue: 'Get started' }),
      ctaUrl: fields.text({ label: 'CTA URL', defaultValue: '/contact' }),
      features: fields.array(fields.text({ label: 'Feature' }), {
        label: 'Features',
        itemLabel: (props) => props.value || 'Feature',
      }),
    }),
    {
      label: 'Tiers',
      itemLabel: (props) => props.fields.name.value || 'Tier',
    }
  ),
});

const logoCloudBlock = fields.object({
  title: fields.text({ label: 'Title', defaultValue: '' }),
  logos: fields.array(
    fields.object({
      name: fields.text({ label: 'Name' }),
      image: fields.image({
        label: 'Image',
        directory: 'public/images/logos',
        publicPath: '/images/logos/',
      }),
    }),
    {
      label: 'Logos',
      itemLabel: (props) => props.fields.name.value || 'Logo',
    }
  ),
});

/*
  The markdoc field is not allowed inside a conditional discriminant, so the
  content block stores its body as a multiline text field. BlockRenderer splits
  paragraphs on blank lines so basic long-form copy still reads as expected.
*/
const contentBlockBlock = fields.object({
  body: fields.text({
    label: 'Body',
    description:
      'Long-form text. Separate paragraphs with a blank line. Renders inside a narrow, readable column.',
    multiline: true,
    defaultValue: '',
  }),
});

const ctaSplitBlock = fields.object({
  image: fields.image({
    label: 'Image',
    directory: 'public/images/blocks',
    publicPath: '/images/blocks/',
  }),
  imageAlt: fields.text({
    label: 'Image alt text',
    description:
      'Describes the image for screen readers and search engines. Leave blank to fall back to the headline.',
    defaultValue: '',
  }),
  headline: fields.text({ label: 'Headline', defaultValue: '' }),
  subhead: fields.text({ label: 'Subhead', multiline: true, defaultValue: '' }),
  ctaText: fields.text({ label: 'CTA text', defaultValue: '' }),
  ctaUrl: fields.text({ label: 'CTA URL', defaultValue: '' }),
  imageSide: fields.select({
    label: 'Image side',
    options: [
      { label: 'Left', value: 'left' },
      { label: 'Right', value: 'right' },
    ],
    defaultValue: 'left',
  }),
});

function pageBlocks(label: string) {
  return fields.array(
    fields.conditional(
      fields.select({
        label: 'Block type',
        options: [
          { label: 'Hero', value: 'hero' },
          { label: 'Feature grid', value: 'feature-grid' },
          { label: 'Testimonial wall', value: 'testimonial-wall' },
          { label: 'CTA band', value: 'cta-band' },
          { label: 'FAQ', value: 'faq' },
          { label: 'Stats', value: 'stats' },
          { label: 'Pricing tiers', value: 'pricing-tiers' },
          { label: 'Logo cloud', value: 'logo-cloud' },
          { label: 'Content block', value: 'content-block' },
          { label: 'CTA split', value: 'cta-split' },
        ],
        defaultValue: 'hero',
      }),
      {
        hero: heroBlock,
        'feature-grid': featureGridBlock,
        'testimonial-wall': testimonialWallBlock,
        'cta-band': ctaBandBlock,
        faq: faqBlock,
        stats: statsBlock,
        'pricing-tiers': pricingTiersBlock,
        'logo-cloud': logoCloudBlock,
        'content-block': contentBlockBlock,
        'cta-split': ctaSplitBlock,
      }
    ),
    {
      label,
      itemLabel: (props) => props.fields.discriminant.value,
    }
  );
}

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
      'Site content': [
        'homepage',
        'aboutPage',
        'landingPages',
        'services',
        'team',
        'testimonials',
        'caseStudies',
        'posts',
      ],
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
        design: fields.object(
          {
            themePreset: fields.select({
              label: 'Theme preset',
              description:
                'Starting point for colours, fonts and radius. The overrides below win over whatever the preset ships with.',
              options: [
                { label: 'Editorial (serif, magazine-grade)', value: 'editorial' },
                { label: 'Startup (clean sans, blue)', value: 'startup' },
                { label: 'Agency (mono, monochrome, orange accent)', value: 'agency' },
                { label: 'Boutique (warm sepia, gold)', value: 'boutique' },
                { label: 'Brutalist (black/white, heavy)', value: 'brutalist' },
                { label: 'Custom (no preset, pure overrides)', value: 'custom' },
              ],
              defaultValue: 'startup',
            }),
            primaryColor: fields.text({
              label: 'Primary color (hex)',
              description:
                'Optional. Overrides the preset primary. Example: #2563EB. Leave blank to keep the preset default.',
              validation: { length: { min: 0, max: 9 } },
            }),
            primaryHoverColor: fields.text({
              label: 'Primary hover color (hex)',
              description: 'Optional. Slightly darker than primary. Example: #1D4ED8.',
              validation: { length: { min: 0, max: 9 } },
            }),
            accentColor: fields.text({
              label: 'Accent color (hex)',
              description: 'Optional. Used sparingly for callouts and eyebrows.',
              validation: { length: { min: 0, max: 9 } },
            }),
            // TODO (member extensions): Collapse the three font fields
            // (fontBody, fontDisplay, googleFontsHref) into a single "Font pair"
            // select with a curated list (Inter + Fraunces, IBM Plex Sans + IBM
            // Plex Serif, etc). The select value maps server-side to both the
            // font-family stacks and the Google Fonts import URL, so clients
            // can't mismatch them. Keep these three as an "Advanced" escape hatch.
            fontBody: fields.text({
              label: 'Body font stack',
              description:
                'CSS font-family value. Example: "Inter, system-ui, sans-serif". Remember to set the Google Fonts URL below if you reference a web font.',
            }),
            fontDisplay: fields.text({
              label: 'Display font stack (headings)',
              description: 'CSS font-family value for h1 through h6.',
            }),
            googleFontsHref: fields.url({
              label: 'Google Fonts URL (optional)',
              description:
                'Paste the full import URL from fonts.google.com, e.g. https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap',
            }),
            radius: fields.select({
              label: 'Corner radius',
              description: 'Site-wide rounded-corner sharpness.',
              options: [
                { label: 'Sharp (0px)', value: '0' },
                { label: 'Near-sharp (2px)', value: '2' },
                { label: 'Subtle (4px)', value: '4' },
                { label: 'Soft (8px)', value: '8' },
              ],
              defaultValue: '2',
            }),
            headerVariant: fields.select({
              label: 'Header variant',
              description:
                'Minimal: name left, nav right. Centered: name above nav. Split: nav flanking centered name.',
              options: [
                { label: 'Minimal (default)', value: 'minimal' },
                { label: 'Centered', value: 'centered' },
                { label: 'Split', value: 'split' },
              ],
              defaultValue: 'minimal',
            }),
            footerVariant: fields.select({
              label: 'Footer variant',
              description:
                'Simple: one-line. Columns: three columns of links and contact. Minimal: copyright only.',
              options: [
                { label: 'Simple (default)', value: 'simple' },
                { label: 'Columns', value: 'columns' },
                { label: 'Minimal', value: 'minimal' },
              ],
              defaultValue: 'simple',
            }),
          },
          {
            label: 'Design',
            description:
              'Colors, fonts, radius, and Header/Footer variants. Pick a preset for a starting point, then fine-tune. Hero style is now a block-level choice on each page.',
          }
        ),
      },
    }),
    homepage: singleton({
      label: 'Homepage',
      path: 'src/content/pages/homepage',
      format: { data: 'json' },
      schema: {
        blocks: pageBlocks('Page blocks'),
      },
    }),
    aboutPage: singleton({
      label: 'About page',
      path: 'src/content/pages/about',
      format: { data: 'json' },
      schema: {
        title: fields.text({ label: 'Title', defaultValue: 'About' }),
        blocks: pageBlocks('Page blocks'),
      },
    }),
  },
  collections: {
    landingPages: collection({
      label: 'Landing pages',
      slugField: 'title',
      path: 'src/content/landingPages/*',
      format: { data: 'json' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({
          label: 'Meta description',
          description: 'Used in the page <meta name="description"> tag.',
          multiline: true,
        }),
        showChrome: fields.checkbox({
          label: 'Show site header and footer',
          description:
            'Uncheck for a pure, chrome-free landing page (no nav, no footer). Handy for paid-ads landing pages.',
          defaultValue: true,
        }),
        blocks: pageBlocks('Page blocks'),
      },
    }),
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
