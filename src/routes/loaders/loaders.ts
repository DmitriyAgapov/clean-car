import { defer, redirect } from 'react-router-dom'
import appStore from 'stores/appStore'
import userStore from 'stores/userStore'
import companyStore from 'stores/companyStore'
import permissionStore, { PermissionName } from 'stores/permissionStore'
import usersStore from 'stores/usersStore'
import catalogStore from 'stores/catalogStore'
import agent, { PaginationProps } from 'utils/agent'
import carStore from 'stores/carStore'
import { action, runInAction, toJS } from "mobx";
import data from 'utils/getData'
import * as Yup from 'yup'
import { useStore } from 'stores/store'
import React from "react";
import FormCreateCarBrand from "components/Form/FormCreateCarBrand/FormCreateCarBrand";
import FormCreateCity from "components/Form/FormCreateCity/FormCreateCity";

export const authUser = async () => {
    if (!appStore.token) {
        return redirect('/')
    } else {
        if (!userStore.currentUser) await userStore.pullUser()
    }
    return null
}
// const checkPermisssions = {
//   edit: (path:string) =>  (path.includes('edit') && userStore.getUserCan(path, 'update')),
//   create: (path:string) =>  (path.includes('create') && userStore.getUserCan(path, 'create')),
//   read: (path:string) => userStore.getUserCan(path, 'read')
// }
export const referencesLoader = async (props: any) => {
    console.log(props);
    const url = new URL(props.request.url)
    const searchParams = url.searchParams
    const paramsPage = url.searchParams.get('page')
    const paramsPageSize = url.searchParams.get('page_size')
    const paramsOrdering = url.searchParams.get('ordering')
    const paramsSearchString = url.searchParams.get('searchString')
    console.log('sp', paramsPage)

    const refUrlsRoot = url.pathname.split('/')[url.pathname.split('/').indexOf('references') + 1]
    console.log('refUrlsRoot', refUrlsRoot)
    console.log(refUrlsRoot);
    let textData: any = {
        title: '',
        description: null,
        create: 'Добавить',
    }
    // let dataModels: any[] = []
    async function fillData() {
        let data :any[] | any = []
        let dataMeta
        switch (refUrlsRoot) {
            case 'car_brands':
                const {data:dataResults, status} =  await agent.Catalog.getCarBrandsWithModels({ page: paramsPage ?? 1, page_size: paramsPageSize ?? 10, name: paramsSearchString, ordering: paramsOrdering } as PaginationProps)
                dataResults.results.forEach((e: any) => e.car_models.forEach((model:any) => data.push({                        id: model.id,                        name: e.name,                        model: model.name,                        car_type: model.car_type                    })))
                dataMeta = dataResults
                textData = { path: 'car_brands', title: 'Марки автомобилей', create: 'Добавить', referenceTitle: 'Марка автомобиля', createPage: 'Добавить марку автомобиля', tableHeaders: ['Бренд', 'Модель', 'Тип'], createPageDesc: 'Укажите основную информацию о марке автомобиля, для добавления в справочник.', createPageForm: FormCreateCarBrand, createPageBack: 'Назад к списку марок автомобилей', }
                break
            case 'cities':
                if(props.params.id) {const { data: dataCities, status: statusCities } = await agent.Catalog.getCity(props.params.id); if(statusCities === 200) data = Object.assign(dataCities,{timezone: 'Нет пояса'})}
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
                    tableHeaders: ['Статус', 'Город', 'Часовой пояс'],
                    createPageDesc: 'Добавьте новый город',
                    editPageDesc: 'Вы можете изменить город или удалить его из системы',
                    createPageForm: FormCreateCity.bind(props),
                    createPageBack: 'Назад к списку городов',
                    createAction:  agent.Catalog.createCity,
                    editAction:  agent.Catalog.editCity,
                    editPageForm: FormCreateCity.bind(data),
                }
                break;
            case 'services':
                if(props.params.subtype_id) {
                    const { data: dataServiceSubtype, status: statusServiceSubtype } = await agent.Catalog.getServiceSubtype(props.params.subtype_id);
                    if(statusServiceSubtype === 200) data = dataServiceSubtype
                }
                if(props.params.id) {
                    const { data: dataService, status: statusService } = await agent.Catalog.getService(props.params.id);
                    const servParams:any = Object.assign({},{name: paramsSearchString,  page: paramsPage, page_size: paramsPageSize ?? '9'} )
                    const subtypes = await agent.Catalog.getServiceSubtypesListByServiceId(props.params.id, servParams)
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
        }
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
export const companyLoader = async ({ params: { id, company_type, action, company_id }, ...props }: any) => {
    // const pathAr = props.request.url.split('/');
    // const actionName:string = pathAr[pathAr.length - 1] || 'read'

    const company = await companyStore.loadCompanyWithTypeAndId(company_type, id)

    await companyStore.loadCompanies()
    await catalogStore.getCities()
    return { id: id, type: company_type, data: company }
}
export const filialsLoader = async () => {
    const company = await companyStore.loadCompanyWithTypeAndId()
    // await companyStore.getAllCompanies()
    await companyStore.loadCompanies()
    await companyStore.getFilials()
    await catalogStore.getCities()
    return null
}
export const carsLoader = async ({ params: { id, company_type, action, company_id }, ...props }: any) => {
    await catalogStore.getCarBrands()
    await catalogStore.getCities()
    return null
}
export const filialLoader = async ({ params: { id, company_type, action, company_id }, ...props }: any) => {
    const filial = await companyStore.loadFilialWithTypeAndId(company_type, company_id, id)
    const parent = await agent.Companies.getCompanyData(company_type, company_id)
    return { id: id, company_id: company_id, type: company_type, parent: parent, data: { ...filial } }
}
export const usersLoader = async () => {
    await usersStore.getAllUser()
    return null
}
export const userLoader = async ({ params: { company_type, id, company_id } }: any) => {
    const user = await usersStore.getUser(company_id, id, company_type)
    return {
        user: user,
    }
}

export const groupsIdLoader = async ({ params: { company_type, id } }: any) => {
    if (id) {
        let currentGroup
        if (company_type === 'admin') {
            currentGroup = await permissionStore.getPermissionAdmin(id)
        } else {
            currentGroup = await permissionStore.getPermissionByGroupId(id)
        }
        // console.log(currentGroup);
        if (currentGroup) return { group: currentGroup }

        return redirect('/account/groups')
    }
    return null
}
export const profileLoader = async () => {
    await userStore.loadMyProfile()
    return null
}

export const groupsLoader = async ({ params: { id } }: any) => {

    const response = await permissionStore.getPermissionsFlow()

    await permissionStore.getAllPermissions()
    await permissionStore.allPermissionsState
    return { id: id, data: response }
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
