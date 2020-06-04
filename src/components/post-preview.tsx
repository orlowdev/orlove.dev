import styled from '@emotion/styled'
import { Link } from 'gatsby'
import { Color } from './global-styles'
import { IBlogPost } from '../models/blog-post'
import React, { FC } from 'react'
import GatsbyImage from 'gatsby-image'
import { Caption } from './text'
import { CoffeeCups } from './coffee-cups'
import { Label, LabelList } from './label'

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

const PostImage = styled(GatsbyImage)`
  border: 0;
  border-radius: 0.25rem;
`

const PostWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`

const PostDescription = styled.div`
  margin-top: 1rem;

  @media screen and (min-width: 1000px) {
    height: 240px;
    width: calc(100% - 240px);
  }
`

interface IPostPreviewProps {
  post: IBlogPost
}

export const PostPreview: FC<IPostPreviewProps> = ({ post }) => (
  <PostWrapper>
    <PostImageLink to={post.fields.slug}>
      <PostImage
        title={post.frontmatter.imageAlt}
        fixed={post.frontmatter.image?.sharp?.fixed}
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
        {post.excerpt} <Link to={post.fields.slug}>Read post</Link>
      </p>
      <LabelList>
        {post.frontmatter.tags.slice(0, 3).map((tag) => (
          <Label key={tag}>
            <Link to={`/tags/${tag}`}>#{tag}</Link>
          </Label>
        ))}
      </LabelList>
    </PostDescription>
  </PostWrapper>
)
