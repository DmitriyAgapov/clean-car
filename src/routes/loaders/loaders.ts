import { redirect } from "react-router-dom";
import appStore from "stores/appStore";
import userStore from "stores/userStore";
import { useStore } from "stores/store";
import companyStore from "stores/companyStore";
import permissionStore from "stores/permissionStore";
import logo from "components/common/layout/Logo/Logo";
import { useId } from "react";

export const authUser = async () => {
	console.log('auth')
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

export const groupsLoader = async ({params: {id}}:any) => {
	await permissionStore.loadPermissionAdmin()

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
	if (id) {
		const currentGroup = permissionStore.getPermissionAdmin(id);
		if(currentGroup[0]) return { group: currentGroup[0] }
		return redirect('/account/groups')
	} else {
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
	return null
}

