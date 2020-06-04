import React, { FC } from 'react'
import { graphql, Link } from 'gatsby'
import { Layout } from '../components/layout'
import { BlogPostsQuery } from '../../graphql-types'
import { BlogPost, IBlogPost } from '../models/blog-post'
import styled from '@emotion/styled'
import { Caption } from '../components/text'
import { Color } from '../components/global-styles'
import { CoffeeCups } from '../components/coffee-cups'
import GatsbyImage from 'gatsby-image'
import Seo from '../components/seo'

const BlogTitle = styled.h1`
  font-size: 3rem;
  margin: 3rem 0;
`

const PostLink = styled(Link)`
  text-decoration: none;

  > h3 {
    :hover {
      color: ${Color.PRIMARY};
    }
  }
`

const PostDate = styled.span`
  color: #aaa;
`

const PostImageLink = styled(Link)`
  display: none;

  @media screen and (min-width: 1000px) {
    display: inline-block;
  }
`

const PostWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const PostDescription = styled.div`
  margin-top: 1rem;

  @media screen and (min-width: 1000px) {
    width: calc(100% - 220px);
  }
`

interface IPostPreviewProps {
  post: IBlogPost
}

const PostPreview: FC<IPostPreviewProps> = ({ post }) => (
  <PostWrapper>
    <PostImageLink to={post.fields.slug}>
      <GatsbyImage
        title={post.frontmatter.imageAlt}
        fixed={post.frontmatter.image.sharp.fixed}
        alt={post.frontmatter.imageAlt}
        fadeIn
      />
    </PostImageLink>
    <PostDescription>
      <PostLink to={post.fields.slug}>
        <h3>
          {post.frontmatter.title} <PostDate>— {post.frontmatter.date}</PostDate>
        </h3>
      </PostLink>
      <Caption>
        <CoffeeCups timeToRead={post.timeToRead} />
        {post.timeToRead} min read
      </Caption>
      <p>
        {post.excerpt} <Link to={post.fields.slug}>Read more</Link>
      </p>
    </PostDescription>
  </PostWrapper>
)

const IndexPage: FC<{ data: BlogPostsQuery }> = ({ data }) => {
  const posts = data.allMarkdownRemark.edges.map((edge) => BlogPost(edge.node))

  return (
    <>
      <Seo />
      <Layout>
        <div>
          <BlogTitle>||l Blog</BlogTitle>

          {posts.map((post) => (
            <PostPreview post={post} key={post.id} />
          ))}
        </div>
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
