import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Notifications } from '@mantine/notifications';
import { StoreProvider } from "stores/store"
import { MantineProvider } from '@mantine/core'
import newTheme  from "theme/theme";
import router from 'router/router'
import { DatesProvider } from '@mantine/dates';
import 'dayjs/locale/ru';
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>

  <StoreProvider>
    <MantineProvider theme={newTheme} defaultColorScheme={'dark'}>
      <DatesProvider settings={{ locale: 'ru' }}>
    {/* <ThemeProvider value={theme}> */}
        <Notifications  position="top-right" zIndex={1000}/>

        <RouterProvider router={router}/>

    {/* </ThemeProvider> */}
      </DatesProvider>
    </MantineProvider>
  </StoreProvider>
  </React.StrictMode>
)
