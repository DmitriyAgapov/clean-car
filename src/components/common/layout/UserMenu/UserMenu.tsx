import React from 'react';
import styles from './UserMenu.module.scss';
import { SvgChevron, SvgNotification } from "components/common/ui/Icon";
import photo from '../../../../assets/images/userphoto.png'
import { observer } from 'mobx-react-lite';
import { useStore } from "stores/store";

const notificationCount = 2;
type UserMenuProps = {}
const Notification = () => <div className={styles.notification}>
	<SvgNotification/>
	<span>{notificationCount}</span>
</div>
type UserProps = {
	name?: string
	status?: string
	photoUrl?: string
}
const User = ({name, status, photoUrl}:UserProps) => {
	return <div className={styles.user}>
		<div className={styles.photo}>
			<img src={photo} width={40} height={40} alt={''} loading={'lazy'}/>
		</div>
		<div className={styles.menuName}>
			<div className={styles.name}>
				{name}
			</div>
			<div className={styles.status}>
				Администратор
			</div>

		</div>
		<SvgChevron className={styles.svg}/>
	</div> ;
}

const UserMenu = () => {
	const store = useStore()
	return (
		<div className={styles.UserMenu}>
			<Notification />
			<User name={store.userStore.currentUser?.first_name + " " + store.userStore.currentUser?.last_name}/>
		</div>
	);
};

export default observer(UserMenu);
