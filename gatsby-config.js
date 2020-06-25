const {
  NODE_ENV,
  URL: NETLIFY_SITE_URL = 'https://orlove.dev',
  DEPLOY_PRIME_URL: NETLIFY_DEPLOY_URL = NETLIFY_SITE_URL,
  CONTEXT: NETLIFY_ENV = NODE_ENV,
  GITHUB_TOKEN,
} = process.env
const isNetlifyProduction = NETLIFY_ENV === 'production'
const siteUrl = isNetlifyProduction ? NETLIFY_SITE_URL : NETLIFY_DEPLOY_URL

module.exports = {
  siteMetadata: {
    siteUrl,
    title: 'Here I write about random stuff',
    description: "I don't have a third person bio.",
    author: {
      name: 'Sergei Orlov',
      bio: 'I code a bit.',
    },
  },
  plugins: [
    'gatsby-plugin-emotion',
    'gatsby-plugin-typescript',
    'gatsby-plugin-graphql-codegen',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-source-github-api',
      options: {
        token: GITHUB_TOKEN,
        variables: {},
        graphQLQuery: `query {
          user(login: "priestine") {
            repositories(isFork: false, first: 50, isLocked: false, orderBy: { field: UPDATED_AT, direction: DESC }) {
              nodes {
                description
                licenseInfo {
                  name
                }
                nameWithOwner
                url
                forkCount
                stargazers {
                  totalCount
                }
                issues(states: OPEN) {
                  totalCount
                }
                pullRequests(states: OPEN) {
                  totalCount
                }
              }
            }
          }
        }`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/src/pages/`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/content/`,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-autolink-headers',
          'gatsby-plugin-catch-links',
          'gatsby-remark-embedder',
          {
            resolve: 'gatsby-remark-highlight-code',
            options: {
              terminal: 'carbon',
              theme: 'one-light',
              lineNumbers: true,
            },
          },
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: null,
              rel: 'nofollow',
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 2048,
              showCaptions: true,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map((edge) => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ 'content:encoded': edge.node.html }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  filter: { fileAbsolutePath: { regex: "/content/" }, frontmatter: { published: { eq: true } } }
                  sort: { order: DESC, fields: [frontmatter___date] }
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
                        date
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: '||l RSS Feed',
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/typography.ts',
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-168545679-1',
        anonymize: true,
        respectDNT: true,
        pageTransitionDelay: 0,
        defer: false,
        cookieDomain: 'orlove.dev',
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Orlove.dev',
        short_name: '||love',
        start_url: '/',
        background_color: '#f6f6f6',
        theme_color: '#9C89B8',
        icon: 'content/assets/img/favicon.png',
        display: 'standalone',
        cache_busting_mode: 'none',
        icon_options: {
          purpose: 'maskable',
        },
      },
    },
    {
      resolve: 'gatsby-plugin-offline',
      options: {
        workboxConfig: {
          globPatterns: ['**/*'],
        },
      },
    },
    'gatsby-plugin-netlify',
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        color: '#9c89b8',
        showSpinner: true,
      },
    },
  ],
}
