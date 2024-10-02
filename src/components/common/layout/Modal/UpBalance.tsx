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
import { yupResolver } from "mantine-form-yup-resolver";
import { useSWRConfig } from 'swr'
import { values } from 'mobx'
import { CreateCarSchema, NotUpBalanceSchema, UpBalanceSchema } from "utils/validationSchemas";
type initValues = {
  amount: null | number
  purpose: null |  string,
  company_id: string
  service_type: null | string
  description: null | string
}

export enum PurposeOfTransaction {
    "Пополнение баланса (счета)" = 1,
    "Оплата услуг" = 2,
    "Возврат" = 3,
    "Бонус" = 4,
    "Штраф"  = 5
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
        validate: yupResolver(!upBalance ? UpBalanceSchema : NotUpBalanceSchema ),
      validateInputOnBlur: true,
        initialValues: {
            amount: null,
            purpose: "4",
            company_id: id.toString(),
            service_type: null,
            description: null
        } as initValues
  })
    React.useEffect(() => {
      let _values:any
     if(upBalance) {
      _values = {
        amount: null,
        purpose: "1",
        company_id: id.toString(),
        description: upBalance ? `Пополнить счет` : ""
      }
     } else  {
       _values = {
         amount: 0,
         // purpose: "1",
         company_id: id.toString(),
         description: upBalance ? `Пополнить счет` : "",
         service_type: null
       }
     }
      formData.setValues(_values)
    }, [opened, upBalance]);

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
                        className={'hover:rotate-90 hover:!bg-transparent transition-all absolute top-5 right-5 outline-0 focus-visible:outline-0'}
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
                        <Select label={'Цель зачисления'}  {...formData.getInputProps('purpose')} disabled={upBalance} data={upBalance ? [{label: Object.values(PurposeOfTransaction)[0], value: Object.keys(PurposeOfTransaction)[0]}] : Array.from(Object.entries(PurposeOfTransaction).filter((v) => isNaN(Number(v[0])))).slice(3).map((el:any[]) => ({label: el[0], value: el[1].toString()}))}/>
                        {!upBalance ? <Select label={'Тип услуги'} {...formData.getInputProps('service_type')} data={values(store.catalogStore.services).map((i: any) => ({
                          label: i.name,
                          value: String(i.id),
                        }))} /> : null}
                        {!upBalance ? <Textarea label={'Комментарий'} {...formData.getInputProps('description')} minRows={2} /> : null}
                        </div>
                        <div data-content={'modal_company'}>
                        <DList label={'Компания'} title={companyName} />
                        <DList
                            label={'Зачислил'}
                            title={
                                store.userStore.myProfileData.user.last_name +
                                ' ' +
                                store.userStore.myProfileData.user.first_name
                            }
                        />
                        </div>
                    </form>
                </Modal.Body>
                <footer className={'tablet-max:!justify-stretch tablet-max:!flex-col-reverse tablet:'}>
                    <Button
                      type={'button'}
                        text={'Отменить'}
                        action={onClose}
                        variant={ButtonVariant.cancel}
                      size={ButtonSizeType.base}
                    />
                    <Button
                        disabled={!formData.isValid()}
                      type={'button'}
                        text={'Сохранить'}
                        action={async () => {

                            const _val = Number(formData.values.purpose) === 5 ? -Math.abs(formData.values.amount ?? 0) : Number(formData.values.purpose) === 4 ? Math.abs(formData.values.amount ?? 0) : Math.abs(formData.values.amount ?? 0)
                            console.log(_val);
                            return agent.Balance.upBalance(id, Number(formData.values.purpose), _val, formData.values.description ?? "", Number(formData.values.service_type)).then((r) => {
                                    if(r && r.data && r.data.status === "success") {
                                      mutate(`company_${id}`).then(onClose)
                                    }
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
