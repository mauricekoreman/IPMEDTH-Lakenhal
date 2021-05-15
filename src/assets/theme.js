import Brandon_reg from "./fonts/Brandon_reg.otf";
import Brandon_bld from "./fonts/Brandon_bld.otf";
import Brandon_light from "./fonts/Brandon_light.otf";

import { createMuiTheme } from "@material-ui/core/styles";

// typography
// This requires that you have a plugin or loader in your build process that can handle loading ttf, woff, and woff2 files. Fonts will not be embedded within your bundle. They will be loaded from your webserver instead of a CDN.
// https://material-ui.com/customization/typography/

const brandonGrotesque_reg = {
  fontFamily: "brandon-grotesque",
  fontStyle: "normal",
  fontWeight: 400,
  src: `local('brandon-grotesque), url(${Brandon_reg}) format('openType')`,
  unicodeRange:
    "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF",
};

const brandonGrotesque_light = {
  fontFamily: "brandon-grotesque",
  fontStyle: "normal",
  fontWeight: 300,
  src: `local('brandon-grotesque), url(${Brandon_light}) format('openType')`,
  unicodeRange:
    "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF",
};

// theme settings
export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#3DA2C9",
      contrastText: "#FFF",
    },
    secondary: {
      main: "#FFF",
      contrastText: "#3DA2C9",
    },
  },
  typography: {
    fontFamily: "Brandon Grotesque, Arial",
  },
  // shape: {
  //   borderRadius: 0,
  // },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "@font-face": [brandonGrotesque_reg, brandonGrotesque_light],
      },
    },
    MuiButton: {
      root: {
        textTransform: "none",
      },
    },
  },
  props: {
    MuiButton: {
      disableRipple: true,
    },
  },
});
