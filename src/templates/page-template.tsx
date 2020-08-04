import { defineCustomElements } from '@deckdeckgo/highlight-code/dist/loader'
import styled from '@emotion/styled'
import { graphql } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'
import React, { FC } from 'react'
import { PageContentsQuery } from '../../graphql-types'
import { Labels } from '../components/labels'
import { Layout } from '../components/layout'
import Seo from '../components/seo'
import { Caption } from '../components/text'
import { BlogPost } from '../models/blog-post'
import { ExternalRoute } from '../routes'
import { OutboundLink } from 'gatsby-plugin-google-analytics'

defineCustomElements()

const Hero = styled(BackgroundImage)`
  width: 100%;
  padding: 15rem 1.5rem 0;
  background-position: center;
  overflow-x: hidden;
  margin-bottom: -4rem;
`

const Jukebox = styled.iframe`
  width: 100%;
  max-width: 660px;
  overflow: hidden;
  box-shadow: 0 0 15px #0000000f;
  border: 0;
  border-radius: 4px;
  background: transparent;
`

const LogoLol = styled.p`
  font-size: 3rem;
  margin-top: 1rem;
  text-align: center;
  font-weight: 700;
  color: #000;
`

const PageWrapper = styled.div`
  margin-top: 2rem;
`

const SmallText = styled.p`
  padding: 2rem;
  background-color: white;
  box-shadow: 0 0 15px 5px #0000000f;
  font-size: 0.925rem;
`

interface IPageTemplateProps {
  data: PageContentsQuery
}

const PageTemplate: FC<IPageTemplateProps> = ({ data }) => {
  const post = BlogPost(data.markdownRemark)

  return (
    <>
      <Seo
        url={`https://orlove.dev${post.fields.slug}`}
        title={post.frontmatter.title}
        description={post.frontmatter.description}
        image={post.frontmatter.image?.sharp?.fixed}
      />

      {post.frontmatter.image && (
        <Hero Tag="section" fluid={post.frontmatter.image.sharp.fluid} fadeIn="soft">
          {post.frontmatter.song && (
            <Jukebox
              allow="autoplay *; encrypted-media *;"
              frameBorder="0"
              height="150"
              sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
              src={post.frontmatter.song.replace('/music.', '/embed.music.')}
            />
          )}
        </Hero>
      )}

      <Layout>
        <PageWrapper>
          <Caption>{post.frontmatter.imageAlt}</Caption>

          <LogoLol>||l</LogoLol>

          <h1>{post.frontmatter.title}</h1>

          <Labels from={post.frontmatter.tags || []} />

          <div dangerouslySetInnerHTML={{ __html: post.html }} />

          <SmallText>
            I don&apos;t have comments set up on my blog, but if you would like to discuss
            something, we can have a conversation on Twitter. If you like what you&apos;ve read, you
            can use RSS to subscribe, or follow me on{' '}
            <OutboundLink href={ExternalRoute.TWITTER}>Twitter</OutboundLink> to never miss new
            articles.
          </SmallText>
        </PageWrapper>
      </Layout>
    </>
  )
}

export const query = graphql`
  query PageContents($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      ...PostPage
    }
  }
`

export default PageTemplate
