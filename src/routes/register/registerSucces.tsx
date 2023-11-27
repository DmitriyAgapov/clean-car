import React, { useEffect } from "react";
import Layout from "components/common/layout/Layout/Layout";
import Section, { SectionType } from "components/common/layout/Section/Section";
import Panel, { PanelColor, PanelVariant } from "components/common/layout/Panel/Panel";
import Heading, { HeadingColor, HeadingDirectory, HeadingVariant } from "components/common/ui/Heading/Heading";

import { ButtonSizeType, ButtonVariant } from "components/common/ui/Button/Button"
import LinkStyled, { ButtonDirectory } from "components/common/ui/LinkStyled/LinkStyled";
import { useStore } from "stores/store";
import SpeedImg from '../../assets/icons/speed.png';
import QualityImg from '../../assets/icons/quality.png';
import ServiceImg from '../../assets/icons/service.png';
import CardFeaturesCircle from "components/common/layout/Cards/CardFeaturesCircle/CardFeaturesCircle";
import { SvgAuthBgSec } from "components/common/ui/Icon";

const cardsData = [
	{
		id: 'img-01',
		icon: <SpeedImg/>,
		title: 'Скорость',
		text: 'Выполняем все необходимые операции в кратчайшие сроки'
	},
	{
		id: 'img-02',
		icon: <QualityImg/>,
		title: 'Качество',
		text: 'Внедряем современные технологии'
	},
	{
		id: 'img-03',
		icon: <ServiceImg/>,
		title: 'Сервис',
		text: 'Всегда создаем комфорт для клиентов'
	}
]
export default function RegisterSuccessPage() {
	const store = useStore();

	useEffect(() => {
		store.appStore.setAppRouteName('.регистрация')
	});

	return (
		<>
		<Layout>
			<Section type={SectionType.centered}>
				<Panel className={"col-span-6 mb-12 tablet:col-span-full desktop:col-span-6"}
					header={<Heading directory={HeadingDirectory.executor} text={`${store.userStore.currentUser?.first_name}, регистрация прошла успешно!`} variant={HeadingVariant.h1} color={HeadingColor.accent}/>}
					footer={<>
							<LinkStyled text={'В личный кабинет'}  directory={ButtonDirectory.executor}  variant={ButtonVariant["accent"]} size={ButtonSizeType.base} to={'/auth'} className={'!mr-2'}/>
							<LinkStyled text={'На сайт'} variant={ButtonVariant["accent-outline"]} size={ButtonSizeType.base} to={'/auth'}/>
						</>}
				>
					<p>Приветствуем вас в нашем сервисе. Для вашего удобства, на указанный email направлено письмо с данными для входа.</p>
					<p><strong>Приятного пользования!</strong></p>
				</Panel>
				<Panel className={"col-span-6 desktop:col-start-7 desktop:col-span-6 tablet:col-start-2 tablet:col-end-12 tablet:justify-self-center desktop:justify-self-auto relative"} variant={PanelVariant.default} background={PanelColor.default}>
					{cardsData.map(c => <CardFeaturesCircle key={c.id} icon={c.icon} title={c.title} text={c.text} />)}
				</Panel>
			</Section>
			<SvgAuthBgSec className={"authBgSec success"}/>
		</Layout>

	</>
	)
}
