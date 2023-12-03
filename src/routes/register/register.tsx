import React, { useEffect } from "react";
import Layout from "components/common/layout/Layout/Layout";
import Section, { SectionType } from "components/common/layout/Section/Section";
import Panel, { PanelColor, PanelVariant } from "components/common/layout/Panel/Panel";
import Heading, { HeadingColor, HeadingVariant } from "components/common/ui/Heading/Heading";
import FormRegister from "components/Form/FormRegister/FormRegister";

import Button, { ButtonSizeType, ButtonVariant } from "components/common/ui/Button/Button"
import LinkStyled from "components/common/ui/LinkStyled/LinkStyled";

import { useStore } from "stores/store";
import Image from "components/common/ui/Image/Image";
import imageBg from "../../assets/images/bg/welcomebg.png";

export default function RegisterPage() {
	const store = useStore()

	useEffect(() => {
		store.appStore.setAppRouteName('.регистрация')
	});
	return (
		<Layout className={'page-intro'} headerContent={<Button className={"!hidden tablet:!inline-flex ml-auto mr-8"} text={'Помощь'} variant={ButtonVariant.tech} />}>
			<Section type={SectionType.centered}>
				<Panel className={"col-span-6 mb-12 tablet:col-span-full desktop:col-span-6"}
					header={<Heading text={"Добро пожаловать в CleanCar."} variant={HeadingVariant.h1} color={HeadingColor.accent}/>}
					footer={<LinkStyled text={'У меня уже есть аккаунт'} variant={ButtonVariant["accent-outline"]} size={ButtonSizeType.base} to={'/'}/>}
				>
					<p>Мы рады, что вы выбрали нас.<br/>
						Пожалуйста, заполните данные для регистрации</p>
				</Panel>
				<Panel className={"col-span-6 desktop:col-start-8 desktop:col-span-5 tablet:col-start-2 tablet:col-end-12 tablet:justify-self-center desktop:justify-self-auto"} variant={PanelVariant.withPadding} background={PanelColor.glass}>
					<FormRegister/>
				</Panel>
			</Section>

			<Image className={'absolute bottom-0 left-0'} src={imageBg} alt={''}/>
		</Layout>
	)
}
