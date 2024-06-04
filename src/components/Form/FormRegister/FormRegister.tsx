import React from 'react'
import Button, { ButtonSizeType, ButtonVariant } from 'components/common/ui/Button/Button'
import styles from 'components/Form/FormRegister/FormRegister.module.scss'
import { IMask, IMaskInput } from "react-imask";
import { useStore } from 'stores/store'
import { useForm } from '@mantine/form'
import { yupResolver } from 'mantine-form-yup-resolver'
import { Box, InputBase, PasswordInput, TextInput, Select } from '@mantine/core'
import 'yup-phone-lite'
import { SignupSchemaNew } from "utils/validationSchemas";

const FormRegister = () => {
  const store = useStore()
  // @ts-ignore
  const masked = IMask.createMask({
    mask: "+7 000 000 00 00",
    autofix: true,
    // overwrite: true,
    prepare: (appended: string | any[], masked: { value: string }) => {
      if (appended[0] === '8' && masked.value === "") {
        return appended.slice(1);
      }
      return appended
    },
  });

  const [cities, setCities] = React.useState<any[] | null>(null)

  React.useEffect(  () => {
    (async () => {
        const _c = await store.catalogStore.getCities()
        setCities(_c.map((c: any) => ({
          label: c.name,
          value: String(c.id)
        })))
      }
    )()
  }, [])

  const form = useForm({
    name: 'registerForm',
    initialValues: {
      first_name: '',
      last_name: '',
      phone: '',
      email: '',
      city: ''
    },
    validateInputOnBlur: true,
    // onValuesChange: (values, previous) => console.log(values),
    validate: yupResolver(SignupSchemaNew),
    enhanceGetInputProps: (payload) => {
      if(payload.field === "pwd" || payload.field === "pwd_confirmation") {
        return ({
          className: "flex-1",

        })
      }
    }

  })
  const handleSubmit = React.useCallback((event:any) => {
    event.preventDefault()
    console.log(event);
    console.log(form.values);
    // store.authStore.setLastname(values.lastName)
    // store.authStore.setFirstname(values.firstName)
    // store.authStore.setPhone(values.phone)
    // store.authStore.setEmail(values.cleanm)
    // // if (values.pwd === values.pwd2) store.authStore.setPassword(values.pwd)
    //
    // if (Object.values(store.authStore.values).length > 0) {
    //   // console.log('success', Object.values(store.authStore.values))
    //   // store.authStore.register()
    // }
  }, [])
  return (
    <form className={'grid gap-y-2'}>
      <TextInput label={'Имя'} {...form.getInputProps('first_name')} />
      <TextInput label={'Фамилия'} {...form.getInputProps('last_name')} />
      <
        // @ts-ignore
        InputBase
        {...form.getInputProps('phone')}
        label={'Телефон'}

        component={IMaskInput}
        {...masked}
        placeholder='+7 000 000 0000'
      />
      <TextInput label={'E-mail'} {...form.getInputProps('email')} />
      {(cities && cities.length !== 0) &&  <Select {...form.getInputProps('city')} disabled={cities.length === 0} label={'Город'} data={cities} />}
      <Box className="flex gap-x-2">
        <PasswordInput label={'Пароль'} {...form.getInputProps('pwd')} />
        <PasswordInput label={'Подтвердите пароль'} {...form.getInputProps('pwd_confirmation')} />
      </Box>
      <div className={styles.actionGroup}>
        <Button
          text={'зарегистрироваться'}
          size={ButtonSizeType.lg}
          type={'submit'}
          variant={ButtonVariant.accent}
          action={handleSubmit}
        />
      </div>
      <div className={styles.text}>
        Нажимая «Зарегистрироваться», вы принимаете пользовательское соглашение и политику конфиденциальности
      </div>
    </form>
  )
}

export default FormRegister
