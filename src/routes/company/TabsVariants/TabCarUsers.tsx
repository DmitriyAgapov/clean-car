import { PanelColor, PanelRouteStyle, PanelVariant } from "components/common/layout/Panel/Panel";
import TableWithSortNew from "components/common/layout/TableWithSort/TableWithSortNew";
import Tabs from "components/common/layout/Tabs/Tabs";
import React, { useEffect } from "react";
import { observer, useLocalStore } from "mobx-react-lite";
import { LocalRootStore } from "stores/localStore";
import useSWR from "swr";
import { useParams } from "react-router-dom";
import { useStore } from "stores/store";
import { FilterData } from "components/common/layout/TableWithSort/DataFilter";
import agent from "utils/agent";

const localRootStoreF = new LocalRootStore()

const TabCarUsers = ({companyId, carId, company_type, state }:any) => {
	const store = useStore()
	const params = useParams()
	const localStoreF = useLocalStore<LocalRootStore>(() => localRootStoreF)
	const {isLoading, data} = useSWR([`car_users_${carId}`, companyId, carId] , ([url, companyId, carId]) => agent.Cars.getCompanyCar(companyId, carId).then(r => r.data))

	useEffect(() => {
		localStoreF.setData = {
			...data,
			count: data?.employees?.length,
			results: data?.employees.map((item: any & {rootRoute?: string} ) => ({
				state: item.is_active,
				name: item.last_name + ' ' + item.first_name,
				phone: item.phone,
				email: item.email,
				id: item.id,
				query: {
					company_id: data.company.id,
					rootRoute: `/account/users/${data.company.company_type === "Клиент" ? "customer" : "performer" }/${data.company.id}/${item.id}`,
				},
			}))}
		localStoreF.setIsLoading = isLoading
	},[data, isLoading])
	const ft = React.useMemo(() => {
		const _ft = []
		if(store.appStore.appType === "admin") {
			_ft.push(FilterData.company_type)
		}
		_ft.push(FilterData.employee__is_active)
		return _ft
	}, []);
	useEffect(() => {
		console.log(localRootStoreF);
	}, [localRootStoreF])
	return	<Tabs.Panel  state={state} name={'users'} variant={PanelVariant.dataPadding} background={PanelColor.default} className={'!bg-none !border-0 !grid-rows-none'}  bodyClassName={'!bg-transparent'}>
		<TableWithSortNew	store={localRootStoreF}
			state={isLoading}
			className={'!rounded-none  !bg-none overflow-visible !border-0'}
			bodyClassName={'!bg-none !rounded-none !bg-transparent'}
			background={PanelColor.default}
			footerHeight={"12rem"}
			autoScroll={true}

			search={true} filter={false}
			// initFilterParams={[FilterData.employee__is_active]}
			style={PanelRouteStyle.users}
			variant={PanelVariant.default}
			footer={false}  ar={[
			{ label: 'Статус', name: 'is_active' },
			{ label: 'ФИО', name: 'name' },
			{ label: 'Телефон', name: 'phone' },
			{ label: 'e-mail', name: 'email' },
			// { label: 'Город', name: 'city' },
		]}/>

	</Tabs.Panel>
}

export default observer(TabCarUsers)
