import React, { useEffect, useState } from "react";
import { Form, Formik, useFormikContext } from "formik";
import * as Yup from "yup";
import "yup-phone-lite";
import {values as val} from "mobx";
import { useStore } from "stores/store";
import { useNavigate } from "react-router-dom";
import { CreateFormikInput } from "components/common/ui/CreateInput/CreateInput";
import Button, { ButtonDirectory, ButtonSizeType, ButtonVariant } from "components/common/ui/Button/Button";
import Heading, { HeadingColor, HeadingVariant } from "components/common/ui/Heading/Heading";
import { Step } from "components/common/layout/Step/Step";
import { FormCard } from "components/Form/FormCards/FormCards";
import FormModalAddUser, { FormModalSelectUsers } from "components/Form/FormModalAddUser/FormModalAddUser";
import Progress from "components/common/ui/Progress/Progress";
import { CreateField } from "components/Form/FormCreateCompany/Steps/StepSuccess";
import { observer, Observer, useAsObservableSource, useLocalObservable } from "mobx-react-lite";
import { CloseButton, InputBase, NumberInput, Select, TextInput } from "@mantine/core";
import { CAR_RADIUS, CAR_RADIUSTEXT } from "stores/priceStore";
import SelectMantine from "components/common/ui/SelectMantine/SelectMantine";
import { yupResolver } from "mantine-form-yup-resolver";
import { CreateCarSchema, CreateUserSchema } from "utils/validationSchemas";
import { UserTypeEnum } from "stores/userStore";
import PanelForForms, { PanelColor, PanelVariant } from "components/common/layout/Panel/PanelForForms";
import { createFormActions, createFormContext } from "@mantine/form";
import { CompanyType } from "stores/companyStore";
import { IMaskInput } from "react-imask";

