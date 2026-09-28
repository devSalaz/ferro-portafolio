import { defineContentConfig, defineCollection } from '@nuxt/content'
import { defineRobotsSchema, defineSitemapSchema } from '@nuxtjs/seo/content'
import { z } from 'zod'


const media = z.object({
  type: z.enum(['image', 'video']),
  src: z.string(),
  alt: z.string().optional()
})

export default defineContentConfig({
  collections: {
    pages: defineCollection({
      type: 'page',
      source: '*.md',
      schema: z.object({
        projects: z.array(
          z.object({
            title: z.string(),
            media,
            year: z.string(),
            label: z.string(),
            to: z.string(),
          })
        ).optional(),
        robots: defineRobotsSchema(),
        sitemap: defineSitemapSchema(),
      }),
    }),
    works: defineCollection({
      type: 'page',
      source: 'works/*.md',
      schema: z.object({
        skills: z.array(z.string()),
        description: z.string(),
        collaborators: z.string(),
        liveProject: z.string().optional(),
        nextProject: z.string(),
        cover: z.object({
          type: z.enum(['image', 'video']),
          src: z.string(),
          alt: z.string().optional(),
        }),
        blocks: z.array(
          z.discriminatedUnion('type', [
            z.object({ type: z.literal('media'), media}),
            z.object({ type: z.literal('grid'), items: z.array(media).length(2) })
          ])
        ),
        robots: defineRobotsSchema({ z }),
        sitemap: defineSitemapSchema({ z }),
      }),
    }),
  },
})
