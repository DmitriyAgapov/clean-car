import { createBrowserRouter, Navigate } from 'react-router-dom'
import AuthPage from 'routes/auth'
import ErrorPage from 'error-page'
import RegisterPage from 'routes/register/register'
import RestorePasswordPage from 'routes/restore/restorePasswordPage'
import RegisterSuccessPage from 'routes/register/registerSucces'
import {
    authUser,
    companyLoader,
    filialLoader,
    filialsLoader,
    groupsCreatLoader,
    groupsIdLoader,
    groupsLoader, priceLoader,
    profileLoader,
    referencesLoader,
    userLoader,
    usersLoader
} from "routes/loaders/loaders";
import { carsLoader } from 'routes/loaders/carsLoader'
import AccountPage from 'routes/account/account'
import MyProfilePage from 'routes/account/myProfile'
import DashboardPage from 'routes/dashboard/dashboard'
import UsersPage from 'routes/users/users'
import UserPage from 'routes/users/user'
import UsersPageCreateAction from 'routes/users/usersCreateAction'
import UsersPageEditAction from 'routes/users/usersEditAction'
import CarsPage from 'routes/cars/cars'
import CarPage from 'routes/cars/car'
import CarsPageCreateAction from 'routes/cars/carsCreateAction'
import CarsPageEditAction from 'routes/cars/carsEditAction'
import CompaniesPage from 'routes/company/companies'
import CompanyPage from 'routes/company/company'
import CompanyPageEditAction from 'routes/company/companyEditAction'
import CompanyPageCreateAction from 'routes/company/companyCreateAction'
import FilialsPage from 'routes/filials/filials'
import FilialPage from 'routes/filials/filial'
import FilialsPageEditAction from 'routes/filials/filialsEditAction'
import FilialsPageCreateAction from 'routes/filials/filialsCreateAction'
import GroupsPage from 'routes/groups/groups'
import GroupPageCreateAction from 'routes/groups/groupCreateAction'
import GroupPage from 'routes/groups/group'
import GroupPageEditAction from 'routes/groups/groupEditAction'
import React from 'react'
import ReferencesPage from 'routes/reference/references'
import ReferencePage from 'routes/reference/reference'
import ReferencePageCreate from 'routes/reference/referencePageCreate'
import ReferenceIndex from "routes/reference/referenceIndex";
import ServicesPage from "routes/reference/Services/references";
import ServicePage from "routes/reference/Services/reference";
import ServicesSubTypePage from "routes/reference/Services/subtype";
import BidsPage from "routes/bids/bids";
import { bidLoader, bidsLoader } from "routes/loaders/bidsLoader";
import BidsCreatePage from "routes/bids/BidsCreatePage";
import PricesPage from "routes/price/prices";
import BidPage from "routes/bids/bid";
import PricePage from "routes/price/price";
import { companiesLoader } from "routes/loaders/companiesLoader";
import PriceEditPage from "routes/price/priceEdit";
import PriceHistory from "routes/price/priceHistory";
import PricesHistoryPage from "routes/price/priceHistory";

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
        // errorElement: <ErrorPage />,
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
                // loader: usersLoader,
                children: [
                    {
                        path: ':company_type/:company_id/:id',
                        element: <UserPage />,
                        loader: userLoader,
                    },
                    {
                        path: 'create',
                        element: <UsersPageCreateAction />,
                    },
                    {
                        path: ':company_type/:company_id/:id/edit',
                        element: <UsersPageEditAction />,
                        loader: userLoader,
                    },
                ],
            },
            {
                path: 'cars',
                element: <CarsPage />,
                loader: carsLoader,
                children: [
                    {
                        path: ':id',
                        element: <CarPage />,
                        loader: carsLoader
                    },
                    {
                        path: 'create',
                        element: <CarsPageCreateAction />,
                    },
                    {
                        path: ':id/edit',
                        element: <CarsPageEditAction />,
                        loader: carsLoader,
                    },
                ],
            },
            {
              path: 'bids',
              element: <BidsPage/>,
              // loader: bidsLoader,
              children: [
                  {
                      path: ':company_id/:id',
                      element: <BidPage/>,
                      loader: bidLoader,
                  },
                  {
                      path: 'create',
                      element: <BidsCreatePage/>,
                      loader: bidsLoader,
                  }
              ]
            },
            {
                path: 'companies',
                element: <CompaniesPage />,
                // loader: companiesLoader,
                // errorElement: <Navigate to='/account' replace={true} />,
                // errorElement: <ErrorPage />,
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
                        element: <CompanyPageCreateAction />,
                        loader: companyLoader,
                    },
                ],
            },
            {
                path: 'filials',
                element: <FilialsPage />,
                // errorElement: <ErrorPage />,
                loader: filialsLoader,
                children: [
                    {
                        path: ':company_type/:company_id/:id',
                        element: <FilialPage />,
                        loader: filialLoader,
                        children: [
                            {
                                path: 'edit',
                                element: <FilialsPageEditAction />,
                                loader: filialLoader,
                            },
                        ]
                    },
                    {
                        path: 'create',
                        element: <FilialsPageCreateAction />,
                    },
                ],
            },
            {
                path: 'groups',
                element: <GroupsPage />,
                loader: groupsLoader,
                children: [
                    {
                        path: 'create',
                        element: <GroupPageCreateAction />,
                        loader: groupsCreatLoader,
                    },
                    {
                        path: ':company_type/:id',
                        element: <GroupPage />,
                        loader: groupsIdLoader,
                    },
                    {
                        path: ':company_type/:id/edit',
                        element: <GroupPageEditAction />,
                        loader: groupsIdLoader,
                    },
                ],
            },
            {
                path: 'references',
                element: <ReferenceIndex />,
                children: [
                    {
                        path: 'car_brands',
                        element: <ReferencesPage />,
                        loader: referencesLoader,
                        children: [
                            {
                                path: ':id',
                                element: <ReferencePage />,
                                loader: referencesLoader,
                                children: [
                                    {
                                        path: 'edit',
                                        element: <ReferencePageCreate edit={true}/>,
                                        loader: referencesLoader,
                                    },
                                ],
                            },
                            {
                                path: 'create',
                                element: <ReferencePageCreate />,
                                loader: referencesLoader,
                            }
                        ],
                    },
                    {
                        path: 'cities',
                        element: <ReferencesPage />,
                        loader: referencesLoader,
                        children: [
                            {
                                path: ':id',
                                element: <ReferencePage />,
                                loader: referencesLoader,
                                children: [
                                    {
                                        path: 'edit',
                                        element: <ReferencePageCreate edit={true}/>,
                                        loader: referencesLoader,
                                    },
                                ],
                            },
                            {
                                path: 'create',
                                element: <ReferencePageCreate />,
                                loader: referencesLoader
                            },
                        ],
                    },
                    {
                        path: 'services',
                        element: <ServicesPage />,
                        loader: referencesLoader,
                        children: [
                            {
                                path: ':id',
                                id: `service_id`,
                                element: <ServicePage />,
                                loader: referencesLoader,
                                children: [
                                    {
                                        path: ':subtype_id',
                                        element: <ServicesSubTypePage/>,
                                        loader: referencesLoader,
                                    },
                                    {
                                        path: 'create',
                                        element: <ReferencePageCreate />,
                                    },
                                    {
                                        path: 'edit',
                                        element: <ReferencePageCreate />,
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                path: 'price',
                element: <PricesPage />,
                loader: priceLoader,
                children: [
                    {
                        path: ':id',
                        loader: priceLoader,
                        element: <PricePage />,
                        children: [
                            {
                                path: 'edit',
                                loader: priceLoader,
                                element: <PriceEditPage />
                            },
                            {
                                path: 'history',
                                element: <PricesHistoryPage/>,
                                loader: priceLoader,
                                children: [
                                    {
                                        path: ':bid_id',
                                        loader: priceLoader,
                                        element: <PricePage/>,
                                    },
                                ],

                            }
                        ]
                    },
                ],
            },

        ],
    },
])

export default router
