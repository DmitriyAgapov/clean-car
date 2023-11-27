import React from 'react';
import { Link } from 'react-router-dom';
import styles from './MobileMenu.module.scss';

type MobileMenuProps = {
	items: {title: string, url: string}[]
	state: boolean
}
const MobileMenu = ({ items, state, ...props }:MobileMenuProps) => {
	return (
		<div className={styles.MobileMenu} data-openned={state}>
			<ul>{items.map((i, index) =>
				<li key={`mob-${index}`}>
					<Link to={i.url}>{i.title}</Link>
				</li> )}
			</ul>
		</div>
	);
};

export default MobileMenu;
