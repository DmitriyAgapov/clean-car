import React, { useState } from 'react'
import { yupResolver } from 'mantine-form-yup-resolver'
import { CreateCompanySchema } from 'utils/validationSchemas'
import { Group, InputBase, NumberInput, Select, TextInput } from '@mantine/core'
import { createFormActions, createFormContext } from '@mantine/form'
import { useStore } from 'stores/store'
import { observer } from 'mobx-react-lite'
import { IMask, IMaskInput } from 'react-imask'
import Button, { ButtonVariant } from 'components/common/ui/Button/Button'
import { useNavigate, useRevalidator } from 'react-router-dom'
import { CompanyType, Payment } from 'stores/companyStore'
import PanelForForms, { PanelColor, PanelVariant } from 'components/common/layout/Panel/PanelForForms'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import { values as val } from 'mobx'
import InputAutocompleteNew from 'components/common/ui/InputAutocomplete/InputAutocompleteNew'
import moment, { MomentInput } from 'moment'
import Progress from "components/common/ui/Progress/Progress";
import SelectCustom from "components/common/ui/Select/Select";
import { Field } from "formik";
import SelectFromList from "components/common/SelectFromList/SelectFromList";
import { TransferList } from "components/common/ui/TransferList/TransferList";

interface InitValues {
    address: string | null
    legal_address: string | null
    type: CompanyType
    bill: string | number
    city: string | null
    company_name: string | null
    contacts: string | null
    id: string | number
    inn: string | number
    lat: string | number
    lon: string | number
    ogrn: string | number
    overdraft: string
    overdraft_sum: number
    service_percent: number
    payment: Payment
    performers_list: string
    working_time: string
}

let initValues: InitValues = {
    address: '',
    type: CompanyType.customer,
    bill: '100',
    city: '',
    company_name: '',
    contacts: '',
    id: 0,
    inn: '',
    lat: 0,
    legal_address: '',
    lon: 0,
    ogrn: '',
    overdraft: '1',
    overdraft_sum: 0,
    payment: Payment.postoplata,
    performers_list: '1',
    service_percent: 0,
    working_time: '',
}

export const [FormProvider, useFormContext, useForm] = createFormContext<any>()
export const createCompanyFormActions = createFormActions<InitValues>('createCompanyForm')

