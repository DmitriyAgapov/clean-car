import axios from "axios";
import appStore from "stores/appStore";
import authStore from "stores/authStore";

axios.interceptors.request.use(
		async (config) => {
			if (appStore.token) {
				// @ts-ignore
				config.headers = {
					authorization: `Bearer ${appStore.token}`
				};
			}
			return config;
		},
		(error) => Promise.reject(error)
)

axios.interceptors.response.use(
		(response) => response,
		async (error) => {
			const config = error.config;
			console.log(error);
			if (error.response?.status === 401 && !config._retry) {
				console.log('old token', appStore.token);
				config._retry = true;
				authStore.refreshToken()
					.then(() => appStore.token && localStorage.setItem("jwt", appStore.token))
				console.log('new token', appStore.token);
				return axios(config);
			}

			return Promise.reject(error);
		})
