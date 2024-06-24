import { action, autorun, makeAutoObservable, observable, reaction } from 'mobx'
import { Status } from "utils/schema";
import appStore from "stores/appStore";
import actions from "routes/price/actions";
import { LocalRootStore } from "stores/localStore";
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
	status?: Status | null | undefined
}
export class TableWithSortStore {

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
		// autorun(() => {
		// 	let _cH = appStore.fontSizeBody
		// 	if(_cH) {
		// 		console.log(_cH);
		// 	}
		// })

		reaction(() => this.tableBodyHeight,
			(height) => {
				console.log('hhh', height);

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
		console.log(this.itemsCount);
		return this.itemsCount
	}
	@action setItemsCount(value:  number) {
		this.isReady = value > 0;
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
