import Typography from 'typography'
import { Color } from './components/global-styles'

export default new Typography({
  baseFontSize: '18px',
  baseLineHeight: 1.5,
  blockMarginBottom: 0.8,
  headerFontFamily: [
    'Montserrat',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Helvetica',
    'Arial',
    'sans-serif',
  ],
  bodyColor: Color.TEXT,
  headerColor: '#000',
  headerWeight: '900',
  googleFonts: [
    {
      name: 'Kumbh Sans',
      styles: ['300', '700'],
    },
    {
      name: 'Montserrat',
      styles: ['400', '900'],
    },
    {
      name: 'Fira Code',
      styles: ['400'],
    },
  ],
  bodyFontFamily: [
    'Kumbh Sans',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Helvetica',
    'Arial',
    'sans-serif',
  ],
})
