import React, { useEffect } from "react";
import Section, { SectionType } from "components/common/layout/Section/Section";
import Panel, { PanelColor, PanelVariant } from "components/common/layout/Panel/Panel";
import Heading, { HeadingColor, HeadingVariant } from "components/common/ui/Heading/Heading";
import { SvgSearch } from "components/common/ui/Icon";
import agent from "utils/agent";
import Button, { ButtonDirectory, ButtonSizeType, ButtonVariant } from "components/common/ui/Button/Button";

export default function CompanyPage() {

	useEffect(() => {
		const dataCompany = async ()  => {
			return await agent.Companies.getListCompanyCustomer()
		}
		console.log('log', dataCompany())

	});
	return (
		<Section type={SectionType.default}>
			<Panel className={"col-span-full"}
				header={<>
					<Heading text={"Компании"} variant={HeadingVariant.h4} className={'!mb-6 inline-flex'} color={HeadingColor.accent}/>
					<Button text={'Создать компанию'}  variant={ButtonVariant.accent} className={'inline-flex float-right'} directory={ButtonDirectory.admin} size={ButtonSizeType.sm}/>
					<div className={'form-search relative'}><input type={'search'} placeholder={'Быстрый поиск'} className={'search-dashboard'}/><SvgSearch className={'inline-block absolute top-2.5 left-2'}/> </div>
				</>}/>
			<Panel  className={"col-span-full"} variant={PanelVariant.default} background={PanelColor.glass}>

				<p>Мы рады, что вы выбрали нас.<br/>
					Пожалуйста, заполните данные для регистрации</p>

			</Panel>
		</Section>

	)
}
