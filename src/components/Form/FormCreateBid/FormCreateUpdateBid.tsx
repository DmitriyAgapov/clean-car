import React, { useState } from 'react'
import { Form, Formik, useFormik, useFormikContext } from "formik";
import * as Yup from 'yup'
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
import { IMaskInput } from 'react-imask'
import Panel, { PanelColor, PanelVariant } from 'components/common/layout/Panel/Panel'
import SelectMantine from "components/common/ui/SelectMantine/SelectMantine";
import { yupResolver } from "mantine-form-yup-resolver";
import { CreateBidSchema, CreateUserSchema } from "utils/validationSchemas";
import PanelForForms from 'components/common/layout/Panel/PanelForForms';
import { createFormActions, createFormContext } from "@mantine/form";
const SignupSchema = Yup.object().shape({
  city: Yup.string().required('Обязательное поле'),
  company: Yup.string().required('Обязательное поле'),
  conductor: Yup.string().required('Обязательное поле'),
  car: Yup.string().required('Обязательное поле'),
  // phone: Yup.string().required('Обязательное поле'),
})
interface InitValues {
  address: string;
  company: string;
  conductor: string;
  car: string;
  important: {
    label: string;
    value: string;
  };
  secretKey: {
    label: string;
    value: string;
  };
  phone: string;
  customer_comment: string;
  service_type: string;
  parking: {
    label: string;
    value: string;
  };
  service_option: any[];
  service_subtype: string;
  city: string;
  time: {
    label: string;
    value: string;
  };
  performer: string;
}
export const InitValues:InitValues = {
  address: '',
  company: '0',
  conductor: '0',
  car: '0',
  important: {
    label: '',
    value: '',
  },
  secretKey: {
    label: '',
    value: 'true',
  },
  phone: '',
  customer_comment: '',
  service_type: '0',
  parking: {
    label: '',
    value: 'true',
  },
  service_option: [],
  service_subtype: '0',
  city: '0',
  time: {
    label: '',
    value: '',
  },
  performer: '0',
}

export const [FormProvider, useFormContext, useForm] = createFormContext<any>()
export const createCompanyFormActions = createFormActions<InitValues>('createCompanyForm')

