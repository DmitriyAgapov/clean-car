import React, { useEffect } from "react";
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelColor, PanelRouteStyle, PanelVariant } from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import { useStore } from 'stores/store'
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import TableWithSortNew from 'components/common/layout/TableWithSort/TableWithSortNew'
import { observer, useLocalStore } from "mobx-react-lite";
import dayjs from 'dayjs'
import { LocalRootStore } from "stores/localStore";
import useSWR from "swr";
import agent, { PaginationProps } from "utils/agent";
import paramsStore from "stores/paramStore";

const localRootStore =  new LocalRootStore()
const PricesHistoryPage = () => {
	const store = useStore()
	const localStore = useLocalStore<LocalRootStore>(() => localRootStore)
	const params = useParams()
	const {isLoading, data} = useSWR([`price_history_${params.id}`, Number(params.id), localStore.params.getSearchParams] , ([url,id, args]) => agent.Price.getHistoryPrice(id, args).then(r => r.data))
	console.log(data, isLoading);
	const navigate = useNavigate()
	// useEffect(() => {
	// 	if(store.appStore.appType === "performer") navigate(`/account/price/${store.userStore.myProfileData.company.id}`, {replace: true})
	// }, [store.appStore.appType]);
	const location = useLocation()
	// const { data }:any = useLoaderData()
	const  company = store.companyStore.getCompanyById(Number(params.id));
	const { textData }:any = store.priceStore.allPrices
	useEffect(() => {
		localStore.setData = {
			...data,
			results: data?.results?.map((p:any) => ({
				id: p.id,
				created: dayjs(p.created).format('DD.MM.YYYY HH:mm'),
				expires:  p.expires === null ? " " : dayjs(p.expires).format('DD.MM.YYYY HH:mm'),
				service_type: p.service_type?.name
			}))}
		localStore.setIsLoading = isLoading
	},[data])

	if (location.pathname.includes('history/')) return <Outlet />
		return (
		<Section type={SectionType.default}>
			<Panel variant={PanelVariant.withGapOnly} headerClassName={'flex justify-between gap-4'}
				state={false}
				header={<>
					<div className={'mr-auto'}>
						<Heading text={`История ${company?.name}`} variant={HeadingVariant.h1} className={'inline-block !mb-0'} color={HeadingColor.accent} />
					</div>
				</>}>
			</Panel>
			<TableWithSortNew
				store={localRootStore}
				variant={PanelVariant.dataPadding}
				search={true}
				style={PanelRouteStyle.price_history}
				background={PanelColor.glass}
				className={'col-span-full table-groups h-full'}
				filter={false}
				state={isLoading}
				ar={[{ label: 'дата начала', name: 'created' }, { label: 'Дата окончания', name: 'expires' }, {label: 'Тип услуги', name: 'service_type'}]}
			/>

		</Section>
	)
}
export default observer(PricesHistoryPage)
