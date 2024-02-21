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
    type: "Компания-Заказчик" | "Компания-исполнитель"
    city: string | null
    city_name?: string | null | any
    company_name: string | null
    id: string | number
    company_filials: string
    lat: string | number
    lon: string | number
    working_time: string
    performer_company: number[] | any
}

export const [FormProvider, useFormContext, useForm] = createFormContext<any>()
export const createCompanyFormActions = createFormActions<InitValues>('createCompanyForm')

const FormCreateUpdateFilial = ({ company, edit }: any) => {
    const store = useStore()

    let initValues: InitValues = {
        address: '',
        type: CompanyType.customer,
        city: '',
        city_name: '',
        company_name: '',
        id: 0,
        company_filials: 'filials',
        lat: 0,
        lon: 0,
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
            city: company.city,
            city_name: store.catalogStore.getCity(Number(company.city)).name,
            company_name: company.company_name,
            lat: company.lat,
            company_filials: 'filials',
            working_time: company.working_time ?? "",
            lon: company.lon,
            id: Number(company.id),
            performer_company: values(company.performer_company),
            type: company.type
        }
    }
    const formData = useForm({
        name: 'createFilialsForm',
        initialValues: initValues,
        validateInputOnBlur: true,
        onValuesChange: (values, previous) => console.log(values),
        validate: yupResolver(CreateCompanySchema),
        enhanceGetInputProps: (payload) => {
            if (payload.field === 'working_time') {
                return {
                    className: 'mb-2 w-full flex-grow  !flex-[0_0_16rem] col-span-3',
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
                actionCancel={
                  step !== 3 ? (<Button
                        type={'button'}
                        text={'Отменить'}
                        action={(e) => {
                            e.preventDefault()
                            navigate(-1)
                        }}
                        className={'float-right'}
                        variant={ButtonVariant['accent-outline']}
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
                        text={'Сохранить'}
                        className={'float-right'}
                        variant={ButtonVariant.accent}
                      />
                        ) : (
                          <Button
                            action={() => handleSubmit(formData.values)}
                            type={'submit'}
                            disabled={!formData.isValid()}
                            text={'Сохранить submit'}
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
                    <Progress total={2} current={step} />
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
                                    Укажите основную информацию о филиале для добавления ее в список
                                </div>
                            </>
                        }
                    >
                        <TextInput
                            withAsterisk
                            label={'Название филиала'}
                            {...formData.getInputProps('company_name')}
                        />
                        <Select
                            withCheckIcon={false}
                            withAsterisk
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
                        <Select
                          {...formData.getInputProps('company_filials')}
                          defaultValue={formData.values.company_filials}
                          allowDeselect={false}
                          label={'Принадлежит'}
                          data={[
                              { label: 'Компании', value: 'company' },
                              { label: 'Филиалу', value: 'filials' },
                          ]}
                          className={'col-span-3'}
                        />

                        {formData.values.type === CompanyType.performer && (
                          <InputBase
                            component={IMaskInput}
                            withAsterisk
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

                    </PanelForForms>
                    <PanelForForms
                        state={step !== 2}
                        animate={animate}
                        className={'!bg-transparent'}
                        bodyClassName={'!flex flex-wrap gap-x-6 gap-y-3'}
                        variant={PanelVariant.textPadding}
                        background={PanelColor.default}
                        header={
                            <>
                                <Heading
                                    text={'Шаг 2. Информация о счете и индивидуальные настройки '}
                                    color={HeadingColor.accent}
                                    variant={HeadingVariant.h2}
                                />
                                <div className={''}>
                                    Укажите информацию о счета компании и предпочтительных исполнителей, если такие есть
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

                        <Select label={'Овердрафт'} className={' w-fit  !flex-[0_1_4rem]'}{...formData.getInputProps('overdraft')} data={[{ label: 'Да', value: '1' }, { label: 'Нет', value: '2' },]} />
                        <NumberInput withAsterisk type={'text'} label={'Сумма'} suffix={' ₽'} hideControls{...formData.getInputProps('overdraft_sum')} allowNegative={false} maxLength={2} min={0} max={100} />

                        <Select
                            label={'Список Партнеров'}
                            {...formData.getInputProps('performers_list')}
                            className={' w-fit  !flex-[0_0_auto]'}
                            data={[
                                { label: 'Да', value: '1' },
                                { label: 'Нет', value: '2' },
                            ]}
                        />
                        <hr className={'my-4 flex-[1_0_100%] w-full border-gray-2'} />
                        {formData.values.performers_list === '1' && <TransferList />}
                    </PanelForForms>
                </form>
            </PanelForForms>
        </FormProvider>
    )
}

export default observer(FormCreateUpdateFilial)
