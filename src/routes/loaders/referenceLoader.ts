import agent, { PaginationProps } from "utils/agent";
import FormCreateUpdateCarBrand from "components/Form/FormCreateCarBrand/FormCreateUpdateCarBrand";
import FormCreateCity from "components/Form/FormCreateCity/FormCreateCity";
import { defer } from "react-router-dom";

export const referencesLoader = async (props: any) => {
	const url = new URL(props.request.url)
	const searchParams = url.searchParams
	const paramsPage = url.searchParams.get('page')
	const paramsPageSize = url.searchParams.get('page_size')
	const paramsOrdering = url.searchParams.get('ordering')
	const paramsSearchString = url.searchParams.get('searchString')
	const refUrlsRoot = url.pathname.split('/')[url.pathname.split('/').indexOf('references') + 1]

	let textData: any = {
		title: '',
		description: null,
		create: 'Добавить',
	}
	async function fillData() {
		let data :any[] | any = []
		let dataMeta
		switch (refUrlsRoot) {
			case 'car_brands':
				if(props.params.id) {
					try {
						const { data: dataModel, status: statusDataModel } = await agent.Catalog.getCarModelWithBrand(props.params.id);
						if(statusDataModel === 200) data = {
							id: dataModel.id,
							brand: dataModel.brand.name,
							car_type: dataModel.car_type,
							modelName: dataModel.name
						}
					} catch (e) {
						console.log(e);
					}
				} else {
					try {
						const { data: dataResults, status } = await agent.Catalog.getCarModels({ page: paramsPage ?? 1, page_size: paramsPageSize ?? 10} as PaginationProps)
						dataResults.results.forEach((e: any) => data.push({ id: e.id, name: e.brand.name, model: e.name, car_type: e.car_type }))
						dataMeta = dataResults

					} catch (e) {
						console.log(e);
					}
				}
				textData = {
					path: 'car_brands',
					labelsForItem: ['Марка', 'Класс', 'Модель'],
					title: 'Автомобили',
					create: 'Добавить',
					referenceTitle: 'Марка автомобиля',
					createPage: 'Добавить автомобиль',
					editPage: 'Редактировать марку автомобиля',
					tableHeaders: [{label: 'Марка', name: 'brand'},{label: 'Модель', name: 'name'}, {label: 'Тип', name: 'car_type'}],
					createPageDesc: 'Укажите основную информацию о модели автомобиля, для добавления в справочник',
					editPageDesc: 'Укажите основную информацию о модели автомобиля, для добавления в справочник',
					createPageForm: FormCreateUpdateCarBrand.bind(props),
					createPageBack: 'Назад к списку марок автомобилей',
					createAction:  agent.Catalog.createCarBrandWithExistBrand,
					editAction:  agent.Catalog.editCity,
					editPageForm: FormCreateUpdateCarBrand.bind(props, { ...data, edit:true }),
				}
				break
			case 'cities':
				if(props.params.id) {
					const { data: dataCities, status: statusCities } = await agent.Catalog.getCity(props.params.id);
					if(statusCities === 200) data = dataCities
				}
				else {
					const { data: dataCities, status: statusCities } = await agent.Catalog.getCities({ page: paramsPage ?? 1, page_size: paramsPageSize ?? 10, name: paramsSearchString, ordering: paramsOrdering } as PaginationProps)
					data = dataCities.results.map((item:any) => ({id: item.id, status: item.is_active, name: item.name, timezone: item.timezone ?? ''}))
					dataMeta = dataCities
				}

				textData = {
					path: 'cities',
					title: 'Города',
					create: 'Добавить',
					labelsForItem: ['Город', 'Часовой пояс', 'Статус'],
					referenceTitle: 'Город',
					createPage: 'Добавить город',
					editPage: 'Редактировать город',
					tableHeaders: [
						{ label: 'Статус', name: 'is_active' },
						{ label: 'Город', name: 'name' },
						{ label: 'Часовой пояс', name: 'timezone' },
					],
					createPageDesc: 'Добавьте новый город',
					editPageDesc: 'Вы можете изменить город или удалить его из системы',
					createPageForm: FormCreateCity.bind(props),
					createPageBack: 'Назад к списку городов',
					createAction: agent.Catalog.createCity,
					editAction: agent.Catalog.editCity,
					editPageForm: FormCreateCity.bind(props, { ...data, edit:true }),
				}
				break;
			case 'services':
				if(props.params.subtype_id) {
					const { data: dataServiceSubtype, status: statusServiceSubtype } = await agent.Catalog.getServiceSubtype(props.params.subtype_id);
					console.log('subtype_id', dataServiceSubtype);
					if(statusServiceSubtype === 200) data = dataServiceSubtype
				}
				if(props.params.id) {

					const { data: dataService, status: statusService } = await agent.Catalog.getService(props.params.id);
					const servParams:any = Object.assign({},{name: paramsSearchString,  page: paramsPage, page_size: paramsPageSize ?? '9'} )
					const subtypes = await agent.Catalog.getServiceSubtypesListByServiceId(props.params.id, servParams);
					console.log('params.id', subtypes, servParams);

					if(statusService === 200) {
						if(props.params.subtype_id) {
							data = {
								...data,
								parent: dataService
							}
						} else {
							data = {
								...dataService,
								subtypes: subtypes.data
							}
						}

					}
				} else   if(!props.params.id && !props.params.subtype_id) {
					const { data: dataServices, status: statusServices } = await agent.Catalog.getServices()
					if (statusServices === 200) {
						data = dataServices.results
					}
				}
				textData = {
					path: 'services',
					title: 'Услуги',
					create: 'Добавить',
					labelsForItem: ['Город', 'Часовой пояс', 'Статус'],
					referenceTitle: 'Услуга',
					description: "Вы можете видеть активные и неактивные типы и подтипы услуг.  Редактировать их и менять статус у каждой услуги/типе услуги или подтипе. Это позволит вам настроить компанию и ее услуги до запуска.",
					createPage: 'Добавить город',
					editPage: 'Редактировать город',
					tableHeaders: ['Статус', 'Город', 'Часовой пояс'],
					createPageDesc: 'Вы можете видеть активные и неактивные типы и подтипы услуг.  Редактировать их и менять статус у каждой услуги/типе услуги или подтипе. Это позволит вам настроить компанию и ее услуги до запуска.',
					editPageDesc: 'Вы можете изменить город или удалить его из системы',
					createPageForm: FormCreateCity.bind(props),
					createPageBack: 'Назад к списку услуг',
					createAction:  agent.Catalog.createCity,
					editAction:  agent.Catalog.editCity,
					editPageForm: FormCreateCity.bind(data),
				}
				break
			default:
				return
		}   console.log();
		return ({
			...dataMeta,
			results: data,
		})
	}
	return defer({
		data: await fillData(),
		pageRequest: {page: paramsPage ?? 1, page_size: paramsPageSize ?? 10, searchString: paramsSearchString},
		page: refUrlsRoot,
		textData: textData,
		// dataModels: dataModels
	})
}
