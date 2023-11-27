import { observable, action, makeObservable } from 'mobx';
import { AxiosError } from 'axios';
import agent from '../utils/agent';
import userStore from './userStore';
import appStore from "./appStore";
import data, { decodeToken } from "utils/getData";

export class AuthStore {
  inProgress = false;
  errors:any = undefined ;

  values = {
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    password: '',
  };

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
      logout: action
    });
  }

  setFirstname(first_name: string) {
    this.values.first_name = first_name;
  }
  setLastname(last_name: string) {
    this.values.last_name = last_name;
  }
  setPhone(phone: string) {
    this.values.phone = phone;
  }

  setEmail(email: string) {
    this.values.email = email;
  }

  setPassword(password: string) {
    this.values.password = password;
  }

  reset() {
    this.values.first_name = '';
    this.values.phone = '';
    this.values.last_name = '';
    this.values.email = '';
    this.values.password = '';
  }

  login() {
    this.inProgress = true;
    this.errors = undefined;
    return agent.Auth.login(this.values.email, this.values.password)
      .then((resolve: any) => {
        appStore.setToken(resolve.access)
    })
      .then(() => {
        if(appStore.token) {
          const dataUser = decodeToken(appStore.token);

          // @ts-ignore
          userStore.currentUser = { id: dataUser.user_id, first_name: dataUser.first_name, last_name: dataUser.last_name, phone: dataUser.phone, email: this.values.email}

        }
    })
      .catch(action((err: AxiosError) => {
        this.errors = err.response && err.response.data;
        throw err;
      }))
      .finally(action(() => { this.inProgress = false; }));
  }
  register() {
    this.inProgress = true;
    this.errors = undefined;
    return agent.Auth.register(this.values.first_name, this.values.last_name, this.values.email, this.values.phone, this.values.password)
      .then(action
          ((response :any) => {
            authStore.values = { ...response, password: this.values.password }
          }))
    .then(action(() => this.login()))
      .then(() => userStore.pullUser())
      .catch(action((err: AxiosError) => {
        // @ts-ignore
          this.errors = err.response && err.response.data && err.response.data.detail;
        throw err;
      }))
      .finally(action(() => { this.inProgress = false; }));
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
    appStore.setToken(null);
    userStore.forgetUser();
    return Promise.resolve();
  }
}
const authStore = new AuthStore()
export default  authStore;
