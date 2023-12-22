import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// @ts-ignore
import styles from './assets/_forms.scss'
import {
  authUser,
  companyLoader,
  groupsCreatLoader,
  groupsIdLoader,
  groupsLoader,
  profileLoader,
  userLoader,
  usersLoader,
} from "routes/loaders/loaders"
import GroupsPage from './routes/groups/groups'
import GroupPage from './routes/groups/group'
import GroupPageEditAction from './routes/groups/groupEditAction'
import GroupPageCreateAction from './routes/groups/groupCreateAction'
import UserPage from './routes/users/user'
import MyProfilePage from './routes/account/myProfile'
import UsersPage from './routes/users/users'
import DashboardPage from './routes/dashboard/dashboard'
import RestorePasswordPage from './routes/restore/restorePasswordPage'
import RegisterSuccessPage from './routes/register/registerSucces'
import RegisterPage from './routes/register/register'
import AuthPage from './routes/auth'
import ErrorPage from './error-page'
import { StoreProvider } from './stores/store'
import AccountPage from './routes/account/account'
import CompanyPageCreateAction from 'routes/company/companyCreateAction'
import CompaniesPage from "./routes/company/companies";
import CompanyPage from "./routes/company/company";
import CompanyPageEditAction from "routes/company/companyEditAction";
import UsersPageCreateAction from "routes/users/usersCreateAction";
import FilialsPage from 'routes/filials/filials'
import { createTheme, Input, Select, MantineProvider } from '@mantine/core'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
const theme = createTheme({
  components: {
    Input: Input.extend({
      classNames: {
        input: styles.input,
      },
    }),
    Select: Select.extend({
        classNames: {
          input: "bg-white",
          dropdown: "bg-white"

        }
    })
  },
});
const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/restore',
    element: <RestorePasswordPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/register/success',
    element: <RegisterSuccessPage />,
    errorElement: <ErrorPage />,
    loader: authUser,
  },
  {
    path: '/account',
    element: <AccountPage />,
    errorElement: <ErrorPage />,
    loader: authUser,
    children: [
      {
        path: 'profile',
        element: <MyProfilePage />,
        loader: profileLoader,
      },
      {
        path: 'dashboard',
        element: <DashboardPage />,
      },
      {
        path: 'users',
        element: <UsersPage />,
        loader: usersLoader,
        children: [
          {
            path: ':companyid/:id',
            element: <UserPage />,
            loader: userLoader,
          },
          {
            path: 'create',
            element: <UsersPageCreateAction />,
            loader: userLoader,
          },

        ],
      },
      {
        path: 'companies',
        element: <CompaniesPage />,
        loader: companyLoader,
        children: [
          {
            path: ':companytype/:id',
            element: <CompanyPage />,
            loader: companyLoader,
          },
           {
            path: ':companytype/:id/edit',
            element: <CompanyPageEditAction />,
             loader: companyLoader,
          },
          {
            path: 'create',
            element: <CompanyPageCreateAction />,
          }

        ],
      },
      {
        path: 'filials',
        element: <FilialsPage />
      },
      {
        path: 'groups',
        element: <GroupsPage />,
        loader: groupsLoader,
      },
      {
        path: 'groups/create',
        element: <GroupPageCreateAction />,
        loader: groupsCreatLoader,
      },
      {
        path: 'groups/:id',
        element: <GroupPage />,
        loader: groupsIdLoader,
      },
      {
        path: 'groups/:id/edit',
        element: <GroupPageEditAction />,
        loader: groupsIdLoader,
      },
    ],
  },
])
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
