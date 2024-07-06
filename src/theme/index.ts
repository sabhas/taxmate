import { experimental_extendTheme as extendTheme } from "@mui/material/styles"

// For the reference of theme customization guide visit
// https://mui.com/material-ui/experimental-api/css-theme-variables/customization/

export const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#336294"
        },
        info: {
          main: "#3abff8"
        }
      }
    },
    dark: {
      // palette for dark mode
      //   palette: {...}
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "2rem",
          color: "white"
        }
      }
    }
  }
})
