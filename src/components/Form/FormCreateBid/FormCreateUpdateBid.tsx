import React, { useState } from 'react'
import 'yup-phone-lite'
import { useStore } from 'stores/store'
import { useNavigate, useRevalidator } from 'react-router-dom'
import Button, { ButtonSizeType, ButtonVariant } from 'components/common/ui/Button/Button'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import Progress from 'components/common/ui/Progress/Progress'
import { observer, Observer } from 'mobx-react-lite'
import { Checkbox, CloseIcon, FileButton, Group, Image, InputBase, InputLabel, LoadingOverlay, Select, Textarea } from "@mantine/core";
import { action, values as val } from 'mobx'
import { IMask, IMaskInput } from 'react-imask'
import { PanelColor, PanelVariant } from 'components/common/layout/Panel/Panel'
import { yupResolver } from 'mantine-form-yup-resolver'
import { CreateBidSchema, CreateBidSchemaStep2, CreateBidSchemaStep3, CreateBidSchemaStep4 } from "utils/validationSchemas";
import PanelForForms from 'components/common/layout/Panel/PanelForForms'
import { createFormActions, createFormContext } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import { SvgClose } from 'components/common/ui/Icon'
import MapWithDots from 'components/common/Map/Map'
import InputAutocompleteWithCity from 'components/common/ui/InputAutocomplete/InputAutocompleteWithCityDependency'
import moment, { MomentInput } from 'moment/moment'
import FormBidResult from 'routes/bids/FormBidResult/FormBidResult'
import { useDisclosure } from '@mantine/hooks'
import BidImg from 'components/common/layout/Modal/BidImg'
import UploadedPhotos from "components/common/layout/Modal/UploadedPhotos";

interface InitValues {
    address: string | null
    address_from?: string | null
    address_to?: string | null
    car: string | null
    city: string | null
    company: string | null
    conductor: string | null
    customer_comment: string | null
    important: string | null
    lat_from?: number | null
    lat_to?: number | null
    lon_from?: number | null
    lon_to?: number | null
    parking: string | null
    performer: string | null
    phone: string | null
    secretKey: { value: string; label: string } | string | null
    service_option: any[]
    service_subtype: string | null
    service_type: string | null
    time: string | null
    tire_destroyed: string | null
    truck_type?: string | null
}
export const InitValues: InitValues = {
    address: null,
    address_from: null,
    address_to: null,
    car: null,
    city: null,
    company: null,
    conductor: null,
    customer_comment: null,
    important: "time",
    lat_from: null,
    lat_to: null,
    lon_from: null,
    lon_to: null,
    parking: null,
    performer: null,
    phone: '',
    secretKey: null,
    service_option: [],
    service_subtype: null,
    service_type: null,
    time: null,
    tire_destroyed: null,
    truck_type: null,
}

