import { action, autorun, computed, IObservable, IObservableValue, makeAutoObservable, observable, ObservableMap, reaction, runInAction } from "mobx";
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
    reaction(() => this.currentUser,
       (currentUser) => {
        if(currentUser ) {

          console.log('Load my profile');

          action(() => this.pullUser())
          action(() => this.loadMyProfile())
        }
      }
    )
    reaction(() => this.myProfileState,
      (user) => {
      if(user.user == null) {
       action(() => appStore.token = "")
     appStore.token = ""
        console.log('not logged in');
      } else {
        console.log('logged in');
      }

      }

      )
    reaction(() => this.loggedUser,
      (loggedUser) => {
        if(loggedUser) {
          console.log('true');
        } else {
          console.log('false');
        }
      })
    reaction(() => this.myProfileData.permissions,
      (permissions) => {
        // console.log(permissions, 'permissions');
        if(permissions.id && permissions.permissions.length > 0) {
          // console.log('load permissions');
          this.loadUserPermissions()
        } else if(this.currentUser.id) {
          action(() => this.loadMyProfile())
        }
    })
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
  loggedUser: boolean = false
  get roles() {
    const roles = []
    if(this.isAdmin) {
      roles.push(UserTypeEnum.admin)
    }
    if(this.myProfileData.user) {
    if(this.myProfileData.user.account_bindings?.filter((value:any) => value.company.company_type == "Компания-Заказчик").length > 0) {
      roles.push(UserTypeEnum.customer)
    }

    if(this.myProfileData.user?.account_bindings?.filter((value:any) => value.company.company_type == "Компания-Исполнитель").length > 0) {
      roles.push(UserTypeEnum.performer)
    }}
    return roles
  }
  loadMyProfile() {
    this.loadingUser = true
    return agent.Profile.getMyAccount()
    .then((response:any) => response.data)
    .then(((data:any) => {
      runInAction(() => {
        this.myProfileData.user = data
        this.currentUser.is_staff = data.is_staff
        this.myProfileData.permissions = data.staff_group
	      this.createUserPermissions()
      })
    }))
    .catch(((error:any) => this.myProfileData.error = error))
    .finally(() => {
      action(()=> {

      })
      action(() => {
        this.loadingUser = false
        this.myProfileData.loading = false
      })
    })}
  createUserPermissions() {
    let ar:any = new Map([]);
    if(this.isAdmin) {
      // console.log('admin');
      action(() => {
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
        }})

    } else {
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
    return this.currentUser.is_staff
  }

  loadUserPermissions() {
    if(this.isAdmin) {
      // console.log('is admin');
      this.setCurrentPermissions(this.myProfileData.permissions.permissions.map((el: any) => [String(el.name), el]));
      appStore.setAppType(UserTypeEnum.admin)
    } else if (this.myProfileData.user.account_bindings && this.myProfileData.user.account_bindings.length > 0) {
      // console.log('is not admin');
      this.setCurrentPermissions(this.myProfileData.user.account_bindings[0].group.permissions.map((el: any) => [label(el.name), el]));
    }
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
      return  agent.Auth.current()
        .then((r: any) => {
          runInAction(() => {
            this.currentUser = r
          })
        })
        .catch(action((error) => {
          this.updatingUserErrors = error
        console.log('error');
        console.log(error);
      }))
        .finally(action(() => this.loadingUser = false))
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
  console.log(userStore.updatingUserErrors);
  console.log(userStore.myProfileState);
   console.log(userStore.currentUser.is_staff);
  console.log(userStore.isAdmin);
})
export default userStore
