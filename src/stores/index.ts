import authStore, { AuthStore } from './authStore';
import userStore, { UserStore } from './userStore';
import appStore, {AppStore} from "./appStore";
import companyStore, { CompanyStore } from "stores/companyStore";
// import profileStore, { ProfileStore } from './profileStore';

export type RootStore = {
	authStore: AuthStore;
	appStore: AppStore;
	companyStore: CompanyStore
	userStore: UserStore;
}

const rootStore: RootStore = {
	authStore,
	appStore,
	companyStore,
	userStore
};

export default rootStore;
