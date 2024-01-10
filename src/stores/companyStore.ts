import { autorun, flow, get, IObservableArray, makeAutoObservable, observable, reaction, remove, set } from 'mobx'
import { hydrateStore, makePersistable } from 'mobx-persist-store'
import agent, { PaginationProps } from 'utils/agent'
import appStore from 'stores/appStore'
import userStore, { UserTypeEnum } from 'stores/userStore'

export enum Payment {
    postoplata = 'Постоплата',
    predoplata = 'Предоплата',
}
export enum CompanyType {
  customer = "Компания-Заказчик",
  performer = "Компания-Исполнитель"
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
        performer_company: any[]
    }
}

export interface PerformerProfile {
    performerprofile: {
        address: string
        inn?: string
        ogrn?: string
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
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
        makePersistable(this, {
            name: 'companyStore',
            properties: ['fullCompanyData', 'filials'],
            storage: window.localStorage,
        })
        reaction(
            () => this.companies,
            (companies: any) => {
                if (companies.length > 0) {
                    this.setFilials(observable.array(this.companies.filter((el: any) => el.parent !== null)))
                }
            },
        )
    }

    companies: IObservableArray<Companies> = [] as any
    filials: IObservableArray<Companies> = [] as any
    companiesPerformers = observable.array()
    loadingCompanies: boolean = false
    loadingError: boolean = false
    fullCompanyData = new Map([])
    updatingUser?: boolean
    updatingUserErrors: any
    // })
    getCompanyUsers = flow(function* (this: CompanyStore, id: number) {
        this.loadingCompanies = true
        let result
        try {
            const { data, status } = yield agent.Account.getCompanyUsers(id)
            if (status === 200) {
                result = data.results

                // const oldData = get(this.fullCompanyData, `${id}`)
                remove(this.fullCompanyData, `${id}`)
                // set(this.fullCompanyData, `${id}`, result)

                // this.fullCompanyData.set(2, {get()})
            }
        } catch (e) {
            this.loadingError = true
            new Error('get users failed')
        } finally {
            this.loadingCompanies = true
        }
        return result
    })
    // loadCompaniesPerformers = flow(function* (this: CompanyStore) {
    //     try {
    //         const { data } = yield agent.Companies.getListCompanyPerformer()
    //         this.companiesPerformers = data.results as any
    //     } catch (e) {
    //         throw new Error('Failed load companies performers')
    //     }
    getMyCompany = flow(function* (this: CompanyStore) {
        let company = {
            company: {},
            users: [],
            filials: [],
        }
        this.loadingCompanies = true
        try {
            const { data, status } = yield agent.Profile.getMyCompany()
            if (status === 200) {
                company = data.results[0]
                console.log(data)
            }
        } catch (e) {
            this.loadingError = true
            new Error('get users failed')
        } finally {
            this.loadingCompanies = true
        }
        return company
    })

    loadFilialWithTypeAndId = flow(function* (this: CompanyStore, type: string, company_id: number, id: number) {
        // @ts-ignore
        return {
            // @ts-ignore
            company: {
                label: 'Основная информация',
                // @ts-ignore
                data: yield agent.Filials.getFilial(type, company_id, id).then((res) => res.data)
            },

            users: {
                label: 'Сотрудники',
                // @ts-ignore
                data: yield agent.Account.getCompanyUsers(id).then((res) => res.data.results),
            },
            cars: {
                label: 'Автомобили',
                data: []
            },
            limits: {
                label: 'Лимиты',
                data: []
            },
        }
    })
    loadCompanyWithTypeAndId = flow(function* (this: CompanyStore, type?: string, company_id?: number) {
        // if(id && type) {
        console.log('netu')
        let newid
        if (userStore.currentUser) {
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
            }
            if (newid && type) {
                console.log('loadCompanyWithTypeAndId', newid, type)
                const company = yield agent.Companies.getCompanyData(type, newid)
                const users = yield agent.Account.getCompanyUsers(newid)
                const filials = yield agent.Filials.getFilials(type, newid)
                console.log(company)
                data.company = {
                    data: company.data,
                    company_type: type,
                    label: 'Основная информация',
                }

                data.users = {
                    data: users.data.results,
                    label: 'Сотрудники',
                } as any

                data.filials = {
                    data: users.data.results,
                    label: 'Филиалы',
                } as any

                // @ts-ignore
                set(this.fullCompanyData, { [data.company.data.id]: data })
            }
        } catch (e) {
            this.loadingError = true
            new Error('Create Company failed')
        } finally {
            this.loadingCompanies = false
        }
        // } else {
        // console.log('est');
        // }

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
        }
    })
    getAllCompanies = flow(function* (this: CompanyStore, params?: PaginationProps) {
        let result
        try {
            const { data, status } = userStore.currentUser.is_staff
                ? yield agent.Companies.getAllCompanies(params)
                : yield agent.Companies.getMyCompanies(params)
            if (status === 200) {
                this.companies = data.results
                console.log(data)
            }
        } catch (error) {
            throw new Error('Fetch data companies failed')
        } finally {
            this.loadingCompanies = false
        }
        return this.companies
    })
    getAllFilials = flow(function* (this: CompanyStore, params?: PaginationProps) {
        let result
        try {
            if (
                !userStore.currentUser.is_staff &&
                userStore.currentUser.company?.id &&
                userStore.currentUser.company.company_type
            ) {
                const { data, status } = yield agent.Filials.getFilials(
                    userStore.currentUser.company.company_type,
                    userStore.currentUser.company.id,
                    params,
                )
                console.log(data)
                if (status === 200) {
                    this.filials = data.results
                }
            }
        } catch (error) {
            throw new Error('Fetch data companies failed')
        } finally {
            this.loadingCompanies = false
        }
        return this.filials
    })
    loadCompanies = flow(function* (this: CompanyStore) {
        this.loadingCompanies = true
        this.companies.clear()
        let result
        try {
            const data = yield agent.Companies.getAllCompanies()
            if (data.status === 200) {
                //@ts-ignore
                const { results } = data.data
                // console.log(results);
                set(this.companies, results)
            }
        } catch (error) {
            throw new Error('Fetch data companies failed')
        } finally {
            this.loadingCompanies = false
        }
        return this.companies as any
    })
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
        let company_id = userStore.currentUser?.company?.id
        if (company_id) {
            try {
                this.loadingCompanies = true
                const { data, status } = yield agent.Filials.getFilials(appStore.appType, company_id)
                // console.log(data);
                if (status === 200) {
                    this.filials = data.results
                }
            } catch (error) {
                throw new Error('Fetch data companies failed')
            } finally {
                // console.log('finally');
                this.loadingCompanies = false
            }
        }
        this.loadingCompanies = false
        return this.filials
    })
    createFilial = flow(function* (this: CompanyStore, data: any, type: string, company_id: number) {
        this.loadingCompanies = true
        try {
            const response = yield agent.Filials.createFilial(type, company_id, data)
            if (response.status > 199 && response.status < 299) {
                // console.log(response.data);
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

    //@
    setFilials(filials: IObservableArray<Companies>) {
        this.filials = filials
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
autorun(() => {
    if(companyStore.companies.length == 0) {
        console.log('companies is empty');
    }
})
export default companyStore