const Step1Inputs = observer(({step1}:any) => {
    const store = useStore()
    const { values, getFieldProps, errors, initialValues, resetForm, setFieldValue, setValues,  getFieldHelpers,setFieldTouched, touched }:any = useFormikContext();
  const formikReset = useFormik({
    enableReinitialize: true,
    initialValues: InitValues,
    validationSchema: SignupSchema,
    onSubmit: values => {
      console.log('Click')
    }
  });

    const handleChangeCompany = React.useCallback((e:any) => {
        if(e === null) {
            values.company = '0'
            store.bidsStore.formResultSet({company: 0})

        }
        if(e !== 0) {
            setFieldValue('company', e, false);
          setFieldTouched('company', false, true)
            store.bidsStore.formResultSet({ company: Number(e) })
        } else {
            store.bidsStore.formResultSet({ company: 0 })
        }
    },[])
  React.useEffect(() => {
    console.log(errors);
    console.log(values);
  }, [errors])
  React.useEffect(() => {
    console.log(values);
  }, [values])
  React.useEffect(() => {

      if(values.company === null) {
        // setValues(initialValues, true)
        setFieldValue('city', null, false)
        setFieldTouched('city', false, true)
        setFieldValue('conductor', null, false)
        setFieldTouched('conductor', false, true)
        setFieldValue('car', null, false)
        setFieldTouched('car', false, true)
        // formikReset.resetForm()
        store.bidsStore.formResultsClear()

      } else  {
        setTimeout(() => {
          setFieldValue('city', String(store.bidsStore.formResultsAll.city), false)
          setFieldTouched('city', false, true)
        }, 500);

        values.phone = String(store.bidsStore.formResultsAll.phone);
        values.car = String(store.bidsStore.formResultsAll.car);
        values.conductor = String(store.bidsStore.formResultsAll.conductor);
      }
    }, [store.bidsStore.formResultsAll.company, values.company])
    return (<>

          <SelectMantine
            required
            name={'city'}
            clearable
            label={step1.fields[0].label}
            searchable
            value={values.city}
            data={val(store.catalogStore.cities).map((i: any) => ({
                label: i.name,
                value: String(i.id),
            }))}
          />

        <hr className={'col-span-full border-transparent my-2'} />
        {/* //todo: map not admin values to select */}

            <SelectMantine
              name={'company'}
              clearable
              value={values.company ? values.company : '0'}
              label={step1.fields[1].label}
              onChange={handleChangeCompany}
              searchable
              data={store.companyStore.companies
                .filter((c: any) => c.company_type === 'Компания-Заказчик')
                .map((c: any) => ({
                    label: c.name,
                    value: String(c.id),
                }))

              }
            />

        <SelectMantine
          required
          label={step1.fields[2].label}
          searchable
          name={'conductor'}
          value={String(values.conductor)}
          onChange={(value) => store.bidsStore.formResultSet({ conductor: Number(value) })}
          disabled={
            store.bidsStore.formResult.company === 0 ||
            store.usersStore.currentCompanyUsers.length === 0
          }
          data={store.usersStore.currentCompanyUsers.map((c: any) => ({
              label: c.employee.first_name,
              value: String(c.employee.id),
          }))}
        />

        <InputBase
        defaultValue={values.phone}
        unmask={"typed"}
        onAccept={(value:any, mask:any) => {
          console.log(value);
            setFieldValue('phone', value, false)
            store.bidsStore.formResultSet({ phone: value })
        }}
        required={true}
        label={step1.fields[3].label}
        component={IMaskInput}
          mask='+7 000 000 0000'
          placeholder='+7 000 000 0000'
      />
        <Select
        value={store.bidsStore.formResultsAll.car ? String(store.bidsStore.formResultsAll.car) : null}
        onChange={(value) => store.bidsStore.formResultSet({ car: Number(value) })}
        //@ts-ignore
        disabled={store.carStore.getCompanyCars.cars.count === 0} label={step1.fields[4].label} searchable data={store.carStore.cars.length !== 0 ? store.carStore.getCompanyCars.cars.results.map((c: any) => ({ label: `${c.brand.name}  ${c.model.name}  ${c.number}`, value: String(c.id), })) : ['']}
      />
    </>
    )
})
const FormCreateUpdateBid = ({ bid, edit }: any) => {
    const store = useStore()
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
    onValuesChange: (values, previous) => console.log(values),
    validate: yupResolver(CreateBidSchema),
    enhanceGetInputProps: (payload) => {
        if (payload.field === 'city' && store.appStore.appType === "customer") {
            return {
                // className: 'hidden',
            }
        }
    },
  });
  const handleChangeCompany = React.useCallback((e:any) => {
    if(e === null) {
      formData.values.company = '0'
      store.bidsStore.formResultSet({company: 0})

    }
    if(e !== 0) {
      formData.setFieldValue('company', e);
      formData.values.company.setTouched(false)
      store.bidsStore.formResultSet({ company: Number(e) })
    } else {
      store.bidsStore.formResultSet({ company: 0 })
    }
  },[])
    return (
      <FormProvider form={formData}>
        <PanelForForms actionCancel={
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
              action={() => {
                changeStep()
              }}
              disabled={!formData.isValid()}
              text={'Сохранить'}
              className={'float-right'}
              variant={ButtonVariant.accent} />
          }>
          <form onSubmit={formData.onSubmit((props) => console.log('form', props))}
            onReset={formData.onReset}
            style={{ display: 'contents' }}>
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
                    text={step1.title}
                    color={HeadingColor.accent}
                    variant={HeadingVariant.h2}
                  />
                  <div className={'text-base'}>{step1.description}</div>
                </>
              }
            >
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

              <hr className={'col-span-full border-transparent my-2'} />
              {/* //todo: map not admin values to select */}

              <Select
                {...formData.getInputProps('company')}
                clearable
                label={step1.fields[1].label}
                onOptionSubmit={handleChangeCompany}
                searchable
                data={store.companyStore.companies.filter((c: any) => c.company_type === 'Компания-Заказчик').map((c: any) => ({ label: c.name, value: String(c.id), }))}
              />

              <Select
                {...formData.getInputProps('conductor')}
                label={step1.fields[2].label}
                searchable
                onChange={(value) => store.bidsStore.formResultSet({ conductor: Number(value) })}
                disabled={
                  store.bidsStore.formResult.company === 0 ||
                  store.usersStore.currentCompanyUsers.length === 0
                }
                data={store.usersStore.currentCompanyUsers.map((c: any) => ({
                  label: c.employee.first_name,
                  value: String(c.employee.id),
                }))}
              />

              <InputBase
                {...formData.getInputProps('phone')}
                defaultValue={formData.values.phone}
                unmask={"typed"}
                onAccept={(value:any, mask:any) => {
                  formData.setFieldValue('phone', value)
                  store.bidsStore.formResultSet({ phone: value })
                }}
                required={true}
                label={step1.fields[3].label}
                component={IMaskInput}
                mask='+7 000 000 0000'
                placeholder='+7 000 000 0000'
              />
              <Select
                {...formData.getInputProps('car')}
                value={store.bidsStore.formResultsAll.car ? String(store.bidsStore.formResultsAll.car) : null}
                onOptionSubmit={(value) => store.bidsStore.formResultSet({ car: Number(value) })}
                //@ts-ignore
                disabled={store.carStore.getCompanyCars.cars.count === 0} label={step1.fields[4].label} searchable data={store.carStore.cars.length !== 0 ? store.carStore.getCompanyCars.cars.results.map((c: any) => ({ label: `${c.brand.name}  ${c.model.name}  ${c.number}`, value: String(c.id), })) : ['']}
              />
            </PanelForForms>
          </form>
        </PanelForForms>
      </FormProvider>
  )
}

          export default observer(FormCreateUpdateBid)
