import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useStore } from "stores/store";
import userStore from "stores/userStore";

const CurrentUser = () => {
	const store = useStore();

	return (<div className={'asd'}>
		UserId: {store.userStore.currentUser && store.userStore.currentUser.id} <a onClick={() => store.authStore.logout()}>Logout</a>
	</div>)
}
export default observer(CurrentUser);
