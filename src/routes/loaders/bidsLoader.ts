import bidsStore from "stores/bidsStrore";
import { defer } from "react-router-dom";

export const bidsLoader = async ({ request, params }:any) => {
	const url = new URL(request.url)
	const searchParams = url.searchParams
	const paramsPage = url.searchParams.get('page')
	const paramsPageSize = url.searchParams.get('page_size')
	const paramsOrdering = url.searchParams.get('ordering')
	const paramsSearchString = url.searchParams.get('searchString')

	// @ts-ignore
	// const newSearchParams = new URLSearchParams([paramsPage, paramsPageSize, paramsOrdering])
	console.log(params);
	console.log(searchParams);
	const refUrlsRoot = url.pathname.split('/')[url.pathname.split('/').indexOf('references') + 1]
	await bidsStore.loadAllBids(params)
  return defer({
		...bidsStore.bidsAll,
		pageRequest: {page: paramsPage ?? 1, page_size: paramsPageSize ?? 10, searchString: paramsSearchString},
		page: refUrlsRoot,
		textData: bidsStore.text,
		// dataModels: dataModels
	})
}
