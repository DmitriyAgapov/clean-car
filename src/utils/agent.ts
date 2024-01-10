import axios, { AxiosError } from 'axios'
import appStore from 'stores/appStore'
import authStore from 'stores/authStore'
import data, { decodeToken } from 'utils/getData'
import { User } from 'stores/userStore'
import { toJS } from 'mobx'
import { Company, CompanyType } from "stores/companyStore";
import pagination from "components/common/Pagination/Pagination";

export const API_ROOT = 'https://dev.server.clean-car.net/api'

const encode = encodeURIComponent

const handleErrors = (err: AxiosError) => {
  if (err && err.response && err.response.status === 401) {
    authStore.logout()
  }
  return err
}

const tokenPlugin = () => {
  if (appStore.token) return { Authorization: `Bearer ${appStore.token}` }
}
export type PaginationProps = {name?: string, ordering?: string, page?: number, page_size?: number}
const requests = {
    delete: (url: string) =>
        axios({
            url: `${API_ROOT}${url}`,
            headers: tokenPlugin(),
            method: 'DELETE',
        })
            .then((response) => response)
            .catch(handleErrors),
    get: (url: string, body?: any, pagination?:PaginationProps) =>
        axios({
            url: `${API_ROOT}${url}`,
            headers: tokenPlugin(),
            method: 'GET',
            params: {
              ...pagination
            }
        })
            .then((response) => response)
            .catch(handleErrors),

    put: (url: string, body: any) =>
        axios({
            url: `${API_ROOT}${url}`,
            headers: tokenPlugin(),
            method: 'PUT',
            data: body,
        })
            .then((response) => response)
            .catch(handleErrors),
    patch: (url: string, body: any) =>
        axios({
            url: `${API_ROOT}${url}`,
            headers: tokenPlugin(),
            method: 'PATCH',
            data: body,
        })
            .then((response) => response)
            .catch(handleErrors),

    post: (url: string, body: any) =>
        axios({
            url: `${API_ROOT}${url}`,
            headers: tokenPlugin(),
            method: 'Post',
            data: body,
        })
            .then((response) => response)
            .catch(handleErrors),
    postSuggest: (query: string) =>
        axios({
            url: 'http://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address',
            headers: {
                "Authorization": 'Token 194bded3651f373f0b44b56130a40aa5544e0e90',
              "Content-Type": "application/json",
              "Accept": "application/json",
            },
            method: 'Post',
            data: JSON.stringify({ query: query }) ,
        })
            .then((response) => response)
            .catch(handleErrors),
}
const Utils = {
  suggest: ({ query }:{query: string}) => requests.postSuggest(query)
}
const Auth = {
  current: () => {
    return new Promise((resolve, reject) => {
      if (appStore.token) {
        const dataUser = decodeToken(appStore.token)
        // console.log(dataUser);
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
  // save: (user: any) =>
  // 	requests.put('/user', { user })
}

const limit = (count: any, p: any) => `limit=${count}&offset=${p ? p * count : 0}`
const omitSlug = (article: any) => Object.assign({}, article, { slug: undefined })
const Users = {
    getAllUsers: () => requests.get('/accounts/all_users/', {}),
    getUser: ({ company_id, id }: { company_id: number; id: number }) =>
        requests.get(`/accounts/${company_id}/users/${id}/retrieve/`),
    // getUser: (id: number) =>
    // 	requests.get('')
}

interface CompanyData {
    name: string
    is_active: boolean
    city: number
}

type CreateCompanyPerformerFormData = Company<CompanyType.performer>

const crudCompanyMethods = {
  create: (data:any, type:string) => requests.post(`/companies/${type}/create/`, data),
  update: (data:any, type:string, id: number) => requests.put(`/companies/${type}/${id}/update/`, data),
  list: (type:string) => requests.get(`/companies/${type}/list/`),
  read: (type:string, id: number) => requests.get(`/companies/${type}/${id}/retrieve/`, {}),
  delete: (id: number) => requests.delete(`/companies/${id}/delete/`),
}
const crudAccountMethods = {
  getUsers: (company_id: number) => requests.get(`/accounts/${company_id}/users/list/`),
  getUser: (company_id: number, id: number) => requests.get(`/accounts/${company_id}/users/${id}/retrieve/`),
  createUser: (company_id: number, data: any) => requests.post(`/accounts/${company_id}/users/create/`, data),
  updateUser: (company_id: number, data: any) => requests.post(`/accounts/${company_id}/users/create/`, data),
}
const crudPermissionsMethods = {
  getCompanyPermissions: (company_id: number) => requests.get(`/permissions/${company_id}/groups/list/`),
  getUserPermissions: (company_id: number, id: number) => requests.get(`/permissions/${company_id}/groups/${id}/retrieve`),
}

const apiEndPoint = {
  company: crudCompanyMethods,
  account: crudAccountMethods,
  permissions: crudPermissionsMethods
}
const Companies = {
    createCompanyPerformers: ( data: CreateCompanyPerformerFormData, type: string ) => {
      return  apiEndPoint.company.create(data, type)
    },
    editCompany: ( data: CreateCompanyPerformerFormData, type: string, id:number ) => {
      return  apiEndPoint.company.update(data, type, id)
    },

    getCompanyData: (type: string, id: number ) => apiEndPoint.company.read(type, id),
    // createCompanyPerformers: ( data: CreateCompanyPerformerFormData ) => {
    //   return  requests.post('/companies/performer/create/', data)
    // },
    createCompanyCustomer: ( data: CreateCompanyPerformerFormData, type: string ) => {
      return  requests.post('/companies/customer/create/', data)
    },
    getMyCompanies: (pagination?: PaginationProps) => requests.get('/companies/my_companies/list/', {},pagination),
    getListCompanyCustomer: (company_name?: string | undefined, page?: number | undefined) =>
        requests.get('/companies/customer/list/', {
            company_name: company_name,
            page: page,
        }),
    getListCompanyPerformer: (company_name?: string | undefined, page?: number | undefined) =>
        requests.get('/companies/performer/list/', {
            company_name: company_name,
            page: page,
        }),
    getAllCompanies: (pagination?: PaginationProps) => requests.get('/companies/all_companies/list/', {}, pagination),

}
const Permissions = {
  getAllCompanyPermissions: (id:number) => apiEndPoint.permissions.getCompanyPermissions(id),
  getUserPermissions: (company_id: number, id:number ) => apiEndPoint.permissions.getUserPermissions(company_id, id),
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
}
const Account = {
  getCompanyUsers: (id:number) =>   apiEndPoint.account.getUsers(id),
  getCompanyUser: (company_id: number, id: number) => apiEndPoint.account.getUser(company_id, id),
  createCompanyUser: (company_id: number, data:any) => apiEndPoint.account.createUser(company_id, data),
  updateCompanyUser: (company_id: number, data:any) => apiEndPoint.account.createUser(company_id, data),

}
const Filials = {
  getFilials: (company_type: string, company_id: number, params?: PaginationProps) => requests.get(`/${company_type}_branches/${company_id}/list/`, params),
  getFilial: (company_type: string, company_id: number, id: number, params?: PaginationProps) => requests.get(`/${company_type}_branches/${company_id}/${id}/retrieve/`, params),
  createFilial: (company_type: string, company_id: number, data: any) => requests.post(`/${company_type}_branches/${company_id}/create/`, data),
}
const agent = {
  Utils,
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
