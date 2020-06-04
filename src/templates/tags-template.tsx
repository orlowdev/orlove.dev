import React, { FC } from 'react'
import { Link, graphql } from 'gatsby'
import { TagsContentQuery } from '../../graphql-types'
import { Layout } from '../components/layout'
import { InternalRoute } from '../routes'
import { PostList } from '../components/post-list'
import { BlogPost } from '../models/blog-post'
import Seo from '../components/seo'

interface ITagsTemplateProps {
  pageContext: {
    tag: string
  }
  data: TagsContentQuery
}

const Tags: FC<ITagsTemplateProps> = ({ pageContext, data }) => (
  <>
    <Seo title={`#${pageContext.tag} posts`} />
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
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
            description
            imageAlt
            tags
            image {
              sharp: childImageSharp {
                fixed(quality: 90, width: 220, height: 220) {
                  ...GatsbyImageSharpFixed_withWebp
                }
              }
            }
          }
          fields {
            slug
          }
          excerpt(pruneLength: 150)
          timeToRead
        }
      }
    }
  }
`
