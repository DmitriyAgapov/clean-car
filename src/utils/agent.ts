import axios, { AxiosError } from "axios";
import appStore from 'stores/appStore'
import authStore from 'stores/authStore'
import  { decodeToken } from 'utils/getData'
import  'utils/axiosConfig'
import userStore, { User } from 'stores/userStore'
import {  toJS } from "mobx";
import { Company, CompanyType, CompanyTypeRus } from "stores/companyStore";
import { BidsStatus } from "stores/bidsStrore";
import { notifications } from "@mantine/notifications";
import useSWR from "swr";
import { KeysBidCreate } from "stores/types/bidTypes";
import { logger } from "utils/utils";
import { Client } from "utils/schema";

export type PaginationProps = {
  name?: string | number | URLSearchParams,
  ordering?: string | number | URLSearchParams,
  page?: string | number | URLSearchParams,
  page_size?: number | string | URLSearchParams
  q?: string | number | URLSearchParams
  searchString?: string | number | URLSearchParams
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
  })
const axiosUpload = axios.create({
  headers: {
    'Content-Type': 'multipart/form-data',
    'Authorization': `Bearer ${window.localStorage.getItem('jwt')}`
  }
  })

//Константа для запросов
export const API_ROOT = process.env.REACT_APP_PUBLIC_API
// export const API_ROOT = process.env.REACT_APP_PUBLIC_API
export const fetcherNew = async (url:string) => requests.getNew(url).then(r => ({...r.data, url: url}))
export const client = new Client(API_ROOT, axios)
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
  get: (url: string,  pagination?:PaginationProps, responseType?: string) =>
     axios({
      url: `${API_ROOT}${url}`,
      // headers: tokenPlugin(),
      method: 'GET',
      params: pagination

    })
  .then((response:any) => response)
  // .catch(handleErrors)
  ,
  getFile: (url: string,  pagination?:PaginationProps) =>
     axios({
      url: `${API_ROOT}${url}`,
      // headers: tokenPlugin(),
      method: 'GET',
      params: pagination,
      responseType: "blob",
    })
  .then((response) => {
       const type = response.headers['content-type']
       const blob = new Blob([response.data], { type: type })
       const link = document.createElement('a')
       link.href = window.URL.createObjectURL(blob)
       link.download = 'report.xlsx'
       link.click()
     })
  .catch(handleErrors),

  getNew: (url: string) => {
    return axios.get(`${API_ROOT}${url}`,{
      // headers: tokenPlugin(),
      method: 'GET'
    }).then((response: any) => response).catch(handleErrors)
  },

  put: (url: string, body: any, headers?: any) =>
    axios({
      url: `${API_ROOT}${url}`,
      headers: headers,
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

  post: (url: string, body: any, headers?: any) =>
    axios({
      url: `${API_ROOT}${url}`,
      // headers: tokenPlugin(),
      headers: headers,
      method: 'POST',
      data: body,
    })
  .then((response) => response)
  .catch(handleErrors),
  postSuggest: (props:any) =>
    axiosSuggest({
      url: process.env.REACT_APP_SUGGEST_URL,
      headers: {
        "Authorization": `Token ${process.env.REACT_APP_SUGGEST}`,
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      method: 'POST',
      data: JSON.stringify(props) ,
    }),
  img: (url:string, form:FormData, bidId?: number) => axiosUpload.post(`${API_ROOT}${url}`, form)
  .then((response) => response),
  imgUp: (url:string, form:FormData, bidId?: number) => axiosUpload.post(`${API_ROOT}${url}`, form)
  .then((response) => response),

}

//Обработка ошибок
const handleErrors = (err: AxiosError & any) => {

    if(err && err.response && (err.response.status === 400 || err.response.status === 405)) {
      // @ts-ignore
      const errMsg = typeof err.response.data === "string" ? err.response.data : err.response.data.error_message
      if(err && err.response && err.response?.data?.error_message) {
        notifications.show({
          id: 'global-error',
          withCloseButton: true,
          autoClose: 5000,
          title: "Ошибка",
          message: errMsg,
          color: 'var(--errorColor)',
          loading: false,
        })
      }
    }
  if (!err.response) {
    // We have a network error
    appStore.setNetWorkStatus(false)
  } else if(!appStore.getNetWorkStatus) {
    appStore.setNetWorkStatus(true)
  }
    if(err.response && err.response.data && err.response.data.error_message ) {
      notifications.show({
        id: 'global-error',
        withCloseButton: true,
        autoClose: 5000,
        title: "Ошибка",
        message: err.response.data.error_message,
        color: 'var(--errorColor)',
        loading: false,
      })
    }
    return err
}
const Price = {
    updatePrice: () => requests.post('/price/update_catalog/', {}),
    createPrice: (company_id: number) => requests.post(`/price/${company_id}/create/`, {}),
    priceDoubling: (company_id: number, id: number) => requests.post(`/price/${company_id}/${id}/doubling/`, {}),
    getAllPrice: (pagination?: PaginationProps) => requests.get('/price/all_companies/list', pagination),
    getAllCompanyPrices: (company_id: number | string, pagination?: PaginationProps) => requests.get(`/price/${company_id}/active_list/`, pagination),
    getHistoryPrice: (company_id:number | string, pagination?: any) => requests.get(`/price/${company_id}/history/`, pagination),
    getCurentCompanyPriceEvac: (company_id: number) => requests.get(`/price/${company_id}/active_evacuation`, {}),
    getCompanyPriceEvac: (company_id: number, id: number) => requests.get(`/price/${company_id}/${id}/evacuation/`, {}),
    getCurentCompanyPriceTire: (company_id: number) => requests.get(`/price/${company_id}/active_tire`, {}),
    getCompanyPriceTire: (company_id: number, id: number) => requests.get(`/price/${company_id}/${id}/tire/`, {}),
    getCurentCompanyPriceWash: (company_id: number) => requests.get(`/price/${company_id}/active_wash`, {}),
    getCompanyPriceWash: (company_id: number, id: number) => requests.get(`/price/${company_id}/${id}/wash/`, {}),
    updatePriceWash: (company_id: number, price_id: number, data: any) =>
        requests.post(`/price/${company_id}/${price_id}/new_wash/`, { positions: data }),
    updatePriceEvac: (company_id: number, price_id: number, data: any) =>
        requests.post(`/price/${company_id}/${price_id}/new_evacuation/`, { positions: data }),
    updatePriceTire: (company_id: number, price_id: number, data: any) =>
        requests.post(`/price/${company_id}/${price_id}/new_tire/`, { positions: data }),
}

export interface CreateBidData {
    address_from?: string | null
    address_to?: string | null
    car: number
    fotos: number[]
    city: number
    company: number
    conductor: number
    customer_comment?: string | null
    is_parking?: boolean | null
    keys: KeysBidCreate | null
    lat_from?: number | null
    lat_to?: number | null
    lon_from?: number | null
    schedule?: string | null | number
    lon_to?: number | null
    performer: number | null
    phone: string | null
    service_option: number[]
    service_subtype: number
    service_type: number
    truck_type?: string | null
    wheel_lock: number | null
}

const Img = {
  uploadFiles: (form: FormData | any, company_id: number) => requests.post(`/bid_photos/${company_id}/create/`, form),
  createBidPhoto: (bid_id: number, company_id: number, name: string, is_before: boolean) => requests.post(`/bid_photos/${company_id}/${bid_id}/create/`, {
    is_before: is_before,
    img: `https://s3.timeweb.cloud/3c2e3e1f-b87109fe-0085-436a-8a57-be275dc35ee8/${bid_id}/${name}`,
    bid: bid_id
  }),
  deleteBidPhoto: (company_id: number|string, id: number|string) => requests.delete(`/bid_photos/${company_id}/${id}/delete/`),
}
// @ts-ignore
const Bids = {
  getAllBids: (params: PaginationProps) => requests.get('/bids/all_bids/list', params),
  //@ts-ignore
  getAllBidsNew: (params: string) =>  useSWR(`${userStore.isAdmin ? `/bids/all_bids/list${params ? `?${params}` : '?page=1&page_size=10'}` : `/bids/${userStore.myProfileData.company?.id}/list${params ? `?${params}` : '?page=1&page_size=10'}`}`, fetcherNew, {refreshInterval: 10000, use: [logger]}),
  getAvailablePerformers: (company_id:number, city_id:number, data: { car_id: number, subtype_id: number, options_idx: number[] }) => requests.post(`/bids/${company_id}/${city_id}/bid_performers/`, data),
  createBid: (customer_id: number, data: CreateBidData) => requests.post(`/bids/${customer_id}/create/`, data),
  getBid: (company_id: number, id: number) => requests.get(`/bids/${company_id}/${id}/retrieve/`),
  getBidNew: (company_id: string, id: string) => useSWR(`/bids/${company_id}/${id}/retrieve/`, fetcherNew),
  getAllCompanyBids: (company_id: number|string, params: PaginationProps) => requests.get(`/bids/${company_id}/list`, params),
  updateBidStatus: (company_id: number|string, bid_id: number|string, status:BidsStatus, fotos?: number[]) => requests.put(`/bids/${company_id}/${bid_id}/status/`, {status: status.toString(), fotos: fotos}),
  loadBidPhotos: (company_id:  number|string, bid_id:  number|string) => requests.get(`/bid_photos/${company_id}/${bid_id}/list/`),
  getBidCountAdmin: () => requests.get('/bids/count/admin/'),
  getBidCountCustomer: (company_id: number) => requests.get(`/bids/${company_id}/count/customer/`),
  getBidCountPerformer: (company_id: number) => requests.get(`/bids/${company_id}/count/performer/`),
  getExportBids: (params: PaginationProps) => requests.getFile('/bids/export_bids/', params)
}
const Utils = {
  sendToSupport: (values:any) => requests.post(`/extra/contact_form/`, values),
  suggest: (props:{query: any, location: any[], restrict_value: boolean,

  }
  ) => requests.postSuggest({...props,bounds: "city-house"})
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
  login: (data: {email: string, password: string}) => requests.post('/token/', data, {}),
  register: (data:{ first_name: string, last_name: string, phone: string, email: string, city: number, password: string, password2: string }) => requests.post('/accounts/register/', data, {}),

}
const Users = {
    getHistoryUser:( company_id: number| string, id : number | string) => requests.get(`/history/${company_id}/${id}/user/`),
    transferUser: (data: {
        employee_id: number | string,
        old_company_id: string | number,
        new_company_id: string | number,
        new_group_id: string | number
    }) => requests.post(`/accounts/${data.old_company_id}/transfer/`, data),
    getAllUsers:  (pagination?: PaginationProps) => requests.get('/accounts/all_users/', pagination),
    getAllUsersTest:  (params: string, pagination?: PaginationProps) => useSWR(`${userStore.isAdmin ? `/accounts/all_users${params ? `?${params}` : '?page=1&page_size=10'}` : `/accounts/${userStore.myProfileData.company?.id}/users/list${params ? `?${params}` : '?page=1&page_size=10'}`}`,(url) => requests.getNew(url).then(r => r.data)),
    getUser: ({ company_id, id }: { company_id: number; id: number }) => requests.get(`/accounts/${company_id}/users/${id}/retrieve/`),
    getUserTest: ({ company_id, id }: { company_id: number; id: number }) => useSWR(`/accounts/${company_id}/users/${id}/retrieve/`, requests.get),
    getCompanyUsers: (company_id: number, pagination?: PaginationProps) => requests.get(`/accounts/${company_id}/users/list/`, pagination),
    getCompanyUsersNew: (params: string, company_id: number, pagination?: PaginationProps) => useSWR(`/accounts/${company_id}/users/list${params ? `?${params}` : '?page=1&page_size=10'}`, (url) => requests.getNew(url).then(r => r.data)),

}
const Companies = {
    companyWithChildren: (company_id: string | number, company_type?: string, pagination?: PaginationProps) => requests.get(`/companies/${company_id}/avalible/list/`, pagination),
    createCompanyPerformers: ( data: Company<CompanyType.performer>, type: string ) => requests.post(`/companies/${type}/create/`, data),
    editCompany: ( data: Company<CompanyType.performer>, type: string, id:number ) => requests.put(`/companies/${type}/${id}/update/`, data),

    getCompanyData: (type: string, id: number ) => requests.get(`/companies/${type}/${id}/retrieve/`, {}),
    getCompanyDataNew: (type: string, id: string) => useSWR(`/companies/${type}/${id}/retrieve/`, (url) => requests.getNew(url).then(r => r.data)),
    // createCompanyPerformers: ( data: CreateCompanyPerformerFormData ) => {
    //   return  requests.post('/companies/performer/create/', data)
    // },
    createCompanyCustomer: ( data: Company<CompanyType.performer>, type: string ) => requests.post('/companies/customer/create/', data),
    getMyCompanies: (pagination?: PaginationProps) => requests.get('/companies/my_companies/list/', pagination),
    getListCompanyCustomer: (pagination?: PaginationProps) => requests.get('/companies/customer/list/', pagination),
    getListCompanyPerformer: (pagination?: PaginationProps) => requests.get('/companies/performer/list/', pagination),
    getAllCompanies: (pagination?: PaginationProps) => requests.get('/companies/all_companies/list/', pagination),
    getOnlyAllCompanies: (pagination?: PaginationProps) => requests.get('/companies/only_companies/list/', pagination),
    getOnlyAllCompaniesNew: (params: string, pagination?: PaginationProps) => useSWR(`/companies/only_companies/list${params ? `?${params}` : '?page=1&page_size=10'}`, (url) => requests.getNew(url).then(r => r.data), {
       revalidateOnMount: true
    }),
    getOnlyBranchesCompanies: (pagination?: PaginationProps) => requests.get('/companies/only_branches/list/', pagination),
}
const Permissions = {
  getAllCompanyPermissions: (company_id:number, pagination?: PaginationProps) => requests.get(`/permissions/${company_id}/groups/list/`, pagination),
  getUserPermissions: (company_id: number, id:number ) => requests.get(`/permissions/${company_id}/groups/${id}/retrieve`),
  createPermission: (company_id: number, data: any) => requests.post(`/permissions/${company_id}/groups/create/`, data),
  getPermissionById: (company_id: number | string, id: number | string) => requests.get(`/permissions/${company_id}/groups/${id}/retrieve/`, {}),
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
    getCarBrands: (params?: PaginationProps) => requests.get('/catalog/car_brands', params),
    getCarModelWithBrand: (id: string | number) => requests.get(`/catalog/car_models/${id}/retrieve`),
    getCarModelWithBrandNew: (id:string) =>  useSWR(`/catalog/car_models/${id}/retrieve`, (url) => requests.getNew(url).then(r => r.data)),
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
        requests.put(`/catalog/car_models/${id}/update_with_new_brand/`, {
            name: model,
            car_type: car_class,
            brand_name: brand_name,
        }),
    updateCarBrandWithExistBrand: (id: number, brand: number, car_class: string, model: string) =>
        requests.put(`/catalog/car_models/${id}/update_with_exist_brand/`, {
            name: model,
            car_type: car_class,
            brand: brand,
        }),
    getCarBrandModels: (brand_id: number, params?: PaginationProps) =>
        requests.get(`/catalog/car_brands/${brand_id}/car_models/list/`, params),
    getCarModels: (params?: PaginationProps) => requests.get(`/catalog/car_models/list/`, params),
    getCarModelsNew: (params: string) =>  useSWR(`/catalog/car_models/list${params ? `?${params}` : '?page=1&page_size=10'}`,(url) => requests.getNew(url).then(r => r.data)),
    getCarBrandsWithModels: (params?: PaginationProps | undefined) =>
        requests.get(`/catalog/car_brands_with_models`, params),
    getCities: (params?: PaginationProps) => requests.get('/catalog/cities/', params),
    getCitiesNew: (params: string) =>  useSWR(`/catalog/cities${params ? `?${params}` : '?page=1&page_size=10'}`, (url) =>  requests.getNew(url).then(r => r.data)),
    getCity: (id: number) => requests.get(`/catalog/cities/${id}/retrieve/`),
    getCityNew: (id: string) => useSWR(`/catalog/cities/${id}/retrieve/`, (url) => requests.getNew(url).then(r => r.data)),
    createCity: (name: string, is_active: boolean, timezone: string)  =>
        requests.post('/catalog/cities/create/', { name: name, is_active: is_active, timezone: timezone}),
    deleteCity: (id: number) => requests.delete(`/catalog/cities/${id}/delete`),
    deleteCarModel: (id: number) => requests.delete(`/catalog/car_models/${id}/delete`),
    editCity: (id: number, name: string, is_active: boolean, timezone: string) =>
        requests.put(`/catalog/cities/${id}/update/`, { name: name, id: id, is_active: is_active, timezone: timezone }),
    getServices: (params?: PaginationProps) => requests.get('/catalog/services/', params),
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
        requests.get(`/catalog/services/subypes/${subtype_id}/retrieve`, params),
    getServiceSubtypesListByServiceId: (id: number, params?: PaginationProps) =>
        requests.get(`/catalog/services/${id}/subypes/`, params)
}
const Cars = {
  getCarHistory: (company_id: string | number, car_id: string | number)=> requests.get(`/history/${company_id}/${car_id}/car/`),
  transferCar: (data: { car_id: number | string, old_company_id: number | string, new_company_id: number | string }) => requests.post(`/cars/${data.old_company_id}/transfer/`, data),
  getCompanyCars: (company_id: number, params?: PaginationProps, filter?: FilterPropsCars) => requests.get(`/cars/${company_id}/list/`, params),
  getAdminCars: ( params?: PaginationProps, filter?: FilterPropsCars) => requests.get(`/cars_admin/list/`, params),
  getCarsNew: (params: string, company_id?: string | number,  pagination?: PaginationProps) => useSWR(`${userStore.isAdmin ? `/cars_admin/list${params ? `?${params}` : '?page=1&page_size=10'}` : `/cars/${company_id ? company_id : userStore.myProfileData.company?.id}/list${params ? `?${params}` : '?page=1&page_size=10'}`}`,(url) => requests.getNew(url).then(r => r.data)),
  getAdminCar: (id: number) => requests.get(`/cars_admin/${id}/retrieve/`, {}),
  getCompanyCar: (company_id: number , id: number)  => requests.get(`/cars/${company_id}/${id}/retrieve/`),
  createCompanyCar: (company_id: number, data: any) => requests.post(`/cars/${company_id}/create/`, data),
  editCompanyCar: (company_id: number, id: number, data: any) => requests.put(`/cars/${company_id}/${id}/update/`, data),
  uploadCars: (data: any) => requests.post('/cars_admin/upload_cars/', data, {
    // 'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  }),
}
const Limits = {
  createLimit: ({company_id, data }:{company_id: number, data:{ amount?: number, is_day?: boolean,  is_active?: boolean, service_type: number, employee?: number, company: number, car?: number }}) => requests.post(`/limits/${company_id}/create/`, data),
  updateLimit: ({company_id, id, data }:{company_id: number, id: number|string, data:{ amount?: number, is_day?: boolean,  is_active?: boolean, service_type: number, employee?: number, company: number, car?: number }}) => requests.put(`/limits/${company_id}/${id}/update/`, data),
  getAllLimitsByAdmin: (params?: { q?: string, is_day?: string, ordering?: string, page?: string, page_size?: string }) => requests.get('/limits/all/list/', params),
  getAllLimitsByCustomer: (params: { company_id: string, q?: string, is_day?: string, ordering?: string, page?: string, page_size?: string }) => requests.get(`/limits/${params.company_id}/list/`, params),
  deleteLimit: (company_id: number, id: number) => requests.delete(`/limits/${company_id}/${id}/delete/`),
  getLimit: (company_id: number, id: number) => requests.get(`/limits/${company_id}/${id}/retrieve/`),
}
const Account = {
  accountsAllUsers: (params: PaginationProps) => requests.get('/accounts/all_users/', params),
  accountsUsersList: (company_id:number, params: PaginationProps) => requests.get(`/accounts/${company_id}/users/list/`, params),
  getCompanyUsers: (company_id:number) => requests.get(`/accounts/${company_id}/users/list/`),
  getCompanyUser: (company_id: number, id: number) => requests.get(`/accounts/${company_id}/users/${id}/retrieve/`),
  createCompanyUser: (company_id: number, data:any) => requests.post(`/accounts/${company_id}/users/create/`, data),
  updateCompanyUser: (company_id: number, data:any) => requests.put(`/accounts/${company_id}/profile/${data.id}/update/`, data),
  changeUserProfile: (company_id: number, data:any) => requests.put(`/accounts/${company_id}/change_profile/${data.id}/`, data),
  createAdminUser: (data: any) => requests.post('/accounts_admin/user/create/', data),
  uploadUsers: (data: any) => requests.post('/accounts_admin/upload_users/', data, {
    // 'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  }),
  accountEmailConfirmation: ({company_uid, user_uid, token}: {company_uid: string, user_uid: string, token: string}) => requests.post('/accounts/email_confirmation/', {company_uid, user_uid, token}),
  accountRestorePassword: (email:string) => requests.post(`/accounts/forgot_password/`, {email: email}),
  accountNewPassword:({user_uid, token, password, password2}: {password: string, password2: string, user_uid: string, token: string}) => requests.post('/accounts/new_password/', {password, password2, user_uid, token}),
  uploadAvatar: (data:FormData) => requests.put('/accounts/update_avatar/', data)
}
const Balance = {
  getBalanceExportReport: (params?: PaginationProps) => requests.getFile('/balance/export_report/', params),
  getReport: (params?: PaginationProps) => requests.get(`/balance/report/`, params),
  getReportByCompanyId: (company_id: number, params?: PaginationProps) => requests.get(`/balance/report/${company_id}`, params),
  getTransactionList: (company_id: number, params?: PaginationProps) => requests.get(`/balance/${company_id}/transactions/list/`, params),
  getTransactionListAdmin: (params?: PaginationProps) => requests.get('/balance/all_transactions/', params),
  upBalance: (company_id:number, purpose:number, amount:number, description?: string, service_type_id?: number) => requests.post('/balance/up_balance/', {
    company_id: company_id,
    purpose: purpose,
    amount: amount,
    description: description,
    service_type_id: service_type_id
}),
  getExportTypeReport: (serivice_id: string | number, params?: PaginationProps) => requests.getFile(`/balance/export_type_report/${serivice_id}/`, params),
  getServiceReport: (params?: PaginationProps) => requests.get('/balance/service_report/', params),
  getServiceReportByType: (service_id: number | string, params?: PaginationProps) => requests.get(`/balance/type_report/${service_id}`, params),
  getServiceReportByTypeAndCompany: (service_id: number | string, company_id: number | string, params?: PaginationProps) => requests.get(`/balance/${company_id}/verification_report/${service_id}/`, params),
  getExportServiceReportByTypeAndCompany: (service_id: number | string, company_id: number | string, params?: PaginationProps) => requests.getFile(`/balance/${company_id}/export_verification_report/${service_id}`, params),
}
const Filials = {
  getFilials: (company_type: string, company_id: number, params?: PaginationProps) => requests.get(`/${company_type}_branches/${company_id}/list/`, params),
  getFilialsNew: (params: string, pagination?: PaginationProps) => useSWR(`${userStore.isAdmin ? `/companies/only_branches/list${params ? `?${params}` : '?page=1&page_size=10'}` : `/${CompanyTypeRus(userStore.myProfileData.company?.company_type)}_branches/${userStore.myProfileData.company?.id}/list${params ? `?${params}` : '?page=1&page_size=10'}`}`, (url) => requests.getNew(url).then(r => r.data)),
  getFilial: (company_type: string, company_id: number, id: number, params?: PaginationProps) => requests.get(`/${company_type}_branches/${company_id}/${id}/retrieve/`, params),
  createFilial: (company_type: string, company_id: number, data: any) => requests.post(`/${company_type}_branches/${company_id}/create/`, data),
  editFilial: ( data: any, company_id: number, type: string, id:number ) => requests.put(`/${type}_branches/${company_id}/${id}/update/`, data),
}
const agent = {
  Account,
  Auth,
  Balance,
  Bids,
  Cars,
  Catalog,
  Companies,
  Filials,
  Img,
  Limits,
  Permissions,
  PermissionsAdmin,
  Price,
  Profile,
  Users,
  Utils
}

export default agent
