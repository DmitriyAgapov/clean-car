import React from 'react';
import ReactDOM from 'react-dom/client';
import { StoreProvider } from 'stores/store';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Root from "routes/root";
import ErrorPage from "error-page";
import AuthPage from "routes/auth";
import RegisterPage from "routes/register/register";
import RegisterSuccessPage from "routes/register/registerSucces";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />
    },
    {
        path: "/auth",
        element: <AuthPage />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/register",
        element: <RegisterPage />,
        errorElement: <ErrorPage />
    },
    {
        path: '/register/success',
        element: <RegisterSuccessPage />,
        errorElement: <ErrorPage />,
    }

]);
root.render(
    <StoreProvider>
      <React.StrictMode>
          <RouterProvider router={router} />
      </React.StrictMode>
    </StoreProvider>
);
