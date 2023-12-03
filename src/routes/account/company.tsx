import React from "react";
import Section, { SectionType } from "components/common/layout/Section/Section";
import Panel, { PanelRouteStyle } from "components/common/layout/Panel/Panel";
import Heading, { HeadingColor, HeadingVariant } from "components/common/ui/Heading/Heading";
import { SvgSearch } from "components/common/ui/Icon";
import Button, { ButtonDirectory, ButtonSizeType, ButtonVariant } from "components/common/ui/Button/Button";
import TableWithSort from "components/common/layout/TableWithSort/TableWithSort";
import { useStore } from "stores/store";
import { observer } from "mobx-react-lite";

type Items = {
	status: boolean, company: string, type: string, city: number
}
const  CompanyPage = () => {
	const store = useStore();

	return (
		<Section type={SectionType.default}>

			<Panel className={"col-span-full"}
				header={<>
					<Heading text={"Компании"} variant={HeadingVariant.h4} className={'!mb-6 inline-block'} color={HeadingColor.accent}/>
					<Button text={'Создать компанию'} action={() => store.companyStore.addCompany()}  variant={ButtonVariant.accent} className={'inline-flex float-right'} directory={ButtonDirectory.admin} size={ButtonSizeType.sm}/>
					<div className={'form-search relative'}>
						<input type={'search'} placeholder={'Быстрый поиск'} className={'search-dashboard'}/>
						<SvgSearch className={'inline-block absolute top-2.5 left-2'}/>
					</div>
				</>}
			/>

			<TableWithSort
				style={PanelRouteStyle.company}
				ar={['Статус', 'Компания', 'Тип', 'Город']}
				data={store.companyStore.companies.map( (item : any) => ({
					status: item.company.is_active as boolean,
					company: item.company.name,
					type: item.company_type,
					city: item.company.city
				}))}
				state={store.companyStore.loadingCompanies}
			/>
		</Section>

	)
}

export default  observer(CompanyPage)
