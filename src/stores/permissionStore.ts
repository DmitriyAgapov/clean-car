import { action, autorun, IObservableArray, makeObservable, observable, runInAction } from 'mobx';
import agent from "utils/agent";
import authStore from "stores/authStore";
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
	'Финансовый блок'
}
export type Permissions = {
	id: string;
	name: PermissionName;
	create: boolean;
	read: boolean;
	update: boolean;
	delete: boolean;
}

export class PermissionStore {
	permissions: IObservableArray<Permissions> = observable.array([], {
		deep: true
	});
	permissionsMap = observable.map();
	loadingPermissions: boolean = false;
	errors?: string
	constructor() {
		makeObservable(this, {
			permissions: observable,
			errors: observable,
			loadingPermissions: observable,
			loadPermissionAdmin: action,
			getPermissionAdmin: action,
			setPermissionStoreAdmin: action,
			createPermissionStoreAdmin: action,
			getAllPermissions: action
		});
		// autorun(() => {
		// 	console.log(this.permissions)
		// })
	}
	loadPermissionAdmin() {

			this.loadingPermissions = true;
			this.permissions.clear();
			// @ts-ignore
			agent.PermissionsAdmin.getAllAdminPermissions()
			.then(action((r) => {
				// @ts-ignore
				const {data: {results}} = r;
				this.permissions.push(...results);
			}))
			.catch(action((error) => this.errors = error))
			.finally(action(() => this.loadingPermissions = false));
	}
	getAllPermissions() {
		this.loadPermissionAdmin()
		return this.permissions
	}

	getPermissionAdmin(id: number) {
		this.loadingPermissions = true;
		console.log(id)
		return agent.PermissionsAdmin.retriveAdminGroupIdPermission(id)
			.then(r => r)
			.finally(() => this.loadingPermissions = false)

		// this.permissions.filter((value) => {
		// 	if(Number(value.id) === Number(id)) {
		// 		return value
		// 	}
		// 	this.loadingPermissions = false
		// })
	}
	setPermissionStoreAdmin(id: number, data:any) {
		this.loadingPermissions = true
		agent.PermissionsAdmin.putUpdateAdminPermissions(data.id, data);
		this.loadingPermissions = false
	}
	createPermissionStoreAdmin(data:any) {
		this.loadingPermissions = true
		agent.PermissionsAdmin.createAdminPermission(data)
		this.loadingPermissions = false
	}
}
const permissionStore = new PermissionStore()
export default permissionStore;
