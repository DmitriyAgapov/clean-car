import React, { useEffect } from "react";
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelColor, PanelRouteStyle, PanelVariant } from "components/common/layout/Panel/Panel";
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import { useStore } from 'stores/store'
import {  Outlet,  useLocation } from "react-router-dom";
import { PermissionNames } from 'stores/permissionStore'
import Button, { ButtonDirectory, ButtonSizeType, ButtonVariant } from 'components/common/ui/Button/Button'
import TableWithSortNew from "components/common/layout/TableWithSort/TableWithSortNew";
import FormModalCreatePrice from "components/Form/FormModalCreatePrice/FormModalCreatePrice";
import { LocalRootStore } from "stores/localStore";
import { observer, useLocalStore } from "mobx-react-lite";
import useSWR from "swr";
import { useDidUpdate } from "@mantine/hooks";

const localRootStore =  new LocalRootStore()
const PricesPage = () => {
	const store = useStore()
	const location = useLocation()
	const localStore = useLocalStore<LocalRootStore>(() => localRootStore)
	const {isLoading, data, mutate, isValidating} = useSWR(['prices', {company_id:store.userStore.myProfileData.company.id, params:localStore.params.getSearchParams}] , ([url, args]) => store.priceStore.getAllPrices(args))

	useEffect(() => {
		console.log(data);
		localStore.setData = {
			...data,
			results: data?.results
		}
		localStore.setIsLoading = isLoading
	},[data])

	useDidUpdate(
		() => {
			if(location.pathname === '/account/prices') {
				mutate()
			}
		},
		[location.pathname]
	);
	const { textData }:any = store.priceStore.allPrices

	if (location.pathname.includes('create') || location.pathname.includes('edit')) return <Outlet />
	if (location.pathname !== `/account/price`) return <Outlet />

	// if(store.appStore.appType === "admin") {
		return (
		<Section type={SectionType.default}>
			<Panel variant={PanelVariant.withGapOnly} headerClassName={'flex justify-between gap-4'}
				state={false}
				header={<>
					<div className={'mr-auto'}>
						<Heading text={textData.title} variant={HeadingVariant.h1} className={'inline-block !mb-0'} color={HeadingColor.accent} />
					</div>
					{store.userStore.getUserCan(PermissionNames['Управление прайс-листом'], 'create') && (<>
						<Button text={textData.create} action={() => (async() => {
							store.appStore.setModal({
								className: "!px-10 gap-4 !justify-stretch",
								component: <FormModalCreatePrice />,
								text: `Вы уверены, что хотите удалить ${"name"}`,
								state: true
							});
						})()} trimText={true} className={'inline-flex'} directory={ButtonDirectory.directory} size={ButtonSizeType.sm} />
					</>)}</>}>
			</Panel>
			<TableWithSortNew
				store={localRootStore}
				variant={PanelVariant.dataPadding}
				search={true}
				background={PanelColor.glass}
				className={'col-span-full table-groups h-full'}
				filter={false}
				ar={(() => {
					if(store.appStore.appType === "admin") {
						return store.priceStore.allPrices.textData.tableHeaders
					} return [{ label: 'Компания', name: 'name' },
						{ label: 'Филиал', name: 'company__parent__name' }]})()
				}
			/>

		</Section>
	)
	// } else {
	// 	return  <Navigate to={`${ store.userStore.myProfileData.company?.id }`} replace={false}  relative={'route'}/>
	// }
}
export default observer(PricesPage)
