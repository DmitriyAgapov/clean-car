import { action, makeObservable, observable, reaction } from "mobx";
import { ReactNode } from "react";
import userStore, { UserTypeEnum } from "./userStore";
import { PermissionName, Permissions } from "stores/permissionStore";
import label from "utils/labels";

export class AppStore {
  appName = 'CleanCar'
  appRouteName = '.авторизация'
  appTheme = 'dark'
  token = window.localStorage.getItem('jwt')
  appPermissions?: Permissions[]
  tokenFull: {} | null = null
  appLoaded = false
  burgerState: boolean = false
  asideState: boolean = false
  appType: UserTypeEnum | string = ''
  bodyRef = document.body
  modal: {
    state: boolean
    text:  string | ReactNode | ReactNode []
    header?:  string | ReactNode | ReactNode []
    actions: ReactNode | null | undefined
  } = {
    state: false,
    text: '',
    actions: null,
  }

  constructor() {
    makeObservable(this, {
      appName: observable,
      token: observable,
      modal: observable,
      appRouteName: observable,
      appPermissions: observable,
      appLoaded: observable,
      burgerState: observable,
      asideState: observable,
      appTheme: observable,
      setToken: action,
      appType: observable,
      setFullToken: action,
      setTheme: action,
      setAppLoaded: action,
      setBurgerState: action,
      setAsideState: action,
      setAsideClose: action,
      setAppLoading: action,
      setAppRouteName: action,
      setModal: action,
      setAppType: action,
    })
    reaction(
      () => this.token,
      (token) => {
        if (token) {
          window.localStorage.setItem('jwt', token)
          userStore.pullUser()
          userStore.loadMyProfile()
        } else {
          window.localStorage.removeItem('jwt')
        }
      },
    )
    reaction(() => this.appType,
      (appType => {
        // console.log(appType);
        // console.log(userStore);
        let ar = new Map([]);
        // @ts-ignore
        if(appType === UserTypeEnum.admin) {

          for (let permissionNameKey in PermissionName) {

            // @ts-ignore
            ar.set(PermissionName[permissionNameKey], {
              read: true,
              create: true,
              delete: true,
              name: permissionNameKey,
              update:true
            })
          }
        } else {
          this.appPermissions = userStore.currentUser?.account_bindings?.filter(value => value.company.company_type == label(appType+'_company_type'))[0].group.permissions
          this.appPermissions?.forEach((item) => {
            // @ts-ignore
            ar.set(PermissionName[item.name], item)
          })
        }


        // @ts-ignore

        // console.log(get(this.currentUserPermissions, 0));


        // @ts-ignore
        userStore.setCurrentPermissions(ar);

      })
    )
  }

  setAppType(type: UserTypeEnum) {

    this.appType = type

    let routeName = ''
    switch (this.appType) {
      case UserTypeEnum.admin:
        routeName = 'администратор системы'
        break
      case UserTypeEnum.performer:
        routeName = 'Кабинет исполнителя'
        break
      case UserTypeEnum.customer:
        routeName = 'Кабинет заказчика'
        break
    }
    this.appRouteName = routeName
  }

  setModal({ state, text = '', actions , header}: {header?: string | ReactNode | ReactNode[]; state: boolean; text: string | ReactNode | ReactNode []; actions: ReactNode }) {
    if(text) {
      this.modal = { state: state, text: text, actions: actions, header: header }
    }
  }

  closeModal() {
    this.modal = {
      state: false,
      text: '',
      actions: null,
    }
  }

  setToken(token: string | null) {
    this.token = token
  }

  setFullToken(token: string | null | {}) {
    this.tokenFull = token
  }

  setTheme() {
    const themes = ['dark', 'light']
    this.appTheme = this.appTheme !== themes[0] ? themes[0] : themes[1]
    const html = document.documentElement
    html.setAttribute('data-theme', appStore.appTheme)
  }

  setBurgerState() {
    if (!this.burgerState) {
      this.bodyRef.style.overflow = 'hidden'
    } else {
      this.bodyRef.style.overflow = 'initial'
    }
    this.burgerState = !this.burgerState
  }
  setAsideClose() {
    if (!this.asideState && this.bodyRef.clientWidth < 960) {
      this.bodyRef.style.overflow = 'hidden'
    } else {
      this.bodyRef.style.overflow = 'initial'
    }
    this.asideState = false
  }
  setAsideState() {
      if (!this.asideState) {
        this.bodyRef.style.overflow = 'hidden'
      } else {
        this.bodyRef.style.overflow = 'initial'
      }
      this.asideState = !this.asideState
    console.log(this.asideState);
    }

  setAppLoaded() {
    this.bodyRef.style.overflow = 'initial'
    this.appLoaded = true
  }

  setAppLoading() {
    this.appLoaded = false
  }

  setAppRouteName(route: string) {
    this.appRouteName = route
  }
}

const appStore = new AppStore()

export default appStore
