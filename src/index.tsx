import React from 'react';
import ReactDOM from 'react-dom/client';
import { StoreProvider } from 'stores/store';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import ErrorPage from "error-page";
import AuthPage from "routes/auth";
import RegisterPage from "routes/register/register";
import RegisterSuccessPage from "routes/register/registerSucces";
import RestorePasswordPage from "routes/restore/restorePasswordPage";
import AccountPage from "routes/account/account";
import DashboardPage from "routes/dashboard/dashboard";
import UsersPage from "routes/users/users";
import { authUser, companyLoader, groupsCreatLoader, groupsIdLoader, groupsLoader, profileLoader,  usersLoader } from "routes/loaders/loaders";
import CompanyPage from "routes/company/company";
import GroupsPage from "routes/groups/groups";
import GroupPage from "routes/groups/group";
import GroupPageAction from "routes/groups/groupEditAction";
import GroupPageEditAction from "routes/groups/groupEditAction";
import GroupPageCreateAction from "routes/groups/groupCreateAction";
import UsersPageCreateAction from "routes/users/usersCreateAction";
import { ThemeProvider, SelectProps } from "@material-tailwind/react";
import { theme } from "theme/theme";
import UserPage from "routes/users/user";
import MyProfilePage from "routes/account/myProfile";
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
    {
        path: "/register",
        element: <RegisterPage />,
        errorElement: <ErrorPage />
    },
    {
        path: "/",
        element: <AuthPage />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/restore",
        element: <RestorePasswordPage />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/register/success',
        element: <RegisterSuccessPage />,
        errorElement: <ErrorPage />,
        loader: () => authUser(),
    },
    {
        path: '/account',
        element: <AccountPage />,
        errorElement: <ErrorPage />,
        loader: () => authUser(),
        children: [
            {
                path: 'profile',
                element: <MyProfilePage />,
                loader: profileLoader
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
                        path: ':id',
                        element: <UserPage />,
                    },
                    {
                        path: 'create',
                        element: <UsersPageCreateAction />,
                    }
                ]
            },


            {
                path: 'companies',
                element: <CompanyPage />,
                loader: companyLoader,
            },
            {
                path: 'groups',
                element: <GroupsPage />,
                loader: groupsLoader
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
            }
        ]
    }


]);
root.render(
    <StoreProvider>
        <ThemeProvider value={theme}>
      <React.StrictMode>
          <RouterProvider router={router} />
      </React.StrictMode>
            </ThemeProvider>
    </StoreProvider>
);
