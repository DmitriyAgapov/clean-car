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
import DashboardPage from "routes/account/dashboard";
import UsersPage from "routes/account/users";
import { authUser, companyLoader } from "routes/loaders/loaders";
import CompanyPage from "routes/account/company";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
    {
        path: "/",
        element: <RegisterPage />,
        errorElement: <ErrorPage />
    },
    {
        path: "/auth",
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
        loader: () => companyLoader(),
        children: [
            {
                path: 'dashboard',
                element: <DashboardPage />,
            },
            {
                path: 'users',
                element: <UsersPage />,
            },
            {
                path: 'companies',
                element: <CompanyPage />,
            }
        ]
    }


]);
root.render(
    <StoreProvider>
      <React.StrictMode>
          <RouterProvider router={router} />
      </React.StrictMode>
    </StoreProvider>
);
