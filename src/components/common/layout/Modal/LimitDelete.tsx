import {  Modal } from "@mantine/core";
import React from "react";
import { useStore } from "stores/store";
import styles from "./Modal.module.scss";
import { SvgClose } from "components/common/ui/Icon";
import Heading, { HeadingColor, HeadingVariant } from "components/common/ui/Heading/Heading";
import CarHelper from "components/common/layout/CarHelper/CarHelper";
import Button, { ButtonSizeType, ButtonVariant } from "components/common/ui/Button/Button";
import agent from "utils/agent";
import { useNavigate, useNavigation, useParams } from "react-router-dom";

export function LimitDelete(props: { opened: boolean; onClose: () => void}) {
	const store = useStore()
	const params = useParams()
	const navigate = useNavigate()

	const handleDelete = React.useCallback(() => {
		agent.Limits.deleteLimit(Number(params.company_id), Number(params.id)).then(() => {
			props.onClose()
			navigate(`/account/limits`)
		})
	}, [])
	return (
		<Modal.Root size={600} opened={props.opened} onClose={props.onClose} centered>
			<Modal.Overlay className={'bg-black/80'}/>
			<Modal.Content radius={20} className={styles.ModalBid}>
				<Modal.Header className={"static "}>
					<Heading text={`Вы уверены, что хотите удалить лимит?`}
						variant={HeadingVariant.h4}
						color={HeadingColor.accent}
						// className={'pb-12'}
					/>
					<Modal.CloseButton className={"hover:rotate-90 hover:!bg-transparent transition-all absolute top-5 right-5"}
						icon={<SvgClose className={"close__modal"} />} />
				</Modal.Header>
				<Modal.Body>
					<div className={'flex gap-6'}>
						<Button text={'Нет'} size={ButtonSizeType.base}  variant={ButtonVariant.outline} action={props.onClose} className={'flex-[1_50%]'}/>
						<Button text={'Да, удалить'} size={ButtonSizeType.base}  variant={ButtonVariant["accent-outline"]} className={'flex-[1_50%]'} action={handleDelete}/>
					</div>

				</Modal.Body>
			</Modal.Content>
		</Modal.Root>
	)
}
