import React, { useState } from 'react'
import 'yup-phone-lite'
import { useStore } from 'stores/store'
import { useNavigate, useRevalidator } from "react-router-dom";
import Button, { ButtonSizeType, ButtonVariant } from 'components/common/ui/Button/Button'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import { Step } from 'components/common/layout/Step/StepPure'
import Progress from 'components/common/ui/Progress/Progress'
import { TimeInput } from '@mantine/dates'
import { observer, Observer } from "mobx-react-lite";
import { Checkbox, CloseIcon, FileButton, Group, Image, InputBase, InputLabel, Select, Textarea } from '@mantine/core'
import { action, values as val } from 'mobx'
import { IMask, IMaskInput } from "react-imask";
import Panel, { PanelColor, PanelVariant } from 'components/common/layout/Panel/Panel'
import { yupResolver } from "mantine-form-yup-resolver";
import { CreateBidSchema} from "utils/validationSchemas";
import PanelForForms from 'components/common/layout/Panel/PanelForForms';
import { createFormActions, createFormContext } from "@mantine/form";
import SelectMantine from "components/common/ui/SelectMantine/SelectMantine";
import { notifications } from "@mantine/notifications";
import { SvgClose } from "components/common/ui/Icon";
import MapWithDots from "components/common/Map/Map";
import DList from "components/common/ui/DList/DList";
import InputAutocompleteWithCity from "components/common/ui/InputAutocomplete/InputAutocompleteWithCityDependency";
import moment, { MomentInput } from "moment/moment";

interface InitValues {
  address: string;
  company: string;
  conductor: string;
  car: string;
  important: string;
  secretKey: string;
  address_from?: string
  address_to?: string
  lat_from?: number,
  lon_from?: number,
  lat_to?: number,
  lon_to?: number,
  phone: string;
  customer_comment: string;
  service_type: string;
  parking: string;
  service_option: any[];
  service_subtype: string;
  city: string;
  time: string;
  performer: string;
}
export const InitValues:InitValues = {
  address: '',
  company: '0',
  conductor: '0',
  lat_from: 0,
  lon_from: 0,
  lat_to: 0,
  lon_to: 0,
  address_from: '',
  address_to: '',
  car: '0',
  important: 'time',
  secretKey: 'false',
  phone: '',
  customer_comment: '',
  service_type: '0',
  parking: 'true',
  service_option: [],
  service_subtype: '0',
  city: '0',
  time: '',
  performer: '0',
}

export const [FormProvider, useFormContext, useForm] = createFormContext<any>()
export const createBidFormActions = createFormActions<InitValues>('createBidForm')

