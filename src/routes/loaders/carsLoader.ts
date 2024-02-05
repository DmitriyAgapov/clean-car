import agent, { PaginationProps } from "utils/agent";
import FormCreateCarBrand from "components/Form/FormCreateCarBrand/FormCreateCarBrand";
import FormCreateCity from "components/Form/FormCreateCity/FormCreateCity";
import { defer } from "react-router-dom";
import userStore from "stores/userStore";
import appStore from "stores/appStore";

export const carsLoader = async (props: any) => {

	const url = new URL(props.request.url)
	const searchParams = url.searchParams
	const paramsPage = url.searchParams.get('page')
	const paramsPageSize = url.searchParams.get('page_size')
	const paramsOrdering = url.searchParams.get('ordering')
	const paramsSearchString = url.searchParams.get('searchString')
	const refUrlsRoot = url.pathname.split('/')[url.pathname.split('/').indexOf('cars') + 1]
	let textData: any = {
		title: '',
		description: null,
		create: 'Добавить',
	}
	async function fillData() {
		let data :any[] | any = []
		let dataMeta

		if (appStore.appType === 'admin') {
			if (props.params.id) {
				const { data: dataCars, status } = await agent.Cars.getAdminCar(props.params.id)
				if (status === 200) {
					data = dataCars
					console.log(dataCars);
				}
			} else {
				const { data: dataCars, status } = await agent.Cars.getAdminCars({
					page: paramsPage ?? 1,
					page_size: paramsPageSize ?? 10,
					ordering: paramsOrdering
				} as PaginationProps)

				if (status === 200) {
					data = dataCars.results.map((item: any) => ({
						id: item.id,
						is_active: item.is_active,
						brand: item.brand.name,
						model: item.model.name,
						car_type: item.model.car_type,
						number: item.number,
						company: item.company.name,
						city: item.company.city.name,
					}))
					dataMeta = dataCars
				}
			}}
		else
			{
				// const { data: dataCars, status } = await agent.Cars.getCompanyCars(, {
				// 	page: paramsPage ?? 1,
				// 	page_size: paramsPageSize ?? 10,
				// 	ordering: paramsOrdering
				// } as PaginationProps)
			}

		textData = {
			path: 'car_brands',
			labelsForItem: ['Марка', 'Класс', 'Модель'],
			title: 'Марки автомобилей',
			create: 'Добавить',
			referenceTitle: 'Марка автомобиля',
			createPage: 'Добавить марку автомобиля',
			editPage: 'Редактировать1 марку автомобиля',
			tableHeaders: [{label: "Статус", name: 'is_active'}, {label: 'Марка', name: 'brand'},{label: 'Модель', name: 'name'}, {label: 'Тип', name: 'car_class'}, {label: 'Гос.номер', name: 'number'}, {label: 'Принадлежит', name: 'company'}, {label: 'Город', name: 'city'}],
			createPageDesc: 'Укажите основную информацию о марке автомобиля, для добавления в справочник.',
			createPageForm: FormCreateCarBrand.bind(props),
			createPageBack: 'Назад к списку марок автомобилей',
			createAction:  agent.Catalog.createCarBrandWithExistBrand,
			editAction:  agent.Catalog.editCity,
			editPageForm: FormCreateCarBrand.bind(props, { ...data, edit:true }),
		}



		return ({
			...dataMeta,
			results: data,
		})
	}

	return defer({
		data: await fillData(),
		pageRequest: {page: paramsPage ?? 1, page_size: paramsPageSize ?? 10, searchString: paramsSearchString},
		textData: textData,
		page: refUrlsRoot,
		// dataModels: dataModels
	})
}
