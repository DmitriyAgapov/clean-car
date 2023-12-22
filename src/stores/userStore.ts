import { action, autorun, computed, flow, makeObservable, observable, reaction } from 'mobx'
import agent from 'utils/agent'
import type { AccountProps } from 'stores/permissionStore'
import { GroupProps } from 'stores/permissionStore'
import appStore from 'stores/appStore'

export enum UserTypeEnum {
  admin = 'admin',
  customer = 'customer',
  executor = 'executor',
}

export type User = {
  id: string
  phone: string
  email: string
  userType?: UserTypeEnum
  first_name: string
  last_name: string
  password?: string
  password2?: string
  is_superuser?: boolean
  is_staff?: boolean
  staff_group?: GroupProps
  is_active?: boolean
  account_bindings?: AccountProps[]
}

export class UserStore {
  currentUser?: User
  currentUserActiveAccount?: UserTypeEnum
  loadingUser?: boolean
  updatingUser?: boolean
  updatingUserErrors: any

  loadMyProfile = flow(function* (this: UserStore) {
    this.loadingUser = true
    try {
      const { data } = yield agent.Profile.getMyAccount()

      this.currentUser = data
      this.loadingUser = false
    } catch (error) {
      this.updatingUserErrors = 'error'
    }
    finally {
      if(appStore.appType == '') appStore.setAppType(this.roles[0])
    }
  })

  constructor() {
    makeObservable(this, {
      currentUser: observable,
      loadingUser: observable,
      getCurrentUserActiveAccount: action,
      currentUserActiveAccount: observable,
      updatingUser: observable,
      updatingUserErrors: observable,
      loadMyProfile: action,
      roles: computed,
      // setUser: action,
      // updateUser: action,
      forgetUser: action,
    })
   }
  get roles() {
    const roles = []
    if(this.currentUser?.is_staff) {
      // appStore.setAppType(UserTypeEnum.admin);
      roles.push(UserTypeEnum.admin)
    }
    // @ts-ignore
    if(this.currentUser?.account_bindings?.filter(value => value.company.company_type == "Компания-Заказчик").length > 0) {
      appStore.setAppType(UserTypeEnum.customer);
      roles.push(UserTypeEnum.customer)
    }
    // @ts-ignore
    if(this.currentUser?.account_bindings?.filter(value => value.company.company_type == "Компания-Исполнитель").length > 0) {
      appStore.setAppType(UserTypeEnum.executor);
      roles.push(UserTypeEnum.executor)
    }
    return roles
  }
  pullUser() {

      this.loadingUser = true
      return agent.Auth.current()
      .then(action((r: any) => {
        this.currentUser = r
      }))
      .then(action(() => this.loadMyProfile())).finally(action(() => {
        if(appStore.appType)
         this.loadingUser = false
      }),)


  }

  getCurrentUserActiveAccount() {
    return appStore.appType
  }

  // updateUser(newUser: User) {
  // 	this.updatingUser = true;
  // 	return agent.Auth.save(newUser)
  // 	.then(action(({ user }: { user: User }) => { this.currentUser = user; }))
  // 	.finally(action(() => { this.updatingUser = false; }))
  // }

  forgetUser() {
    this.currentUser = undefined
  }
}

const userStore = new UserStore()
export default userStore
