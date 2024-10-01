import { PanelColor, PanelVariant } from "components/common/layout/Panel/Panel";
import TableWithSortNew from "components/common/layout/TableWithSort/TableWithSortNew";
import Tabs from "components/common/layout/Tabs/Tabs";
import React, { useEffect } from "react";
import { observer, useLocalObservable, useLocalStore } from 'mobx-react-lite'
import { LocalRootStore } from "stores/localStore";
import useSWR from "swr";
import { useParams } from "react-router-dom";
import { useStore } from "stores/store";
import { FilterData } from "components/common/layout/TableWithSort/DataFilter";

const localRootStoreF = new LocalRootStore()

const TabFilials = ({companyId, company_type, state }:any) => {
	const store = useStore()
	const localStoreF = useLocalObservable<LocalRootStore>(() => localRootStoreF)
	const {isLoading, data} = useSWR([`filials_${companyId}`, company_type, companyId, {...localStoreF.params.getSearchParams}] , ([url, company_type, companyId, args]) => store.companyStoreNew.loadCompanyFiliales(company_type, companyId, args))

	useEffect(() => {
		localStoreF.setData = {
			...data,
			results: data?.results?.map((item: any & {rootRoute?: string} ) => ({
				state: item.is_active,
				name: item.name,
				city: item.city.name,
				id: item.id,
				query: {
					company_id: companyId,
					rootRoute: `/account/filials/${company_type}/${companyId}/${item.id}`,
				},
			}))}
		localStoreF.setIsLoading = isLoading
	},[data, localStoreF.params.getSearchParams])

	return <Tabs.Panel state={state}
		name={'filials'}
		variant={PanelVariant.dataPadding}
		background={PanelColor.default}
		className={'!bg-none !border-0'}  bodyClassName={'!bg-transparent'}>
		<TableWithSortNew
			store={localRootStoreF}
			state={isLoading}
			className={'!rounded-none  !bg-none overflow-visible !border-0'}
			bodyClassName={'!bg-none !rounded-none !bg-transparent'}
			background={PanelColor.default}
			search={true} filter={true}
			initFilterParams={[FilterData.is_active,FilterData.city]}
			variant={PanelVariant.default}
			footer={false}
			ar={[{label: 'Статус', name: 'is_active'}, {label: 'Филиал', name: 'name'}, {label:'Город', name: 'city'}]}/>
	</Tabs.Panel>
}

export default observer(TabFilials)
