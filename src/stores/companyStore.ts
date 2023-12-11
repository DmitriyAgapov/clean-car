import { action, makeObservable, observable } from 'mobx'
import agent from 'utils/agent'
import catalogStore from 'stores/catalogStore'

export enum Payment {
  postoplata = 'Постоплата',
  predoplata = 'Предоплата',
}

export type City = {
  name: string
  id: number
}
export type Company = {
  name: string
  is_active: boolean
  profile_id?: string
  company_type?: string
  city: City
  id: number
}
export type CustomerProfile = {
  id: number
  company: Company
  created?: string
  updated?: string
  city: string
  address: string
  connected_prices: string
  inn?: string
  ogrn?: string
  legal_address?: string
  contacts?: string
  payment?: Payment
  bill?: string
  overdraft?: boolean
  overdraft_sum: number
}
export type PerformerProfile = {
  id: number
  company: Company
  created?: string
  updated?: string
  city: string
  address: string
  connected_prices: string
  inn?: string
  ogrn?: string
  legal_address?: string
  contacts?: string
  service_percent?: number
  application_type?: string
}

export interface Companies {
  companies: Company[] | []
}

export class CompanyStore {
  companies = observable.array()
  loadingCompanies: boolean = false
  updatingUser?: boolean
  updatingUserErrors: any

  constructor() {
    makeObservable(this, {
      companies: observable,
      loadingCompanies: observable,
      addCompany: action,
      loadCompanies: action,
      // updatingUser: observable,
      // updatingUserErrors: observable,

      // setUser: action,
      // updateUser: action,
      // forgetUser: action
    })
  }

  async loadCompanies() {
    this.loadingCompanies = true
    this.companies.clear()
    let result
    try {
      const data = await agent.Companies.getAllCompanies()
      if (data.status === 200) {
        //@ts-ignore
        const { results } = data.data
        this.companies = results
      }
    } catch (error) {
      throw new Error('Fetch data companies failed')
    } finally {
      this.loadingCompanies = false
    }
  }

  addCompany() {
    // this.loadingCompanies = true;
    catalogStore.getCities()
    // @ts-ignore
    this.companies.push({
      id: 12333,
      company: {
        name: '123Golden Gate',
        is_active: true,
        city: 1619,
      },
      address: 'fВладимирская область, город Радужный, квартал 1, дом 17',
      connected_prices: '-',
      inn: null,
      ogrn: null,
      legal_address: '',
      contacts: '',
      payment: 'Постоплата',
      bill: '0.00',
      overdraft: false,
      overdraft_sum: 1000,
      company_type: 'Компания-Заказчик',
    })
    // this.loadingCompanies = true;
  }

  getCompanies() {
    return this.companies
  }
}

const companyStore = new CompanyStore()
export default companyStore
