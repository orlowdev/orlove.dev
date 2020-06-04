import React from 'react'
import { Link } from 'gatsby'
import { InternalRoute } from '../routes'
import styled from '@emotion/styled'

const StyledHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f6f6f6;
  padding: 1rem;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  box-shadow: 0 3px 15px #0000000f;
  width: 100%;
  z-index: 1000;
  font-family: Montserrat, sans-serif;

  > * {
    font-size: 1rem;
    line-height: 0;
    margin: 0;
    padding: 0;
  }
`

const Nav = styled.nav`
  > ul {
    display: flex;
    justify-content: space-around;
    list-style: none;
    align-self: center;
    margin: 0;

    > li {
      margin: 0;
      padding: 1rem 0;

      > a {
        margin: 0;
        padding: 1rem;
        font-weight: bold;
        text-decoration: none;
      }
    }
  }
`

export const Header = () => (
  <StyledHeader>
    <div />
    <Nav>
      <ul>
        <li>
          <Link to={InternalRoute.HOME} activeClassName="active">
            Blog
          </Link>
        </li>
        <li>
          <Link to={InternalRoute.ABOUT} activeClassName="active">
            About
          </Link>
        </li>
        <li>
          <Link to={InternalRoute.CONTACTS} activeClassName="active">
            Contacts
          </Link>
        </li>
      </ul>
    </Nav>
  </StyledHeader>
)
