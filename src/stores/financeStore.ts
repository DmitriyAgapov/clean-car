import { makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";
import appStore from "stores/appStore";
import agent from "utils/agent";
import userStore from "stores/userStore";

export class FinanceStore {
	constructor() {
		makeAutoObservable(this, {})

	}
	async getTransactions(params?:any) {
		if(appStore.appType === "admin") {
			return agent.Balance.getTransactionListAdmin(params)
		} else {
			return agent.Balance.getTransactionList(userStore.myProfileData.company.id,params)
		}
	}
}
const financeStore = new FinanceStore()
export default financeStore
