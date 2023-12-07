import { useStore } from "stores/store";
import Section, { SectionType } from "components/common/layout/Section/Section";
import Panel, { PanelColor, PanelVariant } from "components/common/layout/Panel/Panel";
import Heading, { HeadingColor, HeadingVariant } from "components/common/ui/Heading/Heading";
import Button, { ButtonDirectory, ButtonSizeType, ButtonVariant } from "components/common/ui/Button/Button";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import React from "react";

const MyProfilePage = () => {
	const store = useStore()
	const navigate = useNavigate();
	React.useEffect(() => {
		console.log(store.userStore.currentUser)
	},[])
	// const userData = () => {
	// 	// @ts-ignore
	// 	const {account_bindings, email, first_name,last_name, is_active, is_staff, is_superuser, phone, staff_group} = store.userStore.currentUser;
	// 	return [
	// 		{label: 'Дата и время регистрации', value: ''},
	// 		{label: 'ФИО', value: first_name + " " + last_name},
	// 		{label: 'Тип', value: employee.group},
	// 		{label: 'Номер телефона', value: employee.phone},
	// 		{label: 'Группа', value: staff_group.name},
	// 		{label: 'E-mail', value: email},
	// 		{label: 'Статус', value: is_active},
	// 		{label: 'Компания', value: company.name},
	// 		{label: 'Город', value: ''},
	// 		{label: 'Филиал', value: ''},
	// 	]
	// }
	return (
		<Section type={SectionType.default}>
			<Panel className={"col-span-full"}
				header={<>
					<Heading text={"Пользователь"} variant={HeadingVariant.h4} className={'!mb-0 inline-block'} color={HeadingColor.accent}/>

				</>}>
			</Panel>
			<Panel variant={PanelVariant.withPadding} background={PanelColor.glass} className={"col-span-full"}
				header={<>
					<Heading text={"Пользователь"} variant={HeadingVariant.h4} className={'!mb-0 inline-block'} color={HeadingColor.accent}/>

				</>}>


			</Panel>

		</Section>

	)
}

export default observer(MyProfilePage)
function useLoadData(): { data: any; } {
    throw new Error("Function not implemented.");
}

