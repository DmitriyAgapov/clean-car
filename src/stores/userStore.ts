import { action, flow, makeObservable, observable } from 'mobx';
import agent from "utils/agent";
import authStore from "stores/authStore";
import type { AccountProps, Permissions } from 'stores/permissionStore'
import { GroupProps } from "stores/permissionStore";
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
	password?: string;
	password2?: string;
	is_superuser?: boolean;
	is_staff?: boolean
	staff_group?: GroupProps
	is_active?: boolean
	account_bindings?: AccountProps[]

}

export class UserStore {
	currentUser?: User;
	currentUserActiveAccount?: UserTypeEnum
	loadingUser?: boolean;
	updatingUser?: boolean;
	updatingUserErrors: any;

	constructor() {
		makeObservable(this, {
			currentUser: observable,
			loadingUser: observable,
			currentUserActiveAccount: observable,
			updatingUser: observable,
			updatingUserErrors: observable,
			loadMyProfile: action,
			// setUser: action,
			// updateUser: action,
			forgetUser: action
		});

	}

	pullUser() {
		this.loadingUser = true;
		return agent.Auth.current()
			.then(action((r:any) => {this.currentUser =  r;}))
			.finally(action(() => {this.loadingUser = false;}))
	}
	loadMyProfile = flow(function* (this: UserStore) {
		this.loadingUser = true
		try {
			const { data } = yield  agent.Profile.getMyAccount();

			this.currentUser = data
			this.loadingUser = false
		} catch (error) {
			this.updatingUserErrors = "error"
		}
	})
	// updateUser(newUser: User) {
	// 	this.updatingUser = true;
	// 	return agent.Auth.save(newUser)
	// 	.then(action(({ user }: { user: User }) => { this.currentUser = user; }))
	// 	.finally(action(() => { this.updatingUser = false; }))
	// }

	forgetUser() {
		this.currentUser = undefined;
	}
}
const userStore = new UserStore()
export default userStore;
