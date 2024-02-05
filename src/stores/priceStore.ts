import { action, flow, makeAutoObservable, observable, runInAction, values } from "mobx";
import { makePersistable } from "mobx-persist-store";
import agent, { PaginationProps } from "utils/agent";
import FormCreateCity from "components/Form/FormCreateCity/FormCreateCity";
import { defer } from "react-router-dom";
import paramsStore from "stores/paramStore";

export class PriceStore {
	constructor() {
		makeAutoObservable(this, {}, {autoBind: true})
		makePersistable(this, {name: 'priceStore', storage: window.sessionStorage, properties: ['prices']})
	}
	prices : { count: number, next: string | null, previous: string| null, results: any[] } = observable.object({ next: null, count: 0, previous: null, results: [] })
	async loadPrices(params?: PaginationProps) {
		return await agent.Price.getAllPrice(paramsStore.params)
	}
	textData = {
		path: 'price',
		title: 'Прайс-листы',
		create: 'Создать прайс-лист для заказчика',
		labelsForItem: ['Город', 'Часовой пояс', 'Статус'],
		referenceTitle: 'Город',
		createPage: 'Добавить город',
		editPage: 'Редактировать город',
		tableHeaders: [
			{ label: 'Компания', name: 'name' },
			{ label: 'Филиал', name: 'root_company' },
			{ label: 'Тип', name: 'company_type' },
		],
		createPageDesc: 'Добавьте новый город',
		editPageDesc: 'Вы можете изменить город или удалить его из системы',
		// createPageForm: FormCreateCity.bind(props),
		createPageBack: 'Назад к списку городов',
		createAction: agent.Catalog.createCity,
		editAction: agent.Catalog.editCity,
		// editPageForm: FormCreateCity.bind(props, { ...data, edit:true }),
	}
	get allPrices() {
		return ({
			data: this.prices,
			textData: this.textData
		})
	}
}
const priceStore = new PriceStore()
export default priceStore
