import React from "react";
import Section, { SectionType } from "components/common/layout/Section/Section";
import Panel  from "components/common/layout/Panel/Panel";
import Heading, { HeadingColor, HeadingVariant } from "components/common/ui/Heading/Heading";
import Button, { ButtonDirectory, ButtonSizeType, ButtonVariant } from "components/common/ui/Button/Button";
import TableWithSort from "components/common/layout/TableWithSort/TableWithSort";
import { useStore } from "stores/store";
import { useLocation, useNavigate } from "react-router-dom";

export default function GroupsPage() {
	const store = useStore();
	const location = useLocation()
	const navigate = useNavigate();

	return (
		<Section type={SectionType.default}>
			<Panel className={"col-span-full"}
				header={<>
					<Heading text={"Группы"} variant={HeadingVariant.h4} className={'!mb-0 inline-block'} color={HeadingColor.accent}/>
					<Button text={'Создать группу'} action={() => navigate('/account/groups/create')}  variant={ButtonVariant.accent} className={'inline-flex float-right'} directory={ButtonDirectory.admin} size={ButtonSizeType.sm}/>
				</>}>
				<p className={'-mt-4'}>Вы можете создавать свою иерархию полномочий,<br/>
					чтобы управлять доступом к различным ресурсам системы</p>
			</Panel>

			<TableWithSort
				ar={['Название группы', 'дата и время']}
				data={store.permissionStore.permissions.map((item:any) => ({
					name: item.name,
					date: item.date,
					id: item.id
				}))}
				state={store.permissionStore.loadingPermissions}
			/>
		</Section>

	)
}
