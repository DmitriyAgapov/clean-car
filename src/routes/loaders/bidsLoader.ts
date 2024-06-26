import bidsStore from "stores/bidsStrore";
import paramsStore from "stores/paramStore";
import agent from "utils/agent";
import { defer } from "react-router-dom";

export const bidsLoader = async ({ request, params }:any) => {
	const url = new URL(request.url)
	const searchParams = url.searchParams
	// const paramsPage = url.searchParams.get('page')
	// const paramsPageSize = url.searchParams.get('page_size')
	// const paramsOrdering = url.searchParams.get('ordering')
	// const paramsSearchString = url.searchParams.get('searchString')
	// // console.log({ page: paramsPage ?? 1, page_size: paramsPageSize ?? 10, name: paramsSearchString, ordering: paramsOrdering });
	// const refUrlsRoot = url.pathname.split('/')[url.pathname.split('/').indexOf('bids') + 1]

	// paramsStore.clearParams({
	// 	page: 1,
	// 	page_size: 10
	// })
	// bidsStore.loadAllBids(params)
	// await companyStore.loadCompanies()

	// return defer({isLoading: isLoading, data: data, error: error})
	// return defer({
	//   data: {
	// 	  ...data,
	// 	  // @ts-ignore
	// 		results: data.results.map((r:any) => ({
	// 			idnum: r.id,
	// 			id: r.id,
	// 			status: r.status,
	// 			created: dateTransformShort(r.created).date,
	// 			customer: r.company.name,
	// 			performer: r.performer.name,
	// 			user: r.author.first_name + ' ' + r.author.last_name[0] + '.',
	// 			number: r.car?.number,
	// 			city: r.company.city.name,
	// 			service_type: r.service_type.name,
	// 			query: {
	// 				company_id: userStore.isAdmin ? r.company.id : userStore.myProfileData.company.id,
	// 			}
	// 		}))
	//   },
	// 	pageRequest: {page: paramsPage ?? 1, page_size: paramsPageSize ?? 10, searchString: paramsSearchString},
	// 	page: refUrlsRoot,
	// 	textData: bidsStore.text,
	// 	// dataModels: dataModels
	// })
}


export const bidLoader = async ({ request, params }:any) => {
	// const url = new URL(request.url)
	// const searchParams = url.searchParams
	// const paramsPage = url.searchParams.get('page')
	// const paramsPageSize = url.searchParams.get('page_size')
	// const paramsOrdering = url.searchParams.get('ordering')
	// const paramsSearchString = url.searchParams.get('searchString')

	// const refUrlsRoot = url.pathname.split('/')[url.pathname.split('/').indexOf('bids') + 1]
	await bidsStore.loadBidByCompanyAndBidId(params.company_id, params.id)
	// await companyStore.loadCompanies()

	return null
}
