import React, { useEffect, useState } from "react";
import { yupResolver } from 'mantine-form-yup-resolver'
import {  CreateLimitSchema } from "utils/validationSchemas";
import { Group,  NumberInput, Radio, Select, TextInput } from '@mantine/core'
import { createFormActions, createFormContext } from '@mantine/form'
import { useStore } from 'stores/store'
import { observer } from 'mobx-react-lite'
import Button, { ButtonVariant } from 'components/common/ui/Button/Button'
import { useNavigate, useRevalidator } from 'react-router-dom'
import { type Company, CompanyType, Payment } from "stores/companyStore";
import PanelForForms, { PanelColor } from 'components/common/layout/Panel/PanelForForms'
import { PanelVariant } from "components/common/layout/Panel/Panel";
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import { set, values, values as val } from "mobx";
import LinkStyled from "components/common/ui/LinkStyled/LinkStyled";
import { useSWRConfig } from "swr";
import { useDisclosure, useScrollIntoView, useViewportSize } from "@mantine/hooks";
import agent from "utils/agent";
import { LimitDelete } from "components/common/layout/Modal/LimitDelete";

interface InitValues {
    company: string | null
    filial: string | null
    conductor: string | null
    car: string | null
    is_day: string | null
    service_type: string | null
    amount: string
}

export const [FormProvider, useFormContext, useForm] = createFormContext<any>()
export const createLimitFormActions = createFormActions<InitValues>('createLimitForm')

