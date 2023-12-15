import { action, flow, get, makeObservable, observable, ObservableMap, remove, set } from 'mobx'
import agent from 'utils/agent'
import data from "utils/getData";

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
    loadingError: boolean = false;
    fullCompanyData  = new Map()
    updatingUser?: boolean
    updatingUserErrors: any
    addCompany = flow(function* ( this:CompanyStore, data: any, type: string ) {
        this.loadingCompanies = true
        try {
          if(type === 'Исполнитель') {
            agent.Companies.createCompanyPerformers(data, 'performer').then(r => console.log(r))
          }
          if(type === 'Заказчик') {
            agent.Companies.createCompanyCustomer(data, 'customer').then(r => console.log(r))
          }
        }
        catch (e) {
          new Error('Create COmpany failed')
        }
        finally {

          this.loadingCompanies = true
        }
    })

    loadCompaniesPerformers = flow(function* (this: CompanyStore) {
        try {
            const { data } = yield agent.Companies.getListCompanyPerformer()
            this.companiesPerformers = data.results
        } catch (e) {

            throw new Error('Filed load companies performers')
        }
    })

  getCompanyUsers = flow(function* (this: CompanyStore, id: number) {
      this.loadingCompanies = true
      let result;
      try {
          const { data, status } = yield agent.Account.getCompany(id)
          if (status === 200) {
              result = data.results
              console.log(result)
              console.log(get(this.fullCompanyData, `${id}`))
            // const oldData = get(this.fullCompanyData, `${id}`)
            remove(this.fullCompanyData, `${id}`)
            // set(this.fullCompanyData, `${id}`, result)
            console.log(get(this.fullCompanyData, `${id}`))
              // this.fullCompanyData.set(2, {get()})
          }
      }
      catch (e) {
        this.loadingError = true
        new Error('get users failed')
      }
      finally {
        console.log(this.fullCompanyData);
        this.loadingCompanies = true
      }
      return result
    })

    loadCompanyWithTypeAndId = flow(function* (this: CompanyStore, type: string, id: number){
      this.loadingCompanies = true
      try {
        const { data, status } = yield agent.Companies.getCompanyData(id, type);
        const users = yield agent.Account.getCompany(id);
        data.users = users.data.results;
        status == 200 && set(this.fullCompanyData, {[data.id]: data});
      }
      catch (e) {
        this.loadingError = true
        new Error('Create Company failed')
      }
      finally {
        this.loadingCompanies = true
      }
      return get(this.fullCompanyData, `${id}`)
    })

    constructor() {
        makeObservable(this, {
            companies: observable,
            loadingCompanies: observable,
          fullCompanyData: observable,
            addCompany: action,
            loadCompanies: action,
          loadCompanyWithTypeAndId: action,
          loadCompaniesPerformers: action,
          setCompanyPerformValue: action,
          getCompanyFullData: action,
          getCompanyUsers: action,

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
    getCompanyFullData(id: number) {
        return get(this.fullCompanyData, `${id}`)
    }

}

const companyStore = new CompanyStore()
export default companyStore
