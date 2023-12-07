import React, { useEffect } from "react";
import Section, { SectionType } from "components/common/layout/Section/Section";
import Panel, { PanelColor, PanelVariant } from "components/common/layout/Panel/Panel";
import Heading, { HeadingColor, HeadingVariant } from "components/common/ui/Heading/Heading";
import { SvgSearch } from "components/common/ui/Icon";
import Chips from "components/common/ui/Chips/Chips";
import Button, { ButtonDirectory, ButtonSizeType, ButtonVariant } from "components/common/ui/Button/Button";
import TableWithSort from "components/common/layout/TableWithSort/TableWithSort";
import { Outlet, useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { useStore } from "stores/store";
import { observer } from "mobx-react-lite";
import { Company } from "stores/companyStore";
import { User } from "stores/usersStore";
interface ResponseUsers {
	company: Company
	employee: User
	group: number
}
const UsersPage = () => {
	const store = useStore();
	const location = useLocation();
	const navigate = useNavigate();
	useEffect(() => {
		console.log(location)
		console.log(store.usersStore.users)
	}, []);
	if('/account/users' !== location.pathname) return <Outlet />

	return (
		<Section type={SectionType.default}>
			<Panel className={"col-span-full"}
				header={<>
					<Heading text={"Пользователи"} variant={HeadingVariant.h4} className={'!mb-0 inline-block'} color={HeadingColor.accent}/>
					<Button text={'Добавить пользователя'} action={() => navigate('/account/users/create')}  variant={ButtonVariant.accent} className={'inline-flex float-right'} directory={ButtonDirectory.admin} size={ButtonSizeType.sm}/>
				</>}>
			</Panel>
		<TableWithSort
			filter={true}
			search={true}
				ar={['Статус', 'ФИО', 'Номер телефона', 'e-mail', 'Тип','Компания','Город']}
				// @ts-ignore
				data={store.usersStore.users.map((item:{
					company: Company,
					group: number,
					employee: User
				} ) => ({
					state: item.employee.is_active,
					name: item.employee.first_name + " " + item.employee.last_name,
					phone: item.employee.phone,
					email: item.employee.email,
					group: item.employee.group,
					company: item.company.name,
					city: item.company.city.name,
					id: item.employee.id || 8
				}))}
				state={store.usersStore.loadingUsers}
			/>
		</Section>

	)
}

export default observer(UsersPage)
