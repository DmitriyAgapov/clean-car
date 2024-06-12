import React from 'react'
import Button, { ButtonSizeType, ButtonVariant } from 'components/common/ui/Button/Button'
import { useStore } from 'stores/store'
import { useForm, yupResolver } from '@mantine/form'
import { TextInput } from '@mantine/core'
import agent from "utils/agent";
import { useNavigate } from 'react-router-dom'
import { CreateRestorePwd, CreateUserSchema } from "utils/validationSchemas";

const FormRestore = ({ message }: { message?: string }) => {
  const store = useStore()
  const navigate = useNavigate()
  const form = useForm({
    name: 'formRestore',
    initialValues: {
      email: ''
    },
    validateInputOnBlur: true,
    // onValuesChange: (values, previous) => console.log(values),
    validate: yupResolver(CreateRestorePwd),
  })
  return (
   <form className={'grid gap-4'}>
     <TextInput {...form.getInputProps('email')} label={'Ваш e-mail'} size={"lg"} placeholder={'E-mail'}/>
     <Button type={'button'} text={'отправить ссылку'} disabled={!form.isValid()} action={() => agent.Account.accountRestorePassword(form.values.email).then(() => navigate(`/restore/success?email=${form.values.email}`))} size={ButtonSizeType.lg} variant={ButtonVariant.accent}/>
   </form>
  )
}


export default FormRestore
