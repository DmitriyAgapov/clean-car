import React, { FC, ReactNode, useEffect, useRef, useState } from 'react';
import styles from './Layout.module.scss';
import { useStore } from "stores/store";
import { observer } from "mobx-react-lite";
import Logo from "components/common/layout/Logo/Logo";
import Header from "components/common/layout/Header/Header";
import Footer from "components/common/layout/Footer/Footer";
import Burger from "components/common/ui/Burger/Burger";
import "../../../../assets/styles.scss"
import MobileMenu from "components/common/layout/MobileMenu/MobileMenu";
import { useNavigate } from 'react-router-dom';
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
	className?: string
	headerContent?: ReactNode | ReactNode[]
}

const Layout:FC<ChildrenProps> = ({children, headerContent, className = ""}) => {
	const store = useStore();
	const { appStore, userStore, authStore } = store;

	useEffect(() => {
		appStore.setAppRouteName('.авторизация')
	}, []);

	return <div className={styles.Layout + " " + className} data-theme={store.appStore.appTheme}>
		<Header>
			<Logo/>
			{headerContent}
			<Burger className={"tablet:hidden"}/>
		</Header>
		<MobileMenu items={sidebarMenu} />
		<main className={""}>{children}</main>
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
