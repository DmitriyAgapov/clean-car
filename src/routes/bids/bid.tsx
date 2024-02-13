import React from 'react'
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelColor, PanelVariant } from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import { useStore } from 'stores/store'
import { Outlet, useLoaderData, useLocation, useNavigate, useParams } from 'react-router-dom'
import Button, { ButtonSizeType, ButtonVariant } from 'components/common/ui/Button/Button'
import { SvgBackArrow } from 'components/common/ui/Icon'
import { dateTransformShort } from 'utils/utils'
import bidsStore, { BidsStatus } from 'stores/bidsStrore'
import Status from 'components/common/ui/Status/Status'
import { PermissionNames } from 'stores/permissionStore'
import Tabs, { TabsType } from 'components/common/layout/Tabs/Tabs'

const BidPage = () => {
	const store = useStore()
	const navigate = useNavigate()
	const location = useLocation()
	const params = useParams()
	const dataL:any = useLoaderData()
	const bid = bidsStore.CurrentBid
	const textData = store.bidsStore.text

	const tabedData = [
		{ label: 'Основная информация', data: bid },
		{ label: 'Услуги', data: bid },
		{ label: 'Фото', data: bid },
		{ label: 'История заявки', data: bid }
	]

	if (location.pathname.includes('create') || location.pathname.includes('edit')) return <Outlet />
	// if (location.pathname !== `/account/references/${textData.path}/`) return <Outlet />
	return (
		<Section type={SectionType.default}>
			<Panel variant={PanelVariant.withGapOnly} headerClassName={'flex justify-between gap-4'}

				header={<>
					<div className={'mr-auto'}>

						<Button text={<><SvgBackArrow />Назад к списку заявок{' '}</>} className={'flex items-center gap-2 font-medium text-[#606163] hover:text-gray-300 leading-none !mb-4'} action={() => navigate(-1)} variant={ButtonVariant.text} />

						<Heading text={textData.title} variant={HeadingVariant.h1} className={'inline-block !mb-0'} color={HeadingColor.accent} />
					</div>
					{/* {store.userStore.getUserCan(PermissionNames['Управление заявками'], 'create') && (<> */}
					{/* 	<Button text={textData.loadExcel} action={() => navigate('create')} trimText={true} className={'inline-flex'} variant={ButtonVariant["accent-outline"]} size={ButtonSizeType.sm} /> */}
					{/* 	<Button text={textData.create} action={() => navigate('create')} trimText={true} className={'inline-flex'} directory={ButtonDirectory.directory} size={ButtonSizeType.sm} /> */}
					{/* </>)} */}
				</>}>
			</Panel>
			<Panel
				className={'col-span-full grid grid-rows-[auto_1fr_auto]'}
				variant={PanelVariant.textPadding}
				background={PanelColor.glass}
				bodyClassName={''}
				footerClassName={'flex  justify-end'}
				headerClassName={'grid grid-cols-3 gap-4 border-bottom-none'}
				header={

	<>
							<Heading className={'col-span-2 !mb-0'} text={bid.company.name} variant={HeadingVariant.h2} color={HeadingColor.accent} />
							<div className={"flex  items-end gap-12 justify-start col-span-full"}>
								<div className={"text-xs text-gray-2"}>
									Дата и время регистрации: <span>{dateTransformShort(bid.company.updated).date}</span>
								</div>
								<div className={"flex gap-6 items-center justify-around"}>
									<Status variant={bid.status as string as BidsStatus}
										size={ButtonSizeType.base} />

									<Heading className={"!m-0"}
										text={bid.company.city.name}
										variant={HeadingVariant.h4} />
								</div>
							</div>

						{store.userStore.getUserCan(PermissionNames["Управление справочниками"], "update") && (
							<Button text={"Отменить заявку"}
								size={ButtonSizeType.sm}

								action={async () => {
									if(params.company_id && params.id) {
										await store.bidsStore.updateBitStatus(params.company_id, params.id, BidsStatus["Отмена"])
									}
								}}
								className={'justify-self-end ml-auto row-start-1 col-start-3'}
								variant={ButtonVariant['accent']}

							/>
						)}
							</>

							}
			>
				<Tabs  data={tabedData} type={TabsType.bid}/>
			</Panel>
		</Section>
	)
}
export default BidPage
