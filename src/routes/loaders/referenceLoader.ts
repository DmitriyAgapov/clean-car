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
	console.log(props, 'props');
	let textData: any = {
		title: '',
		description: null,
		create: 'Добавить',
	}
	async function fillData() {
		let data :any[] | any = []
		let dataMeta
		switch (refUrlsRoot) {
			// case 'car_brands':
			// 	if(props.params.id) {
			// 		try {
			// 			const { data: dataModel, status: statusDataModel } = await agent.Catalog.getCarModelWithBrand(props.params.id);
			// 			if(statusDataModel === 200) data = {
			// 				id: dataModel.id,
			// 				brand: dataModel.brand.name,
			// 				car_type: dataModel.car_type,
			// 				modelName: dataModel.name
			// 			}
			// 		} catch (e) {
			// 			console.log(e);
			// 		}
			// 	}
			// 	// else {
			// 	// 	try {
			// 	// 		const { data: dataResults, isLoading } = agent.Catalog.getCarModelsNew(searchParams.toString())
			// 	//
			// 	// 		!isLoading && dataResults.results.forEach((e: any) => data.push({ id: e.id, name: e.brand.name, model: e.name, car_type: e.car_type }))
			// 	// 		dataMeta = dataResults
			// 	//
			// 	// 	} catch (e) {
			// 	// 		console.log(e);
			// 	// 	}
			// 	// }
			//
			// 	break
			case 'cities':
				if(props.params.id) {
					console.log('city', props.params.id);
					const { data: dataCities, status: statusCities } = await agent.Catalog.getCity(props.params.id);
					if(statusCities === 200) data = dataCities
				}
				else {
					console.log('cities');
					const { data: dataCities, status: statusCities } = await agent.Catalog.getCities({ page: paramsPage ?? 1, page_size: paramsPageSize ?? 10, name: paramsSearchString, ordering: paramsOrdering } as PaginationProps)
					data = dataCities.results.map((item:any) => ({id: item.id, status: item.is_active, name: item.name, timezone: item.timezone ?? ''}))
					dataMeta = dataCities
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
