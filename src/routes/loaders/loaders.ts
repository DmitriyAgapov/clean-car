import { redirect } from "react-router-dom";
import appStore from "stores/appStore";
import userStore from "stores/userStore";

export const authUser = async () => {
	if (!appStore.token) {
		return redirect('/auth')
	} else {
		await userStore.pullUser()
	}
	return null
}
