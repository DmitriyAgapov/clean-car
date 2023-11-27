import { action, makeObservable, observable, reaction } from 'mobx';

export class AppStore {
	appName = 'Clean Car';
	appRouteName = '.авторизация'
	appTheme = "dark";
	token = window.localStorage.getItem('jwt');
	appLoaded = false;

	constructor() {
		makeObservable(this, {
			appName: observable,
			token: observable,
			appRouteName: observable,
			appLoaded: observable,
			appTheme: observable,
			setToken: action,
			setTheme: action,
			setAppLoaded: action,
			setAppLoading: action,
			setAppRouteName: action
		});

		reaction(
			() => this.token,
			token => {
				if (token) {
					window.localStorage.setItem('jwt', token);
				} else {
					window.localStorage.removeItem('jwt');
				}
			}
		);
	}

	setToken(token: string | null) {
		this.token = token;
	}

	setTheme() {
		const themes = ['dark', 'light'];
		this.appTheme = (this.appTheme !== themes[0]) ? themes[0] : themes[1];
		const html = document.documentElement;
		html.setAttribute('data-theme', appStore.appTheme);
	}

	setAppLoaded() {
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
