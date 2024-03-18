import axios from "axios";
import agent from "utils/agent";
import {  runInAction } from "mobx";
import appStore from "stores/appStore";

axios.interceptors.request
	.use(
		async (config,  ) => {
			// if(config.params) {
			// 	console.log('config.params', config);
			// 	paramsStore.setParams(config.params)
			// }
			if (window.localStorage.getItem('jwt')) {
				// @ts-ignore
				config.headers = {
					Authorization: `Bearer ${window.localStorage.getItem('jwt')}`
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
			console.log('/token/refresh/', config.url.includes('/token/refresh/'));
			if (error.response.status === 401 && !config.url.includes('/token/refresh/')) {
				const tokenRefresh = window.localStorage.getItem('jwt_refresh')
				console.log('tokenRefresh', tokenRefresh);
				// config._retry = true;
				if(tokenRefresh) {
				  await agent.Auth.tokenRefresh(tokenRefresh)
				    .then((response: any) => {
					  console.log(response);
							runInAction(() => {
									localStorage.setItem("jwt", response.data.access)
									appStore.setToken(response.data.access)
									localStorage.setItem("jwt_refresh", response.data.refresh)
									appStore.setTokenRefresh(response.data.refresh)
								})
					    config.headers['Authorization'] = "Bearer " + response.data.access
					    return axios(config)
							})
				    // .finally(	() =>	config._retry = true)
					}
			}

			return Promise.reject(error);
		})
