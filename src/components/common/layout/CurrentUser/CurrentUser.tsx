import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useStore } from "stores/store";

const CurrentUser = () => {
	const store = useStore();

	useEffect(() => {
		if(store.userStore.currentUser)
		console.log(store.userStore.currentUser.id)
	}, [store.userStore.currentUser]);

	return (<div className={'asd'}>
		UserId: {store.userStore.currentUser && store.userStore.currentUser.id}
	</div>)
}
export default observer(CurrentUser);
