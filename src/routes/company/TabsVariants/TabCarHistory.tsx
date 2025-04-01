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
import dayjs from "dayjs";

const localRootStoreF = new LocalRootStore()

const TabCarHistory = ({company_id, car_id, company_type, state }:any) => {
	const store = useStore()
	const params = useParams()
	const localStoreF = useLocalStore<LocalRootStore>(() => localRootStoreF)
	const {isLoading, data} = useSWR([`car_history_${car_id}`, company_id, car_id,localStoreF.params.getSearchParams] , ([url, company_id, car_id]) => agent.Cars.getCarHistory(company_id, car_id).then(r => r.data))
	const actions:Record<string, string> = {
		create: "Создано",
		update: "Обновлено",
		delete: "Удалено"
	}

	useEffect(() => {
		localStoreF.setData = {
			...data,
			results: data?.results?.map((item: any & {rootRoute?: string} ) => ({
				created: dayjs(item.created).format('DD.MM.YYYY hh:mm'),
				action: actions[item.action],
				changes: Array.from(Object.entries(item.changes)).map(el => `${el[0]}:${el[1]}`).join(', ').toString(),
				user: item.user.last_name + " " + item.user.first_name,
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
	return	<Tabs.Panel  state={state} name={'user_history'} variant={PanelVariant.dataPadding} background={PanelColor.default} className={'!bg-none !border-0 !grid-rows-none'}  bodyClassName={'!bg-transparent'}>
		<TableWithSortNew	store={localRootStoreF}
			state={isLoading}
			className={'!rounded-none  !bg-none overflow-visible !border-0'}
			bodyClassName={'!bg-none !rounded-none !bg-transparent'}
			background={PanelColor.default}
			footerHeight={"12rem"}
			autoScroll={true}
			filter={false}
			search={true}
			style={PanelRouteStyle.car_history}
			variant={PanelVariant.default}
			footer={false}  ar={[
			{ label: 'Дата', name: 'created' },
			{ label: 'Действие', name: 'action' },
			{ label: 'Изменения', name: 'changes' },
			{ label: 'Пользователь', name: 'user' }
		]}/>

	</Tabs.Panel>
}

export default observer(TabCarHistory)
