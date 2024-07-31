import React, { useState } from 'react'
import { yupResolver } from 'mantine-form-yup-resolver'
import { CreateFilialSchema } from 'utils/validationSchemas'
import { InputBase, NumberInput, Select, TextInput } from '@mantine/core'
import { createFormActions, createFormContext } from '@mantine/form'
import { useStore } from 'stores/store'
import { observer } from 'mobx-react-lite'
import { IMask, IMaskInput } from 'react-imask'
import Button, { ButtonVariant } from 'components/common/ui/Button/Button'
import { useNavigate, useRevalidator } from 'react-router-dom'
import { type Company, CompanyType, Payment } from 'stores/companyStore'
import PanelForForms, { PanelColor } from 'components/common/layout/Panel/PanelForForms'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import { values as val } from 'mobx'
import InputAutocompleteNew from 'components/common/ui/InputAutocomplete/InputAutocompleteNew'
import moment, { MomentInput } from 'moment'
import Progress from 'components/common/ui/Progress/Progress'
import LinkStyled from 'components/common/ui/LinkStyled/LinkStyled'
import agent from 'utils/agent'
import { useScrollIntoView } from '@mantine/hooks'
import { PanelVariant } from 'components/common/layout/Panel/Panel'

interface InitValues {
    address: string | null
    address_ready: boolean
    workload: string,
    city: string | null
    city_name?: string | null | any
    company_filials: string
    company_id: number | string | null
    company_name: string | null
    height: string | number | null
    house: string | null
    id: string | number
    is_active: string
    lat: string | number
    legal_address: string | null
    lon: string | number
    performer_company: number[] | any
    qc?: string | null
    service_percent: number
    street: string | null
    type: 'Клиент' | 'Партнер'
    working_time: string
}

export const [FormProvider, useFormContext, useForm] = createFormContext<InitValues | any>()
export const createFilialsFormActions = createFormActions<InitValues>('createFilialsForm')

