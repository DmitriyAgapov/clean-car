import { redirect } from 'react-router-dom'
import appStore from 'stores/appStore'
import userStore from 'stores/userStore'
import companyStore from 'stores/companyStore'
import permissionStore, { PermissionName } from "stores/permissionStore";
import usersStore from 'stores/usersStore'
import catalogStore from 'stores/catalogStore'
import { AxiosResponse } from 'axios'
import agent from "utils/agent";
import logo from "components/common/layout/Logo/Logo";

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
export const companyLoader = async ({ params: { id, companytype, action }, ...props }: any) => {
  const pathAr = props.request.url.split('/');
  const actionName:string = pathAr[pathAr.length - 1] || 'read'

  const fullCompanyData = []
  if (id && companytype) {
    const company = await companyStore.loadCompanyWithTypeAndId(companytype, id)
    fullCompanyData.push({
      label: 'Основная информация',
      data: company
    })
      const { data }: any = await agent.Account.getCompany(id)

      fullCompanyData.push({
        label: 'Пользователи',
        data: data.results
      })

  }
  await companyStore.loadCompanies()
  await catalogStore.getCities()
  await companyStore.loadCompaniesPerformers()

  if(checkPermisssions.read('companies')) return { id: id, type: companytype, data: fullCompanyData }
  return;
}

export const usersLoader = async () => {
  await usersStore.getAllUser()
  return null
}
export const userLoader = async ({ params: { id, companyid } }: any) => {
  const user = await usersStore.getUser(companyid, id)
  console.log(user);
  await permissionStore.loadPermissionAdmin()
  return {
    user: user,
  }
}

export const groupsIdLoader = async ({ params: { id } }: any) => {
  if (id) {
    const currentGroup = await permissionStore.getPermissionAdmin(id)
    // @ts-ignore
    if (currentGroup.status === 200) {
      // @ts-ignore
      if (currentGroup.data) return { group: currentGroup.data }
    }
    return redirect('/account/groups')
  }
  return null
}
export const profileLoader = async () => {
  await userStore.loadMyProfile()
  return null
}

export const groupsLoader = async ({ params: { id } }: any) => {
  await permissionStore.loadPermissionAdmin()
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
