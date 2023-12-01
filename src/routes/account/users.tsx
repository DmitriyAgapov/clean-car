import React from "react";
import Section, { SectionType } from "components/common/layout/Section/Section";
import Panel, { PanelColor, PanelVariant } from "components/common/layout/Panel/Panel";
import Heading, { HeadingColor, HeadingVariant } from "components/common/ui/Heading/Heading";
import { SvgSearch } from "components/common/ui/Icon";
import Chips from "components/common/ui/Chips/Chips";

export default function UsersPage() {
	return (
		<Section type={SectionType.default}>
			<Panel className={"col-span-full"}
				header={<>
					<Heading text={"Пользователи"} variant={HeadingVariant.h4} className={'!mb-6'} color={HeadingColor.accent}/>
					<div className={'form-search relative'}><input type={'search'} placeholder={'Быстрый поиск'} className={'search-dashboard'}/><SvgSearch className={'inline-block absolute top-2.5 left-2'}/> </div>
				</>}/>

			<Panel  className={"col-span-full"} variant={PanelVariant.default} background={PanelColor.glass}>
				<Chips state={false} />
				<Chips state={true} />
				<p>Мы рады, что вы выбрали нас.<br/>
					Пожалуйста, заполните данные для регистрации</p>

			</Panel>
		</Section>

	)
}
