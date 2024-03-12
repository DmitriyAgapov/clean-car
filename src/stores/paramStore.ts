import { autorun, makeAutoObservable, reaction } from "mobx";
import { CompanyStore } from "stores/companyStore";
import { makePersistable } from "mobx-persist-store";
import { PaginationProps } from "utils/agent";
import { PaginationParams } from "@mantine/hooks/lib/use-pagination/use-pagination";

export type ParamsProps = {
	page: string | null | number
	page_size: string | null | number
	ordering: string | null
	searchString?: string | null
	name?: string | null
	q?: string
}

export class ParamStore {
	constructor() {
		makeAutoObservable(this, {}, { autoBind: true })
		makePersistable(this, { storage: localStorage, name: 'paramStore', properties: ['params']} )
		// autorun(() => console.log(this.params))
	}

	params:PaginationProps = {
		page: 1,
		page_size: 10,
		ordering: null,
		searchString: null,
		q:null
	}
	get qParams() {
		return this.params
	}
	// incrementPage() {
	// 	this.params.page++
	// }
	// decrementPage() {
	// 	this.params.page--
	// }

	setParams(params:any) {
		this.params = {
			page: params.page,
			page_size: params.page_size,
			ordering: params.ordering,
			name: params.name,
			searchString: params.searchString,
			q: params.q
		}
	}
	get currentParams() {
		return this.params
	}
}
const paramsStore =  new ParamStore()
export default paramsStore
