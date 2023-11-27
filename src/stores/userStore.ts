import { action, makeObservable, observable } from 'mobx';
import agent from "utils/agent";
import authStore from "stores/authStore";

export type User = {
	id: string;
	phone: string;
	email: string;
	first_name:	string
	last_name: string;
	password?: string;
	password2?: string;
}

export class UserStore {
	currentUser: User | undefined;
	loadingUser?: boolean;
	updatingUser?: boolean;
	updatingUserErrors: any;

	constructor() {
		makeObservable(this, {
			currentUser: observable,
			loadingUser: observable,
			updatingUser: observable,
			updatingUserErrors: observable,

			// setUser: action,
			// updateUser: action,
			forgetUser: action
		});

	}

	pullUser() {
		this.loadingUser = true;

		action(() => {
			// @ts-ignore
			this.currentUser =  {
				...agent.Auth.current(),
				email: authStore.values.email
			}
			console.log(this.currentUser)
		})


	}
	//
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
