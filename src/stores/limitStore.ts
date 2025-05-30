import { computed, makeAutoObservable, reaction, runInAction } from "mobx";
import { makePersistable } from "mobx-persist-store";
import authStore from "stores/authStore";
import appStore from "stores/appStore";
import agent from "utils/agent";
import userStore from "stores/userStore";

export class LimitStore {
	constructor() {
		makeAutoObservable(this, {})
		makePersistable(this, {
			name: 'limitStore',
			properties: [],
			storage: window.localStorage
		}, { fireImmediately: true })
	}
	getAllLimits = async (params:any) => {
		if(appStore.appType === "admin") {
			return await agent.Limits.getAllLimitsByAdmin(params)
		}
		if(appStore.appType === "customer") {
			return await agent.Limits.getAllLimitsByCustomer({company_id: userStore.myProfileData.company.id, ...params})
		}

	}
}
const limitStore = new LimitStore()
export default limitStore
