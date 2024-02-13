import React from 'react'
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelColor, PanelVariant } from "components/common/layout/Panel/Panel";
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import { useStore } from 'stores/store'
import { Outlet, useLoaderData, useLocation, useNavigate, useParams } from "react-router-dom";
import { PermissionNames } from 'stores/permissionStore'
import Button, { ButtonDirectory, ButtonSizeType, ButtonVariant } from 'components/common/ui/Button/Button'
import TableWithSortNew from "components/common/layout/TableWithSort/TableWithSortNew";
import { observer } from "mobx-react-lite";

const BidsPage = () => {
	const store = useStore()
	const navigate = useNavigate()
	const params = useParams()
	const location = useLocation()
	const { data:loaderData }:any = useLoaderData()
	const { data:storeData }:any = store.bidsStore.bidsAll

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
				<TableWithSortNew total={storeData.count}
					variant={PanelVariant.dataPadding}
					search={true}
					background={PanelColor.glass}
					className={'col-span-full table-groups table-bids'}
					filter={false}
					data={loaderData.results}
					initFilterParams={[{ label: 'Статус', value: 'status' }, { label: 'Город', value: 'city' }]}
					state={false}
					ar={textData.tableHeaders} />

		</Section>
	)
}
export default observer(BidsPage)
