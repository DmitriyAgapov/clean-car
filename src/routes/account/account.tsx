import React from "react";
import Layout from "components/common/layout/Layout/Layout";
import Section, { SectionType } from "components/common/layout/Section/Section";
import Panel from "components/common/layout/Panel/Panel";
import Heading, { HeadingColor, HeadingVariant } from "components/common/ui/Heading/Heading";
import { ButtonSizeType, ButtonVariant } from "components/common/ui/Button/Button"
import LinkStyled from "components/common/ui/LinkStyled/LinkStyled";
import Sidebar from "components/common/layout/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
const sidebarMenu: {icon: React.ReactNode, title: string, url: string}[] = [
	{
		icon: <img src={'/icons/home.png'} alt={''}/>,
		title: 'Дашборд',
		url: 'dashboard'
	},
	{
		icon: <img src={'/icons/company.png'} alt={''}/>,
		title: 'Компании',
		url: 'companies'
	},
	{
		icon: <img src={'/icons/filials.png'} alt={''}/>,
		title: 'Филиалы',
		url: 'filials'
	},
	{
		icon: <img src={'/icons/users.png'} alt={''}/>,
		title: 'Пользователи',
		url: 'users'
	},
	{
		icon: <img src={'/icons/groups.png'} alt={''}/>,
		title: 'Группы',
		url: 'groups'
	},
	{
		icon: <img src={'/icons/auto.png'} alt={''}/>,
		title: 'Автомобили',
		url: 'auto'
	},
	{
		icon: <img src={'/icons/zayavki.png'} alt={''}/>,
		title: 'Заявки',
		url: 'orders'
	},
	{
		icon: <img src={'/icons/price-list.png'} alt={''}/>,
		title: 'Прайс-лист',
		url: 'price'
	},
	{
		icon: <img src={'/icons/limits.png'} alt={''}/>,
		title: 'Лимиты',
		url: 'limits'
	},
	{
		icon: <img src={'/icons/budget.png'} alt={''}/>,
		title: 'Бюджет',
		url: 'budget'
	},
	{
		icon: <img src={'/icons/zp.png'} alt={''}/>,
		title: 'Зарплата',
		url: 'salary'
	},
	{
		icon: <img src={'/icons/spravochnik.png'} alt={''}/>,
		title: 'Справочник',
		url: 'reference'
	},
]
export default function AccountPage() {
	return (
		<Layout>
			<Sidebar items={sidebarMenu}/>
			<Outlet />
		</Layout>
	)
}
