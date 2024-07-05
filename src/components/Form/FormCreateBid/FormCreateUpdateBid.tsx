import React, { useState } from "react";
import "yup-phone-lite";
import { useStore } from "stores/store";
import { useNavigate } from "react-router-dom";
import Button, { ButtonVariant } from "components/common/ui/Button/Button";
import Heading, { HeadingColor, HeadingVariant } from "components/common/ui/Heading/Heading";
import Progress from "components/common/ui/Progress/Progress";
import { observer } from "mobx-react-lite";
import { Checkbox, FileButton, Group, InputBase, Select, Textarea } from "@mantine/core";
import { action, values as val } from "mobx";
import { IMaskInput } from "react-imask";
import { PanelColor, PanelVariant } from "components/common/layout/Panel/Panel";
import { yupResolver } from "mantine-form-yup-resolver";
import { CreateBidSchema, CreateBidSchemaStep2, CreateBidSchemaStep3, CreateBidSchemaStep4 } from "utils/validationSchemas";
import PanelForForms from "components/common/layout/Panel/PanelForForms";
import { createFormActions, createFormContext } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { SvgClose } from "components/common/ui/Icon";
import MapWithDots from "components/common/Map/Map";
import InputAutocompleteWithCity from "components/common/ui/InputAutocomplete/InputAutocompleteWithCityDependency";
import FormBidResult from "routes/bids/FormBidResult/FormBidResult";
import { UploadedPhotosFirstStep } from "components/common/layout/Modal/UploadedPhotos";
import { DateTimePicker } from "@mantine/dates";
import dayjs from "dayjs";
import { useScrollIntoView, useViewportSize } from "@mantine/hooks";
import { PermissionNames } from "stores/permissionStore";
import { useSWRConfig } from "swr";
import { CompanyType } from "stores/companyStore";
import BidModalOptionsSelect from "routes/bids/BidComponents/BidModalOptionsSelect";

