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

const localRootStoreF = new LocalRootStore()

const TabUsers = ({companyId, company_type, state }:any) => {
	const store = useStore()
	const params = useParams()
	const localStoreF = useLocalStore<LocalRootStore>(() => localRootStoreF)
	const {isLoading, data} = useSWR([`users_${companyId}`, company_type, companyId,localStoreF.params.getSearchParams] , ([url, company_type, companyId, args]) => store.companyStoreNew.loadCompanyUsers(company_type, companyId, args))

	useEffect(() => {
		localStoreF.setData = {
			...data,
			results: data?.results?.map((item: any & {rootRoute?: string} ) => ({
				state: item.employee.is_active,
				name: item.employee.last_name + ' ' + item.employee.first_name,
				phone: item.employee.phone,
				email: item.employee.email,
				group: item.group.name,
				// @ts-ignore
				company: item.company.name,
				// @ts-ignore
				// city: item.company.city.name,
				id: item.id,
				query: {
					company_id: item.company.id,
					rootRoute: `/account/users/${item.company.company_type === "Клиент" ? "customer" : "performer" }/${item.company.id}/${item.employee.id}`,
				},
			}))}
		localStoreF.setIsLoading = isLoading
	},[data])
	const ft = React.useMemo(() => {
		const _ft = []
		if(store.appStore.appType === "admin") {
			_ft.push(FilterData.company_type)
		}
		_ft.push(FilterData.employee__is_active)
		return _ft
	}, [])
	return	<Tabs.Panel  state={state} name={'users'} variant={PanelVariant.dataPadding} background={PanelColor.default} className={'!bg-none !border-0 !grid-rows-none'}  bodyClassName={'!bg-transparent'}>
		<TableWithSortNew store={localRootStoreF}
			state={isLoading}
			className={'!rounded-none  !bg-none overflow-visible !border-0'}
			bodyClassName={'!bg-none !rounded-none !bg-transparent'}
			background={PanelColor.default}
			footerHeight={"12rem"}
			autoScroll={true}

			search={true} filter={true}
			initFilterParams={[FilterData.employee__is_active]}
			style={PanelRouteStyle.users}
			variant={PanelVariant.default}
			footer={false}  ar={[
			{ label: 'Статус', name: 'employee__is_active' },
			{ label: 'ФИО', name: 'employee' },
			{ label: 'Телефон', name: 'employee__phone' },
			{ label: 'e-mail', name: 'email' },
			{ label: 'Тип', name: 'company__company_type' },
			{ label: 'Компания', name: 'company__name' },
			// { label: 'Город', name: 'city' },
		]}/>

	</Tabs.Panel>
}

export default observer(TabUsers)
