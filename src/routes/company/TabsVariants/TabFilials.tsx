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

function filterFilials(arr: any[], filters: any) {
	return arr.filter(_arr => {
		return (
			(!filters.name || _arr.name.includes(filters.name)) &&
			(!filters.parentName || _arr.parent.name.includes(filters.parentName)) &&
			(!filters.company__city || _arr.city.id === Number(filters.company__city)) &&
			(filters.is_active === undefined || _arr.is_active === (filters.is_active === "true"))
		);
	});
}
function sortFilials(arr:any[], field:any) {
	const isReverse = field.startsWith('-');
	// Убираем символ '-' из поля, если он есть
	const actualField = isReverse ? field.slice(1) : field;

	return arr.sort((a, b) => {
		// Получаем значения для сравнения
		const aValue = actualField.split('.').reduce((obj: { [x: string]: any; }, key: string | number) => obj[key], a);
		const bValue = actualField.split('.').reduce((obj: { [x: string]: any; }, key: string | number) => obj[key], b);

		// Если значения являются числами, сортируем как числа
		if (typeof aValue === 'number' && typeof bValue === 'number') {
			return isReverse ? bValue - aValue : aValue - bValue;
		}

		// Иначе сортируем как строки
		if (aValue < bValue) return isReverse ? 1 : -1;
		if (aValue > bValue) return isReverse ? -1 : 1;
		return 0;
	});
}
const localRootStoreF = new LocalRootStore()

const TabFilials = ({companyId, company_type, state }:any) => {
	const store = useStore()
	const params = useParams()
	const localStoreF = useLocalObservable<LocalRootStore>(() => localRootStoreF)
	const {isLoading, data} = useSWR([`filials_${companyId}`, company_type, companyId, {}] , ([url, company_type, companyId, args]) => store.companyStoreNew.loadCompanyFiliales(company_type || params.company_type, params.id || companyId, args))
	console.log(data);
	useEffect(() => {
		const filter = localStoreF.params.getSearchParams
		const sortedAndFilteredDate = ['is_active', 'company__city'];
		let _res = [];
		const _arBeforee= data?.results[0]?.children;

		if(localStoreF.params.getSearchParams && !!_arBeforee) {
			_res = filterFilials(_arBeforee, filter);

		}
		if(localStoreF.params.getSearchParams.ordering && !!_res) {
			_res = sortFilials(_res, filter.ordering?.includes("city") ? filter.ordering === "-city" ? "city.id" : "-city.id" : filter.ordering)
		}
		console.log(_res);
		localStoreF.setData = {
			...data,
			results: _res.map((item: any & { rootRoute?: string }) => ({
				state: item.is_active,
				name: item.name,
				parent: item.parent.name,
				city: item.city.name,
				id: item.id,
				query: {
					company_id: item.parent?.id || store.userStore.myProfileData.company.id,
					rootRoute: `/account/filials/${company_type}/${item.parent?.id || store.userStore.myProfileData.company.id}/${item.id}`,
				},
				}))
			}
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
			ar={[{label: 'Статус', name: 'is_active'}, {label: 'Филиал', name: 'name'}, {label: "Принадлежит", name: "parent"}, {label:'Город', name: 'city'}]}/>
	</Tabs.Panel>
}

export default observer(TabFilials)
