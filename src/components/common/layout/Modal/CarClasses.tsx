import {  Modal } from "@mantine/core";
import React from "react";
import { useStore } from "stores/store";
import styles from "./Modal.module.scss";
import { SvgClose } from "components/common/ui/Icon";
import Heading, { HeadingColor, HeadingVariant } from "components/common/ui/Heading/Heading";
import CarHelper from "components/common/layout/CarHelper/CarHelper";

export function CarClasses(props: { opened: boolean; onClose: () => void}) {
	return (
		<Modal.Root size={"xl"} opened={props.opened} onClose={props.onClose} centered className={'z-[999]'}>
			<Modal.Overlay className={'bg-black/90'}/>

			<Modal.Content radius={20} className={styles.ModalCarClasses}>

				<Modal.Header className={'relative flex flex-row-reverse mt-8'}>
					<Modal.CloseButton className={"hover:rotate-90 hover:!bg-transparent transition-all relative !outline-none"} icon={<SvgClose className={'close__modal'} />}/>
					<Modal.Title>

						<Heading
							text={`Классификация автомобилей`}
							variant={HeadingVariant.h2}
							color={HeadingColor.accent}
							className={'!mb-0'}
						/></Modal.Title>
					{/* <Modal.CloseButton className={"hover:rotate-90 hover:bg-transparent transition-all absolute top-5 right-5 tablet-max:hidden"} icon={<SvgClose className={'close__modal'} />}/> */}
				</Modal.Header>

				<Modal.Body className={'tablet-max:!px-2'}>

				<CarHelper/>

				</Modal.Body>
			</Modal.Content>
		</Modal.Root>
	)
}
