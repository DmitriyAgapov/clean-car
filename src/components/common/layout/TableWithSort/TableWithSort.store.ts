import { makeAutoObservable, observable } from "mobx";
import { Status } from "utils/schema";
export type TableSearchParams = { page: number; page_size: number, q?: string,
	service_type?: string,
	company_type?: string,
	employee__is_active?: string,
	company__company_type?: string,
	company__city?:string
	start_date?:string
	car_type?:string
	ordering?:string
	brand?:string
	end_date?:string
	is_active?: string
	status?: Status | null | undefined
}
export class TableWithSortStore {
	searchParams: TableSearchParams = observable.object({
		page: 1,
		page_size: 10
	})
	constructor() {
		makeAutoObservable(this, {
		})
	}
	setSearchParams(params:any) {
		this.searchParams = {
			...this.searchParams,
			...params
		}
	}
	deleteParams(paramsName:any) {
			let _searchParams:any = this.searchParams;
			delete _searchParams[paramsName];
	}
	clearParams() {
		this.searchParams = {
			page: 1,
			page_size: 10,
			ordering: undefined,
			q: undefined
		}
	}
	get getSearchParams() {
		return this.searchParams
	}
	*init() {
		return this.searchParams
	}
}
