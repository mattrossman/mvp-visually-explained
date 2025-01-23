import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { setup } from "twind/shim"
import * as colors from "twind/colors"

setup({
  theme: {
    extend: { colors },
  },
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root"),
)
