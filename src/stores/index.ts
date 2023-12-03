import authStore, { AuthStore } from './authStore';
import userStore, { UserStore } from './userStore';
import appStore, {AppStore} from "./appStore";
import companyStore, { CompanyStore } from "stores/companyStore";
import permissionStore, { PermissionStore } from "stores/permissionStore";

export type RootStore = {
	authStore: AuthStore;
	permissionStore: PermissionStore;
	appStore: AppStore;
	companyStore: CompanyStore
	userStore: UserStore;
}

const rootStore: RootStore = {
	authStore,
	appStore,
	permissionStore,
	companyStore,
	userStore
};

export default rootStore;
