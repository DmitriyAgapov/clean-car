import { Modal } from "@mantine/core";
import React from "react";
import { useStore } from "stores/store";
import styles from "./Modal.module.scss";
import { SvgClose } from "components/common/ui/Icon";
import Heading, { HeadingColor, HeadingVariant } from "components/common/ui/Heading/Heading";
import Button, { ButtonSizeType, ButtonVariant } from "components/common/ui/Button/Button";

export function RegisterSuccess(props: { opened: boolean; onClose: () => void}) {
	const store = useStore()

	return (
		<Modal.Root size={600} opened={props.opened} onClose={props.onClose} centered lockScroll={false}>
			<Modal.Overlay className={'bg-black/90'}/>
			<Modal.Content radius={20}  className="pt-20 pb-10 px-16">
				<Modal.Header className={'static px-0'}>
					<Modal.Title><Heading
						text={`Добро пожаловать в CleanCar.`}
						variant={HeadingVariant.h2}
						color={HeadingColor.accent}
						// className={'pb-12'}
					/></Modal.Title>
					<Modal.CloseButton className={"hover:rotate-90 hover:bg-transparent transition-all absolute top-5 right-5"} icon={<SvgClose className={'close__modal'} />}/>
				</Modal.Header>
				<Modal.Body className={'!p-0'}>
					<p>Для активации личного кабинета, пожалуйста проверьте указанную почту. Мы отправили вам письмо с активной ссылкой</p>
					<p className={'text-active text-sm'}><strong className={'mr-3'}>i</strong>Пожалуйста, проверьте папку СПАМ</p>
				</Modal.Body>
				<footer className={'mt-12'}><Button type={'button'} text={'Мне не пришло письмо'} variant={ButtonVariant["default"]} className={'w-full'} size={ButtonSizeType.lg}/> </footer>
			</Modal.Content>
		</Modal.Root>
	)
}
