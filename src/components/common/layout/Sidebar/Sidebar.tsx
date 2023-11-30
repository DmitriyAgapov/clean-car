import React, { ReactNode } from 'react';
import styles from './Sidebar.module.scss';
import { SectionType } from "components/common/layout/Section/Section";
import { Link, NavLink, useLocation } from 'react-router-dom';

type SidebarProps = {
	children?: ReactNode | ReactNode []
	type?: SectionType
	items?: {icon: React.ReactNode | any, title: string, url: string}[]
}
const Sidebar = ({children, items, type, ...props}:SidebarProps) => {
	const location = useLocation();


	return (
		<aside className={styles.Sidebar} {...props}>
			<nav>
				<ul>{items?.map((i, index) => {
					
					if(i.url === location.pathname) {

					}
					return (
				<li key={`item-${index}`} className={styles.listItem} data-active={location.pathname.includes(i.url) }>
					<span>{i.icon}</span><Link
					// @ts-ignore
					 className={styles.navLink} to={i.url}>{i.title}</Link>
				</li>
			)
				})}</ul></nav>{children}</aside>
	);
};

export default Sidebar;
