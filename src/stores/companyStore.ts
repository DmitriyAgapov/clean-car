import { action, autorun, computed, flow, get, has, IObservableArray, makeAutoObservable, observable, reaction, runInAction, set, values } from "mobx";
import { hydrateStore, makePersistable } from 'mobx-persist-store'
import agent, { PaginationProps } from 'utils/agent'
import appStore from 'stores/appStore'
import userStore, { UserTypeEnum } from 'stores/userStore'
import { AxiosError, AxiosResponse } from 'axios'
import { PermissionNames } from 'stores/permissionStore'
import bidsStore from "stores/bidsStrore";
import company from "routes/company/company";
import authStore from "stores/authStore";
import carStore from "stores/carStore";

export enum Payment {
    postoplata = 'Постоплата',
    predoplata = 'Предоплата',
}
export enum CompanyType {
  admin = "Администратор системы",
  customer = "Компания-Заказчик",
  performer = "Компания-Партнер"
}
export const CompanyTypeRus = (type:any) => {
  if(type === "Компания-Заказчик") return "customer"
  if(type === "Компания-Партнер") return "performer"
  return "admin"
}

export type City = {
    name?: string
    id?: number
}
export type Company<Type> = {
    id?: number
    name: string
    created?: string
    updated?: string
    is_active?: boolean
    profile_id?: string
    parent?: number
    company_type?: Type
    city: City & number
} & CompanyProfile<Type>

export type CompanyProfile<Type> = Type extends CompanyType.customer ? CustomerProfile : PerformerProfile
export interface CustomerProfile {
    customerprofile: {
        address: string
        inn?: string
        ogrn?: string
        legal_address?: string
        contacts?: string
        payment?: Payment
        bill?: string
        lat: number

        lon: number
        application_type?: string
        overdraft?: boolean
        overdraft_sum?: number
        performer_company?: any[]
    }
}
export interface PerformerProfile {
    performerprofile: {
        address: string
        inn?: string
        ogrn?: string
        legal_address?: string
        height?: number
        contacts?: string
        service_percent?: number
        application_type?: string
        working_time?: string
        lat: number
        lon: number
    }
}
export interface Companies {
    company_type: CompanyType;
    id: number
    name: string
    // companies: Company<CompanyType>[]
    parent?: null | {
        id: number
        name: string
        city: number
        is_active: boolean
    }
}

