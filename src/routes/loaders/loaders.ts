import { redirect } from "react-router-dom";
import appStore from "stores/appStore";
import userStore from "stores/userStore";
import { useStore } from "stores/store";
import companyStore from "stores/companyStore";
import permissionStore from "stores/permissionStore";
import logo from "components/common/layout/Logo/Logo";
import { useId } from "react";
import usersStore from "stores/usersStore";

export const authUser = async () => {

	if (!appStore.token) {
		return redirect('/auth')
	} else {
		await userStore.pullUser()
	}
	return null
}

export const companyLoader = async () => {
	await companyStore.loadCompnies()

	return null
}

export const usersLoader = async () => {
	await usersStore.getAllUser();
	return null
}


export const groupsIdLoader = async ({params: {id}}:any) => {
	if (id) {
		const currentGroup = await permissionStore.getPermissionAdmin(id);
		// @ts-ignore
		if(currentGroup.status === 200) {
			// @ts-ignore
			if(currentGroup.data) return { group: currentGroup.data }
		}
		return redirect('/account/groups')

	}
	return  null
}
export const profileLoader =  async () => {
	await userStore.loadMyProfile();
	return null

}

export const groupsLoader = ({params: {id}}:any) => {
	 permissionStore.loadPermissionAdmin()

	setTimeout(() => {
		console.log('tick')
		permissionStore.loadingPermissions = false
		console.log('tick', permissionStore.loadingPermissions)
	}, 500);
	return {groups:  permissionStore.permissions}
}

export const groupsCreatLoader = async ({params: {id}}:any) => {


	const permissionSectionNames = [ 'Компании',
		'Управление филиалами и отделами заказчиками',
		'Управление филиалами и отделами исполнителей',
		'Управление пользователями',
		'Управление автомобилями',
		'Управление заявками',
		'Управление прайс-листом',
		'Управление лимитами',
		'Управление справочниками',
		'Финансовый блок']
	// if (id) {
	// 	const currentGroup = permissionStore.getPermissionAdmin(id);
	// 	if(currentGroup[0]) return { group: currentGroup[0] }
	// 	return redirect('/account/groups')
	// } else {
	return { group: {
			id: Math.random(),
			name: "",
			permissions: permissionSectionNames.map((item: string) => ({
				create: false,
				delete: false,
				id: Math.random(),
				name: item,
				read: false,
				update: false
			}))
		}
	}

}

