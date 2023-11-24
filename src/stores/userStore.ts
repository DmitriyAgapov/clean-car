import { observable, action, makeObservable } from 'mobx';
// import agent from '../agent';

export type User = {
	phone: string;
	email: string;
	first_name:	string
	last_name: string;
	password: string;
	password2: string;
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
			// pullUser: action,
			// updateUser: action,
			forgetUser: action
		});
	}

	// pullUser() {
	// 	this.loadingUser = true;
	// 	return agent.Auth.current()
	// 	.then(action(({ user }: { user: User }) => { this.currentUser = user; }))
	// 	.finally(action(() => { this.loadingUser = false; }))
	// }
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