const FormCreateUpdateLimits = ({ company, edit }: any) => {
    const store = useStore()
    const { mutate } = useSWRConfig()
    let initValues: InitValues = {
        company: null,
        filial: null,
        conductor: null,
        car: null,
        is_day: 'false',
        service_type: null,
        amount: '1'
    }
    const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
        offset: 60,

    });
    const {width} = useViewportSize()
    const [step, setStep] = useState(1)

    const [opened, { open, close }] = useDisclosure(false)
    const memoModal = React.useMemo(() => {
        return <LimitDelete opened={opened} onClose={close} />
    }, [opened])

    const changeStep = (step?: number) => {
        // setAnimate((prevState) => !prevState)
        setTimeout(() => {
            // setAnimate(false)
            store.companyStore.loadingCompanies = false
            setStep(step ? step : 2)
        }, 1200)
        width < 940 ? scrollIntoView() : null
    }
    if(edit) {
        initValues = {
            company: String(company.company),
            filial: company.parent ? String(company.parent.id) : null,
            conductor: company.employee ? String(company.employee.id) : null,
            car: company.car ? String(company.car.id) : null,
            is_day: company.is_day ? 'true' : 'false',
            service_type: String(company.service_type),
            amount: String(company.amount)
        }
    }
    const formData = useForm({
            name: 'createLimitForm',
            initialValues: initValues,
            validateInputOnBlur: true,
            onValuesChange: (values, previous) => console.log(values, 'values'),
            validate: yupResolver(CreateLimitSchema),
            enhanceGetInputProps: (payload) => {

                return {
                    className: 'mb-2 w-full flex-grow  !flex-[1_0_20rem] col-span-3',
                }
        },
    })

    const carsData = React.useMemo(() => {
        //@ts-ignore
        const car = store.carStore.getCompanyCars.cars?.results?.filter((car) => car.employees.filter((e:any) => e.id === Number(formData.values.conductor))?.length !== 0)
        console.log(car, 'car');
        if(car?.length > 0) {
            return car
        }
        return null
    }, [formData.values.conductor, formData.values.company, formData.values.filials])

    const conductorsData = React.useMemo(() => {
        let result: any[] = []
        if(store.usersStore.currentCompanyUsers && store.usersStore.currentCompanyUsers.length !== 0) {
            const users: any[] = store.usersStore.currentCompanyUsers.filter((cond: any) => cond.company.id === Number(formData.values.company))
            if (users.length === 1) {
                formData.values.conductor = String(users[0].employee.id)
                store.bidsStore.formResultSet({ conductor: Number(users[0].employee.id) })
                result = users.map((c: any) => ({
                    label: c.employee.first_name + " " + c.employee.last_name,
                    value: String(c.employee.id),
                }))
            }
            if (users.length === 0) {
                result = []
            } else {
                result = users.map((c: any) => ({
                    label: c.employee.first_name + " " + c.employee.last_name,
                    value: String(c.employee.id),
                }))
            }
        }
        return result
    }, [formData.values.company, store.usersStore.currentCompanyUsers])

    const [filials, setFilials] = React.useState<any | null>(null)
    // const filialsData = React.useMemo( ():any|null => {
    //
    //     (() => {
    //         if(formData.values.company === '0') {
    //             agent.Filials.getFilials('customer', Number(formData.values.company)).then(r => setFilials(r.data))
    //         } else setFilials(null)
    //     })()
    //     if(filials && filials?.results.length > 0) {
    //
    //         return
    //     }
    //     return null
    //
    // }, [formData.values.company])
    const [conductors, setConductors] = React.useState<any | null>(null)
    // const conductorsDataNew = React.useMemo( ():any|null => {
    //     (() => {
    //         if(formData.values.company === '0') {
    //             agent.Account.getCompanyUsers(Number(formData.values.company)).then(r => setConductors(r.data))
    //         } else setConductors(null)
    //     })()
    //     if(conductors && conductors?.results.length > 0) {
    //
    //         return
    //     }
    //     return null
    //
    // }, [formData.values.company])

    const [cars, setCars] = React.useState<any | null>(null)
    // const carsDataNew = React.useMemo( ():any|null => {
    //
    //
    //     return null
    //
    // }, [formData.values.company])
    // useEffect(() => {
    //     console.log(formData.values.company);
    //     console.log(cars, 'cars')
    // }, [formData.values.company, cars])
    const handleClear = React.useCallback(() => {
        console.log('cleared');
        setFilials(null)
        setCars(null)
        setConductors(null)
        formData.setFieldValue('car', null)
        formData.setFieldValue('filial', null)
        formData.setFieldValue('conductor', null)

    }, []   )
    const handleChangeCompany = React.useCallback((e:any) => {
        handleClear()
        if(e) {
            console.log('!==0');
            formData.setFieldValue('company', e);
            // store.bidsStore.formResultSet({ company: Number(e) })

            (() => {
                console.log('load company data', e, typeof e);
                if(e && e !== '0') {
                    console.log('load company data')
                    agent.Cars.getCompanyCars(Number(e)).then(r => setCars(r.data))
                    agent.Account.getCompanyUsers(Number(e)).then(r => setConductors(r.data))
                    agent.Filials.getFilials('customer', Number(e)).then(r => setFilials(r.data))
                } else {
                    setCars(null)
                    setFilials(null)
                    setConductors(null)
                }
            })()

        }

    },[formData.values.company])
    useEffect(() => {
      console.log('form', formData.values.company);
    },[formData.values.company] )
    const navigate = useNavigate()

    const handleSubmit = React.useCallback(async (values: any) => {
        await agent.Limits.createLimit({
            company_id: values.filial ? Number(values.filial) : Number(values.company),
            data: {
                amount: values.amount ? Number(values.amount) : undefined,
                is_day: values.is_day === 'true',
                service_type: Number(values.service_type),
                employee: values.conductor ?  Number(values.conductor)  : undefined,
                car: values.car ? Number(values.car) : undefined,
                company:  values.filial ? Number(values.filial) : Number(values.company),
            },
        }).then((r:any) => {
            if(r.status === 201) {
                mutate(`limits`)
                navigate(`/account/limits/${r.data?.company}/${r.data?.id}`)
            }
        })

    }, [])
    // @ts-ignore
    return (
        <FormProvider form={formData}>
            <PanelForForms
                ref={targetRef}
                footerClassName={'px-8 pb-8 pt-2'}
                variant={PanelVariant.default}
                actionBack={
                    step === 2 ? (
                        <Button
                            type={'button'}
                            text={'Назад'}
                            action={() => {
                                changeStep(1)
                            }}
                            className={'float-right'}
                            variant={ButtonVariant['accent-outline']}
                        />
                    ) : undefined
                }
                actionCancel={
                    edit ? (
                        <Button
                            type={'button'}
                            text={'Удалить'}
                            action={open}
                            className={'float-right'}
                            variant={ButtonVariant.cancel}
                        />
                    ) : (
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
                    )
                }
                actionNext={
                    step !== 3 ? (
                        formData.values.type == CompanyType.customer || formData.values.type == CompanyType.customer ? (
                            <Button
                                type={'button'}
                                action={() => {
                                    formData.validate()
                                    if (step === 2) {
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
                <form
                    onSubmit={formData.onSubmit(handleSubmit)}
                    onReset={formData.onReset}
                    style={{ display: 'contents' }}
                >
                    <PanelForForms
                        state={false}
                        className={'!bg-transparent'}
                        // bodyClassName={'!flex flex-wrap gap-x-6 gap-y-3'}
                        variant={PanelVariant.textPadding}
                        background={PanelColor.default}
                        header={
                            <>
                                <Heading
                                    text={'Основные данные'}
                                    color={HeadingColor.accent}
                                    variant={HeadingVariant.h2}
                                />
                                <div className={''}>
                                    Укажите основную информацию о клиенте, к которому будут направлены лимиты
                                </div>
                            </>
                        }
                    >
                        <Group grow className={'col-span-6'}>
                            <Select
                                {...formData.getInputProps('company')}
                                clearable
                                comboboxProps={{ withinPortal: true }}
                                label={'Компания'}
                                clearButtonProps={{
                                    onClick: () => {
                                        setCars(null)
                                        setFilials(null)
                                        setConductors(null)
                                    },
                                }}
                                onLoad={handleChangeCompany}
                                onOptionSubmit={handleChangeCompany}
                                searchable
                                data={store.companyStore.companies
                                    .filter((c: any) => c.company_type === 'Компания-Заказчик')
                                    .filter((c: any) => c.parent === null)
                                    .map((c: any) => ({ label: c.name, value: String(c.id) }))}
                            />
                            <Select
                                {...formData.getInputProps('filial')}
                                clearable
                                disabled={!filials || filials?.results?.length === 0}
                                label={'Филиал'}
                                comboboxProps={{ withinPortal: true }}
                                  clearButtonProps={{
                                      onClick: () => {
                                          setCars(null)
                                          setConductors(null)
                                          agent.Cars.getCompanyCars(Number(formData.values.company)).then(r => setCars(r.data))
                                          agent.Account.getCompanyUsers(Number(formData.values.company)).then(r => setConductors(r.data))
                                      },
                                  }}
                                // onLoad={handleChangeCompany}
                                onOptionSubmit={(e) => {
                                    if(e && e !== '0') {
                                        agent.Cars.getCompanyCars(Number(e)).then(r => setCars(r.data))
                                        agent.Account.getCompanyUsers(Number(e)).then(r => setConductors(r.data))
                                    } else {
                                        setCars(null)
                                        setConductors(null)
                                    }
                                }}
                                searchable
                                data={filials?.results?.map((c: any) => ({ label: c.name, value: String(c.id) }))}
                            />
                        </Group>
                        {(!formData.values.conductor && !formData.values.car) && <div className={'tablet:col-start-7 tablet:col-end-10 tablet:row-start-2 self-center'}>Выберите<br/> <span className={'text-accent'}>Пользователя</span> или <span className={'text-accent'}>Автомобиль</span></div>}
                        <Group grow wrap={'wrap'} className={'col-span-6'}>
                            <Select
                                {...formData.getInputProps('conductor')}
                                label={'Пользователь'}
                                searchable
                                clearable
                                className={'self-start'}
                                // onOptionSubmit={(value) => {
                                //     formData.values.car = null
                                //     formData.values.phone = null
                                //     store.bidsStore.formResultSet({ conductor: Number(value) })
                                // }}
                                disabled={!conductors || conductors.results.length === 0 || formData.values.car !== null}
                                data={
                                    conductors
                                        ? conductors?.results?.map((c: any) => ({
                                              label: c.employee.first_name + ' ' + c.employee.last_name,
                                              value: String(c.employee.id),
                                          }))
                                        : null
                                }
                            />

                            <Select
                                {...formData.getInputProps('car')}
                                className={'self-start'}
                                clearable
                                disabled={!cars || cars.results.length === 0 || formData.values.conductor !== null}
                                // onOptionSubmit={(value) => store.bidsStore.formResultSet({ car: Number(value) })}
                                //@ts-ignore
                                label={'Автомобиль, марка'}
                                searchable
                                data={cars?.results.map((c: any) => ({
                                    label: `${c.brand.name}  ${c.model.name}  ${c.number}`,
                                    value: String(c.id),
                                }))}
                            />
                        </Group>
                        <Group grow className={'col-span-6'}>
                            <Radio.Group
                                name='limitType'
                                label='Выберите тип лимита'
                                {...formData.getInputProps('is_day')}
                            >
                                <Group mt='xs'>
                                    <Radio value='true' label='Дневной' />
                                    <Radio checked value='false' label='Месячный' />
                                </Group>
                            </Radio.Group>
                        </Group>
                        <Group grow className={'col-span-6'}>
                            <Select
                                {...formData.getInputProps('service_type')}
                                className={'self-start'}
                                clearable
                                comboboxProps={{ withinPortal: true }}
                                // onOptionSubmit={(value) => store.bidsStore.formResultSet({ car: Number(value) })}
                                //@ts-ignore
                                label={'Услуга'}
                                searchable
                                data={
                                    values(store.catalogStore.services) &&
                                    values(store.catalogStore.services).length !== 0
                                        ? values(store.catalogStore.services).map((c: any) => ({
                                              label: c.name,
                                              value: String(c.id),
                                          }))
                                        : ['']
                                }
                            />
                            <NumberInput
                                label='Лимит, усл.единица'
                                {...formData.getInputProps('amount')}
                                min={1}
                                hideControls
                                allowDecimal={false}
                                allowNegative={false}
                                max={100}
                            />
                        </Group>
                        {memoModal}
                    </PanelForForms>
                </form>
            </PanelForForms>
        </FormProvider>
    )
}

export default observer(FormCreateUpdateLimits)
