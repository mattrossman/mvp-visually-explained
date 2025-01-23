import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { setup } from "twind/shim"
import * as colors from "twind/colors"

setup({
  theme: {
    extend: { colors },
  },
})

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
