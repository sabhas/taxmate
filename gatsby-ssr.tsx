import * as React from "react"
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles"
import { theme } from "./src/theme"
import { GatsbySSR } from "gatsby"

export const onRenderBody: GatsbySSR["onRenderBody"] = ({
  setHeadComponents
}) => {
  setHeadComponents([
    <script
      key="color-scheme-init"
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            try {
              var stored = localStorage.getItem('taxmate-color-scheme');
              var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
              var prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
              var mode = 'light';
              if (stored === 'dark' || stored === 'light') {
                mode = stored;
              } else if (prefersDark) {
                mode = 'dark';
              } else if (prefersLight) {
                mode = 'light';
              }
              document.documentElement.setAttribute('data-mui-color-scheme', mode);
            } catch (e) {}
          })();
        `
      }}
    />
  ])
}

export const wrapRootElement: GatsbySSR["wrapRootElement"] = ({
  element
}) => (
  <CssVarsProvider theme={theme} defaultMode="system">
    {element}
  </CssVarsProvider>
)