interface CarCreateUpdate  {
    car_type:	string
    number: string
    height:number
    radius:	CAR_RADIUS
    limit:string
    is_active:boolean
    depend_on: string
    brand: number
    model: number
    employees: number[]
}
// const FormInputs = observer(():JSX.Element => {
//     const store = useStore()
//     const { values, getFieldProps, errors, setFieldValue, setValues,  getFieldHelpers,setFieldTouched, touched }:any = useFormikContext();
//   //TODO Рефактирить надо выносить из компонента
//
//     const [companies, setCompanies] = useState(store.companyStore.companies.filter(item => item.parent === null))
//     const handleChangeSubmitBrand = React.useCallback((e:any) => {
//       setFieldValue('models', null, false)
//       setFieldTouched('models', false, false)
//       e && store.carStore.setBrand(Number(e))
//     },[])
//
//     const handleChangeBrand = React.useCallback((e:any) => {
//       // setFieldValue('models', null, true)
//     },[])
//
//     const handleChangeCompany = React.useCallback((e:any) => {
//
//       if(e) {
//         setBelongTo(e)
//         setFieldValue('company_ids', null, false)
//         store.companyStore.getAllCompanies()
//         if(e === 'company') {
//           setCompanies(store.companyStore.companies.filter(item => item.parent === null))
//         } else {
//           setCompanies(store.companyStore.companies.filter(item => item.parent !== null))
//         }
//       }
//     },[])
//
//     const handleChangeCompanyId = React.useCallback((value:any) => {
//       let company = store.companyStore.getCompaniesAll.filter((item:any) => item.id == Number(value))[0];
//       setFieldValue('company_type', '', false);
//       if(value) {
//         values.company_type = company.company_type
//         values.company_ids = company.id
//       }
//
//     },[])
//
//     const[belongTo, setBelongTo] = useState('company')
//
//     return (
//       <>
//           <>
//
//               <SelectMantine
//                 name={'brand'}
//                 onOptionSubmit={handleChangeSubmitBrand}
//                 onChange={handleChangeBrand}
//                 placeholder={'Выберите марку'} label={'Марка автомобиля'}
//                 // @ts-ignore
//                 value={values.brand}
//                 className={'account-form__input w-full flex-grow  !flex-[1_0_20rem]'}
//                 data={val(store.catalogStore.carBrands).map((item:any) => ({ label: item.name, value: String(item.id) }))}
//                 searchable={true}
//                 clearable={true}
//               />
//               {/* <SelectCustom  name={'model'} */}
//               {/*   error={errors.model} */}
//               {/*   disabled={!values.brand} */}
//               {/*   placeholder={'Выберите модель'} label={'Модель'} */}
//               {/*   searchable={true} */}
//               {/*   clearable={true} */}
//               {/*   // @ts-ignore */}
//
//               {/*   value={values.model ? String(values.model) : null} onOptionSubmit={(value: string) => { */}
//               {/*       setFieldValue('model', Number(value)) */}
//
//               {/* }} */}
//               {/*    className={'account-form__input w-full flex-grow  !flex-[1_0_20rem]'} options={store.catalogStore.brandModelsCurrent} */}
//               {/* /> */}
//               <SelectMantine
//                 name={'models'}
//                 disabled={!values.brand}
//                 placeholder={'Выберите модель'} label={'Модель'}
//                 searchable
//                 clearable
//                 onChange={(value) => {
//                     setFieldTouched('models', false, false)
//                     setFieldValue('models', value, false)
//                 }}
//                  className={'account-form__input w-full flex-grow  !flex-[1_0_20rem]'}
//                 data={store.carStore.getBrandModels}
//               />
//
//
//
//
//               {/* <SelectMantine  name={'car_type'} placeholder={'Выберите тип'} data={Object.keys(CarType).map(item => ({label: item, value: item}))} label={'Тип автомобиля'} */}
//               {/*   // @ts-ignore */}
//               {/*   value={values.car_type} className={'account-form__input w-full flex-grow  !flex-[1_0_20rem]'} /> */}
//               <CreateFormikInput  fieldName={'number'}  label={'Гос. номер'}
//                 // @ts-ignore
//                 value={values.number} className={'account-form__input w-full flex-grow  !flex-[1_0_20rem]'}  fieldType={'text'} placeholder={'Введите Гос. номер'}/>
//               <CreateFormikInput  fieldName={'height'}  label={'Высота автомобиля, м'}
//                 // @ts-ignore
//                 value={values.height} className={'account-form__input w-full flex-grow  !flex-[1_0_20rem]'} fieldType={'text'}  placeholder={'Введите высоту'}/>
//               <SelectMantine  name={'radius'}   label={'Радиус колес, дюймы'}
//                 value={values.radius}   className={'account-form__input w-full flex-grow  !flex-[1_0_20rem]'} data={Array.from(Object.keys(CAR_RADIUSTEXT))}  placeholder={'Радиус колес, дюймы'}/>
//               <SelectMantine   label={'Статус'}
//
//                 value={values.is_active}
//                 className={'account-form__input w-full flex-grow  !flex-[1_0_20rem]'}  data={[
//                   { label: 'Активен', value: 'true' },
//                   { label: 'Неактивен', value: 'false' },
//               ]} placeholder={'Выбрать статус'} name={'is_active'}/>
//               <SelectMantine   label={'Город'} allowDeselect={false}
//
//                 value={values.city} disabled={store.catalogStore.cities.size === 0} className={'account-form__input w-full flex-grow  !flex-[1_0_20rem]'} data={val(store.catalogStore.cities).map((city:any) => ({label: city.name, value: String(city.id)}))} placeholder={'Выбрать город'} name={'city'}/>
//               <hr className={'col-span-full flex-[1_100%]'}/>
//           </>
//           <>
//               <React.Suspense>
//                   <SelectMantine
//                     onOptionSubmit={handleChangeCompany}
//
//                     value={values.belongs_to}  label={'Принадлежит'} defaultValue={'company'} name={'belong_to'}  className={'account-form__input w-full flex-grow  !flex-[1_0_20rem]'}  data={[
//                       { label: 'Филиал', value: 'filial' },
//                       { label: 'Компания', value: 'company' },
//                   ]} />
//                   <SelectMantine
//                     className={'account-form__input w-full flex-grow  !flex-[1_0_20rem]'}
//                     name={'company_ids'}
//                     onOptionSubmit={handleChangeCompanyId}
//                     value={(values.company_ids && typeof values.company_ids !== undefined) ? String(values.company_ids) : null}
//                     disabled={companies && companies.length === 0}
//                     label={belongTo == 'filial' ? 'Филиал' : 'Компания'}
//                     placeholder={belongTo == 'filial' ? 'Выберите филиал' : 'Выберите компанию'}
//                     data={companies && companies.map((item:any) => ({label: item.name, value: String(item.id), prop: item.company_type}))}
//                     searchable
//                   />
//               </React.Suspense>
//           </>
//       </>
//     )
// })
// const SignupSchema = Yup.object().shape({
//     brand: Yup.string().required('Обязательное поле'),
//     car_type: Yup.string().required('Обязательное поле'),
//     models: Yup.string().required('Обязательное поле'),
//     is_active: Yup.string().required('Обязательное поле'),
//     number: Yup.string().required('Обязательное поле'),
//     company_ids: Yup.string().required('Обязательное поле'),
//     radius: Yup.string().required('Обязательное поле'),
//     height: Yup.number().min(1).required('Обязательное поле'),
//     city: Yup.string().min(1).required('Обязательное поле'),
//     employees: Yup.array(),
// })
export const [FormProvider, useFormContext, useForm] = createFormContext<any>()
export const createUpdateCarActions = createFormActions<CarCreateUpdate>('createUpdateCar')

