import { action, flow, get, IObservableArray, makeObservable, observable, ObservableMap, remove, set } from 'mobx'
import agent from 'utils/agent'

export enum Payment {
  postoplata = 'Постоплата',
  predoplata = 'Предоплата',
}
export enum CompanyType {
  customer = "Компания-Заказчик",
  performer = "Компания-Исполнитель",
  phislico = "Физическое лицо"
}

export type City = {
  name?: string
  id?: number
}
export type Company<Type>  = {
  id?: number;
  name: string;
  created?: string;
  updated?: string;
  is_active?: boolean;
  profile_id?: string;
  company_type?: Type;
  city: City | number;
} & CompanyProfile<Type>

export type CompanyProfile<Type> = Type extends CompanyType.customer ? CustomerProfile : PerformerProfile;
export interface CustomerProfile {
  customerprofile: {
    address: string
    inn: string
    ogrn: string
    legal_address: string
    contacts: string
    payment: Payment,
    bill: string,
    lat: number
    lon: number
    application_type?: string
    overdraft: boolean,
    overdraft_sum: number,
    performer_company: any[]
  }
}

export interface PerformerProfile  {
  performerprofile: {
    address: string
    inn: string
    ogrn: string
    legal_address?: string
    contacts?: string
    service_percent?: number
    application_type?: string
    working_time?: string
    lat: number
    lon: number
  }
}

export interface Companies {
  companies: Company<CompanyType>[]
}

export class CompanyStore {
    companies: IObservableArray<Companies> = observable.array([])
    companiesPerformers = observable.array()
    loadingCompanies: boolean = false
    // companyForm: Company<CompanyType> = observable.object({
    //
    //
    //   name: '',
    //   is_active: true,
    //   company_type: CompanyType,
    //   city: {}
    //
    // })
    loadingError: boolean = false;
    fullCompanyData  = new Map([])
    updatingUser?: boolean
    updatingUserErrors: any
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

            // const oldData = get(this.fullCompanyData, `${id}`)
            remove(this.fullCompanyData, `${id}`)
            // set(this.fullCompanyData, `${id}`, result)

              // this.fullCompanyData.set(2, {get()})
          }
      }
      catch (e) {
        this.loadingError = true
        new Error('get users failed')
      }
      finally {

        this.loadingCompanies = true
      }
      return result
    })
    loadCompanyWithTypeAndId = flow(function* (this: CompanyStore, type: string, id: number){
      this.loadingCompanies = true

      try {
        let data = {
          company: {},
          users: [],
        };
        const company = yield agent.Companies.getCompanyData(id, type);
        const users = yield agent.Account.getCompany(id);

        data.company = {
          data:  company.data,
          company_type: type,
          label: 'Основная информация'
        };

        data.users =  {
          data: users.data.results,
          label: 'Сотрудники'
        } as any;

        // @ts-ignore
        set(this.fullCompanyData, {[data.company.data.id]: data});
      }
      catch (e) {
        this.loadingError = true
        new Error('Create Company failed')
      }
      finally {
        console.log(this.fullCompanyData);
        this.loadingCompanies = true
      }
      return get(this.fullCompanyData, `${id}`)
    })
    addCompany = flow(function* ( this:CompanyStore, data: any, type: CompanyType ) {
        this.loadingCompanies = true
        try {
            if (type === CompanyType.performer) {

                // @ts-ignore
              const  response = yield agent.Companies.createCompanyPerformers(data, 'performer')

                if (response.status > 199 && response.status < 299) {
                  this.loadCompanyWithTypeAndId('performer', response.data.id)
                  return response.data
                }
                return response.response
            }
            if (type === CompanyType.customer) {

                const  response  = yield agent.Companies.createCompanyCustomer(data, 'customer')

              if (response.status > 199 && response.status < 299) {
                this.loadCompanyWithTypeAndId('customer', response.data.id)
                return response.data
              }
              return response.response

            }
        } catch (e) {
            // @ts-ignore
          new Error('Create COmpany failed', e)
            this.loadingCompanies = false
            return 'error'
        } finally {
            this.loadingCompanies = false
        }
    })
    editCompany = flow(function* ( this:CompanyStore, data: any, type: CompanyType, id ) {
        this.loadingCompanies = true

        try {
            if (type === CompanyType.performer) {
                // @ts-ignore
              const  response = yield agent.Companies.editCompany(data, 'performer', id)
              if (response.status > 199 && response.status < 299) {
                this.loadCompanyWithTypeAndId('performer', response.data.id)
                return response.data
              }
              return response.response
            }
            if (type === CompanyType.customer) {

                const  response  = yield agent.Companies.editCompany(data, 'customer', id)

              if (response.status > 199 && response.status < 299) {
                this.loadCompanyWithTypeAndId('customer', response.data.id)
                return response.data
              }
              return response.response

            }
        } catch (e) {
            // @ts-ignore
          new Error('Create COmpany failed', e)
            this.loadingCompanies = false
            return 'error'
        } finally {
            this.loadingCompanies = false
        }
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
          editCompany: action,

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
        // this.companyForm = {
        //   ...this.companyForm,
        //   ...obj
        // }

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
