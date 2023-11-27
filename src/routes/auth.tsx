import React, { useEffect } from "react";
import Layout from "components/common/layout/Layout/Layout";
import Section, { SectionType } from "components/common/layout/Section/Section";
import Panel, { PanelColor, PanelVariant } from "components/common/layout/Panel/Panel";
import Heading, { HeadingColor, HeadingVariant } from "components/common/ui/Heading/Heading";
import FormAuth from "components/Form/FormAuth/FormAuth";
import "../assets/styles.scss"
import { useStore } from "stores/store";
import LinkStyled from "components/common/ui/LinkStyled/LinkStyled";
import { observer } from "mobx-react-lite";
import Button from "components/common/ui/Button/Button";

function AuthPage() {
	const store = useStore()
	useEffect(() => {
		store.appStore.setAppRouteName('авторизация')

	}, [store.appStore.token]);

	return (
		<Layout>
			<Section type={SectionType.centered}>
				<Panel className={"col-span-6 mb-12 tablet:col-span-full desktop:col-span-6"}
					header={<Heading text={"Вход в систему"}
						variant={HeadingVariant.h1} color={HeadingColor.accent}/>}
					footer={<LinkStyled text={'У меня нет аккаунта'}  to={'/register'}/>}

				>
					<p>
						<strong>Добро пожаловать в сервис CleanCar.</strong><br/>Для входа в систему, введите ваши данные
					</p>
				</Panel>
				{!store.userStore.currentUser  ?
					<Panel className={"col-span-6 desktop:col-start-8 desktop:col-span-5 tablet:col-start-2 tablet:col-end-12 tablet:justify-self-center desktop:justify-self-auto w-full max-w-2xl"} variant={PanelVariant.withPadding} background={PanelColor.glass}>
						<FormAuth/>
					</Panel> : <Panel className={"col-span-6 desktop:col-start-8 desktop:col-span-5 tablet:col-start-2 tablet:col-end-12 tablet:justify-self-center desktop:justify-self-auto w-full max-w-2xl"}
						footer={<Button text={'Logout'} action={() => store.authStore.logout() } />}

					>UserId: <h4>{store.userStore.currentUser?.id}</h4></Panel>}


			</Section>
		</Layout>
	)
}
export default observer(AuthPage)
