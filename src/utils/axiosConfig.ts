import axios from "axios";
import agent from "utils/agent";
import {  runInAction } from "mobx";
import appStore from "stores/appStore";
import authStore from "stores/authStore";

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
					...config.headers,
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
        const config = error.config
        // if(error.code === "ERR_NETWORK") {
        //  console.log('setted to network status false');
        //  appStore.setNetWorkStatus(false)
        // } else if(!appStore.networkStatus && error.code !== "ERR_NETWORK") {
        //  console.log('setted to network status true');
        //  appStore.setNetWorkStatus(true)
        // }
        // console.log('/token/refresh/', config.url.includes('/token/refresh/'));

        if (error.response.status === 401 && !config.url.includes('/token/refresh/')) {
            const tokenRefresh = appStore.tokenRefresh
            console.log('tokenRefresh', tokenRefresh)
            // config._retry = true;
            if (tokenRefresh && tokenRefresh !== 'undefined' && tokenRefresh !== undefined) {
                agent.Auth.tokenRefresh(tokenRefresh).then(r => {
	                console.log(r);
	                runInAction(() => {
		                localStorage.setItem('jwt', r.data.access)
		                appStore.setToken(r.data.access)
		                // appStore.setTokenRefresh(r.data.refresh)
		                // localStorage.setItem('jwt_refresh', r.data.refresh)
	                })
	                config.headers['Authorization'] = 'Bearer ' + r.data.access
                }).catch((error) => {
	                console.log('logout');
									return   authStore.logout()
                })
                // console.log(response)

                return await axios(config)
                // .finally(	() =>	config._retry = true)
            } else {
                authStore.logout()
            }
        }

        return Promise.reject(error)
    },
)
