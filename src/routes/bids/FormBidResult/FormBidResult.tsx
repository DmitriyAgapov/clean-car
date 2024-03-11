import { observer } from "mobx-react-lite";
import { useStore } from "stores/store";
import PanelForForms from "components/common/layout/Panel/PanelForForms";
import Panel, { PanelColor, PanelVariant } from "components/common/layout/Panel/Panel";
import Heading, { HeadingColor, HeadingVariant } from "components/common/ui/Heading/Heading";
import DList from "components/common/ui/DList/DList";
import React from "react";

interface BidResult {
	service_type: number | string
	service_subtype: number | string
	important?: string
	time?: string
	service_option?: number[]
	additional_data?: string[]
	address?: string | null
	address_to?: string | null
	address_from?: string | null
	destroyed_tires?: string
	truck_type?: string
}
const FormBidResult = observer(({service_type, service_subtype, important, time, service_option, additional_data, address, address_to, address_from, destroyed_tires, truck_type, ...props}:BidResult) => {

	const store = useStore()
	const { step1, step2 ,step3, step4, step5} = store.bidsStore.formDataAll
	return <PanelForForms
		{...props}
		className={'!bg-transparent'}
		bodyClassName={'grid !grid-cols-3 gap-4'}
		variant={PanelVariant.textPadding}
		background={PanelColor.default}
		header={
			<>
				<Heading
					text={step5.title}
					color={HeadingColor.accent}
					variant={HeadingVariant.h2}
				/>
				<div className={'text-base'}>{step5.description}</div>
			</>
		}

	>
		{service_type &&
		<Panel
			className={' !border-active !border-1'}
			bodyClassName={'grid grid-cols-2  gap-y-5  gap-x-12 content-start !py-8'}
			variant={PanelVariant.withPaddingSmWithBody}
			background={PanelColor.glass}
		>
			<DList
				className={'child:dt:text-accent'}
				label={'Услуга'}
				title={
					<Heading
						variant={HeadingVariant.h2}
						text={store.catalogStore.getServiceType(Number(service_type)).name}
						color={HeadingColor.active}
					/>
				}
			/>
			<DList
				className={'child:dt:text-accent'}
				label={'Тип услуги'}
				title={
					<Heading
						variant={HeadingVariant.h4}
						text={store.catalogStore.getServiceSubtype(Number(service_type), Number(service_subtype)).name}
					/>
				}
			/>

			{service_subtype === 6 && <DList
        className={'child:dt:text-accent'}
        label={'Адрес выезда'}
        title={store.bidsStore.formResultsAll.address}
      />}
			{address_from && <DList
        className={'child:dt:text-accent'}
        label={'Адрес забора'}
        title={address_from}
      />}
			{address_to && <DList
        className={'child:dt:text-accent'}
        label={'Адрес доставки'}
        title={address_to}
      />}

			{store.bidsStore.formResultsAll.important?.label && <DList
				className={'child:dt:text-accent'}
				label={'Важность'}
				title={store.bidsStore.formResultsAll.important.label}
			/>}
			{store.bidsStore.formResultsAll.important?.value === "time" && <DList
        className={'child:dt:text-accent'}
        label={'Время'}
        title={store.bidsStore.formResultsAll.time?.value}
      />}
			{store.bidsStore.formResultsAll.secretKey?.label || store.bidsStore.formResultsAll.secretKey?.label && <DList
				className={'child:dt:text-accent'}
				label={'Дополнительные данные'}
				title={
					<>
						<ul>
							{store.bidsStore.formResultsAll.secretKey?.label && <li>{store.bidsStore.formResultsAll.secretKey.label}</li>}
							{store.bidsStore.formResultsAll.parking?.label	 && <li>{store.bidsStore.formResultsAll.parking.label}</li>}
						</ul>
					</>
				}
			/>}
			{service_option && service_option.length !== 0 && <DList
        className={'child:dt:text-accent'}
        label={'Дополнительные опции'}
        title={
					<>
						<ul>
							{service_option.map((i: any) => (
								<li key={i}>{store.catalogStore.getServiceSubtypeOption(service_type, service_subtype, i).name}</li>
							))}
						</ul>
					</>
				}
      />}
		</Panel>}

	</PanelForForms>
})
export default FormBidResult
