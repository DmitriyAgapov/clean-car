import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './MobileMenu.module.scss';
import { useStore } from "stores/store";

type MobileMenuProps = {
	items: {title: string, url: string}[]
	state?: boolean
}
const MobileMenu = ({ items, state, ...props }:MobileMenuProps) => {
	const store = useStore();
	return (
		<div className={styles.MobileMenu} data-openned={store.appStore.burgerState}>
			<ul>{items.map((i, index) =>
				<li key={`mob-${index}`}>
					<Link onClick={() => store.appStore.setBurgerState()} to={i.url}>{i.title}</Link>
				</li> )}
			</ul>
		</div>
	);
};

export default observer(MobileMenu);
