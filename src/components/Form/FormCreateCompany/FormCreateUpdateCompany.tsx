import React, { useEffect, useState } from "react";
import { yupResolver } from 'mantine-form-yup-resolver'
import { CreateCompanySchema } from 'utils/validationSchemas'
import { Group, InputBase, NumberInput, Select, TextInput } from '@mantine/core'
import { createFormActions, createFormContext } from '@mantine/form'
import { useStore } from 'stores/store'
import { observer } from 'mobx-react-lite'
import { IMask, IMaskInput } from 'react-imask'
import Button, { ButtonVariant } from 'components/common/ui/Button/Button'
import { useNavigate, useRevalidator } from 'react-router-dom'
import { type Company, CompanyType, Payment } from "stores/companyStore";
import PanelForForms, { PanelColor, PanelVariant } from 'components/common/layout/Panel/PanelForForms'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import { values, values as val } from "mobx";
import InputAutocompleteNew from 'components/common/ui/InputAutocomplete/InputAutocompleteNew'
import moment, { MomentInput } from 'moment'
import Progress from 'components/common/ui/Progress/Progress'
import SelectCustom from 'components/common/ui/Select/Select'
import { Field } from 'formik'
import SelectFromList from 'components/common/SelectFromList/SelectFromList'
import { TransferList } from 'components/common/ui/TransferList/TransferList'
import LinkStyled from "components/common/ui/LinkStyled/LinkStyled";
import { CreateField } from "components/Form/FormCreateCompany/Steps/StepSuccess";
import company from "routes/company/company";

interface InitValues {
    address: string | null
    legal_address: string | null
    type: "Компания-Заказчик" | "Компания-исполнитель"
    bill: string | number
    city: string | null
    city_name?: string | null | any
    company_name: string | null
    contacts: string | null
    id: string | number
    inn: string | number
    lat: string | number
    lon: string | number
    ogrn: string | number
    overdraft: string
    overdraft_sum: number
    height: number | null
    service_percent: number
    payment: "Постоплата" | "Предоплата"
    performers_list: string
    working_time: string
    performer_company: number[] | any
}

export const [FormProvider, useFormContext, useForm] = createFormContext<any>()
export const createCompanyFormActions = createFormActions<InitValues>('createCompanyForm')

