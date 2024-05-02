import { action, makeAutoObservable, observable, reaction, runInAction } from "mobx";
import { AxiosError } from 'axios'
import agent from '../utils/agent'
import userStore from './userStore'
import appStore from './appStore'
import { makePersistable, clearPersistedStore  } from "mobx-persist-store";
import { notifications } from "@mantine/notifications";
import rootStore from "stores/index";

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
    makePersistable(this, {
      name: 'authStore',
      properties: ['userIsLoggedIn', 'inProgress','values'],
      storage: window.localStorage,
    }, {
      fireImmediately: true,
    })
    reaction(() => this.userIsLoggedIn,
      (userIsLoggedIn) => {

      if(userIsLoggedIn && appStore.token && appStore.token !== "") {

        userStore.pullUser()
        userStore.loadMyProfile()
      } else {
        clearPersistedStore('authStore').then((r) => console.log(r))
      }
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

         runInAction(() => {
           const { access } = data

           appStore.setToken(access)
         })
       },
     ).catch(
       action((err: AxiosError) => {
         this.errors = err
         // throw err
       }),
     )
   }
   return null
 }
 get isLoggedIn() {
    return this.userIsLoggedIn
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

  async login() {
    this.inProgress = true
    this.errors = undefined
    return await agent.Auth.login(this.values.email.toLowerCase(), this.values.password)
      .then((resolve: any) =>  {
        if(resolve && resolve.response && resolve.response.status > 299) {
          notifications.show({
            id: 'notlogged_in',
            withCloseButton: true,
            // onClose: () => console.log('unmounted'),
            // onOpen: () => console.log('mounted'),
            autoClose: 5000,
            title: "Error",
            message: `${resolve.response.data.detail}`,
            color: 'red',
            className: 'my-notification-class z-[9999] absolute top-12 right-12',
            loading: false,
          })
          return resolve
        } else {
          const { access, refresh } = resolve.data

          appStore.setToken(access)
          appStore.setTokenRefresh(refresh)
          this.userIsLoggedIn = true
          return resolve
        }
      }
      )
      // .catch((err: AxiosError) => {
      //     runInAction(() => {
      //
      //       console.log(err);
      //       // this.errors = err.response && err.response.data
      //     })
      //   },
      // )
      .finally(
        () => {
          this.inProgress = false
        })

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
    action(() => this.userIsLoggedIn = false)
    appStore.setToken(null)
    appStore.setTokenRefresh(null)
    userStore.forgetUser()

    console.log('logout');
    window.location.replace('/')
  }
}

const authStore = new AuthStore()
export default authStore
