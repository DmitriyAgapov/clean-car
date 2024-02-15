import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Notifications } from '@mantine/notifications';
import { StoreProvider } from "stores/store"
import { MantineProvider } from '@mantine/core'
import newTheme  from "theme/theme";
import router from "router/router";
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <StoreProvider>
    <MantineProvider theme={newTheme} defaultColorScheme={'dark'}>
    {/* <ThemeProvider value={theme}> */}
      <Notifications  position="top-right" zIndex={1000}/>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    {/* </ThemeProvider> */}

    </MantineProvider>
  </StoreProvider>,
)