const FormCreateUpdateCompany = ({ company, edit }: any) => {
    const store = useStore()

    let initValues: InitValues = {
        address: '',
        type: CompanyType.customer,
        bill: '100',
        city: '',
        city_name: '',
        company_name: '',
        contacts: '',
        id: 0,
        inn: '',
        height:  null,
        lat: 0,
        legal_address: '',
        lon: 0,
        ogrn: '',
        overdraft: '1',
        overdraft_sum: 0,
        payment: Payment.postoplata,
        performers_list: '1',
        service_percent: 15,
        working_time: '',
        performer_company: []
    }

    const [step, setStep] = useState(1)
    const [animate, setAnimate] = useState(false)

    const changeStep = (step?: number) => {
        setAnimate((prevState) => !prevState)
        setTimeout(() => {
            setAnimate(false)
            store.companyStore.loadingCompanies = false
            setStep(step ? step : 2)
        }, 1200)
    }
    if(edit) {
        initValues = {
            address: company.address,
            inn: company.inn,
            ogrn: company.ogrn,
            city: company.city,
            city_name: store.catalogStore.getCity(Number(company.city)).name,
            height: company.height ?? null,
            company_name: company.company_name,
            lat: company.lat,
            contacts: company.contacts,
            service_percent: company.service_percent,
            working_time: company.working_time ?? "",
            lon: company.lon,
            id: Number(company.id),
            performer_company: company.performer_company && values(company.performer_company),
            type: company.type,
            legal_address: company.legal_address,
            overdraft: company.overdraft,
            overdraft_sum: company.overdraft_sum,
            performers_list: company.performers_list,
            bill: "",
            payment: company.payment
        }
    }

    const formData = useForm({
            name: 'createCompanyForm',
            initialValues: initValues,
            validateInputOnBlur: true,
            // onValuesChange: (values, previous) => console.log(values),
            validate: yupResolver(CreateCompanySchema),
        enhanceGetInputProps: (payload) => {
            if (payload.field === 'working_time') {
                return {
                    className: 'mb-2 w-full flex-grow  !flex-[0_0_16rem] col-span-3',
                }
            }
            if (payload.field === 'service_percent') {
                return {
                    className: 'mb-2  flex-grow  !flex-[0_0_11rem] col-span-3'
                }
            }
            if (payload.field === 'overdraft_sum') {
                return {
                    className: 'mb-2  flex-grow  !flex-[0_0_11rem] col-span-3',
                }
            }
            if (payload.field === 'overdraft') {
                return {
                    className: 'mb-2  flex-grow  !flex-[0_0_11rem] col-span-3',
                }
            }
            if (payload.field === 'height') {
                return {
                    className: 'mb-2  flex-grow  !flex-[0_0_22rem] col-span-3',
                }
            }

            return {
                className: 'mb-2 w-full flex-grow  !flex-[1_0_20rem] col-span-3',
            }
        },
    })


    const navigate = useNavigate()
    const momentFormat = 'HH:mm'
    const handleSubmit = React.useCallback((values:any) => {
        console.log(values);
        if (values.type === CompanyType.performer) {
            const data: Company<CompanyType.performer> = {
                company_type: values.type,
                city: Number(values.city),
                is_active: true,
                name: values.company_name,
                performerprofile: {
                    address: values.address,
                    inn: values.inn,
                    ogrn: values.ogrn,
                    legal_address: values.legal_address,
                    contacts: values.contacts,
                    height: Number(values.height),
                    // application_type: values.application_type,
                    lat: Number(values.lat),
                    lon: Number(values.lon),
                    service_percent: Number(values.service_percent),
                    working_time: values.working_time,
                },
            }
            if(edit) {
                store.companyStore.editCompany(data, CompanyType.performer, values.id).then((r) => {
                    !r.status ? navigate(`/account/companies/performer/${values.id}`) : 'Ошибка'
                })
            } else {
                store.companyStore.addCompany(data, CompanyType.performer).then((r) => {
                    formData.setFieldValue('id', r.id)
                    changeStep(3)
                })
            }
        }
        if (values.type === CompanyType.customer) {
            const data: Company<CompanyType.customer> = {
                company_type: values.type,
                name: values.company_name,
                is_active: true,
                city: Number(values.city),
                customerprofile: {
                    address: values.address,
                    payment: values.payment,
                    inn: String(values.inn),
                    ogrn: String(values.ogrn),
                    legal_address: values.legal_address,
                    contacts: values.contacts,
                    overdraft: values.overdraft === '1',
                    overdraft_sum: Number(values.overdraft_sum),
                    lat: Number(values.lat),
                    lon: Number(values.lon),
                    performer_company: values.performer_company,
                },
            }
            if(edit) {
                store.companyStore.editCompany(data, CompanyType.customer, values.id).then((r) => {
                    !r.status ? navigate(`/account/companies/customer/${values.id}`) : 'Ошибка'
                })
            } else {
                store.companyStore.addCompany(data, CompanyType.customer).then((r) => {
                    values.id = r.id
                    changeStep(3)
                })
            }
        }
    }, [])
    // @ts-ignore
    return (
        <FormProvider form={formData}>
            <PanelForForms
                footerClassName={'px-8 pb-8 pt-2'}
                variant={PanelVariant.default}
                actionBack={step === 2 ? (<Button
                  type={'button'}
                  text={'Назад'}
                  action={() => {
                     changeStep(1)
                  }}
                  className={'float-right'}
                  variant={ButtonVariant['accent-outline']}
                />) : undefined}
                actionCancel={
                  step !== 3 ? (<Button
                        type={'button'}
                        text={'Отменить'}
                        action={(e) => {
                            e.preventDefault()
                            navigate(-1)
                        }}
                        className={'float-right'}
                    variant={ButtonVariant.cancel}
                    />) : undefined
                }
                actionNext={step !== 3 ? (formData.values.type == CompanyType.customer || formData.values.type == CompanyType.customer ? (
                      <Button
                        type={'button'}
                        action={() => {
                            formData.validate()
                            if(step === 2) {
                                handleSubmit(formData.values)
                            } else {
                                changeStep()
                            }
                        }}
                        disabled={!formData.isValid()}
                        text={step === 1 ? 'Далее' : 'Сохранить'}
                        className={'float-right'}
                        variant={ButtonVariant.accent}
                      />
                        ) : (
                          <Button
                            action={() => handleSubmit(formData.values)}
                            type={'submit'}
                            disabled={!formData.isValid()}
                            text={'Сохранить'}
                            className={'float-right'}
                            variant={ButtonVariant.accent}
                          />
                        )) : <LinkStyled text={'перейти к компании'}
                  to={`/account/companies/${formData.values.type == CompanyType.performer ? 'performer' : 'customer'}/${formData.values.id}`}
                  className={'float-right col-start-2 justify-self-end'}
                  variant={ButtonVariant.accent} />
                }
            >
                <form
                    onSubmit={formData.onSubmit(handleSubmit)}
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
                        header={
                            <>
                                <Heading
                                    text={'Шаг 1. Основная информация'}
                                    color={HeadingColor.accent}
                                    variant={HeadingVariant.h2}
                                />
                                <div className={''}>
                                    Укажите основную информацию о компании для добавления ее в список
                                </div>
                            </>
                        }
                    >
                        <TextInput

                            label={'Название'}
                            {...formData.getInputProps('company_name')}
                        />
                        <Select
                            withCheckIcon={false}
                            label={'Город'}
                            searchable={true}
                            {...formData.getInputProps('city')}
                            className={'!flex-auto'}
                            onOptionSubmit={props => {
                               formData.setFieldValue('city_name', store.catalogStore.cities.get(props).name);
                               formData.setFieldValue('address', '');
                            }}
                            data={val(store.catalogStore.cities).filter((c:any) => c.is_active).map((o: any) => ({
                                label: o.name,
                                value: String(o.id),
                            }))}
                        />
                        <InputAutocompleteNew {...formData.getInputProps('address')} city={formData.values.city_name} ctx={formData}/>
                        <NumberInput
                          allowLeadingZeros
                            type={'text'}
                            label={'ИНН'}
                            {...formData.getInputProps('inn')}
                            hideControls
                            maxLength={10}
                            placeholder={'Введите ИНН'}
                        />
                        <NumberInput
                          allowLeadingZeros
                            type={'text'}
                            label={'ОГРН'}
                            {...formData.getInputProps('ogrn')}
                            hideControls
                            maxLength={13}
                            placeholder={'Введите ОГРН'}
                        />
                        {formData.values.type === CompanyType.performer && (
                          <InputBase
                            component={IMaskInput}

                            label={'Часы работы'}
                            {...formData.getInputProps('working_time')}
                            mask={Date}
                            className={'!flex-[1_0_10rem]'}
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
                          />
                        )}

                        <TextInput
                          className={'!flex-[1_0_100%]'}

                            label={'Юридический адрес'}
                            {...formData.getInputProps('legal_address')}
                            placeholder={'Введите Юридический адрес'}
                        />
                        {formData.values.type === CompanyType.performer && (
                            <NumberInput
                                defaultValue={1}
                              className={'!flex-[1_1_4rem]'}

                              step={1}
                              hideControls
                              allowNegative={false}
                              allowDecimal={false}
                                label={'Макс. высота транспорта в см'}
                                {...formData.getInputProps('height')}

                            />
                        )}
                        <hr className='my-2 flex-[1_0_100%] w-full border-gray-2' />
                        <Select
                            allowDeselect={false}
                            {...formData.getInputProps('type')}
                            label={'Тип'}

                            disabled={edit}
                            defaultValue={formData.values.type}
                            className={'!flex-initial'}
                            data={[
                                { label: 'Заказчик', value: CompanyType.customer },
                                { label: 'Партнер', value: CompanyType.performer },
                            ]}
                        />
                        {formData.values.type === CompanyType.performer && (
                            <NumberInput
                                type={'text'}
                                label={'Процент сервиса'}
                                {...formData.getInputProps('service_percent')}
                                allowNegative={false}
                                hideControls
                                // onChange={(value: any) => {
                                //     console.log(typeof value);
                                //     if(typeof value === "string") {
                                //         console.log('string');
                                //         // formData.values.service_percent =  1
                                //         formData.setFieldValue('service_percent', 1);
                                //         formData.validateField('service_percent')
                                //         return 1
                                //         // formData.setDirty({service_percent: false})
                                //         // formData.setTouched({service_percent: false})
                                //     } else {
                                //
                                //         // formData.values.service_percent = value
                                //         formData.setFieldValue('service_percent', value);
                                //         formData.validateField('service_percent')
                                //         return value
                                //         // formData.setDirty({service_percent: false})
                                //         // formData.setTouched({service_percent: false})
                                //     }
                                //
                                // }}
                                startValue={1}
                                defaultValue={1}
                                maxLength={2}
                                min={1}
                                max={99}
                            />
                        )}
                        <TextInput

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
                          footerClassName={''}
                        background={PanelColor.default}
                        header={
                            <>
                                <Heading
                                    text={'Шаг 2. Индивидуальные настройки'}
                                    color={HeadingColor.accent}
                                    variant={HeadingVariant.h2}
                                />
                                <div className={''}>
                                    Укажите информацию о счете компании и предпочтительных исполнителей, если такие есть
                                </div>
                            </>
                        }
                    >
                        <Select
                            label={'Оплата'}
                            {...formData.getInputProps('payment')}
                            className={' w-fit  !flex-[0_0_auto]'}
                            data={[
                                { label: 'Постоплата', value: Payment.postoplata },
                                { label: 'Предоплата', value: Payment.predoplata },
                            ]}
                        />

                        <Select label={'Овердрафт'} className={' w-fit  !flex-[0_1_4rem]'} onOptionSubmit={(value: any) => {
                            if(value === "2") {
                                formData.setFieldValue('overdraft_sum', 0);
                            }
                        }}{...formData.getInputProps('overdraft')} data={[{ label: 'Да', value: '1' }, { label: 'Нет', value: '2' },]} />
                        <NumberInput onClick={() => console.log(formData.errors)} disabled={formData.values.overdraft === "2"}    label={'Сумма'}     thousandSeparator=" " suffix={' ₽'} hideControls{...formData.getInputProps('overdraft_sum')} allowNegative={false} min={1}  className={formData.errors.overdraft_sum ? ' filter grayscale' : ''}/>

                        <Select
                            label={'Список Партнеров'}
                            {...formData.getInputProps('performers_list')}
                            className={' w-fit  !flex-[0_0_auto]'}
                            data={[
                                { label: 'Да', value: '1' },
                                { label: 'Нет', value: '2' },
                            ]}
                        />
                        <hr className={'mt-0 mb-2 flex-[1_0_100%] w-full border-gray-2'} />
                        {formData.values.performers_list === '1' && <TransferList />}
                    </PanelForForms>
                    <PanelForForms state={step !== 3}
                      animate={animate}
                      className={'!bg-transparent'}
                      bodyClassName={'!flex flex-wrap gap-x-6 gap-y-3'}
                      variant={PanelVariant.textPadding}
                      background={PanelColor.default}
                      header={
                          <>
                              <Heading text={`Шаг ${formData.values.type == 'Компания-Партнер' && '2'|| '3'}
                               .
                                  Компания создана `}
                                color={HeadingColor.accent}
                                variant={HeadingVariant.h2}
                              />
                              <div className={''}>
                                  Вы можете добавить Прайсы и Лимиты для компании или добавить их позже в соответствующем разделе
                              </div>
                          </>
                      }

                    >
                        <div className={'mt-10 flex flex-wrap gap-6'}>
                            <CreateField title={'Создать прайс-лист'} />
                            <CreateField title={'Создать лимиты'} />
                        </div>
                    </PanelForForms>
                </form>
            </PanelForForms>
        </FormProvider>
    )
}

export default observer(FormCreateUpdateCompany)
