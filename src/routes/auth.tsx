import React, { useEffect } from "react";
import Layout from "components/common/layout/Layout/Layout";
import Section, { SectionType } from "components/common/layout/Section/Section";
import Panel, { PanelColor, PanelVariant } from "components/common/layout/Panel/Panel";
import Heading, { HeadingColor, HeadingVariant } from "components/common/ui/Heading/Heading";
import FormAuth from "components/Form/FormAuth/FormAuth";
import "../assets/styles.scss"
import { useStore } from "stores/store";

export default function AuthPage() {
	const store = useStore()
	useEffect(() => {
		store.appStore.setAppRouteName('авторизация')
	});
	return (
		<Layout>
			<Section type={SectionType.centered}>
				<Panel className={"col-span-6 mb-12 tablet:col-span-full desktop:col-span-6"}>
					<Heading text={"Вход в систему"} variant={HeadingVariant.h2} color={HeadingColor.accent}/>
					<div>
						<p><strong>Добро пожаловать в сервис CleanCar.</strong><br/>
							Для входа в систему, введите ваши данные</p>
					</div>
				</Panel>
				<Panel className={"col-span-6 desktop:col-start-8 desktop:col-span-5 tablet:col-start-2 tablet:col-end-12 tablet:justify-self-center desktop:justify-self-auto"} variant={PanelVariant.withPadding} background={PanelColor.glass}>
					<FormAuth/>
				</Panel>
			</Section>
		</Layout>
	)
}
