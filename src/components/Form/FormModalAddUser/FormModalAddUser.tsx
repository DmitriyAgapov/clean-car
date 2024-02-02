import { CreateFormikInput } from "components/common/ui/CreateInput/CreateInput";
import { Form, Formik, useFormikContext } from 'formik'
import React, { useEffect } from "react";
import * as Yup from "yup";
import "yup-phone-lite";
import Heading, { HeadingColor, HeadingVariant } from "components/common/ui/Heading/Heading";
import { useStore } from "stores/store";
import { MultiSelect, Select } from "@mantine/core";
import logo from "components/common/layout/Logo/Logo";
import { Observer, observer } from "mobx-react-lite";
import Button, { ButtonVariant } from "components/common/ui/Button/Button";
import { action, runInAction } from "mobx";

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
const FormModalAddUser =  ({company_id, group}: {company_id: any, group: any[]}) => {
    const store = useStore()
  console.log(group);
    // @ts-ignore
  const memData = React.useMemo(  ():any => {
    // @ts-ignore
    const ar = group
    // @ts-ignore
    console.log(ar);
    // @ts-ignore
    if(ar.length > 0) return ar.map((item: any) => ({label: item.name, value: String(item.id)}))
    return null
    // @ts-ignore
  }, [company_id])
  // @ts-ignore
  const {data}:any = store.permissionStore.loadCompanyPermissions(company_id)
  console.log(memData);
  // @ts-ignore
  console.log(data?.results);
  // @ts-ignore
  console.log(company_id);
    const initValues = {
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        group: '',
        is_active: true,
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
        options: group.map((item: any) => ({label: item.name, value: String(item.id)})),
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
    ]
    const FormInputs = (): JSX.Element => {
        // @ts-ignore
        return formData.map((item: any, index: number) => (
            <CreateFormikInput
                key={index + 'car_inputs'}

                options={item.options}
                fieldName={item.name}
                label={item.label}
                placeHolder={item.placeholder}
                fieldType={item.type}
                className={''}
            />
        ))
    }
    return (
        <Formik
            initialValues={initValues}
            validationSchema={SignupSchema}
            onSubmit={(values, FormikHelpers) => {
                console.log(values)
            }}
        >
            {({ submitForm,  handleChange, isSubmitting, errors, touched, values, isValid }) => (
                <Form
                    onChange={() => store.formStore.handleChangeForm('formCreateUser', values)}
                    style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}
                >
                    <Heading
                        text={'Добавление нового сотрудника'}
                        className={'col-span-2 !mb-0'}
                        variant={HeadingVariant.h2}
                        color={HeadingColor.accent}
                    />
                    <p className={'col-span-2'}>Введите основные данные водителя</p>
                    <FormInputs />
                    <footer className={'pt-12 col-span-full'}>
                      <Button text={"Отменить"}
                        action={() => store.appStore.closeModal()}
                        variant={ButtonVariant["accent-outline"]}
                        className={"max-w-fit"} />
                      <Button text={"Добавить сотрудника"}
                        action={() => {
                          store.usersStore.createUser(company_id, values)

                          .then((res) => res)
                          .then((res) =>  runInAction(() => {
                            store.usersStore.getUsers(company_id)
                            console.log(res.status)

                          })).finally(() => store.appStore.closeModal())


                        }}
                        // action={async () => {
                        //     store.
                        // }}
                        variant={ButtonVariant.accent} />
                    </footer>
                </Form>
            )}
        </Formik>
    )
}
const FormInputs = (): JSX.Element => {
    const store = useStore()
    const { handleChange, values } = useFormikContext()
    console.log(values)
    // @ts-ignore
    return formData.map((item: any, index: number) => (
        <CreateFormikInput
            key={index + 'car_inputs'}

            options={item.options}
            fieldName={item.name}
            label={item.label}
            placeHolder={item.placeholder}
            fieldType={item.type}
            className={''}
        />
    ))
}
export const FormModalSelectUsers = ({company_id, users}: {company_id: any, users: any}) => {
  const store = useStore()

  console.log(store.usersStore.getUsers(store.formStore.getFormDataCarCreate.company_id));
  console.log();
  const initValues = {
    users: '',
  }
  // const formData = [
  //   {
  //     label: 'Сотрудники',
  //     name: 'users',
  //     type: 'select',
  //     placeholder: 'Выберите группу',
  //     value: '',
  //     options: usersStore.companyUsers.map((item: any) => ({label: item.employee.first_name + ' ' + item.employee.last_name, value: String(item.employee.id)}))
  //   }
  // ]
  const memoizedData = React.useMemo( async () => {
    await store.usersStore.getUsers(store.formStore.getFormDataCarCreate.company_id)
   return store.usersStore.currentCompanyUsers.map((item: any) => ({label: item.employee.first_name + ' ' + item.employee.last_name, value: String(item.employee.id)}));

  }, [store.formStore.formCreateCar.company_id])
  console.log();
  return (
    <Formik
      initialValues={initValues}
      validationSchema={SignupSchema}
      onSubmit={(values, FormikHelpers) => {
        console.log(values);
        store.usersStore.addToSelectedUsers(Number(values.users))

      }}
    >
      {({
        setValues,  submitForm, handleChange, isSubmitting, errors, touched, values, isValid,
      }) => (

        <Form style={{ display: "grid", gap: "1rem" }}>
          <Heading text={"Выбрать сотрудника из списка пользователей"}
            className={"!mb-0"}
            variant={HeadingVariant.h2}
            color={HeadingColor.accent} />
          <p>Выберите пользователя</p>
          <Observer children={() => (
          <Select

            // @ts-ignore
            data={store.usersStore.currentCompanyUsers.map((item: any) => ({label: item.employee.first_name + ' ' + item.employee.last_name, value: String(item.employee.id)}))}
            label={"Выберите сотрудника"}
            multiple
            placeholder={"Выберите сотрудника"}
            value={values.users}
            clearable
            searchable
            onOptionSubmit={(value) => {
              setValues({ users: String(value) });

            }}


          />)}/>
          <footer className={"pt-12"}>
            <Button text={"Отменить"}
              action={() => store.appStore.closeModal()}
              variant={ButtonVariant["accent-outline"]}
              className={"max-w-fit"} />
            <Button text={"Добавить сотрудника"}
              action={async () => {
                store.usersStore.addToSelectedUsers(Number(values.users))
                store.appStore.closeModal()
              }}

              variant={ButtonVariant.accent} /></footer>
        </Form>

      )}
    </Formik>
  )
}
export default observer(FormModalAddUser)
