import React, { useEffect, useState } from "react";
import { yupResolver } from 'mantine-form-yup-resolver'
import { CreateCompanySchema, CreateLimitSchema } from "utils/validationSchemas";
import { Group, InputBase, NumberInput, Radio, Select, TextInput } from '@mantine/core'
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
import TransferList  from 'components/common/ui/TransferList/TransferList'
import LinkStyled from "components/common/ui/LinkStyled/LinkStyled";
import { CreateField } from "components/Form/FormCreateCompany/Steps/StepSuccess";
import company from "routes/company/company";
import { useSWRConfig } from "swr";
import { useScrollIntoView, useViewportSize } from "@mantine/hooks";
import data from "utils/getData";
import TransferListNew from "components/common/ui/TransferList/TransferListNew";
import agent from "utils/agent";

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
export const createCompanyFormActions = createFormActions<InitValues>('createCompanyForm')

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
    const [animate, setAnimate] = useState(false)

    const changeStep = (step?: number) => {
        setAnimate((prevState) => !prevState)
        setTimeout(() => {
            setAnimate(false)
            store.companyStore.loadingCompanies = false
            setStep(step ? step : 2)
        }, 1200)
        width < 940 ? scrollIntoView() : null
    }
    console.log(String(company.employee.id), 'company');
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
    console.log(initValues, 'initValues');
    const formData = useForm({
            name: 'createLimitForm',
            initialValues: initValues,
            validateInputOnBlur: true,
            // onValuesChange: (values, previous) => console.log(values),
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

        if(car?.length > 0) {
            return car
        }
        return null
    }, [formData.values.conductor])

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

    const handleChangeCompany = React.useCallback((e:any) => {
        if(e === null) {
            formData.values.company = '0'
            store.bidsStore.formResultSet({company: 0})

        }
        if(e !== "0") {
            formData.setFieldValue('company', e);
            store.bidsStore.formResultSet({ company: Number(e) })
        } else {
            store.bidsStore.formResultSet({ company: 0 })
        }
    },[formData.values.company])

    const navigate = useNavigate()

    const handleSubmit = React.useCallback(async (values: any) => {
        await agent.Limits.createLimit({
            company_id: Number(values.company),
            data: {
                amount: values.amount ? Number(values.amount) : undefined,
                is_day: values.is_day === 'true',
                service_type: Number(values.service_type),
                employee: values.conductor ?  Number(values.conductor)  : undefined,
                car: values.car ? Number(values.car) : undefined,
                company: Number(values.company),
            },
        }).then(r => console.log('r', r)).finally(() => mutate(`limits`).then(r => console.log(`/account/limits`, r)))

    }, [])
    // @ts-ignore
    return (
        <FormProvider form={formData}>
            <PanelForForms
              ref={targetRef}
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
                        <Group grow  className={'col-span-6'}>
                            <Select
                              {...formData.getInputProps('company')}
                              clearable
                              comboboxProps={{ withinPortal: true }}
                              label={'Компания'}
                              onLoad={handleChangeCompany}
                              onOptionSubmit={handleChangeCompany}
                              searchable
                              data={store.companyStore.companies.filter((c: any) => c.company_type === 'Компания-Заказчик').filter((c: any) => c.parent === null).map((c: any) => ({ label: c.name, value: String(c.id), }))}
                            />
                            <Select
                              {...formData.getInputProps('filiial')}
                              clearable
                              label={'Филиал'}
                              comboboxProps={{ withinPortal: true }}
                              onLoad={handleChangeCompany}
                              onOptionSubmit={handleChangeCompany}
                              searchable
                              data={store.companyStore.companies.filter((c: any) => c.company_type === 'Компания-Заказчик').filter((c: any) => c.parent !== null).map((c: any) => ({ label: c.name, value: String(c.id), }))}
                            />
                        </Group>


                        <Group grow  className={'col-span-6'}>
                            <Select
                              {...formData.getInputProps('conductor')}
                              label={'Пользователь'}
                              searchable
                              className={'self-start'}
                              onOptionSubmit={(value) => {
                                  formData.values.car = null
                                  formData.values.phone = null
                                  store.bidsStore.formResultSet({ conductor: Number(value) })
                              }}
                              disabled={
                                store.bidsStore.formResult.company === 0 ||
                                store.usersStore.currentCompanyUsers.length === 0
                              }
                              data={conductorsData}
                            />

                            <Select
                              {...formData.getInputProps('car')}
                              className={'self-start'}
                              clearable
                              onOptionSubmit={(value) => store.bidsStore.formResultSet({ car: Number(value) })}
                              //@ts-ignore
                              label={'Автомобиль, марка'} searchable data={store.carStore.cars && store.carStore.cars.length !== 0 && carsData !== null ? carsData.map((c: any) => ({ label: `${c.brand.name}  ${c.model.name}  ${c.number}`, value: String(c.id), })) : ['']}
                            />
                        </Group>
                        <Group grow  className={'col-span-6'}>
                            <Radio.Group
                              name="limitType"
                              label="Выберите тип лимита"
                              {...formData.getInputProps('is_day')}
                            >
                                <Group mt="xs">
                                    <Radio value="true" label="Дневной" />
                                    <Radio checked value="false" label="Месячный" />
                                </Group>
                            </Radio.Group>
                        </Group>
                        <Group grow  className={'col-span-6'}>
                            <Select
                              {...formData.getInputProps('service_type')}
                              className={'self-start'}
                              clearable
                              comboboxProps={{ withinPortal: true }}
                              // onOptionSubmit={(value) => store.bidsStore.formResultSet({ car: Number(value) })}
                              //@ts-ignore
                              label={'Услуга'} searchable data={values(store.catalogStore.services) && values(store.catalogStore.services).length !== 0 ? values(store.catalogStore.services).map((c: any) => ({ label: c.name, value: String(c.id), })) : ['']}
                            />
                            <NumberInput
                              label="Лимит, усл.единица"
                              {...formData.getInputProps('amount')}
                              min={1}
                              hideControls
                              allowDecimal={false}
                              allowNegative={false}
                              max={100}
                            />
                        </Group>

                    </PanelForForms>

                </form>
            </PanelForForms>
        </FormProvider>
    )
}

export default observer(FormCreateUpdateLimits)
