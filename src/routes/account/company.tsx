import React, { useEffect } from "react";
import Section, { SectionType } from "components/common/layout/Section/Section";
import Panel, { PanelColor, PanelVariant } from "components/common/layout/Panel/Panel";
import Heading, { HeadingColor, HeadingVariant } from "components/common/ui/Heading/Heading";
import { SvgSearch } from "components/common/ui/Icon";
import Button, { ButtonDirectory, ButtonSizeType, ButtonVariant } from "components/common/ui/Button/Button";
import TableWithSort from "components/common/layout/TableWithSort/TableWithSort";
import { useStore } from "stores/store";
import { observer } from "mobx-react-lite";
const  CompanyPage = () => {
	const store = useStore()

	return (
		<Section type={SectionType.default}>
			<Panel className={"col-span-full"}
				header={<>
					<Heading text={"Компании"} variant={HeadingVariant.h4} className={'!mb-6 inline-flex'} color={HeadingColor.accent}/>
					<Button text={'Создать компанию'}  variant={ButtonVariant.accent} className={'inline-flex float-right'} directory={ButtonDirectory.admin} size={ButtonSizeType.sm}/>
					<div className={'form-search relative'}>
						<input type={'search'} placeholder={'Быстрый поиск'} className={'search-dashboard'}/>
						<SvgSearch className={'inline-block absolute top-2.5 left-2'}/>
					</div>
				</>}/>

				<TableWithSort
					data={store.companyStore.companies}
					state={store.companyStore.loadingCompanies}
				/>

		</Section>

	)
}

export default  observer(CompanyPage)
