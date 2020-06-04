import React, { FC } from 'react'
import { IBlogPost } from '../models/blog-post'
import { PostPreview } from './post-preview'
import { PostListTitle } from './text'

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
