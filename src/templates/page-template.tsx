import React, { FC } from 'react'
import { graphql } from 'gatsby'
import { Layout } from '../components/layout'
import styled from '@emotion/styled'
import BackgroundImage from 'gatsby-background-image'
import { PageContentsQuery } from '../../graphql-types'
import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader'
import { Caption } from '../components/text'
import { BlogPost } from '../models/blog-post'
import { Label } from '../components/label'
import Seo from '../components/seo'

deckDeckGoHighlightElement()

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

const LabelList = styled.div`
  margin-bottom: 2rem;
  display: flex;
  flex-wrap: wrap;
`

const LogoLol = styled.p`
  font-size: 3rem;
  margin-top: 1rem;
  text-align: center;
  font-weight: 700;
  font-family: Montserrat, sans-serif;
  color: #000;
`

const PageWrapper = styled.div`
  margin-top: 2rem;
`

const PageTemplate: FC<{ data: PageContentsQuery }> = ({ data }) => {
  const post = BlogPost(data.markdownRemark)

  return (
    <>
      <Seo
        url={`https://orlove.dev${post.fields.slug}`}
        title={`${post.frontmatter.title} | Orlove.dev`}
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

          {post.frontmatter.tags && (
            <LabelList>
              <Label>{post.frontmatter.category}</Label>
              {post.frontmatter.tags.map((tag, i) => (
                <Label key={tag || i}>#{tag}</Label>
              ))}
            </LabelList>
          )}

          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </PageWrapper>
      </Layout>
    </>
  )
}

export const query = graphql`
  query PageContents($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      fields {
        slug
      }
      frontmatter {
        title
        song
        category
        tags
        description
        image {
          sharp: childImageSharp {
            fluid(quality: 100, duotone: { highlight: "#F0A6CA", shadow: "#9C89B8" }) {
              ...GatsbyImageSharpFluid_withWebp
            }
            fixed(quality: 90, width: 1200, height: 630) {
              ...GatsbyImageSharpFixed_withWebp
            }
          }
        }
        imageAlt
      }
    }
  }
`

export default PageTemplate
