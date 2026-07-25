import { experimental_extendTheme as extendTheme } from "@mui/material/styles"

// Brand palette - used by both MUI tokens and SCSS via CSS variables.
// SCSS files should reference: var(--mui-palette-primary-main), etc.
export const brand = {
  primary: "#336294",
  primaryDark: "#264a73",
  accentStart: "#4caf50",
  accentEnd: "#2196f3",
  gradient: "linear-gradient(135deg, #4caf50 0%, #2196f3 100%)"
}

export const theme = extendTheme({
  cssVarPrefix: "mui",
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: brand.primary,
          dark: brand.primaryDark
        },
        info: {
          main: "#3abff8"
        },
        warning: {
          main: "#fdd20b"
        },
        common: {
          background: "#fff"
        }
      }
    },
    dark: {
      palette: {
        primary: {
          main: "#5b8cc0",
          dark: "#336294"
        },
        info: {
          main: "#3abff8"
        },
        warning: {
          main: "#fdd20b"
        },
        common: {
          background: "#1e293b"
        },
        background: {
          default: "#0f172a",
          paper: "#1e293b"
        },
        text: {
          primary: "#e2e8f0",
          secondary: "#94a3b8"
        }
      }
    }
  },
  shape: {
    borderRadius: 12
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: "2rem",
          textTransform: "none",
          fontWeight: 600
        }
      }
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined"
      }
    }
  }
})