import { action, flow, makeObservable, observable } from 'mobx'
import agent from 'utils/agent'

export enum Payment {
  postoplata = 'Постоплата',
  predoplata = 'Предоплата',
}

export type City = {
  name?: string
  id?: number
}
export type Company = {
  name: string
  is_active: boolean
  profile_id?: string
  company_type?: string
  city: City
  id?: number
}
export type CustomerProfile = {
  payment?: Payment
  bill?: string
  overdraft?: boolean
  overdraft_sum?: number
} & PerformerProfile;

export type PerformerProfile = {
  id?: number
  company: Company
  created?: string
  updated?: string
  address: string
  connected_prices: string
  inn: string
  ogrn: string
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
    companiesPerformers = observable.array()
    loadingCompanies: boolean = false
    companyForm: PerformerProfile & CustomerProfile = observable.object({
      id: 0,
      company: {
        name: "",
        is_active: true,
        city: {
          name: '',
          id: 0
        },
      },
      address: '',
      connected_prices: " ",
      inn: '',
      ogrn: '',
      legal_address: '',
      contacts: '',
      service_percent: 0,
      application_type: 'Заказчик'
    })
    updatingUser?: boolean
    updatingUserErrors: any
    addCompany = flow(function* ( this:CompanyStore, data: any, type: string ) {

        this.loadingCompanies = true
        try {
          if(type === 'Исполнитель') {
            agent.Companies.createCompanyPerformers(data).then(r => console.log(r))
          }
          if(type === 'Заказчик') {
            agent.Companies.createCompanyCustomer(data).then(r => console.log(r))
          }
        }
        catch (e) {
          new Error('Create COmpany failed')
        }
        finally {

          this.loadingCompanies = true
        }
        // @ts-ignore

    })
    loadCompaniesPerformers = flow(function* (this: CompanyStore) {
        try {
            const { data } = yield agent.Companies.getListCompanyPerformer()
            this.companiesPerformers = data.results
        } catch (e) {
            throw new Error('Filed load companies performers')
        }
    })

    constructor() {
        makeObservable(this, {
            companies: observable,
            loadingCompanies: observable,
            addCompany: action,
            loadCompanies: action,
          setCompanyPerformValue: action,

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
    setCompanyPerformValue(obj: any) {
        this.companyForm = {
          ...this.companyForm,
          ...obj
        }
      console.log(this.companyForm);
    }
    getCompanies() {
        return this.companies
    }
}

const companyStore = new CompanyStore()
export default companyStore
