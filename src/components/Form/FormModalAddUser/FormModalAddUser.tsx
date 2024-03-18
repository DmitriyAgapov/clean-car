import { CreateFormikInput } from "components/common/ui/CreateInput/CreateInput";
import { Form, Formik, useFormikContext } from "formik";
import React from "react";
import "yup-phone-lite";
import Heading, { HeadingColor, HeadingVariant } from "components/common/ui/Heading/Heading";
import { useStore } from "stores/store";
import { InputBase, Select, TextInput } from "@mantine/core";
import { Observer, observer } from "mobx-react-lite";
import Button, { ButtonVariant } from "components/common/ui/Button/Button";
import { action, runInAction } from "mobx";
import { IMaskInput } from "react-imask";
import { yupResolver } from "mantine-form-yup-resolver";
import { CreateCarSchema, CreateCompanySchema, CreateModalUserSchema, SelectModalUserSchema } from "utils/validationSchemas";
import { useForm } from "components/Form/FormCreateCompany/FormCreateUpdateCompany";


const FormModalAddUser =  ({company_id, group}: {company_id: any, group: any[]}) => {

    const store = useStore()
    const initValues = {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      group: '',
      is_active: "true",
    }

    const form = useForm({
      name: 'createModalUser',
      initialValues: initValues,
      validateInputOnBlur: true,
      // onValuesChange: (values, previous) => console.log(values),
      validate: yupResolver(CreateModalUserSchema),
    })
    // @ts-ignore
  const memData = React.useMemo(  ():any => {
    let ar = group

    // @ts-ignore
    if(ar.length > 0) return ar.map((item: any) => ({label: item.name, value: String(item.id)}))
    return null
    // @ts-ignore
  }, [company_id])
  // @ts-ignore
  const {data}:any = store.permissionStore.loadCompanyPermissions(company_id)

  // @ts-ignore

  // @ts-ignore

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
            type: 'telphone',
            value: '',
            depend: false,
        },

      // {
      //   label: 'Группа',
      //   placeholder: 'Выберите группу',
      //   name: 'group',
      //   type: 'select',
      //   value: '',
      //   options: group.map((item: any) => ({label: item.name, value: String(item.id)})),
      //   depend: false,
      // },
      //   {
      //       label: 'Статус',
      //       placeholder: 'Выбрать статус',
      //       name: 'is_active',
      //       type: 'select',
      //       options: [
      //           { label: 'Активен', value: 'true' },
      //           { label: 'Неактивен', value: 'false' },
      //       ],
      //       value: '',
      //       depend: false,
      //   },
    ]

    return (
        <form
            onSubmit={form.onSubmit((props) => console.log('form', props))}
            onReset={form.onReset}
          className={'grid grid-cols-2 gap-4'}
            style={{ display: 'grid grid' }}
        >
            <Heading
                text={'Добавление нового сотрудника'}
                className={'col-span-2 !mb-0'}
                variant={HeadingVariant.h2}
                color={HeadingColor.accent}
            />
            <p className={'col-span-2'}>Введите основные данные водителя</p>

            <TextInput label={'Имя'} {...form.getInputProps('first_name')} />
            <TextInput label={'Фамилия'} {...form.getInputProps('last_name')} />
            <InputBase
                {...form.getInputProps('phone')}
                label={'Телефон'}
                component={IMaskInput}
                mask='+7 000 000 0000'
                placeholder='+7 000 000 0000'
            />
            <TextInput label={'E-mail'} {...form.getInputProps('email')} />
            <Select
                clearable
                label={'Группа'}
                {...form.getInputProps('group', { dependOn: 'company_id' })}
                data={memData}
            />
            <Select
                label={'Статус'}
                {...form.getInputProps('is_active')}
                data={[
                    { label: 'Активен', value: 'true' },
                    { label: 'Неактивен', value: 'false' },
                ]}
            />
            <footer className={'pt-12 col-span-full'}>
                <Button
                    text={'Отменить'}
                    action={() => store.appStore.closeModal()}
                    variant={ButtonVariant.cancel}
                    className={'max-w-fit'}
                />
                <Button
                    type={'button'}
                    text={'Добавить сотрудника'}
                    action={async () => {
                        await store.usersStore
                            .createUser(company_id, { ...form.values, phone: form.values.phone.replaceAll(' ', '') })
                            .then((res) => res)
                            .then((res) => {

                            if (res.status === 201) {
                              store.usersStore.getUsers(company_id).then(() => {
                                console.log(res);
                                if(res.data.id) {
                                  console.log(res.data.id);
                                  store.usersStore.addToSelectedUsers(res.data.id)
                                }
                              })
                            }
                          })
                            .finally(() => {
                          // store.appStore.closeModal()
                        })
                    }}
                    disabled={!form.isValid()}
                    // action={async () => {
                    //     store.
                    // }}
                    variant={ButtonVariant.accent}
                />
            </footer>
        </form>
    )
}
const FormInputs = (): JSX.Element => {
  const store = useStore();
  const { handleChange, values } = useFormikContext();
  console.log(values);
  // @ts-ignore
  return formData.map((item: any, index: number) => (
    <CreateFormikInput key={index + "car_inputs"}

      options={item.options}
      fieldName={item.name}
      label={item.label}
      placeholder={item.placeholder}
      fieldType={item.type}
      className={""} />
  ));
};
export const FormModalSelectUsers = ({ company_id, users }: { company_id: any, users: any }) => {
  const store = useStore();

  console.log(store.usersStore.getUsers(store.formStore.getFormDataCarCreate.company_id));

  const initValues: {
    users: string | null
  } = {
    users: null,
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
  console.log(memoizedData);
  return (
    <Formik
      initialValues={initValues}
      validationSchema={SelectModalUserSchema}
      onSubmit={(values, FormikHelpers) => {
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
            placeholder={"Выберите сотрудника"}
            value={values.users}
            clearable
            searchable
            onOptionSubmit={(value) => {
              setValues({ users: String(value) });
              console.log(values);
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
              type={'submit'}
              disabled={!isValid}
              variant={ButtonVariant.accent} /></footer>
        </Form>

      )}
    </Formik>
  )
}
export default observer(FormModalAddUser)
