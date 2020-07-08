import { graphql } from 'gatsby'
import React, { FC } from 'react'
import { IndexPageQuery } from '../../graphql-types'
import { Layout } from '../components/layout'
import { PostList } from '../components/post-list'
import { RecentWork } from '../components/recent-work'
import Seo from '../components/seo'
import { BlogPost } from '../models/blog-post'

interface IIndexPageProps {
  data: IndexPageQuery
}

const IndexPage: FC<IIndexPageProps> = ({ data }) => {
  const posts = data.allMarkdownRemark.edges.map((edge) => BlogPost(edge.node))
  const repositories: any = data.githubData?.data?.user?.repositories?.nodes?.slice(0, 6)

  return (
    <>
      <Seo />
      <Layout>
        <PostList posts={posts} title="||l Blog" />
        <RecentWork repositories={repositories} />
      </Layout>
    </>
  )
}

export default IndexPage

export const query = graphql`
  query IndexPage {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/" }, frontmatter: { published: { eq: true } } }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      edges {
        node {
          ...PostPreview
        }
      }
    }
    githubData {
      data {
        user {
          repositories {
            nodes {
              description
              nameWithOwner
              url
              forkCount
              issues {
                totalCount
              }
              pullRequests {
                totalCount
              }
              stargazers {
                totalCount
              }
            }
          }
        }
      }
    }
  }
`
