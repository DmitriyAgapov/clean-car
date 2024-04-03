import { PanelColor, PanelVariant } from "components/common/layout/Panel/Panel";
import TableWithSortNew from "components/common/layout/TableWithSort/TableWithSortNew";
import Tabs from "components/common/layout/Tabs/Tabs";
import React, { useEffect } from "react";
import { observer, useLocalStore } from "mobx-react-lite";
import { LocalRootStore } from "stores/localStore";
import useSWR from "swr";
import { useParams } from "react-router-dom";
import { useStore } from "stores/store";
import Heading, { HeadingVariant } from "components/common/ui/Heading/Heading";

const localRootStoreF = new LocalRootStore()

const TabCars = ({companyId, company_type, state }:any) => {
	const store = useStore()
	const params = useParams()
	const localStoreF = useLocalStore<LocalRootStore>(() => localRootStoreF)
	const {isLoading, data} = useSWR([`cars_${companyId}`, company_type, companyId,localStoreF.params.getSearchParams] , ([url, company_type, companyId, args]) => store.companyStoreNew.loadCompanyCars(company_type, companyId, args))

	useEffect(() => {
		localStoreF.setData = {
			...data,
			results: data?.results?.map((item: any & {rootRoute?: string} ) => ({
				state: item.is_active,
				brand: item.brand.name,
				model: item.model.name,
				car_type: item.model.car_type,
				number: item.number,
				filial: item.company.parent ? item.company.parent.name : '-',
				city: item.company.city.name,
				id: item.id,
				query: {
					company_id: companyId,
					rootRoute: `/account/cars/${item.id}`,
				},
			}))}
		localStoreF.setIsLoading = isLoading
	},[data, localStoreF.params.getSearchParams])

	return	<Tabs.Panel  state={state} name={'cars'} variant={PanelVariant.dataPadding} background={PanelColor.default} className={'!bg-none !border-0'}  bodyClassName={'!bg-transparent'}>
<TableWithSortNew		store={localRootStoreF}
	state={isLoading}
	className={'!rounded-none  !bg-none overflow-visible !border-0'}
	bodyClassName={'!bg-none !rounded-none !bg-transparent'}
	background={PanelColor.default}
	search={true} filter={true}

	variant={PanelVariant.default}
	footer={false}
	ar={[{label: "Статус", name: 'is_active'}, {label: 'Марка', name: 'brand'},{label: 'Модель', name: 'model'}, {label: 'Тип', name: 'model__car_type'}, {label: 'Гос.номер', name: 'number'}, {label: 'Принадлежит', name: 'company'}, {label: 'Город', name: 'company__city__name'}]}/>

	</Tabs.Panel>
}

export default observer(TabCars)
