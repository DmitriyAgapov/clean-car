import { action, makeObservable, observable, reaction } from 'mobx';
import userStore from "./userStore";
import { decodeToken } from "utils/getData";


export class AppStore {
	appName = 'CleanCar';
	appRouteName = '.авторизация'
	appTheme = "dark";
	token = window.localStorage.getItem('jwt');
	tokenFull: {} | null = null;
	appLoaded = false;
	burgerState: boolean = false
	bodyRef = document.body;
	constructor() {
		makeObservable(this, {
			appName: observable,
			token: observable,
			appRouteName: observable,
			appLoaded: observable,
			burgerState: observable,
			appTheme: observable,
			setToken: action,
			setFullToken: action,
			setTheme: action,
			setAppLoaded: action,
			setBurgerState: action,
			setAppLoading: action,
			setAppRouteName: action
		});
		reaction(
			() => this.token,
			token => {
				if (token) {
					window.localStorage.setItem('jwt', token);
					const dataUser = decodeToken(appStore.token);
					console.log(dataUser)
					userStore.pullUser()
					// userStore.currentUser = { id: dataUser.user_id, first_name: dataUser.first_name, last_name: dataUser.last_name, phone: dataUser.phone, email: this.values.email}



				} else {
					window.localStorage.removeItem('jwt');
				}
			},
		);
	}

	setToken(token: string | null) {
		this.token = token;
	}
	setFullToken(token: string | null | {}) {
		this.tokenFull = token;
	}

	setTheme() {
		const themes = ['dark', 'light'];
		this.appTheme = (this.appTheme !== themes[0]) ? themes[0] : themes[1];
		const html = document.documentElement;
		html.setAttribute('data-theme', appStore.appTheme);
	}
	setBurgerState() {

		if(!this.burgerState) {
			this.bodyRef.style.overflow = 'hidden';
		} else {
			this.bodyRef.style.overflow = 'initial';
		}
		this.burgerState = !this.burgerState;
	}
	setAppLoaded() {
		this.bodyRef.style.overflow = 'initial';
		this.appLoaded = true;
	}

	setAppLoading() {
		this.appLoaded = false;
	}


	setAppRouteName(route: string) {
		this.appRouteName = route;
	}

}
const appStore = new AppStore()

export default appStore;
