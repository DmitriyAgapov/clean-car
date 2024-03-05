import { autorun, makeAutoObservable, reaction } from "mobx";
import { CompanyStore } from "stores/companyStore";
import { makePersistable } from "mobx-persist-store";

export type ParamsProps = {
	page: string | null | number
	page_size: string | null | number
	ordering: string | null
	searchString?: string | null
	name?: string | null
}

export class ParamStore {
	constructor() {
		makeAutoObservable(this, {}, { autoBind: true })
		makePersistable(this, { storage: localStorage, name: 'paramStore', properties: ['params']} )
		autorun(() => console.log(this.params))
	}

	params:ParamsProps = {
		page: 1,
		page_size: 10,
		ordering: '',
		searchString: '',
	}
	get qParams() {
		// console.log(this.url);
		// console.log('qParams', this.searchParams.get('page'));

		// console.log('qParams',sparams.get('page'))
		return ({
			page: this.params.page && this.params.page !== 0 ? this.params.page : 1,
			page_size:  10,
			ordering: this.params.ordering ?? null,
			q: this.params.searchString,
		})
	}
	// incrementPage() {
	// 	this.params.page++
	// }
	// decrementPage() {
	// 	this.params.page--
	// }

	setParams(params:ParamsProps) {
		// console.log('set', params);
		this.params = {
			page: params.page,
			page_size: params.page_size,
			ordering: params.ordering,
			searchString: params.searchString || params.name
		}
	}
	get currentParams() {
		return this.params
	}
}
const paramsStore =  new ParamStore()
export default paramsStore
