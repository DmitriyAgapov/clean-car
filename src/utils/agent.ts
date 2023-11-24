// import superagentPromise from 'superagent-promise';
// import _superagent, { ResponseError, Request, Response } from 'superagent';
// import commonStore from './stores/commonStore';
// import authStore from './stores/authStore';
import * as process from "process";
import axios from "axios";
// const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = process.env.PUBLIC_API;

const encode = encodeURIComponent;

// const handleErrors = (err: ResponseError) => {
// 	if (err && err.response && err.response.status === 401) {
// 		authStore.logout();
// 	}
// 	return err;
// };

const responseBody = (res: Response) => res.body;

const tokenPlugin = (req: Request) => {
	// if (commonStore.token) {
	// 	req.set('authorization', `Token ${commonStore.token}`);
	// }
};

const requests = {
	// del: (url: string) =>
	// 	superagent
	// 	.del(`${API_ROOT}${url}`)
	// 	.use(tokenPlugin)
	// 	.end(handleErrors)
	// 	.then(responseBody),
	// get: (url: string) =>
	// 	superagent
	// 	.get(`${API_ROOT}${url}`)
	// 	.use(tokenPlugin)
	// 	.end(handleErrors)
	// 	.then(responseBody),
	// put: (url: string, body: any) =>
	// 	superagent
	// 	.put(`${API_ROOT}${url}`, body)
	// 	.use(tokenPlugin)
	// 	.end(handleErrors)
	// 	.then(responseBody),
	// post: (url: string, body: any) =>
	// 	superagent
	// 	.post(`${API_ROOT}${url}`, body)
	// 	.use(tokenPlugin)
	// 	.end(handleErrors)
	// 	.then(responseBody),
};

const Auth = {
	// current: () =>
	// 	requests.get('/user'),
	// login: (email: string, password: string) =>
	// 	requests.post('/users/login', { user: { email, password } }),
	// register: (username: string, email: string, password: string) =>
	// 	requests.post('/users', { user: { username, email, password } }),
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
