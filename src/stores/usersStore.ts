import { flow, makeAutoObservable, get, set, observable, action, computed } from "mobx";
import agent from 'utils/agent'
import companyStore, { CompanyType } from "stores/companyStore";
import { makePersistable, hydrateStore  } from 'mobx-persist-store';
import permissionStore from "stores/permissionStore";
import stores from "stores/index";
import label from "utils/labels";


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
      properties: ['usersMap', 'companyUsers', 'companyUsersSelected'],
      storage: localStorage,
    });
  }
  usersMap = new Map([])
  users: User[] = []
  loadingUsers: boolean = false
  loadingErrors: any = ''
  companyUsers: User[] = observable.array([])
  companyUsersSelected: User[] = observable.array([])
  get usersList() {
    return ({
      users: this.companyUsers,
      loading: this.loadingUsers,
      errors: this.loadingErrors,
      selectedUsers: this.companyUsersSelected
    })
  }
  getAllUser = flow(function* (this: UsersStore) {
    this.loadingUsers = true
    this.usersMap = new Map([])
    try {
      const { data } = yield agent.Users.getAllUsers()
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
      new Error('create User failed')
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
      new Error('create User failed')
    }
    finally {
      this.loadingUsers = false
      this.hydrateStore()
    }
    return result
  })
  async getUsers(company_id: any) {
    return await agent.Account.getCompanyUsers(Number(company_id))
      .then((resolve: any) => resolve)
      .then((resolve: any) => resolve.data)
      .then(action((data) => this.companyUsers = data.results))
      .catch((error) => console.log(error))
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
          const data  = yield companyStore.loadCompanyWithTypeAndId(company_type, Number(companyid));
          // console.log(data);
          user = {
            ...user,
            company: {company_type: label(data.company.company_type), ...data.company.data}
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
  setLoadingErrors = (error: any) => {
    this.loadingErrors = error
  }
}

const usersStore = new UsersStore()
export default usersStore
