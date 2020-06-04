import { css, Global } from '@emotion/core'
import React from 'react'

export enum Color {
  PRIMARY = '#9C89B8',
  ACCENT = '#F0A6CA',
  ACCENT_PALE = '#EFC3E6',
  SECONDARY = '#F0E6EF',
  BACKGROUND = '#f9f9f9',
  TEXT = '#333',
  DISABLED = '#eee',
}

export const GlobalStyles = () => (
  <Global
    styles={css`
      * {
        box-sizing: border-box;
      }

      html,
      body {
        padding: 0;
        margin: 0;
        background: ${Color.BACKGROUND};
        color: ${Color.TEXT};
      }

      #___gatsby {
        > div {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          position: relative;
        }
      }

      a {
        color: ${Color.TEXT};

        :hover,
        :focus {
          color: ${Color.PRIMARY};
        }
      }

      code {
        padding: 0.25rem 0.5rem;
        font-weight: 200;
        border: 0;
        border-radius: 4px;
        background-color: ${Color.DISABLED};
        font-family: 'Fira Code', monospace;
      }

      deckgo-highlight-code {
        margin-bottom: 2rem;
        box-shadow: 0 0 15px #0000001f;
      }

      .gatsby-resp-image-wrapper {
        z-index: 1 !important;
      }

      blockquote {
        padding: 1rem;
        border: 0;
        border-radius: 4px;
        background-color: ${Color.DISABLED};
        border-left: 3px solid #ccc;
      }

      figcaption {
        text-align: center;
        color: #999;
        font-size: 0.925rem;
      }

      blockquote:before {
        color: #ccc;
        content: open-quote;
        font-size: 4em;
        line-height: 0.1em;
        margin-right: 0.25em;
        vertical-align: -0.4em;
      }

      blockquote p {
        display: inline;
      }

      sup {
        top: unset;
        background-color: ${Color.PRIMARY};
        padding: 2px 8px;
        border-radius: 50%;
        font-family: 'Fira Code', monospace;

        > a {
          text-decoration: none;
          color: ${Color.BACKGROUND};

          :hover {
            color: ${Color.BACKGROUND};
          }
        }
      }
    `}
  />
)
