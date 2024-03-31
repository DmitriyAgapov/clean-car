import { defer, redirect, useLoaderData } from "react-router-dom";
import appStore from 'stores/appStore'
import userStore from 'stores/userStore'
import companyStore, { CompanyType, CompanyTypeRus } from "stores/companyStore";
import permissionStore, { PermissionName } from 'stores/permissionStore'
import usersStore from 'stores/usersStore'
import catalogStore from 'stores/catalogStore'
import agent, { PaginationProps } from 'utils/agent'
import FormCreateCity from "components/Form/FormCreateCity/FormCreateCity";
import FormCreateUpdateCarBrand from "components/Form/FormCreateCarBrand/FormCreateUpdateCarBrand";
import paramsStore, { InitParams } from "stores/paramStore";
import priceStore from "stores/priceStore";
import bidsStore from "stores/bidsStrore";
import paramStore from "stores/paramStore";



export const authUser = async ({ request, params }:any) => {
    // const url = new URL(request.url)
    // const searchParams = url.searchParams
    // const paramsPage = url.searchParams.get('page')
    // const paramsPageSize = url.searchParams.get('page_size')
    // const paramsOrdering = url.searchParams.get('ordering')
    // const paramsSearchString = url.searchParams.get('searchString')
    // paramsStore.setParams({ page: paramsPage ?? 1, page_size: paramsPageSize ?? 10, name: paramsSearchString, ordering: paramsOrdering })
    // console.log({ page: paramsPage ?? 1, page_size: paramsPageSize ?? 10, name: paramsSearchString, ordering: paramsOrdering });
    if (!appStore.token) {
        return redirect('/')
    } else {
        if (!userStore.currentUser) await userStore.pullUser()
    }
    return null
}



export const paginationParams = (urlData:string) => {

    const url = new URL(urlData);
    const searchParams = url.searchParams;
    const paramsPage = searchParams.get('page')
    const paramsPageSize = searchParams.get('page_size')
    const paramsOrdering = searchParams.get('ordering')
    const paramsSearchString = searchParams.get('searchString')

    return ({
        page: paramsPage ?? 1,
        page_size:paramsPageSize ?? 10,
        ordering:paramsOrdering,
        searchString:paramsSearchString
    })
}
export const priceLoader = async (props: any) => {
    // const paginationData = paginationParams(props.request.url as string)
    const is_history = props.request.url.includes('history')

    await priceStore.getCurrentPrice(props, is_history);

    // console.log('loader', !userStore.isAdmin);
    // async function fillData() {
    //     let data: any[] | any = []
    //     if (!userStore.isAdmin) {
    //         const { data: dataEvac } = await agent.Price.getCurentCompanyPriceEvac(props.params.id);
    //         const { data: dataTire } = await agent.Price.getCurentCompanyPriceTire(props.params.id);
    //         const { data: dataWash } = await agent.Price.getCurentCompanyPriceWash(props.params.id);
    //         if (props.params.id) {
    //             data = {
    //                 tabs: await Promise.all([{
    //                     label: 'Мойка', data: dataWash,
    //                     dataTable: dataWash
    //                 }, { label: 'Эвакуация', data: dataEvac, dataTable: mapEd(dataEvac.evacuation_positions, 'service_option') }, { label: 'Шиномонтаж', data: dataTire, dataTable: dataTire }])
    //             }
    //         } else {
    //             data = await Promise.all([dataWash, dataTire, dataEvac])
    //             console.log(data);
    //         }
    //
    //     } else {
    //         const { data: dataResults, status } = await agent.Price.getAllPrice(paginationData as PaginationProps)
    //         console.log(dataResults);
    //         if(status === 200) {
    //             data = {...dataResults, results: dataResults.results.map((i: any) => {
    //                     let obj:any;
    //                     for(const key in i) {
    //                         if(i[key] === null) {
    //                             obj = {
    //                                 ...obj,
    //                                 [key]: '-'
    //                             }
    //                         } else {
    //                             obj = {
    //                                 ...obj,
    //                                 [key]: i[key]
    //                             }
    //                         }
    //                     }
    //                     return obj;
    //                 })}
    //         }
    //     }
    //     return data
    // }
    return null
    // return defer({
    //     data: await fillData(),
    //     pageRequest: { page: paginationData.page ?? 1, page_size: paginationData.page_size ?? 10, searchString: paginationData.searchString},
    //     // page: refUrlsRoot,
    //     // textData: textData,
    //     // dataModels: dataModels
    // })
}
//
// export const companyLoader = async ({ params: { id, company_type, action, company_id }, ...props }: any) => {
//     // const pathAr = props.request.url.split('/');
//     // const actionName:string = pathAr[pathAr.length - 1] || 'read'
//
//
//     await companyStore.loadCompanies()
//     // await catalogStore.getAllCities()
//     return defer({ id: id, type: company_type, data: await companyStore.loadCompanyWithTypeAndId(company_type, id) })
// }

