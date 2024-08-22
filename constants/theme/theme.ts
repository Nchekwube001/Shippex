import {createTheme} from '@shopify/restyle';
import palette from '../colors/pallete';
const lightTheme = createTheme({
  colors: {
    mainBackground: palette.white,
    grayBackground: palette.mainGray,
    mainText: palette.black,
  },
  spacing: {
    xxs: 4,
    xs: 6,
    s: 8,
    m: 10,
    mm: 12,
    mmm: 14,
    l: 16,
  },
  breakpoints: {
    phone: 0,
    longPhone: {
      width: 0,
      height: 812,
    },
    tablet: 768,
    largeTablet: 1024,
  },
});
const darkTheme = createTheme({
  colors: {
    mainBackground: palette.black,
    grayBackground: palette.mainGray,
    mainText: palette.black,
  },
  spacing: {
    ...lightTheme.spacing,
  },
  breakpoints: {
    ...lightTheme.breakpoints,
  },
});

export type Theme = typeof lightTheme;
export default {lightTheme, darkTheme};
