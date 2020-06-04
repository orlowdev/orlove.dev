import React, { FC } from 'react'
import { Helmet, LinkProps, MetaProps } from 'react-helmet'
import { useSiteMetadata } from '../hooks/use-site-metadata'
import { IFixedObject } from 'gatsby-background-image'
import { graphql, useStaticQuery } from 'gatsby'

interface ISeoProps {
  description?: string
  lang?: string
  title?: string
  url?: string
  meta?: MetaProps[]
  image?: IFixedObject
  scripts?: any[]
  links?: LinkProps[]
}

const Seo: FC<ISeoProps> = ({
  url,
  image,
  title,
  description,
  lang = 'en',
  meta = [],
  scripts = [],
  links = [],
}) => {
  const { defaultImage } = useStaticQuery(graphql`
    query FixedImages {
      defaultImage: file(relativePath: { eq: "assets/img/og.png" }) {
        sharp: childImageSharp {
          fixed(width: 1200, height: 630) {
            ...GatsbyImageSharpFixed_withWebp
          }
        }
      }
    }
  `)

  const {
    title: defaultTitle,
    siteUrl: defaultUrl,
    description: defaultDescription,
  } = useSiteMetadata()

  const metaDescription = description || defaultDescription
  const metaTitle = (title || defaultTitle).concat(' | Orlove.dev ||l')
  const metaUrl = url || defaultUrl
  const metaImage = image || defaultImage.sharp.fixed

  if (!metaImage.src.startsWith('https')) {
    metaImage.src = 'https://orlove.dev'.concat(metaImage.src)
  }

  const defaultMeta: MetaProps[] = [
    {
      name: 'description',
      content: metaDescription,
    },
    {
      property: 'og:title',
      content: metaTitle,
    },
    {
      property: 'og:description',
      content: metaDescription,
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:url',
      content: metaUrl,
    },
    {
      name: 'twitter:site',
      content: '@_or_love',
    },
    {
      name: 'twitter:creator',
      content: '@_or_love',
    },
    {
      name: 'twitter:title',
      content: metaTitle,
    },
    {
      name: 'twitter:description',
      content: metaDescription,
    },
  ]

  const defaultLinks: LinkProps[] = [
    {
      rel: 'stylesheet',
      type: 'text/css',
      href: 'https://wpcc.io/lib/1.0.2/cookieconsent.min.css',
    },
  ]

  const defaultScripts = [
    {
      src: 'https://wpcc.io/lib/1.0.2/cookieconsent.min.js',
    },
  ]

  const defaultImageMeta: MetaProps[] = [
    {
      property: 'og:image',
      content: metaImage.src,
    },
    {
      property: 'og:image:width',
      content: String(metaImage.width),
    },
    {
      property: 'og:image:height',
      content: String(metaImage.height),
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
  ]

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={metaTitle}
      meta={defaultMeta.concat(defaultImageMeta).concat(meta)}
      link={defaultLinks.concat(links)}
      script={defaultScripts.concat(scripts)}
    />
  )
}

export default Seo
