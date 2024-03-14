import { CloseIcon, FileButton, Image, InputLabel, Modal, Select, Text } from "@mantine/core";
import React, { useState } from "react";
import { Observer } from "mobx-react-lite";
import Button, { ButtonSizeType, ButtonVariant } from "components/common/ui/Button/Button";
import { useStore } from "stores/store";
import styles from "./Modal.module.scss";
import { SvgClose } from "components/common/ui/Icon";
import Heading, { HeadingColor, HeadingVariant } from "components/common/ui/Heading/Heading";
import { useParams } from "react-router-dom";
import { CompanyType } from "stores/companyStore";

export function PriceCopy(props: { opened: boolean; onClose: () => void; id: number, title: string}) {
	const store = useStore()
	const [formData, setFormData]:any = useState({
		type: CompanyType.customer,
		company: null,
		company_filials: null
	})

	const handleSubmmit = React.useCallback(() => {
		if(formData.company_filials || formData.company) {
			store.priceStore.copyPrice(formData.company_filials ? formData.company_filials : formData.company, props.id)
			.then((res: any) => res).finally(() => props.onClose())
		}
	}, [formData]);

	const memoFileUpload = React.useMemo(() => {
		const availableFilials = store.companyStore.getFilialsAll.filter((c:any) => c.company_type === formData.type).map((f:any) => ({label: f.name, value: f.id.toString()}))
		return <Observer
			children={() => (<>
				<div className={'my-8'}>
					<Select
						allowDeselect={false}
						label={'Тип'}
						onOptionSubmit={(e) => setFormData((prevState:any) => ({
							company: null,
							company_filials: null,
							type: e
						}))}
						defaultValue={formData.type}
						className={'!flex-initial'}
						data={[
							{ label: 'Заказчик', value: CompanyType.customer },
							{ label: 'Партнер', value: CompanyType.performer },
						]}
					/>
					<Select
						disabled={formData.type === null}
						searchable
						clearable
						onChange={(e) => setFormData((prevState:any) => ({
							...prevState,
							company: e
						}))}
						value={formData.company}
						label={'Компания'}
						data={store.companyStore.getCompaniesAll.filter((c:any) => c.company_type === formData.type).filter((c:any) => c.parent === null).map((f:any) => ({label: f.name, value: f.id.toString()}))}
					/>
						<Select
							disabled={availableFilials.length === 0}
						searchable
						clearable
							onChange={(e) => setFormData((prevState:any) => ({...prevState, company_filials: e}))}
						// defaultValue={formData.values.company_id}
						label={'Филиал'}
						data={availableFilials}
					/>

				</div>

				<footer className={'col-span-full'}>
						<Button
							className={'col-span-1 flex-1'}
							variant={ButtonVariant['accent-outline']}
							size={ButtonSizeType.base}
							action={props.onClose}
							text={'отменить'}
							type={'button'}
						/>
					<Button text={'сохранить'} className={'flex-1'} type={'button'} disabled={!formData.company && !formData.company_filials} variant={ButtonVariant.accent} action={handleSubmmit}/>
				</footer>
			</>)}   />
	}, [formData])

	return (
		<Modal.Root size={685} opened={props.opened} onClose={props.onClose} centered>
			<Modal.Overlay className={'bg-black/80'}/>
			<Modal.Content radius={20} className={styles.ModalBid}>
				<Modal.Header className={'static '}>
					<Modal.Title><Heading className={'!mb-0'} color={HeadingColor.accent} text={`Дублировать данные ${props.title}`} variant={HeadingVariant.h2}/></Modal.Title>
					<Modal.CloseButton className={"hover:rotate-90 hover:bg-transparent transition-all absolute top-5 right-5"} icon={<SvgClose className={'close__modal'} />}/>
				</Modal.Header>
				<Modal.Body>
				<Text className={''}>Проверьте данные для дублирования или внесите необходимые корректировки. При изменении филиала информация по услугам будет обновлена</Text>
				{memoFileUpload}
				</Modal.Body>
			</Modal.Content>
		</Modal.Root>
	)
}
