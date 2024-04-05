import { makeAutoObservable, observable } from "mobx";
import { Status } from "utils/schema";
export type TableSearchParams = { page: number; page_size: number, q?: string, service_type?: string,
	company__city?:string
	start_date?:string
	car_type?:string
	brand?:string
	end_date?:string
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
	clearParams() {
		this.searchParams = {
			page: 1,
			page_size: 10
		}
	}
	get getSearchParams() {
		return this.searchParams
	}
	*init() {
		return this.searchParams
	}
}
