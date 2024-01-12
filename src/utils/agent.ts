import axios, { AxiosError } from "axios";
import appStore from 'stores/appStore'
import authStore from 'stores/authStore'
import  { decodeToken } from 'utils/getData'
import  'utils/axiosConfig'
import { User } from 'stores/userStore'
import { toJS } from 'mobx'
import { Company, CompanyType } from "stores/companyStore";

export type PaginationProps = {name?: string, ordering?: string, page?: number, page_size?: number}
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

//Params для запросов
const encode = encodeURIComponent
const limit = (count: any, p: any) => `limit=${count}&offset=${p ? p * count : 0}`
const omitSlug = (article: any) => Object.assign({}, article, { slug: undefined })
const tokenPlugin = () => {
  if (appStore.token) return { Authorization: `Bearer ${appStore.token}` }
}

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
      params: {
        ...pagination
      }
    }),
  // .then((response) => response.data)
  // .catch(handleErrors),

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
      method: 'Post',
      data: body,
    }),
  // .then((response) => response)
  // .catch(handleErrors),
  postSuggest: (query: string) =>
    axiosSuggest({
      url: 'http://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address',
      headers: {
        "Authorization": 'Token 194bded3651f373f0b44b56130a40aa5544e0e90',
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      method: 'Post',
      data: JSON.stringify({ query: query }) ,
    }),
}

//Обработка ошибок
const handleErrors = (err: AxiosError) => {
  if (err && err.response && err.response.status === 401) {
    if(appStore.tokenRefresh) {
      // agent.Auth.tokenRefresh()
      //   .then((resolve:any) => resolve.data)
      //   .then((data) => {
      //     appStore.setToken(null)
      //     appStore.setToken(data.access)
      // })
      //   .catch((err) => {
      //     appStore.setTokenError(err.response.data)
      //     authStore.logout()
      // })
    }
  }
  return err
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
  tokenRefresh: () => requests.post('/token/refresh/', { refresh:  window.localStorage.getItem('jwt_refresh')}),
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
    getUser: ({ company_id, id }: { company_id: number; id: number }) =>
        requests.get(`/accounts/${company_id}/users/${id}/retrieve/`)

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
    getListCompanyCustomer: (company_name?: string | undefined, page?: number | undefined) => requests.get('/companies/customer/list/', {
            company_name: company_name,
            page: page,
        }),
    getListCompanyPerformer: (company_name?: string | undefined, page?: number | undefined) => requests.get('/companies/performer/list/', {
            company_name: company_name,
            page: page,
        }),
    getAllCompanies: (pagination?: PaginationProps) => requests.get('/companies/all_companies/list/', {}, pagination),
}
const Permissions = {
  getAllCompanyPermissions: (company_id:number) => requests.get(`/permissions/${company_id}/groups/list/`),
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
    getMyCompany: () => requests.get('/companies/my_companies/list/', {}),
    // follow: (username: string) =>
    // 	requests.post(`/profiles/${username}/follow`, {}),
    // get: (username: string) =>
    // 	requests.get(`/profiles/${username}`),
    // unfollow: (username: string) =>
    // 	requests.del(`/profiles/${username}/follow`)
}
const Catalog = {
  getCities: () => requests.get('/catalog/cities/'),
  getCarBrands: () => requests.get('/catalog/car_brands/'),
  getCarBrandModels: (brand_id:number) => requests.get(`/catalog/${brand_id}/car_models/`),
}
const Cars = {
  getCompanyCars: (company_id: number, params?: PaginationProps, filter?: FilterPropsCars) => requests.get(`/cars/${company_id}/list/`, params),
  getAdminCars: ( params?: PaginationProps, filter?: FilterPropsCars) => requests.get(`/cars_admin/list/`, {...params, ...filter}),
  createCompanyCar: (company_id: number, data: any) => requests.post(`/cars/${company_id}/create/`, data),
}
const Account = {
  getCompanyUsers: (company_id:number) => requests.get(`/accounts/${company_id}/users/list/`),
  getCompanyUser: (company_id: number, id: number) => requests.get(`/accounts/${company_id}/users/${id}/retrieve/`),
  createCompanyUser: (company_id: number, data:any) => requests.post(`/accounts/${company_id}/users/create/`, data),
  updateCompanyUser: (company_id: number, data:any) => requests.post(`/accounts/${company_id}/users/create/`, data),
}
const Filials = {
  getFilials: (company_type: string, company_id: number, params?: PaginationProps) => requests.get(`/${company_type}_branches/${company_id}/list/`, params),
  getFilial: (company_type: string, company_id: number, id: number, params?: PaginationProps) => requests.get(`/${company_type}_branches/${company_id}/${id}/retrieve/`, params),
  createFilial: (company_type: string, company_id: number, data: any) => requests.post(`/${company_type}_branches/${company_id}/create/`, data),
}
const agent = {
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
