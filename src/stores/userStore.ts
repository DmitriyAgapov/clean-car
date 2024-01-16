import { action, autorun, computed, IObservable, IObservableValue, makeAutoObservable, observable, ObservableMap, reaction } from "mobx";
import agent from 'utils/agent'
import { AccountProps, CRUD, PermissionName, PermissionNames } from "stores/permissionStore";
import { GroupProps } from 'stores/permissionStore'
import appStore from 'stores/appStore'
import  { Company, CompanyType } from 'stores/companyStore'
import { makePersistable, clearPersistedStore } from 'mobx-persist-store';
import label from 'utils/labels';


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
  is_staff: boolean | null
  staff_group?: GroupProps
  is_active?: boolean
  account_bindings?: AccountProps[]
  company?: Company<CompanyType>
}

export class UserStore {

  constructor() {
    makeAutoObservable(this, {
      myProfileState: computed,
      isAdmin: computed,
    }, { autoBind: true });
    makePersistable(this, {
      name: 'userStore',
      properties: ['currentUser','permissionsVariants','myProfileData', 'currentUserPermissions'],
      storage: sessionStorage,
    });
    reaction(() => this.currentUser.id,
      async (currentUser) => {
        if(currentUser !== 0) {
          console.log('Load my profile');
          action(() =>  this.loadMyProfile())
        }
      }
    )
    reaction(() => this.myProfileData.user.is_staff,
      (is_staff) => {
        if(is_staff !== null) {
        let ar:any = new Map([]);
          if(is_staff) {
            // console.log('admin');
            appStore.setAppType(UserTypeEnum.admin)
            this.myProfileData.permissions = this.myProfileData.user.staff_group
            for (let permissionNameKey in PermissionNames) {
              // @ts-ignore
              ar.set(PermissionNames[permissionNameKey], {
                read: true,
                create: true,
                delete: true,
                name: permissionNameKey,
                update:true
              })
            }
          } else if(!is_staff) {
            console.log(is_staff);
            const type = this.myProfileData.user.account_bindings[0].company.company_type === CompanyType.performer ? UserTypeEnum.performer : UserTypeEnum.customer ;
            appStore.setAppType(type)

            const perm = this.myProfileData.user.account_bindings.filter((item:any) => item.company.company_type === label(type+`_company_type`))
            this.myProfileData.company = perm[0].company;
            // console.log(perm);
            perm[0].group.permissions.forEach((item:any) => {
              const exepctions = ['Компании', 'Расчетный блок', 'Финансовый блок', 'Индивидуальный расчет']
              if(exepctions.indexOf(item.name) == -1) {
                // @ts-ignore
                ar.set(PermissionNames[item.name], item)
              }
            })

            this.myProfileData.permissions = perm[0].group.permissions
          }
        this.setCurrentPermissions(ar)
      }})

  }

  currentUser: User = {id: 0, email: '', first_name: '', last_name: '', is_staff: null};
  currentUserPermissions = observable.map([]);
  permissionsVariants = observable.map([]);
  permissionsVariantss = observable.object({});
  currentUserActiveAccount?: UserTypeEnum
  loadingUser: boolean = false
  updatingUser: boolean = false
  updatingUserErrors: any = ''
  myProfileData = {
    loading: false,
    company: <any> null,
    user: <any> null,
    permissions: <any> null,
    error:  null,
    roles: [] = []
  }

  get roles() {
    const roles = []
    if(this.myProfileData.user.is_staff) {
      roles.push(UserTypeEnum.admin)
    }
    // @ts-ignore
    if(this.myProfileData.user.account_bindings?.filter(value => value.company.company_type == "Компания-Заказчик").length > 0) {
      roles.push(UserTypeEnum.customer)
    }
    // @ts-ignore
    if(this.myProfileData.user?.account_bindings?.filter(value => value.company.company_type == "Компания-Исполнитель").length > 0) {
      roles.push(UserTypeEnum.performer)
    }
    return roles
  }
  loadMyProfile() {
    this.loadingUser = true
    return agent.Profile.getMyAccount()
    .then(action((response:any) => response.data))
    .then(action((data:any) => {
        this.myProfileData.user = data
        this.currentUser.is_staff = data.is_staff
    }))
    .catch(action((error:any) => this.myProfileData.error = error))
    .finally(action(() => {
      this.setMyProfileRoles()
      this.myProfileData.loading = false
    }))
  }
  get myProfileState() {
    return ({
      user: this.myProfileData.user,
      loading: this.myProfileData.loading,
      permissions: this.myProfileData.permissions,
      company: this.myProfileData.company,
      error: this.myProfileData.error,
    })
  }

  get isAdmin() {
    let load = true
    if(this.myProfileData.user.is_staff === null) {
      action(() => this.loadMyProfile().finally(() => load = false))
    }
    return this.myProfileData.user.is_staff
  }

  loadUserPermissions() {

    if (this.myProfileData.user.account_bindings && this.myProfileData.user.account_bindings.length > 0) {
      let ar = observable.map(this.myProfileData.user.account_bindings[0].group.permissions.map((el: any) => [label(el.name), el]));
      this.setCurrentPermissions(ar);
      // console.log('currentUserPermissions', this.currentUser.account_bindings);
    }
    if(this.isAdmin) {
      this.currentUserPermissions = observable.map(this.myProfileData.permissions.permissions.map((el: any) => [String(el.name), el]))
      appStore.setAppType(UserTypeEnum.admin)
    }

  }

  setMyProfileRoles() {
    const roles = []
    if(this.currentUser.is_staff) {
      roles.push(UserTypeEnum.admin)
    }
    // @ts-ignore
    if(this.myProfileData.user.account_bindings?.filter((value:AccountProps) => value.company.company_type == "Компания-Заказчик").length > 0) {
       roles.push(UserTypeEnum.customer)
    }

    if(this.myProfileData.user.account_bindings?.filter((value:AccountProps) => value.company.company_type == "Компания-Исполнитель").length > 0) {
      roles.push(UserTypeEnum.performer)
    }

    // this.isAdmin ? this.myProfileData.permissions = this.myProfileData.user.staff_group : this.myProfileData.permissions = this.myProfileData.user.account_bindings[0].data.permissions
  }



  clearStore() {
    return clearPersistedStore(this)
  }

  getUserCan(key: string, action: keyof CRUD) {
    return this.currentUserPermissions.get(key)[action]
  }
  setCurrentPermissions(ar:ObservableMap<any, any>, companyid?: number) {
    this.currentUserPermissions = observable.map(ar)
  }
  setPermissionsVariants(ar:ObservableMap<any, any>, companyid?: number) {
    this.permissionsVariants = ar
  }

  pullUser() {
      this.loadingUser = true
      this.clearStore()
      return agent.Auth.current()
        .then(action((r: any) => {
          this.currentUser = r
        }))
        .catch((error) => this.updatingUserErrors = error)
        .finally(() => this.loadingUser = false)
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
    clearPersistedStore('userStore').then((r) => console.log(r))
    this.myProfileData = {
      loading: false,
      company: <any> null,
      user:<any> null,
      permissions: <any> null,
      error:  null,
      roles: [] = []
    }
    this.currentUser = {id: 0, email: '', first_name: '', last_name: '', is_staff: false}
    this.currentUserPermissions.clear()
    appStore.setAppType('')
    appStore.setAppRouteName('.авторизация')
    sessionStorage.clear()
  }
}

const userStore = new UserStore()
autorun(() => {
  console.log(userStore);
  console.log(userStore.currentUser.is_staff);
  console.log(userStore.isAdmin);
})
export default userStore
