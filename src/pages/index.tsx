import React, { FC } from 'react'
import { graphql } from 'gatsby'
import { Layout } from '../components/layout'
import { BlogPostsQuery } from '../../graphql-types'
import { BlogPost } from '../models/blog-post'
import Seo from '../components/seo'
import { PostList } from '../components/post-list'

const IndexPage: FC<{ data: BlogPostsQuery }> = ({ data }) => {
  const posts = data.allMarkdownRemark.edges.map((edge) => BlogPost(edge.node))

  return (
    <>
      <Seo />
      <Layout>
        <PostList posts={posts} title="||l Blog" />
      </Layout>
    </>
  )
}

export const query = graphql`
  query BlogPosts {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/" }, frontmatter: { published: { eq: true } } }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
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

export default IndexPage
