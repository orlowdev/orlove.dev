import styled from '@emotion/styled'
import { Link } from 'gatsby'
import React, { FC } from 'react'

export const Label = styled.span`
  padding: 0.25rem 0.5rem;
  background-color: #eee;
  font-size: 0.8rem;
  margin-right: 8px;
  margin-bottom: 8px;
  text-transform: lowercase;

  > a {
    text-decoration: none;
  }

  :last-of-type {
    margin-right: 0;
  }
`

export const LabelList = styled.div`
  margin-bottom: 2rem;
  display: flex;
  flex-wrap: wrap;
`

interface ILabelsProps {
  from: string[]
  limit?: number
}

export const Labels: FC<ILabelsProps> = ({ from, limit = 0 }) => {
  const tags = limit ? from.slice(0, limit) : from

  return (
    <LabelList>
      {tags.map((tag, i) => (
        <Label key={tag || i}>
          <Link to={`/tags/${tag}`}>#{tag}</Link>
        </Label>
      ))}
    </LabelList>
  )
}
