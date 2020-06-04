import { graphql } from 'gatsby'

export const postPreviewImageFragment = graphql`
  fragment PostPreviewImage on ImageSharp {
    fixed(quality: 90, width: 220, height: 220) {
      ...GatsbyImageSharpFixed_withWebp
    }
  }
`

export const openGraphImageFragment = graphql`
  fragment OpenGraphImage on ImageSharp {
    fixed(width: 1200, height: 630) {
      ...GatsbyImageSharpFixed_withWebp
    }
  }
`

export const displayImageFragment = graphql`
  fragment DisplayImage on ImageSharp {
    fluid(quality: 100) {
      ...GatsbyImageSharpFluid_withWebp
    }
  }
`

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
          ...DisplayImage
          ...OpenGraphImage
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
          ...PostPreviewImage
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
