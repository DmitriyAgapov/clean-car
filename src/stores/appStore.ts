import { action, autorun, computed, makeAutoObservable, observable, reaction } from 'mobx'
import { ReactNode } from "react";
import userStore, { UserTypeEnum } from "./userStore";
import { PermissionName, Permissions } from "stores/permissionStore";
import { makePersistable } from 'mobx-persist-store'
import catalogStore from "stores/catalogStore";
import authStore from "stores/authStore";

export class AppStore {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true } )
    makePersistable(this, {
      name: 'appStore',
      properties: ['appTheme', 'appType','appName', 'appRouteName','appPermissions', 'token', 'tokenRefresh' ],
      storage: localStorage,
    }, {
      fireImmediately: true,
    })

    reaction(
      () => this.token,
      (token) => {
        if (token) {
          console.log('Has token');
          window.localStorage.setItem('jwt', token)
          // userStore.pullUser()
          userStore.loadMyProfile()
        } else {
          console.log('no token');
          window.localStorage.removeItem('jwt')
          localStorage.clear()
        }
      },
    )
    reaction(() => this.appType,
      (appType) => {
        if(appType !== "" && !this.token) {
          console.log('Нет токена но есть стор');
          authStore.logout()
        }

    })
    // reaction(() => this.tokenRefresh,
    //   (tokenRefresh) => {
    //     if (tokenRefresh) {
    //       window.localStorage.setItem('jwt_refresh', tokenRefresh)
    //     } else {
    //       window.localStorage.removeItem('jwt_refresh')
    //     }
    //   },
    // )

    reaction(() => this.appType,
      (appType) => {
      if(appType === "") {
        console.log('appType in ""')
        action(() => authStore.logout())
      }
    })
    reaction(() => this.bodyRef,
      (bodyRef) => {

          // this.font = this.fontSizeBody
        console.log('fsC',bodyRef);

      // console.log('fs',fontSize);

    })
    reaction(() => this.appType,
      (appType => {
        let ar:any = new Map([]);

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
          if(userStore.currentUser.account_bindings && userStore.currentUser.account_bindings.length > 0) {
            this.appPermissions = userStore.currentUser.account_bindings[0].group.permissions
          }
          this.appPermissions?.forEach((item) => {
            const exepctions = ['Компании', 'Расчетный блок', 'Финансовый блок']
            if(exepctions.indexOf(item.name) == -1) {
              // @ts-ignore
              ar.set(PermissionName[item.name], item)
            }
          })
        }
        userStore.setPermissionsVariants(ar)
        if(appType !== "") {
          catalogStore.setLoadingStateFalse()
        }
      })
    )
  }
  location:any = window.location
  appName = 'CleanCar'
  appRouteName = '.авторизация'
  appTheme = 'dark'
  font: number = Number(window.getComputedStyle(document.getElementsByTagName('html')[0]).getPropertyValue('font-size').replaceAll('px', ""))
  token = window.localStorage.getItem('jwt')
  tokenRefresh = window.localStorage.getItem('jwt_refresh')
  appPermissions?: Permissions[]
  tokerError: string | null = null
  tokenFull: {} | null = null
  loaderBlocked: boolean = false
  appLoaded = false
  burgerState: boolean = false
  asideState: boolean = false
  appType: UserTypeEnum | string = ''
  networkStatus: boolean = true
  appState: boolean = false
  sublevel: boolean = false
  bodyRef = document.body
  modal: {
    component?: ReactNode
    state: boolean
    text?:  string | ReactNode | ReactNode []
    className?: string | undefined
    header?:  string | ReactNode | ReactNode []
    actions: ReactNode | null | undefined
  } = {
    state: false,
    text: '',
    actions: null,
  }
  get AppState() {
    return this.appState
  }
  get fontSizeBody() {
    console.log(this.font);
    return this.font
  }
  fontSizeBodyCalc() {
    const _fSize = Math.floor(Number(window.getComputedStyle(document.getElementsByTagName('html')[0]).getPropertyValue('font-size').replaceAll('px', "")))
    action(() => this.font = _fSize)
    return _fSize
  }


  setAppState(state: boolean) {
    this.appState = state
  }
  setTokenError(error: string | null) {
    this.tokerError = error
  }
  setBlocked() {
    this.loaderBlocked = true
  }
  get getAppState() {
    return this.appState
  }
  setAppType(type: UserTypeEnum | string) {
    this.appType = type
    let routeName = ''
    switch (this.appType) {
      case UserTypeEnum.admin:
        routeName = 'Администратор'
        break
      case UserTypeEnum.performer:
        routeName = 'Партнёр'
        break
      case UserTypeEnum.customer:
        routeName = 'Клиент'
        break
    }
    this.appRouteName = routeName
  }

  setModal({ state, text = '', component, actions ,className = '', header}: {component?: ReactNode, header?: string | ReactNode | ReactNode[]; state: boolean; className?: string, text?: string | ReactNode | ReactNode [] | undefined; actions?: ReactNode }) {
    if(text) {
      this.modal = { state: state, text: text, className: className, actions: actions, header: header }
    }
    if(component) {
      this.modal = { state: state, className: className, component: component,  header: header, actions: actions, }
    }
  }

  closeModal() {
    this.modal = {
      state: false,
      text: '',
      actions: null,
    }
  }
  setNetWorkStatus(state: boolean) {
    this.networkStatus = state
  }
  get getNetWorkStatus() {
    return this.networkStatus
  }
  setToken(token: string | null) {
    this.token = token
  }
  setTokenRefresh(refresh: string | null) {
    this.tokenRefresh = refresh
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
  get subLevel() {
    return this.sublevel
  }
  setSublevelOpen() {
    this.sublevel = true
  }
  setSublevelToggle() {
    this.sublevel = !this.sublevel
  }
  setSublevelClose() {
    this.sublevel = false
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
