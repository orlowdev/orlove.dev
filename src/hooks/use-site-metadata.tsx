import { graphql, useStaticQuery } from 'gatsby'

export const useSiteMetadata = () => {
  const query: any = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          siteUrl
          description
        }
      }
    }
  `)

  return query.site.siteMetadata
}
