import React from "react"
import { renderToString } from "react-dom/server"
import express from "express"
import adminOnly from "desktop/lib/admin_only"
import { stitch } from "@artsy/stitch"
import { buildServerApp } from "reaction/Artsy/Router/server"
import { App } from "./App"
import { routes } from "./routes"
import { ServerStyleSheet } from "styled-components"

export const app = express()

app.get("/fix-hydration", adminOnly, (_req, res, _next) => {
  const sheet = new ServerStyleSheet()
  const html = renderToString(sheet.collectStyles(<App />))
  const styleTags = sheet.getStyleTags()

  res.send(
    `
<html>
  <head>
    <title>Fix hydration</title>
    ${styleTags}
  </head>
  <body>
    <div id='react-root'>${html}</div>

    <script src='/assets/runtime-manifest.js'></script>
    <script src='/assets/common.js'></script>
    <script src='/assets/fix-hydration.js'></script>
  </body>
</html>
  `.trim()
  )
})

app.get("/fix-hydration/stitch", adminOnly, async (_req, res, next) => {
  try {
    const layout = await stitch({
      basePath: __dirname,
      layout: "../../components/main_layout/templates/react_redesign.jade",
      config: {
        styledComponents: true,
      },
      blocks: {
        body: App,
      },
      locals: {
        ...res.locals,
        assetPackage: "fix-hydration",
      },
    })

    res.send(layout)
  } catch (error) {
    console.log(error)
    next()
  }
})

app.get("/fix-hydration/router", adminOnly, async (req, res, next) => {
  try {
    const { bodyHTML, styleTags } = await buildServerApp({
      routes,
      url: req.url,
    })

    res.send(
      `
  <html>
    <head>
      <title>Fix hydration</title>
      ${styleTags}
    </head>
    <body>
      <div id='react-root'>${bodyHTML}</div>

      <script src='/assets/runtime-manifest.js'></script>
      <script src='/assets/common.js'></script>
      <script src='/assets/fix-hydration.js'></script>
    </body>
  </html>
    `.trim()
    )
  } catch (error) {
    console.log(error)
    next()
  }
})

app.get("/fix-hydration/all*", adminOnly, async (req, res, next) => {
  try {
    const { bodyHTML, styleTags } = await buildServerApp({
      routes,
      url: req.url,
    })

    const layout = await stitch({
      basePath: __dirname,
      layout: "../../components/main_layout/templates/react_redesign.jade",
      blocks: {
        body: bodyHTML,
      },
      locals: {
        ...res.locals,
        assetPackage: "fix-hydration",
        styleTags,
      },
    })

    res.send(layout)
  } catch (error) {
    console.log(error)
    next(error)
  }
})
