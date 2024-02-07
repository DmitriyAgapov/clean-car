import axios, { AxiosError } from "axios";
import appStore from 'stores/appStore'
import authStore from 'stores/authStore'
import  { decodeToken } from 'utils/getData'
import  'utils/axiosConfig'
import { User } from 'stores/userStore'
import { runInAction, toJS } from "mobx";
import { Company, CompanyType } from "stores/companyStore";

export type PaginationProps = {name?: string, ordering?: string, page?: string | number | URLSearchParams, page_size?: number | string}
type CreateCompanyPerformerFormData = Company<CompanyType.performer>
interface FilterPropsCars {
  number?: number
  car_type?: string
  model__name?: string
  brand__name?: string
  company__name?: string
}
//Подсказки адресов, config axios
const axiosSuggest = axios.create({})

//Константа для запросов
export const API_ROOT = 'https://dev.server.clean-car.net/api'


//Объект запросов
const requests = {
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

  put: (url: string, body: any) =>
    axios({
      url: `${API_ROOT}${url}`,
      // headers: tokenPlugin(),
      method: 'PUT',
      data: body,
    }),
  // .then((response) => response)
  // .catch(handleErrors),
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
  postSuggest: (query: string) =>
    axiosSuggest({
      url: 'http://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address',
      headers: {
        "Authorization": `Token ${process.env.SUGGEST_PUBLIC_API}`,
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      method: 'POST',
      data: JSON.stringify({ query: query }) ,
    }),
}

//Обработка ошибок
const handleErrors = (err: AxiosError) => {
    if (err && err.response && err.response.status === 401) {
        const refr = localStorage.getItem('jwt_refresh')
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
    getAllPrice: (pagination?: PaginationProps) => requests.get('/price/all_companies/list/', {}, pagination),
    getCurentCompanyPriceEvac: (company_id: number) => requests.get(`/price/${company_id}/active_evacuation`, {}),
    getCurentCompanyPriceTire: (company_id: number) => requests.get(`/price/${company_id}/active_tire`, {}),
    getCurentCompanyPriceWash: (company_id: number) => requests.get(`/price/${company_id}/active_wash`, {}),
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
  getAvailablePerformers: (customer_id:number, service_subtype_id: number) => requests.get(`/bids/${customer_id}/${service_subtype_id}/performers/`),
  createBid: (customer_id: number, data: CreateBidData) => requests.post(`/bids/${customer_id}/create/`, data),
  getBid: (company_id: number, id: number) => requests.get(`/bids/${company_id}/${id}/retrieve/`)
}
const Utils = {
  suggest: ({ query }:{query: string}) => requests.postSuggest(query)
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
    getAllUsers: () => requests.get('/accounts/all_users/', {}),
    getUser: ({ company_id, id }: { company_id: number; id: number }) => requests.get(`/accounts/${company_id}/users/${id}/retrieve/`)

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
}
const Permissions = {
  getAllCompanyPermissions: (company_id:number) => requests.get(`/permissions/${company_id}/groups/list/`, {}),
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
        requests.post('/catalog/car_models/create_with_new_brand/', {
            name: model,
            car_type: car_class,
            brand_name: brand,
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
    editSubtype: ({ id, subtype_id, name, is_active }:{ id: number, subtype_id: number, name: string, is_active: boolean }) => requests.put(`/catalog/services/subypes/${id}/update/`, {
      name: name,
      is_active: is_active,
      service_type: subtype_id,
    }),
    getServiceOption: (id: number) => requests.get(`/catalog/services/options/${id}/retrieve`),
    editServiceOption: ({ id, subtype_id, name, is_active }:{ id: number, subtype_id: number, name: string, is_active: boolean }) => requests.put(`/catalog/services/options/${id}/update/`, {
      name: name,
      is_active: is_active,
      service_type: subtype_id
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
}
const Account = {
  getCompanyUsers: (company_id:number) => requests.get(`/accounts/${company_id}/users/list/`),
  getCompanyUser: (company_id: number, id: number) => requests.get(`/accounts/${company_id}/users/${id}/retrieve/`),
  createCompanyUser: (company_id: number, data:any) => requests.post(`/accounts/${company_id}/users/create/`, data),
  updateCompanyUser: (company_id: number, data:any) => requests.put(`/accounts/${company_id}/profile/${data.id}/update/`, data),
}
const Filials = {
  getFilials: (company_type: string, company_id: number, params?: PaginationProps) => requests.get(`/${company_type}_branches/${company_id}/list/`, params),
  getFilial: (company_type: string, company_id: number, id: number, params?: PaginationProps) => requests.get(`/${company_type}_branches/${company_id}/${id}/retrieve/`, params),
  createFilial: (company_type: string, company_id: number, data: any) => requests.post(`/${company_type}_branches/${company_id}/create/`, data),
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
