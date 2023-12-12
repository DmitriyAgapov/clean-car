import { redirect } from 'react-router-dom'
import appStore from 'stores/appStore'
import userStore from 'stores/userStore'
import companyStore from 'stores/companyStore'
import permissionStore from 'stores/permissionStore'
import usersStore from 'stores/usersStore'
import catalogStore from 'stores/catalogStore'

export const authUser = async () => {
  if (!appStore.token) {
    return redirect('/')
  } else {
    await userStore.pullUser()
  }
  return null
}

export const companyLoader = async ({ params: { id } }: any) => {
  console.log('loader', id)
  await companyStore.loadCompanies()
  await catalogStore.getCities()
  await companyStore.loadCompaniesPerformers()

  return null
}

export const usersLoader = async () => {
  await usersStore.getAllUser()
  return null
}
export const userLoader = async ({ params: { id, companyid } }: any) => {
  const user = await usersStore.getUser(companyid, id)
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
  const permissionSectionNames = [
    'Компании',
    'Управление филиалами и отделами заказчиками',
    'Управление филиалами и отделами исполнителей',
    'Управление пользователями',
    'Управление автомобилями',
    'Управление заявками',
    'Управление прайс-листом',
    'Управление лимитами',
    'Управление справочниками',
    'Финансовый блок',
  ]
  return {
    group: {
      id: Math.random(),
      name: '',
      permissions: permissionSectionNames.map((item: string) => ({
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
