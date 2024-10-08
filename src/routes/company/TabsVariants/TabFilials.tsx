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
// localRootStoreF.params.setSearchParams({
// 	page_size: 10
// })
const TabFilials = ({companyId, company_type, state }:any) => {
	const store = useStore()
	const localStoreF = useLocalObservable<LocalRootStore>(() => localRootStoreF)
	console.log(localStoreF.params.getSearchParams);
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
					company_id: item.parent?.id || store.userStore.myProfileData.company.id,
					rootRoute: `/account/filials/${company_type}/${item.parent?.id || store.userStore.myProfileData.company.id}/${item.id}`,
				},
			}))}
		localStoreF.setIsLoading = isLoading
	},[data, localStoreF.params.getSearchParams])

	return <Tabs.Panel state={state}
		name={'filials'}
		variant={PanelVariant.dataPadding}
		background={PanelColor.default}
		className={'!bg-none !border-0 !grid-rows-none'}  bodyClassName={'!bg-transparent'}>
		<TableWithSortNew
			store={localRootStoreF}
			state={isLoading}
			footerHeight={"12rem"}
			className={'!rounded-none  !bg-none overflow-visible !border-0'}
			bodyClassName={'!bg-none !rounded-none !bg-transparent'}
			background={PanelColor.default}
			autoScroll={true}
			search={true} filter={true}
			initFilterParams={[FilterData.is_active,FilterData.city]}
			variant={PanelVariant.default}
			footer={false}
			ar={[{label: 'Статус', name: 'is_active'}, {label: 'Филиал', name: 'name'}, {label:'Город', name: 'city'}]}/>
	</Tabs.Panel>
}

export default observer(TabFilials)
