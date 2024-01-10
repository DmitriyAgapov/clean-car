import { redirect } from 'react-router-dom'
import appStore from 'stores/appStore'
import userStore from 'stores/userStore'
import companyStore from 'stores/companyStore'
import permissionStore, { PermissionName } from 'stores/permissionStore'
import usersStore from 'stores/usersStore'
import catalogStore from 'stores/catalogStore'
import agent from 'utils/agent'
import carStore from "stores/carStore";

export const authUser = async () => {
  if (!appStore.token) {
    return redirect('/')
  } else {
    if(!userStore.currentUser) await userStore.pullUser()
  }
  return null
}
const checkPermisssions = {
  edit: (path:string) =>  (path.includes('edit') && userStore.getUserCan(path, 'update')),
  create: (path:string) =>  (path.includes('create') && userStore.getUserCan(path, 'create')),
  read: (path:string) => userStore.getUserCan(path, 'read')
}
export const companyLoader = async ({ params: { id, company_type, action, company_id }, ...props }: any) => {
  const pathAr = props.request.url.split('/');
  const actionName:string = pathAr[pathAr.length - 1] || 'read'

  const company = await companyStore.loadCompanyWithTypeAndId(company_type, id)
  console.log(company);
  await companyStore.loadCompanies()
  await catalogStore.getCities()
  if(checkPermisssions.read('companies')) return { id: id, type: company_type, data: company }
  return;
}
export const filialsLoader = async() => {
  const company = await companyStore.loadCompanyWithTypeAndId()
  const companies = await companyStore.getAllCompanies()
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
export const userLoader = async ({ params: { company_type, id, companyid } }: any) => {

  const user = await usersStore.getUser(companyid, id, company_type)
  return {
    user: user,
  }
}

export const groupsIdLoader = async ({ params: { company_type, id } }: any) => {

  if (id) {
    let currentGroup
    if(company_type === 'admin') {
      currentGroup  = await permissionStore.getPermissionAdmin(id)

    } else {
        currentGroup = await permissionStore.getPermissionByGroupId(id);
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

export const groupsLoader =  async ({ params: { id } }: any) => {
   const response = await permissionStore.getPermissions();
  // console.log(response);

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
