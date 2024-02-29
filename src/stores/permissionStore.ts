import { action, autorun, computed, flow, IObservableArray, makeAutoObservable, makeObservable, observable, reaction, runInAction, set, toJS } from "mobx";
import agent from 'utils/agent'
import { Company } from 'stores/companyStore'
import userStore from "stores/userStore";
import appStore from "stores/appStore";
import useAxios from 'axios-hooks'
import { makePersistable } from "mobx-persist-store";
import { defer } from "react-router-dom";
import company from "routes/company/company";

export enum PermissionName  {
  'Компании' = 'companies',
  'Управление филиалами'  = 'filial',
  'Управление пользователями' = 'users',
  'Управление автомобилями' = 'cars',
  'Управление заявками' = 'bids',
  'Управление прайс-листом' = 'price',
  'Управление лимитами' = 'limits',
  'Управление справочниками' = 'references',
  'Финансовый блок' = 'finance'
}
export enum PermissionNames  {
  'Компании' = 'Компании',
  'Управление филиалами' = 'Управление филиалами',
  'Управление пользователями' = 'Управление пользователями',
  'Управление автомобилями' = 'Управление автомобилями',
  'Управление заявками' = 'Управление заявками',
  'Управление прайс-листом' = 'Управление прайс-листом',
  'Управление лимитами' = 'Управление лимитами',
  'Управление справочниками' = 'Управление справочниками',
  'Финансовый блок' = 'Финансовый блок',
}

export type AccountProps = {
  company: Company<any>
  group: GroupProps
  id: number
}
export type CRUD = {
  create: boolean
  read: boolean
  update: boolean
  delete: boolean
}
export type Permissions = {
  id: string
  name: PermissionName
} & CRUD

export type GroupProps = {
  id: number
  name: string
  permissions: Permissions[]
  created: string
}

export class PermissionStore {
  constructor() {
    makeAutoObservable(this, {
      allPermissionsState: computed,
      aPState: computed
    }, {autoBind: true})
    makePersistable(this, {
      name: 'permissionStore',
      properties: [
        'errors',
        'loadingPermissions',
        'companyPermissions',
        'permissionsMap',
        'permissions'
      ],
      storage: window.localStorage,
    }, {fireImmediately: true})
    reaction(() => this.permissions,
      () => {

      })

  }

  permissions: IObservableArray<Permissions> = observable.array([])
  companyPermissions:IObservableArray<Permissions> = observable.array([])
  adminPermissions:IObservableArray<Permissions> = observable.array([])
  permissionsMap = observable.map()
  loadingPermissions: boolean = false
  errors: any
  getPermissionAdmin = flow(function*(this: PermissionStore, id: number) {
    this.loadingPermissions = true
    try {
        const { data, status } = yield agent.PermissionsAdmin.getAdminGroupIdPermission(id)
        if (status === 200) {
          return data
        }
      }
     catch (error) {
      this.errors = 'error'
    } finally {
      this.loadingPermissions = false
    }
    this.loadingPermissions = false
  })
  getPermissionByGroupId = flow(function*(this: PermissionStore, id: number) {
    const company_id = userStore.myProfileData.company.id

    try {
      if(company_id) {
        const { data, status } = yield agent.Permissions.getPermissionById(company_id, id)
        if (status === 200) {
          return data
        }
      }
    } catch (error) {
      this.errors = 'error'
    }
  })
  createPermission = flow(function*(this: PermissionStore, data: any) {
    this.loadingPermissions = true
    try {
      if(userStore.currentUser?.is_staff) {
         agent.PermissionsAdmin.createAdminPermission(data)
      }
      if(!userStore.currentUser?.is_staff && userStore.currentUser?.company?.id) {
         agent.Permissions.createPermission(userStore.currentUser?.company?.id, data)
      }

    } catch (error) {
      this.errors = 'error'
    } finally {
      this.loadingPermissions = false
    }
  })
  getPermissionById = flow(function*(this: PermissionStore, permission_id: number ) {
    this.loadingPermissions = true
    let company_id = userStore.currentUser?.company?.id

    try {
      if(userStore.currentUser?.is_staff) {
        const {data, status} = yield agent.PermissionsAdmin.getAdminGroupIdPermission(permission_id)
        if (status === 200) {
          //@ts-ignore
          const { results } = data
          this.permissions = results
        }
      }
      if(!userStore.currentUser?.is_staff && userStore.currentUser?.company?.id) {
        const {data, status} = yield agent.Permissions.getPermissionById(userStore.currentUser?.company?.id, permission_id)
        if (status === 200) {
          //@ts-ignore
          const { results } = data
          this.permissions = results
        }
      }

    } catch (error) {
      this.errors = 'error'
    } finally {
      this.loadingPermissions = false
    }
    this.loadingPermissions = false
  })

  setPermissionStore = flow(function *(this: PermissionStore, id: number, data: any) {
    this.loadingPermissions = true
    let company_id = userStore.currentUser?.company?.id
    if (appStore.appType !== 'admin' && company_id) {
      try {
        const response = yield agent.Permissions.putUpdatePermissions(company_id, data.id, data)
      if (response.status === 200) {
        const { data } = response
        return response
      }

      } catch (error) {
        this.errors = 'error'
      }
      finally {
        this.loadingPermissions = false
      }
    } else {
      this.setPermissionStoreAdmin(id, data)
    }
    this.loadingPermissions = false
  })
  deletePermissionStore = flow(function *(this: PermissionStore, id: number) {
    this.loadingPermissions = true
    let company_id = userStore.currentUser?.company?.id
    if (appStore.appType !== 'admin' && company_id) {
      try {
        const response = yield agent.Permissions.deletePermission(company_id, id)
        if (response.status === 200) {
          const { data } = response
          return response
        }

      } catch (error) {
        this.errors = 'error'
      }
      finally {
        this.loadingPermissions = false
      }
    } else {
      yield this.deletePermissionStoreAdmin(id)
    }
    this.loadingPermissions = false
  })
  getPermissionsFlow = flow(function*(this: PermissionStore) {
    this.companyPermissions.clear()
    this.permissions.length = 0

    if(userStore.isAdmin) {
      this.loadingPermissions = true
       const response = yield agent.Permissions.getAllCompanyPermissions(1)

      if(response.status === 200) {
        console.log(response.data);
        this.permissions = response.data.results
      }
      this.loadingPermissions = false

    } else if(userStore.myProfileData.company?.id && !userStore.isAdmin) {
        this.loadingPermissions = false
        const response = yield agent.Permissions.getAllCompanyPermissions(userStore.myProfileData.company.id)
      if(response.status === 200) {
        this.permissions = response.data.results
      }
      this.loadingPermissions = false

      }
  })

