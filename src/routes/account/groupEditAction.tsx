import React, { useState } from "react";
import Section, { SectionType } from "components/common/layout/Section/Section";
import Panel, { PanelColor } from "components/common/layout/Panel/Panel";
import Heading, { HeadingColor, HeadingVariant } from "components/common/ui/Heading/Heading";
import Button, { ButtonVariant } from "components/common/ui/Button/Button";
import { useStore } from "stores/store";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { SvgBackArrow } from "components/common/ui/Icon";
import Checkbox from "components/common/ui/Checkbox/Checkbox";
import PermissionTable from "components/common/layout/PermissionTable/PermissionTable";
import { toJS } from "mobx";

export default function GroupPageEditAction(props:any) {
	const store = useStore();
	const location = useLocation();

	const navigate = useNavigate();
	// @ts-ignore
	const {group} = useLoaderData();
	const [changes, setChanges] = useState(group);
	const handleChangeName = (event:any) => {
		setChanges((prevState: any) => ({
			...prevState,
			name: event.target.value
		}))
	}
	const handlePermissions = (event:any, id:number) => {
		const indexAr = changes.permissions.findIndex((value: any) => value.id === id);
		const newArrayItem = {
			...changes.permissions[indexAr],
			[event.target.name]: event.target.checked
		}
		const newArray = toJS(changes.permissions);
		newArray.splice(indexAr, 1, newArrayItem);

		setChanges((prevState:any) => ({
			...prevState,
			permissions: newArray
		}))
	}
	return (
		<Section type={SectionType.default}>
			<Panel className={"col-span-full"}
				header={<>
					<Button text={<><SvgBackArrow/>Назад к списку групп</>} className={"flex items-center gap-2 font-medium text-[#606163] hover:text-gray-300 leading-none !mb-7"} action={() => navigate(-1)} variant={ButtonVariant.text}/>
					<Heading text={"Редактирование группы"} variant={HeadingVariant.h4} className={'!mb-0 inline-block'} color={HeadingColor.accent}/>

				</>}>
			</Panel>
			<Panel className={"col-span-full py-7 px-14 grid grid-rows-[1fr_auto]"}

				footer={<div className={'accounts-group_header gap-4 text-[#606163] grid grid-cols-[1.25fr_2fr] grid- font-medium'}>
					<div className={'grid gap-4'}>
						<Checkbox
							name={'test_change_availible_checked'}
							checked={true}
							disabled={false} label={'Выбранная позиция'}/>
						<Checkbox
							name={'test_change_availible'}
							checked={false}
							disabled={false} label={'Доступно к выбору'}/>
						<Checkbox
							name={'test_change_availible_disabled'}
							available={false}
							disabled={true} label={'Недоступно'}/>
					</div>
					<div className={'flex justify-end gap-5'}>
						<Button text={'Отменить'} action={() => navigate(-1)}  className={'float-right'} variant={ButtonVariant.default}/>
						<Button text={'Сохранить'} action={() => {
							store.permissionStore.setPermissionStoreAdmin(changes.id, changes);
							navigate(-1);
						}}  className={'float-right'} variant={ButtonVariant.accent}/>
					</div>
			</div> }
				background={PanelColor.glass}>

				<div className={'accounts-group_body text-[#606163] gap-x-4 gap-y-16 grid grid-cols-[1.25fr_2fr] grid- font-medium'}>
					<div>
						<Heading text={'Введите название группы'} color={HeadingColor.accent} variant={HeadingVariant.h5}/></div>
					<div>
						<input type={'text'} name={'name'} className={"h-10"} value={changes.name} onChange={handleChangeName}/>
					</div>
					<div>
						<Heading text={'Присвойте права группе'} color={HeadingColor.accent} variant={HeadingVariant.h5}/></div>
					<div>
						<PermissionTable editable={true} data={changes.permissions} action={handlePermissions}/>
					</div>
				</div>

			</Panel>

		</Section>

	)
}
