import { graphql } from 'gatsby'

export const postPageFragment = graphql`
  fragment PostPage on MarkdownRemark {
    html
    fields {
      slug
    }
    frontmatter {
      title
      song
      tags
      description
      image {
        sharp: childImageSharp {
          fluid(quality: 100) {
            ...GatsbyImageSharpFluid_withWebp
          }
          fixed(quality: 90, width: 1200, height: 630) {
            ...GatsbyImageSharpFixed_withWebp
          }
        }
      }
      imageAlt
    }
  }
`

export const postPreviewFragment = graphql`
  fragment PostPreview on MarkdownRemark {
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
`
