import { action, computed, makeAutoObservable, observable, ObservableMap, reaction, runInAction } from "mobx";
import agent, { client } from "utils/agent";

import { getMimeType } from 'advanced-cropper/extensions/mimes';
import { AccountProps, CRUD,  PermissionNames } from "stores/permissionStore";
import { GroupProps } from 'stores/permissionStore'
import appStore from 'stores/appStore'
import companyStore, { Company, CompanyType } from 'stores/companyStore'
import { makePersistable, clearPersistedStore } from 'mobx-persist-store';
import label from 'utils/labels';
import authStore from "stores/authStore";
import carStore from "stores/carStore";
import bidsStore from "stores/bidsStrore";
import resizeFile from "utils/imageResizer";
interface Image {
  type?: string
  src: string
}

export enum UserPermissionVariants {
  "profile" = "Управление пользователями",
  "companies" = "Компании",
  "filials"  = "Управление филиалами",
  "users"  = "Управление пользователями",
  "groups"  = "Управление пользователями",
  "cars"  = "Управление автомобилями",
  "bids"  = "Управление заявками",
  "price"  = "Управление прайс-листом",
  "limits"  = "Управление лимитами",
  "references"  = "Управление справочниками",
  "finance"  = "Финансовый блок",
}
export enum UserTypeEnum {
  admin = 'admin',
  customer = "customer",
  performer = "performer",
  fizlico = "fizlico"
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
  is_superuser?: boolean | null
  is_staff: boolean | null
  staff_group?: GroupProps
  is_active?: boolean
  account_bindings?: AccountProps[]
  company?: Company<CompanyType>
}

export class UserStore {

  constructor() {
    makeAutoObservable(this, {
      // myProfileState: computed,
      isAdmin: computed,
    }, { autoBind: true });
    makePersistable(this, {
      name: 'userStore',
      properties: ['currentUser','permissionsVariants','myProfileData', 'currentUserPermissions'],
      storage: window.localStorage,
    });
    reaction(() => this.currentUser,
       (currentUser) => {
         if (authStore.userIsLoggedIn) {
           if (currentUser.id === 0 && appStore.token !== '') {
               console.log('this.currentUser')
               this.pullUser()
               this.loadMyProfile()
           }
         }
       }
    )

    reaction(() => this.myProfileData.permissions,
      (permissions) => {
        if (authStore.userIsLoggedIn) {
          if (permissions && permissions.id && permissions.permissions.length > 0) {
            this.loadUserPermissions()
          } else if (this.currentUser.id) {
            // this.loadMyProfile()
          }
        }
      })
    reaction(() => this.myProfileData.company,
      async (company) => {
        if (authStore.userIsLoggedIn && appStore.token !== "") {
          if (company && companyStore.companies.length === 0) {
            runInAction(() => companyStore.getAllCompanies())
            // (appStore.appType !== UserTypeEnum.performer && appStore.appType !== "") && carStore.getCars(company.id)
          }
        }
      })
    reaction(() => this.currentUserPermissions,
      (currentUserPermissions) => {
          if(authStore.userIsLoggedIn && appStore.token !== "" && currentUserPermissions.size === 0) {
            console.log('create Permissions if it is not created:)');
            this.createUserPermissions()
          }
      })
  }
  cropperRef: any;
  currentUser: User = {id: 0, email: '', first_name: '', last_name: '', is_staff: null, is_superuser: null};
  currentUserPermissions = observable.map([]);
  permissionsVariants = observable.map([]);
  // permissionsVariantss = observable.object({});
  // currentUserActiveAccount?: UserTypeEnum
  loadingUser: boolean = false
  // updatingUser: boolean = false
  updatingUserErrors: any = ''
  myProfileData = {
    loading: false,
    company: <any> null,
    image: <Image | null> null,
    user: <any> null,
    permissions: <any> null,
    permissionGroupName: <any>  null,
    error:  null,
    roles: [] = []
  }

