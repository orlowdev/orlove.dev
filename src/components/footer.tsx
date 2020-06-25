import styled from '@emotion/styled'
import { Link } from 'gatsby'
import { OutboundLink } from 'gatsby-plugin-google-analytics'
import React from 'react'
import { ExternalRoute, InternalRoute } from '../routes'
import { Color } from './global-styles'
import {
  FacebookBlockIcon,
  GatsbyInlineIcon,
  GitHubBlockIcon,
  InstagramBlockIcon,
  TwitterBlockIcon,
} from './icons'

const StyledFooter = styled.footer`
  background: #333;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  font-family: Montserrat, sans-serif;

  > div > p {
    font-size: 0.8rem;
    text-align: center;
  }

  * {
    color: ${Color.SECONDARY};
    margin: 0.25rem 0;
  }
`

const Nav = styled.nav`
  max-width: 1000px;
  min-width: 300px;
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 800px) {
    align-items: center;
    > h4 {
      text-align: center;
    }
  }

  > ul {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    list-style: none;
    margin-top: 1rem;

    > li {
      margin: 0;
      padding-left: 0.5rem;

      > a {
        font-size: 0.725rem;
        margin: 0;
        text-decoration: none;

        :active,
        :hover {
          color: ${Color.ACCENT};
        }
      }
    }
  }
`

const IconList = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  max-width: 300px;
`

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;

  @media screen and (min-width: 768px) {
    justify-content: space-around;
  }
`

export const Footer = () => {
  return (
    <StyledFooter>
      <div>
        <p>&copy; 2020 Sergei Orlov</p>
        <p>
          Built with <GatsbyInlineIcon />
        </p>
      </div>
      <IconList>
        <GitHubBlockIcon />
        <TwitterBlockIcon />
        <InstagramBlockIcon />
        <FacebookBlockIcon />
      </IconList>
      <Row>
        <Nav>
          <h4>Sitemap</h4>
          <ul>
            <li>
              <Link to={InternalRoute.HOME}>Home</Link>
            </li>
            <li>
              <Link to={InternalRoute.ABOUT}>About</Link>
            </li>
            <li>
              <Link to={InternalRoute.CONTACTS}>Contacts</Link>
            </li>
          </ul>
        </Nav>
        <Nav>
          <h4>Legal</h4>
          <ul>
            <li>
              <Link to={InternalRoute.ACCEPTABLE_USE_POLICY}>Acceptable Use Policy</Link>
            </li>
            <li>
              <Link to={InternalRoute.COOKIE_POLICY}>Cookie Policy</Link>
            </li>
            <li>
              <Link to={InternalRoute.DISCLAIMER}>Disclaimer</Link>
            </li>
            <li>
              <Link to={InternalRoute.PRIVACY_POLICY}>Privacy Policy</Link>
            </li>
          </ul>
        </Nav>
        <Nav>
          <h4>Social Media</h4>
          <ul>
            <li>
              <OutboundLink rel="nofollow" href={ExternalRoute.GITHUB}>
                GitHub
              </OutboundLink>
            </li>
            <li>
              <OutboundLink rel="nofollow" href={ExternalRoute.TWITTER}>
                Twitter
              </OutboundLink>
            </li>
            <li>
              <OutboundLink rel="nofollow" href={ExternalRoute.INSTAGRAM}>
                Instagram
              </OutboundLink>
            </li>
            <li>
              <OutboundLink rel="nofollow" href={ExternalRoute.FACEBOOK}>
                Facebook
              </OutboundLink>
            </li>
          </ul>
        </Nav>
      </Row>
    </StyledFooter>
  )
}
