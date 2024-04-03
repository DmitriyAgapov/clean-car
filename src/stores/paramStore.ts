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
	}
	location: string = ''
	@computed getLocation() {
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
