import React from 'react'
import Button, { ButtonSizeType, ButtonVariant } from "components/common/ui/Button/Button";
import styles from './FormAuth.module.scss'
import { useStore } from 'stores/store'
import { observer } from "mobx-react-lite";
import { yupResolver } from 'mantine-form-yup-resolver'
import { PasswordInput, TextInput } from '@mantine/core'
import agent from "utils/agent";

import { createFormActions, createFormContext } from '@mantine/form'
import {  SignInSchema } from 'utils/validationSchemas'
import LinkStyled from "components/common/ui/LinkStyled/LinkStyled";
import { SvgClose } from 'components/common/ui/Icon'
import { notifications } from '@mantine/notifications'
import { useNavigate, useNavigation } from 'react-router-dom'
interface InitValues  {
  email: string
  password: string
}
export const [FormProvider, useFormContext, useForm] = createFormContext<any>()
export const createLimitFormActions = createFormActions<InitValues>('formAuthNew')

const FormAuthNew = () => {
  const store = useStore()
  const navigate = useNavigate()
  const formData = useForm({
    name: 'formAuthNew',
    // mode: 'uncontrolled',
    validateInputOnBlur: true,
    // onValuesChange: (values, previous) => console.log(values, 'values'),
    validate: yupResolver(SignInSchema),
    initialValues: {
      email: '',
      password: ''
    },
  })
  const isError = React.useMemo(() => {
    return <div><span>!</span>Не удается войти. Проверьте указанные данные.</div>
  }, [])
  const handleSubmit = React.useCallback(  async (values: any, event: any) => {
    if(event) {
      event.preventDefault()
    }
    store.authStore.setEmail(values.email)
    store.authStore.setPassword(values.password)
    return store.authStore.login()
    .then((r:any) => {
        if(r.status === 200) {
          console.log('success');
          // mutate(`limits`)
          navigate(`/account/welcome`)
        } else {
          console.log(r)
        }
      })
        .catch(e => console.log(e))


  }, [])
  // const handleSubmit =  () => {
  //
  //     return agent.Auth.login({email: formData.values.email.toLowerCase(), password: formData.values.password})
      // const {response} = await store.authStore.login()
    // console.log(response);
      // .then(response => {
      //     console.log(response.data, 'login')
      //     const newErrors: {
      //       email?: string
      //       password?: string
      //     } = {}
      //     response.data.email && (newErrors.email = response.data.email[0])
      //     response.data.password && (newErrors.password = response.data.password[0])
      //     for (const key in newErrors) {
      //       // if(key) {
      //       // @ts-ignore
      //       formData.setFieldError(key, newErrors[key])
      //       // }
      //     }
      //     console.log(newErrors)
      //
      //     // r.status === 200 && navigate('/account/bids')
      //   })
              // store.authStore.setEmail(values.email)
              // store.authStore.setPassword(values.password)
              // })

      // alert(JSON.stringify(values, null, 2));
      // actions.setSubmitting(true)
  // }

  return (
    <form onSubmit={formData.onSubmit(handleSubmit)}
      onReset={formData.onReset}
      style={{ display: 'contents' }}>
      <TextInput label={"Ваш email"}
        key={'email'}
        size={"lg"}
        name={'email'} {...formData.getInputProps('email')} />
      <PasswordInput label={"Пароль"}
        key={'password'}
        size={"lg"}
        name={'password'}  {...formData.getInputProps('password')} />

      <div className={styles.actionGroup}>
        <Button
          text={'Войти'}
          variant={ButtonVariant.accent}
          type={'submit'}
          disabled={!formData.isValid()}
        />
        <LinkStyled to={'/restore'} text={'Не помню пароль'} variant={ButtonVariant['accent-outline']} />
      </div>
    </form>
  )
}


export default observer(FormAuthNew)
