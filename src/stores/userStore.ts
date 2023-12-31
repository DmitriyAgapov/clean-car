import { action, autorun, computed, flow, get, makeObservable, observable, ObservableMap, reaction } from 'mobx'
import agent from 'utils/agent'
import type { AccountProps, CRUD } from "stores/permissionStore";
import { GroupProps } from 'stores/permissionStore'
import appStore from 'stores/appStore'
import currentUser from "components/common/layout/CurrentUser/CurrentUser";

export enum UserTypeEnum {
  admin = 'admin',
  customer = "customer",
  performer = "performer"
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
  currentUserPermissions = observable.map([]);
  currentUserActiveAccount?: UserTypeEnum
  loadingUser?: boolean
  updatingUser?: boolean
  updatingUserErrors: any

  loadMyProfile = flow(function* (this: UserStore) {
    console.log('load profile');
    this.loadingUser = true
    try {
      const { data } = yield agent.Profile.getMyAccount();
      this.currentUser = data
      if(!appStore.appType) {
        appStore.setAppType(this.roles[0])
      }
    } catch (error) {
      this.updatingUserErrors = 'error'
    }
    finally {
      this.loadingUser = false
      // if(appStore.appType == '') appStore.setAppType(this.roles[0])
    }
  })

  constructor() {
    makeObservable(this, {
      currentUser: observable,
      currentUserPermissions: observable,
      loadingUser: observable,
      getCurrentUserActiveAccount: action,
      currentUserActiveAccount: observable,
      updatingUser: observable,
      updatingUserErrors: observable,
      loadMyProfile: action,
      setCurrentPermissions: action,
      roles: computed,
      // setUser: action,
      // updateUser: action,
      forgetUser: action,
    })

   }
  get roles() {
    const roles = []
    const source: any = this.currentUser?.account_bindings


    if(this.currentUser?.is_staff) {
      // appStore.setAppType(UserTypeEnum.admin);
      roles.push(UserTypeEnum.admin)
    }
    // @ts-ignore
    if(this.currentUser?.account_bindings?.filter(value => value.company.company_type == "Компания-Заказчик").length > 0) {
      // appStore.setAppType(UserTypeEnum.customer);
      roles.push(UserTypeEnum.customer)
    }
    // @ts-ignore
    if(this.currentUser?.account_bindings?.filter(value => value.company.company_type == "Компания-Исполнитель").length > 0) {
      // appStore.setAppType(UserTypeEnum.performer);
      roles.push(UserTypeEnum.performer)
    }
    return roles
  }
  getUserCan(key: string, action: keyof CRUD) {
    return this.currentUserPermissions.get(key)[action]
  }
  setCurrentPermissions(ar:ObservableMap<any, any>) {
    this.currentUserPermissions = ar
    console.log(this.currentUserPermissions);
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
