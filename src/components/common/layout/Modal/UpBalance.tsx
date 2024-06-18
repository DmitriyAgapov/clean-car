import { Modal, NumberInput, Select } from '@mantine/core'
import React from "react";
import { useStore } from "stores/store";
import styles from "./Modal.module.scss";
import { SvgClose } from "components/common/ui/Icon";
import Heading, { HeadingColor, HeadingVariant } from "components/common/ui/Heading/Heading";
import CarHelper from "components/common/layout/CarHelper/CarHelper";
import Button, { ButtonVariant } from "components/common/ui/Button/Button";
import agent from "utils/agent";
import DList from 'components/common/ui/DList/DList'
import { useForm } from '@mantine/form'
import { useSWRConfig } from 'swr';

enum PurposeOfTransaction {
    "Пополнение баланса (счета)" = "1",
    "Оплата услуг" = "2",
    "Возврат" = "3",
    "Начисление бонуса" = "4",
    "Списание бонуса"  = "5",
    "Штраф по ПДД"  = "6",
    "Штраф компании (в рамках договора)"  = "7"
}
export function UpBalance(props: { opened: boolean; onClose: () => void, id: number, companyName: string}) {
	const store = useStore()
    const { mutate } = useSWRConfig()
  const formData = useForm({
      name: 'upBalance',
      onValuesChange: values => console.log(values),
      initialValues: {
          amount: 0,
          purpose: PurposeOfTransaction,
          company_id: props.id.toString()
      }
  })
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
                    <form className={'grid gap-8 mb-12'}>
                        <NumberInput
                            label={'Сумма начисления'}

                          hideControls
                          {...formData.getInputProps('amount')}
                            // onChange={(value: any) => setAmount(Number(value))}
                        />
                        <Select label={'Цель зачисления'}  {...formData.getInputProps('purpose')} data={Array.from(Object.entries(PurposeOfTransaction)).map((el:string[]) => ({label: el[0], value: el[1]}))}/>
                        <DList label={'Компания'} title={props.companyName} />
                        <DList
                            label={'Зачислил'}
                            title={
                                store.userStore.myProfileData.user.first_name +
                                ' ' +
                                store.userStore.myProfileData.user.last_name
                            }
                        />
                    </form>
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
                            return agent.Balance.upBalance(props.id, Number(formData.values.purpose), Number(formData.values.amount)).then((r) => {
                                    r.data.status === "success" && mutate(`company_${props.id}`).then(() => props.onClose())
                                }
                            )
                        }}
                        variant={ButtonVariant['accent-outline']}
                    />
                </footer>
            </Modal.Content>
        </Modal.Root>
    )
}
