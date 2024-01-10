import { CreateFormikInput } from "components/common/ui/CreateInput/CreateInput";
import { Form, Formik, useFormikContext } from 'formik'
import React from "react";
import * as Yup from "yup";
import "yup-phone-lite";
import Heading, { HeadingColor, HeadingVariant } from "components/common/ui/Heading/Heading";
import { useStore } from "stores/store";

const SignupSchema = Yup.object().shape({
  first_name: Yup.string()
  .min(2, 'Too Short!')
  .max(50, 'Too Long!')
  .required('Required'),
  last_name: Yup.string()
  .min(2, 'Too Short!')
  .max(50, 'Too Long!')
  .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  phone: Yup.string().required('Required'),
  group: Yup.string().required('Required'),
})
const FormModalAddUser = () => {
  const store = useStore()
  const initValues = {
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    group: '',
    is_active: true
  }
  const formData = [
    {
      label: 'Имя',
      name: 'first_name',
      type: 'text',
      placeholder: 'Фамилия',
      value: '',
      depend: false,
    },
    {
      label: 'Фамилия',
      name: 'last_name',
      placeholder: 'Имя',
      type: 'text',
      value: '',
      depend: false,
    },
    {
      label: 'E-mail',
      placeholder: 'E-mail',
      name: 'email',
      type: 'text',
      value: '',
      depend: false,
    },
    {
      label: 'Номер телефона',
      placeholder: 'Введите гос. номер',
      name: 'phone',
      type: 'text',
      value: '',
      depend: false,
    },
    {
      label: 'Группа',
      placeholder: 'Выберите группу',
      name: 'group',
      type: 'select',
      value: '',
      options: [
        { label: 'Группа 1', value: '1' },
        { label: 'Группа 2', value: '2' },
      ],
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
    }
  ]
  const FormInputs = ():JSX.Element => {
    // @ts-ignore
    return formData.map((item:any, index:number) => <CreateFormikInput key={index+'car_inputs'} value={item.value} options={item.options} fieldName={item.name}
      label={item.label}
      placeHolder={item.placeholder}
      fieldType={item.type}
      className={''} />
    )

  }
  return (
    <Formik
      initialValues={initValues}
      validationSchema={SignupSchema}

      onSubmit={(values, FormikHelpers) => {
        console.log(values);

      }}
    >
      {({
        submitForm, handleChange, isSubmitting, errors, touched, values, isValid,
      }) => (

        <Form onChange={() => store.formStore.handleChangeForm('formCreateUser', values)} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
            <Heading text={'Добавление нового сотрудника'} className={'col-span-2 !mb-0'} variant={HeadingVariant.h2} color={HeadingColor.accent}/>
            <p className={'col-span-2'}>Введите основные данные водителя</p>
            <FormInputs/>
        </Form>

      )}
    </Formik>
  )
}
export const FormModalSelectUsers = () => {
  const initValues = {
    users: '',
  }
  const formData = [
    {
      label: 'Сотрудники',
      name: 'users',
      type: 'select',
      placeholder: 'Выберите группу',
      value: '',
      options: [
        { label: 'Группа 1', value: '1' },
        { label: 'Группа 2', value: '2' },
      ],
      depend: false,
    }
  ]
  const FormInputs = ():JSX.Element => {
    const {handleChange, values} = useFormikContext()
    // @ts-ignore
    return formData.map((item:any, index:number) => <CreateFormikInput key={index+'car_inputs'} value={item.value} options={item.options} fieldName={item.name}
      label={item.label}
      placeHolder={item.placeholder}
      fieldType={item.type}
      className={''} />
    )

  }
  return (
    <Formik
      initialValues={initValues}
      validationSchema={SignupSchema}
      onSubmit={(values, FormikHelpers) => {
        console.log(values);

      }}
    >
      {({
        submitForm, handleChange, isSubmitting, errors, touched, values, isValid,
      }) => (

        <Form style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
            <Heading text={'Выбрать сотрудника из списка пользователей'} className={'!mb-0'} variant={HeadingVariant.h2} color={HeadingColor.accent}/>
            <p>Выберите пользователя</p>
            <FormInputs/>
        </Form>

      )}
    </Formik>
  )
}
export default FormModalAddUser