export const [FormProvider, useFormContext, useForm] = createFormContext<any>();
export const createBidFormActions = createFormActions<InitValues>('createBidForm');

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

      const status = store.bidsStore.formResult.company !== 0 && store.bidsStore.formResult.company !== null && store.bidsStore.formResult.company !== "0"
      console.log(status, 'status');
      return <Observer
        children={() => (<div className={`grid grid-cols-3  gap-4 col-span-full ${!status ? 'pointer-events-none grayscale' : ""}`}>
          <InputLabel className={'col-span-2'}>Фотографии До</InputLabel>

          <div className={'flex col-span-2  gap-3 items-center justify-items-center'}>
            {store.bidsStore.getPhotos.map(
              (item: any, index: number) => <BidImg key={index} item={item} />,
            )}
          </div>
          <p className={'col-span-2'}>Пожалуйста, прикрепите минимум 2 фото</p>
          <FileButton onChange={(e) => store.bidsStore.sendFiles(e, true)} multiple accept='image/png,image/jpeg'>
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
    }, [store.bidsStore.getPhotos, store.bidsStore.formResult.company])

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
    // @ts-ignore
      validate: values => {
        if(step === 1) {

          return store.bidsStore.loadedPhoto.length !== 0 ? yupResolver(CreateBidSchema).call({}, values) : {err: true}
        }
        if(step === 2) {
          return yupResolver(CreateBidSchemaStep2).call({}, values)
        }
        if(step === 3) {
          return yupResolver(CreateBidSchemaStep3).call({}, values)
        }
        if(step === 4) {
          return yupResolver(CreateBidSchemaStep4).call({}, values)
        }
      },
      enhanceGetInputProps: (payload) => {
          if (payload.field === 'city') {
              if (store.appStore.appType === 'customer') {
                  return {
                      className: 'hidden',
                  }
              }
          }
          if (payload.field === 'time') {
              return {
                  disabled: formData.values.important === 'fast',
              }
          }
          if (payload.field === 'company') {
              if (formData.values.company === '0' || formData.values.company === null) {
                  formData.values.city = null
                  formData.values.conductor = null
                  formData.values.car = null
                  formData.values.phone = null
              }

              if (store.appStore.appType === 'customer') {
                  return {
                      className: 'hidden',
                  }
              }
          }

          if (payload.field === 'car') {
              return {
                  //@ts-ignore
                  disabled: payload.form.values.conductor === '0' || carsData === null,
              }
          }
          if (payload.field === 'conductor') {
          }
          if (payload.field === 'conductor') {
              if (
                  formData.values.conductor !== '0' &&
                  formData.values.conductor !== null &&
                  formData.values.company !== null &&
                  formData.values.company !== '0'
              ) {
                  const car = store.carStore.cars?.results.filter(
                      (c: any) => c.employees.filter((e: any) => e.id === Number(formData.values.conductor))[0],
                  )
                  if (car.length === 1) {
                      formData.values.car = String(car[0].id)
                      if (store.bidsStore.formResult.car === 0) {
                          store.bidsStore.formResultSet({ car: car[0].id })
                      }
                  }
              }
          }
          if (payload.field !== 'company')
              return {
                  disabled: formData.values.company === '0' || formData.values.company === null,
              }
      },
  })
  React.useEffect(() => {
    if(formData.values.company !== '0') {
      store.bidsStore.formResultSet({ company: Number(formData.values.company) })
    }
  }, [formData.values.company])

   const carsData = React.useMemo(() => {
     //@ts-ignore
     const car = store.carStore.getCompanyCars.cars?.results?.filter((car) => car.employees.filter((e:any) => e.id === Number(formData.values.conductor))?.length !== 0)

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
  },[formData.values.company])

  React.useEffect(() => {
    if(formData.values.company === null) {
      // setValues(initialValues, true)
      formData.setFieldValue('city', null)
      formData.setFieldValue('conductor', null)
      formData.setFieldValue('car', null)
      // formikReset.resetForm()
      store.bidsStore.formResultsClear()
      store.bidsStore.clearPhotos()
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
      if (store.bidsStore.formResult.service_type === 1 || formData.values.service_type === "1") {
        setStep(2)
      } else {
        setStep((prevState: number) => prevState - 1)
      }
    } else {
      setStep((prevState: number) => prevState - 1)
    }
  }, [step, store.bidsStore.formResult.service_type, formData.values.service_type])

  const handleNext = React.useCallback(() => {
    if(step === 2) {
      if (formData.values.service_type === '1') {
        changeStep(4)
      } else {
        changeStep()
      }
    } else if(step === 4) {
        (async () => {
          store.bidsStore.formCreateBid()
          .then((res) => {
            console.log(res, 'res');
            if (res.status !== 201) {
              notifications.show({
                id: 'bid-created',
                withCloseButton: true,
                autoClose: 3000,
                title: "Ошибка создания заявки",
                message: 'Leave the building immediately',
                icon: <SvgClose />,
                className:
                  'my-notification-class z-[9999]',
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
              // if(store.bidsStore.photo.photosPreviewAr.length !== 0) {
              //   store.bidsStore.uploadPhotos(true).then((res: any) => {
              //     if (res.status < 300) {
              //       changeStep()
              //     }
              //   }).finally(() => {store.bidsStore.formResultsClear()})
              // } else {
                store.bidsStore.formResultsClear()
                changeStep()
                store.bidsStore.clearPhotos()
              // }
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
          actionBack={step === 5 || step === 1 ? null
             : (<><Button
              text={'Назад'}
              action={handleBack}
              className={'lg:mb-0 mr-auto'}
              variant={ButtonVariant['accent-outline']}
            />
            {/*   <Button text={'Check'} action={() => { */}
            {/*   console.log(formData.validate()) */}
            {/*   console.log(formData.values) */}

            {/* }}/>  */}
            </>)
          }
          actionCancel={step !== 5 ? <Button type={'button'}
            text={'Отменить'}
            action={(e) => {
              e.preventDefault()
              navigate(-1)
            }}
            className={'float-right'}
            variant={ButtonVariant['accent-outline']} />: null}
          actionNext={step === 5 ?  <Button type={'button'}
            action={() => navigate('/account/bids')}
            text={'Закрыть'}
            className={'float-right'}
            variant={ButtonVariant.accent} />
           :
            <Button type={'button'}
              action={handleNext}
              disabled={!formData.isValid() || (store.bidsStore.AvailablePerformers.size === 0 && step === 4)}
              text={'Дальше'}
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
                data={store.usersStore.currentCompanyUsers.filter((cond:any) => cond.company.id === Number(formData.values.company) ).map((c: any) => ({
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
              <UploadedPhotos/>
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
                          console.log('set service_type');
                          formData.setFieldValue(step2.fields[1].name, null);
                          action(() => {
                            store.catalogStore.currentService = Number(value);
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
                            formData.setTouched({service_option: false})
                            formData.setFieldValue('service_option', []);
                          } else {
                            formData.setTouched({service_option: false})
                            formData.setFieldValue('service_subtype', value)
                            store.bidsStore.formResultSet({
                              service_subtype: Number(value),
                            })
                            formData.setFieldValue('service_option', []);
                            console.log('setTouched');
                            formData.setTouched({ 'service_option': true });
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
                  formData.values.service_subtype !== '0' && store.catalogStore.ServiceSubtypesOptions.length !== 0 && (
                <Checkbox.Group
                          className={'col-span-2'}
                          {...formData.getInputProps('service_option')}
                          classNames={{
                            label: 'text-accent label mb-4',
                            error: 'absolute -bottom-2',
                            root: 'relative pb-4'
                          }}
                          value={store.bidsStore.formResult.service_option.map((o: number) =>
                            String(o),
                          )}

                          onChange={(vals) => {
                            console.log(formData.values);
                            store.bidsStore.formResultSet({
                              service_option: vals.map((e) => Number(e)),
                            })
                            formData.values.service_option = val(
                              store.bidsStore.formResultsAll.service_option,
                            )
                            // @ts-ignore
                            // if(store.bidsStore.formResultsAll.service_option.length > 0) {
                            // formData.values.service_option = val(
                            //   store.bidsStore.formResultsAll.service_option,
                            // )
                          // }
                        }}
                          label='Выберите дополнительные опции (при необходимости)'
                        >
                          <Group mt='xs'>
                            {
                             store.catalogStore.ServiceSubtypesOptions.map(
                                (i: any) => (
                                  <Checkbox
                                    key={i.id}
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
                      { label: '0', value: '0' },
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
                    console.log(values);
                    if(values !== 'time') {
                    formData.setFieldValue('time', '')
                    store.bidsStore.formResultSet({
                      important: {
                        label: step3?.fields[3]?.options?.filter(
                          (item) => item.value == values,
                        )[0].label,
                        value: values,
                      },
                    })
                  }
                  }}
                  defaultValue={null}
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
                  onInput={(values) => {
                    console.log(formData.values.time);
                    formData.setFieldValue('time', values.currentTarget.value);
                    store.bidsStore.formResultSet({
                      time: { label: step3.fields[4].label, value: values.currentTarget.value },
                    })
                  }}
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
                    label={'Куда подъехать?'}
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
                  <hr className={'col-span-full border-transparent my-2'} /></>}
                  <Select
                    {...formData.getInputProps('parking')}
                    onOptionSubmit={(values) =>
                      store.bidsStore.formResultSet({
                        parking: {
                          label: step3?.fields[1]?.options?.filter(
                            (item) => item.value == values,
                          )[0].label,
                          value: values,
                        },
                      })
                    }
                    label={step3.fields[1].label}
                    data={step3.fields[1].options}
                  />
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
                      console.log(values);
                      if(values === 'fast') {
                        formData.setFieldValue('time', '')
                        store.bidsStore.formResultSet({
                          important: {
                            label: step3?.fields[3]?.options?.filter(
                              (item) => item.value == values,
                            )[0].label,
                            value: values,
                          },
                          time: null
                        })
                      }
                    }}
                    defaultValue={'time'}
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
                    onInput={(values) => {
                      console.log(formData.values.time);
                      formData.setFieldValue('time', values.currentTarget.value);
                      store.bidsStore.formResultSet({
                        time: { label: step3.fields[4].label, value: values.currentTarget.value },
                      })
                    }}
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
                    text={formData.values.service_type === "1" ? "Шаг 3. Выбор исполнителя" : step4.title}
                    color={HeadingColor.accent}
                    variant={HeadingVariant.h2}
                  />
                  <div className={'text-base'}>{step4.description}</div>
                </>
              }
            >
              {(store.bidsStore.AvailablePerformers.size === 0) ? <><Heading className={'col-span-full'} text={'Исполнители не найдены'} variant={HeadingVariant.h3}/></> :
                    (<><Select
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
                      {...formData.getInputProps('performer')}
                      label={step4.fields[1].label}
                      searchable
                      clearable
                      onOptionSubmit={(val: any) => {
                        console.log(val);
                        store.bidsStore.formResultSet({ performer: Number(val) })
                      }
                      }
                      data={val(store.bidsStore.currentPerformers).map((i: any) => ({
                        label: i.name,
                        value: String(i.id),
                      }))}
                    />
                <MapWithDots />
                    </>
                    )
              }

            </PanelForForms>
            <FormBidResult
              state={step !== 5}
              animate={animate}
              {...store.bidsStore.justCreatedBid}
            />

          </form>
        </PanelForForms>
      </FormProvider>
  )
}

export default observer(FormCreateUpdateBid)
