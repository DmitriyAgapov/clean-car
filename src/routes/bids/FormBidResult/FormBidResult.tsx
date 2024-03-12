import { observer } from "mobx-react-lite";
import { useStore } from "stores/store";
import PanelForForms from "components/common/layout/Panel/PanelForForms";
import Panel, { PanelColor, PanelVariant } from "components/common/layout/Panel/Panel";
import Heading, { HeadingColor, HeadingVariant } from "components/common/ui/Heading/Heading";
import DList from "components/common/ui/DList/DList";
import React from "react";

interface BidResult {
	service_type: number | string
	create_amount: number | string
	service_subtype: number | string
	important?: string
	schedule?: string
	service_option?: number[]
	additional_data?: string[]
	address?: string | null
	customer_comment? : string | null
	address_to?: string | null
	address_from?: string | null
	wheel_lock?: string
	keys: string
	is_parking: boolean
	truck_type?: string
}
const FormBidResult = observer(({service_type, is_parking, keys, create_amount, service_subtype, customer_comment, important, schedule, service_option, additional_data, address, address_to, address_from, wheel_lock, truck_type, ...props}:BidResult) => {

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
        title={address_from}
      />}
			{address_from && service_subtype !== 6 && <DList
        className={'child:dt:text-accent'}
        label={'Адрес забора'}
        title={address_from}
      />}
			{address_to && <DList
        className={'child:dt:text-accent'}
        label={'Адрес доставки'}
        title={address_to}
      />}

			<DList
				className={'child:dt:text-accent'}
				label={'Важность'}
				title={schedule !== null ? schedule : 'Побыстрее'}
			/>
			{schedule && <DList
				className={'child:dt:text-accent'}
				label={'Время'}
				title={schedule}
			/>}
			{wheel_lock && <DList
				className={'child:dt:text-accent'}
				label={'Нерабочие колеса'}
				title={wheel_lock + " шт."}
			/>}
			{truck_type && <DList
				className={'child:dt:text-accent'}
				label={'Тип эвакуатора'}
				title={truck_type}
			/>}


			{(keys || is_parking) && <DList
				className={'child:dt:text-accent'}
				label={'Дополнительные данные'}
				title={
					<>
						<ul>
							{keys && <li>{keys}</li>}
							{is_parking	 && <li>{is_parking && 'Есть парковочное место'}</li>}
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
			{customer_comment && <DList
        className={'child:dt:text-accent col-span-full'}
        label={'Комментарий'}
        title={
					<p>
						{customer_comment}
					</p>
				}
      />}
			{create_amount && <DList
        className={'child:dt:text-accent child:*:text-accent'}
        label={'Стоимость услуги'}
        title={<Heading variant={HeadingVariant.h2} text={create_amount + " ₽"} />}
      />}

		</Panel>}

	</PanelForForms>
})
export default FormBidResult
