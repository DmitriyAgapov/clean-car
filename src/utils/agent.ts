// import superagentPromise from 'superagent-promise';
// import _superagent, { ResponseError, Request, Response } from 'superagent';
// import commonStore from './stores/commonStore';
// import authStore from './stores/authStore';
import axios, {AxiosError} from "axios";
import appStore from "stores/appStore";
import authStore from "stores/authStore";
import { decodeToken } from "utils/getData";
import userStore, { User, UserStore } from "stores/userStore";
// const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = process.env.REACT_APP_PUBLIC_API;

// const encode = encodeURIComponent;

const handleErrors = (err: AxiosError) => {
	if (err && err.response && err.response.status === 401) {
		authStore.logout();
	}
	return err;
};

const tokenPlugin = () => {
	if (appStore.token) return ({ 'authorization': `Token ${appStore.token}`})
};

const requests = {
	// del: (url: string) =>
	// 	axios
	// 	.delete(`${API_ROOT}${url}`)
	// 	.use(tokenPlugin)
	// 	.end(handleErrors)
	// 	.then(responseBody),
	get: (url: string) =>
		axios({
			url: `${API_ROOT}${url}`,
			method: 'GET',
			headers: tokenPlugin(),
		})
		.then(response => response)
		.catch(handleErrors),
	// put: (url: string, body: any) =>
	// 	superagent
	// 	.put(`${API_ROOT}${url}`, body)
	// 	.use(tokenPlugin)
	// 	.end(handleErrors)
	// 	.then(responseBody),
	post: (url: string, body: any) =>
		axios({
			url: `${API_ROOT}${url}`,
			headers: tokenPlugin(),
			method: 'Post',
			data: body
		})
		.then(response => response.data)
		.catch(handleErrors),
};

const Auth = {
	current: () => {
		if(appStore.token) {
			const dataUser = decodeToken(appStore.token);
			// @ts-ignore
			return { id: dataUser.user_id, first_name: dataUser.first_name, last_name: dataUser.last_name, phone: dataUser.phone, email: authStore.values.email}
		}
	}
	// console.log('request current userr')
		// requests.get('/user'),
	,
	login: (email: string, password: string) =>
		requests.post('/token/', { email: email, password: password  }),

	register: (first_name: string, last_name: string, email: string, phone: string, password: string) =>
		requests.post('/accounts/register/', {
			email: email, phone: phone, first_name: first_name, last_name: last_name, password: password, password2: password}),
	// save: (user: any) =>
	// 	requests.put('/user', { user })
};

const limit = (count: any, p: any) => `limit=${count}&offset=${p ? p * count : 0}`;
const omitSlug = (article: any) => Object.assign({}, article, { slug: undefined })

const Profile = {
	// follow: (username: string) =>
	// 	requests.post(`/profiles/${username}/follow`, {}),
	// get: (username: string) =>
	// 	requests.get(`/profiles/${username}`),
	// unfollow: (username: string) =>
	// 	requests.del(`/profiles/${username}/follow`)
};

const agent = {
	Auth,
	Profile
};

export default agent;
