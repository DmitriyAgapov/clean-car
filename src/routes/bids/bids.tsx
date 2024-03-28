import React, { useState } from 'react'
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelColor, PanelRouteStyle, PanelVariant } from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import { useStore } from 'stores/store'
import { Outlet, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { PermissionNames } from 'stores/permissionStore'
import Button, { ButtonDirectory, ButtonSizeType, ButtonVariant } from 'components/common/ui/Button/Button'
import TableWithSortNew from 'components/common/layout/TableWithSort/TableWithSortNew'
import { observer } from 'mobx-react-lite'
import { dateTransformShort } from 'utils/utils'
import userStore from 'stores/userStore'
import agent from 'utils/agent'
import { FilterData } from 'components/common/layout/TableWithSort/DataFilter'

const BidsPage = () => {
	const store = useStore()
	const navigate = useNavigate()
	const params = useParams()
	const location = useLocation()
	const [tick, setTick] = useState(0)
	let [searchParams, setSearchParams] = useSearchParams();
	const {isLoading, data, error} = agent.Bids.getAllBidsNew(searchParams.toString())
	// console.log('BidsHook', data, isLoading, error);
	// React.useEffect(() => {
	// 	// store.bidsStore.bids.length === 0 && store.bidsStore.loadAllBids()
	// 	console.log(navigator.state === "idle");
	// 	setTimeout(() => {
	// 		if (location.pathname.includes('bids') && !location.pathname.includes('bids/')) {
	// 			setTimeout(() => {
	// 				store.bidsStore.loadAllBids()
	// 				setTick(prevState => prevState + 1)
	// 			}, 10000)
	// 		}
	// 	}, tick === 0 ? 10000 : 1)
	// }, [tick])

	// const { data:storeData, loading }:any = store.bidsStore.bidsAll
	const textData = store.bidsStore.text
	if (location.pathname.includes('create') || location.pathname.includes('edit')) return <Outlet />
	if (location.pathname.includes(`/account/bids/${params.company_id}/${params.id}`)) return <Outlet />
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
		<TableWithSortNew total={data?.count}
					variant={PanelVariant.dataPadding}
					search={true}
					style={PanelRouteStyle.bids}
					background={PanelColor.glass}
					className={'col-span-full table-groups table-bids'}
					filter={true}
					data={data?.results?.map((r:any) => ({
						idnum: r.id,
						id: r.id,
						status: r.status,
						created: dateTransformShort(r.created).date,
						customer: r.company.name,
						performer: r.performer.name,
						user: r.author.first_name + ' ' + r.author.last_name[0] + '.',
						number: r.car?.number,
						city: r.company.city.name,
						service_type: r.service_type.name,
						query: {
							company_id: userStore.isAdmin ? r.company.id : userStore.myProfileData.company.id,
						}
					}))}
					initFilterParams={[FilterData.city, FilterData.is_active, FilterData.service_type, FilterData.start_date, FilterData.end_date]}
					state={isLoading}
					ar={textData.tableHeaders}
		/>

		</Section>
	)
}
export default observer(BidsPage)
