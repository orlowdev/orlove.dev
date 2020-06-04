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
  headerWeight: '700',
  googleFonts: [
    {
      name: 'Montserrat',
      styles: ['300', '700'],
    },
    {
      name: 'Questrial',
      styles: ['400', '700'],
    },
    {
      name: 'Fira Code',
      styles: ['400'],
    },
  ],
  bodyFontFamily: [
    'Questrial',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Helvetica',
    'Arial',
    'sans-serif',
  ],
})
