import { action, makeAutoObservable, runInAction } from "mobx";
import agent, { PaginationProps } from "utils/agent";

export class BidsStore {
	bids = []
	loading = false
	error = ''
	textData = {
		title: 'Заявки',
		create: 'Создать',
		loadExcel: 'Загрузить Excel',
		tableHeaders: ['№', 'Статус', 'Дата/Время', 'Заказчик', 'Исполнитель', 'Пользователь', 'ТС', 'Город', 'Услуга' ],
		createPageBack: 'Назад к списку заявок',
		createPage: 'Создать заявку',
		fillTemplate: 'Заполнить шаблон'
	}
	formData = {
		step: [
			{
				title: 'Шаг 1. Основная информация',
				description: 'Укажите основную информацию о заявке'
			}
		]
	}
	constructor() {
		makeAutoObservable(this, {}, {autoBind: true})
	}
	async loadAllBids(params:PaginationProps) {
		try {
			action(() => this.loading = true)
			const {data, status}  = await agent.Bids.getAllBids(params)
			if(status === 200) {
				runInAction(() => {
					this.bids = data
				})
			}
		} catch (error: any) {
			this.error = error
		}
		finally {
			action(() => this.loading = false)
		}
	}
	get text() {
		return this.textData
	}
	get bidsAll() {
		return ({
			loading: this.loading,
			error: this.error,
			data: this.bids
		})
	}
}
const bidsStore = new BidsStore()
export default bidsStore
