import { flow, makeAutoObservable, set, observable, action, computed, runInAction, reaction } from "mobx";
import agent, { client } from "utils/agent";
import companyStore, { CompanyType } from "stores/companyStore";
import { makePersistable, hydrateStore  } from 'mobx-persist-store';
import userStore from "stores/userStore";
import appStore from "stores/appStore";
import paramsStore from "stores/paramStore";
import { defer } from "react-router-dom";


enum UserTypeEnum {
  admin,
  customer,
  performer,
}

export type User = {
  id: string
  phone: string
  email: string
  userType?: UserTypeEnum
  first_name: string
  last_name: string
  group?: number
  is_active: boolean
  staff_group?: number
  password?: string
  password2?: string
}

export class UsersStore {
  constructor() {
    makeAutoObservable(this, {
      usersList: computed,
    }, { autoBind: true });
    makePersistable(this, {
      name: 'usersStore',
      properties: ['usersMap', 'companyUsers', 'usersData', 'companyUsersSelected'],
      storage: localStorage,
    });
    reaction(() => this.usersData,
    (userData) => {
      if(!userData) {
        this.getAllUser();
      }
    })
  }
  usersData:any
  usersMap = new Map([])
  users: User[] = []
  loadingUsers: boolean = false
  loadingErrors: any = ''
  companyUsers: User[] = observable.array([])
  companyUsersSelected =  observable.map({})

  get usersList() {
    return ({
      users: this.companyUsers,
      loading: this.loadingUsers,
      errors: this.loadingErrors,
      selectedUsers: this.companyUsersSelected
    })
  }
  get allUsersList() {

    return ({
      users: this.users,
      loading: this.loadingUsers,
      errors: this.loadingErrors,
      data: this.usersData
    })
  }

  getAllUser = flow(function* (this: UsersStore) {
    this.loadingUsers = true

    this.usersMap = new Map([])
    if(appStore.appType === "admin") {
      try {
        const { data } = yield agent.Users.getAllUsers(paramsStore.qParams)

        this.users = data.results
        this.usersData = data
        this.users.forEach((el: any) => {
          set(this.usersMap, { [el.employee.id]: {...el}
          })})
        this.loadingUsers = false
      } catch (error) {
        this.loadingErrors = 'error'
      }
      finally {
        this.loadingUsers = false
      }
    } else {
      try {
        const { data } = yield agent.Users.getCompanyUsers(userStore.myProfileData.company.id, paramsStore.qParams)

        this.usersData = data
        this.users = data.results
        this.users.forEach((el: any) => {
          set(this.usersMap, { [el.employee.id]: {...el}
          })})
        this.loadingUsers = false
      } catch (error) {
        this.loadingErrors = 'error'
      }
      finally {
        this.loadingUsers = false
      }
    }

  })

  hydrateStore = flow(function*(this: UsersStore) {
    yield hydrateStore(this);
  })

  createUser = flow(function* (this: UsersStore, companyid: number, data: any) {
    this.loadingUsers = true
    this.loadingErrors = ''
    let result;
    try {
      const datas:any = yield agent.Account.createCompanyUser(companyid, data)
      result = datas
      if(datas.response.status > 299) {
        this.loadingErrors = datas.response.data
      }
      return result
    } catch (error) {
      // new Error('create User failed')
    }
    finally {
      this.loadingUsers = false
      this.hydrateStore()
    }
    return result
  })
  updateUser = flow(function* (this: UsersStore, companyid: number, data: any) {
    this.loadingUsers = true
    this.loadingErrors = ''
    let result;
    try {
      const datas:any = yield agent.Account.updateCompanyUser(companyid, data)
      result = datas
      if(datas.response.status > 299) {
        this.loadingErrors = datas.response.data
      }
      return result
    } catch (error) {
      // new Error('create User failed')
    }
    finally {
      this.loadingUsers = false
      this.hydrateStore()
    }
    return result
  })
  get selectedUsers() {
    return this.companyUsersSelected
  }
  clearSelectedUsers() {
    this.companyUsersSelected.clear()
  }
  addToSelectedUsers(id:number) {
    this.companyUsersSelected.set(String(id), this.companyUsers.filter((e: any) => e.employee.id == Number(id))[0])
  }
  removeFromSelectedUsers(id:number) {
    this.companyUsersSelected.delete(String(id))
  }

  get allUsers() {
    return this.usersMap
  }

  setToCompanyUsersSelected(ar: any) {
    this.companyUsersSelected = observable.map(ar.map((el:any) => [el, this.companyUsers.filter((e: any) => e.employee.id == el)[0]]))
  }

