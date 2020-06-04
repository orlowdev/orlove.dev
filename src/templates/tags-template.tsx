import React, { FC } from 'react'
import { Link, graphql } from 'gatsby'
import { TagsContentQuery } from '../../graphql-types'
import { Layout } from '../components/layout'
import { InternalRoute } from '../routes'
import { PostList } from '../components/post-list'
import { BlogPost } from '../models/blog-post'
import Seo from '../components/seo'

interface ITagsTemplateProps {
  data: TagsContentQuery
  pageContext: {
    tag: string
  }
}

const Tags: FC<ITagsTemplateProps> = ({ pageContext, data }) => (
  <>
    <Seo
      title={`#${pageContext.tag} posts`}
      description={`Here you can find all my blog posts tagged with #${pageContext.tag}.`}
      url={`/tags/${pageContext.tag}`}
    />
    <Layout>
      <PostList
        posts={data.allMarkdownRemark.edges.map((e) => BlogPost(e.node))}
        title={`#${pageContext.tag} posts`}
      />

      <Link to={InternalRoute.HOME}>&larr; Back to all posts</Link>
    </Layout>
  </>
)

export default Tags

export const query = graphql`
  query TagsContent($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      edges {
        node {
          ...PostPreview
        }
      }
    }
  }
`