export const filialsLoader = async (props: any) => {
    const url = new URL(props.request.url)
    const searchParams = url.searchParams
    const paramsPage = url.searchParams.get('page')
    const paramsPageSize = url.searchParams.get('page_size')
    const paramsOrdering = url.searchParams.get('ordering')
    const paramsSearchString = url.searchParams.get('searchString')
    const refUrlsRoot = url.pathname.split('/')[url.pathname.split('/').indexOf('cars') + 1]
    companyStore.loadAllFilials({ page: paramsPage ?? 1, page_size: paramsPageSize ?? 10, name: paramsSearchString, ordering: paramsOrdering } as PaginationProps)
    // async function fillData() {
    //     let data :any[] | any = []
    //     let dataMeta
    //     if(userStore.isAdmin) {
    //         const { data: dataCars, status } = await agent.Companies.getOnlyBranchesCompanies({
    //             page: paramsPage ?? 1,
    //             page_size: paramsPageSize ?? 10,
    //             ordering: paramsOrdering,
    //             name: paramsSearchString
    //         } as PaginationProps)
    //
    //         if (status === 200) {
    //             data = dataCars.results
    //             dataMeta = dataCars
    //         }
    //     } else {
    //         const { data: dataCars, status } = await agent.Filials.getFilials(props.params.company_type, userStore.myProfileData.company.id,{
    //             page: paramsPage ?? 1,
    //             page_size: paramsPageSize ?? 10,
    //             ordering: paramsOrdering,
    //             name: paramsSearchString
    //         } as PaginationProps)
    //         console.log(dataCars);
    //         if (status === 200) {
    //             data = dataCars.results
    //             dataMeta = dataCars
    //         }
    //     }
    //
    //     console.log({
    //         ...dataMeta,
    //         results: data,
    //     });
    //
    //     return ({
    //         ...dataMeta,
    //         results: data,
    //     })
    // }
    //
    // return defer({
    //     data: await fillData(),
    //     pageRequest: {page: paramsPage ?? 1, page_size: paramsPageSize ?? 10, searchString: paramsSearchString},
    //     page: refUrlsRoot,
    //     // dataModels: dataModels
    // })
    return null
}
export const carsLoader = async ({ params: { id, company_type, action, company_id }, ...props }: any) => {
    await catalogStore.getCarBrands()
    // await catalogStore.getAllCities()
    return null
}
export const filialLoader = async ({ params: { id, company_type, action, company_id }, ...props }: any) => {
    const filial = await companyStore.loadFilialWithTypeAndId(company_type, company_id, id)
    const parent = userStore.isAdmin ? await agent.Companies.getCompanyData(company_type, company_id) : {data: userStore.myProfileData.company}

    return { id: id, company_id: company_id, type: company_type, parent: parent, data: { ...filial } }
}
export const usersLoader = async ({ request, params }:any) => {
    // const url = new URL(request.url)
    // const searchParams = url.searchParams
    // const paramsPage = url.searchParams.get('page')
    // const paramsPageSize = url.searchParams.get('page_size')
    // const paramsOrdering = url.searchParams.get('ordering')
    // const paramsSearchString = url.searchParams.get('searchString')
    // paramsStore.setParams({ page: paramsPage ?? 1, page_size: paramsPageSize ?? 10, q: paramsSearchString, ordering: paramsOrdering } as PaginationProps)
    // // console.log({ page: paramsPage ?? 1, page_size: paramsPageSize ?? 10, name: paramsSearchString, ordering: paramsOrdering });
    // const refUrlsRoot = url.pathname.split('/')[url.pathname.split('/').indexOf('bids') + 1]
    // await bidsStore.loadAllBids(paramsStore.qParams)
    // usersStore.getAllUser()
    return null
}
export const userLoader = async ({ params: { company_type, id, company_id } }: any) => {
    console.log(company_type);
    if(appStore.appType === "admin") {
        let user = await usersStore.getUser(company_id, id, company_type);
        console.log('userLoaderIsAdmin', user)

        return defer({
            user: user,
        })
    } else {
        let user = await usersStore.getUser(company_id, id, company_type);
        user = {
            ...user,
            company: userStore.myProfileData.company
        }
        return defer({
            user: user,
        })
    }

}

export const groupsIdLoader = async ({ params: { company_type, id } }: any) => {

    if (id) {
        let currentGroup
        if (company_type === 'admin') {
            currentGroup = await permissionStore.getPermissionByGroupId(id)
        } else {
            currentGroup = await permissionStore.getPermissionByGroupId(id)
        }
        if (currentGroup) return { group: currentGroup }

        return redirect('/account/groups')
    }
    return null
}
export const profileLoader = async () => {
    console.log('profileLoader');
    await userStore.loadMyProfile()
    return null
}

export const groupsLoader =  () => {
    permissionStore.getPermissionsFlow()
    return null
}

export const groupsCreatLoader = async ({ params: { id } }: any) => {
    const ar = []
    for (let permissionNameKey in PermissionName) {
        // @ts-ignore
        ar.push(permissionNameKey)
    }
    return {
        group: {
            id: Math.random(),
            name: '',
            permissions: ar.map((item: string) => ({
                create: false,
                delete: false,
                id: Math.random(),
                name: item,
                read: false,
                update: false,
            })),
        },
    }
}
