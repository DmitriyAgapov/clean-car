import { action, flow, IObservableArray, makeObservable, observable } from 'mobx'
import agent from 'utils/agent'
import { Company, CompanyStore } from 'stores/companyStore'
import usersStore from "stores/usersStore";
import userStore from "stores/userStore";
import rootStore from "stores/index";
import appStore from "stores/appStore";

export enum PermissionName {
  'Компании' = 'companies',
  'Управление филиалами'  = 'filial',
  'Управление пользователями' = 'users',
  'Управление автомобилями' = 'cars',
  'Управление заявками' = 'bids',
  'Управление прайс-листом' = 'price',
  'Управление лимитами' = 'limits',
  'Управление справочниками' = 'references',
  'Финансовый блок' = 'finance',
  // 'Расчетный блок' = 'calculate',
  // 'Индивидуальный расчет' = 'individual_calculate'
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
    makeObservable(this, {
      permissions: observable,
      companyPermissions: observable,
      errors: observable,
      loadingPermissions: observable,
      loadPermissionAdmin: action,
      getPermissionAdmin: action,
      deletePermissionStore: action,
      setPermissionStoreAdmin: action,
      createPermissionStoreAdmin: action,
      createPermission: action,
      getAllPermissions: action,
      loadCompanyPermissions: action,
      getPermissions: action
    })
  }

  permissions: IObservableArray<Permissions> = observable.array([])
  companyPermissions: IObservableArray<Permissions> = observable.array([], {
    deep: true,
  })
  permissionsMap = observable.map()
  loadingPermissions: boolean = false
  errors?: string
  getUserPermissions = flow(function*(this: PermissionStore, company_id: number, id: number, group_id?: number) {
    this.loadingPermissions = true
    let userGroup;
    try {
      const { data } = yield agent.Permissions.getUserPermissions(company_id, id);
      if (data) {
        userGroup = data
      }
    } catch (error) {
      this.errors = 'error'
    } finally {
      this.loadingPermissions = false
    }
    if(!userGroup?.id) {
      try {
        const { data } = yield agent.PermissionsAdmin.getAdminGroupIdPermission(userGroup.user?.group?.id)
        if (data) {
          userGroup = data
        }
      } catch (error) {
        this.errors = 'error'
      }
      finally {
        this.loadingPermissions = false
      }
    }
    return userGroup
  })
  loadCompanyPermissions = flow(function*(this: PermissionStore, company_id?: number, group?: number) {
    this.companyPermissions.clear()
    group = group ? group : userStore.currentUser?.company?.id
    try {
      if(group && group !== 0 && company_id) {
        // console.log('with group');
        const permissions = yield agent.Permissions.getAllCompanyPermissions(company_id)
        this.companyPermissions = permissions.data.results;
        // console.log(permissions);
        // @ts-ignore
        if (permissions.data.results.length == 0 && group) {
          this.companyPermissions = yield agent.PermissionsAdmin.getAdminGroupIdPermission(group)
          // console.log(this.companyPermissions)
          // console.log(permissions.data.results.length == 0);
        }
        if (permissions.status === 200) {
          // @ts-ignore
          this.companyPermissions = permissions.data.results
        }
      } else if(company_id) {
        const {data, status} = yield agent.Permissions.getAllCompanyPermissions(company_id)
        if (status === 200) {
          // @ts-ignore
          this.companyPermissions = data.results
        }
      }
      // const permissions =
    } catch (e) {
      new Error('Create Company failed')
    } finally {

    }
    return this.companyPermissions
  })
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

  })
  getPermissionByGroupId = flow(function*(this: PermissionStore, id: number) {
    const company_id = userStore.currentUser?.company?.id
    // console.log(company_id);
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
  getPermissions = flow(function *(this: PermissionStore) {
    if(userStore.currentUser?.is_staff) {
      // console.log('is admin', this.permissions);

        const {data, status} = yield agent.PermissionsAdmin.getAllAdminPermissions()
        if (status === 200) {
          //@ts-ignore
          const { results } = data
          this.permissions = results
          return results
        }

    }
    if(userStore.currentUser && !userStore.currentUser.is_staff) {
      // console.log('is not admin', 'company_id', userStore.currentUser?.company?.id);
      if(userStore.currentUser?.company?.id) {

        const {data, status} = yield agent.Permissions.getAllCompanyPermissions(userStore.currentUser?.company?.id)
        if (status === 200) {
          // console.log(data);
          //@ts-ignore
          const { results } = data
          this.permissions = results
          return results
        }
      }
    }
    return this.permissions
  })
  createPermission = flow(function*(this: PermissionStore, data: any) {
    this.loadingPermissions = true
    try {
      if(userStore.currentUser?.is_staff) {
        yield agent.PermissionsAdmin.createAdminPermission(data)
      }
      if(!userStore.currentUser?.is_staff && userStore.currentUser?.company?.id) {
        yield agent.Permissions.createPermission(userStore.currentUser?.company?.id, data)
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
    // console.log(company_id);
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

  async loadPermissionAdmin() {
    this.loadingPermissions = true
    this.permissions.clear()
    // @ts-ignore
    try {
      const data = await agent.PermissionsAdmin.getAllAdminPermissions()
      if (data.status === 200) {
        //@ts-ignore
        const { results } = data.data
        this.permissions = results
      }
    } catch (error) {
      throw new Error('Fetch data companies failed')
    } finally {
      this.loadingPermissions = false

    }
  }

  getAllPermissions() {
    this.loadPermissionAdmin()
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

  createPermissionStoreAdmin(data: any) {
    this.loadingPermissions = true
    agent.PermissionsAdmin.createAdminPermission(data)
    this.loadingPermissions = false
  }

}

const permissionStore = new PermissionStore()
export default permissionStore
