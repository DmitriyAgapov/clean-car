import React, { useEffect } from "react";
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelColor, PanelVariant } from "components/common/layout/Panel/Panel";
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import { useStore } from 'stores/store'
import { Navigate, Outlet, useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { PermissionNames } from 'stores/permissionStore'
import Button, { ButtonDirectory, ButtonSizeType, ButtonVariant } from 'components/common/ui/Button/Button'
import TableWithSortNew from "components/common/layout/TableWithSort/TableWithSortNew";
import FormModalCreatePrice from "components/Form/FormModalCreatePrice/FormModalCreatePrice";
import { replace } from "formik";

const PricesPage = () => {
	const store = useStore()
	const navigate = useNavigate()
	// useEffect(() => {
	// 	if(store.appStore.appType === "performer") navigate(`/account/price/${store.userStore.myProfileData.company.id}`, {replace: true})
	// }, [store.appStore.appType]);
	const location = useLocation()
	// const { data }:any = useLoaderData()
	const { textData }:any = store.priceStore.allPrices
	const { data, loading }:any = store.priceStore.currentPriceById
	console.log(data, loading);
	if (location.pathname.includes('create') || location.pathname.includes('edit')) return <Outlet />
	if (location.pathname !== `/account/price`) return <Outlet />

	// if(store.appStore.appType === "admin") {
		return (
		<Section type={SectionType.default}>
			<Panel variant={PanelVariant.withGapOnly} headerClassName={'flex justify-between gap-4'}
				state={false}
				header={<>
					<div className={'mr-auto'}>
						<Heading text={textData.title} variant={HeadingVariant.h1} className={'inline-block !mb-0'} color={HeadingColor.accent} />
					</div>
					{store.userStore.getUserCan(PermissionNames['Управление прайс-листом'], 'create') && (<>
						<Button text={textData.create} action={async () => {
							store.appStore.setModal({
								className: "!px-10 gap-4 !justify-stretch",
								component: <FormModalCreatePrice />,
								text: `Вы уверены, что хотите удалить ${"name"}`,
								state: true
							});
						}} trimText={true} className={'inline-flex'} directory={ButtonDirectory.directory} size={ButtonSizeType.sm} />
					</>)}</>}>
			</Panel>
				<TableWithSortNew
					total={data.count}
					variant={PanelVariant.dataPadding}
					search={true}
					background={PanelColor.glass}
					className={'col-span-full table-groups h-full'}
					filter={false}
					data={data.results}
					initFilterParams={[{ label: 'Статус', value: 'status' }, { label: 'Город', value: 'city' }]}
					state={false}
					ar={store.priceStore.allPrices.textData.tableHeaders}
				/>
		</Section>
	)
	// } else {
	// 	return  <Navigate to={`${ store.userStore.myProfileData.company?.id }`} replace={false}  relative={'route'}/>
	// }
}
export default PricesPage
