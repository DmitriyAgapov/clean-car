import { action, makeAutoObservable, makeObservable, observable, reaction } from 'mobx'
import { ReactNode } from "react";
import userStore, { UserTypeEnum } from "./userStore";
import { PermissionName, Permissions } from "stores/permissionStore";
import label from 'utils/labels'
import { makePersistable } from 'mobx-persist-store'

export class AppStore {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true } )

    makePersistable(this, {
      name: 'appStore',
      properties: ['appTheme', 'appType','appName', 'appRouteName','appPermissions'],
      storage: window.localStorage,
    });
    reaction(
      () => this.token,
      (token) => {
        if (token) {
          window.localStorage.clear();
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
        let ar = new Map([]);

        if(appType === UserTypeEnum.admin) {
          console.log('admin');
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
            console.log(this.appPermissions);
          }
          if(userStore.currentUser.is_staff && userStore.currentUser.staff_group) {
            this.appPermissions = userStore.currentUser.staff_group.permissions
          }
          this.appPermissions?.forEach((item) => {
            const exepctions = ['Компании', 'Расчетный блок', 'Финансовый блок']

            if(exepctions.indexOf(item.name) == -1) {
              // @ts-ignore
              ar.set(PermissionName[item.name], item)
            }

          })
        }
        userStore.setCurrentPermissions(observable.map(ar));

      })
    )
  }

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

  setAppType(type: UserTypeEnum) {
    // console.log(type);
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

  setModal({ state, text = '', component, actions ,className = '', header}: {component?: ReactNode, header?: string | ReactNode | ReactNode[]; state: boolean; className?: string, text?: string | ReactNode | ReactNode [] | undefined; actions: ReactNode }) {
    if(text) {
      this.modal = { state: state, text: text, className: className, actions: actions, header: header }
    }
    if(component) {
      this.modal = { state: state, className: className, component: component, actions: actions, header: header }
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
    // console.log(this.asideState);
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
