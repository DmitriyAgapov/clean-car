import { action, makeObservable, observable, reaction } from 'mobx';
import { ReactNode } from 'react';
import userStore from "./userStore";

export class AppStore {
	appName = 'CleanCar';
	appRouteName = '.авторизация'
	appTheme = "dark";
	token = window.localStorage.getItem('jwt');
	tokenFull: {} | null = null;
	appLoaded = false;
	burgerState: boolean = false
	bodyRef = document.body;
	modal: {state: boolean, text: string, actions: ReactNode | null | undefined} = {
		state: false,
		text: "",
		actions: null
	}
	constructor() {
		makeObservable(this, {
			appName: observable,
			token: observable,
			modal: observable,
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
			setAppRouteName: action,
			setModal: action
		});
		reaction(
			() => this.token,
			token => {
				if (token) {
					window.localStorage.setItem('jwt', token);
					userStore.pullUser()
				} else {
					window.localStorage.removeItem('jwt');
				}
			},
		);
	}
	setModal({state, text, actions}:{state: boolean, text:string, actions: ReactNode | null }) {
		this.modal = {state: state, text: text, actions: actions}
	}
	closeModal() {
		this.modal = {
			state: false,
			text: "",
			actions: null
		}
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