const FormCreateUpdateCar = ({ car, edit }: any) => {
    const store = useStore()
    const memoizedInitValues = React.useMemo(() => {
      let initValues:CarCreateUpdate & any = {
        brand: '',
        car_type: '',
        city: '',
        employees: [],
        height: 0,
        is_active: 'true',
        limit: '',
        models: '',
        depend_on: 'company',
        number: '',
        radius: '',
        company_ids: '',
        company_type: '',
        company_filials: '',
      }
      if(edit) {
        store.formStore.setFormDataCreateCar({
          id: car.id,
          number: car.number,
          height: car.height,
          radius: car.radius,
          city: car.city,
          company_id: car.company_id,
          company_type: car.company_type,
          is_active: car.is_active,
          brand: car.brand,
          model: car.model,
          car_type: car.car_type,
          employees: car.employees,
        })
        initValues = {
          ...initValues,
          id: car.id
        }
      }
      // if(store.formStore.formCreateCar.brand !== "0") {
      //   initValues = {
      //     ...initValues,
      //     city: store.formStore.formCreateCar.city,
      //     brand: store.formStore.formCreateCar.brand,
      //     models: store.formStore.formCreateCar.model,
      //     car_type: store.formStore.formCreateCar.car_type,
      //     number: store.formStore.formCreateCar.number,
      //     height: store.formStore.formCreateCar.height,
      //     radius: store.formStore.formCreateCar.radius,
      //     is_active: store.formStore.formCreateCar.is_active,
      //     limit: store.formStore.formCreateCar.limit,
      //     company_ids: store.formStore.formCreateCar.company_id,
      //     company_type: store.formStore.formCreateCar.company_type,
      //     employees: store.formStore.formCreateCar.employees,
      //   }
      // }
      return initValues
    }, [edit, car])
  console.log(memoizedInitValues);
  const numRegex = new RegExp("^(([АВЕКМНОРСТУХ]\d{3}(?<!000)[АВЕКМНОРСТУХ]{1,2})(\d{2,3})|(\d{4}(?<!0000)[АВЕКМНОРСТУХ]{2})(\d{2})|(\d{3}(?<!000)(C?D|[ТНМВКЕ])\d{3}(?<!000))(\d{2}(?<!00))|([ТСК][АВЕКМНОРСТУХ]{2}\d{3}(?<!000))(\d{2})|([АВЕКМНОРСТУХ]{2}\d{3}(?<!000)[АВЕКМНОРСТУХ])(\d{2})|([АВЕКМНОРСТУХ]\d{4}(?<!0000))(\d{2})|(\d{3}(?<!000)[АВЕКМНОРСТУХ])(\d{2})|(\d{4}(?<!0000)[АВЕКМНОРСТУХ])(\d{2})|([АВЕКМНОРСТУХ]{2}\d{4}(?<!0000))(\d{2})|([АВЕКМНОРСТУХ]{2}\d{3}(?<!000))(\d{2,3})|(^Т[АВЕКМНОРСТУХ]{2}\d{3}(?<!000)\d{2,3}))")
  const form = useForm({
    name: 'createUpdateCar',
    initialValues: memoizedInitValues,
    validateInputOnBlur: true,
    onValuesChange: (values, previous) => console.log(values),
    validate: yupResolver(CreateCarSchema),
    enhanceGetInputProps: (payload) => {

      return ({
        className: 'flex-grow !flex-[1_1_auto]'
      })
    },
  })
    const [step, setStep] = useState(1)
    const [animate, setAnimate] = useState(false)

    const changeStep = (step?: number) => {
        setAnimate((prevState) => !prevState)
        setTimeout(() => {
            setAnimate(false)
            setStep((prevState) => step ? step : prevState += 1)
        }, 1200)
    }
    const companyVar = React.useMemo(() => form.values.depend_on === "company" ? store.companyStore.getCompaniesAll.filter((c:any) => c.company_type === "Компания-Партнер") : store.companyStore.getFilialsAll.filter((c:any) => c.company_type === "Компания-Партнер") ,
    [form.values.depend_on])
    const navigate = useNavigate()

    const formDataSelectUsers = React.useMemo(() => {
        return store.usersStore.usersList.users.map((item:any) => ({label: item.employee.first_name + ' ' + item.employee.last_name, value: String(item.employee.id)}))
    },[store.usersStore.companyUsers])
    return (
      <FormProvider form={form}>
        <PanelForForms
          footerClassName={'px-8 pb-8 pt-2'}
          variant={PanelVariant.default}
          actionCancel={
          <><Button type={'button'}
            text={'Отменить'}
            action={(e) => {
              e.preventDefault()
              navigate(-1)
            }}
            className={'float-right'}
            variant={ButtonVariant['accent-outline']} />
          </>}
          actionNext={
            <Button type={'submit'}
              // action={handleCreateUser}
              disabled={!form.isValid()}
              text={'Сохранить'}
              className={'float-right'}
              variant={ButtonVariant.accent} />
          }
        >
          <form onSubmit={form.onSubmit((props) => console.log('form', props))}
            onReset={form.onReset}
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
                    text={'Шаг 1. Основная информация'}
                    color={HeadingColor.accent}
                    variant={HeadingVariant.h2}
                  />
                  <div className={''}>
                    Укажите основную информацию о автомобиле для добавления в список
                  </div>
                </>
              }
            >
              <Select
                label={'Марка'}
                searchable
                {...form.getInputProps('brand')}
                data={val(store.catalogStore.carBrands).map((item:any) => ({ label: item.name, value: String(item.id) }))}
                />
              <Select
                {...form.getInputProps('models')}
                placeholder={'Выберите модель'}
                label={'Модель'}
                searchable
                clearable
                className={'account-form__input w-full flex-grow  !flex-[1_0_20rem]'}
                data={store.carStore.getBrandModels}
              />




              {/* <SelectMantine  name={'car_type'} placeholder={'Выберите тип'} data={Object.keys(CarType).map(item => ({label: item, value: item}))} label={'Тип автомобиля'} */}
              {/*   // @ts-ignore */}
              {/*   value={val
                mask={"99/99/9999"}ues.car_type} className={'account-form__input w-full flex-grow  !flex-[1_0_20rem]'} /> */}
              <InputBase
                classNames={{
                input: 'uppercase'
              }}
                component={IMaskInput}
                //@ts-ignore
                {...{
                  mask: "a 000 aa 000 ", alwaysShowMask: true, formatChars: { "9": "[0-9]", "a": "[A-Za-z]", "*": "[A-Za-z0-9]" },

                }}

                //@ts-ignore
                showMask={true}
                {...form.getInputProps('number')}
                label={'Гос. номер'}
                placeholder={'А 100 ТТ 777'}/>
              <NumberInput  {...form.getInputProps('height')}
                label={'Высота автомобиля, cм'}
                hideControls

                placeholder={'Введите высоту'}/>
              <Select
                {...form.getInputProps('radius')}
                label={'Радиус колес, дюймы'}
                data={Array.from(Object.keys(CAR_RADIUSTEXT))}
                placeholder={'Радиус колес, дюймы'}
              />
              <Select
                label={'Статус'}
                defaultValue={form.values.is_active}
                {...form.getInputProps('is_active')}
                data={[
                { label: 'Активен', value: 'true' },
                { label: 'Неактивен', value: 'false' },
              ]} placeholder={'Выбрать статус'}
              />
              <Select
                {...form.getInputProps('city')}
                label={'Город'} allowDeselect={false}
                data={val(store.catalogStore.cities).filter((c:any) => c.is_active).map((o: any) => ({
                  label: o.name,
                  value: String(o.id),
                }))}
                placeholder={'Выбрать город'}
              />
              <hr className={'col-span-full flex-[1_100%]'}/>
              <Select
                onOptionSubmit={() => form.setValues({...form.values, company_id: null, group: null})}
                label={'Принадлежит'}
                {...form.getInputProps('depend_on', { dependOn: 'type' })}
                defaultValue={form.values.depend_on}
                data={[
                  { label: 'Компании', value: 'company' },
                  { label: 'Филиалы', value: 'filials' },
                ]}
              />
              <Select
                searchable
                label={'Компании'}
                {...form.getInputProps('company_id', { dependOn: 'type' })}
                onOptionSubmit={(e) => {
                  form.setValues({...form.values, group: null})
                  store.permissionStore.loadCompanyPermissionsResults(Number(e))
                }}
                data={companyVar.map((item) => ({ label: item.name, value: String(item.id) }))}
              />

            </PanelForForms>
          </form>
        </PanelForForms>
      </FormProvider>
            // <Formik initialValues={memoizedInitValues}
            //   validationSchema={SignupSchema}
            //
            //   onSubmit={(values, FormikHelpers) => {
            //
            //     // console.log(val(store.usersStore.selectedUsers).map((item:any) => item.employee.id));
            //     const data = {
            //       id: values.id,
            //       number: values.number,
            //       height: values.height,
            //       radius: values.radius,
            //       company_id: Number(values.company_ids),
            //       company_type: values.company_type,
            //       is_active: values.is_active === "true",
            //       brand: Number(values.brand),
            //       model: Number(values.models),
            //       employees: val(store.usersStore.selectedUsers).map((item: any) => item.employee.id),
            //     }
            //     if (edit) {
            //       store.formStore.setFormDataCreateCar(data)
            //       store.formStore.sendCarFormDataEdit()
            //     } else {
            //       store.formStore.setFormDataCreateCar(data)
            //       store.formStore.sendCarFormData()
            //     }
            //
            //     changeStep(3)
            //     // store.formStore.formSendDataUser('formCreateUser', data)
            //   }}>
            //   {({
            //
            //     submitForm,
            //     setSubmitting,
            //     setFieldError,
            //     handleChange,
            //     isSubmitting,
            //     errors,
            //     setValues,
            //     touched,
            //     values,
            //     status,
            //     isValid,
            //     isValidating,
            //   }) => (
            //
            //     <Form style={{ display: 'flex', gridColumn: '1/-1', borderRadius: '1.5rem', overflow: 'hidden', position: 'relative' }}
            //
            //
            //       className={'form_with_progress'}>
            //       <Progress total={3}
            //         current={step} />
            //       <Step footer={<><Button text={'Отменить'}
            //         action={() => navigate(-1)}
            //         className={'float-right lg:mb-0 mb-5'}
            //         variant={ButtonVariant['accent-outline']} />
            //         <Button type={(Object.keys(errors).length > 0) ? 'button' : 'text'}
            //           disabled={Object.keys(errors).length > 0}
            //           text={'Дальше'}
            //           action={() => {
            //             store.formStore.setFormDataCreateCar({
            //               id: store.formStore.formCreateCar.id,
            //               number: values.number,
            //               height: values.height,
            //               radius: values.radius,
            //               company_id: Number(values.company_ids),
            //               company_type: values.company_type,
            //               is_active: values.is_active === "true",
            //               brand: Number(values.brand),
            //               model: Number(values.models),
            //               employees: val(store.usersStore.selectedUsers).map((item: any) => item.employee.id),
            //             });
            //
            //             changeStep();
            //           }}
            //           className={'float-right'}
            //           variant={ButtonVariant.accent} /></>}
            //         header={<><Heading text={'Шаг 1. Основная информация'}
            //           color={HeadingColor.accent}
            //           variant={HeadingVariant.h2} />
            //           <div className={'text-base'}>Укажите основную информацию о компании для добавления ее в список</div>
            //         </>}
            //         step={step}
            //         animate={animate}
            //         action1={() => void null}
            //         stepIndex={1}>
            //         <FormInputs />
            //       </Step>
            //       <Step footer={<>
            //         <Button text={'Назад'}
            //           action={() => changeStep(1)}
            //           className={'float-right lg:mb-0 mb-5'}
            //           variant={ButtonVariant['accent-outline']} />
            //         <Button text={'Отменить'}
            //           action={() => navigate(-1)}
            //           className={'float-right lg:mb-0 mb-5'}
            //           variant={ButtonVariant['accent-outline']} />
            //         <Observer children={() => <Button type={'submit'}
            //           disabled={!isValid || store.usersStore.selectedUsers.size === 0}
            //           text={'Дальше'}
            //
            //           // .then((r:any) => console.log('result', r))
            //           // .catch(errors => console.log('errors', errors))
            //           // }/* action={() => console.log(values)} *//* action={() => console.log(values)} */
            //           className={'float-right'}
            //           variant={ButtonVariant.accent} />} /></>}
            //         header={<><Heading text={'Шаг 2. Добавьте сотрудников для автомобиля'}
            //           color={HeadingColor.accent}
            //           variant={HeadingVariant.h2} />
            //           <div className={'text-base'}>Вы можете добавить или выбрать сотрудника из списка зарегистрированных пользователей</div>
            //         </>}
            //         step={step}
            //         animate={animate}
            //         action={() => void null}
            //         action1={() => void null}
            //         stepIndex={2}>
            //
            //
            //         <Observer children={(): any =>
            //           //@ts-ignore
            //           <div className={'asd order-2 flex-[1_100%]'}><Heading text={'Добавленные:'}
            //             variant={HeadingVariant.h4} />
            //             <div className={'grid grid-cols-3 gap-6'}>  {store.usersStore.selectedUsers.size > 0 && store.usersStore.selectedUsers.toJSON().map((el: any) => {
            //               return <FormCard actions={null}
            //                 className={'relative'}
            //                 title={el[1].employee.first_name}
            //                 children={<><CloseButton style={{ position: "absolute", right: '1rem', top: '1rem' }}
            //                   onClick={() => {
            //
            //                     store.usersStore.removeFromSelectedUsers(el[1].employee.id)
            //                   }} />
            //                   <div className={'text-xs -mt-3 pb-4 uppercase text-gray-2'}>{el[1].group.name}</div>
            //                   <ul>
            //                     <li>{el[1].employee.phone}</li>
            //                     <li>{el[1].employee.email}</li>
            //                   </ul>
            //                   <div> {el[1].employee.is_active ? <span className={'text-accent  mt-5 block'}>Активен</span> : <span className={'text-red-500 mt-5 block'}>Не активен</span>}</div>
            //                 </>}
            //                 titleColor={HeadingColor.accent}
            //                 titleVariant={HeadingVariant.h5} />
            //             })}</div>
            //           </div>} />
            //         <Observer children={() => <FormCard title={"Добавить нового сотрудника"}
            //           titleColor={HeadingColor.accent}
            //           titleVariant={HeadingVariant.h4}
            //           actions={<Button text={"Добавить сотрудника"}
            //             size={ButtonSizeType.sm}
            //             variant={ButtonVariant.accent}
            //             directory={ButtonDirectory.directory}
            //             action={async () => {
            //               store.appStore.setModal({
            //                 className: "!px-10 gap-4 !justify-stretch",
            //                 component: <FormModalAddUser group={await store.permissionStore.loadCompanyPermissions(Number(values.company_ids))}
            //                   company_id={Number(values.company_ids)} />,
            //                 text: `Вы уверены, что хотите удалить ${"name"}`,
            //                 state: true
            //               });
            //             }} />} />} />
            //
            //         <FormCard title={"Выбрать сотрудника из зарегистрированных пользователей"}
            //           titleColor={HeadingColor.accent}
            //           titleVariant={HeadingVariant.h4}
            //           actions={<Button text={"Выбрать сотрудника"}
            //             size={ButtonSizeType.sm}
            //             variant={ButtonVariant.accent}
            //             directory={ButtonDirectory.directory}
            //             action={(values) => {
            //
            //               store.appStore.setModal({
            //                 className: '!px-10 gap-4 !justify-stretch grid-cols-1',
            //                 component: (
            //                   <FormModalSelectUsers company_id={Number(values.company_ids)}
            //                     users={formDataSelectUsers} />
            //                 ),
            //
            //                 text: `Вы уверены, что хотите удалить ${'name'}`,
            //                 state: true,
            //               })
            //             }} />} />
            //       </Step>
            //       <Step footer={<>
            //         <Button text={"Отменить"}
            //           action={() => navigate(-1)}
            //           className={"float-right lg:mb-0 mb-5"}
            //           variant={ButtonVariant["accent-outline"]} />
            //         <Button text={"Завершить"}
            //           action={() => {
            //             navigate('/account/cars')
            //           }} /* action={() => console.log(values)} */
            //           className={"float-right"}
            //           variant={ButtonVariant.accent} />
            //       </>}
            //         header={<>
            //           <Heading text={"Шаг 3. Автомобиль зарегистрирован"}
            //             color={HeadingColor.accent}
            //             variant={HeadingVariant.h2} />
            //           <div className={"text-base"}>Вы можете добавить лимиты для зарегистрированного автомобиля или добавить их позже в соответствующем разделе</div>
            //         </>}
            //         step={step}
            //         animate={animate}
            //         action={() => void null}
            //         action1={() => void null}
            //         stepIndex={3}>
            //         <CreateField title={"Создать прайс-лист"} />
            //       </Step>
            //
            //     </Form>
            //
            //   )}
            // </Formik>
            )
            }

            export default FormCreateUpdateCar
