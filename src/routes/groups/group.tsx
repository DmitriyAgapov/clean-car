import React from "react";
import Section, { SectionType } from "components/common/layout/Section/Section";
import Panel, { PanelColor } from "components/common/layout/Panel/Panel";
import Heading, { HeadingColor, HeadingVariant } from "components/common/ui/Heading/Heading";
import Button, { ButtonVariant } from "components/common/ui/Button/Button";
import { useStore } from "stores/store";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { SvgBackArrow } from "components/common/ui/Icon";
import Checkbox from "components/common/ui/Checkbox/Checkbox";
import PermissionTable from "components/common/layout/PermissionTable/PermissionTable";
import { observer } from "mobx-react-lite";

const GroupPage = () => {
	const store = useStore();
	const location = useLocation()
	const navigate = useNavigate();
	// @ts-ignore
	const { group } = useLoaderData();

	return (
		<Section type={SectionType.default}>
			<Panel className={"col-span-full"}
				header={<>
					<Button text={<><SvgBackArrow/>Назад к списку групп</>}
						className={"flex items-center gap-2 font-medium text-[#606163] hover:text-gray-300 leading-none !mb-7"}
						action={() => navigate(-1)}
						variant={ButtonVariant.text}/>
					<Heading text={"Группа"}
						variant={HeadingVariant.h4}
						className={'!mb-0 inline-block'}
						color={HeadingColor.accent}/>

				</>}>
			</Panel>
			<Panel state={store.permissionStore.loadingPermissions} className={"col-span-full py-7 px-14 grid grid-rows-[auto_1fr_auto]"}
				header={<div className={'accounts-group_header gap-4 text-[#606163] grid grid-cols-[1.25fr_2fr] grid- font-medium'}>
					<div>Название группы</div>
					<div>Права группы</div>
				</div>}
				footer={<div className={'accounts-group_header gap-4 text-[#606163] grid grid-cols-[1.25fr_2fr] grid- font-medium'}>
					<div className={'grid gap-4'}>
						<Checkbox name={'test_change_availible_checked'}
							checked={true}
							disabled={false}
							label={'Выбранная позиция'}/>
						<Checkbox name={'test_change_availible'}
							checked={false}
							disabled={false}
							label={'Доступно к выбору'}/>
						<Checkbox name={'test_change_availible_disabled'}
							available={false}
							disabled={true}
							label={'Недоступно'}/>
					</div>
					<div>
						<Button text={'Редактировать'}
							action={() => navigate(location.pathname + '/edit')}
							className={'float-right'}
							variant={ButtonVariant.default}/></div>
				</div>}
				background={PanelColor.glass}>

				<div className={'accounts-group_body text-[#606163] gap-4 grid grid-cols-[1.25fr_2fr] grid- font-medium'}>
					<div><Heading text={group.name}
						color={HeadingColor.accent}
						variant={HeadingVariant.h4}/></div>
					<div>
						<PermissionTable data={group.permissions}/>
					</div>
				</div>

			</Panel>

		</Section>

	)
}
export default observer(GroupPage)
