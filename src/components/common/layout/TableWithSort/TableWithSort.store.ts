import { action, autorun, makeAutoObservable, observable, reaction } from 'mobx'
import { Status } from "utils/schema";
import appStore from "stores/appStore";
import actions from "routes/price/actions";
import { LocalRootStore } from "stores/localStore";
import dayjs from 'dayjs';
import { BidsStatus } from "stores/bidsStrore";
export type TableSearchParams = { page: number; page_size?: number, q?: string,
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
	is_active?: string | null | undefined
	status?: BidsStatus | null | undefined
}
export class TableWithSortStore {

	clean?: boolean | null = null
	tableBodyHeight?: number = undefined
	rowHeight?: number = undefined
	rowHeightT: any = null
	isReady: boolean = false
	itemsCount?: number = undefined
	searchParams: TableSearchParams = observable.object({
		page: 1,
		page_size: undefined
	})
	resizeListener: boolean = false
	filterState: boolean = false
	constructor() {
		makeAutoObservable(this, {
		})
	}

	get rowHeightSize() {
		return this.rowHeightT
	}

	setHeight(height:number) {
		this.tableBodyHeight = height
	}
	setRowHeight(val:number) {
		this.rowHeight = val
	}
	get getItemsCount() {
		return this.itemsCount
	}
	@action setItemsCount(value:  number | undefined) {
		this.isReady = value === undefined ? false : value > 0;
		this.setSearchParams({
			page_size: value
		})
		this.itemsCount = value
	}
	get getIsReady() {
		return this.isReady
	}
	setFilterState(state:boolean) {
		this.filterState = state
	}
	get getFilterState() {
		return this.filterState
	}
	setSearchParams(params:any, clean?:boolean) {
		if(clean) {
			this.searchParams = params
		}
		this.searchParams = {
			...this.searchParams,
			...params,
		...(params.start_date ? {start_date: dayjs(String(params.start_date)).hour(0).minute(0).second(0).format()} : {}),
		...(params.end_date ? {end_date: dayjs(String(params.end_date)).hour(0).minute(0).second(0).format()} : {})
		}
	}
	deleteParams(paramsName:any) {
			let _searchParams:any = this.searchParams;
			delete _searchParams[paramsName];
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
	get getClean() {
		return this.clean
	}

	*init() {
		return this.searchParams
	}
}
