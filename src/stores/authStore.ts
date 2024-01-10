import { action, makeObservable, observable, reaction } from 'mobx'
import { AxiosError } from 'axios'
import agent from '../utils/agent'
import userStore from './userStore'
import appStore from './appStore'

export class AuthStore {
  constructor() {
    makeObservable(this, {
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
    reaction(
      () => this.values,
      (values) => {
        if (values.email.length > 0 && values.password.length > 0) {
          // console.log('ready to login', values.email, values.password)
        } else {
          // console.log('ready to login', values)
        }
      },
    )
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

  // register() {
  //   this.inProgress = true;
  //   this.errors = undefined;
  //
  //   return agent.Auth.register(this.values.first_name, this.values.last_name, this.values.email, this.values.phone, this.values.password)
  //       // @ts-ignore
  //     .then(response => console.log('registered new User', response.data))
  //     // .then(() => userStore.pullUser())
  //     // .catch(action((err: AxiosError) => {
  //     //   // @ts-ignore
  //     // this.errors = err.response && err.response.data && err.response.data.detail;
  //     //   throw err;
  //     // }))
  //     .finally(action(() => { this.inProgress = false; }));
  // }

  logout() {
    appStore.setToken(null)
    userStore.forgetUser()
    window.location.replace('/')
    return Promise.resolve()
  }
}

const authStore = new AuthStore()
export default authStore
