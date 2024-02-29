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
import logo from "components/common/layout/Logo/Logo";


export const authUser = async () => {
    if (!appStore.token) {
        return redirect('/')
    } else {
        if (!userStore.currentUser) await userStore.pullUser()
    }
    return null
}

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
                    const { data: dataModel, status: statusDataModel } = await agent.Catalog.getCarModelWithBrand(props.params.id);
                    if(statusDataModel === 200) data = {
                        id: dataModel.id,
                        brand: dataModel.brand.name,
                        car_type: dataModel.car_type,
                        modelName: dataModel.name
                    }

                } else {
                    const { data: dataResults, status } = await agent.Catalog.getCarModels({
                        page: paramsPage ?? 1,
                        page_size: paramsPageSize ?? 10,
                        q: paramsSearchString,
                        ordering: paramsOrdering
                    } as PaginationProps)
                    dataResults.results.forEach((e: any) => data.push({ id: e.id, name: e.brand.name, model: e.name, car_type: e.car_type }))
                    dataMeta = dataResults
                }
                textData = {
                    path: 'car_brands',
                    labelsForItem: ['Марка', 'Класс', 'Модель'],
                    title: 'Автомобили',
                    create: 'Добавить',
                    referenceTitle: 'Марка автомобиля',
                    createPage: 'Добавить марку автомобиля',
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

    console.log(await fillData());
    return defer({
        data: await fillData(),
        pageRequest: {page: paramsPage ?? 1, page_size: paramsPageSize ?? 10, searchString: paramsSearchString},
        page: refUrlsRoot,
        textData: textData,
        // dataModels: dataModels
    })
}

const mapEd = (ar:[], compareField:string) => {
    let newMap = new Map([])
    if(ar.length > 0) {
        ar.forEach((item: any) => {
            newMap.set(item[compareField].name, ar.filter((i:any) => i[compareField].name == item[compareField].name))
        })}
    let result:any[] = []

    newMap.forEach((value:any, key) => {
        return result.push(Object.assign({service_option: key}, ...value.map((i:any, index:number) => ({[`service_subtype_${index}`]: i.amount}))))
    })
    return result
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
    const paginationData = paginationParams(props.request.url as string)

    async function fillData() {
        let data: any[] | any = []
        if (!userStore.isAdmin) {
            const { data: dataEvac } = await agent.Price.getCurentCompanyPriceEvac(props.params.id);
            const { data: dataTire } = await agent.Price.getCurentCompanyPriceTire(props.params.id);
            const { data: dataWash } = await agent.Price.getCurentCompanyPriceWash(props.params.id);
            if (props.params.id) {
                data = {
                    tabs: await Promise.all([{
                        label: 'Мойка', data: dataWash,
                        dataTable: dataWash
                    }, { label: 'Эвакуация', data: dataEvac, dataTable: mapEd(dataEvac.evacuation_positions, 'service_option') }, { label: 'Шиномонтаж', data: dataTire, dataTable: dataTire }])
                }
            } else {
                data = await Promise.all([dataWash, dataTire, dataEvac])
                console.log(data);
            }


        } else {
            const { data: dataResults, status } = await agent.Price.getAllPrice(paginationData as PaginationProps)
            console.log(dataResults);
            if(status === 200) {
                data = {...dataResults, results: dataResults.results.map((i: any) => {
                        let obj:any;
                        for(const key in i) {
                            if(i[key] === null) {

                                obj = {
                                    ...obj,
                                    [key]: '-'
                                }
                            } else {
                                obj = {
                                    ...obj,
                                    [key]: i[key]
                                }
                            }
                        }
                        return obj;
                    })}
            }
        }
        return data
    }

    return defer({
        data: await fillData(),
        pageRequest: { page: paginationData.page ?? 1, page_size: paginationData.page_size ?? 10, searchString: paginationData.searchString},
        // page: refUrlsRoot,
        // textData: textData,
        // dataModels: dataModels
    })
}
export const companyLoader = async ({ params: { id, company_type, action, company_id }, ...props }: any) => {
    // const pathAr = props.request.url.split('/');
    // const actionName:string = pathAr[pathAr.length - 1] || 'read'


    await companyStore.loadCompanies()
    // await catalogStore.getAllCities()
    return defer({ id: id, type: company_type, data: await companyStore.loadCompanyWithTypeAndId(company_type, id) })
}