interface InitValues {
    address: string | null
    address_from?: string | null
    address_to?: string | null
    car: string | null
    photo_new: File[] | []
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
    photo_new: [],
    city: null,
    company: null,
    conductor: null,
    customer_comment: null,
    important: "fast",
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
export const InitValuesTemp: InitValues = {
    address: null,
    address_from: null,
    address_to: null,
    car: "1",
    photo_new: [],
    city: "1",
    company: "2",
    conductor: "2",
    customer_comment: null,
    important: "fast",
    lat_from: null,
    lat_to: null,
    lon_from: null,
    lon_to: null,
    parking: null,
    performer: null,
    phone: "+7 987 878 7878",
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
    const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
      offset: 60,

    });
    const {width} = useViewportSize()
    const store = useStore()
    const [step, setStep] = useState(1)
    const [animate, setAnimate] = useState(false)
    const navigate = useNavigate()
    const { step1, step2 ,step3, step4, step5} = store.bidsStore.formDataAll
    // @ts-ignore
  const selectedPerformerAmount:any = store.bidsStore.AvailablePerformers.get(String(store.bidsStore.formResultsAll.performer))?.amount
    const changeStep = (step?: number) => {
        setAnimate((prevState) => !prevState)
        setTimeout(() => {
            setAnimate(false)
            setStep((prevState) => (step ? step : prevState + 1))
        }, 1200)
        width < 1025 ? scrollIntoView() : null
    }

    const initData = React.useMemo(() => {
      let initValues = InitValues
      if(!edit) {
        store.bidsStore.formResultsClear()
      }
      if (edit) {
        initValues = {
          ...InitValues
        }
      }
      if(store.appStore.appType === "customer") {
        initValues.company = String(store.userStore.myProfileData.company.id);
        initValues.city = String(store.userStore.myProfileData.company.city.id);
      }
      if(!store.userStore.getUserCan(PermissionNames["Управление пользователями"], 'read')) {
        initValues.phone = store.userStore.myProfileData.user.phone
        initValues.conductor = String(store.userStore.myProfileData.user.id)
        initValues.car = store.userStore.myProfileData.user.cars.length === 1 ? String(store.userStore.myProfileData.user.cars[0].id) : null
        store.bidsStore.formResultSet({car: store.userStore.myProfileData.user.cars.length === 1 ? store.userStore.myProfileData.user.cars[0].id : null, conductor: store.userStore.myProfileData.user.id, phone: store.userStore.myProfileData.user.phone})
      }
      return initValues

    }, [edit, bid])
  const formData = useForm({
      name: 'createBidForm',
      initialValues: initData,
      validateInputOnBlur: true,
      onValuesChange: (values, previous) => console.log(values),
    // @ts-ignore
      validate: values => {
        if(step === 1) {

          return formData.values.photo_new.length > 1 ? yupResolver(CreateBidSchema).call({}, values) : {err: true}
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
          if (payload.field === 'important') {
              if (formData.values.important === 'fast') {
                  formData.values.time = null
              }
          }
          if(payload.field === 'photo_new') {
            return ({
              onChange: (props:any) => formData.setFieldValue('photo_new', props)
            })
          }
          if (payload.field === 'car') {
              return {
                  //@ts-ignore
                  disabled: payload.form.values.conductor === null || carsData === null || carsData.length === 0,
              }
          }

          if (payload.field === 'conductor') {
              if (
                  formData.values.conductor !== '0' &&
                  formData.values.conductor !== null &&
                  formData.values.company !== null &&
                  formData.values.company !== '0'
              ) {
                if (store.carStore.cars && store.carStore.cars.results?.length !== 0) {
                  const car = store.carStore.cars?.results?.filter(
                    (c: any) => c.employees.filter((e: any) => e.id === Number(formData.values.conductor))[0],
                  )
                  if (car && car.length === 1) {
                    formData.values.car = String(car[0].id)
                    if (store.bidsStore.formResult.car === 0) {
                      store.bidsStore.formResultSet({ car: car[0].id })
                    }
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
      if (formData.values.company !== '0') {
          store.bidsStore.formResultSet({ company: Number(formData.values.company) })
      }
  }, [formData.values.company])
  const { cars }  = store.carStore.getCompanyCars
  const car = React.useMemo(() => {
    if(store.userStore.myProfileData.company.company_type === CompanyType.fizlico) {
      return  store.carStore.getCompanyCars.cars?.results
    }
    return cars?.results?.filter((c:any) => {
      // console.log(c);
      if(c.is_active) {
        return c.employees.filter((e: any) => e.id === Number(formData.values.conductor))?.length !== 0
      }
      // return
    })
  }, [formData.values.conductor, cars])

 const carsData = React.useMemo(() => {
   //@ts-ignore
     if(car && car.length === 1) {
       store.bidsStore.formResultSet({ car: Number(car[0].id) })
       formData.setFieldValue('car', String(car[0].id))
       return car.map((c: any) => ({ label: `${c.brand?.name}  ${c.model?.name}  ${c.number}`, value: String(c.id), }))
     }
     if(car && car.length > 0) {
        return car.map((c: any) => ({ label: `${c.brand?.name}  ${c.model?.name}  ${c.number}`, value: String(c.id), }))
     }

     if(!store.userStore.getUserCan(PermissionNames["Управление автомобилями"], 'read') && store.userStore.myProfileData.user.cars.length > 0) {
       return store.userStore.myProfileData.user.cars.map((c: any) => ({ label: `${c.brand?.name}  ${c.model?.name}  ${c.number}`, value: String(c.id), }))
     }
     return null
    }, [formData.values.conductor, cars])

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
      formData.values.conductor = String(store.bidsStore.formResultsAll.conductor);
      store.bidsStore.clearPhotos()
    }
  }, [store.bidsStore.formResultsAll.company, formData.values.company, store.bidsStore.formResultsAll.city])

  React.useEffect(() => {
    if(formData.values.conductor === null) {
      formData.setFieldValue('conductor', null)
      formData.setFieldValue('car', null)
      formData.setFieldValue('phone', null)

    } else {
      let value: any;
      if (store.userStore.myProfileData.company === CompanyType["fizlico"]) {
        value = store.userStore.myProfileData.user
        formData.setFieldValue('phone', value.phone)
        store.bidsStore.formResultSet({ phone: store.userStore.myProfileData.user.phone })
      } else {
        value = store.usersStore.companyUsers.filter((c: any) => c.employee.id === Number(formData.values.conductor))[0]
        if (store.userStore.getUserCan(PermissionNames["Управление пользователями"], 'read')) {
          //@ts-ignore
          formData.setFieldValue('phone', value && value.employee && value.employee?.phone)
          //@ts-ignore
          store.bidsStore.formResultSet({ phone: value && value.employee && value.employee?.phone })
        } else {
          formData.setFieldValue('phone', store.userStore.myProfileData.user.phone)
          store.bidsStore.formResultSet({ phone: store.userStore.myProfileData.user.phone })
        }
      }
    }
  }, [formData.values.conductor])

  const handleBack = React.useCallback(() => {
    if(step === 4) {
      if (store.bidsStore.formResult.service_type === 1 || formData.values.service_type === "1" || formData.values.service_type === "2") {
        setStep(2)
      } else {
        setStep((prevState: number) => prevState - 1)
      }
    } else {
      setStep((prevState: number) => prevState - 1)
    }
  }, [step, store.bidsStore.formResult.service_type, formData.values.service_type])

  const { mutate } = useSWRConfig()
  const handleNext = React.useCallback(async () => {
    if(step === 2) {
      console.log('step 2');
        store.bidsStore.loadCurrentPerformers(Number(store.bidsStore.formResult.company), {
          car_id: store.bidsStore.formResult.car,
          subtype_id: store.bidsStore.formResult.service_subtype,
          options_idx: store.bidsStore.formResult.service_option
        }).then((res:any) => {
          console.log(store.bidsStore.formResult.service_subtype, 'step t');
          if (formData.values.service_type === '1') {
            changeStep(4)
          } else if (store.bidsStore.formResult.service_subtype === 5) {
            console.log('step 5');
            changeStep(4)
          } else {
            console.log('step ');
            changeStep()
          }
        })

    } else if(step === 4) {
          await store.bidsStore.sendFiles(formData.values.photo_new, true).then(() =>
            store.bidsStore.formCreateBid()
          .then((res) => {
            if (res && res.status !== 201) {
              notifications.show({
                id: 'bid-created_error',
                withCloseButton: true,
                autoClose: 5000,
                title: "Ошибка создания заявки",
                message: null,
                color: 'var(--errorColor)',
                loading: false,
              })
            } else {
              mutate('bids')
              notifications.show({
                id: 'bid-created_success',
                withCloseButton: true,
                autoClose: 5000,
                title: 'Заявка создана',
                message: 'Успешное создание',
                color: 'var(--accentColor)',
                // style: { backgroundColor: 'red' },
                loading: false,
              })

            }
          }).finally(() => {
            changeStep();
            setTimeout(() => {
              store.bidsStore.clearPhotos();
              store.bidsStore.formResultsClear()
            }, 2000)
          })
          )
        // })()
    } else {
      changeStep()
    }
  }, [formData.values.service_type, step])

    const _users = store.usersStore.currentCompanyUsers

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
      if(!store.userStore.getUserCan(PermissionNames["Управление пользователями"], 'read')) {


        result = [{
          label: store.userStore.myProfileData.user.first_name + " " + store.userStore.myProfileData.user.last_name,
          value: String(store.userStore.myProfileData.user.id)
        }]

      }
      return result
    }, [formData.values.company, _users])

    return (
        <FormProvider form={formData}>
            <PanelForForms
                ref={targetRef}
                footerClassName={'px-8 tablet-max:px-5 pb-8 pt-2  tablet-max:pb-8'}
                bodyClassName={'self-stretch grid grid-rows-1'}
                variant={PanelVariant.default}

                actionBack={
                    <>
                        {step === 5 || step === 1 ? null : (
                            <Button
                                text={'Назад'}
                                action={handleBack}
                                className={'lg:mb-0 mr-auto'}
                                variant={ButtonVariant['accent-outline']}
                            />
                        )}
                        {step === 1 && (
                            <>
                                <FileButton
                                    onChange={(e) => {
                                      const _ar = formData.values.photo_new
                                      e.forEach((i:any) => _ar.push(i))
                                      formData.setFieldValue('photo_new', _ar, {
                                        forceUpdate: true
                                      })
                                      formData.setTouched({"photo_new": true})
                                    }}
                                    multiple
                                    accept='image/png,image/jpeg'
                                >
                                    {(props) => (
                                        <Button
                                            className={'col-span-1'}
                                            type={'button'}
                                            variant={ButtonVariant['accent-outline']}
                                            disabled={
                                                store.bidsStore.formResult.company === 0 ||
                                                store.bidsStore.formResult.company === null ||
                                                store.bidsStore.getPhotos.length > 7
                                            }
                                            {...props}
                                            text={'Добавить фото'}
                                        ></Button>
                                    )}
                                </FileButton>
                            </>
                        )}
                    </>
                }
                actionCancel={
                    step !== 5 ? (
                        <Button
                            type={'button'}
                            text={'Отменить'}
                            action={(e) => {
                                e.preventDefault()
                                navigate(-1)
                            }}
                            variant={ButtonVariant.cancel}
                        />
                    ) : null
                }
                actionNext={
                    step === 5 ? (
                        <Button
                            type={'button'}
                            action={() => navigate('/account/bids')}
                            text={'Закрыть'}
                            className={'float-right'}
                            variant={ButtonVariant.accent}
                        />
                    ) : (
                        <Button
                            type={'button'}
                            action={handleNext}
                          isOnce={true}
                            disabled={
                                !formData.isValid() || (store.bidsStore.AvailablePerformers.size === 0 && step === 4)
                            }
                            text={'Дальше'}
                            className={'float-right'}
                            variant={ButtonVariant.accent}
                        />
                    )
                }
            >
                <form
                    // onSubmit={formData.onSubmit((props) => console.log('form', props))}
                    onReset={formData.onReset}
                    style={{ display: 'contents' }}
                >
                    <Progress total={formData.values.service_type === '1' ? 4 : 5} current={step} />
                    <PanelForForms
                        state={step !== 1}
                        animate={animate}
                        className={'!bg-transparent h-full !flex flex-col'}
                        bodyClassName={
                            'grid  flex-col !grid-cols-3 !grid-rows-[auto_auto_auto_auto_1fr] !gap-0 !pb-2 flex-[1_100%] !self-stretch !items-stretch'
                        }
                        variant={PanelVariant.textPadding}
                        background={PanelColor.default}
                        header={
                            <>
                                <Heading text={step1.title} color={HeadingColor.accent} variant={HeadingVariant.h2} />
                                <div className={'text-base'}>{step1.description}</div>
                            </>
                        }
                    >
                        <Group grow className={'col-span-2'}>
                            <Select
                                {...formData.getInputProps('company')}
                                clearable
                                label={step1.fields[1].label}
                                onLoad={handleChangeCompany}
                                onOptionSubmit={handleChangeCompany}
                                searchable
                                data={store.companyStore.companies
                                    .filter((c: any) => c.company_type === 'Клиент')
                                    .map((c: any) => ({ label: c.name, value: String(c.id) }))}
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
                        </Group>
                        {store.appStore.appType === 'admin' && (
                            <hr className={'col-span-full border-transparent my-2'} />
                        )}
                        {/* //todo: map not admin values to select */}

                        <Group grow className={'col-span-full'}>
                            <Select
                                {...formData.getInputProps('conductor')}
                                label={step1.fields[2].label}
                                searchable
                                className={'self-start'}
                                onOptionSubmit={(value) => {
                                    formData.values.car = null
                                    formData.values.phone = null
                                    store.bidsStore.formResultSet({ conductor: Number(value) })
                                }}
                                disabled={
                                    store.bidsStore.formResult.company === 0 ||
                                    (store.usersStore.currentCompanyUsers.length === 0 && conductorsData.length === 0)
                                }
                                data={conductorsData}
                            />

                            <InputBase
                                className={'self-start'}
                                {...formData.getInputProps('phone')}
                                onAccept={(value: any, mask: any) => {
                                    formData.setFieldValue('phone', value)
                                    store.bidsStore.formResultSet({ phone: value })
                                }}
                                //@ts-ignore

                                label={step1.fields[3].label}
                                component={IMaskInput}
                                mask='+7 000 000 0000'
                                placeholder='+7 000 000 0000'
                            />

                            <Select
                                {...formData.getInputProps('car')}
                                className={'self-start'}
                                clearable
                                onOptionSubmit={(value) => store.bidsStore.formResultSet({ car: Number(value) })}
                                //@ts-ignore
                                label={step1.fields[4].label}
                                searchable
                                data={carsData}
                            />
                        </Group>
                        <hr className={'col-span-full border-transparent my-2'} />


                        <Group grow className={'col-span-full flex-1 gap-0 tablet-max:pt-4 pb-6'} align={'stretch'}>
                            <UploadedPhotosFirstStep />
                        </Group>
                    </PanelForForms>

                    <PanelForForms
                        state={step !== 2}
                        animate={animate}
                        className={'!bg-transparent'}
                        bodyClassName={'grid !grid-cols-3 gap-4'}
                        variant={PanelVariant.textPadding}
                        background={PanelColor.default}
                        header={
                            <>
                                <Heading text={step2.title} color={HeadingColor.accent} variant={HeadingVariant.h2} />
                                <div className={'text-base'}>{step2.description}</div>
                            </>
                        }
                    >
                        <Select
                            {...formData.getInputProps(step2.fields[0].name)}
                            label={step2.fields[0].label}
                            disabled={store.catalogStore.services.size === 0}
                            onOptionSubmit={(value) => {
                                formData.setFieldValue('service_subtype', null)
                                formData.resetTouched()
                                if (value === null) {
                                    formData.setFieldValue(step2.fields[1].name, '0')
                                    formData.setFieldValue(step2.fields[0].name, '0')
                                } else {
                                    // console.log('set service_type');
                                    formData.setFieldValue(step2.fields[1].name, null)
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
                              console.log(value);
                                if (value === null) {
                                    store.bidsStore.formResultSet({ service_subtype: null })
                                  store.bidsStore.formResultSet({
                                    service_option: [],
                                  })
                                    formData.setFieldValue(step2.fields[1].name, null)
                                    formData.setFieldValue('service_option', [])
                                    formData.setTouched({ service_option: false })
                                } else {
                                    formData.setTouched({ service_option: false })
                                    formData.setFieldValue('service_subtype', value)
                                    store.bidsStore.formResultSet({
                                        service_subtype: Number(value),
                                      service_option: [],
                                    })

                                    formData.setFieldValue('service_option', [])
                                    // console.log('setTouched');
                                    formData.setTouched({ service_option: true })
                                }
                            }}
                            data={
                                store.catalogStore.currentService !== 0
                                    ? val(store.catalogStore.currentServiceSubtypes).map((i: any) => ({
                                          label: i.name,
                                          value: String(i.id),
                                      }))
                                    : ['']
                            }
                        />
                        <BidModalOptionsSelect/>
                        {/* {formData.values.service_subtype && */}
                        {/*     formData.values.service_subtype !== '0' && */}
                        {/*     formData.values.service_subtype && */}
                        {/*     formData.values.service_subtype !== '0' && */}
                        {/*     store.catalogStore.ServiceSubtypesOptions.length !== 0 && ( */}
                        {/*         <Checkbox.Group */}
                        {/*             className={'col-span-2'} */}
                        {/*             {...formData.getInputProps('service_option')} */}
                        {/*             classNames={{ */}
                        {/*                 label: 'text-accent label mb-4', */}
                        {/*                 error: 'absolute -bottom-2', */}
                        {/*                 root: 'relative pb-4', */}
                        {/*             }} */}
                        {/*             value={store.bidsStore.formResult.service_option.map((o: number) => String(o))} */}
                        {/*             onChange={(vals) => { */}
                        {/*                 store.bidsStore.formResultSet({ */}
                        {/*                     service_option: vals.map((e) => Number(e)), */}
                        {/*                 }) */}
                        {/*                 formData.values.service_option = val( */}
                        {/*                     store.bidsStore.formResultsAll.service_option, */}
                        {/*                 ) */}
                        {/*             }} */}
                        {/*             label='Выберите дополнительные опции (при необходимости)' */}
                        {/*         > */}
                        {/*             <Group mt='xs'> */}
                        {/*                 {store.catalogStore.ServiceSubtypesOptions.map((i: any) => ( */}
                        {/*                     <Checkbox key={i.id} value={String(i.id)} label={i.name} /> */}
                        {/*                 ))} */}
                        {/*             </Group> */}
                        {/*         </Checkbox.Group> */}
                        {/*     )} */}
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
                    {formData.values.service_type === '3' ? (
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
                            <InputAutocompleteWithCity
                                label={'Откуда вас забрать?'}
                                {...formData.getInputProps('address_from')}
                                action={(val: any) => {
                                    formData.setFieldValue('address_from', val)
                                    store.bidsStore.formResultSet({ address_from: val })
                                }}
                                city={
                                    store.bidsStore.formResult.city !== 0
                                        ? store.catalogStore.cities.get(store.bidsStore.formResult.city.toString()).name
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
                                        ? store.catalogStore.cities.get(store.bidsStore.formResult.city.toString()).name
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
                                    { label: 'манипулятор ', value: 'манипулятор' },
                                ]}
                            />
                            <hr className={'col-span-full border-transparent my-2'} />
                            <Select
                                {...formData.getInputProps('important')}
                                onOptionSubmit={(values) => {
                                    // console.log(values);
                                    if (values !== 'time') {
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
                                label={step3.fields[3].label}
                                data={step3.fields[3].options}
                            />

                            <DateTimePicker
                                classNames={{
                                    root: '',
                                    input: 'text-gray-2 font-medium !placeholder:text-gray-3 bg-white data-[disabled=true]:bg-white rounded-[0.625rem] border-color-[var(--formBorder)] h-10',
                                    monthCell: 'text-white',
                                    day: 'text-white data-[disabled=true]:text-white/40 data-[selected=true]:text-accent hover:text-accent/80',
                                }}
                                {...formData.getInputProps('time')}
                                dropdownType='modal'
                                modalProps={{
                                    centered: true,
                                }}
                                onChange={(value) => {
                                    const timestamp = dayjs(String(value)).valueOf()
                                    formData.setFieldValue('time', value)
                                    formData.setTouched({ time: true })
                                    store.bidsStore.formResultSet({ time: timestamp })
                                }}
                                valueFormat='DD.MM.YYYY hh:mm'
                                minDate={dayjs(new Date()).add(2, 'hours').toDate()}
                                maxDate={dayjs(new Date()).add(2, 'hours').add(2, 'days').toDate()}
                                label={step3.fields[4].label}
                                placeholder=''
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
                                {formData.values.service_subtype === '6' && (
                                    <>
                                        <InputAutocompleteWithCity
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
                                        <hr className={'col-span-full border-transparent my-2'} />
                                    </>
                                )}
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
                                        // console.log(values);
                                        if (values === 'fast') {
                                            formData.setFieldValue('time', '')
                                            store.bidsStore.formResultSet({
                                                important: {
                                                    label: step3?.fields[3]?.options?.filter(
                                                        (item) => item.value == values,
                                                    )[0].label,
                                                    value: values,
                                                },
                                                time: null,
                                            })
                                        }
                                    }}
                                    defaultValue={'time'}
                                    // value={store.bidsStore.formResult.important}
                                    label={step3.fields[3].label}
                                    data={step3.fields[3].options}
                                />

                                <DateTimePicker
                                    classNames={{
                                        root: '',
                                        input: 'text-gray-2 font-medium !placeholder:text-gray-3 bg-white data-[disabled=true]:bg-white rounded-[0.625rem] border-color-[var(--formBorder)] h-10',

                                        monthCell: 'text-white',
                                        day: 'text-white data-[disabled=true]:text-white/40 data-[selected=true]:text-accent hover:text-accent/80',
                                    }}
                                    {...formData.getInputProps('time')}
                                    dropdownType='modal'
                                    modalProps={{
                                        centered: true,
                                    }}
                                    onChange={(value) => {
                                        const timestamp = dayjs(String(value)).valueOf()
                                        formData.setFieldValue('time', value)
                                        formData.setTouched({ time: true })
                                        store.bidsStore.formResultSet({ time: timestamp })
                                    }}
                                    valueFormat='DD.MM.YYYY hh:mm'
                                    minDate={dayjs(new Date()).add(2, 'hours').toDate()}
                                    maxDate={dayjs(new Date()).add(2, 'hours').add(2, 'days').toDate()}
                                    label={step3.fields[4].label}
                                    placeholder=''
                                />
                            </>
                        </PanelForForms>
                    )}
                    <PanelForForms
                        state={step !== 4}
                        animate={animate}
                        className={
                            '!bg-transparent  self-stretch auto-rows-[min-content_1fr] desktop:grid-rows-[auto_1fr]'
                        }
                        variant={PanelVariant.textPadding}
                        background={PanelColor.default}
                        bodyClassName={
                            'mobile:!grid grid !grid-cols-5   gap-y-8  gap-x-12 content-start content-stretch items-stretch'
                        }
                        footerClassName={'flex-1 w-full justify-stretch'}
                        header={
                            <>
                                <Heading
                                    text={
                                        formData.values.service_type === '1' ? 'Шаг 3. Выбор исполнителя' : step4.title
                                    }
                                    color={HeadingColor.accent}
                                    variant={HeadingVariant.h2}
                                />
                            </>
                        }
                    >
                        {store.bidsStore.AvailablePerformers.size === 0 ? (
                            <>
                                <Heading
                                    className={'col-span-full'}
                                    text={'Исполнители не найдены'}
                                    variant={HeadingVariant.h3}
                                />
                            </>
                        ) : (
                            <div className={'col-span-full subgrid contents'}>
                              <div className={"col-span-2  row-span-2  relative z-[999] mobile:mb-8 grid  justify-evenly items-center"}>
                                <div className={"text-base"}>{step4.description}</div>
                                <div>
                                  <Select className={"col-span-2"}
                                    required
                                    label={step4.fields[0].label}
                                    searchable
                                    value={String(store.bidsStore.formResult.city)}
                                    data={val(store.catalogStore.cities).map((i: any) => ({
                                      label: i.name,
                                      value: String(i.id)
                                    }))} />
                                  <Select className={"col-span-2"}
                                    required
                                    {...formData.getInputProps("performer")}
                                    label={step4.fields[1].label}
                                    searchable
                                    clearable
                                    onOptionSubmit={(val: any) => {
                                      store.bidsStore.formResultSet({ performer: Number(val) });
                                    }}
                                    data={val(store.bidsStore.currentPerformers).map((i: any) => ({
                                      label: i.name,
                                      value: String(i.id)
                                    }))} />
                                </div>
                                {store.userStore.getUserCan('Финансовый блок', "read") ? <div> {selectedPerformerAmount && <>
                                  <Heading text={"Общая стоимость"}
                                    variant={HeadingVariant.h5}
                                    className={"text-sm text-accent"} />
                                  <Heading text={`${selectedPerformerAmount} ₽`} variant={HeadingVariant.h2}
                                  className={"text-sm text-accent"} />
                                </>
                              } </div> : null}
                            </div>
                                <MapWithDots />

                            </div>
                        )}

                    </PanelForForms>
                    <FormBidResult state={step !== 5} animate={animate} {...store.bidsStore.justCreatedBid} />
                </form>
            </PanelForForms>
        </FormProvider>
    )
}

export default observer(FormCreateUpdateBid)
