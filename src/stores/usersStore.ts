import { flow, makeAutoObservable, get, set, observable, action, computed, runInAction, reaction } from "mobx";
import agent from 'utils/agent'
import companyStore, { CompanyType } from "stores/companyStore";
import { makePersistable, hydrateStore  } from 'mobx-persist-store';
import permissionStore from "stores/permissionStore";
import stores from "stores/index";
import label from "utils/labels";
import userStore from "stores/userStore";
import appStore from "stores/appStore";
import paramsStore from "stores/paramStore";
import { paginationParams, paginationParamss } from "utils/fetchers";


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
      console.log(!this.usersData);
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
        console.log(paramsStore.qParams);
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
      const datas = yield agent.Account.createCompanyUser(companyid, data)
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
      const datas = yield agent.Account.updateCompanyUser(companyid, data)
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
    console.log(this.companyUsersSelected.get(String(id)));
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
  async getUsers(company_id: any) {
    const {data} = await agent.Account.getCompanyUsers(Number(company_id))
    runInAction(() => this.companyUsers = data.results)
    action(() => this.companyUsers = data.results)
    return await data.results
  }
  get currentCompanyUsers() {
    return this.companyUsers
  }
  getUser = flow(function* (this: UsersStore, companyid: number | string, id: string | number, company_type: CompanyType) {
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
          console.log(company_type);
          const data  = yield companyStore.loadCompanyWithTypeAndId(company_type, Number(companyid));
          console.log(data);
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
      console.log(data);
      console.log(values);
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
