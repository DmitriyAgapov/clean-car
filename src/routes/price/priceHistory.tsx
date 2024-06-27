import React, { useEffect } from "react";
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelColor, PanelRouteStyle, PanelVariant } from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import { useStore } from 'stores/store'
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import TableWithSortNew from 'components/common/layout/TableWithSort/TableWithSortNew'
import { observer, useLocalObservable } from "mobx-react-lite";
import dayjs from 'dayjs'
import { LocalRootStore } from "stores/localStore";
import useSWR from "swr";
import agent from "utils/agent";
import Button, { ButtonVariant } from "components/common/ui/Button/Button";
import { SvgBackArrow } from "components/common/ui/Icon";

const localRootStore =  new LocalRootStore()
localRootStore.params.setSearchParams({ordering: 'expires'})
const PricesHistoryPage = () => {
	const store = useStore()
	const localStore = useLocalObservable<LocalRootStore>(() => localRootStore)
	const params = useParams()
	const {isLoading, data} = useSWR(localStore.params.isReady && [`price_history_${params.id}`, Number(params.id), { ...localStore.params.getSearchParams}] , ([url,id, args]) => agent.Price.getHistoryPrice(id, args).then(r => r.data))

	const navigate = useNavigate()

	const location = useLocation()
	const  company = store.companyStore.getCompanyById(Number(params.id));

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
						<Button text={<><SvgBackArrow />{'Вернуться к прайс-листу'}</>} className={'flex items-center gap-2 font-medium text-[#606163] hover:text-gray-300 leading-none !mb-4'} action={() =>  navigate(location.pathname.split('/').slice(0, -1).join('/'), {replace: true})} variant={ButtonVariant.text} />
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
