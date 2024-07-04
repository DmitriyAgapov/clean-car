import { Modal, NumberInput, Select, Textarea } from '@mantine/core'
import React from 'react'
import { useStore } from 'stores/store'
import styles from './Modal.module.scss'
import { SvgClose } from 'components/common/ui/Icon'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import Button, { ButtonSizeType, ButtonVariant } from 'components/common/ui/Button/Button'
import agent from 'utils/agent'
import DList from 'components/common/ui/DList/DList'
import { useForm } from '@mantine/form'
import { useSWRConfig } from 'swr'

enum PurposeOfTransaction {
    "Пополнение баланса (счета)" = "1",
    "Оплата услуг" = "2",
    "Возврат" = "3",
    "Начисление бонуса" = "4",
    "Списание бонуса"  = "5",
    "Штраф по ПДД"  = "6",
    "Штраф компании (в рамках договора)"  = "7"
}
interface UpBalanceParams {
    opened: boolean;
    onClose: () => void;
    id: number;
    companyName: string;
    upBalance?: boolean;
}

export function UpBalance({opened, onClose, id, upBalance = false, companyName} :  UpBalanceParams) {

      const store = useStore()
      const { mutate } = useSWRConfig()
      const formData = useForm({
          name: 'upBalance',
          onValuesChange: values => console.log(values),
          initialValues: {
              amount: 0,
              purpose: "1",
              company_id: id.toString()
          }
      })
	return (
        <Modal.Root size={600} opened={opened} onClose={onClose} centered>
            <Modal.Overlay className={'bg-black/90'} />
            <Modal.Content radius={20} className={styles.ModalUpBalance}>
                <Modal.Header className={'static '}>
                    <Modal.Title>
                        <Heading
                            text={upBalance ? `Пополнить счет` : "Бонусы и штрафы"}
                            variant={HeadingVariant.h2}
                            color={HeadingColor.accent}
                            // className={'pb-12'}
                        />
                        {!upBalance ? <p className={'text-white text-xs mb-4'}>Начисление бонусов и штрафов компании. Выберите тип начислений.</p> : null}
                    </Modal.Title>

                    <Modal.CloseButton
                        className={'hover:rotate-90 hover:bg-transparent transition-all absolute top-5 right-5 outline-0 focus-visible:outline-0'}
                        icon={<SvgClose className={'close__modal'} />}
                    />
                </Modal.Header>
                <Modal.Body className={'!p-0'}>
                    <form className={'grid gap-8 mb-6'}>
                        <div>
                            <NumberInput
                            label={'Сумма начисления'}

                            hideControls
                            {...formData.getInputProps('amount')}
                            // onChange={(value: any) => setAmount(Number(value))}
                        />
                        <Select label={'Цель зачисления'}  {...formData.getInputProps('purpose')} disabled={upBalance} data={upBalance ? [{label: Object.keys(PurposeOfTransaction)[0], value: "1"}] : Array.from(Object.entries(PurposeOfTransaction)).slice(3).map((el:string[]) => ({label: el[0], value: el[1]}))}/>
                            {!upBalance ? <Textarea label={'Комментарий'} minRows={2} /> : null}
                        </div>
                        <div data-content={'modal_company'}>
                        <DList label={'Компания'} title={companyName} />
                        <DList
                            label={'Зачислил'}
                            title={
                                store.userStore.myProfileData.user.first_name +
                                ' ' +
                                store.userStore.myProfileData.user.last_name
                            }
                        />
                        </div>
                    </form>
                </Modal.Body>
                <footer className={'tablet-max:!justify-stretch tablet:'}>
                    <Button
                        text={'Отменить'}
                        action={onClose}
                        variant={ButtonVariant.cancel}
                      size={ButtonSizeType.base}
                    />
                    <Button

                        text={'Сохранить'}
                        action={async () => {
                            return agent.Balance.upBalance(id, Number(formData.values.purpose), Number(formData.values.amount)).then((r) => {
                                    r.data.status === "success" && mutate(`company_${id}`).then(onClose)
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
