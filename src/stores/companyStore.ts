import { action,  autorun, makeObservable, observable } from 'mobx';
import agent from "utils/agent";

export enum Payment  {
	postoplata = "Постоплата",
	predoplata = "Предоплата"
}

export type Company = {
	name: string
	is_active: boolean
}
export type  CustomerProfile = {
	id: number;
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
	id: number;
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
	companies= observable.array([])
	loadingCompanies: boolean = false;
	updatingUser?: boolean;
	updatingUserErrors: any;

	constructor() {
		makeObservable(this, {
			companies: observable,
			loadingCompanies: observable,
			// updatingUser: observable,
			// updatingUserErrors: observable,

			// setUser: action,
			// updateUser: action,
			// forgetUser: action
		});
	}

	loadCompnies() {
		this.loadingCompanies = true;
		this.companies.clear()
		agent.Companies.getListCompanyCustomer()
			.then(r => {
				// @ts-ignore
			const {data} = r;
			// @ts-ignore
			console.log(data.results)
			// @ts-ignore
			data.results.forEach((item:any) => {
				// @ts-ignore
				this.companies.push(item)
			})
			})
			.catch(e => console.log(e))

		agent.Companies.getListCompanyPerformer()
			.then(r => {
				// @ts-ignore
			const {data} = r;
			data.results.forEach((item:any) => {
				// @ts-ignore
				this.companies.push(item)
			})

			// this.companies.replace([...this.companies, ...data.results])
			// this.companies.push([...])
			// data.results.forEach((i:any) => {
			// 	this.companies.push(i)
			// 	})
			})

			.catch(e => console.log(e))
			.finally(() => this.loadingCompanies = false)
		console.log(this.companies)
	}
	getCompanies() {
		return this.companies
	}


}
const companyStore = new CompanyStore()
export default companyStore;
