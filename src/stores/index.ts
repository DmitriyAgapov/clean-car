import authStore, { AuthStore } from './authStore'
import userStore, { UserStore } from './userStore'
import appStore, { AppStore } from './appStore'
import companyStore, { CompanyStore } from 'stores/companyStore'
import permissionStore, { PermissionStore } from 'stores/permissionStore'
import usersStore, { UsersStore } from 'stores/usersStore'
import catalogStore, { CatalogStore } from 'stores/catalogStore'
import carStore, { CarStore } from "stores/carStore";

export type RootStore = {
  authStore: AuthStore
  usersStore: UsersStore
  permissionStore: PermissionStore
  appStore: AppStore
  companyStore: CompanyStore
  userStore: UserStore
  catalogStore: CatalogStore
  carStore: CarStore
}

const rootStore: RootStore = {
  authStore,
  appStore,
  usersStore,
  permissionStore,
  companyStore,
  userStore,
  catalogStore,
  carStore
}

export default rootStore
