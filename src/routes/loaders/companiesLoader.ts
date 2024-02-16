import agent, { PaginationProps } from "utils/agent";
import FormCreateCarBrand from "components/Form/FormCreateCarBrand/FormCreateCarBrand";
import FormCreateCity from "components/Form/FormCreateCity/FormCreateCity";
import { defer } from "react-router-dom";
import userStore from "stores/userStore";
import appStore from "stores/appStore";
import company from "routes/company/company";

export const companiesLoader = async (props: any) => {

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

		const { data: dataCars, status } = await agent.Companies.getOnlyAllCompanies({
			page: paramsPage ?? 1,
			page_size: paramsPageSize ?? 10,
			ordering: paramsOrdering
		} as PaginationProps)

		if (status === 200) {
			data = dataCars.results
			dataMeta = dataCars
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
