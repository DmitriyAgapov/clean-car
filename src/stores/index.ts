import authStore, { AuthStore } from './authStore'
import userStore, { UserStore } from './userStore'
import appStore, { AppStore } from './appStore'
import companyStore, { CompanyStore } from 'stores/companyStore'
import permissionStore, { PermissionStore } from 'stores/permissionStore'
import usersStore, { UsersStore } from 'stores/usersStore'
import catalogStore, { CatalogStore } from 'stores/catalogStore'
import carStore, { CarStore } from "stores/carStore";
import formStore, { FormStore } from "stores/formDataStore";
import bidsStore, { BidsStore } from "stores/bidsStrore";
import paramsStore, { ParamStore } from "stores/paramStore";

export type RootStore = {
  authStore: AuthStore
  usersStore: UsersStore
  permissionStore: PermissionStore
  appStore: AppStore
  companyStore: CompanyStore
  userStore: UserStore
  catalogStore: CatalogStore
  carStore: CarStore
  formStore: FormStore
  bidsStore: BidsStore
  paramsStore: ParamStore
}

const rootStore: RootStore = {
  bidsStore,
  paramsStore,
  authStore,
  appStore,
  usersStore,
  formStore,
  permissionStore,
  companyStore,
  userStore,
  catalogStore,
  carStore
}

export default rootStore