  get allPermissionsState() {
    return {
      loading: this.loadingPermissions,
      groups: this.permissions,
      errors: this.errors
    }
  }

  get aPState () {
      const [{ data:getData, loading: getLoading, error: getError, response }, refetch] = useAxios(
        "https://dev.server.clean-car.net/api/accounts/my_profile/"
      );
      return [getData, getLoading, getError, refetch]
  }

  getPermissions() {
    this.companyPermissions.clear()
    this.permissions.length = 0

    if(userStore.currentUser.is_staff) {
      this.loadingPermissions = false
       agent.PermissionsAdmin.getAllAdminPermissions()
        .then(action((response:any) => response.data))
        .then(((data:any) => {
          set(this.permissions, data.results)
      }))
        .catch(action((error:any) => this.errors = error))
        .finally(action(() => this.loadingPermissions = false))

    } else if(userStore.myProfileData.company?.id && !userStore.isAdmin) {
        agent.Permissions.getAllCompanyPermissions(userStore.myProfileData.company.id)
        .then(action((response:any) => response.data))
        .then(action((data:any) => this.permissions.push(data)))
        .catch(action((error:any) => this.errors = error))
        .finally(action(() => this.loadingPermissions = false))

      }
    return this.permissions
  }

  loadCompanyPermissions = flow(function*(this: PermissionStore,company_id: number) {
    this.companyPermissions.clear()
    this.loadingPermissions = true
    let res;
    const {status, data} = yield agent.Permissions.getAllCompanyPermissions(company_id)
    console.log(data);
    if(status === 200) {
      this.companyPermissions = data.results
      return data.results
    }
    this.loadingPermissions = false
  })
  loadCompanyPermissionsResults = flow(function*(this: PermissionStore,company_id: number) {
    this.companyPermissions.clear()
    this.loadingPermissions = true
    let res;
    const {status, data} = yield agent.Permissions.getAllCompanyPermissions(company_id)
    if(status === 200) {
        this.companyPermissions = data.results
    }
    this.loadingPermissions = false
  })

  getUserPermissions(company_id: number, id: number, group_id: number) {
    this.loadingPermissions = true
    if(userStore.isAdmin) {
      agent.Permissions.getUserPermissions(company_id, id).then((response: any) => response.data).then((data: any) => {
        this.permissions.push(data.group)
        this.permissionsMap.set(data.group.id, data.group)
      }).catch((errors: any) => this.errors = errors)
    } else {
      agent.PermissionsAdmin.getAdminGroupIdPermission(group_id)
      .then((response:any) => response.data)
      .then((data:any) => {
        this.permissions.push(data.group)
        this.permissionsMap.set(data.group.id, data.group)})
      .catch((errors:any) => this.errors = errors)
    }
  }

  loadPermissionAdmin = flow(function* (this: PermissionStore) {
    this.loadingPermissions = true
    this.permissions.clear()
    // @ts-ignore
    try {
      const data = yield agent.PermissionsAdmin.getAllAdminPermissions()
      console.log(data);
      if (data.status === 200) {
        //@ts-ignore
        const { results } = data.data;
        set(this.permissions, results);

      }
    } catch (error) {
      throw new Error('Fetch data companies failed')
    } finally {
      this.loadingPermissions = false
    }
  })
  getPermissionsAdmin = flow(function* (this: PermissionStore) {
    this.loadingPermissions = true
    // @ts-ignore
    try {
      const data = yield agent.PermissionsAdmin.getAllAdminPermissions()
      if (data.status === 200) {
        //@ts-ignore
        const { results } = data.data

        return results

      }
    } catch (error) {
      throw new Error('Fetch data permissionsAdmin failed')
    } finally {
      this.loadingPermissions = false
    }
  })
  getAllPermissions() {
    this.loadingPermissions = true

      this.getPermissionsFlow()

    this.loadingPermissions = false
    return this.permissions
  }

  deletePermissionStoreAdmin(id: number) {
    this.loadingPermissions = true
    return agent.PermissionsAdmin.deleteAdminGroupIdPermission(id)
        .then((r) => r)
        .finally(() => (this.loadingPermissions = false))
  }

  setPermissionStoreAdmin(id: number, data: any) {
    this.loadingPermissions = true
    agent.PermissionsAdmin.putUpdateAdminPermissions(data.id, data)
    this.loadingPermissions = false
  }
  get getCompanyPermissions() {
    return this.companyPermissions
  }
  get getAdminPermissions() {
    if(this.permissions.length === 0) {
      this.loadPermissionAdmin()
    }
   return this.permissions
  }
  createPermissionStoreAdmin(data: any) {
    this.loadingPermissions = true
    agent.PermissionsAdmin.createAdminPermission(data)
    this.loadingPermissions = false
  }

}

const permissionStore = new PermissionStore()

export default permissionStore
