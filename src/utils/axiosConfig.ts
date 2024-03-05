import axios, { AxiosHeaders } from "axios";
import agent from "utils/agent";
import paramsStore from "stores/paramStore";
import { boolean, string } from "yup";
import { action, runInAction } from "mobx";
import appStore from "stores/appStore";

axios.interceptors.request
	.use(
		async (config,  ) => {
			// if(config.params) {
			// 	console.log('config.params', config);
			// 	paramsStore.setParams(config.params)
			// }
			if (window.sessionStorage.getItem('jwt')) {
				// @ts-ignore
				config.headers = {
					Authorization: `Bearer ${window.sessionStorage.getItem('jwt')}`
				};
			}
			return config;
		},
		(error) => Promise.reject(error)
)


//
axios.interceptors.response.use(
		(response) => response,
		async (error) => {
			const config = error.config;
			if (error.response.status === 401 && !config._retry) {
				const tokenRefresh = window.sessionStorage.getItem('jwt_refresh')
				config._retry = true;
				if(tokenRefresh) {
			  agent.Auth.tokenRefresh(tokenRefresh).then((response: any) => {
				console.log(response);
				runInAction(() => {
					appStore.token && localStorage.setItem("jwt", appStore.token)
				})
			}).finally(	() =>	config._retry = false)
				}
				return axios(config);
			}

			return Promise.reject(error);
		})
