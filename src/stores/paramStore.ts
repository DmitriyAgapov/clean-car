import { autorun, toJS, makeAutoObservable, reaction, computed } from "mobx";
import { makePersistable } from "mobx-persist-store";
import { PaginationProps } from "utils/agent";
import { PaginationParams } from "@mantine/hooks/lib/use-pagination/use-pagination";

export type ParamsProps = {
	page: string | null | number
	page_size: string | null | number
	ordering: string | null
	searchString?: string | null
	name?: string
	q?: string
}
export class InitParams {
	page:number
	page_size: number
	constructor() {
		this.page = 1
		this.page_size =  10
	}
}

export class ParamStore {
	constructor() {
		makeAutoObservable(this, {}, { autoBind: true })
		makePersistable(this, { storage: localStorage, name: 'paramStore', properties: ['params']} )
		// autorun(() => console.log(this.params))
		autorun(() => {
			console.log(location.pathname);
			console.log(this.getLocation());
			if(this.getLocation()) {
				console.log('paramsLocation', location.pathname)
			}
		})
		autorun(() => {
			toJS(location) // runs every time browser location changes
		})
	}
	location: string = ''
	@computed getLocation() {
		console.log('loc', location.pathname)
		return location
	}
	params:any = {
		page: 1,
		page_size: 10
	}
	get qParams() {
		return this.params
	}

	setQParams(params: {q:string}) {
		if(params.q.length > 2) {
			this.params = {
				...this.params,
				q: params.q
			}
		}
	}
	removeQParams() {
		Reflect.deleteProperty(this.params, 'q')
	}
	clearParams(initParams: PaginationProps) {
		this.params = initParams
	}
	setParams(params:any) {
		console.log(params);
		this.params = {
			...this.params,
			...params
		}
	}
	get currentParams() {
		return this.params
	}
}
const paramsStore =  new ParamStore()
export default paramsStore
