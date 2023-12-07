import { flow, makeObservable, observable } from 'mobx';
import agent from "utils/agent";
import { Company } from "stores/companyStore";
import { Permissions } from "stores/permissionStore";

enum UserTypeEnum {
	admin,
	customer,
	executor
}

export type User = {
	id: string;
	phone: string;
	email: string;
	userType?: UserTypeEnum
	first_name:	string
	last_name: string;
	group?: number
	is_active: boolean
	staff_group?: number
	password?: string;
	password2?: string;
}

export class UsersStore {
	users: (User & Company & Permissions)[] = observable.array([])
	loadingUsers: boolean = false;
	loadingErrors?: any;
	constructor() {
		makeObservable(this, {
			users: observable,
			// getUser: action,
			loadingUsers: observable,
		});
	}
	// getUser = flow(function* (id:string) {
	// 	this.loadingUsers = true
	// 	try {
	// 		const { data } = yield  agent.Users.getAllUsers();
	//
	// 		this.users = data.results
	// 		this.loadingUsers = false
	// 	} catch (error) {
	// 		this.loadingErrors = "error"
	// 	}
	// }),
	 getAllUser = flow(function* (this: UsersStore) {
		this.loadingUsers = true
		 try {
			 const { data } = yield  agent.Users.getAllUsers();

			 this.users = data.results
				 this.loadingUsers = false
		 } catch (error) {
			 this.loadingErrors = "error"
		 }
	})
}
const usersStore = new UsersStore()
export default usersStore;
