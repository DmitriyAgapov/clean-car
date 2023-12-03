import { action, IObservableArray, makeObservable, observable } from 'mobx';
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
	permissions: IObservableArray<Permissions> = observable.array([]);
	loadingPermissions: boolean = false;

	constructor() {
		makeObservable(this, {
			permissions: observable,
			loadingPermissions: observable
		});
	}
	async loadPermissionAdmin() {

			this.loadingPermissions = true;
			this.permissions.clear();
			// @ts-ignore
			const { data, status }  = await agent.PermissionsAdmin.getAllAdminPermissions();
			if(status == 200 && data){
				data.results.forEach((item: Permissions) => {
					this.permissions.push(item)
				})
			}
		console.log(this.permissions)
			this.loadingPermissions = false
	}
	getPermissionAdmin(id: number) {

		return this.permissions.filter((value) => {

			if(Number(value.id) === Number(id)) {

				return value
			}
		})
	}
	setPermissionStoreAdmin(id: number, data:any) {
		console.log(id, data)
		agent.PermissionsAdmin.putUpdateAdminPermissions(data.id, data);
	}
	createPermissionStoreAdmin(data:any) {
		agent.PermissionsAdmin.createAdminPermission(data)
	}
}
const permissionStore = new PermissionStore()
export default permissionStore;
