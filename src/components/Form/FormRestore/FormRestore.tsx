import React from 'react'
import * as Yup from 'yup'
import Button, { ButtonSizeType, ButtonVariant } from 'components/common/ui/Button/Button'
import { useStore } from 'stores/store'
import { useForm } from '@mantine/form'
import { TextInput } from '@mantine/core'

const SignupSchema = Yup.object().shape({
  cleanm: Yup.string().email('Некорректный email').required('Укажите email'),
  pwd: Yup.string().min(8, 'Пароль короткий').max(16, 'Много символов').required('Укажите пароль'),
})

const FormRestore = ({ message }: { message?: string }) => {
  const store = useStore()
  const form = useForm({
    name: 'formRestore',
    initialValues: {
      email: ''
    },
    validateInputOnBlur: true,
    // onValuesChange: (values, previous) => console.log(values),
    // validate: yupResolver(CreateUserSchema),
  })
  return (
   <form className={'grid gap-4'}>
     <TextInput {...form.getInputProps('email')} label={'Ваш e-mail'} size={"lg"} placeholder={'E-mail'}/>
     <Button text={'отправить ссылку'} size={ButtonSizeType.lg} variant={ButtonVariant.accent}/>
   </form>
  )
}


export default FormRestore