const FormCreateUpdateFilial = ({ company, edit }: any) => {
    const store = useStore()
    let initValues: InitValues = {
        address: '',
        address_ready: false,
        street: '',
        legal_address: '',
        qc: null,
        house: '',
        type: store.userStore.myProfileData.company.company_type !== CompanyType.admin ? store.userStore.myProfileData.company.company_type : CompanyType.customer,
        city: '',
        city_name: '',
        company_id: null,
        company_name: '',
        id: 0,
        workload: "1",
        height: null,
        company_filials: 'company',
        lat: 0,
        lon: 0,
        is_active: 'true',
        working_time: '',
        service_percent: 1,
        performer_company: []
    }
    const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
        offset: 60,

    });

    const [step, setStep] = useState(1)
    const [animate, setAnimate] = useState(false)

    if(edit) {
        initValues = {
            address: company.address,
            city: company.city,
            address_ready: true,
            street: '',
            qc: null,
            house: '',
            workload: String(company.workload),
            legal_address: '',
            city_name: store.catalogStore.getCity(Number(company.city)).name,
            company_name: company.company_name,
            lat: company.lat,
            height: company.height,
            company_id: String(company.company_id),
            company_filials: company.parent === null ? 'company' : 'filials',
            working_time: company.working_time ?? "",
            lon: company.lon,
            service_percent: company.service_percent,
            id: Number(company.id),
            performer_company: company.performer_company && company.performer_company,
            type: company.type,
            is_active: company.is_active ? 'true' : 'false'
        }
    }
    const formData = useForm({
        name: 'createFilialsForm',
        initialValues: initValues,
        validateInputOnBlur: true,
        onValuesChange: (values, previous) => console.log(values),
        validate: yupResolver(CreateFilialSchema),
        enhanceGetInputProps: (payload) => {
            if (payload.field === 'company_id') {
                return {
                    className: 'mb-2 w-full flex-grow  !flex-[0_0_32%] col-span-3',
                }
            }
            if (payload.field === 'company_filials') {
                return {
                    className: 'mb-2 w-full flex-grow  !flex-[0_0_32%] col-span-3',
                }
            }

            if (payload.field === 'address') {
                return {
                    className: `mb-2  desktop:!flex-[1_0_64%] col-span-3   ${store.appStore.appType === "admin" && ''} col-span-3`,
                }
            }
            if (payload.field === 'type') {
                return {
                    className: `mb-2  col-span-5  !flex-[1_1_30%]  ${store.appStore.appType !== "admin" && '!hidden'}`,
                }
            }
            if (payload.field === 'company_name') {
                return {
                    className: `mb-2  col-span-3  ${formData.values.type === CompanyType.customer ? " !flex-[1_1_30%]" : " !flex-[1_1_64%]"}`,
                }
            }

            if (payload.field === 'city') {
                return {
                    className: 'mb-2  col-span-3 !flex-[0_1_30%]',
                }
            }
            // if (payload.field === 'is_active') {
            //     return {
            //         className: 'mb-2  col-span-3 !flex-[0_15rem]}',
            //     }
            // }
            return {
                className: 'mb-2   !flex-[1_1_30%] col-span-3',
            }
        },
    })
    const navigate = useNavigate()
    const revalidate = useRevalidator()
    const momentFormat = 'HH:mm'
    const handleSubmit = React.useCallback((values: any) => {
        if (values.type == CompanyType.performer) {
            const data: Company<CompanyType.performer> = {
                city: Number(values.city),
                is_active: values.is_active === "true",
                name: values.company_name,
                performerprofile: {
                    address: values.address,
                    lat: Number(values.lat),
                    workload: Number(values.workload),
                    lon: Number(values.lon),
                    working_time: values.working_time,
                },
            }
            if (edit) {
                agent.Filials.editFilial(data, values.company_id, 'performer', values.id)
                    .then((r) => {
                        values.id = r.id
                        revalidate.revalidate()
                        navigate(`/account/filials/performer/${values.company_id}/${company.id}`)
                    })
                    .then(() => store.companyStore.getAllFilials())
            } else {
                store.companyStore
                    .createFilial(data, 'performer', values.company_id)
                    .then((r) => {
                    console.log(r);
                        // values.id = r.id
                        // revalidate.revalidate()
                        // navigate(`/account/filials/performer/${values.company_id}/${r.id}`)
                    })
                    .then(() => store.companyStore.getAllFilials())
            }
        }
        if (values.type == CompanyType.customer) {
            const data: Company<CompanyType.customer> = {
                id: values.id,
                name: values.company_name,
                is_active: values.is_active === "true",
                city: Number(values.city),
                customerprofile: {},
            }
            if (edit) {
                agent.Filials.editFilial(data, values.company_id, 'customer', values.id)
                    .then((r) => {
                        values.id = r.id
                        revalidate.revalidate()
                        navigate(`/account/filials/customer/${values.company_id}/${company.id}`)
                    })
                    .then(() => store.companyStore.getAllFilials())
            } else {
                store.companyStore
                    .createFilial(data, 'customer', values.company_id)
                    .then((r) => {
                        values.id = r.id
                        revalidate.revalidate()
                        navigate(`/account/filials/customer/${values.company_id}/${r.id}`)
                    })
                    .then(() => store.companyStore.getAllFilials())
            }
        }
    }, [])

    React.useEffect(() => {
        const _v = store.companyStore.getCompanyCity(formData.values.company_id)
        if(_v) {
            formData.setFieldValue('city', _v.toString())
        } else {
            formData.setFieldValue('city', null)
        }
    }, [formData.values.company_id]);

    const [filialsCompanyData, setFilialsCompanyData] = React.useState(['Пусто'])
    React.useEffect(() => {
        (async () => {
            const data = await store.companyStore.loadAllFilials()
            if(data.results && data.results.length !== 0) {
            let res: any
            if (formData.values.company_filials === 'filials') {
                if(store.appStore.appType === "admin") {
                    res = data.results.filter((c: any) => c.company_type === formData.values.type).map((f: any) => ({ label: f.name, value: f.id.toString() }))
                    console.log(res);
                } else {
                    res = data.results.map((f: any) => ({ label: f.name, value: f.id.toString() }))
                }
                setFilialsCompanyData(res)
            } else {
                res = store.companyStore.getCompaniesAll.filter((c: any) => c.company_type === formData.values.type).filter((c: any) => c.parent === null).map((f: any) => ({ label: f.name, value: f.id.toString() }))
                console.log(res);
                setFilialsCompanyData(res)
            }
            }
        })()

    }, [formData.values.type, formData.values.company_filials])

    // @ts-ignore
    return (

            <PanelForForms
                ref={targetRef}
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
                            variant={ButtonVariant.cancel}
                        />
                }
                actionNext={
                    step !== 3 ? (
                        formData.values.type == CompanyType.customer || formData.values.type == CompanyType.customer ? (
                            <Button
                                type={'button'}
                                action={() => {
                                    formData.validate()
                                    handleSubmit(formData.values)
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
                                text={'Сохранить'}
                                className={'float-right'}
                                variant={ButtonVariant.accent}
                            />
                        )
                    ) : (
                        <LinkStyled
                            text={'перейти к компании'}
                            to={`/account/companies/${formData.values.type == CompanyType.performer ? 'performer' : 'customer'}/${formData.values.id}`}
                            className={'float-right col-start-2 justify-self-end'}
                            variant={ButtonVariant.accent}
                        />
                    )
                }
            >
                {/* <FormProvider form={formData}> */}
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
                        bodyClassName={'tablet:!flex flex-wrap gap-x-6 gap-y-3'}
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
                        <Select
                            allowDeselect={false}
                          disabled={edit}
                      {...formData.getInputProps('type')}
                      label={'Тип'}
                      onOptionSubmit={(value) => {
                          formData.setFieldValue('company_id', null)
                          formData.setFieldValue('company_filials', 'filials')
                      }}
                      defaultValue={formData.values.type}
                      data={[
                          { label: 'Клиент', value: CompanyType.customer },
                          { label: 'Партнер', value: CompanyType.performer },
                      ]}
                    />
                        <Select
                            {...formData.getInputProps('company_filials')}
                            defaultValue={formData.values.company_filials}
                            allowDeselect={false}
                            label={'Принадлежит'}
                            onOptionSubmit={(value) => {
                                formData.setFieldValue('company_id', null)
                                store.companyStore.loadAllFilials()
                            }}
                            data={[
                                { label: 'Компании', value: 'company' },
                                { label: 'Филиалу', value: 'filials' },
                            ]}
                        />
                        <Select
                            searchable
                            clearable
                            // onOptionSubmit={(value) => {
                            //     console.log(formData.values)
                            // }}
                            defaultValue={formData.values.company_id}
                            label={formData.values.company_filials === 'filials' ? 'Филиал' : 'Компания'}
                            disabled={filialsCompanyData.length === 0}
                            {...formData.getInputProps('company_id')}
                            data={filialsCompanyData}
                        />
                        <hr className='my-2 flex-[1_0_100%] w-full border-transparent' />
                        <TextInput label={'Название филиала'} {...formData.getInputProps('company_name')}  />
                        {formData.values.type === CompanyType.performer && (
                          <InputBase
                            component={IMaskInput}
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
                          />
                        )}
                        {formData.values.type === CompanyType.performer && <Select
                          allowDeselect={false}
                          {...formData.getInputProps('workload')}
                          label={'Загруженность'}
                          defaultValue={formData.values.workload}
                          className={'tablet:!flex-initial desktop:!flex-[0_1_30%] col-span-3'}
                          data={[
                              { label: 'Свободен', value: "1" },
                              { label: 'Умеренная загрузка', value: "2" },
                              { label: 'Занят', value: "3" },
                          ]}
                        />}
                        <Select
                          {...formData.getInputProps('is_active')}
                          withCheckIcon={false}
                          label={'Статус'}
                          data={[
                              { label: 'Активен', value: 'true' },
                              { label: 'Неактивен', value: 'false' },
                          ]}
                        />
                        {formData.values.type === CompanyType.performer && (
                          <NumberInput
                            step={1}
                            hideControls
                            allowNegative={false}
                            allowDecimal={false}
                            label={'Макс. высота транспорта в см'}
                            {...formData.getInputProps('height')}
                          />
                        )}
                       <Select
                            withCheckIcon={false}
                            label={'Город'}
                            searchable={true}
                            {...formData.getInputProps('city')}

                            onOptionSubmit={(props) => {
                                formData.setFieldValue('city_name', store.catalogStore.cities.get(props).name)
                                formData.setFieldValue('address', '')
                            }}
                            data={val(store.catalogStore.cities)
                                .filter((c: any) => c.is_active)
                                .map((o: any) => ({
                                    label: o.name,
                                    value: String(o.id),
                                }))}
                        />
                        {formData.values.type === CompanyType.customer ? null : <InputAutocompleteNew {...formData.getInputProps('address')} city={formData.values.city_name} ctx={formData}/>}
                    </PanelForForms>
                    <PanelForForms
                        state={step !== 2}
                        animate={animate}
                        className={'!bg-transparent'}
                        // bodyClassName={'!flex flex-wrap gap-x-6 gap-y-3'}
                        variant={PanelVariant.textPadding}
                        background={PanelColor.default}
                        header={
                            <>
                                <Heading
                                    text={'Шаг 2.  Филиал создан'}
                                    color={HeadingColor.accent}
                                    variant={HeadingVariant.h2}
                                />
                                <div className={''}>
                                    Вы можете добавить Отдел Сотрудников и Лимиты для компании или добавить их позже в
                                    соответствующем разделе
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

                        <Select
                            label={'Овердрафт'}
                            className={' w-fit  !flex-[0_1_4rem]'}
                            {...formData.getInputProps('overdraft')}
                            data={[
                                { label: 'Да', value: '1' },
                                { label: 'Нет', value: '2' },
                            ]}
                        />
                        <NumberInput
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
                        {/* {formData.values.performers_list === '1' && <TransferList />} */}
                    </PanelForForms>
                </form>
                {/* </FormProvider> */}
            </PanelForForms>

    )
}

export default observer(FormCreateUpdateFilial)
