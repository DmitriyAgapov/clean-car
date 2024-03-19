import React from 'react'
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelColor, PanelRouteStyle, PanelVariant } from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import { useStore } from 'stores/store'
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import TableWithSortNew from 'components/common/layout/TableWithSort/TableWithSortNew'
import { observer } from 'mobx-react-lite'
import dayjs from 'dayjs'

const PricesHistoryPage = () => {
	const store = useStore()

	const params = useParams()
	const navigate = useNavigate()
	// useEffect(() => {
	// 	if(store.appStore.appType === "performer") navigate(`/account/price/${store.userStore.myProfileData.company.id}`, {replace: true})
	// }, [store.appStore.appType]);
	const location = useLocation()
	// const { data }:any = useLoaderData()
	const  company = store.companyStore.getCompanyById(Number(params.id));
	const { textData }:any = store.priceStore.allPrices
	const { data, loading }:any = store.priceStore.currentPriceById
	console.log( data, loading);

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
					total={data.count}
					variant={PanelVariant.dataPadding}
					search={true}
					style={PanelRouteStyle.price_history}
					background={PanelColor.glass}
					className={'col-span-full table-groups h-full'}
					filter={false}
					data={data.results?.map((p:any) => ({
						id: p.id,
						created: dayjs(p.created).format('DD.MM.YYYY HH:mm'),
						expires:  dayjs(p.expires).format('DD.MM.YYYY HH:mm'),
						service_type: store.catalogStore.getServiceType(p.service_type)?.name
					}))}
					initFilterParams={[{ label: 'дата начала', value: 'created' }, { label: 'Дата окончания', value: 'expires' }, {label: 'Тип услуги', value: 'service_type'}]}
					state={loading}
					ar={[{ label: 'дата начала', name: 'created' }, { label: 'Дата окончания', name: 'expires' }, {label: 'Тип услуги', name: 'service_type'}]}
				/>
		</Section>
	)
}
export default observer(PricesHistoryPage)
