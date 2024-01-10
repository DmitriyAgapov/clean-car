import {
    action,
    autorun,
    computed,
    flow,
    get,
    makeAutoObservable,
    makeObservable,
    observable,
    ObservableMap,
    reaction,
} from 'mobx'
import agent from 'utils/agent'
import type { AccountProps, CRUD } from "stores/permissionStore";
import { GroupProps } from 'stores/permissionStore'
import appStore from 'stores/appStore'
import currentUser from "components/common/layout/CurrentUser/CurrentUser";
import companyStore, { Company, CompanyType } from 'stores/companyStore'
import { makePersistable, clearPersistedStore } from 'mobx-persist-store';
import label from "utils/labels";

export enum UserTypeEnum {
  admin = 'admin',
  customer = "customer",
  performer = "performer"
}

export type User = {
  id: number
  phone?: string
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
  company?: Company<CompanyType>
}

export class UserStore {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    makePersistable(this, {
      name: 'userStore',
      properties: ['currentUser', 'currentUserPermissions'],
      storage: window.localStorage,
    });
    reaction(() => this.currentUserPermissions,
      (currentUserPermissions) => {
        if(currentUserPermissions.size === 0) {
          this.loadUserPermissions()
        }
      })
  }

  currentUser: User = {id: 0, email: '', first_name: '', last_name: ''};
  currentUserPermissions = observable.map([]);
  currentUserActiveAccount?: UserTypeEnum
  loadingUser: boolean = false
  updatingUser: boolean = false
  updatingUserErrors: any = ''
  loadUserPermissions = flow(function* (this: UserStore) {
    if(this.currentUser.account_bindings && this.currentUser.account_bindings.length > 0) {
      let ar = observable.map(this.currentUser.account_bindings[0].group.permissions.map((el: any) => [label(el.name), el]));
      // this.setCurrentPermissions(ar, this.currentUser.account_bindings[0].company.id);
      console.log('currentUserPermissions', this.currentUser.account_bindings);
    }
  })
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

    }
    if(this.currentUserPermissions.size === 0) {
      this.loadUserPermissions()
    }
    if(!this.currentUser.company) {
      // @ts-ignore
      this.currentUser.company = yield companyStore.getMyCompany()
    }
    this.loadingUser = false
  })

  get roles() {
    const roles = []
    if(this.currentUser.is_staff) {
      // appStore.setAppType(UserTypeEnum.admin);
      roles.push(UserTypeEnum.admin)
    }
    // @ts-ignore
    if(this.currentUser.account_bindings?.filter(value => value.company.company_type == "Компания-Заказчик").length > 0) {
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

  clearStore() {
    clearPersistedStore(this)
  }

  getUserCan(key: string, action: keyof CRUD) {
    return this.currentUserPermissions.get(key)[action]
  }
  setCurrentPermissions(ar:ObservableMap<any, any>, companyid?: number) {
    this.currentUserPermissions = ar
  }
  pullUser() {
      this.loadingUser = true
      this.clearStore()
      return agent.Auth.current()
        .then(action((r: any) => {
          this.currentUser = r
        }))
      .then(action(() => this.loadMyProfile()))
      .then(action(() => this.loadUserPermissions()))
      .finally(action(() => {
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
    this.currentUser = {} as User
  }

}

const userStore = new UserStore()

export default userStore
