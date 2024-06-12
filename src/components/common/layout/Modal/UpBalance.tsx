import { Modal, NumberInput } from '@mantine/core'
import React from "react";
import { useStore } from "stores/store";
import styles from "./Modal.module.scss";
import { SvgClose } from "components/common/ui/Icon";
import Heading, { HeadingColor, HeadingVariant } from "components/common/ui/Heading/Heading";
import CarHelper from "components/common/layout/CarHelper/CarHelper";
import Button, { ButtonVariant } from "components/common/ui/Button/Button";
import agent from "utils/agent";
import DList from "components/common/ui/DList/DList";

export function UpBalance(props: { opened: boolean; onClose: () => void, id: number, companyName: string}) {
	const store = useStore()

	const [amount, setAmount] = React.useState(0)

	return (
        <Modal.Root size={600} opened={props.opened} onClose={props.onClose} centered>
            <Modal.Overlay className={'bg-black/90'} />
            <Modal.Content radius={20} className={styles.ModalUpBalance}>
                <Modal.Header className={'static '}>
                    <Modal.Title>
                        <Heading
                            text={`Пополнить счет`}
                            variant={HeadingVariant.h2}
                            color={HeadingColor.accent}
                            // className={'pb-12'}
                        />
                    </Modal.Title>
                    <Modal.CloseButton
                        className={'hover:rotate-90 hover:bg-transparent transition-all absolute top-5 right-5'}
                        icon={<SvgClose className={'close__modal'} />}
                    />
                </Modal.Header>
                <Modal.Body className={'!p-0'}>
                    <div className={'grid gap-8 mb-12'}>
                        <NumberInput
                            label={'Сумма начисления'}
                            name={'paymoney'}
                            value={amount.toString()}
                            onChange={(value: any) => setAmount(Number(value))}
                        />
                        <DList label={'Компания'} title={props.companyName} />
                        <DList
                            label={'Зачислил'}
                            title={
                                store.userStore.myProfileData.user.first_name +
                                ' ' +
                                store.userStore.myProfileData.user.last_name
                            }
                        />
                    </div>
                </Modal.Body>
                <footer>
                    <Button
                        text={'Отменить'}
                        action={props.onClose}
                        variant={ButtonVariant.cancel}
                    />
                    <Button
                        text={'Сохранить'}
                        action={async () => {
                            return agent.Balance.upBalance(props.id, 'Пополнение баланса компании', amount).then(() =>
                                props.onClose
                            )
                        }}
                        variant={ButtonVariant['accent-outline']}
                    />
                </footer>
            </Modal.Content>
        </Modal.Root>
    )
}
