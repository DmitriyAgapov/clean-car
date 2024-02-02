import { makeAutoObservable } from "mobx";
import { CompanyStore } from "stores/companyStore";
import { makePersistable } from "mobx-persist-store";

export type ParamsProps = {
	page: number
	page_size: number
	ordering: string
	searchString: string
}

export class ParamStore {
	constructor() {
		makeAutoObservable(this, {}, { autoBind: true })
		makePersistable(this, { storage: sessionStorage, name: 'paramStore', properties: ['params']} )
	}
	params = {
		page: 1,
		page_size: 10,
		ordering: '',
		searchString: '',
	}
	incrementPage() {
		this.params.page++
	}
	decrementPage() {
		this.params.page--
	}
	setParams(params:ParamsProps) {
		this.params = {
			page: Number(params.page),
			page_size: Number(params.page_size),
			ordering: params.ordering,
			searchString: params.searchString
		}
	}
	get currentParams() {
		return this.params
	}
}
const paramsStore =  new ParamStore()
export default paramsStore
