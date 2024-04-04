import React, { useEffect, useState } from "react";
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelColor, PanelRouteStyle, PanelVariant } from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import { useStore } from 'stores/store'
import { Outlet, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { PermissionNames } from 'stores/permissionStore'
import Button, { ButtonDirectory, ButtonSizeType, ButtonVariant } from 'components/common/ui/Button/Button'
import TableWithSortNew  from "components/common/layout/TableWithSort/TableWithSortNew";
import { observer, useLocalStore } from "mobx-react-lite";
import {  dateTransformShort } from "utils/utils";
import userStore from 'stores/userStore'
import  { client } from "utils/agent";
import { FilterData } from 'components/common/layout/TableWithSort/DataFilter'
import useSWR from "swr";

import {  LocalRootStore } from "stores/localStore";
import { useDidUpdate } from "@mantine/hooks";

const localRootStore =  new LocalRootStore()

const BidsPage = () => {
	const store = useStore()
	const navigate = useNavigate()
	const location = useLocation()
	const textData = store.bidsStore.text
	const params = useParams()
	const localStore = useLocalStore<LocalRootStore>(() => localRootStore)
	const {isLoading, data, mutate} = useSWR(['bids', localStore.params.getSearchParams] , ([url, args]) => store.bidsStore.loadBids(args),
		{refreshInterval: 10000}
	)
	useDidUpdate(
		() => {
			if(location.pathname === '/account/companies') {
				mutate()
			}
		},
		[location.pathname]
	);
	useEffect(() => {
		localStore.setData = {
			...data,
			results: data?.results?.map((r:any) => ({
			idnum: r.id,
			id: r.id,
			status: r.status,
			created: dateTransformShort(r.created).date,
			customer: r.company.name,
			performer: r.performer.name,
			conductor: ((r.conductor && r.conductor?.first_name) && (r.conductor && r.conductor?.first_name)) ? r.conductor && r.conductor?.first_name + ' ' + r.conductor?.last_name[0] + '.' : "",
			executor: ((r.executor && r.executor?.first_name) && (r.executor && r.executor?.first_name))  ? r.executor?.first_name + ' ' + r.executor?.last_name[0] + '.' : "",
			number: r.car?.number,
			city: r.company.city.name,
			service_type: r.service_type.name,
			query: {
				company_id: userStore.isAdmin ? r.company.id : userStore.myProfileData.company.id,
			}
		}))}
		localStore.setIsLoading = isLoading
		return
	},[data])

	if (location.pathname.includes('create') || location.pathname.includes('edit')) return <Outlet />
	if (location.pathname.includes(`/account/bids/${params.company_id}/${params.id}`)) return <Outlet />

	// @ts-ignore
	return (
		<Section type={SectionType.default}>
			<Panel variant={PanelVariant.withGapOnly} headerClassName={'flex justify-between gap-4'}

				header={<>
					<div className={'mr-auto'}>
						<Heading text={textData.title} variant={HeadingVariant.h1} className={'inline-block !mb-0'} color={HeadingColor.accent} />
					</div>
					{store.userStore.getUserCan(PermissionNames['Управление заявками'], 'create') && (<>
						<Button text={textData.loadExcel} action={() => navigate('create')} trimText={true} className={'inline-flex'} variant={ButtonVariant["accent-outline"]} size={ButtonSizeType.sm} />
						<Button text={textData.create} action={() => {
							store.bidsStore.justCreatedBid = {}
							store.bidsStore.formResultsClear()
							navigate('create')
						}} trimText={true} className={'inline-flex'} directory={ButtonDirectory.directory} size={ButtonSizeType.sm} />
					</>)}</>}>
			</Panel>

				<TableWithSortNew
							store={localRootStore}
							variant={PanelVariant.dataPadding}
							search={true}
							style={PanelRouteStyle.bids}
							background={PanelColor.glass}
							className={'col-span-full table-groups table-bids'}
							filter={true}
							initFilterParams={[FilterData.city, FilterData.is_active, FilterData.service_type, FilterData.start_date, FilterData.end_date]}
							state={localStore.setIsLoading}
							ar={textData.tableHeaders}
				/>
		</Section>
	)
}
export default observer(BidsPage)