  get roles() {
    const roles = []
    if(this.isAdmin) {
      roles.push(UserTypeEnum.admin)
    }
    if(this.myProfileData.user) {
      if(this.myProfileData.user.account_bindings?.filter((value:any) => value.company.company_type == "Клиент").length > 0) {
        roles.push(UserTypeEnum.customer)
      }
      if(this.myProfileData.company.company_type === CompanyType.fizlico) {
        roles.push(UserTypeEnum.customer)
      }
      if(this.myProfileData.user?.account_bindings?.filter((value:any) => value.company.company_type == "Партнер").length > 0) {
        roles.push(UserTypeEnum.performer)
      }
    }
    return roles
  }
  setCropperRef(ref:any) {
    this.cropperRef = ref
  }
  onLoadImage = (event: any) => {

    // Reference to the DOM input element
    const  files  = event

    // Ensure that you have a file before attempting to read it
    if (files) {
      // Create the blob link to the file to optimize performance:
      const blob = URL.createObjectURL(files)

      // Remember the fallback type:
      const typeFallback = files.type

      // Create a new FileReader to read this image binary data
      const reader = new FileReader()

      // Define a callback function to run, when FileReader finishes its job
      reader.onload = (e) => {
        // Note: arrow function used here, so that "this.image" refers to the image of Vue component
        this.myProfileData.image = {
          // Read image as base64 and set it as src:
          src: blob,
          // Determine the image type to preserve it during the extracting the image from canvas:
          type: getMimeType(e.target?.result, typeFallback),
        }
      }
      // Start the reader job - read file as a data url (base64 format) and get the real file type
      reader.readAsArrayBuffer(files)
    }
    // Clear the event target value to give the possibility to upload the same image:
    event = ''
  }
  async upLoadImage() {
    const canvas = this.cropperRef.current?.getCanvas();
    if (canvas) {
      const form = new FormData();
      canvas.toBlob((blob:any) => {
        if (blob) {
          (async () => await resizeFile(blob)
          .then((r:any) => {
            form.append('avatar', r, 'avatar.jpg');
            console.log(form.get('avatar'));

          })
            .then(() =>  agent.Account.uploadAvatar(form).then(r => {
            return r
          })))()
        }
      }, 'image/jpeg');

    }
  }
  async loadMyProfile() {
    this.loadingUser = true
    return await agent.Profile.getMyAccount()
      .then((response:any) => response.data)
      .then(((data:any) => {
        runInAction(() => {
          this.myProfileData.user = data
          this.myProfileData.company = data.account_bindings[0].company
          this.myProfileData.permissions = data.account_bindings[0].group.permissions
          this.myProfileData.permissionGroupName = data.account_bindings[0].group.name
          this.createUserPermissions()
          bidsStore.loadEventCount()
        })
      }))
      .catch((error:any) => runInAction(() =>this.myProfileData.error = error))
      .finally(() => {
        runInAction(() => {
          this.loadingUser = false
          this.myProfileData.loading = false
        })
    })
  }
  createUserPermissions() {
    let ar:any = new Map([]);
    if(authStore.userIsLoggedIn && appStore.token !== "") {
      try {
        if(this.isAdmin) {
          // console.log('Create admin permissions');
          // console.log(this.myProfileData.permissions);
          appStore.setAppType(UserTypeEnum.admin)
          this.myProfileData.permissions.forEach((el:any) => ar.set(el.name, el))
          // for (let permissionNameKey in PermissionNames) {
          //   // @ts-ignore
          //   ar.set(PermissionNames[permissionNameKey], {
          //     read: true,
          //     create: true,
          //     delete: true,
          //     name: permissionNameKey,
          //     update:true
          //   })
          // }
        } else {
          const type = (this.myProfileData.user.account_bindings && this.myProfileData.user.account_bindings[0].company.company_type === CompanyType.performer) ? UserTypeEnum.performer : UserTypeEnum.customer ;
          appStore.setAppType(type)
          // console.log(`Create ${type}  permissions`);

          const perm = this.myProfileData.user.account_bindings.filter((item:any) => item.company.company_type === label(type+`_company_type`))
          console.log(perm && perm.length > 0);


          if(perm && perm.length > 0) {
            this.myProfileData.company = perm[0].company;


            this.myProfileData.permissions = perm[0].group.permissions
            perm[0].group.permissions.forEach((item: any) => {
              const exepctions = ['Расчетный блок',
                // 'Финансовый блок',
                'Индивидуальный расчет']
              if (exepctions.indexOf(item.name) == -1) {
                // @ts-ignore
                ar.set(PermissionNames[item.name], item)
              }
            })
          } else {
            this.myProfileData.permissions.forEach((item: any) => {
              const exepctions = ['Компании', 'Расчетный блок',
                // 'Финансовый блок',
                'Индивидуальный расчет']
              if (exepctions.indexOf(item.name) == -1) {
                // @ts-ignore
                ar.set(PermissionNames[item.name], item)
              }
            })
          }
        }
        this.setCurrentPermissions(ar)
      } catch (e) {
        console.log(e);
      }

      }

  }
  get userData () {
    return this.myProfileData.user
  }
  get myProfileState() {
    return ({
      image: this.myProfileData.image,
      user: this.myProfileData.user,
      loading: this.myProfileData.loading,
      permissions: this.myProfileData.permissions,
      company: this.myProfileData.company,
      error: this.myProfileData.error,
    })
  }