const FormCreateUpdateCompany = ({ company, edit }: any) => {
    const store = useStore()
    if (edit) {
        initValues = {
            id: company.id,
            company_name: company.company.data?.name,
            address: company.company.data[`${company.type}profile`].address
                ? company.company.data[`${company.type}profile`].address
                : 'Нет адреса',
            city: String(company.company.data.city.id),
            inn: Number(company.company.data[`${company.type}profile`].inn),
            ogrn: Number(company.company.data[`${company.type}profile`].ogrn),
            legal_address: company.company.data[`${company.type}profile`].legal_address,
            // @ts-ignore
            application_type: CompanyType[type],
            lat: 0,
            lon: 0,
            working_time: company.company.data[`${company.type}profile`].working_time,
            contacts: company.company.data[`${company.type}profile`].contacts,
            service_percent: company.company.data[`${company.type}profile`].service_percent | 0,
            overdraft_sum: company.company.data[`${company.type}profile`].overdraft_sum,
            payment: company.company.data[`${company.type}profile`].payment,
            overdraft: company.company.data[`${company.type}profile`].overdraft ? '1' : '2',
            performers_list: 'Да',
            bill: company.company.data[`${company.type}profile`].bill,
        }
    }
    const [step, setStep] = useState(1);
    const [animate, setAnimate] = useState(false)
    const changeStep = (step?: number) => {
        setAnimate((prevState) => !prevState)
        setTimeout(() => {
            setAnimate(false)
            store.companyStore.loadingCompanies = false
            setStep(step ? step : 2)
        }, 1200)
    }
    const formData = useForm({
        name: 'createCompanyForm',
        initialValues: initValues,
        validateInputOnBlur: true,
        onValuesChange: (values, previous) => console.log(values),
        validate: yupResolver(CreateCompanySchema),
        enhanceGetInputProps: (payload) => {
        if(payload.field === 'working_time') {
            return {
                className: 'mb-2 w-full flex-grow  !flex-[0_0_16rem] col-span-3',
            }
        }
         if(payload.field === 'service_percent') {
            return {
                className: 'mb-2  flex-grow  !flex-[0_0_11rem] col-span-3',
            }
        }
         if(payload.field === 'overdraft_sum') {
            return {
                className: 'mb-2  flex-grow  !flex-[0_0_11rem] col-span-3',
            }
        }
         if(payload.field === 'overdraft') {
            return {
                className: 'mb-2  flex-grow  !flex-[0_0_11rem] col-span-3',
            }
        }



            return {
                className: 'mb-2 w-full flex-grow  !flex-[1_0_20rem] col-span-3',
            }
        },
    })
    const nextStep = () => setStep((current) => (current < 3 ? current + 1 : current))
    const prevStep = () => setStep((current) => (current > 0 ? current - 1 : current))
    type FormValues = typeof formData.values
    let revalidator = useRevalidator()
    const navigate = useNavigate()
    const momentFormat = 'HH:mm'
    const handleNext = React.useCallback((e:any) => {
        console.log(e);
    }, [])
    // @ts-ignore
    return (
        <FormProvider form={formData}>
            <PanelForForms
                footerClassName={'px-8 pb-8 pt-2'}
                variant={PanelVariant.default}
                actionCancel={
                    <Button
                        type={'button'}
                        text={'Отменить'}
                        action={(e) => {
                            e.preventDefault()
                            navigate(-1)
                        }}
                        className={'float-right'}
                        variant={ButtonVariant['accent-outline']}
                    />
                }
                actionNext={
                    <Button
                        type={'button'}
                        action={() => {
                            console.log(formData.values);
                            console.log(formData.isValid());
                            formData.validate()
                            changeStep()

                        }}
                        disabled={!formData.isValid()}
                        text={'Сохранить'}
                        className={'float-right'}
                        variant={ButtonVariant.accent}
                    />
                }
            >
                <form
                    onSubmit={formData.onSubmit((props) => console.log('form', props))}
                    onReset={formData.onReset}
                    style={{ display: 'contents' }}
                >
                    <Progress total={3} current={step} />
                    <PanelForForms
                        state={step !== 1}
                        animate={animate}
                        className={'!bg-transparent'}
                        bodyClassName={'!flex flex-wrap gap-x-6 gap-y-3'}
                        variant={PanelVariant.textPadding}
                        background={PanelColor.default}
                        header={<><Heading text={'Шаг 1. Основная информация'} color={HeadingColor.accent} variant={HeadingVariant.h2} /><div className={''}>Укажите основную информацию о компании для добавления ее в список</div></>}
                    >
                        <TextInput
                            withAsterisk
                            label={'Название компании'}
                            {...formData.getInputProps('company_name')}
                        />
                        <Select
                            withCheckIcon={false}
                            withAsterisk
                            label={'Город'}
                            searchable={true}
                            {...formData.getInputProps('city')}
                            className={'!flex-auto'}
                            data={val(store.catalogStore.cities).map((o: any) => ({
                                label: o.name,
                                value: String(o.id),
                            }))}
                        />
                        <InputAutocompleteNew {...formData.getInputProps('address')}/>
                        <NumberInput
                            withAsterisk
                            type={'text'}
                            label={'ИНН'}
                            {...formData.getInputProps('inn')}
                            hideControls
                            maxLength={10}
                            placeholder={'Введите ИНН'}
                        />
                        <NumberInput
                            withAsterisk
                            type={'text'}
                            label={'ОГРН'}
                            {...formData.getInputProps('ogrn')}
                            hideControls
                            maxLength={13}
                            placeholder={'Введите ОГРН'}
                        />

                        <TextInput
                            withAsterisk
                            label={'Юридический адрес'}
                            {...formData.getInputProps('legal_address')}
                            placeholder={'Введите Юридический адрес'}
                        />
                        {formData.values.type === CompanyType.performer && <InputBase
                          component={IMaskInput}
                          withAsterisk
                          label={'Часы работы'}
                          {...formData.getInputProps('working_time')}
                          mask={Date}
                          /*@ts-ignore*/
                          blocks={{
                              YYYY: { mask: IMask.MaskedRange, from: 1970, to: 2030 },
                              MM: { mask: IMask.MaskedRange, from: 1, to: 12 },
                              DD: { mask: IMask.MaskedRange, from: 1, to: 31 },
                              HH: { mask: IMask.MaskedRange, from: 0, to: 23 },
                              mm: { mask: IMask.MaskedRange, from: 0, to: 59 },
                          }}
                          pattern={`c ${momentFormat} до ${momentFormat}0`}
                          format={(date: MomentInput) => moment(date).format(momentFormat)}
                          parse={(str) => moment(str, momentFormat)}
                          autofix
                          overwrite
                          placeholder='c 00:00 до 23:59'
                        />}
                        <hr className='my-2 flex-[1_0_100%] w-full border-gray-2' />
                        <Select
                            allowDeselect={false}
                            {...formData.getInputProps('type')}
                            label={'Тип'}
                            withAsterisk
                            defaultValue={formData.values.type}
                            className={'!flex-initial'}
                            data={[
                                { label: 'Заказчик', value: CompanyType.customer },
                                { label: 'Партнер', value: CompanyType.performer },
                            ]}
                        />
                        {formData.values.type === CompanyType.performer && <NumberInput
                          withAsterisk
                          type={'text'}
                          label={'Процент сервиса'}
                          {...formData.getInputProps('service_percent')}
                          allowNegative={false}
                          maxLength={2}
                          min={0}
                          max={100}
                        />}
                        <TextInput
                            withAsterisk
                            label={'Контактные данные'}
                            {...formData.getInputProps('contacts')}
                            placeholder={'Введите Контактные данные'}
                        />

                    </PanelForForms>
                    <PanelForForms
                      state={step !== 2}
                      animate={animate}
                      className={'!bg-transparent'}
                      bodyClassName={'!flex flex-wrap gap-x-6 gap-y-3'}
                      variant={PanelVariant.textPadding}
                      background={PanelColor.default}
                      header={<><Heading text={'Шаг 2. Информация о счете и индивидуальные настройки '} color={HeadingColor.accent} variant={HeadingVariant.h2} /><div className={''}>Укажите информацию о счета компании и предпочтительных исполнителей, если такие есть </div></>}
                    >
                        <Select label={'Оплата'}
                          {...formData.getInputProps('payment')}
                          className={' w-fit  !flex-[0_0_auto]'}
                          data={[ { label: 'Постоплата', value: Payment.postoplata }, { label: 'Предоплата', value: Payment.predoplata }, ]} />

                        <Select label={'Овердрафт'}
                          className={' w-fit  !flex-[0_1_4rem]'}
                          {...formData.getInputProps('overdraft')}
                          data={[ { label: 'Да', value: '1' }, { label: 'Нет', value: '2' }, ]} />
                        <NumberInput
                          withAsterisk
                          type={'text'}
                          label={'Сумма'}
                          suffix={' ₽'}
                          hideControls
                          {...formData.getInputProps('overdraft_sum')}
                          allowNegative={false}
                          maxLength={2}
                          min={0}
                          max={100}
                        />

                        <Select label={'Список Партнеров'}
                          {...formData.getInputProps('performers_list')}

                          className={' w-fit  !flex-[0_0_auto]'}
                          data={[ { label: 'Да', value: '1' }, { label: 'Нет', value: '2' }, ]} />
                        <hr className={'my-4 flex-[1_0_100%] w-full border-gray-2'} />
                        {formData.values.performers_list === '1' && <TransferList/>}
                        <SelectFromList items={store.companyStore.companiesPerformers} />
                    </PanelForForms>
                </form>
            </PanelForForms>
        </FormProvider>
    )
}

export default observer(FormCreateUpdateCompany)
