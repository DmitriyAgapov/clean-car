import { action, makeObservable, observable, reaction } from "mobx";
import { ReactNode } from "react";
import userStore, { UserTypeEnum } from "./userStore";
import { Company } from "stores/companyStore";
import heading from "components/common/ui/Heading/Heading";

export class AppStore {
  appName = 'CleanCar'
  appRouteName = '.авторизация'
  appTheme = 'dark'
  token = window.localStorage.getItem('jwt')
  tokenFull: {} | null = null
  appLoaded = false
  burgerState: boolean = false
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
      appLoaded: observable,
      burgerState: observable,
      appTheme: observable,
      setToken: action,
      appType: observable,
      setFullToken: action,
      setTheme: action,
      setAppLoaded: action,
      setBurgerState: action,
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
  }

  setAppType(type: UserTypeEnum) {
    this.appType = type

    let routeName = ''
    switch (this.appType) {
      case UserTypeEnum.admin:
        routeName = 'администратор системы'
        break
      case UserTypeEnum.executor:
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
