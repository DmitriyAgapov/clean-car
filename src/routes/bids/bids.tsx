import React from 'react'
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelColor, PanelVariant } from "components/common/layout/Panel/Panel";
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import { useStore } from 'stores/store'
import { Outlet, useLoaderData, useLocation, useNavigate, useParams } from "react-router-dom";
import { PermissionNames } from 'stores/permissionStore'
import Button, { ButtonDirectory, ButtonSizeType, ButtonVariant } from 'components/common/ui/Button/Button'
import TableWithSortNew from "components/common/layout/TableWithSort/TableWithSortNew";
import { Observer } from "mobx-react-lite";
import catalogStore from "stores/catalogStore";
import { entries, values } from "mobx";
import { UserTypeEnum } from "stores/userStore";

const BidsPage = () => {
	const store = useStore()
	const navigate = useNavigate()
	const params = useParams()
	const location = useLocation()
	const { data:loaderData }:any = useLoaderData()
	const { data:storeData, loading, error }:any = store.bidsStore.bidsAll
	const textData = store.bidsStore.text

	console.log(loaderData);
	console.log(storeData);
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
						<Button text={textData.create} action={() => navigate('create')} trimText={true} className={'inline-flex'} directory={ButtonDirectory.directory} size={ButtonSizeType.sm} />
					</>)}</>}>
			</Panel>
			<Panel variant={PanelVariant.withGapOnly} className={'!mt-0'}>
				<Observer children={()=> <TableWithSortNew total={storeData.count}
					variant={PanelVariant.dataPadding}
					search={true}
					background={PanelColor.glass}
					className={'col-span-full table-groups table-bids'}
					filter={false}
					// data={storeData.results.map((r:any) => ({
					// 	...r,
					// 	id: r.id,
					// 	query: {
					// 		company_id: r.company.id,
					// 	},
					// }))}
					initFilterParams={[{ label: 'Статус', value: 'status' }, { label: 'Город', value: 'city' }]}
					state={false}
					ar={textData.tableHeaders} />}></Observer>
			</Panel>
		</Section>
	)
}
export default BidsPage
