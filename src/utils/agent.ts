import axios, { AxiosError } from "axios";
import appStore from 'stores/appStore'
import authStore from 'stores/authStore'
import  { decodeToken } from 'utils/getData'
import  'utils/axiosConfig'
import { User } from 'stores/userStore'
import { runInAction, toJS } from "mobx";
import { Company, CompanyType } from "stores/companyStore";
import { BidsStatus } from "stores/bidsStrore";
import { notifications } from "@mantine/notifications";
import { SvgClose } from "components/common/ui/Icon";
import React from "react";
import company from "routes/company/company";
import useSWR from "swr";

export type PaginationProps = {
  name?: string | number | URLSearchParams | null,
  ordering?: string | number | URLSearchParams | null,
  page?: string | number | URLSearchParams | null,
  page_size?: number | string | number | URLSearchParams | null
  q?: string | number | URLSearchParams  | null
}
type CreateCompanyPerformerFormData = Company<CompanyType.performer>
type CreateFilialPerformerFormData = {
  name: string
  city: number
  is_active: boolean
  performerprofile: {
    address: string
    working_time: string
    lat: number
    lon: number
  }
}

interface FilterPropsCars {
  number?: number
  car_type?: string
  model__name?: string
  brand__name?: string
  company__name?: string
}
//Подсказки адресов, config axios
const axiosSuggest = axios.create({
  headers: {
    "Authorization": `Token ${process.env.NODE_ENV === 'production' ? process.env.REACT_APP__SUGGEST  : process.env.REACT_APP__SUGGEST}`,
    "Content-Type": "application/json",
    "Accept": "application/json",
  }
  }
)

//Константа для запросов
export const API_ROOT = 'https://dev.server.clean-car.net/api'


