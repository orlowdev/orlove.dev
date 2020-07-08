import styled from '@emotion/styled'
import { OutboundLink } from 'gatsby-plugin-google-analytics'
import { Color } from './global-styles'
import React, { FC } from 'react'
import { LabelList, Label } from './labels'

const RepoLink = styled(OutboundLink)`
  text-decoration: none;

  > h3 {
    :hover {
      color: ${Color.PRIMARY};
    }
  }
`

const RepoPreview = styled.div`
  border-top: 1px solid #0000000f;
  padding: 2rem 0;
  width: 100%;

  :last-of-type {
    border-bottom: 0;
    margin-bottom: 0;
  }

  @media screen and (min-width: 800px) {
    width: 50%;
  }
`

const RepoWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`

interface IRepository {
  nameWithOwner: string
  url: string
  description: string
  stargazers: {
    totalCount: number
  }
  forkCount: number
  pullRequests: {
    totalCount: number
  }
  issues: {
    totalCount: number
  }
}

interface IRecentWorkProps {
  repositories?: IRepository[] | null
}

export const RecentWork: FC<IRecentWorkProps> = ({ repositories }) => (
  <div>
    <h2>||l Recent Work</h2>
    <RepoWrapper>
      {repositories &&
        repositories.map((repository) => (
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
    </RepoWrapper>
  </div>
)
