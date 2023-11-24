import React, { useEffect } from "react";
import Layout from "components/common/layout/Layout/Layout";
import Section, { SectionType } from "components/common/layout/Section/Section";
import Panel, { PanelColor, PanelVariant } from "components/common/layout/Panel/Panel";
import Heading, { HeadingColor, HeadingVariant } from "components/common/ui/Heading/Heading";
import FormRegister from "components/Form/FormRegister/FormRegister";
import "../assets/styles.scss"
import LinkStyled, { ButtonSizeType, ButtonVariant } from "components/common/ui/LinkStyled/LinkStyled";
import { useStore } from "stores/store";

export default function RegisterPage() {
	const store = useStore()

	useEffect(() => {
		store.appStore.setAppRouteName('регистрация')
	});
	return (
		<Layout>
			<Section type={SectionType.centered}>
				<Panel className={"col-span-6 mb-12 tablet:col-span-full desktop:col-span-6"}>
					<Heading text={"Добро пожаловать в CleanCar."} variant={HeadingVariant.h2} color={HeadingColor.accent}/>
					<div className={'mb-12 laptop:mb-16'}>
						<p>Мы рады, что вы выбрали нас.<br/>
							Пожалуйста, заполните данные для регистрации</p>
					</div>
					<LinkStyled text={'У меня уже есть аккаунт'} variant={ButtonVariant["accent-outline"]} size={ButtonSizeType.base} to={'/auth'}/>
				</Panel>
				<Panel className={"col-span-6 desktop:col-start-8 desktop:col-span-5 tablet:col-start-2 tablet:col-end-12 tablet:justify-self-center desktop:justify-self-auto"} variant={PanelVariant.withPadding} background={PanelColor.glass}>
					<FormRegister/>
				</Panel>
			</Section>
		</Layout>
	)
}
