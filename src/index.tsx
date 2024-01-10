import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, Link, Navigate, RouterProvider } from 'react-router-dom'
import {
    authUser,carsLoader,
    companyLoader, filialLoader, filialsLoader,
    groupsCreatLoader,
    groupsIdLoader,
    groupsLoader,
    profileLoader,
    userLoader,
    usersLoader
} from "routes/loaders/loaders";
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
import { theme } from "theme/theme";
import UsersPageEditAction from "routes/users/usersEditAction";
import FilialsPageEditAction from "routes/filials/filialsEditAction";
import FilialsPageCreateAction from "routes/filials/filialsCreateAction";
import FilialPage from "routes/filials/filial";
import CarsPage from "routes/cars/cars";
import CarPage from "routes/cars/car";
import CarsPageCreateAction from "routes/cars/carsCreateAction";
import CarsPageEditAction from "routes/cars/carsEditAction";

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

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
                        path: ':company_type/:companyid/:id',
                        element: <UserPage />,
                        loader: userLoader,
                    },
                    {
                        path: 'create',
                        element: <UsersPageCreateAction />
                    },
                    {
                        path: ':company_type/:companyid/:id/edit',
                        element: <UsersPageEditAction />,
                        loader: userLoader,
                    }
                ],
            },
            {
                path: 'cars',
                element: <CarsPage />,
                loader: carsLoader,
                children: [
                    {
                        path: ':company_type/:companyid/:id',
                        element: <CarPage />,
                        loader: carsLoader,
                    },
                    {
                        path: 'create',
                        element: <CarsPageCreateAction />
                    },
                    {
                        path: ':company_type/:companyid/:id/edit',
                        element: <CarsPageEditAction />,
                        loader: carsLoader,
                    }
                ],
            },

            {
                path: 'companies',
                element: <CompaniesPage />,
                loader: companyLoader,
                errorElement: <Navigate to='/account' replace={true} />,
                children: [
                    {
                        path: ':company_type/:id',
                        element: <CompanyPage />,
                        loader: companyLoader,
                    },
                    {
                        path: ':company_type/:id/edit',
                        element: <CompanyPageEditAction />,
                        loader: companyLoader,
                    },
                    {
                        path: 'create',
                        element: <CompanyPageCreateAction />

                    },
                ],
            },
            {
                path: 'filials',
                element: <FilialsPage />,
                loader: filialsLoader,
                children: [
                    {
                        path: ':company_type/:company_id/:id',
                        element: <FilialPage />,
                        loader: filialLoader,
                    },
                    {
                        path: ':companytype/:id/edit',
                        element: <FilialsPageEditAction />,
                        loader: companyLoader,
                    },
                    {
                        path: 'create',
                        element: <FilialsPageCreateAction />

                    },
                ],
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
                path: 'groups/:company_type/:id',
                element: <GroupPage />,
                loader: groupsIdLoader,
            },
            {
                path: 'groups/:company_type/:id/edit',
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
