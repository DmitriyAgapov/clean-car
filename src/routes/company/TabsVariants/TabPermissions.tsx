import { PanelColor, PanelRouteStyle, PanelVariant } from "components/common/layout/Panel/Panel";
import TableWithSortNew from "components/common/layout/TableWithSort/TableWithSortNew";
import Tabs from "components/common/layout/Tabs/Tabs";
import React, { useEffect } from "react";
import { observer, useLocalObservable, useLocalStore } from 'mobx-react-lite'
import { LocalRootStore } from "stores/localStore";
import useSWR from "swr";
import { useParams } from "react-router-dom";
import { useStore } from "stores/store";
import { FilterData } from "components/common/layout/TableWithSort/DataFilter";
import agent from "utils/agent";
import userStore from "stores/userStore";
import moment from "moment/moment";
import Button from "components/common/ui/Button/Button";

const localRootStoreF = new LocalRootStore()
// localRootStoreF.params.setSearchParams({
// 	page_size: 10
// })
const TabPermissions = ({companyId, company_type, state, button }:any) => {
	const store = useStore()
	const localStoreF = useLocalObservable<LocalRootStore>(() => localRootStoreF)
	const {isLoading, data} = useSWR([`company_permissions_${companyId}`, company_type, companyId, {...localStoreF.params.getSearchParams}] , ([url, company_type, companyId, args]) => agent.Permissions.getAllCompanyPermissions(companyId, args).then(r => r.data));
	console.log(companyId);
	useEffect(() => {
		localStoreF.setData = {
			...data,
			results: data?.results?.map((item: any) => ({
				date: moment(item.created).format('DD.MM.YYYY HH:mm'),
				name: item.name,
				id: item.id,
				query: {
					group: store.appStore.appType,
					rootRoute: `/account/groups/${store.appStore.appType}/${companyId}/${item.id}`,
				},
			}))}
		localStoreF.setIsLoading = isLoading
	},[data, localStoreF.params.getSearchParams])

	return	<> <Tabs.Panel state={state}
		name={'permissions'}
		variant={PanelVariant.dataPadding}
		background={PanelColor.default}
		className={'!bg-none !border-0 !grid-rows-none'}  bodyClassName={'!bg-transparent'}>
		<TableWithSortNew
			store={localRootStoreF}
			background={PanelColor.default}
			variant={PanelVariant.default}
			search={true}
			style={PanelRouteStyle.groups}
			className={'!rounded-none  !bg-none overflow-visible !border-0'}
			bodyClassName={'!bg-none !rounded-none !bg-transparent'}
			filter={true}
			state={isLoading}
			ar={[{ label: "дата и время", name: "created" }, {label: 'Название группы', name: 'name'}]}
			footerHeight={"12rem"}
			// className={'!rounded-none  !bg-none overflow-visible !border-0'}

			autoScroll={true}
			// initFilterParams={[FilterData.is_active,FilterData.city]}
			footer={false}
			// ar={[{label: 'Статус', name: 'is_active'}, {label: 'Филиал', name: 'name'}, {label: "Принадлежит", name: "parent"}, {label:'Город', name: 'city'}]}
		/>
	</Tabs.Panel>

	</>
}

export default observer(TabPermissions)
