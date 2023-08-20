import border from './builders/border';
import colors from './builders/colors';
import heights from './builders/heights';
import lineHeight from './builders/lineHeight';
import opacity from './builders/opacity';
import print from './builders/print';
import semanticColors from './builders/semanticColors';
import spacing from './builders/spacing';
import typeScale from './builders/typeScale';
import typography from './builders/typography';
import widths from './builders/widths';

const manifest = {
  colors: { builder: colors },
  semanticColors: { builder: semanticColors },
  aspectRatios: { mq: true },
  backgroundSize: { mq: true },
  backgroundPosition: { mq: true },
  borders: { mq: true, builder: border },
  borderStyle: { mq: true },
  boxShadow: { mq: true },
  spacing: { mq: true, print: true, builder: spacing },
  coordinates: { mq: true },
  clears: { mq: true, print: true },
  display: { mq: true, print: true },
  flexbox: { mq: true, print: true },
  floats: { mq: true, print: true },
  fontStyle: { mq: true, print: true },
  heights: { mq: true, builder: heights },
  letterSpacing: { mq: true, print: true },
  lineHeight: { mq: true, print: true, builder: lineHeight },
  opacity: { mq: true, builder: opacity },
  rotations: { mq: true },
  outlines: { mq: true },
  overflow: { mq: true },
  position: { mq: true },
  textDecoration: { mq: true, print: true },
  textAlign: { mq: true, print: true },
  textTransform: { mq: true, print: true },
  typeScale: { mq: true, print: true, builder: typeScale },
  typography: { mq: true, print: true, builder: typography },
  fontWeight: { mq: true, print: true },
  visibility: { mq: true, print: true },
  whiteSpace: { mq: true, print: true },
  widths: { mq: true, print: true, builder: widths },
  print: { print: true, builder: print },
  boxSizing: {},
  code: {},
  fontFamily: {},
  forms: {},
  links: {},
  lists: {},
  images: {},
  normalize: {},
  hovers: {},
  verticalAlign: {},
  utilities: {},
  zIndex: {},
};

export default manifest;
