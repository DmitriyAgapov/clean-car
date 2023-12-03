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
	companies= observable.array()
	loadingCompanies: boolean = false;
	updatingUser?: boolean;
	updatingUserErrors: any;

	constructor() {
		makeObservable(this, {
			companies: observable,
			loadingCompanies: observable,
			addCompany: action,
			loadCompnies: action
			// updatingUser: observable,
			// updatingUserErrors: observable,

			// setUser: action,
			// updateUser: action,
			// forgetUser: action
		});
	}

	async loadCompnies() {
		this.loadingCompanies = true;
		this.companies.clear()
		const dataCustomers = await agent.Companies.getListCompanyCustomer();
		const dataPerformes = await agent.Companies.getListCompanyPerformer()
		const data = await Promise.all([dataPerformes, dataCustomers]);
		data.forEach(item => {
			// @ts-ignore
			if(item.status == 200 && item.data){
				// @ts-ignore
				this.companies.push(...item.data.results)
			}
		})
		// console.log(this.companies)
		this.loadingCompanies = false
	}
	addCompany() {
		// this.loadingCompanies = true;

		// @ts-ignore
		this.companies.push({
			"id": 12333,
			"company": {
				"name": "123Golden Gate",
				"is_active": true,
				"city": 1619
			},
			"address": "fВладимирская область, город Радужный, квартал 1, дом 17",
			"connected_prices": "-",
			"inn": null,
			"ogrn": null,
			"legal_address": "",
			"contacts": "",
			"payment": "Постоплата",
			"bill": "0.00",
			"overdraft": false,
			"overdraft_sum": 1000,
			"company_type": "Компания-Заказчик"
		})
		// this.loadingCompanies = true;
	}
	getCompanies() {
		return this.companies
	}


}
const companyStore = new CompanyStore()
export default companyStore;
