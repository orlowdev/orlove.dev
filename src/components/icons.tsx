import styled from '@emotion/styled'
import { Color } from './global-styles'
import { OutboundLink } from 'gatsby-plugin-google-analytics'
import { ExternalRoute } from '../routes'
import React from 'react'
// @ts-ignore
import TwitterIcon from 'simple-icons/icons/twitter'
// @ts-ignore
import FacebookIcon from 'simple-icons/icons/facebook'
// @ts-ignore
import GitHubIcon from 'simple-icons/icons/github'
// @ts-ignore
import InstagramIcon from 'simple-icons/icons/instagram'
// @ts-ignore
import GatsbyIcon from 'simple-icons/icons/gatsby'

const BlockIcon = styled.span`
  > svg {
    display: block;
    width: 40px;
    height: 40px;
    fill: ${Color.SECONDARY};

    :hover {
      fill: ${Color.ACCENT};
    }
  }
`

const InlineIcon = styled.span`
  > svg {
    display: inline;
    width: 0.8rem;
    height: 0.8rem;
    fill: ${Color.SECONDARY};
    vertical-align: top;

    :hover {
      fill: ${Color.ACCENT};
    }
  }
`

export const TwitterBlockIcon = () => (
  <OutboundLink href={ExternalRoute.TWITTER} rel="nofollow">
    <BlockIcon dangerouslySetInnerHTML={{ __html: TwitterIcon.svg }} />
  </OutboundLink>
)

export const FacebookBlockIcon = () => (
  <OutboundLink href={ExternalRoute.FACEBOOK} rel="nofollow">
    <BlockIcon dangerouslySetInnerHTML={{ __html: FacebookIcon.svg }} />
  </OutboundLink>
)

export const GitHubBlockIcon = () => (
  <OutboundLink href={ExternalRoute.GITHUB} rel="nofollow">
    <BlockIcon dangerouslySetInnerHTML={{ __html: GitHubIcon.svg }} />
  </OutboundLink>
)

export const InstagramBlockIcon = () => (
  <OutboundLink href={ExternalRoute.INSTAGRAM} rel="nofollow">
    <BlockIcon dangerouslySetInnerHTML={{ __html: InstagramIcon.svg }} />
  </OutboundLink>
)

export const GatsbyInlineIcon = () => (
  <OutboundLink href="https://gatsbyjs.org" rel="nofollow">
    <InlineIcon dangerouslySetInnerHTML={{ __html: GatsbyIcon.svg }} />
  </OutboundLink>
)
