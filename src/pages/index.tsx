import React, { FC } from 'react'
import { graphql } from 'gatsby'
import { Layout } from '../components/layout'
import { BlogPostsQuery } from '../../graphql-types'
import { BlogPost } from '../models/blog-post'
import Seo from '../components/seo'
import { PostPreview } from '../components/post-preview'
import { PostListTitle } from '../components/text'

const IndexPage: FC<{ data: BlogPostsQuery }> = ({ data }) => {
  const posts = data.allMarkdownRemark.edges.map((edge) => BlogPost(edge.node))

  return (
    <>
      <Seo />
      <Layout>
        <PostListTitle>||l Blog</PostListTitle>

        {posts.map((post) => (
          <PostPreview post={post} key={post.id} />
        ))}
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
            image {
              sharp: childImageSharp {
                fixed(quality: 90, width: 200, height: 200) {
                  ...GatsbyImageSharpFixed_withWebp
                }
              }
            }
          }
          fields {
            slug
          }
          excerpt(pruneLength: 240)
          timeToRead
        }
      }
    }
  }
`

export default IndexPage
