import axios from "axios";
import agent from "utils/agent";
import paramsStore from "stores/paramStore";

axios.interceptors.request
	.use(
		async (config, ) => {
			config.params && paramsStore.setParams(config.params)
			console.log(config)
			if (localStorage.getItem('jwt')) {
				// @ts-ignore
				config.headers = {
					authorization: `Bearer ${localStorage.getItem('jwt')}`
				};
			}
			return config;
		},
		(error) => Promise.reject(error)
)


//
// axios.interceptors.response.use(
// 		(response) => response,
// 		async (error) => {
// 			const config = error.config;
// 			if (error.response.status === 401 && !config._retry) {
// 				const tokenRefresh = localStorage.getItem('jwt_refresh')
// 				config._retry = true;
// 				if(tokenRefresh) {
// 			 agent.Auth.tokenRefresh(tokenRefresh).then((response: any) => {
// 				console.log(response);
// 				// runInAction(() => {
// 				// 	appStore.token && localStorage.setItem("jwt", appStore.token)
// 				// })
// 			}).finally(	() =>	config._retry = false)
// 				}
// 				return axios(config);
// 			}
//
// 			return Promise.reject(error);
// 		})
