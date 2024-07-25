import { Modal } from '@mantine/core'
import React from 'react'
import { useStore } from 'stores/store'
import styles from './Modal.module.scss'
import { SvgClose } from 'components/common/ui/Icon'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import Button, { ButtonSizeType, ButtonVariant } from 'components/common/ui/Button/Button'
import { BidsStatus } from 'stores/bidsStrore'
import { useSearchParams } from 'react-router-dom'

export function BidPaymentResult(props: { opened: boolean; onClose: () => void; status: string}) {
	const store = useStore()
	const [searchParams, setSearchParams] = useSearchParams()
	return (
		<Modal.Root size={375} opened={props.opened} onClose={props.onClose} centered className={'z-[999]'}>
			<Modal.Overlay className={'bg-black/90'}/>
			<Modal.Content radius={20} className={styles.ModalUpBalance + " " + "tablet-max:*:!block tablet-max:*:!px-3"}>
				<Modal.Header className={'static'}>
					<Modal.Title>
						<Heading
						text={props.status === "success" ? `Оплата прошла успешно` : "Оплата не прошла"}
						variant={HeadingVariant.h3}
						color={HeadingColor.accent}
						// className={'pb-12'}
					/></Modal.Title>
					<Modal.CloseButton className={"hover:rotate-90 hover:bg-transparent transition-all absolute top-5 right-5 tablet-max:hidden"} icon={<SvgClose className={'close__modal'} />}/>
				</Modal.Header>
				<Modal.Body className={'!p-0'}>
				{/* <CarHelper/> */}
					{props.status === "error" ? <p className={'text-sm text-gray-1'}>Во время платежа произошла [error_name]</p> : <p className={'text-sm text-gray-1'}>Деньги уже поступили на счет</p>}
					<footer className={'!pt-8'}>
						<Button
							text={"Закрыть"}
							variant={ButtonVariant.accent}
							size={ButtonSizeType.base}
							action={() => {
								setSearchParams([])
								props.onClose()
							}}
						/>
					</footer>
				</Modal.Body>
			</Modal.Content>
		</Modal.Root>
	)
}