export class CompanyStore {
    constructor() {
        makeAutoObservable(this, {
            stateMyCompany: computed,
            allCompanies: computed,
            getFillialsData: computed,
        })
        makePersistable(this, {
            name: 'companyStore',
            properties: ['fullCompanyData', 'companies','companiesMap', 'filials', "customersCompany", 'companiesPerformers', 'loadingState', 'allFilials'],
            storage: window.localStorage,

        }, { fireImmediately: true })
        reaction(() => this.currentCustomersCompany, (currentCustomer: any) => {
            if(currentCustomer) {
                this.getCustomerCompanyData(currentCustomer)
            }
        })
        // autorun(() => {
        //     console.log(this.canLoad, 'canload')
        //     if(this.companies.length === 0) {
        //         console.log('Loadding Companies');
        //         this.getAllCompanies()
        //     }
        // })
        reaction(() => this.filials,
          (filials) => {
              console.log('userIsLoggedIn', authStore.isLoggedIn);
              console.log('get filials', (filials.length === 0 && this.loadingState.filials))
            if(filials.length === 0 && authStore.userIsLoggedIn && !this.loadingState.filials) {
                console.log('get filials')
                this.getAllFilials()
                this.loadingState.filials = true
            }
          }
        )
        // reaction(() => this.allFilials.results,
        //           (filials) => {
        //               console.log('get allFilials', filials)
        //             if(filials.length !== 0 && authStore.userIsLoggedIn) {
        //                 console.log('get allFilials', filials)
        //
        //                     filials.forEach((f:any, index: number) => {
        //                         carStore.getCars(f.id).then((res) => {
        //                             runInAction(() => {
        //                             const newData = {...this.allFilials.results[index], cars: res}
        //                             console.log(newData);
        //                             this.allFilials.results[index] = {...this.allFilials.results[index], cars: res}
        //                         })
        //
        //                     })
        //                 })
        //                 this.loadingState.filials = true
        //             }
        //           }
        //         )

        reaction(
            () => this.companies,
            (companies: any) => {
                if(authStore.userIsLoggedIn) {
                if(!this.loadingState.companies && companies.length === 0) {
                    this.getAllCompanies()
                    runInAction(() => this.loadingState.companies = true)
                }
                if (companies.length > 0) {
                    this.filials.length = 0
                    const filials = companies.filter((el: any) => el.parent !== null)
                    // @ts-ignore
                    this.setFilials(filials)
                }
            }
            }
        )
        // reaction(() => this.companies.length,
        //     (length: any) => {
        //         console.log('no company');
        //         if(length === 0) {
        //             this.getAllCompanies()
        //         }
        //     },
        // )
    }
    loadingState = {
        companies: false,
        filials: false,
    }
    canLoad = false
    companies: IObservableArray<Companies> = [] as any
    companiesMap: IObservableArray<Companies> = [] as any
    filials: IObservableArray<Companies> = [] as any
    allFilials:IObservableArray = [] as any
    companiesCustomer:IObservableArray<Companies> = [] as any
    companiesPerformers:IObservableArray<Companies> = [] as any
    customersCompany = new Map([])
    currentCustomersCompany = 0
    loadingCompanies: boolean = false
    errors: any
    targetCompanyId:null | number = null
    targetCompany = {}
    fullCompanyData = new Map([])
    get getCompaniesPerformers() {
        if(this.companiesPerformers.length === 0) {
            this.getPerformersCompany()
        }
        return this.companiesPerformers
    }
    get getCompaniesCustomer() {
        return this.companiesCustomer
    }

    loadFilialWithTypeAndId = flow(function* (this: CompanyStore, type: string, company_id: number, id: number) {
        return {
            company: {
                label: 'Основная информация',
                data: yield agent.Filials.getFilial(type, company_id, id).then((res) => res.data)
            },
            users: {
                label: 'Сотрудники',
                data: yield agent.Account.getCompanyUsers(id).then((res) => res.data.results),
            },
            cars: {
                label: 'Автомобили',
                data: yield carStore.getCars(id).then((res) => res),
            },
            limits: {
                label: 'Лимиты',
                data: []
            },
        }
    })
    async hydrateStoreFull() {
        await hydrateStore(this);
    }

