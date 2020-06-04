import React, { FC, useEffect } from 'react'
import { Header } from './header'
import { Footer } from './footer'
import { GlobalStyles } from './global-styles'
import styled from '@emotion/styled'

const Main = styled.main`
  display: flex;
  align-self: center;
  flex-direction: column;
  padding: 1rem;
  margin: 3rem 0;
  flex: 1;
  width: 100%;
  max-width: 800px;
`

export const Layout: FC = ({ children }) => {
  useEffect(() => {
    window.addEventListener('load', function () {
      ;(window as any).wpcc.init({
        colors: {
          popup: { background: '#f6f6f6', text: '#000000', border: '#333333' },
          button: { background: '#f6f6f6', text: '#333333' },
        },
        position: 'top',
        pushdown: true,
        fontsize: 'small',
        content: { href: '/legal/cookie-policy', button: '✕' },
        padding: 'small',
      })
    })
  }, [])

  return (
    <>
      <GlobalStyles />
      <Header />
      <Main>{children}</Main>
      <Footer />
    </>
  )
}
