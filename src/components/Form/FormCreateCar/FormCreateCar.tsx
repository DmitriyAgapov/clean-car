import React, { useState } from "react";
import { Form, Formik, useFormikContext } from "formik";
import * as Yup from "yup";
import "yup-phone-lite";
import {values as val} from "mobx";
import { useStore } from "stores/store";
import { useNavigate } from "react-router-dom";
import { CreateFormikInput } from "components/common/ui/CreateInput/CreateInput";
import SelectCustom from "components/common/ui/Select/Select";
import Button, { ButtonDirectory, ButtonSizeType, ButtonVariant } from "components/common/ui/Button/Button";
import { CarType } from "stores/carStore";
import Heading, { HeadingColor, HeadingVariant } from "components/common/ui/Heading/Heading";
import { Step } from "components/common/layout/Step/Step";
import { FormCard } from "components/Form/FormCards/FormCards";
import FormModalAddUser, { FormModalSelectUsers } from "components/Form/FormModalAddUser/FormModalAddUser";
import Progress from "components/common/ui/Progress/Progress";
import { CreateField } from "components/Form/FormCreateCompany/Steps/StepSuccess";
import { observer, Observer } from "mobx-react-lite";
import { CloseButton, Select } from "@mantine/core";

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
const FormInputs = observer(():JSX.Element => {
    const store = useStore()
    const { values, errors, setFieldValue, setValues, getFieldHelpers, touched }:any = useFormikContext();
    const [companies, setCompanies] = useState(store.companyStore.companies)
    const handleChangeBrand = React.useCallback((e:any) => {
        store.catalogStore.clearBrandModels()
        values.model = null;
    },[])
    const[belongTo, setBelongTo] = useState('company')
    return (
      <>
          <>
              <SelectCustom name={'brand'}
                action={handleChangeBrand}
                placeholder={'Выберите марку'} label={'Марка автомобиля'}
                // @ts-ignore
                value={values.brand} className={'account-form__input w-full flex-grow  !flex-[1_0_20rem]'} options={val(store.catalogStore.carBrands).map((item:any) => ({ label: item.name, value: String(item.id) }))}/>
              <SelectCustom  name={'model'}  disabled={store.catalogStore.brandModelsCurrent.length == 0} placeholder={'Выберите модель'} label={'Модель'}
                // @ts-ignore
                onLoadedData={(data) => console.log('data', data)}
                value={String(values.model)} onOptionSubmit={(value: string) => setFieldValue('model', Number(value))}
                 className={'account-form__input w-full flex-grow  !flex-[1_0_20rem]'} options={store.catalogStore.brandModelsCurrent}/>
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
                value={values.city} disabled={store.catalogStore.cities.size === 0} className={'account-form__input w-full flex-grow  !flex-[1_0_20rem]'} fieldType={'select'} options={val(store.catalogStore.cities).map((city:any) => ({label: city.name, value: String(city.id)}))} placeHolder={'Выбрать статус'} name={'city'}/>
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
                  <Select
                    className={'account-form__input w-full flex-grow  !flex-[1_0_20rem]'}
                    name={'company_id'}
                    // @ts-ignore
                    onChange={(e:any) => setValues({...values, company_id: e, company_type: companies.filter((item:any) => item.id == e).company_type})}
                    // @ts-ignore
                    onOptionSubmit={(e:any) => {
                        // @ts-ignore
                        setValues({...values, company_id: e.value, company_type: companies.filter((item:any) => item.id == e).company_type, company_data: companies.filter((item:any) => item.id == e)})
                    }}
                    // @ts-ignore
                    value={values.company_id}
                    disabled={companies && companies.length === 0}
                    label={belongTo == 'filial' ? 'Филиал' : 'Компания'}
                    placeholder={belongTo == 'filial' ? 'Выберите филиал' : 'Выберите компанию'}
                    // @ts-ignore
                    data={companies && companies.map((item:any) => ({label: item.name, value: String(item.id), prop: item.company_type}))}
                    searchable
                  />
              </React.Suspense>
          </>
      </>
    )
})
const SignupSchema = Yup.object().shape({
    brand: Yup.string().required('Обязательное поле'),
    model: Yup.string().required('Обязательное поле'),
    number: Yup.string().required('Обязательное поле'),
    radius: Yup.string().required('Обязательное поле'),
    city: Yup.string().required('Обязательное поле'),
})
const FormCreateCar = ({ user, edit }: any) => {

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
    if(store.formStore.formCreateCar.brand !== "0") {
        initValues = {
            ...initValues,
            city: store.formStore.formCreateCar.city,
            brand: store.formStore.formCreateCar.brand,
            model: store.formStore.formCreateCar.model,
            car_type: store.formStore.formCreateCar.car_type,
            number: store.formStore.formCreateCar.number,
            height: store.formStore.formCreateCar.height,
            radius: store.formStore.formCreateCar.radius,
            status: store.formStore.formCreateCar.status,
            is_active: store.formStore.formCreateCar.is_active,
            limit: store.formStore.formCreateCar.limit,
            company_id: store.formStore.formCreateCar.company_id,
            company_type: store.formStore.formCreateCar.company_type,
            employees: store.formStore.formCreateCar.employees,
        }
    }
    const [step, setStep] = useState(1)
    const carTypes = Object.keys(CarType).map((item:any) => ({ label: item, value: item }))

    const [animate, setAnimate] = useState(false)
    const [model, setModel] = useState<any>([])

    const changeStep = (step?: number) => {
        setAnimate((prevState) => !prevState)
        setTimeout(() => {
            setAnimate(false)
            setStep((prevState) => step ? step : prevState += 1)
        }, 1200)
    }

    const navigate = useNavigate()

    const formDataSelectUsers = React.useMemo(() => {

        return store.usersStore.usersList.users.map((item:any) => ({label: item.employee.first_name + ' ' + item.employee.last_name, value: String(item.employee.id)}))
    },[store.usersStore.companyUsers])

    return (

        <Formik
            initialValues={initValues}
            validationSchema={SignupSchema}
            onSubmit={(values, FormikHelpers) => {
                console.log(val(store.usersStore.selectedUsers).map((item:any) => item.employee.id));
                const data = {
                    car_type: values.car_type,
                    number: values.number,
                    radius: Number(values.radius),
                    limit: values.limit,
                    company_id: Number(values.company_id),
                    company_type: values.company_type,
                    is_active: values.is_active,
                    brand: Number(values.brand),
                    model: Number(values.model),
                    employees: val(store.usersStore.selectedUsers).map((item:any) => item.employee.id),
                }


                store.formStore.setFormDataCreateCar(data)
                store.formStore.sendCarFormData()
                changeStep(2)
                // store.formStore.formSendDataUser('formCreateUser', data)
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

                          footer={<>

                              <Button text={'Отменить'} action={() => navigate(-1)} className={'float-right lg:mb-0 mb-5'} variant={ButtonVariant['accent-outline']} />
                              <Button type={(Object.keys(errors).length > 0)   ? 'button' : 'text'} disabled={Object.keys(errors).length > 0}  text={'Дальше'}

                                action={() => {
                                    console.log(values);
                                    store.formStore.setFormDataCreateCar(values)
                                    changeStep()
                                }}/* action={() => console.log(values)} */ className={'float-right'} variant={ButtonVariant.accent} /></>}
                          header={<><Heading text={'Шаг 1. Основная информация'} color={HeadingColor.accent} variant={HeadingVariant.h2} /><div className={'text-base'}>Укажите основную информацию о компании для добавления ее в список</div></>}
                          step={step} animate={animate}
                          action={(e:any) => setModel(e)} action1={() => void null} stepIndex={1}>
                            <FormInputs />
                        </Step>
                        <Step footer={<>
                            <Button text={'Назад'} action={() =>  changeStep(1)} className={'float-right lg:mb-0 mb-5'} variant={ButtonVariant['accent-outline']} />
                            <Button text={'Отменить'} action={() => navigate(-1)} className={'float-right lg:mb-0 mb-5'} variant={ButtonVariant['accent-outline']} />
                            <Button type={'submit'} disabled={!isValid} text={'Дальше'}
                          action={() => submitForm()
                          .then((r:any) => console.log('result', r))
                          .catch(errors => console.log('errors', errors))
                          }/* action={() => console.log(values)} *//* action={() => console.log(values)} */ className={'float-right'} variant={ButtonVariant.accent} /></>}
                          header={<><Heading text={'Шаг 2. Добавьте сотрудников для автомобиля'} color={HeadingColor.accent} variant={HeadingVariant.h2} /><div className={'text-base'}>Вы можете добавить или выбрать сотрудника из списка зарегистрированных пользователей</div></>}
                          step={step} animate={animate} action={() => void null} action1={() => void null} stepIndex={2}>


                            <Observer children={():any =>
                              //@ts-ignore
                              <div className={'asd order-2 flex-[1_100%]'}><Heading text={'Добавленные:'} variant={HeadingVariant.h4}/>  <div className={'grid grid-cols-3 gap-6'}>  {store.usersStore.selectedUsers.size > 0 && store.usersStore.selectedUsers.toJSON().map((el: any) => {
                                  return <FormCard actions={null} className={'relative'} title={el[1].employee.first_name}  children={<><CloseButton style={{position: "absolute", right: '1rem', top: '1rem'}} onClick={() => {

                                      store.usersStore.removeFromSelectedUsers(el[1].employee.id)
                                  }}/><div className={'text-xs -mt-3 pb-4 uppercase text-gray-2'}>{el[1].group.name}</div><ul>
                                      <li>{el[1].employee.phone}</li>
                                      <li>{el[1].employee.email}</li>
                                  </ul><div> {el[1].employee.is_active ? <span className={'text-accent  mt-5 block'}>Активен</span> : <span className={'text-red-500 mt-5 block'}>Не активен</span> }</div></>} titleColor={HeadingColor.accent}
                              titleVariant={HeadingVariant.h5}  />})}</div></div>} />
                            <Observer children={() => <FormCard title={"Добавить нового сотрудника"}
                          titleColor={HeadingColor.accent}
                          titleVariant={HeadingVariant.h4}
                          actions={<Button text={"Добавить сотрудника"}
                            size={ButtonSizeType.sm}
                            variant={ButtonVariant.accent}
                            directory={ButtonDirectory.directory}
                            action={async () => {
                                store.appStore.setModal({
                                    className: "!px-10 gap-4 !justify-stretch",
                                    component: <FormModalAddUser  group={await store.permissionStore.loadCompanyPermissions(Number(values.company_id))} company_id={Number(values.company_id)}/>,
                                    text: `Вы уверены, что хотите удалить ${"name"}`,
                                    state: true
                                });
                            }} />} />} />

                            <FormCard title={"Выбрать сотрудника из зарегистрированных пользователей"}
                              titleColor={HeadingColor.accent}
                              titleVariant={HeadingVariant.h4}
                              actions={<Button text={"Выбрать сотрудника"}
                                size={ButtonSizeType.sm}
                                variant={ButtonVariant.accent}
                                directory={ButtonDirectory.directory}
                                action={(values) => {
                                    console.log(values);
                                    store.appStore.setModal({
                                        className: '!px-10 gap-4 !justify-stretch grid-cols-1',
                                        component: (
                                            <FormModalSelectUsers
                                                company_id={Number(values.company_id)}
                                                users={formDataSelectUsers}
                                            />
                                        ),

                                        text: `Вы уверены, что хотите удалить ${'name'}`,
                                        state: true,
                                    })
                                }} />} />
                        </Step><Step footer={<>
                        <Button text={"Отменить"}
                          action={() => navigate(-1)}
                          className={"float-right lg:mb-0 mb-5"}
                          variant={ButtonVariant["accent-outline"]} />
                        <Button text={"Дальше"}
                          action={() => {
                              console.log(isValid);
                              changeStep();
                          }} /* action={() => console.log(values)} */
                          className={"float-right"}
                          variant={ButtonVariant.accent} />
                    </>}
                      header={<>
                          <Heading text={"Шаг 3. Автомобиль зарегистрирован"}
                            color={HeadingColor.accent}
                            variant={HeadingVariant.h2} />
                          <div className={"text-base"}>Вы можете добавить лимиты для зарегистрированного автомобиля или добавить их позже в соответствующем разделе</div>
                      </>}
                      step={step}
                      animate={animate}
                      action={() => void null}
                      action1={() => void null}
                      stepIndex={3}>
                        <CreateField title={"Создать прайс-лист"} />
                    </Step>

                    </Form>

            )}
        </Formik>
    )
}

export default FormCreateCar
