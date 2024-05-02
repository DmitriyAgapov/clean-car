import {  Modal } from "@mantine/core";
import React from "react";
import { useStore } from "stores/store";
import styles from "./Modal.module.scss";
import { SvgClose } from "components/common/ui/Icon";
import Heading, { HeadingColor, HeadingVariant } from "components/common/ui/Heading/Heading";
import CarHelper from "components/common/layout/CarHelper/CarHelper";

export function CarClasses(props: { opened: boolean; onClose: () => void}) {
	const store = useStore()

	return (
		<Modal.Root size={747} opened={props.opened} onClose={props.onClose} centered>
			<Modal.Overlay className={'bg-black/90'}/>
			<Modal.Content radius={20} className={styles.ModalBid}>
				<Modal.Header className={'static '}>
					<Modal.Title><Heading
						text={`Классификация автомобилей`}
						variant={HeadingVariant.h2}
						color={HeadingColor.accent}
						// className={'pb-12'}
					/></Modal.Title>
					<Modal.CloseButton className={"hover:rotate-90 hover:bg-transparent transition-all absolute top-5 right-5"} icon={<SvgClose className={'close__modal'} />}/>
				</Modal.Header>
				<Modal.Body>
				<CarHelper/>

				</Modal.Body>
			</Modal.Content>
		</Modal.Root>
	)
}
