import styled from '@emotion/styled'
import { Link } from 'gatsby'
import GatsbyImage from 'gatsby-image'
import React, { FC } from 'react'
import { IBlogPost } from '../models/blog-post'
import { CoffeeCups } from './coffee-cups'
import { Color } from './global-styles'
import { Labels } from './labels'
import { Caption } from './text'

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
  height: 100%;
`

const PostWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5rem;
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
      <Labels from={post.frontmatter.tags || []} limit={4} />
    </PostDescription>
  </PostWrapper>
)
