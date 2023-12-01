import { redirect } from "react-router-dom";
import appStore from "stores/appStore";
import userStore from "stores/userStore";
import { useStore } from "stores/store";
import companyStore from "stores/companyStore";

export const authUser = async () => {
	console.log('once')
	if (!appStore.token) {
		return redirect('/auth')
	} else {
		await userStore.pullUser()
	}
	return null
}
export const companyLoader = async () => {
	companyStore.loadCompnies()
	if (!appStore.token) {
		return redirect('/auth')
	} else {
		await userStore.pullUser()
	}
	return null
}
