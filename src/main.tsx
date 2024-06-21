import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles"
import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import App from "./App.tsx"
import "./index.css"
import store from "./store"
import { theme } from "./theme"
import { HashRouter } from "react-router-dom"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CssVarsProvider theme={theme}>
      <HashRouter>
        <Provider store={store}>
          <App />
          <ToastContainer />
        </Provider>
      </HashRouter>
    </CssVarsProvider>
  </React.StrictMode>
)
