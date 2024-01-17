import { CreateFormikInput } from "components/common/ui/CreateInput/CreateInput";
import { Form, Formik, useFormikContext } from 'formik'
import React, { useEffect } from "react";
import * as Yup from "yup";
import "yup-phone-lite";
import Heading, { HeadingColor, HeadingVariant } from "components/common/ui/Heading/Heading";
import { useStore } from "stores/store";
import { MultiSelect, Select } from "@mantine/core";
import logo from "components/common/layout/Logo/Logo";
import { observer } from "mobx-react-lite";

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
const FormInputs = ():JSX.Element => {
  const store = useStore()
  const {handleChange, values} = useFormikContext()
  console.log(values);
  // @ts-ignore
  return formData.map((item:any, index:number) => <CreateFormikInput key={index+'car_inputs'} value={values[item.name]} options={item.options} fieldName={item.name}
    label={item.label}
    placeHolder={item.placeholder}
    fieldType={item.type}
    className={''} />
  )

}
export const FormModalSelectUsers = ({company_id, users}: {company_id: any, users: any}) => {
  const {usersStore} = useStore()
  const {errors, users: userData, selectedUsers, loading} = usersStore.usersList
  useEffect(() => {
    console.log('users', userData);
    console.log('errors', errors);
    console.log('selectedUsers', selectedUsers);
    console.log('loading', loading);
  }, [userData, selectedUsers, loading])
  usersStore.getUsers(company_id)
  console.log('users', users);
  console.log(usersStore.companyUsers);
  const initValues = {
    users: '' || [''],
  }
  const formData = [
    {
      label: 'Сотрудники',
      name: 'users',
      type: 'select',
      placeholder: 'Выберите группу',
      value: '',
      options: usersStore.companyUsers.map((item: any) => ({label: item.employee.first_name + ' ' + item.employee.last_name, value: String(item.employee.id)}))
    }
  ]


  const store = useStore()
  return (
    <Formik
      initialValues={initValues}
      validationSchema={SignupSchema}
      onSubmit={(values, FormikHelpers) => {
        console.log(values);

      }}
    >
      {({
        setValues,  submitForm, handleChange, isSubmitting, errors, touched, values, isValid,
      }) => (

        <Form style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
            <Heading text={'Выбрать сотрудника из списка пользователей'} className={'!mb-0'} variant={HeadingVariant.h2} color={HeadingColor.accent}/>
            <p>Выберите пользователя</p>
            <MultiSelect
              data={usersStore.companyUsers.map((item: any) => ({label: item.employee.first_name + ' ' + item.employee.last_name, value: String(item.employee.id)}))}
              label={'Выберите сотрудника'}
              multiple
              placeholder={'Выберите сотрудника'}
              value={values.users}
              onChange={(value) => {
                // @ts-ignore
                setValues(  {users: value})
                // console.log(values);
                // @ts-ignore
                store.usersStore.setToCompanyUsersSelected(value)
                // store.usersStore.companyUsersSelected.length = 0
                // @ts-ignore
                // store.usersStore.addTocompanyUsersSelected(String(value), store.usersStore.companyUsers.filter((el:any) => el.employee.id == value)[0])
                // @ts-ignore
              }}
              onSelect={(event: any) => {
                console.log(event);

              }}
          />
        </Form>

      )}
    </Formik>
  )
}
export default observer(FormModalAddUser)
