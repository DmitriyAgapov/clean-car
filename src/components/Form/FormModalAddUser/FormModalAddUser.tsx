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
          className={'tablet:grid grid-cols-2 gap-4'}

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
                              }).finally(() => store.appStore.closeModal())
                            }
                          })
                            .finally(() => {
                          store.appStore.closeModal()
                        }).finally(() => store.appStore.closeModal())
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
export const FormModalSelectUsers = observer(({ company_id, users }: { company_id: any, users: any }) => {
  const store = useStore();
  store.usersStore.getUsers(company_id)
  const initValues: {
    users: string | null
  } = {
    users: null,
  }
  const form = useForm({
    name: 'selectModalUser',
    initialValues: initValues,
    validateInputOnBlur: true,
    onValuesChange: (values, previous) => console.log(values),
    validate: yupResolver(SelectModalUserSchema),
  })
  return (

        <form className={'tablet:grid'} style={{  gap: "1rem" }}>
          <Heading text={"Выбрать сотрудника из списка пользователей"}
            // className={"!mb-0"}
            variant={HeadingVariant.h2}
            color={HeadingColor.accent} />
          {/* <p>Выберите пользователя</p> */}
          <Observer children={() => (
          <Select
            {...form.getInputProps('users')}
            // @ts-ignore
            data={store.usersStore.currentCompanyUsers.map((item: any) => ({label: item.employee.first_name + ' ' + item.employee.last_name, value: String(item.employee.id)}))}
            label={"Выберите сотрудника"}
            placeholder={"Выберите сотрудника"}
            clearable
            searchable
            onOptionSubmit={(value) => {
              form.setValues({ users: String(value) });
              console.log(form.values);
            }}


          />)}/>
          <footer className={"pt-12"}>
            <Button text={"Отменить"}
              action={() => store.appStore.closeModal()}
              variant={ButtonVariant["accent-outline"]}
              className={"max-w-fit"} />
            <Button text={"Добавить сотрудника"}
              action={async () => {
                store.usersStore.addToSelectedUsers(Number(form.values.users))
                store.appStore.closeModal()
              }}
              className={'!px-4 flex-1'}
              type={'submit'}
              disabled={!form.isValid()}
              variant={ButtonVariant.accent} /></footer>
        </form>
  )
})
export default observer(FormModalAddUser)
