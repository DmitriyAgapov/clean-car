import { action, makeObservable, observable } from 'mobx';
import appStore from "stores/appStore";
import agent from "utils/agent";

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
	currentUser?: User;
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


		return agent.Auth.current()
			.then(
				action((resolve:any) => {
					console.log(appStore.token)
					this.currentUser = {
						id: resolve.user_id,
						email: 'email@email.ru',
						first_name: 'test',
						last_name: 'setest',
						phone: '+7898798797'
					};
					console.log('resolvePullUser', resolve)
				})
			)
		// .then(action(({ user }: { user: User }) => { this.currentUser = user; }))
		.finally(action(() => { this.loadingUser = false; }))
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
