import { MarkdownRemark } from '../../graphql-types'
import { FixedObject, FluidObject } from 'gatsby-image'

export interface IBlogPost {
  id: string
  frontmatter: {
    title: string
    description: string
    date: string
    category: string
    tags: string[]
    song: string
    image: {
      sharp: {
        fluid: FluidObject
        fixed: FixedObject
      }
    }
    imageAlt: string
    published: boolean
  }
  excerpt: string
  fileAbsolutePath: string
  fields: {
    slug: string
  }
  html: string
  htmlAst: string
  excerptAst: string
  timeToRead: number
}

// FIXME it's ugly :/
const EmptyPost = {
  id: '',
  frontmatter: {
    title: 'Untitled',
    description: '',
    date: new Date().toISOString(),
    category: 'No Category',
    tags: [],
    song: '',
    image: null,
    imageAlt: '',
    published: false,
  },
  excerpt: '',
  fileAbsolutePath: '',
  fields: {
    slug: '',
  },
  html: '',
  htmlAst: '',
  excerptAst: '',
  timeToRead: 0,
}

export const BlogPost = (mdr: Partial<MarkdownRemark> | null = {}): IBlogPost => ({
  ...EmptyPost,
  ...(mdr as any),
})
