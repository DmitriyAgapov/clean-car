import { observable, action, makeObservable } from 'mobx';
import { AxiosError } from 'axios';
import agent from '../utils/agent';
import userStore, { User } from './userStore';
import appStore from "./appStore";
import data, { decodeToken } from "utils/getData";


export class AuthStore {
  inProgress = false;
  errors:any = undefined ;

  values = {
    username: '',
    email: '',
    password: '',
  };

  constructor() {
    makeObservable(this, {
      inProgress: observable,
      errors: observable,
      values: observable,
      setUsername: action,
      setEmail: action,
      setPassword: action,
      reset: action,
      login: action,
      // register: action,
      logout: action
    });
  }

  setUsername(username: string) {
    this.values.username = username;
  }

  setEmail(email: string) {
    this.values.email = email;
  }

  setPassword(password: string) {
    this.values.password = password;
  }

  reset() {
    this.values.username = '';
    this.values.email = '';
    this.values.password = '';
  }

  login() {
    this.inProgress = true;
    this.errors = undefined;
    return agent.Auth.login(this.values.email, this.values.password)
      .then(response => {
        appStore.setToken(response.access)
    }).then(() => {
      return console.log();
    })
      .catch(action((err: AxiosError) => {
        this.errors = err.response && err.response.data;
        throw err;
      }))
      .finally(action(() => { this.inProgress = false; }));
  }
  //
  // register() {
  //   this.inProgress = true;
  //   this.errors = undefined;
  //   return agent.Auth.register(this.values.username, this.values.email, this.values.password)
  //     .then(({ user }: { user: User }) => commonStore.setToken(user.token))
  //     .then(() => userStore.pullUser())
  //     .catch(action((err: ResponseError) => {
  //       this.errors = err.response && err.response.body && err.response.body.errors;
  //       throw err;
  //     }))
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
