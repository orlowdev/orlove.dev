import { Color } from './global-styles'
import styled from '@emotion/styled'
import React, { FC } from 'react'
import { Link } from 'gatsby'

interface ILabelProps {
  background?: Color
}

export const Label = styled.span<ILabelProps>`
  padding: 0.25rem 0.5rem;
  background-color: ${(p) => p.background || '#eee'};
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
