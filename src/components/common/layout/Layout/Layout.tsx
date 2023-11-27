import React, { FC, ReactNode, useEffect, useRef, useState } from 'react';
import styles from './Layout.module.scss';
import { useStore } from "stores/store";
import { observer } from "mobx-react-lite";
import Logo from "components/common/layout/Logo/Logo";
import Button, {  ButtonVariant } from "components/common/ui/Button/Button";
import Header from "components/common/layout/Header/Header";
import Footer from "components/common/layout/Footer/Footer";
import Burger from "components/common/ui/Burger/Burger";
import "../../../../assets/styles.scss"
import MobileMenu from "components/common/layout/MobileMenu/MobileMenu";
const sidebarMenu: {title: string, url: string}[] = [
	{
		title: 'Дашборд',
		url: '/account/dashboard'
	},
	{
		title: 'Сайт cleancar.ru',
		url: 'https://cleancar.ru'
	},
	{
		title: 'Помощь',
		url: '/help'
	},
	{
		title: 'Вход в личный кабинет',
		url: '/auth'
	},
	{
		title: 'Регистрация',
		url: '/'
	}
]


interface ChildrenProps  {
	children: ReactNode | ReactNode[]
}

const Layout:FC<ChildrenProps> = ({children}) => {
	const store = useStore();

	const { appStore, userStore, authStore } = store
	useEffect(() => {
		appStore.setAppLoading()
		if (appStore.token) {
			if(appStore.token && !userStore.currentUser?.id) {
				authStore.login()
			}
			appStore.setAppLoaded()
		}

	}, [appStore.token]);
	const html = document.body;
	const bodyRef = useRef(html);
	const [menuOpen, setMenuOpen] = useState(false);
	const handleMenu = (event: Event) => {
		setMenuOpen(prevState => !prevState);
		if(!menuOpen) {
			bodyRef.current.style.overflow = 'hidden';
		} else {
			bodyRef.current.style.overflow = 'initial';
		}
	}
	return <div className={styles.Layout} data-theme={store.appStore.appTheme}>
		<Header>
			<Logo/>
			<Button className={"tablet:inline-flex hidden ml-auto mr-8"} text={'Помощь'} variant={ButtonVariant.tech} />
			<Burger className={""} action={handleMenu}/>

		</Header>
		<MobileMenu state={menuOpen} items={sidebarMenu} />
		<main className={"mt-16 tablet:mt-[clamp(1rem, 100%, 4rem)]"}>{children}</main>
		<Footer>
			<div>2023 (c.)</div>
			<div>Политика конфиденциальности</div>
		</Footer>


		<div className={"lineBg"}>
			<div/>
			<div/>
			<div/>
			<div/>
			<div/>
			<div className={'leftMask'}/>
			<div className={"rightMask"}/>
		</div>
	</div>;
};

export default observer(Layout);
