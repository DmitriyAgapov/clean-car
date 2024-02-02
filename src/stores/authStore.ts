import { action, flow, makeAutoObservable, makeObservable, observable, reaction, runInAction } from "mobx";
import { AxiosError } from 'axios'
import agent from '../utils/agent'
import userStore from './userStore'
import appStore from './appStore'

export class AuthStore {
  constructor() {
    makeAutoObservable(this, {
      inProgress: observable,
      errors: observable,
      values: observable,
      setFirstname: action,
      setLastname: action,
      setPhone: action,
      setEmail: action,
      setPassword: action,
      reset: action,
      login: action,
      register: action,
      logout: action,
    })
  }

  userIsLoggedIn: boolean = false
  inProgress = false
  errors: any = undefined
  values = {
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    password: '',
  }

   refreshToken() {
     if (appStore.tokenRefresh) {
       return agent.Auth.tokenRefresh(appStore.tokenRefresh).then((resolve: any) => resolve).then((data) => {
           console.log(data);
           runInAction(() => {
             const { access } = data
             console.log(access);
             appStore.setToken(access)
           })
         },
       ).catch(
         action((err: AxiosError) => {
           this.errors = err.response && err.response.data
           throw err
         }),
       )
     }
     return null
   }
  setFirstname(first_name: string) {
    this.values.first_name = first_name
  }

  setLastname(last_name: string) {
    this.values.last_name = last_name
  }

  setPhone(phone: string) {
    this.values.phone = phone
  }

  setEmail(email: string) {
    this.values.email = email
  }

  setPassword(password: string) {
    this.values.password = password
  }

  reset() {
    this.values.first_name = ''
    this.values.phone = ''
    this.values.last_name = ''
    this.values.email = ''
    this.values.password = ''
  }

  login() {
    this.inProgress = true
    this.errors = undefined

    return agent.Auth.login(this.values.email, this.values.password)
      .then(
        action((resolve: any) => {
          const { access, refresh } = resolve.data
          appStore.setToken(access)
          appStore.setTokenRefresh(refresh)
        }),
      )
      .catch(
        action((err: AxiosError) => {
          this.errors = err.response && err.response.data
          throw err
        }),
      )
      .finally(
        action(() => {
          this.inProgress = false
        }),
      )
  }

  register() {
    this.inProgress = true
    this.errors = undefined
    return agent.Auth.register(
      this.values.first_name,
      this.values.last_name,
      this.values.email,
      this.values.phone,
      this.values.password,
    )
      .then(
        action((response: any) => {
          authStore.values = { ...response, password: this.values.password }
        }),
      )
      .then(action(() => this.login()))
      .then(() => userStore.pullUser())
      .catch(
        action((err: AxiosError) => {
          // @ts-ignore
          this.errors = err.response && err.response.data && err.response.data.detail
          throw err
        }),
      )
      .finally(
        action(() => {
          this.inProgress = false
        }),
      )
  }
  logout() {
    appStore.setToken(null)
    appStore.setTokenRefresh(null)
    userStore.forgetUser()
    window.location.replace('/')
  }
}

const authStore = new AuthStore()
export default authStore
