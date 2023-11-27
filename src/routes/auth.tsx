import React, { useEffect } from "react";
import Layout from "components/common/layout/Layout/Layout";
import Section, { SectionType } from "components/common/layout/Section/Section";
import Panel, { PanelColor, PanelVariant } from "components/common/layout/Panel/Panel";
import Heading, { HeadingColor, HeadingVariant } from "components/common/ui/Heading/Heading";
import FormAuth from "components/Form/FormAuth/FormAuth";
import { useStore } from "stores/store";
import LinkStyled, { ButtonDirectory } from "components/common/ui/LinkStyled/LinkStyled";
import { observer } from "mobx-react-lite";
import{ Navigate } from 'react-router-dom';
import { SvgAuthBg, SvgAuthBgSec } from "components/common/ui/Icon";

function AuthPage() {
	const store = useStore()
	const {appStore, userStore, authStore} = store;

	useEffect(() => {
		appStore.setAppRouteName('.авторизация')
		if(appStore.token && !userStore.currentUser?.id) {
			authStore.login()
		}
	}, [appStore.token]);

	return (
		<Layout>
			<Section type={SectionType.centered}>
				<Panel className={"col-span-6 mb-12 tablet:col-span-full desktop:col-span-6"}
					header={<Heading text={"Вход в систему"}
						variant={HeadingVariant.h1} color={HeadingColor.accent}/>}
					footer={<LinkStyled text={'У меня нет аккаунта'}  to={'/'}/>}

				>
					<p>
						<strong>Добро пожаловать в сервис CleanCar.</strong><br/>Для входа в систему, введите ваши данные
					</p>
				</Panel>
				{!store.userStore.currentUser  ?
					<Panel className={"col-span-6 desktop:col-start-8 desktop:col-span-5 tablet:col-start-2 tablet:col-end-12 tablet:justify-self-center desktop:justify-self-auto w-full max-w-2xl"} variant={PanelVariant.withPadding} background={PanelColor.glass}>
						<FormAuth/>
					</Panel> : 	<Navigate to="/register/success" replace={true} />
				}


			</Section>
			<SvgAuthBg className={"authBg"}/>
			<SvgAuthBgSec className={"authBgSec"}/>
		</Layout>
	)
}
export default observer(AuthPage)
