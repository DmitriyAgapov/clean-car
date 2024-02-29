import useSWR from 'swr'
import { requests } from 'utils/agent'
import { useStore } from 'stores/store'
import { defer, useParams, useSearchParams } from "react-router-dom";
import userStore from 'stores/userStore'
import usersStore from 'stores/usersStore'
import { CompanyType, CompanyTypeRus } from 'stores/companyStore'
//
export const paginationParams = () => {
	const [searchParams] = useSearchParams()
	const paramsPage = searchParams.get('page')
	const paramsPageSize = searchParams.get('page_size')
	const paramsOrdering = searchParams.get('ordering')
	const paramsSearchString = searchParams.get('searchString')

	return ({
		page: paramsPage ?? 1,
		page_size:paramsPageSize ?? 10,
		ordering: paramsOrdering,
		q:paramsSearchString
	})
}

export const useUsersAll = ():any => {
	const store = useStore()
	const searchParams = paginationParams()

	const { data, error, isLoading } = useSWR([store.userStore.isAdmin ? '/accounts/all_users/' : `/accounts/${store.userStore.myProfileData.company.id}/users/list/`, {}, searchParams], ([url, body, pagination]) => requests.getNew(url,body, pagination))
	if(isLoading) {
		store.appStore.setAppState(true);
	}
	if(!isLoading) {
		store.appStore.setAppState(false);
	}
	return {
		data: data,
		isLoading,
		isError: error
	}
}


export const useUserById = async () => {
	const store = useStore()
	const params = useParams()
	if(params.company_type && params.id &&  params.company_id) {
		if (store.userStore.isAdmin) {
			let user = await usersStore.getUser(params.company_type, params.id, <CompanyType>params.company_id,);
			console.log('userLoaderIsAdmin', user)

			return defer({
				user: user,
			})
		} else {
			let user = await usersStore.getUser(params.company_id, params.id, <CompanyType>CompanyTypeRus(userStore.myProfileData.company.company_type));
			user = {
				...user,
				company: userStore.myProfileData.company
			}
			return defer({
				user: user,
			})
		}
	}
	// console.log(params);
	// if (params.company_type === "admin") {
	// 	console.log(params.company_type === "admin");
	// 	const { data, error, isLoading } = useSWR(['/accounts_admin/user/{id}/retrieve'], ([url]) => requests.getNew(url))
	// 	return {
	// 		data: data,
	// 		isLoading,
	// 		isError: error
	// 	}
	// } else {
	// 	console.log(params.company_type, params.company_id, params.id);
	// 	const { data, error, isLoading } = useSWR(`/accounts/3/users/3/retrieve`, (url) => requests.getNew(url))
	// 	console.log(data);
	// 	return {
	// 		data: data,
	// 		isLoading,
	// 		isError: error
	// 	}
	// }
}


