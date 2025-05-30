import React, { useEffect } from "react";
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelColor, PanelRouteStyle, PanelVariant } from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import { useStore } from 'stores/store'
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import { PermissionNames } from 'stores/permissionStore'
import Button, { ButtonDirectory, ButtonSizeType, ButtonVariant } from 'components/common/ui/Button/Button'
import TableWithSortNew  from "components/common/layout/TableWithSort/TableWithSortNew";
import { observer, useLocalObservable } from "mobx-react-lite";
import userStore from 'stores/userStore'
import { FilterData } from 'components/common/layout/TableWithSort/DataFilter'
import useSWR from "swr";

import { LocalRootStore } from "stores/localStore";
import { useDidUpdate } from "@mantine/hooks";
import dayjs from "dayjs";
import BidModalOptionsSelect from "routes/bids/BidComponents/BidModalOptionsSelect";
import agent from "utils/agent";

const localRootStore =  new LocalRootStore()
localRootStore.params.setSearchParams({ordering: '-created'})

const BidsPage = () => {
	const store = useStore()
	const navigate = useNavigate()
	const location = useLocation()
	const textData = store.bidsStore.text
	const params = useParams()
	const localStore = useLocalObservable<LocalRootStore>(() => localRootStore)
	const {isLoading, data, mutate} = useSWR(localStore.params.getIsReady ? ['bids', {...localStore.params.getSearchParams}] : null, ([url, args]) => store.bidsStore.loadBids(args),
		{refreshInterval: 10000}
	)

	useDidUpdate(
		() => {
			if(location.pathname === '/account/bids') {
				mutate().then(() => console.log('updated bids'))
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
			created: dayjs(r.created).format('DD.MM.YYYY HH:mm'),
			...((store.appStore.appType === "performer" || store.appStore.appType === "admin") && {customer: r.company.name}),
			...((store.appStore.appType === "customer"  || store.appStore.appType === "admin") && {performer: r.performer.name}),
			conductor: (r.conductor && r.conductor?.first_name &&  r.conductor?.last_name) ? r.conductor?.last_name + ' ' + r.conductor?.first_name[0] + '.' : " ",
			executor: (r.executor && r.executor?.first_name &&  r.executor?.last_name)  ? r.executor?.last_name + ' ' + r.executor?.first_name[0] + '.' : " ",
			number: r.car?.number,
			city: r.company.city.name,
			service_type: r.service_type.name,
			query: {
				company_id: userStore.isAdmin ? r.company.id : userStore.myProfileData.company.id,
			}
		}))}
		localStore.setIsLoading = isLoading
	},[data])

	if (location.pathname.includes('create') || location.pathname.includes('edit')) return <Outlet />
	if (location.pathname.includes(`/account/bids/${params.company_id}/${params.id}`)) return <Outlet />

	let th = (() => {
		const _th = [
			{ label: '№', name: 'id' },
			{ label: 'Статус', name: 'status' },
			{ label: 'Дата/Время', name: 'created' }
		]
		const _last = [{ label: 'Водитель', name: 'conductor' },
			{ label: 'Партнер', name: 'executor' },
			{ label: 'ТС', name: 'car' },
			{ label: 'Город', name: 'city__name' },
			{ label: 'Услуга', name: 'service_type' }
		]
		if(store.appStore.appType === "performer" || store.appStore.appType === "admin")  {
			_th.push({ label: 'Клиент', name: 'company' })
		}
		if(store.appStore.appType === "customer"  || store.appStore.appType === "admin")  {
			_th.push({ label: 'Партнер', name: 'performer' })
		}
		_th.push(..._last)
		return _th
	})()

	return (
		<Section type={SectionType.default}>
			<Panel variant={PanelVariant.withGapOnly} headerClassName={`${store.appStore.appType !== "admin" ? "flex" : ""} justify-between gap-4`}

				header={<>
					<Heading text={textData.title}
						variant={HeadingVariant.h1}
						className={'inline-block  !mb-0'}
						color={HeadingColor.accent} />

				<div className={`flex gap-6 tablet-max:max-w-96 ${store.appStore.appType === "admin" ? "mobile:mt-6" : ""}`}>
					{store.userStore.getUserCan(PermissionNames["Управление заявками"], "create") && (<>
						{store.appStore.appType === "admin" && <Button text={textData.loadExcel}
							action={() => agent.Bids.getExportBids(localStore.params.searchParams)}
							trimText={true}
								isOnce={true}
							className={"inline-flex tablet-max:flex-1"}
							variant={ButtonVariant["accent-outline"]}
							size={ButtonSizeType.sm} />}
						<Button text={textData.create}
							action={() => {
								store.bidsStore.justCreatedBid = {};
								store.bidsStore.formResultsClear();
								navigate("create");
							}}
							trimText={true}
							className={"inline-flex tablet-max:flex-1"}
							directory={ButtonDirectory.directory}
							size={ButtonSizeType.sm} />

					</>)}			</div></>
				}>
				</Panel>

					<TableWithSortNew
							store={localRootStore}
							variant={PanelVariant.dataPadding}
							search={true}
							style={PanelRouteStyle.bids}
							background={PanelColor.glass}
							className={'col-span-full table-groups table-bids'}
							filter={true}
							initFilterParams={[FilterData.city, FilterData.bidStatus, FilterData.service_type, FilterData.start_date, FilterData.end_date]}
							state={false}
							ar={th}
				/>
		</Section>
	)
}
export default observer(BidsPage)
