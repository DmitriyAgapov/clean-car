import React, { useEffect, useState } from "react";
import { Form, Formik, useFormikContext } from "formik";
import * as Yup from "yup";
import "yup-phone-lite";
import { useStore } from "stores/store";
import { useNavigate, useParams } from "react-router-dom";
import { CreateFormikInput } from "components/common/ui/CreateInput/CreateInput";
import SelectCustom from "components/common/ui/Select/Select";
import Button, { ButtonDirectory, ButtonSizeType, ButtonVariant } from "components/common/ui/Button/Button";
import {  CarType } from "stores/carStore";
import Heading, { HeadingColor, HeadingVariant } from "components/common/ui/Heading/Heading";
import { Step } from "components/common/layout/Step/Step";
import { FormCard } from "components/Form/FormCards/FormCards";
import FormModalAddUser, { FormModalSelectUsers } from "components/Form/FormModalAddUser/FormModalAddUser";
import Progress from "components/common/ui/Progress/Progress";
import { CreateField } from 'components/Form/FormCreateCompany/Steps/StepSuccess'
import { observer, Observer } from "mobx-react-lite";
import InputAutocomplete from 'components/common/ui/InputAutocomplete/InputAutocomplete'
import { Select } from '@mantine/core'
import { toJS } from "mobx";
import logo from "components/common/layout/Logo/Logo";

type CarCreateUpdate = {
    car_type:	string
    number: string
    height:number
    radius:	number
    limit:string
    is_active:boolean
    brand: number
    model: number
    employees: number[]
}

