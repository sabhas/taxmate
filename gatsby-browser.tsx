import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles"
import { GatsbyBrowser } from "gatsby"
import React from "react"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { theme } from "./src/theme"
import "./styles.css"

export const wrapRootElement: GatsbyBrowser["wrapRootElement"] = ({
  element
}) => (
  <CssVarsProvider theme={theme}>
    {element}
    <ToastContainer />
  </CssVarsProvider>
)
