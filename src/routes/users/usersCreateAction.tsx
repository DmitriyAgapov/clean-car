import React from "react";
import Section, { SectionType } from "components/common/layout/Section/Section";
import Panel, { PanelColor, PanelVariant } from "components/common/layout/Panel/Panel";
import Heading, { HeadingColor, HeadingVariant } from "components/common/ui/Heading/Heading";
import { SvgBackArrow } from "components/common/ui/Icon";
import Button, { ButtonVariant } from "components/common/ui/Button/Button";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import "yup-phone-lite";
import { Option, Select } from "@material-tailwind/react";

export default function UsersPageCreateAction() {
	const navigate = useNavigate();
	const formik = useFormik({
		initialValues: {
			fullName: '',
			phone: '',
			cleanm: '',
		},
	validationSchema: Yup.object().shape({
			fullName: Yup.string()
				.min(2, 'Слишком короткое!')
				.max(50, 'Слишком длинное!')
				.required('Обязательное поле'),
			phone: Yup.string()
				.max(16, 'Слишком длинное!')
				.phone("RU", "Введите правильный номер")
				.required("Требуется номер телефона"),
			cleanm: Yup.string()
				.email('Неверный email')
				.required('Укажите email'),
		}),
		onSubmit: values => {
			alert(JSON.stringify(values, null, 2));
		},
	});

	return (
		<Section type={SectionType.default}>
			<Panel className={"col-span-full"}
				header={<>
					<Button text={<><SvgBackArrow/>Назад к списку пользователей</>} className={"flex items-center gap-2 font-medium text-[#606163] hover:text-gray-300 leading-none !mb-7"} action={() => navigate(-1)} variant={ButtonVariant.text}/>
					<Heading text={"Добавить пользователя"} variant={HeadingVariant.h4} className={'!mb-0 inline-block'} color={HeadingColor.accent}/>
				</>}>
			</Panel>
			<Panel className={"col-span-full  grid grid-rows-[1fr_auto]"}
				variant={PanelVariant.withPadding}
				footer={<div className={'accounts-group_header gap-4 text-[#606163] grid grid-cols-[1.25fr_2fr] grid- font-medium'}>

					<div className={'flex col-start-2 justify-end gap-5'}>
						<Button text={'Отменить'}  action={() => navigate(-1)}  className={'float-right'} variant={ButtonVariant["accent-outline"]}/>
						<Button text={'Сохранить'} action={async () => {
							// @ts-ignore
							// await store.permissionStore.createPermissionStoreAdmin(changes);
							// setTimeout(() => navigate('/account/groups'), 500);
							// navigate('/account/groups')

						}}  className={'float-right'} variant={ButtonVariant.accent}/>
					</div>
				</div> }
				background={PanelColor.glass}>
				<form onSubmit={formik.handleSubmit} className={'flex flex-wrap gap-6'}>
					<label className={'account-form__input max-w-[35rem] w-full flex-grow'} htmlFor="fullName">
						ФИО пользователя
							<input
								id="fullName"
								name="fullName"
								placeholder={'ФИО'}
								type="text"
								onChange={formik.handleChange}
								value={formik.values.fullName}
							/>
					</label>
					<label className={'account-form__input w-[20rem] flex-grow-0'} htmlFor="phone">
						Номер телефона
							<input
								id="phone"
								name="phone"
								type="text"
								onChange={formik.handleChange}
								value={formik.values.phone}
							/>
					</label>

					<label className={'account-form__input flex-1'} htmlFor="cleanm">
						E-mail
						<input
							id="cleanm"
							name="cleanm"
							type="email"
							onChange={formik.handleChange}
							value={formik.values.cleanm}
						/>
					</label>


						<Select variant={"static"} label={'Тип'} className={"bg-white account-form__input  flex-1"} labelProps={{className: "text-[var(--active] relative block"}}
						 name={"user_type"}>
							<Option value="admin">Администратор</Option>
							<Option value="customer">Заказчик</Option>
							<Option value="executor">Исполнитель</Option>
						</Select>


						<Select disabled={true} variant={'static'} label={'Группа'} labelProps={{className: "text-[var(--active] relative block"}} className={'bg-white  account-form__input  flex-1'}  name={"user_group"}>
							<Option value="admin">Администратор</Option>
							<Option  value="customer">Заказчик</Option>
							<Option value="executor">Исполнитель</Option>
						</Select>


						<Select variant={"static"} className={"bg-white account-form__input flex-1 flex flex-grow-1 w-full"} labelProps={{className: "text-[var(--active] relative block"}}  placeholder={'Выбрать статус'}  label={'Статус'}  name={"user_is_active"} defaultValue={'Выбрать статус'} >
							<Option className={"relative"} value="active">Активный</Option>
							<Option  value="notactive">Деактивный</Option>
						</Select>

				</form>


			</Panel>

		</Section>

	)
}
