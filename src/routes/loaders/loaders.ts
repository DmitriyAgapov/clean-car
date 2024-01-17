import { redirect } from 'react-router-dom'
import appStore from 'stores/appStore'
import userStore from 'stores/userStore'
import companyStore from 'stores/companyStore'
import permissionStore, { PermissionName } from 'stores/permissionStore'
import usersStore from 'stores/usersStore'
import catalogStore from 'stores/catalogStore'
import agent from 'utils/agent'
import carStore from 'stores/carStore'
import { toJS } from 'mobx'
import data from 'utils/getData'
import * as Yup from 'yup'
import { useStore } from 'stores/store'

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

    const refUrlsRoot = props.request.url.split('/')[props.request.url.split('/').indexOf('references') + 1]
    let data: any[] = []
    let textData: any = {
        title: '',
        description: null,
        create: 'Добавить',
    }
    // let dataModels: any[] = []
    switch (refUrlsRoot) {
        case 'car_brands':
            await agent.Catalog.getCarBrands({ page: 1, page_size: 10 }).then((r) => r.data).then((rdata: any) => (data = rdata.results))
            textData = {
                    title: 'Марки автомобилей',
                    create: 'Добавить',
                    createPage: 'Добавить марку автомобиля',
                    createPageDesc: 'Укажите основную информацию о марке автомобиля, для добавления в справочник.',
                    createPageForm: {
                        initValues: {
                            brand: '',
                            model: '',
                            car_class: '',
                        },
                        validateSchema: Yup.object().shape({
                            brand: Yup.string().required('Обязательное поле'),
                            model: Yup.string().required('Обязательное поле'),
                            car_class: Yup.string().required('Обязательное поле'),
                        }),
                        submitAction: () => console.log('sumbit brands'),
                        inputs: [
                            {
                                label: 'Марка',
                                placeholder: 'Выберите марку',
                                fieldName: 'brand',
                                type: 'select',
                                optione: catalogStore.getCarBrands,
                            },
                            {
                                label: 'Модель',
                                placeholder: 'Выберите модель',
                                fieldName: 'model',
                                type: 'text',
                            },
                            {
                                label: 'Тип автомобиля',
                                placeholder: 'Выберите тип',
                                fieldName: 'car_class',
                                type: 'text',
                                optione: [
                                    {
                                        label: 'B',
                                        value: '2',
                                    },
                                    {
                                        label: 'C',
                                        value: '3',
                                    },
                                ],
                            },
                        ],
                    },
                    createPageBack: 'Назад к списку марок автомобилей',
                }
            // data.length !== 0 && data.forEach((el:any) => agent.Catalog.getCarBrandModels(el.id).then(r => r.data).then((rdata:any) => dataModels = rdata.results))
            break
        case 'cities':
            await agent.Catalog.getCities()
                .then((r) => r.data)
                .then((rdata: any) => data.push(rdata))
            break
        case 'services':
            await agent.Catalog.getCities()
                .then((r) => r.data)
                .then((rdata: any) => data.push(rdata))

            break
        default:
            return
    }

    return {
        data: data,
        page: refUrlsRoot,
        textData: textData,
        // dataModels: dataModels
    }
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
    console.log(userStore)
    console.log(appStore.appType)
    console.log(toJS(userStore))
    const response = await permissionStore.getPermissionsFlow()
    console.log(response)
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
