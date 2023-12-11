import axios, { AxiosError } from 'axios'
import appStore from 'stores/appStore'
import authStore from 'stores/authStore'
import { decodeToken } from 'utils/getData'
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
  delete: (url: string, body: any) =>
    axios({
      url: `${API_ROOT}${url}`,
      headers: tokenPlugin(),
      method: 'DELETE',
      data: body,
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
const Companies = {
  getListCompanyCustomer: (company_name?: string | undefined, page?: number | undefined) =>
    requests.get('/companies/list_company_customer/', {
      company_name: company_name,
      page: page,
    }),
  getListCompanyPerformer: (company_name?: string | undefined, page?: number | undefined) =>
    requests.get('/companies/list_company_performer/', {
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
    requests.delete(`/permissions_admin/groups/${id}/delete/`, {
      id: id,
    }),
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
const agent = {
  Auth,
  Profile,
  PermissionsAdmin,
  Companies,
  Users,
  Catalog,
}

export default agent