    getCompanyById(id:number) {
        let company:any;
        if(this.companies.length !== 0) {
            company = this.allCompanies.companies.filter((company: any) => company.id == id)[0]
            if(!company) {
                company = this.AllFilials.filter((company: any) => company.id == id)[0]
            }
            action(() => this.targetCompany  = company)
        } else {
            this.getAllCompanies()
            action(( ) => {
                company = this.allCompanies.companies.filter((company: any) => company.id == id)[0]
                if(!company) {
                    company = this.AllFilials.filter((company: any) => company.id == id)[0]
                }

                this.targetCompany  = company
            })
        }
        return company
    }
    get companyData() {
        return this.targetCompany
    }
    get AllFilials() {
        return values(this.filials)
    }
    getCustomerCompanyById(company_id: number) {
        if(has(this.customersCompany, `${company_id.toString()}`)) return get(this.customersCompany, `${String(company_id)}`)
    }
    async getCustomerCompanyData(company_id: number) {
        this.currentCustomersCompany = company_id
        if(appStore.appType === "admin") {
            try {
                const { data } = await agent.Companies.getCompanyData('customer', company_id)
                runInAction(() => {
                    bidsStore.formResult.city = data.city.id
                    set(this.customersCompany, { [company_id]: data })
                })
            } catch (e) {
                action(() => this.errors = e)
            }
        } else {

            bidsStore.formResult.city = userStore.myProfileData.company.city.id
            set(this.customersCompany, { [company_id]: userStore.myProfileData.company })


        }
    }
    get currentCompany() {
        return this.customersCompany.get(String(this.currentCustomersCompany))
    }
    loadCompanyWithTypeAndId = flow(function* (this: CompanyStore, type?: string, company_id?: number) {

        let newid
        if (userStore.myProfileData.user) {
            if (appStore.appType && appStore.appType !== UserTypeEnum.admin) {
                console.log('is not admin')
                type = appStore.appType
                const { id, company_type } = yield userStore.currentUser.company
                newid = id ? id : userStore.currentUser.company?.id
            } else {
                newid = company_id
            }
        }
        this.loadingCompanies = true
        try {
            let data = {
                company: {},
                users: [],
                filials: [],
                cars: [],
            }
            if (newid && type) {
                const company = yield agent.Companies.getCompanyData(type, newid)
                const users = yield agent.Account.getCompanyUsers(newid)
                const filials = yield agent.Filials.getFilials(type, newid)
                const cars = yield agent.Cars.getCompanyCars(newid)

                data.company = {
                    data: company.data,
                    company_type: type,
                    label: 'Основная информация',
                }

                data.users = {
                    data: users.data.results,
                    label: 'Сотрудники',
                } as any
                data.cars = {
                    data: cars.data.results,
                    label: 'Автомобили',
                } as any
                data.filials = {
                    data: filials.data.results,
                    label: 'Филиалы',
                } as any

                // @ts-ignore
                set(this.fullCompanyData, { [data.company.data.id]: data })
            }
        } catch (e) {
            action(() => this.errors = e)
            new Error('Create Company failed')
        } finally {
            this.loadingCompanies = false
        }
        return get(this.fullCompanyData, `${newid}`)
    })
    editCompany = flow(function* (this: CompanyStore, data: any, type: CompanyType, id) {
        this.loadingCompanies = true

        try {
            if (type === CompanyType.performer) {
                // @ts-ignore
                const response = yield agent.Companies.editCompany(data, 'performer', id)
                if (response.status > 199 && response.status < 299) {
                    this.loadCompanyWithTypeAndId('performer', response.data.id)
                    return response.data
                }
                return response.response
            }
            if (type === CompanyType.customer) {
                const response = yield agent.Companies.editCompany(data, 'customer', id)

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
        }}
    )
    myCompany: { loading: boolean, error: null | AxiosError | AxiosResponse, company: any, users: any[], filials: any[] } = observable.object({
        loading: false,
        error: null,
        company: {},
        users: [],
        filials: []
    })
    getAllFilials = flow(function* (this: CompanyStore, params?: PaginationProps) {
        let result
        try {
            if (appStore.appType !== "admin") {
                const { data, status } = yield agent.Filials.getFilials(<CompanyType>CompanyTypeRus(userStore.myProfileData.company.company_type),
                    userStore.myProfileData.company.id,
                    params,
                )
                if (status === 200) {
                    this.filials = data.results
                }
            }
        } catch (error) {
            throw new Error('Fetch data companies failed')
        } finally {
            this.loadingCompanies = false
        }
    })
    loadAllFilials  = flow(function* (this: CompanyStore, params?: PaginationProps) {
        this.loadingCompanies = true
        let data :any[] | any = []
        let dataMeta
        if(appStore.appType === "admin") {
            const { data: dataCars, status } = yield agent.Companies.getOnlyBranchesCompanies(params)
            console.log(dataCars);
            if (status === 200) {
                this.allFilials = dataCars.results
                data = dataCars.results
                dataMeta = dataCars
            }
        } else {
            try {
                const type = userStore.myProfileData.company.company_type;
                const { data: dataCars, status } = yield agent.Filials.getFilials(<CompanyType>CompanyTypeRus(userStore.myProfileData.company.company_type), userStore.myProfileData.company.id, params)
                console.log(dataCars);        if (status === 200) {
                    this.allFilials = dataCars
                    data = dataCars.results
                    dataMeta = dataCars
                }
            } catch (e) {
                this.errors = e
            }

        }
    })
    get allFilialsFromStore() {
        return ({
            data: this.allFilials,
            errors: this.errors,
            loading: this.loadingCompanies

        })
    }

    loadCompanies = flow(function* (this: CompanyStore) {
        this.loadingCompanies = true
        this.companies.clear()
         if(appStore.appType ==="admin") {
            try {
                const { data, status } = yield agent.Companies.getAllCompanies()
                if (status === 200) {
                    //@ts-ignore
                    const { results } = data
                    set(this.companies, results)
                }
            } catch (error) {
                throw new Error('Fetch data companies failed')
            } finally {
                this.loadingCompanies = false
            }
            return this.companies as any
        } else  {
             try {
                 const data = yield agent.Companies.getMyCompanies()
                 if (data.status === 200) {
                     //@ts-ignore
                     const { results } = data.data

                     set(this.companies, results)
                 }
             } catch (error) {
                 throw new Error('Fetch data companies failed')
             } finally {
                 this.loadingCompanies = false
             }
             return this.companies as any
            }
        }
    )

    hydrateStore = flow(function* (this: CompanyStore) {
        yield hydrateStore(this)
    })

    addCompany = flow(function* (this: CompanyStore, data: any, type: CompanyType) {
        this.loadingCompanies = true
        try {
            if (type === CompanyType.performer) {
                // @ts-ignore
                const response = yield agent.Companies.createCompanyPerformers(data, 'performer')

                if (response.status > 199 && response.status < 299) {
                    this.loadCompanyWithTypeAndId('performer', response.data.id)
                    return response.data
                }
                return response.response
            }
            if (type === CompanyType.customer) {
                // @ts-ignore
                const response = yield agent.Companies.createCompanyCustomer(data, 'customer')
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
        this.hydrateStore()
    })

    getFilials = flow(function* (this: CompanyStore) {
        this.loadingCompanies = true
        let company_id = userStore.myProfileData.company?.id
        if (company_id) {
            try {
                this.loadingCompanies = true
                const { data, status } = yield agent.Filials.getFilials(appStore.appType, company_id)

                if (status === 200) {
                    this.filials = data.results
                }
            } catch (error) {
                throw new Error('Fetch data companies failed')
            } finally {

                this.loadingCompanies = false
            }
        }
        this.loadingCompanies = false
        return this.filials
    })
    get getFilialsAr() {
        return this.filials
    }
    get getFillialsData() {
        let filials: any[] = []
        if(this.companies.length === 0) {
            this.loadCompanies()
        }
        if(this.companies.length !== 0) {
            filials = this.companies.filter((company:any) => company.parent !== null)
        }
        return filials
    }
    createFilial = flow(function* (this: CompanyStore, data: any, type: string, company_id: number) {

        this.loadingCompanies = true
        try {
            // @ts-ignore
            const response = yield agent.Filials.createFilial(type, company_id, data)
            if (response.status > 199 && response.status < 299) {

                return response.data
            }
            return response.response
        } catch (e) {
            // @ts-ignore
            new Error('Create COmpany failed', e)
            this.loadingCompanies = false
            return 'error'
        } finally {
            this.loadingCompanies = false
        }
    })

    get allCompanies() {
        return {
            loading: this.loadingCompanies,
            error: this.errors,
            companies: this.companies
        }
    }

    get stateMyCompany() {
        return {
            loading: this.myCompany.loading,
            error: this.myCompany.error,
            company: this.myCompany.company,
            users: this.myCompany.users,
            filials: this.myCompany.filials,
        }
    }

    getCustomerCompany (params?: PaginationProps) {
        this.companiesCustomer.clear()
        return agent.Companies.getListCompanyCustomer(params)
        .then((response:any) => response)
        .then((response:any) => response.data)
        .then(action((data:any) => {
            this.companiesCustomer = data.results
        }))
        .catch((errors:any) => this.errors = errors)
    }

    async getPerformersCompany (params?: PaginationProps) {
        this.companiesPerformers.clear()
        return await agent.Companies.getListCompanyPerformer(params)
        .then((response:any) => response)
        .then((response:any) => response.data)
        .then((data:any) => runInAction(() =>{

            this.companiesPerformers = data.results
        }))
        .catch((errors:any) => this.errors = errors)
    }

    getAllCompanies (params?: PaginationProps) {
        if(authStore.isLoggedIn) {
        console.log('All companies');
        this.loadingCompanies = true
        // if(userStore.getUserCan(PermissionNames["Управление пользователями"], "read")) {
            if(userStore.isAdmin) {
                 agent.Companies.getAllCompanies(params)
                    .then((response:any) => response)
                    .then((response:any) => response.data)
                    .then((data:any) => runInAction(() => {
                        this.companies = data.results
                     }))
                    // .catch((errors:any) => this.errors = errors)

                }
           else {
                console.log('my companies');
                agent.Companies.getMyCompanies(params)
                    .then((response:any) => response.data)
                    .then((data:any) => runInAction(() => {
                        this.myCompany.company = data.results
                        this.companies = data.results
                    }))
                 return this.stateMyCompany.company
            }
        // }
            }
    }
    loadCompanyData(company_type: string, id: number) {
        this.loadingCompanies = true
        return agent.Companies.getCompanyData(company_type === CompanyType.customer ? UserTypeEnum.customer : UserTypeEnum.performer, id)
            .then((response:AxiosResponse) => response )
            .then((data:any) => {
                this.myCompany.company = data
                return data
            })
            .catch((errors:AxiosError) => this.errors = errors)
            .finally(() => this.loadingCompanies = false)
    }
    loadMyCompany(id: number) {
        this.myCompany.loading = true
        return agent.Profile.getMyCompany()
            .then(action((response:AxiosResponse) => response ))
            .then(action((data:any) => this.myCompany.company = data.results))
            .catch(action((error:AxiosError) => this.myCompany.error = error))
            .finally(action(() => this.myCompany.loading = false))
    }
    loadMyCompanyUsers() {
        agent.Account.getCompanyUsers(this.myCompany.company.id)
            .then(action((response:AxiosResponse) => response ))
            .then(action((data:any) => this.myCompany.users = data.results))
            .catch(action((error:AxiosError) => this.myCompany.error = error))
            .finally(action(() => this.myCompany.loading = false))
    }
    loadMyCompanyFilials(id: number) {
        agent.Account.getCompanyUsers(id)
            .then(action((response:AxiosResponse) => response ))
            .then(action((data:any) => this.myCompany.users = data.results))
            .catch(action((error:AxiosError) => this.myCompany.error = error))
            .finally(action(() => this.myCompany.loading = false))
    }
    setFilials(filials: IObservableArray<Companies>) {
        this.filials = filials
    }
    getCompanies() {
        return this.companies
    }
    get getCompaniesAll() {
        if(this.companies.length === 0) {
            this.getAllCompanies()
        }
        return this.companies as any[]
    }
    get getFilialsAll() {
        if(this.companies.length === 0) {
            this.getAllFilials()
        }
        runInAction(() =>     {
            console.log('load filials get');
            this.loadAllFilials()
        })
        return this.allFilials
    }

    getCompanyOrFilials(type:string) {
       const _isCompany =  type === 'Компания'
       if(_isCompany) {
           return this.companies
       } else {
           return  this.filials
       }
    }

    getCompanyFullData(id: number) {
        return get(this.fullCompanyData, `${id}`)
    }
}

const companyStore = new CompanyStore()

export default companyStore
