import { action, flow, IObservableArray, makeObservable, observable } from 'mobx'
import agent from 'utils/agent'
import { Company, CompanyStore } from 'stores/companyStore'

enum PermissionName {
  'Компании',
  'Управление филиалами и отделами заказчиками',
  'Управление филиалами и отделами исполнителей',
  'Управление пользователями',
  'Управление автомобилями',
  'Управление заявками',
  'Управление прайс-листом',
  'Управление лимитами',
  'Управление справочниками',
  'Финансовый блок',
}

export type AccountProps = {
  company: Company<any>
  group: GroupProps
  id: number
}
export type Permissions = {
  id: string
  name: PermissionName
  create: boolean
  read: boolean
  update: boolean
  delete: boolean
}
export type GroupProps = {
  id: number
  name: string
  permissions: Permissions[]
  created: string
}

export class PermissionStore {
  permissions: IObservableArray<Permissions> = observable.array([], {
    deep: true,
  })
  permissionsMap = observable.map()
  loadingPermissions: boolean = false
  errors?: string
  loadCompanyPermissions = flow(function*(companyStore: CompanyStore) {
    companyStore.loadingCompanies = false
    try {
      // const permissions =
    }
    catch (e) {
      companyStore.loadingError = true
      new Error('Create Company failed')
    }
    finally {
      companyStore.loadingCompanies = true
    }
  })

  constructor() {
    makeObservable(this, {
      permissions: observable,
      errors: observable,
      loadingPermissions: observable,
      loadPermissionAdmin: action,
      getPermissionAdmin: action,
      setPermissionStoreAdmin: action,
      createPermissionStoreAdmin: action,
      getAllPermissions: action,
    })
  }

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

  getPermissionAdmin(id: string) {
    this.loadingPermissions = true

    return agent.PermissionsAdmin.getAdminGroupIdPermission(id)
      .then((r) => r)
      .catch((error) => console.log(error))
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
