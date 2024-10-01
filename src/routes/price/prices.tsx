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
import { observer, useLocalObservable } from "mobx-react-lite";
import useSWR from "swr";
import { useDidUpdate, useDisclosure } from '@mantine/hooks'
import { UpBalance } from "components/common/layout/Modal/UpBalance";

const localRootStore =  new LocalRootStore()
const PricesPage = () => {
	const store = useStore()
	const location = useLocation()
	const localStore = useLocalObservable<LocalRootStore>(() => localRootStore)
	const {isLoading, data, mutate, isValidating} = useSWR(localStore.params.isReady && ['prices', {company_id:store.userStore.myProfileData.company.id, params:localStore.params.getSearchParams}] , ([url, args]) => store.priceStore.getAllPrices(args))

	useEffect(() => {
		localStore.setData = {
			...data,
			results: data?.results.map((item:any) => ({...{id: item.id, company_name: item.name,   root_company: item.root_company}, ...store.appStore.appType === "admin" && {company_type: item.company_type}}))
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

	const [opened, { open, close }] = useDisclosure(false)
	const { textData }:any = store.priceStore.allPrices
	const memoModal = React.useMemo(() => {
		if(isLoading && !data) return null
		if(data) return <FormModalCreatePrice opened={opened} onClose={close} />
	}, [opened])
	if (location.pathname.includes('create') || location.pathname.includes('edit')) return <Outlet />
	if (location.pathname !== `/account/price`) return <Outlet />

	// if(store.appStore.appType === "admin") {
		return (
		<Section type={SectionType.default}>
			<Panel variant={PanelVariant.withGapOnly} headerClassName={'flex justify-between gap-4'}
				state={false}
				header={<>

						<Heading text={textData.title} variant={HeadingVariant.h1} className={'inline-block !mb-0'} color={HeadingColor.accent} />

					{store.userStore.getUserCan(PermissionNames['Управление прайс-листом'], 'create') && (<>
						<Button text={textData.create} action={open} trimText={true} className={'inline-flex'} directory={ButtonDirectory.directory} size={ButtonSizeType.sm} />
					</>)}</>}>
			</Panel>
			<TableWithSortNew
				store={localRootStore}
				variant={PanelVariant.dataPadding}
				search={true}
				style={PanelRouteStyle.prices}
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
			{memoModal}
		</Section>
	)
	// } else {
	// 	return  <Navigate to={`${ store.userStore.myProfileData.company?.id }`} replace={false}  relative={'route'}/>
	// }
}
export default observer(PricesPage)