  get isAdmin() {
    return (this.myProfileData.company && this.myProfileData.company.company_type === "Администратор системы")
  }

  loadUserPermissions() {
    if(authStore.userIsLoggedIn) {
      if (this.isAdmin) {
        this.setCurrentPermissions(this.myProfileData.permissions.permissions.map((el: any) => [String(el.name), el]));
        appStore.setAppType(UserTypeEnum.admin)
      } else if (this.myProfileData.user.account_bindings && this.myProfileData.user.account_bindings.length > 0) {
        this.setCurrentPermissions(this.myProfileData.user.account_bindings[0].group.permissions.map((el: any) => [label(el.name), el]));
      }
    }
  }

  getUserCan(key: string, action: keyof CRUD) {

    // console.log(`userIsLoggedIn : ${authStore.userIsLoggedIn},  getUserCan -------`, authStore.userIsLoggedIn, 'Ключ--', key);
    if(authStore.userIsLoggedIn && appStore.token !== "") {
      // try {
        // if (this.isAdmin) {
          if (this.currentUserPermissions && this.currentUserPermissions.has(key)) {
            // console.log('Все ок с  правами', this.currentUserPermissions.get(key)[action])

            if(this.currentUserPermissions.has(key)) return this.currentUserPermissions.get(key)[action]
          } else {
            // console.log('Нет прав, создаем')
            // this.createUserPermissions()
            if(this.currentUserPermissions.has(key)) return this.currentUserPermissions.get(key)[action]
          }
        // }
      // } catch (e) {
      //   console.log(e);
      // }
    }
    // if(this.myProfileData.permissions && this.myProfileData.permissions.permissions.has(key)) {
    //   console.log('Все ок с  правами')
    //   return this.myProfileData.permissions.permissions.get(key)[action]
    // } else {
    //   console.log('Нет прав, создаем')
    //   this.createUserPermissions()
    //   return this.currentUserPermissions.get(key)[action]
    // }
  }
  setCurrentPermissions(ar:ObservableMap<any, any>, companyid?: number) {
    this.currentUserPermissions = observable.map(ar)
  }
  setPermissionsVariants(ar:ObservableMap<any, any>, companyid?: number) {
    this.permissionsVariants = ar
  }

  pullUser() {
    this.loadingUser = true
    return agent.Auth.current()
        .then((r: any) => {
          runInAction(() => {
            this.currentUser = r
          })
        })
        .catch(((error) => {
        action(() => this.updatingUserErrors = error)
      }))
        .finally(() => action(() => this.loadingUser = false))
  }

  forgetUser() {
    clearPersistedStore('userStore').then((r) => console.log(r))
    this.myProfileData = {
      loading: false,
      company: <any> null,
      image: null,
      user:<any> null,
      permissionGroupName: <any> null,
      permissions: <any> null,
      error:  null,
      roles: [] = []
    }
    this.currentUser = {id: 0, email: '', first_name: '', last_name: '', is_staff: false}
    this.currentUserPermissions.clear()
    window.localStorage.clear()
    appStore.setAppType('')
    appStore.setAppRouteName('.авторизация')
    localStorage.clear()
  }
}

const userStore = new UserStore()

export default userStore
