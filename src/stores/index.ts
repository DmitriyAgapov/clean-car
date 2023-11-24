// import authStore, { AuthStore } from './authStore';
import userStore, { UserStore } from './userStore';
import appStore, {AppStore} from "./appStore";
// import profileStore, { ProfileStore } from './profileStore';

export type RootStore = {
	// authStore: AuthStore;
	appStore: AppStore;
	// profileStore: ProfileStore;
	userStore: UserStore;
}

const rootStore: RootStore = {
	// authStore,
	appStore,
	// profileStore,
	userStore
};

export default rootStore;