const SignupSchema = Yup.object().shape({
    brand: Yup.string().required('Обязательное поле'),
    model: Yup.string().required('Обязательное поле'),
    number: Yup.string().required('Обязательное поле'),
    radius: Yup.string().required('Обязательное поле'),
    city: Yup.string().required('Обязательное поле'),
})
const FormCreateCar = ({ user, edit }: any) => {
    type carBrandModels = {

    };
    let initValues:CarCreateUpdate & any = {
        brand: 0,
        car_type: '',
        employees: [],
        height: 0,
        is_active: false,
        limit: '',
        model: 0,
        number: '',
        radius: 0,
        carModels: [],
        company_id: '',
        company_type: '',
        company_filials: '',
    }

    const store = useStore()

    const [step, setStep] = useState(1)
    const carTypes = Object.keys(CarType).map((item:any) => ({ label: item, value: item }))

    const [animate, setAnimate] = useState(false)
    const [model, setModel] = useState<any>([])
    const formData = [
        {
            label: 'Тип автомобиля',
            placeholder: 'Выберите тип',
            name: 'car_type',
            type: 'select',
            value: '',
            options: carTypes,
            depend: false,
        },
        {
            label: 'Гос. номер',
            placeholder: 'Введите гос. номер',
            name: 'number',
            type: 'text',
            value: '',
            options: [],
            depend: false,
        },
        {
            label: 'Высота автомобиля, м',
            placeholder: 'Введите высоту автомобиля',
            name: 'height',
            type: 'text',
            value: '',
            depend: false,
        },
        {
            label: 'Радиус колес, дюймы',
            placeholder: 'Введите высоту',
            name: 'radius',
            type: 'text',
            value: '',
            depend: false,
        },
        {
            label: 'Статус',
            placeholder: 'Выбрать статус',
            name: 'status',
            type: 'select',
            options: [
                { label: 'Активен', value: 'true' },
                { label: 'Неактивен', value: 'false' },
            ],
            value: '',
            depend: false,
        },
        {
            label: 'Город',
            placeholder: 'Выбрать город',
            name: 'city',
            type: 'select',
            options: [{ label: 'Москва', value: '16254' }],
            value: '',
            depend: false,
        },
        {
          type: 'divider'
        },
        {
            label: 'Принадлежит',
            placeholder: 'Выбрать компанию',
            name: 'belong_to',
            type: 'select',
            options: [
                { label: 'Филиалу', value: 'filial' },
                { label: 'Компании', value: 'company' },
            ],
            value: '',
            depend: false,
        },
        {
            label: 'Филиал',
            placeholder: 'Выбрать филиал',
            name: 'status',
            type: 'select',
            options: [
                { label: 'Филиал', value: '1625' },
                { label: 'Филиал2', value: '16252' },
            ],
            value: '',
            depend: true,
        },
    ]
    const FormInputs = observer(():JSX.Element => {
        const { values,errors, setFieldValue, setValues, getFieldHelpers } = useFormikContext();
        const [companies, setCompanies] = useState(store.companyStore.companies)
        const handleChangeBrand = (e:any) => {
            store.catalogStore.clearBrandModels()
        }
        const[belongTo, setBelongTo] = useState('company')
        useEffect(() => {
            console.log(values);
            console.log(errors);
            console.log(store.catalogStore.cities);
        }, [values, errors])

        // @ts-ignore
        // @ts-ignore
        return (
          <>
        <>
          <SelectCustom name={'brand'}
            action={handleChangeBrand}
         placeholder={'Выберите марку'} label={'Марка автомобиля'}
            // @ts-ignore
            value={values.brand} className={'account-form__input w-full flex-grow  !flex-[1_0_20rem]'} options={store.catalogStore.carBrands.map((item:any) => ({ label: item.name, value: String(item.id) }))}/>
          <SelectCustom  name={'model'} disabled={store.catalogStore.brandModels.length == 0} placeholder={'Выберите модель'} label={'Модель'}
            // @ts-ignore
            value={values.model} className={'account-form__input w-full flex-grow  !flex-[1_0_20rem]'} options={store.catalogStore.brandModels}/>
            <SelectCustom  name={'car_type'} placeholder={'Выберите тип'} options={Object.keys(CarType).map(item => ({label: item, value: item}))} label={'Тип автомобиля'}
            // @ts-ignore
            value={values.car_type} className={'account-form__input w-full flex-grow  !flex-[1_0_20rem]'} />
            <CreateFormikInput  fieldName={'number'}  label={'Гос. номер'}
            // @ts-ignore
            value={values.number} className={'account-form__input w-full flex-grow  !flex-[1_0_20rem]'}  fieldType={'text'} placeHolder={'Введите Гос. номер'}/>
            <CreateFormikInput  fieldName={'height'}  label={'Высота автомобиля, м'}
            // @ts-ignore
            value={values.height} className={'account-form__input w-full flex-grow  !flex-[1_0_20rem]'} fieldType={'text'} placeHolder={'Введите высоту'}/>
            <CreateFormikInput  fieldName={'radius'}  label={'Радиус колес, дюймы'}
            // @ts-ignore
            value={values.radius} className={'account-form__input w-full flex-grow  !flex-[1_0_20rem]'} fieldType={'text'} placeHolder={'Радиус колес, дюймы'}/>
            <SelectCustom   label={'Статус'}
            // @ts-ignore
            value={values.status} className={'account-form__input w-full flex-grow  !flex-[1_0_20rem]'} fieldType={'select'} options={[
                { label: 'Активен', value: 'true' },
                { label: 'Неактивен', value: 'false' },
            ]} placeHolder={'Выбрать статус'} name={'status'}/>
            <SelectCustom   label={'Город'}
            // @ts-ignore
            value={values.city} disabled={store.catalogStore.cities.length === 0} className={'account-form__input w-full flex-grow  !flex-[1_0_20rem]'} fieldType={'select'} options={store.catalogStore.cities.map((city:any) => ({label: city.name, value: String(city.id)}))} placeHolder={'Выбрать статус'} name={'city'}/>
            <hr className={'col-span-full flex-[1_100%]'}/>
        </>
        <>
            <React.Suspense>
                <SelectCustom
                  action={(e:any) => {
                      setBelongTo(e)
                      store.companyStore.getAllCompanies()
                      if(e === 'company') {
                          console.log('company');
                          // @ts-ignore
                          setCompanies(store.companyStore.companies.filter(item => item.parent === null))
                      } else {
                          // @ts-ignore
                          setCompanies(store.companyStore.companies.filter(item => item.parent !== null))
                      }
                  }}
                  // @ts-ignore
                  value={values.belongs_to}  label={'Принадлежит'} defaultValue={'company'} name={'belong_to'}  className={'account-form__input w-full flex-grow  !flex-[1_0_20rem]'} fieldType={'select'} options={[
                    { label: 'Филиал', value: 'filial' },
                    { label: 'Компания', value: 'company' },
                ]} />
                <SelectCustom
                  className={'account-form__input w-full flex-grow  !flex-[1_0_20rem]'}
                  name={'company_id'}
                  action={(e:any) => // @ts-ignore
                      values.company_type = companies.filter((item: any) => item.id == Number(e))[0].company_type}
                  // @ts-ignore
                  disabled={companies && companies.length === 0}
                  label={belongTo == 'filial' ? 'Филиал' : 'Компания'}
                  placeholder={belongTo == 'filial' ? 'Выберите филиал' : 'Выберите компанию'}
                  // @ts-ignore
                  options={companies && companies.map((item:any) => ({label: item.name, value: String(item.id), prop: item.company_type}))}
                  searchable
                />
            </React.Suspense>
        </>
        </>
        )
    })

    const changeStep = (step?: number) => {
        setAnimate((prevState) => !prevState)
        setTimeout(() => {
            setAnimate(false)
            setStep((prevState) => prevState += 1)
        }, 1200)
    }

    const navigate = useNavigate()

    return (
        <Formik
            initialValues={initValues}
            validationSchema={SignupSchema}
            onSubmit={(values, FormikHelpers) => {
                const data = {
                    car_type: values.car_type,
                    number: values.number,
                    radius: values.radius,
                    limit: values.limit,
                    company_id: values.company_id,
                    company_type: values.company_type,
                    is_active: values.is_active,
                    brand: values.brand,
                    model: values.model,
                    employees: values.employees[0]
                }
                store.formStore.setFormData('formCreateCar', data)
                store.formStore.formSendDataUser('formCreateUser', data)
                console.log(store.formStore.getFormData('formCreateCar'));
            }}
        >
            {({
                submitForm,
                setSubmitting,
                setFieldError,
                handleChange,
                isSubmitting,
                errors,
                setValues,
                touched,
                values,
                status,
                isValid,
                isValidating,
            }) => (

                    <Form style={{ display: 'flex', gridColumn: '1/-1', borderRadius: '1.5rem', overflow: 'hidden', position: 'relative' }}
                      className={'form_with_progress'}>
                        <Progress total={3} current={step}/>
                        <Step

                          footer={<><Button text={'Отменить'} action={() => navigate(-1)} className={'float-right lg:mb-0 mb-5'} variant={ButtonVariant['accent-outline']} />
                              <Button type={(Object.keys(errors).length > 0)   ? 'button' : 'text'} disabled={Object.keys(errors).length > 0}  text={'Дальше'}
                                // @ts-ignore
                                // @ts-ignore
                                onClick={() => changeStep()}/* action={() => console.log(values)} */ className={'float-right'} variant={ButtonVariant.accent} /></>}
                          header={<><Heading text={'Шаг 1. Основная информация'} color={HeadingColor.accent} variant={HeadingVariant.h2} /><div className={'text-base'}>Укажите основную информацию о компании для добавления ее в список</div></>}
                          step={step} animate={animate}   action={(e:any) => setModel(e)} action1={() => void null} stepIndex={1}>
                            <FormInputs />
                        </Step>
                        <Step footer={<><Button text={'Отменить'} action={() => navigate(-1)} className={'float-right lg:mb-0 mb-5'} variant={ButtonVariant['accent-outline']} /><Button type={'submit'} disabled={!isValid} text={'Дальше'}
                          action={() => submitForm()
                          .then((r:any) => console.log('result', r))
                          .catch(errors => console.log('errors', errors))
                          }/* action={() => console.log(values)} *//* action={() => console.log(values)} */ className={'float-right'} variant={ButtonVariant.accent} /></>}
                          header={<><Heading text={'Шаг 2. Добавьте сотрудников для автомобиля'} color={HeadingColor.accent} variant={HeadingVariant.h2} /><div className={'text-base'}>Вы можете добавить или выбрать сотрудника из списка зарегистрированных пользователей</div></>}
                          step={step} animate={animate} action={() => void null} action1={() => void null} stepIndex={2}>
                            <FormCard title={'Добавить нового сотрудника'}
                              titleColor={HeadingColor.accent}
                              titleVariant={HeadingVariant.h4}
                              actions={<Button text={'Добавить сотрудника'}
                                size={ButtonSizeType.sm}
                                variant={ButtonVariant.accent}
                                directory={ButtonDirectory.directory}
                                action={async () => {
                                    store.appStore.setModal({
                                        className: '!px-10 gap-4 !justify-stretch',
                                        component: <FormModalAddUser />,
                                        actions: [
                                            <Button text={'Отменить'}
                                              action={() => store.appStore.closeModal()}
                                              variant={ButtonVariant["accent-outline"]}
                                              className={'max-w-fit'} />,
                                            <Button text={'Добавить сотрудника'}
                                              action={async () => {
                                                  store.formStore.getFormData('formCreateUser')
                                              }}
                                              // action={async () => {
                                              //     store.
                                              // }}
                                              variant={ButtonVariant.accent} />,
                                        ],
                                        text: `Вы уверены, что хотите удалить ${'name'}`,
                                        state: true,
                                    })
                                }} />} />

                            <FormCard title={'Выбрать сотрудника из зарегистрированных пользователей'}
                              titleColor={HeadingColor.accent}
                              titleVariant={HeadingVariant.h4}
                              actions={<Button text={'Выбрать сотрудника'}
                                size={ButtonSizeType.sm}
                                variant={ButtonVariant.accent}
                                directory={ButtonDirectory.directory}
                                action={async () => {
                                    store.appStore.setModal({
                                        className: '!px-10 gap-4 !justify-stretch grid-cols-1',
                                        component: <FormModalSelectUsers />,
                                        actions: [
                                            <Button text={'Отменить'}
                                              action={() => store.appStore.closeModal()}
                                              variant={ButtonVariant["accent-outline"]}
                                              className={'max-w-fit'} />,
                                            <Button text={'Добавить сотрудника'}
                                              action={async () => {
                                                  store.permissionStore.deletePermissionStore(12).then(() => {
                                                      store.appStore.closeModal()
                                                      navigate('/account/groups', { replace: false })
                                                  })
                                              }}
                                              variant={ButtonVariant.accent} />,
                                        ],
                                        text: `Вы уверены, что хотите удалить ${'name'}`,
                                        state: true,
                                    })
                                }} />} />
                        </Step>

                        <Step footer={<>
                            <Button text={'Отменить'}
                              action={() => navigate(-1)}
                              className={'float-right lg:mb-0 mb-5'}
                              variant={ButtonVariant['accent-outline']} />
                            <Button text={'Дальше'}
                              action={() => changeStep()}/* action={() => console.log(values)} */
                              className={'float-right'}
                              variant={ButtonVariant.accent} />
                        </>}
                          header={<>
                              <Heading text={'Шаг 3. Автомобиль зарегистрирован'}
                                color={HeadingColor.accent}
                                variant={HeadingVariant.h2} />
                              <div className={'text-base'}>Вы можете добавить лимиты для зарегистрированного автомобиля или добавить их позже в соответствующем разделе</div>
                          </>}
                          step={step}
                          animate={animate}
                          action={() => void null}
                          action1={() => void null}
                          stepIndex={3}>
                            <CreateField title={'Создать прайс-лист'}/>
                        </Step>

                    </Form>

            )}
        </Formik>
    )
}

export default FormCreateCar
