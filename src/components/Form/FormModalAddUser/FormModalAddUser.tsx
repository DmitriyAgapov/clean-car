import React from "react";
import "yup-phone-lite";
import Heading, { HeadingColor, HeadingVariant } from "components/common/ui/Heading/Heading";
import { useStore } from "stores/store";
import { InputBase, Modal, Select, TextInput } from "@mantine/core";
import { Observer, observer } from "mobx-react-lite";
import Button, { ButtonSizeType, ButtonVariant } from "components/common/ui/Button/Button";

import { IMaskInput } from "react-imask";
import { yupResolver } from "mantine-form-yup-resolver";
import { CreateCarSchema, CreateCompanySchema, CreateModalUserSchema, SelectModalUserSchema } from "utils/validationSchemas";
import { useForm } from "components/Form/FormCreateCompany/FormCreateUpdateCompany";
import styles from "components/common/layout/Modal/Modal.module.scss";
import { SvgClose } from 'components/common/ui/Icon'
import { useParams } from "react-router-dom";


const FormModalAddUser =  (props: { company_id: any,  opened: boolean, onClose: () => void }) => {

    const store = useStore()

    const group = store.permissionStore.getCompanyPermissions
    const initValues = {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      group: '',
      is_active: "true",
      bid_visibility: "true"
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
  }, [props.company_id, group])
    React.useEffect(() => {
      form.reset();
      (async () => await store.permissionStore.loadCompanyPermissions(
        Number(props.company_id),
      ))()
    }, [props.opened]);


    return (
      <Modal.Root size={'md'} opened={props.opened} onClose={props.onClose} centered className={'z-[999]'}>
        <Modal.Overlay className={'bg-black/90'}/>
        <Modal.Content radius={20} className={styles.ModalUpBalance + " " + "tablet-max:*:!block tablet-max:*:!px-3"}>
          <Modal.Header className={'static'}>
            <Modal.Title>
              <Heading text={'Добавление нового сотрудника'}
                className={'col-span-2 !mb-0'}
                variant={HeadingVariant.h2}
                color={HeadingColor.accent} /></Modal.Title>
            <Modal.CloseButton className={"hover:rotate-90 hover:bg-transparent transition-all absolute top-5 right-5 tablet-max:hidden"} icon={<SvgClose className={'close__modal'} />}/>
          </Modal.Header>
          <Modal.Body className={'!p-0'}>
            <form onSubmit={form.onSubmit((props) => console.log('form', props))}
              onReset={form.onReset}
              className={'tablet:grid grid-cols-2 gap-4'}

            >

              <p className={'col-span-2'}>Введите основные данные водителя</p>

              <TextInput label={'Имя'} {...form.getInputProps('first_name')} />
              <TextInput label={'Фамилия'} {...form.getInputProps('last_name')} />
              <InputBase
                {...form.getInputProps('phone')} label={'Телефон'}
                component={IMaskInput}
                mask='+7 000 000 0000'
                placeholder='+7 000 000 0000' />
              <TextInput label={'E-mail'} {...form.getInputProps('email')} />
              <Select clearable
                label={'Группа'}
                {...form.getInputProps('group', { dependOn: 'company_id' })}
                data={memData} />
              <Select label={'Статус'}
                {...form.getInputProps('is_active')}
                data={[
                  { label: 'Активен', value: 'true' },
                  { label: 'Неактивен', value: 'false' },
                ]} />
              <Select
                {...form.getInputProps('bid_visibility')} className={"col-span-full"}
                label={"Пользователь видит заявки:"}
                data={[{ label: "Все", value: 'true' }, { label: 'Свои', value: "false" }]} />

            </form>
            <footer className={'!pt-8  tablet-max:flex tablet-max:flex-col'}>
              <Button type={'button'}
                text={'Добавить сотрудника'}
                action={async () => {
                  await store.usersStore.createUser(props.company_id, { ...form.values, phone: form.values.phone.replaceAll(' ', ''), is_active: form.values.is_active === "true", bid_visibility: form.values.bid_visibility === "true" }).then((res) => {

                    if (res.status === 201) {
                      store.usersStore.getUsers(props.company_id).then(() => {
                        // console.log(res);
                        if (res.data.id) {
                          // console.log(res.data.id);
                          store.usersStore.addToSelectedUsers(res.data.id)

                        }
                      }).finally(props.onClose)
                    }
                  }).finally(props.onClose)
                }}
                disabled={!form.isValid()}
                // action={async () => {
                //     store.
                // }}
                variant={ButtonVariant.accent} />
              <Button type={'button'}
                text={'Отменить'}
                action={props.onClose}
                variant={ButtonVariant.cancel}
                className={'tablet:max-w-fit'} />

            </footer>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>

    )
}
export const FormModalSelectUsers = observer((props: { company_id: any, users: any, opened: boolean, onClose: () => void }) => {
  const store = useStore();
  React.useEffect(() => {
    console.log(props.company_id);
    store.usersStore.getUsers(props.company_id)
  }, [props.opened])
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
    <Modal.Root size={"lg"}
      opened={props.opened}
      onClose={props.onClose}
      centered
      className={'z-[999]'}>
      <Modal.Overlay className={'bg-black/90'} />
      <Modal.Content radius={20}
        className={styles.ModalUpBalance + " " + "tablet-max:*:!block tablet-max:*:!px-3"}>
        <Modal.Header className={'static'}>
          <Modal.Title>
            <Heading text={"Выбрать сотрудника из списка пользователей"}
              // className={"!mb-0"}
              variant={HeadingVariant.h2}
              color={HeadingColor.accent} /></Modal.Title>
          <Modal.CloseButton className={"hover:rotate-90 hover:bg-transparent transition-all absolute top-5 right-5 tablet-max:hidden"}
            icon={<SvgClose className={'close__modal'} />} />
        </Modal.Header>
        <Modal.Body className={'!p-0'}>
          <form className={'tablet:grid'}
            style={{ gap: "1rem" }}>

            {/* <p>Выберите пользователя</p> */}
            <Observer children={() => (
              <Select
                {...form.getInputProps('users')}
                // @ts-ignore
                data={store.usersStore.currentCompanyUsers.map((item: any) => ({ label: item.employee.last_name + ' ' + item.employee.first_name, value: String(item.employee.id) }))}
                label={"Выберите сотрудника"}
                placeholder={"Выберите сотрудника"}
                clearable
                searchable
                onOptionSubmit={(value) => {
                  form.setValues({ users: String(value) });
                  console.log(form.values);
                }}


              />)} />

          </form>
          <footer className={'!pt-8  tablet-max:flex tablet-max:flex-col-reverse'}>
            <Button text={"Закрыть"}
              type={'button'}
              variant={ButtonVariant.cancel}
              size={ButtonSizeType.base}
              action={props.onClose} />
            <Button text={"Добавить сотрудника"}
              action={async () => {
                store.usersStore.addToSelectedUsers(Number(form.values.users))
                props.onClose()
              }}
              className={'tablet:!px-4 tablet:flex-1'}
              type={'button'}
              disabled={!form.isValid()}
              variant={ButtonVariant.accent} />
          </footer>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>

  )
})
export default observer(FormModalAddUser)