  addTocompanyUsersSelected(id:number, data: any) {
    // @ts-ignore
    this.companyUsersSelected.set(id, data)
  }

  getUsers = flow(function *(this: UsersStore, company_id: any) {
    console.log(company_id);
    try {
      const { data, status } = yield agent.Account.getCompanyUsers(Number(company_id))
      if (status === 200) {
        //
        runInAction(() => {
          this.companyUsers = data.results
        })
        return data.results
      }
    } catch (e) {
       console.log(e)
    }

  })

  get currentCompanyUsers() {
    return this.companyUsers
  }
  async userLoader({company_type, id, company_id}: any) {
    let user:{
      group?: any
      company?:any
      employee?: any
    } = {}
    const _employee = await agent.Account.getCompanyUser(Number(company_id), Number(id)).then((r:any) => {
      if(r.status === 200) {
        user.employee = r.data
        return r.data
      }
    })
    const groups = await agent.Permissions.getAllCompanyPermissions(company_id).then(r => r.data).then(r => r.results)
    const _company = (async () => {
      if(appStore.appType === "admin") {
        if(company_type !== "admin") {
          return agent.Companies.getCompanyData(company_type, Number(company_id)).then((r: any) => {
            if (r.status === 200) {
              // user.company = {
              //   ...r.data,
              //   groups: groups.results
              // }
              return r.data
            }
          })
        } else {
          return {...userStore.myProfileData.company,  groups: groups.results}
        }
      } else {
        if(company_id === userStore.myProfileData.company.id) {
          return  userStore.myProfileData.company
        }
        // const company = await agent.Filials.getFilial(company_type, company_id, id).then(r => r.data)
        return  await agent.Filials.getFilials(company_type, Number(company_id)).then((r: any) => {
          if (r.status === 200) {
            user.company = {
              ...r.data.results[0],
              groups: groups.results
            }
            return r.data.results[0]
          }
        })
        // return  await agent.Companies.getCompanyData(company_type, Number(company_id)).then((r: any) => {
        //   console.log(r);
        //   if (r.status === 200) {
        //     user.company = {
        //       ...r.data,
        //       groups: groups.results
        //     }
        //     return r.data
        //   }
        // })
      }
    })()

    const _group = agent.Permissions.getUserPermissions(Number(company_id), Number(user.employee.group)).then((r:any) => {
      if(r.status === 200) {
        // user.group = r.data
        return r.data
      }
    });
    const _user = await Promise.all([_company, _employee, _group, groups]).then((r) => {
      if(r) {
        return {
          employee: r[1],
          company: {
            ...r[0],
            groups: r[3]
          },
          group: r[2],
        }
      }
    })
    console.log(_user);
    return _user
  }
  getUser = flow(function* (this: UsersStore, companyid: number | string, id: string | number, company_type?: CompanyType) {
    let user: any = {}
    if(companyid && company_type && id) {
      try {
        const data  = yield agent.Account.getCompanyUser(Number(companyid), Number(id));
        user.employee = data.data
      } catch (error) {
        new Error('get User failed')
      }
      try {
        if(company_type) {
          const data  = yield companyStore.loadCompanyWithTypeAndId(company_type, Number(companyid));

          user = {
            ...user,
            company: {company_type: data.company.company_type, ...data.company.data}
          }
        }
      }
      catch (e) {
        new Error('get User company failed')
      }
      try {
        const { data } = yield agent.Permissions.getUserPermissions(Number(companyid), Number(user.employee.group));
        user = {
          ...user,
          group: data
        }
      }
      catch (e) {
        new Error('get User permissions failed')
      }
    }
    return user
  })

  async loadUserList(args:any) {
    if(appStore.appType === "admin") {
      return agent.Account.accountsAllUsers(args).then(r => r.data)
    } else {
      return agent.Account.accountsUsersList(userStore.myProfileData.company.id, args).then(r => r.data)
    }
  }
  async createNewUser( edit:boolean, values:any) {
    let res: any
    if(edit) {
      const data = {
        id: values.id,
        phone: values.phone.replace(/\s+/g, ''),
        email: values.email,
        first_name: values.first_name,
        last_name: values.last_name,
        group: Number(values.group),
        is_active: values.is_active === "true",
      }
      return this.updateUser(values.company_id, data);

    } else {
      const data = {
        phone: values.phone.replace(/\s+/g, ''),
        email: values.email,
        first_name: values.first_name,
        last_name: values.last_name,
        group: Number(values.group),
        is_active: values.is_active === "true",
      }
      return this.createUser(values.company_id, data)
    }
  }
  setLoadingErrors = (error: any) => {
    this.loadingErrors = error
  }
}

const usersStore = new UsersStore()
export default usersStore
