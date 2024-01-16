import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import { StoreProvider } from "stores/store"
import { MantineProvider } from '@mantine/core'
import { theme } from "theme/theme";
import router from "router/router";
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <StoreProvider>
    <MantineProvider theme={theme} defaultColorScheme={'dark'}>
    {/* <ThemeProvider value={theme}> */}
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    {/* </ThemeProvider> */}

    </MantineProvider>
  </StoreProvider>,
)
