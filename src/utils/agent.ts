import axios, { AxiosError } from 'axios'
import appStore from 'stores/appStore'
import authStore from 'stores/authStore'
import data, { decodeToken } from 'utils/getData'
import { User } from 'stores/userStore'
import { toJS } from 'mobx'

const API_ROOT = 'https://dev.server.clean-car.net/api'

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

const requests = {
  delete: (url: string) =>
    axios({
      url: `${API_ROOT}${url}`,
      headers: tokenPlugin(),
      method: 'DELETE'
    })
      .then((response) => response)
      .catch(handleErrors),
  get: (url: string, body?: any) =>
    axios({
      url: `${API_ROOT}${url}`,
      headers: tokenPlugin(),
      method: 'GET',
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
      .then((response) => response.data)
      .catch(handleErrors),

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
        requests.get(`/accounts/${company_id}/users/${id}/retrieve/`, {}),
    // getUser: (id: number) =>
    // 	requests.get('')
}

interface CompanyData {
    name: string
    is_active: boolean
    city: number
}

interface CreateCompanyPerformerFormData {
    company: CompanyData
    address: string
    connected_prices: string
    inn: string
    ogrn: string
    legal_address: string
    contacts: string
    service_percent: number
    application_type: string
}

const crudCompanyMethods = {
  create: (data:any, type:string) => requests.post(`/companies/${type}/create/`, data),
  update: (data:any, type:string, id: number) => requests.post(`/companies/${type}/${id}/update/`, data),
  list: (type:string) => requests.get(`/companies/${type}/list/`),
  read: (id: number, type:string) => requests.get(`/companies/${type}/${id}/retrieve/`, {}),
  delete: (id: number) => requests.delete(`/companies/${id}/delete/`),
}
const crudAccountMethods = {
  getUsers: (company_id: number) => requests.get(`/accounts/${company_id}/users/list/`)
}

const apiEndPoint = {
  company: crudCompanyMethods,
  account: crudAccountMethods
}
const Companies = {

    createCompanyPerformers: ( data: CreateCompanyPerformerFormData, type: string ) => {
      return  apiEndPoint.company.create(data, type)
    },
    getCompanyData: (id: number, type: string) => apiEndPoint.company.read(id, type),
    // createCompanyPerformers: ( data: CreateCompanyPerformerFormData ) => {
    //   return  requests.post('/companies/performer/create/', data)
    // },
    createCompanyCustomer: ( data: CreateCompanyPerformerFormData, type: string ) => {
      return  requests.post('/companies/customer/create/', data)
    },
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
    getAllCompanies: () => requests.get('/companies/all_companies/list/', {}),
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
  getAdminGroupIdPermission: (id: string) => requests.get(`/permissions_admin/groups/${id}/retrieve/`, {}),

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
  getCompany: (id:number) =>   apiEndPoint.account.getUsers(id)
}

const agent = {
  Auth,
  Profile,
  Account,
  PermissionsAdmin,
  Companies,
  Users,
  Catalog,
}

export default agent
