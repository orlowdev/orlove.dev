import { PostListTitle } from './text'
import { PostPreview } from './post-preview'
import { Layout } from './layout'
import React, { FC } from 'react'
import { IBlogPost } from '../models/blog-post'

interface IPostListProps {
  posts: IBlogPost[]
  title: string
}

export const PostList: FC<IPostListProps> = ({ posts, title }) => (
  <>
    <PostListTitle>{title}</PostListTitle>

    {posts.map((post) => (
      <PostPreview post={post} key={post.id} />
    ))}
  </>
)
