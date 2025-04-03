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
import agent from "utils/agent";

const localRootStoreF = new LocalRootStore()

const TabUserCars = ({companyId, userId, company_type, state }:any) => {
	const store = useStore();
	const params = useParams();
	const localStoreF = useLocalStore<LocalRootStore>(() => localRootStoreF)
	const {isLoading, data} = useSWR([`user_cars_${userId}`, userId, companyId] , ([url, userId, companyId]) => agent.Account.getCompanyUser(companyId, userId).then(r => r.data))

	useEffect(() => {
		localStoreF.setData = {
			...data,
			count: data?.cars?.length,
			results: data?.cars?.map((item: any & {rootRoute?: string} ) => ({
				state: item.is_active,
				brand: item.brand.name,
				model: item.model.name,
				car_type: item.model.car_type,
				number: item.number,
				id: item.id,
				query: {
					company_id: data.company.id,
					rootRoute: `/account/cars/${data.company.id}/${item.id}`,
				},
			}))}
		localStoreF.setIsLoading = isLoading
	},[data,  localStoreF.params.getSearchParams])

	return	<Tabs.Panel  state={state} name={'cars'} variant={PanelVariant.dataPadding} background={PanelColor.default} className={'!bg-none !border-0 !grid-rows-none'}  bodyClassName={'!bg-transparent'}>
<TableWithSortNew		store={localRootStoreF}
	state={isLoading}
	footerHeight={"12rem"}
	autoScroll={true}
	search={true} filter={true}
	className={'!rounded-none  !bg-none overflow-visible !border-0'}
	bodyClassName={'!bg-none !rounded-none !bg-transparent'}
	background={PanelColor.default}
	variant={PanelVariant.default}
	footer={false}
	ar={[{label: "Статус", name: 'is_active'}, {label: 'Марка', name: 'brand'},{label: 'Модель', name: 'model'}, {label: 'Тип', name: 'model__car_type'}, {label: 'Гос.номер', name: 'number'}]}/>

	</Tabs.Panel>
}

export default observer(TabUserCars)
