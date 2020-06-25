import styled from '@emotion/styled'
import { graphql } from 'gatsby'
import { OutboundLink } from 'gatsby-plugin-google-analytics'
import React, { FC } from 'react'
import { BlogPostsQuery } from '../../graphql-types'
import { Color } from '../components/global-styles'
import { Label, LabelList } from '../components/labels'
import { Layout } from '../components/layout'
import { PostList } from '../components/post-list'
import Seo from '../components/seo'
import { BlogPost } from '../models/blog-post'

const RepoLink = styled(OutboundLink)`
  text-decoration: none;

  > h3 {
    :hover {
      color: ${Color.PRIMARY};
    }
  }
`

interface IIndexPageProps {
  data: BlogPostsQuery
}

const RepoPreview = styled.div`
  border-bottom: 1px solid #0000000f;
  margin-bottom: 2rem;

  :last-of-type {
    border-bottom: 0;
    margin-bottom: 0;
  }
`

const IndexPage: FC<IIndexPageProps> = ({ data }: any) => {
  const posts = data.allMarkdownRemark.edges.map((edge: any) => BlogPost(edge.node))
  console.log(data.githubData)

  return (
    <>
      <Seo />
      <Layout>
        <PostList posts={posts} title="||l Blog" />
        <div>
          <h2>||l Recent Work</h2>
          {data.githubData.data.user.repositories.nodes.slice(0, 5).map((repository: any) => (
            <RepoPreview key={repository.nameWithOwner}>
              <RepoLink href={repository.url} rel="nofollow">
                <h3>@{repository.nameWithOwner}</h3>
              </RepoLink>
              <p>{repository.description}</p>
              <LabelList>
                <Label>
                  <span title="Stargazers">★ {repository.stargazers.totalCount}</span>
                </Label>
                <Label>
                  <span title="Forks">⑂ {repository.forkCount}</span>
                </Label>
                <Label>
                  <span title="Open Pull Requests">↹ {repository.pullRequests.totalCount}</span>
                </Label>
                <Label>
                  <span title="Open Issues">⊗ {repository.issues.totalCount}</span>
                </Label>
              </LabelList>
            </RepoPreview>
          ))}
        </div>
      </Layout>
    </>
  )
}

export default IndexPage

export const query = graphql`
  query BlogPosts {
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