//Объект запросов
export const requests = {
  delete: (url: string) =>
    axios({
      url: `${API_ROOT}${url}`,
      // headers: tokenPlugin(),
      method: 'DELETE',
    })
    .then((response) => response.data)
    .catch(handleErrors),
  get: (url: string, body?: any, pagination?:PaginationProps) =>
     axios({
      url: `${API_ROOT}${url}`,
      // headers: tokenPlugin(),
      method: 'GET',
      params: pagination
    })
  .then((response:any) => response)
  .catch(handleErrors),
  getNew: (url: string, body?: any, pagination?:PaginationProps) =>
     axios({
      url: `${API_ROOT}${url}`,
      // headers: tokenPlugin(),
      method: 'GET',
      params: pagination
    })
  .then((response:any) => response.data)
  .catch(handleErrors),

  put: (url: string, body: any) =>
    axios({
      url: `${API_ROOT}${url}`,
      // headers: tokenPlugin(),
      method: 'PUT',
      data: body,
    })
    .then((response:any) => response)
  .catch(handleErrors),
  patch: (url: string, body: any) =>
    axios({
      url: `${API_ROOT}${url}`,
      // headers: tokenPlugin(),
      method: 'PATCH',
      data: body,
    }),
  // .then((response) => response)
  // .catch(handleErrors),

  post: (url: string, body: any) =>
    axios({
      url: `${API_ROOT}${url}`,
      // headers: tokenPlugin(),
      method: 'POST',
      data: body,
    })
  .then((response) => response)
  .catch(handleErrors),
  postSuggest: (props:any) =>
    axiosSuggest({
      url: process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_SUGGEST_URL : process.env.REACT_APP__SUGGEST_URL,
      headers: {
        "Authorization": `Token ${process.env.NODE_ENV === 'production' ? process.env.REACT_APP__SUGGEST  : process.env.REACT_APP__SUGGEST}`,
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      method: 'POST',
      data: JSON.stringify(props) ,
    }),
}

//Обработка ошибок
const handleErrors = (err: AxiosError) => {
    console.log(err && err.response && (err.response.status === 400 || err.response.status === 405));

    //create notification

    if(err && err.response && (err.response.status === 400 || err.response.status === 405)) {

      // @ts-ignore
      const errMsg = typeof err.response.data === "string" ? err.response.data : err.response.data.error_message
      notifications.show({
        id: 'bid-created',
        withCloseButton: true,
        onClose: () => console.log('unmounted'),
        onOpen: () => console.log('mounted'),
        autoClose: 4000,
        // title: "Ошибка",
        message: errMsg,
        // color: 'red',
        // icon: <SvgClose />,
        className:
          'my-notification-class z-[9999] absolute top-12 right-12 notification_cleancar',
        // style: { backgroundColor: 'red' },
        loading: false,
      })
    }
    if (err && err.response && err.response.status === 401) {
        const refr = window.sessionStorage.getItem('jwt_refresh')
        if (refr) {
        agent.Auth.tokenRefresh(refr)
            .then((resolve: any) => resolve.data)
            .then((data) => {
                runInAction(() => {
                  appStore.setToken(null)
                  appStore.setToken(data.access)
                })
            })
            .catch((err) => {
                appStore.setTokenError(err.response.data)
                authStore.logout()
            })
        }
    }
    return err
}
const Price = {
    createPrice: (company_id: number) => requests.post(`/price/${company_id}/create/`, {}),
    getAllPrice: (pagination?: PaginationProps) => requests.get('/price/all_companies/list/', {}, pagination),
    getCurentCompanyPriceEvac: (company_id: number) => requests.get(`/price/${company_id}/active_evacuation`, {}),
    getCurentCompanyPriceTire: (company_id: number) => requests.get(`/price/${company_id}/active_tire`, {}),
    getCurentCompanyPriceWash: (company_id: number) => requests.get(`/price/${company_id}/active_wash`, {}),
    updatePriceWash: (company_id: number, price_id: number, data: any) => requests.post(`/price/${company_id}/${price_id}/new_wash/`, {positions: data}),
    updatePriceEvac: (company_id: number, price_id: number, data: any) => requests.post(`/price/${company_id}/${price_id}/new_evacuation/`, {positions: data}),
    updatePriceTire: (company_id: number, price_id: number, data: any) => requests.post(`/price/${company_id}/${price_id}/new_tire/`, {positions: data}),
}

export interface CreateBidData {
  phone: string,
  performer: number,
  company: number,
  conductor: number,
  car: number,
  service_type: number,
  service_subtype: number,
  service_option: number[],
  customer_comment?: string
}

const Bids = {
  getAllBids: (params: PaginationProps) => requests.get('/bids/all_bids/list', {}, params),
  getAvailablePerformers: (company_id:number, data: { car_id: number, subtype_id: number, options_idx: number[] }) => requests.post(`/bids/${company_id}/bid_performers/`, data),
  createBid: (customer_id: number, data: CreateBidData) => requests.post(`/bids/${customer_id}/create/`, data),
  getBid: (company_id: number, id: number) => requests.get(`/bids/${company_id}/${id}/retrieve/`),
  updateBidStatus: (company_id: number|string, bid_id: number|string, status:BidsStatus) => requests.put(`/bids/${company_id}/${bid_id}/status/`, {status: status})
}
const Utils = {
  suggest: (props:{query: any, location: any[], restrict_value: boolean}) => requests.postSuggest(props)
}
const Auth = {
  current: () => {
    return new Promise((resolve, reject) => {
      if (appStore.token) {
        const dataUser = decodeToken(appStore.token)
        const { user_id, first_name, last_name, phone } = dataUser
        resolve({
          id: user_id,
          first_name: first_name,
          last_name: last_name,
          phone: phone,
          email: authStore.values.email,
        } as User)
      } else {
        reject(new Error('no token'))
      }
    })
  },
  tokenRefresh: (refresh: string) => requests.post('/token/refresh/',{
      refresh: refresh
  }),
  login: (email: string, password: string) => requests.post('/token/', { email: email, password: password }),
  register: (first_name: string, last_name: string, email: string, phone: string, password: string) =>
    requests.post('/accounts/register/', {
      email: email,
      phone: phone,
      first_name: first_name,
      last_name: last_name,
      password: password,
      password2: password,
    }),
}
const Users = {
    getAllUsers:  (pagination?: PaginationProps) => requests.get('/accounts/all_users/', {}, pagination),
    getAllUsersTest:  (pagination?: PaginationProps) => useSWR('/accounts/all_users/', (url) => requests.get(url,{}, pagination)),
    getUser: ({ company_id, id }: { company_id: number; id: number }) => requests.get(`/accounts/${company_id}/users/${id}/retrieve/`),
    getUserTest: ({ company_id, id }: { company_id: number; id: number }) => useSWR(`/accounts/${company_id}/users/${id}/retrieve/`, requests.get),
    getCompanyUsers: (company_id: number, pagination?: PaginationProps) => requests.get(`/accounts/${company_id}/users/list/`, {}, pagination),

}
const Companies = {
    createCompanyPerformers: ( data: CreateCompanyPerformerFormData, type: string ) => requests.post(`/companies/${type}/create/`, data),
    editCompany: ( data: CreateCompanyPerformerFormData, type: string, id:number ) => requests.put(`/companies/${type}/${id}/update/`, data),

    getCompanyData: (type: string, id: number ) => requests.get(`/companies/${type}/${id}/retrieve/`, {}),
    // createCompanyPerformers: ( data: CreateCompanyPerformerFormData ) => {
    //   return  requests.post('/companies/performer/create/', data)
    // },
    createCompanyCustomer: ( data: CreateCompanyPerformerFormData, type: string ) => requests.post('/companies/customer/create/', data),
    getMyCompanies: (pagination?: PaginationProps) => requests.get('/companies/my_companies/list/', {},pagination),
    getListCompanyCustomer: (pagination?: PaginationProps) => requests.get('/companies/customer/list/', {}, pagination),
    getListCompanyPerformer: (pagination?: PaginationProps) => requests.get('/companies/performer/list/', {}, pagination),
    getAllCompanies: (pagination?: PaginationProps) => requests.get('/companies/all_companies/list/', {}, pagination),
    getOnlyAllCompanies: (pagination?: PaginationProps) => requests.get('/companies/only_companies/list/', {}, pagination),
    getOnlyBranchesCompanies: (pagination?: PaginationProps) => requests.get('/companies/only_branches/list/', {}, pagination),
}
const Permissions = {
  getAllCompanyPermissions: (company_id:number, pagination?: PaginationProps) => requests.get(`/permissions/${company_id}/groups/list/`, {}, pagination),
  getUserPermissions: (company_id: number, id:number ) => requests.get(`/permissions/${company_id}/groups/${id}/retrieve`),
  createPermission: (company_id: number, data: any) => requests.post(`/permissions/${company_id}/groups/create/`, data),
  getPermissionById: (company_id: number, id: number) => requests.get(`/permissions/${company_id}/groups/${id}/retrieve/`, {}),
  putUpdatePermissions: (company_id: number, id: number, data: any) => requests.put(`/permissions/${company_id}/groups/${id}/update/`, {
    name: data.name,
    permissions: toJS(data.permissions),
  }),
  deletePermission: (company_id: number, id: number) => requests.delete(`/permissions/${company_id}/groups/${id}/delete/`),
}
const PermissionsAdmin = {
  getAllAdminPermissions: (ordering?: string, page?: number, page_size?: number) =>
    requests.get('/permissions_admin/groups/list/', {}),
  putUpdateAdminPermissions: (id: number, data: any) => {
    requests.put(`/permissions_admin/groups/${id}/update/`, {
      name: data.name,
      permissions: toJS(data.permissions),
    })
  },
  deleteAdminGroupIdPermission: (id: number) =>
    requests.delete(`/permissions_admin/groups/${id}/delete/`),
  getAdminGroupIdPermission: (id: number) => requests.get(`/permissions_admin/groups/${id}/retrieve/`, {}),

  createAdminPermission: (data: any) => {
    requests.post('/permissions_admin/groups/create/', {
      name: data.name,
      permissions: data.permissions.map((p: any) => ({
        create: p.create,
        read: p.read,
        update: p.update,
        delete: p.delete,
        name: p.name,
      })),
    })
  },
}
const Profile = {
    getMyAccount: () => requests.get('/accounts/my_profile/', {}),
    getMyCompany: () => requests.get('/companies/my_companies/list/', {})
}
const Catalog = {
    getCarBrands: (params?: PaginationProps) => requests.get('/catalog/car_brands', {}, params),
    getCarModelWithBrand: (id: number) => requests.get(`/catalog/car_models/${id}/retrieve`),
    createCarBrandWithNewBrand: (brand_name: string, car_class: string, model: string) =>
        requests.post('/catalog/car_models/create_with_new_brand/', {
            name: model,
            car_type: car_class,
            brand_name: brand_name,
        }),
    createCarBrandWithExistBrand: (brand: number, car_class: string, model: string) =>
        requests.post('/catalog/car_models/create_with_exist_brand/', {
            name: model,
            car_type: car_class,
            brand: brand,
        }),
    updateCarBrandWithNewBrand: (id: number, brand_name: string, car_class: string, model: string) =>
        requests.put(`/catalog/car_models/${id}/update_with_new_brand`, {
            name: model,
            car_type: car_class,
            brand_name: brand_name,
        }),
    updateCarBrandWithExistBrand: (id: number, brand: number, car_class: string, model: string) =>
        requests.put(`/catalog/car_models/${id}/update_with_exist_brand`, {
            name: model,
            car_type: car_class,
            brand: brand,
        }),
    getCarBrandModels: (brand_id: number, params?: PaginationProps) =>
        requests.get(`/catalog/car_brands/${brand_id}/car_models/list`, {}, params),
    getCarModels: (params?: PaginationProps) =>
        requests.get(`/catalog/car_models/list`, {}, params),
    getCarBrandsWithModels: (params?: PaginationProps | undefined) =>
        requests.get(`/catalog/car_brands_with_models`, {}, params),
    getCities: (params?: PaginationProps) => requests.get('/catalog/cities/', {}, params),
    getCity: (id: number) => requests.get(`/catalog/cities/${id}/retrieve/`),
    createCity: (name: string, is_active: boolean, timezone: string)  =>
        requests.post('/catalog/cities/create/', { name: name, is_active: is_active, timezone: timezone}),
    deleteCity: (id: number) => requests.delete(`/catalog/cities/${id}/delete`),
    deleteCarModel: (id: number) => requests.delete(`/catalog/car_models/${id}/delete`),
    editCity: (id: number, name: string, is_active: boolean, timezone: string) =>
        requests.put(`/catalog/cities/${id}/update/`, { name: name, id: id, is_active: is_active, timezone: timezone }),
    getServices: (params?: PaginationProps) => requests.get('/catalog/services/', {}, params),
    getService: (id: number) => requests.get(`/catalog/services/${id}/retrieve/`),
    createSubtype: (id: number, name: string, is_active: boolean) =>
        requests.post('/catalog/services/subypes/create/', { name: name, is_active: is_active, service_type: id }),
    createOption: (id: number, name: string, is_active: boolean) =>
        requests.post('/catalog/services/options/create/', { name: name, is_active: is_active, service_type: id }),
    editSubtype: ({ id, subtype_id, name, is_active }:{ id: number, subtype_id: number, name: string, is_active: boolean }) => requests.put(`/catalog/services/subypes/${subtype_id}/update/`, {
      name: name,
      is_active: is_active,
      service_type: id,
    }),
    getServiceOption: (id: number) => requests.get(`/catalog/services/options/${id}/retrieve`),
    editServiceOption: ({ id, subtype_id, name, is_active }:{ id: number, subtype_id: number, name: string, is_active: boolean }) => requests.put(`/catalog/services/options/${id}/update/`, {
      name: name,
      is_active: is_active,
      service_subtype: subtype_id
    }),
     createServiceOption: ({ id, subtype_id, name, is_active }:{ id: number, subtype_id: number, name: string, is_active: boolean }) => requests.post(`/catalog/services/options/create/`, {
      name: name,
      is_active: is_active,
       service_subtype: subtype_id
    }),
    getServiceSubtypeOptions: (subtype_id: number) => requests.get(`/catalog/services/${subtype_id}/options`),
    getServiceSubtypes: (id: number) => requests.get(`/catalog/services/${id}/retrieve`),
    getServiceSubtype: (subtype_id: number, params?: PaginationProps) =>
        requests.get(`/catalog/services/subypes/${subtype_id}/retrieve`, {}, params),
    getServiceSubtypesListByServiceId: (id: number, params?: PaginationProps) =>
        requests.get(`/catalog/services/${id}/subypes/`, {}, params)
}
const Cars = {
  getCompanyCars: (company_id: number, params?: PaginationProps, filter?: FilterPropsCars) => requests.get(`/cars/${company_id}/list/`, params),
  getAdminCars: ( params?: PaginationProps, filter?: FilterPropsCars) => requests.get(`/cars_admin/list/`, {}, params),
  getAdminCar: (id: number) => requests.get(`/cars_admin/${id}/retrieve/`),
  getCompanyCar: (company_id: number , id: number)  => requests.get(`/cars/${company_id}/${id}/retrieve/`),
  createCompanyCar: (company_id: number, data: any) => requests.post(`/cars/${company_id}/create/`, data),
  editCompanyCar: (company_id: number, id: number, data: any) => requests.put(`/cars/${company_id}/${id}/update/`, data),
}
const Account = {
  getCompanyUsers: (company_id:number) => requests.get(`/accounts/${company_id}/users/list/`),
  getCompanyUser: (company_id: number, id: number) => requests.get(`/accounts/${company_id}/users/${id}/retrieve/`),
  createCompanyUser: (company_id: number, data:any) => requests.post(`/accounts/${company_id}/users/create/`, data),
  updateCompanyUser: (company_id: number, data:any) => requests.put(`/accounts/${company_id}/profile/${data.id}/update/`, data),
  createAdminUser: (data: any) => requests.post('/accounts_admin/user/create/', data)
}
const Filials = {
  getFilials: (company_type: string, company_id: number, params?: PaginationProps) => requests.get(`/${company_type}_branches/${company_id}/list/`, params),
  getFilial: (company_type: string, company_id: number, id: number, params?: PaginationProps) => requests.get(`/${company_type}_branches/${company_id}/${id}/retrieve/`, params),
  createFilial: (company_type: string, company_id: number, data: any) => requests.post(`/${company_type}_branches/${company_id}/create/`, data),
  editFilial: ( data: any, company_id: number, type: string, id:number ) => requests.put(`/${type}_branches/${company_id}/${id}/update/`, data),


}
const agent = {
  Price,
  Bids,
  Utils,
  Cars,
  Auth,
  Profile,
  Permissions,
  Account,
  PermissionsAdmin,
  Companies,
  Filials,
  Users,
  Catalog,
}

export default agent
