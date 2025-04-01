import { action, autorun, computed, flow, get, has, IObservableArray, makeAutoObservable, observable, reaction, runInAction, set, toJS, values } from "mobx";
import { hydrateStore, makePersistable } from 'mobx-persist-store'
import agent, { client, PaginationProps } from "utils/agent";
import appStore from 'stores/appStore'
import userStore, { UserTypeEnum } from 'stores/userStore'
import { AxiosError, AxiosResponse } from 'axios'
import bidsStore from "stores/bidsStrore";
import authStore from "stores/authStore";
import carStore from "stores/carStore";
import { defer } from "react-router-dom";
import company from "routes/company/company";
import companyStore from "stores/companyStore";

export enum Payment {
    postoplata = 'Постоплата',
    predoplata = 'Предоплата',
}
export enum CompanyType {
  admin = "Администратор системы",
  customer = "Клиент",
  performer = "Партнер"
}
export const CompanyTypeRus = (type:any) => {
  if(type === "Клиент") return "customer"
  if(type === "Партнер") return "performer"
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
type SearchParamsType = {
    page?: number  | null
    page_size?: number  | null
    ordering?: string | null
    q?: string | null
}

class SearchParams {
    page?: number | null | undefined = 1
    page_size?: number  | null = 10
    ordering?: string | null = null
    q?: string | null = null

    params:SearchParamsType = {
        page_size: this.page_size,
        page: this.page,
        ordering: this.ordering,
        q: this.q,
    }

    constructor() {
        this.params = {
            page: this.page,
            page_size: this.page_size,
            ordering: this.ordering,
            q: this.q
        }
    }

    setParams(params:SearchParamsType) {
        this.params = params
    }
    getParams() {
        return this.params
    }
}

export class CompanyStoreNew {
    isLoading: boolean = false
    companies = observable.map([])
    constructor() {
        makeAutoObservable(this, {
        })
        makePersistable(this, {
            name: 'companyStoreNew',
            properties: ['companies'],
            storage: window.localStorage,
        }, { fireImmediately: true })
    }

    async loadAllCompaniesList(params?: SearchParamsType) {
        const _sPrms = new SearchParams()
        params && _sPrms.setParams(params)
        this.isLoading = true
        const companies = await client.companiesOnlyCompaniesList(_sPrms)
        runInAction(() => {
            companies.results.forEach((company) => {
                this.companies.set(company.id, company)
            })
            this.isLoading = false
            return companies
        })
    }

    async loadCompanyFiliales(company_type:string, company_id:number, params:any ) {
        // console.log(params);
        // params.is_active = false
        if(company_type === "customer") {
            const _res = agent.Filials.getFilials(company_type, company_id, params).then((res) => res.data);
            // console.log(_res);
            const res = client.customerBranchesList({company_id: company_id, ...params}).then((res) => res)
            // console.log(res);
             return  _res
        }
        if(company_type === "performer") {
            // return   client.performerBranchesList({company_id: company_id, ...params}).then((res) => res)
            return   agent.Filials.getFilials(company_type, company_id, params).then((res) => res.data);
        }
    }
    async loadCompanyCars(company_type:string, company_id:number, params:any ) {
         return client.carsList({company_id: company_id, ...params}).then((res) => res)
    }
    async loadCompanyUsers(company_type:string, company_id:number, params:any ) {
         return client.accountsUsersList({company_id: company_id, ...params}).then((res) => res)
    }
    async loadFilialsList(args: any) {
        if(appStore.appType === "admin") {
            return client.companiesOnlyBranchesList(args)
        } else {
            return this.loadCompanyFiliales(userStore.myProfileData.company.company_type === "Клиент" ? "customer" : "performer", userStore.myProfileData.company.id, args).then((res) => {
                runInAction(() => {
                    if(res && res.results) {
                        companyStore.filials = res.results.map((f:any) => ({
                            ...f,
                            company_type: userStore.myProfileData.company.company_type
                        })) as any
                    }
                })

                return res
            })
        }
    }
    get getLoadingState() {
        return this.isLoading
    }
    get getOnlyCompaniesList() {
        return ({
            data: values(this.companies),
            isLoading: this.isLoading
        })
    }
}


const companyStoreNew = new CompanyStoreNew()

export default companyStoreNew