export const filialsLoader = async (props: any) => {
    const url = new URL(props.request.url)
    const searchParams = url.searchParams
    const paramsPage = url.searchParams.get('page')
    const paramsPageSize = url.searchParams.get('page_size')
    const paramsOrdering = url.searchParams.get('ordering')
    const paramsSearchString = url.searchParams.get('searchString')
    const refUrlsRoot = url.pathname.split('/')[url.pathname.split('/').indexOf('cars') + 1]
    console.log(<CompanyType>CompanyTypeRus(userStore.myProfileData.company.company_type));
    async function fillData() {
        let data :any[] | any = []
        let dataMeta
        if(userStore.isAdmin) {
            const { data: dataCars, status } = await agent.Companies.getOnlyBranchesCompanies({
                page: paramsPage ?? 1,
                page_size: paramsPageSize ?? 10,
                ordering: paramsOrdering,
                name: paramsSearchString
            } as PaginationProps)

            if (status === 200) {
                data = dataCars.results
                dataMeta = dataCars
            }
        } else {
            const { data: dataCars, status } = await agent.Filials.getFilials( <CompanyType>CompanyTypeRus(userStore.myProfileData.company.company_type), userStore.myProfileData.company.id,{
                page: paramsPage ?? 1,
                page_size: paramsPageSize ?? 10,
                ordering: paramsOrdering,
                name: paramsSearchString
            } as PaginationProps)
            console.log(dataCars);
            if (status === 200) {
                data = dataCars.results
                dataMeta = dataCars
            }
        }

        console.log({
            ...dataMeta,
            results: data,
        });

        return ({
            ...dataMeta,
            results: data,
        })
    }

    return defer({
        data: await fillData(),
        pageRequest: {page: paramsPage ?? 1, page_size: paramsPageSize ?? 10, searchString: paramsSearchString},
        page: refUrlsRoot,
        // dataModels: dataModels
    })
}
export const carsLoader = async ({ params: { id, company_type, action, company_id }, ...props }: any) => {
    await catalogStore.getCarBrands()
    // await catalogStore.getAllCities()
    return null
}
export const filialLoader = async ({ params: { id, company_type, action, company_id }, ...props }: any) => {
    const filial = await companyStore.loadFilialWithTypeAndId(company_type, company_id, id)
    const parent = userStore.isAdmin ? await agent.Companies.getCompanyData(company_type, company_id) : {data: userStore.myProfileData.company}
    console.log(filial, parent);
    return { id: id, company_id: company_id, type: company_type, parent: parent, data: { ...filial } }
}
export const usersLoader =  async (props: any) => {
    const paginationData = paginationParams(props.request.url as string)
    if(userStore.isAdmin) {
        const { data, status } = await agent.Users.getAllUsers({ ...paginationData, q: paginationData.searchString } as PaginationProps)
        return {
            data: data,
            status: status
        }
    } else {
        const { data, status } = await agent.Users.getCompanyUsers(userStore.myProfileData.company.id, { ...paginationData, q: paginationData.searchString } as PaginationProps)
        return defer({
            data: data,
            status: status
        })
    }
}
export const userLoader = async ({ params: { company_type, id, company_id } }: any) => {
    if(userStore.isAdmin) {
        let user = await usersStore.getUser(company_id, id, company_type);
        console.log('userLoaderIsAdmin', user)

        return defer({
            user: user,
        })
    } else {
        let user = await usersStore.getUser(company_id, id, <CompanyType>CompanyTypeRus(userStore.myProfileData.company.company_type));
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
    await userStore.loadMyProfile()
    return null
}

export const groupsLoader = async ({ params: { id } }: any) => {
    const response = await permissionStore.getPermissionsFlow()
    console.log(response);
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
