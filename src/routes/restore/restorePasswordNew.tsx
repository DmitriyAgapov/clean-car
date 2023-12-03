import React, { useEffect } from "react";
import Layout from "components/common/layout/Layout/Layout";
import Section, { SectionType } from "components/common/layout/Section/Section";
import Panel, { PanelColor, PanelVariant } from "components/common/layout/Panel/Panel";
import Heading, { HeadingColor, HeadingVariant } from "components/common/ui/Heading/Heading";
import FormAuth from "components/Form/FormAuth/FormAuth";
import { useStore } from "stores/store";
import LinkStyled from "components/common/ui/LinkStyled/LinkStyled";
import { observer } from "mobx-react-lite";
import Button, { ButtonVariant, ButtonDirectory } from "components/common/ui/Button/Button";
import { SvgAuthBg, SvgAuthBgSec } from "components/common/ui/Icon";
import FormRestore from "components/Form/FormRestore/FormRestore";

function RestorePasswordNewPage() {
	const store = useStore();
	useEffect(() => {
		store.appStore.setAppRouteName('.авторизация')

	}, [store.appStore.token]);

	return (
		<Layout className={'page-intro'} headerContent={<Button className={"tablet:inline-flex hidden ml-auto mr-8"} text={'Помощь'} variant={ButtonVariant.tech} />}>
			<Section type={SectionType.centered}>
				<Panel className={"col-span-6 mb-12 tablet:col-span-full desktop:col-span-6"}
					header={<Heading text={"Восстановление пароля"}
						variant={HeadingVariant.h1} color={HeadingColor.accent}/>}
					footer={<LinkStyled text={'У меня нет аккаунта'}  to={'/register'}/>}
				>
					<p>
						<strong>Пожалуйста, введите вашу почту, которую вы оставляли при регистрации.</strong> Мы отправим вам письмо с активной ссылкой для смены пароля.
					</p>
				</Panel>
				{!store.userStore.currentUser  ?
					<Panel className={"col-span-6 desktop:col-start-8 desktop:col-span-5 tablet:col-start-2 tablet:col-end-12 tablet:justify-self-center desktop:justify-self-auto w-full max-w-2xl"} variant={PanelVariant.withPadding} background={PanelColor.glass}>
						<FormRestore/>
					</Panel> : <Panel className={"col-span-6 desktop:col-start-8 desktop:col-span-5 tablet:col-start-2 tablet:col-end-12 tablet:justify-self-center desktop:justify-self-auto w-full max-w-2xl"}
						footer={<>
							<Button text={'Logout'} action={() => store.authStore.logout() } />
							<LinkStyled text={'в личный кабинет'} variant={ButtonVariant.accent} directory={ButtonDirectory.customer} to={'/register/success'} /></>}

					>UserId: <h4>{store.userStore.currentUser?.id}</h4></Panel>}
			</Section>
			<SvgAuthBg className={"authBg"}/>
			<SvgAuthBgSec className={"authBgSec"}/>
		</Layout>
	)
}
export default observer(RestorePasswordNewPage)
