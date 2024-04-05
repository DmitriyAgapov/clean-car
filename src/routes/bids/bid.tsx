import React, { useEffect, useState } from "react";
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelColor, PanelVariant } from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import { useStore } from 'stores/store'
import { Outlet, useLoaderData, useLocation, useNavigate, useParams, useRevalidator } from "react-router-dom";
import Button, { ButtonSizeType, ButtonVariant } from 'components/common/ui/Button/Button'
import { SvgBackArrow } from 'components/common/ui/Icon'
import { dateTransformShort } from 'utils/utils'
import bidsStore, { BidsStatus } from 'stores/bidsStrore'
import Status from 'components/common/ui/Status/Status'
import { PermissionNames } from 'stores/permissionStore'
import Tabs, { TabsType } from 'components/common/layout/Tabs/Tabs'
import BidActions, { BidAdminActions } from "components/common/ui/BidActions/BidActions";
import appStore from "stores/appStore";
import { observer } from "mobx-react-lite";
import paramsStore from "stores/paramStore";
import agent, { client } from "utils/agent";
import useSWR from "swr";
import { Loader } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";

const BidPage = () => {
	const store = useStore()
	const navigate = useNavigate()
	const location = useLocation()
	const params = useParams()
	const {isLoading, data, mutate, isValidating}:any = useSWR([`bids/${params.company_id}/${params.id}`, {company_id: params.company_id as string, id: Number(params.id)}], ([url, args]) => client.bidsRetrieve(args.company_id, args.id))

	const textData = store.bidsStore.text
	const tabedData = React.useMemo(() => {
		store.appStore.setAppState(isLoading)
		return [
			{ label: 'Основная информация', data: data },
			{ label: 'Услуги', data: data },
			{ label: 'Фото', data: data },
			{ label: 'История заявки', data: data }
		]
	}, [data, isLoading])

	React.useEffect(() => {
		if(data && data.status && data.status === BidsStatus["Новая"]) {
			console.log('data.status', data.status === BidsStatus["Новая"]);
			if (store.appStore.appType === "performer") {
				(async () => {
					if (params.company_id && params.id) {
						store.bidsStore.updateBitStatus(params.company_id, params.id, BidsStatus['Обрабатывается']).then(() => {
							console.log('status updated');
							mutate()
						} )
					}
				})()
			}
		}
	}, [data])

	useEffect(() => {
		store.bidsStore.clearPhotos()
	}, [params.bid_id])

	if (location.pathname.includes('create') || location.pathname.includes('edit')) return <Outlet />
	// if (location.pathname !== `/account/references/${textData.path}/`) return <Outlet />
	const { height, width } = useViewportSize();
	return (
        <Section type={SectionType.default}>
            <Panel
	            state={isLoading}
                variant={PanelVariant.withGapOnly}
                headerClassName={'flex justify-between gap-4'}
                header={
                    <>
                        <div className={'mr-auto'}>
                            <Button
                                text={
                                    <>
                                        <SvgBackArrow />
                                        Назад к списку заявок{' '}
                                    </>
                                }
                                className={
                                    'flex items-center gap-2 font-medium text-[#606163] hover:text-gray-300 leading-none !mb-4'
                                }
                                action={() => navigate(-1)}
                                variant={ButtonVariant.text}
                            />

                            <Heading
                                text={textData.title}
                                variant={HeadingVariant.h1}
                                className={'inline-block !mb-0'}
                                color={HeadingColor.accent}
                            />
                            {process.env.NODE_ENV === 'development' && appStore.appType === 'admin' && (
                                <BidAdminActions />
                            )}
                        </div>
                        {/* {store.userStore.getUserCan(PermissionNames['Управление заявками'], 'create') && (<> */}
                        {/* 	<Button text={textData.loadExcel} action={() => navigate('create')} trimText={true} className={'inline-flex'} variant={ButtonVariant["accent-outline"]} size={ButtonSizeType.sm} /> */}
                        {/* 	<Button text={textData.create} action={() => navigate('create')} trimText={true} className={'inline-flex'} directory={ButtonDirectory.directory} size={ButtonSizeType.sm} /> */}
                        {/* </>)} */}
                    </>
                }
            ></Panel>
            <Panel
                state={isLoading}
                className={'col-span-full grid grid-rows-[auto_1fr_auto] tablet-max:-mx-6'}
                variant={PanelVariant.textPadding}
                background={PanelColor.glass}
                bodyClassName={''}
                headerClassName={'grid grid-cols-4 gap-4 border-bottom-none'}
	              footer={width && width < 740 && store.userStore.getUserCan(PermissionNames['Управление заявками'], 'update') && (
		              <BidActions status={data?.status as BidsStatus} />
	              )}
                header={
                    <>
                        <div className={'flex col-span-2 tablet-max:col-span-full justify-between'}>
                            <Heading
                                className={'col-span-1 row-start-1 !mb-0'}
                                text={data?.company?.name}
                                variant={HeadingVariant.h2}
                                color={HeadingColor.accent}
                            />
                        </div>
                        <div className={'flex  items-end gap-12 justify-start col-span-2 tablet-max:col-span-full tablet-max:block row-start-2'}>
                            <div className={'text-xs text-gray-2'}>
                                Дата и время регистрации:{' '}
                                <p className={'py-0'}>{(data && data?.company?.updated) && dateTransformShort(data?.company.updated).date}</p>
                            </div>
                            <div className={'flex gap-6 items-center justify-around tablet-max:inline-flex'}>
	                            {(data && data?.status) && <Status variant={data?.status as BidsStatus} size={ButtonSizeType.base} />}
                                <Heading
                                    className={'!m-0'}
                                    text={data?.company?.city?.name}
                                    variant={HeadingVariant.h4}
                                />
                            </div>
                        </div>

                        {(width && width >740) && store.userStore.getUserCan(PermissionNames['Управление заявками'], 'update') && (
                            <BidActions status={data?.status as BidsStatus} />
                        )}
                    </>
                }
            >
                <Tabs variant={'bid-tabs'} data={tabedData} type={TabsType.bid} className={'!grid grid-rows-[auto_1fr] max-h-fit h-full panel__tabs'}/>

            </Panel>
        </Section>
    )
}
export default observer(BidPage)