const FormCreateUpdateBid = ({ bid, edit }: any) => {
    const store = useStore()
    const momentFormat = 'HH:mm'
    const [step, setStep] = useState(1)
    const [animate, setAnimate] = useState(false)
    let revalidate = useRevalidator()
    const navigate = useNavigate()
    const { step1, step2 ,step3, step4, step5} = store.bidsStore.formDataAll
    if(store.appStore.appType === "customer") {

    }
    const changeStep = (step?: number) => {
        setAnimate((prevState) => !prevState)
        setTimeout(() => {
            setAnimate(false)
            setStep((prevState) => (step ? step : prevState + 1))
        }, 1200)
    }

    const memoFileUpload = React.useMemo(() => {
      return <Observer
        children={() => (<div className={'grid grid-cols-3  gap-4 col-span-full'}>
          <InputLabel className={'col-span-2'}>Фотографии До</InputLabel>

          <div className={'flex col-span-2  gap-3 items-center justify-items-center'}>
            {store.bidsStore.photo.photosPreviewAr.map(
              (item: any, index: number) => (
                <div className={'group max-w-[6rem] relative'}>
                  <CloseIcon
                    onClick={() => store.bidsStore.removeFile(index)}
                    className={
                      'bg-white cursor-pointer group-hover:text-white group-hover:bg-accent  border-1 text-gray-2 absolute right-0 top-0 block rounded-full !w-4 !h-4'
                    }
                  />
                  <Image src={item} alt={String(index)} />
                </div>
              ),
            )}
          </div>
          <p className={'col-span-2'}>Пожалуйста, прикрепите минимум 2 фото</p>
          <FileButton onChange={handleChangeFile} multiple accept='image/png,image/jpeg'>
            {(props) => (
              <Button
                className={'col-span-1'}
                variant={ButtonVariant['accent-outline']}
                size={ButtonSizeType.sm}
                {...props}
                text={'Добавить фото'}
              ></Button>
            )}
          </FileButton>
        </div>)}   />
    }, [])
    const handleChangeFile = React.useCallback((e: any) => {
        store.bidsStore.addFile(e)
    }, [])
  const initData = React.useMemo(() => {
    let initValues = InitValues
    if(!edit) {
      console.log('Очистить форму');
      store.bidsStore.formResultsClear()
    }
    if (edit) {
      initValues = {
        ...InitValues
        // id: user.employee.id,
        // company_id: user.company === undefined ? 1: user.company.id.toString(),
        // company_name: user.company === undefined ? "Администратор системы" : user.company.name,
        // depend_on: user.company?.parent === null ? 'company' : 'filials',
        // first_name: user.employee.first_name,
        // last_name: user.employee.last_name,
        // phone: user.employee.phone,
        // email: user.employee.email,
        // type: user.company === undefined ? "admin" : user.company.company_type,
        // group: String(user.group.id),
        // is_active: user.employee.is_active ? "true" : "false",
      }
    }
    if(store.appStore.appType === "customer") {
      initValues.company = String(store.userStore.myProfileData.company.id);
      initValues.city = String(store.userStore.myProfileData.company.city.id);
    }
    return initValues

  }, [edit, bid])

  const formData = useForm({
    name: 'createBidForm',
    initialValues: initData,
    validateInputOnBlur: true,
    // onValuesChange: (values, previous) => console.log(values),
    validate: yupResolver(CreateBidSchema),
    enhanceGetInputProps: (payload) => {
        if (payload.field === 'city') {
          if(store.appStore.appType === "customer") {
            return {
              className: 'hidden',
            }
          }
        }
        if (payload.field === 'time') {
          return ({
            disabled: formData.values.important === 'fast'
          })
        }
        if (payload.field === 'company') {
          if(formData.values.company === '0' || formData.values.company === null) {
            formData.values.city = null
            formData.values.conductor = null
            formData.values.car = null
            formData.values.phone = null
          }

          if(store.appStore.appType === "customer") {
            return {
              className: 'hidden',
            }
          }
        }

        if (payload.field === "car") {
          return ({
            //@ts-ignore
            disabled: store.carStore.getCompanyCars.cars?.count === 0 || payload.form.values.conductor === "0" || carsData === null
          })
        }
        if(payload.field === "conductor") {

        }
        if(payload.field === "conductor") {
          if(formData.values.conductor !== "0" && formData.values.conductor !== null && formData.values.company !== null && formData.values.company !== "0") {
            const car = store.carStore.cars.results.filter((c: any) => c.employees.filter((e:any) =>  e.id === Number(formData.values.conductor))[0])
            if(car.length === 1) {
              formData.values.car = String(car[0].id)
             if(store.bidsStore.formResult.car === 0) {
               store.bidsStore.formResultSet({ car: car[0].id })
             }
            }

          }
        }
        if(payload.field !== "company") return ({
          disabled: formData.values.company === '0' || formData.values.company === null
        })


    },
  });

  React.useEffect(() => {
    if(formData.values.company !== '0') {
      store.bidsStore.formResultSet({ company: Number(formData.values.company) })
    }
  }, [formData.values.company])

   const carsData = React.useMemo(() => {
     //@ts-ignore
     const car = store.carStore.getCompanyCars.cars.results?.filter((car) => car.employees.filter((e:any) => e.id === Number(formData.values.conductor))?.length !== 0)

     if(car?.length > 0) {
        return car
     }
     return null
    }, [formData.values.conductor])

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
  },[])

  React.useEffect(() => {
    if(formData.values.company === null) {
      // setValues(initialValues, true)
      formData.setFieldValue('city', null)
      formData.setFieldValue('conductor', null)
      formData.setFieldValue('car', null)
      // formikReset.resetForm()
      store.bidsStore.formResultsClear()

    } else  {

        formData.setFieldValue('city', String(store.bidsStore.formResultsAll.city))


      formData.values.phone = String(store.bidsStore.formResultsAll.phone);
      // formData.values.car = String(store.bidsStore.formResultsAll.car);
      formData.values.conductor = String(store.bidsStore.formResultsAll.conductor);
    }
  }, [store.bidsStore.formResultsAll.company, formData.values.company, store.bidsStore.formResultsAll.city])

  React.useEffect(() => {
    if(formData.values.conductor === null) {
      formData.setFieldValue('conductor', null)
      formData.setFieldValue('car', null)
      formData.setFieldValue('phone', null)
      // formikReset.resetForm()
    } else  {

      const value = store.usersStore.companyUsers.filter((c: any) => c.employee.id === Number(formData.values.conductor))[0]
      //@ts-ignore
      formData.setFieldValue('phone', value && value.employee && value.employee?.phone)
      //@ts-ignore
      store.bidsStore.formResultSet({ phone: value && value.employee && value.employee?.phone })
      // formData.values.car = String(store.bidsStore.formResultsAll.car);
      // formData.values.conductor = String(store.bidsStore.formResultsAll.conductor);
    }
  }, [formData.values.conductor])

  const handleBack = React.useCallback(() => {
    if(step === 4) {
      if (formData.values.service_type === '1') {
        changeStep(2)
      } else {
        setStep((prevState: number) => prevState - 1)
      }
    } else {
      setStep((prevState: number) => prevState - 1)
    }
  }, [])
  const handleNext = React.useCallback(() => {
    if(step === 2) {
      if (formData.values.service_type === '1') {
        changeStep(4)
      } else {
        changeStep()
      }
    } else if(step === 4) {
        (async () => {
          store.bidsStore.formCreateBid().then((res) => {
            if (res.status !== 201) {
              notifications.show({
                id: 'bid-created',
                withCloseButton: true,
                onClose: () => console.log('unmounted'),
                onOpen: () => console.log('mounted'),
                autoClose: 3000,
                title: "You've been compromised",
                message: 'Leave the building immediately',
                color: 'red',
                icon: <SvgClose />,
                className:
                  'my-notification-class z-[9999] absolute top-12 right-12',
                style: { backgroundColor: 'red' },
                loading: false,
              })
            } else {
              notifications.show({
                id: 'bid-created',
                withCloseButton: true,
                onClose: () => console.log('unmounted'),
                onOpen: () => console.log('mounted'),
                autoClose: 3000,
                title: 'Заявка создана',
                message: 'Успешное создание',
                // color: 'red',
                className: 'my-notification-class z-[9999]',
                // style: { backgroundColor: 'red' },
                loading: false,
              })
              changeStep()
            }
          })
        })()
    } else {
    changeStep()
  }
  }, [formData.values.service_type, step])
    return (
      <FormProvider form={formData}>
        <PanelForForms
          footerClassName={'px-8 pb-8 pt-2'}
          variant={PanelVariant.default}
          actionBack={step !== 1 ? (
            <Button
            text={'Назад'}
          action={handleBack}
          className={'lg:mb-0 mr-auto'}
          variant={ButtonVariant['accent-outline']}
        />) : null
          }
          actionCancel={
         <Button type={'button'}
            text={'Отменить'}
            action={(e) => {
              e.preventDefault()
              navigate(-1)
            }}
            className={'float-right'}
            variant={ButtonVariant['accent-outline']} />

        }
          actionNext={
            <Button type={'button'}
              action={handleNext}
              disabled={!formData.isValid()}
              text={'Сохранить'}
              className={'float-right'}
              variant={ButtonVariant.accent} />
          }>
          <form onSubmit={formData.onSubmit((props) => console.log('form', props))}
            onReset={formData.onReset}
            style={{ display: 'contents' }}>
            <Progress total={formData.values.service_type === "1" ? 4 : 5} current={step} />
            <PanelForForms
              state={step !== 1}
              animate={animate}
              className={'!bg-transparent'}
              bodyClassName={'grid !grid-cols-3 gap-4'}
              variant={PanelVariant.textPadding}
              background={PanelColor.default}
              header={<><Heading text={step1.title} color={HeadingColor.accent} variant={HeadingVariant.h2} /><div className={'text-base'}>{step1.description}</div></>}
            >
              <Select
                {...formData.getInputProps('company')}
                clearable
                label={step1.fields[1].label}
                onLoad={handleChangeCompany}
                onOptionSubmit={handleChangeCompany}
                searchable
                data={store.companyStore.companies.filter((c: any) => c.company_type === 'Компания-Заказчик').map((c: any) => ({ label: c.name, value: String(c.id), }))}
              />
              <Select
                withAsterisk
                {...formData.getInputProps('city')}
                clearable
                label={step1.fields[0].label}
                searchable
                value={formData.values.city}
                data={val(store.catalogStore.cities).map((i: any) => ({
                  label: i.name,
                  value: String(i.id),
                }))}
              />

              {store.appStore.appType === "admin" && <hr className={'col-span-full border-transparent my-2'} />}
              {/* //todo: map not admin values to select */}



              <Select
                {...formData.getInputProps('conductor')}
                label={step1.fields[2].label}
                searchable
                onOptionSubmit={(value) => {
                  formData.values.car = null
                  formData.values.phone = null
                  store.bidsStore.formResultSet({ conductor: Number(value) })
                }}
                disabled={
                  store.bidsStore.formResult.company === 0 ||
                  store.usersStore.currentCompanyUsers.length === 0
                }
                data={store.usersStore.currentCompanyUsers.map((c: any) => ({
                  label: c.employee.first_name + " " + c.employee.last_name,
                  value: String(c.employee.id),
                }))}
              />

              <InputBase
                {...formData.getInputProps('phone')}
                onAccept={(value:any, mask:any) => {

                  formData.setFieldValue('phone', value)
                  store.bidsStore.formResultSet({ phone: value })
                }}
                //@ts-ignore
                // defaultValue={formData.values.phone !== "" ? formData.values.phone : store.bidsStore.formResult.phone}
                label={step1.fields[3].label} component={IMaskInput} mask='+7 000 000 0000' placeholder='+7 000 000 0000'
              />
              <Select
                {...formData.getInputProps('car')}
                clearable
                onOptionSubmit={(value) => store.bidsStore.formResultSet({ car: Number(value) })}
                //@ts-ignore
                label={step1.fields[4].label} searchable data={store.carStore.cars && store.carStore.cars.length !== 0 && carsData !== null ? carsData.map((c: any) => ({ label: `${c.brand.name}  ${c.model.name}  ${c.number}`, value: String(c.id), })) : ['']}
              />
              <hr className={'col-span-full border-transparent my-2'} />
              {memoFileUpload}
            </PanelForForms>

            <PanelForForms
              state={step !== 2}
              animate={animate}
              className={'!bg-transparent'}
              bodyClassName={'grid !grid-cols-3 gap-4'}
              variant={PanelVariant.textPadding}
              background={PanelColor.default}
              header={<><Heading text={step2.title} color={HeadingColor.accent} variant={HeadingVariant.h2} /><div className={'text-base'}>{step2.description}</div></>}
            >
                    <Select
                      {...formData.getInputProps(step2.fields[0].name)}
                      label={step2.fields[0].label}
                      disabled={store.catalogStore.services.size === 0}
                      onOptionSubmit={(value) => {
                        formData.setFieldValue('service_subtype', null);
                        formData.resetTouched();
                        if (value === null) {
                          formData.setFieldValue(step2.fields[1].name, '0')
                          formData.setFieldValue(step2.fields[0].name, '0')
                        } else {
                          action(() => {
                            store.catalogStore.currentService = Number(value)
                            store.catalogStore.currentServiceSubtypesOptions = new Map([])
                          })
                          store.bidsStore.formResultSet({ service_type: Number(value) })
                        }
                      }}
                      data={val(store.catalogStore.services).map((i: any) => ({
                        label: i.name,
                        value: String(i.id),
                      }))}
                    />

                      <Select
                        {...formData.getInputProps(step2.fields[1].name)}
                        label={step2.fields[1].label}
                        disabled={store.bidsStore.formResult.service_type === 0}
                        // onChange={(value) => {
                        //
                        // }}
                        onOptionSubmit={(value) => {
                          if (value === null) {
                            store.bidsStore.formResultSet({ service_subtype: 0 })
                            formData.setFieldValue(step2.fields[1].name, '0')
                            formData.resetTouched()
                          } else {
                            formData.setFieldValue('service_subtype', value)
                            store.bidsStore.formResultSet({
                              service_subtype: Number(value),
                            })
                          }
                        }}
                        data={
                          store.catalogStore.currentService !== 0
                            ? val(store.catalogStore.currentServiceSubtypes).map(
                              (i: any) => ({
                                label: i.name,
                                value: String(i.id),
                              }),
                            )
                            : ['']
                        }
                      />
                {formData.values.service_subtype &&
                  formData.values.service_subtype !== '0' &&
                  formData.values.service_subtype &&
                  formData.values.service_subtype !== '0' && (
                <Checkbox.Group
                          className={'col-span-2'}
                          classNames={{
                            label: 'text-accent label mb-4',
                          }}
                          value={store.bidsStore.formResult.service_option.map((o: number) =>
                            String(o),
                          )}
                          onChange={(vals) => {
                            store.bidsStore.formResultSet({
                              service_option: vals.map((e) => Number(e)),
                            })
                            // @ts-ignore
                            formData.values.service_option = val(
                              store.bidsStore.formResultsAll.service_option,
                            )
                          }}
                          label='Выберите дополнительные опции (при необходимости)'
                        >
                          <Group mt='xs'>
                            {store.catalogStore.ServiceSubtypesOptions.length !== 0 &&
                              val(store.catalogStore.ServiceSubtypesOptions).map(
                                (i: any) => (
                                  <Checkbox
                                    value={String(i.id)}
                                    onClick={(values: any) =>
                                      console.log(values.target.checked)
                                    }
                                    label={i.name}
                                  />
                                ),
                              )}
                          </Group>
                        </Checkbox.Group>
                      )}
                <Textarea
                  className={'col-span-2  pt-4'}
                  minRows={3}
                  {...formData.getInputProps('customer_comment')}
                  onInput={(values: any) => {
                    store.bidsStore.formResultSet({ customer_comment: values.currentTarget.value })
                    formData.setFieldValue('customer_comment', values.currentTarget.value)
                  }}
                  defaultValue={store.bidsStore.formResult.customer_comment ?? ''}
                  label={'Комментарий'}
                  placeholder={'Дополнительная информация, которая может помочь в выполнении заявки'}
                />
                <Heading
                  variant={HeadingVariant.h4}
                  text={'Факт/лимит 35/100'}
                  color={HeadingColor.accent}
                  className={'col-span-2 mt-6'}
                />

            </PanelForForms>
            {formData.values.service_type === "3" ? (
              <PanelForForms
                state={step !== 3}
                animate={animate}
                className={'!bg-transparent'}
                bodyClassName={'grid !grid-cols-3 gap-4'}
                variant={PanelVariant.textPadding}
                background={PanelColor.default}
                header={<><Heading text={step3.title} color={HeadingColor.accent} variant={HeadingVariant.h2} /><div className={'text-base'}>{step3.description}</div></>}
              >

                  <InputAutocompleteWithCity
                    label={'Откуда вас забрать?'}
                    {...formData.getInputProps('address_from')}
                    action={(val: any) => {
                      formData.setFieldValue('address_from', val)
                      store.bidsStore.formResultSet({ address_from: val })
                    }}
                    city={
                      store.bidsStore.formResult.city !== 0
                        ? store.catalogStore.cities.get(
                          store.bidsStore.formResult.city.toString(),
                        ).name
                        : ''
                    }
                  />
                  <hr className={'col-span-full border-transparent my-2'} />
                  <InputAutocompleteWithCity
                    {...formData.getInputProps('address_to')}
                    label={'Куда привезти?'}
                    action={(val: any) => {
                      formData.setFieldValue('address_to', val)
                      store.bidsStore.formResultSet({ address_to: val })
                    }}
                    city={
                      store.bidsStore.formResult.city !== 0
                        ? store.catalogStore.cities.get(
                          store.bidsStore.formResult.city.toString(),
                        ).name
                        : ''
                    }
                  />
                  <hr className={'col-span-full border-transparent my-2'} />
                  <Select
                    {...formData.getInputProps('tire_destroyed')}
                    onOptionSubmit={(values) => store.bidsStore.formResultSet({ tire_destroyed: values })}
                    label={'Сколько колес вышло из строя?'}
                    data={[
                      { label: '1', value: '1' },
                      { label: '2', value: '2' },
                      { label: '3', value: '3' },
                      { label: '4', value: '4' },
                    ]}
                  />
                  <Select
                    {...formData.getInputProps('truck_type')}
                    onOptionSubmit={(values) => store.bidsStore.formResultSet({ truck_type: values })}
                    label={'Тип эвакуатора?'}
                    data={[
                      { label: 'эвакуатор', value: 'эвакуатор' },
                      { label: 'манипулятор ', value: 'манипулятор' }
                    ]}
                  />
                  <hr className={'col-span-full border-transparent my-2'} />
                <Select
                  {...formData.getInputProps('important')}
                  onOptionSubmit={(values) => {
                    formData.setFieldValue('time', '')
                    store.bidsStore.formResultSet({
                      important: {
                        label: step3?.fields[3]?.options?.filter(
                          (item) => item.value == values,
                        )[0].label,
                        value: values,
                      },
                    })
                  }}
                  // value={store.bidsStore.formResult.important}
                  label={step3.fields[3].label}
                  data={step3.fields[3].options}
                />

                <InputBase
                  component={IMaskInput}

                  label={step3.fields[4].label}
                  {...formData.getInputProps('time')}
                  mask={Date}
                  classNames={{
                    section: 'mr-1 text-sm',
                    // input: 'pl-7',
                  }}
                  onInput={(values) =>
                    store.bidsStore.formResultSet({
                      time: { label: step3.fields[4].label, value: values.currentTarget.value },
                    })
                  }
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
              </PanelForForms>
            ) : (
              <PanelForForms
                state={step !== 3}
                animate={animate}
                className={'!bg-transparent'}
                bodyClassName={'grid !grid-cols-3 gap-4'}
                variant={PanelVariant.textPadding}
                background={PanelColor.default}
                header={
                  <>
                    <Heading
                      text={step3.title}
                      color={HeadingColor.accent}
                      variant={HeadingVariant.h2}
                    />
                    <div className={'text-base'}>{step3.description}</div>
                  </>
                }

              >
                <>
                  {formData.values.service_subtype === "6" && <><InputAutocompleteWithCity
                    action={(val: any) => {
                      store.bidsStore.formResultSet({ address: val })
                    }}
                    city={
                      store.bidsStore.formResult.city !== 0
                        ? store.catalogStore.cities.get(
                          store.bidsStore.formResult.city.toString(),
                        ).name
                        : ''
                    }
                  />
                  <hr className={'col-span-full border-transparent my-2'} /></>}
                  {/* <Select */}
                  {/*   {...formData.getInputProps('parking')} */}
                  {/*   onChange={(values) => */}
                  {/*     store.bidsStore.formResultSet({ */}
                  {/*       parking: { */}
                  {/*         label: step3?.fields[1]?.options?.filter( */}
                  {/*           (item) => item.value == values, */}
                  {/*         )[0].label, */}
                  {/*         value: values, */}
                  {/*       }, */}
                  {/*     }) */}
                  {/*   } */}
                  {/*   label={step3.fields[1].label} */}
                  {/*   data={step3.fields[1].options} */}
                  {/* /> */}
                  <Select
                    {...formData.getInputProps('secretKey')}
                    onOptionSubmit={(values) => {
                      store.bidsStore.formResultSet({
                        secretKey: {
                          label: step3?.fields[2]?.options?.filter(
                            (item) => item.value == values,
                          )[0].label,
                          value: values,
                        },
                      })
                    }}
                    label={step3.fields[2].label}
                    data={step3.fields[2].options}
                  />
                  <hr className={'col-span-full border-transparent my-2'} />
                  <Select
                    {...formData.getInputProps('important')}
                    onOptionSubmit={(values) => {
                      formData.setFieldValue('time', '')
                      store.bidsStore.formResultSet({
                        important: {
                          label: step3?.fields[3]?.options?.filter(
                            (item) => item.value == values,
                          )[0].label,
                          value: values,
                        },
                      })
                    }}
                    // value={store.bidsStore.formResult.important}
                    label={step3.fields[3].label}
                    data={step3.fields[3].options}
                  />
                  <InputBase
                    component={IMaskInput}

                    label={step3.fields[4].label}
                    {...formData.getInputProps('time')}
                    mask={Date}
                    classNames={{
                      section: 'mr-1 text-sm',
                      // input: 'pl-7',
                    }}
                    onInput={(values) =>
                      store.bidsStore.formResultSet({
                        time: { label: step3.fields[4].label, value: values.currentTarget.value },
                      })
                    }
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
                  {/* <TimeInput */}
                  {/*   {...formData.getInputProps('time')} */}
                  {/*   onTouchEnd={(values) => */}
                  {/*     store.bidsStore.formResultSet({ */}
                  {/*       time: { label: step3.fields[4].label, value: values.currentTarget.value }, */}
                  {/*     }) */}
                  {/*   } */}
                  {/*   classNames={{ */}
                  {/*     section: 'mr-1 text-sm', */}
                  {/*     input: 'pl-7', */}
                  {/*   }} */}
                  {/*   leftSection={<span>C</span>} */}
                  {/*   label={step3.fields[4].label} */}
                  {/* /> */}
                </>
              </PanelForForms>
            )}
            <PanelForForms
              state={step !== 4}
              animate={animate}
              className={'!bg-transparent'}
              variant={PanelVariant.textPadding}
              background={PanelColor.default}
              bodyClassName={'grid !grid-cols-4 grid-rows-[auto_1fr] gap-y-8  gap-x-12 content-start'}
              footerClassName={'flex-1 w-full justify-stretch'}
              header={
                <>
                  <Heading
                    text={step4.title}
                    color={HeadingColor.accent}
                    variant={HeadingVariant.h2}
                  />
                  <div className={'text-base'}>{step4.description}</div>
                </>
              }
            >
                    <Select
                      className={'col-span-2'}
                      required
                      label={step4.fields[0].label}
                      searchable
                      value={String(store.bidsStore.formResult.city)}
                      data={val(store.catalogStore.cities).map((i: any) => ({
                        label: i.name,
                        value: String(i.id),
                      }))}
                    />
                    <Select
                      className={'col-span-2'}
                      required
                      label={step4.fields[1].label}
                      searchable
                      value={String(store.bidsStore.formResult.performer)}
                      onChange={(val: any) =>
                        store.bidsStore.formResultSet({ performer: Number(val) })
                      }
                      data={val(store.bidsStore.currentPerformers).map((i: any) => ({
                        label: i.name,
                        value: String(i.id),
                      }))}
                    />
                <MapWithDots />

            </PanelForForms>
            <PanelForForms
              state={step !== 5}
              animate={animate}
              className={'!bg-transparent'}
              bodyClassName={'grid !grid-cols-3 gap-4'}
              variant={PanelVariant.textPadding}
              background={PanelColor.default}
              header={
                <>
                  <Heading
                    text={step5.title}
                    color={HeadingColor.accent}
                    variant={HeadingVariant.h2}
                  />
                  <div className={'text-base'}>{step5.description}</div>
                </>
              }

            >
              {store.bidsStore.currentBid.id && (
                <Panel
                  className={' !border-active !border-1'}
                  bodyClassName={'grid grid-cols-2  gap-y-5  gap-x-12 content-start !py-8'}
                  variant={PanelVariant.withPaddingSmWithBody}
                  background={PanelColor.glass}
                >
                  <DList
                    className={'child:dt:text-accent'}
                    label={'Услуга'}
                    title={
                      <Heading
                        variant={HeadingVariant.h2}
                        text={store.bidsStore.currentBid.service_type.name}
                        color={HeadingColor.active}
                      />
                    }
                  />
                  <DList
                    className={'child:dt:text-accent'}
                    label={'Тип услуги'}
                    title={
                      <Heading
                        variant={HeadingVariant.h4}
                        text={store.bidsStore.currentBid.service_subtype.name}
                      />
                    }
                  />
                  {/* //todo: address */}
                  <DList
                    className={'child:dt:text-accent'}
                    label={'Адрес выезда'}
                    title={store.bidsStore.formResultsAll.address}
                  />
                  <DList
                    className={'child:dt:text-accent'}
                    label={'Важность'}
                    title={store.bidsStore.formResultsAll.important.label}
                  />
                  <DList
                    className={'child:dt:text-accent'}
                    label={'Время'}
                    title={store.bidsStore.formResultsAll.time.value}
                  />
                  <DList
                    className={'child:dt:text-accent'}
                    label={'Дополнительные данные'}
                    title={
                      <>
                        <ul>
                          <li>{store.bidsStore.formResultsAll.secretKey.label}</li>
                          <li>{store.bidsStore.formResultsAll.parking.label}</li>
                        </ul>
                      </>
                    }
                  />
                  <DList
                    className={'child:dt:text-accent'}
                    label={'Дополнительные опции'}
                    title={
                      <>
                        <ul>
                          {store.bidsStore.currentBid.service_option.map((i: any) => (
                            <li key={i.id}>{i.name}</li>
                          ))}
                        </ul>
                      </>
                    }
                  />
                </Panel>
              )}
            </PanelForForms>

          </form>
        </PanelForForms>
      </FormProvider>
  )
}

export default observer(FormCreateUpdateBid)
