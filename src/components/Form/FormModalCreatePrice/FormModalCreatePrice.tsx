import { CreateFormikInput } from "components/common/ui/CreateInput/CreateInput";
import { Form, Formik, useFormikContext } from 'formik'
import React, { useState } from "react";
import * as Yup from "yup";
import "yup-phone-lite";
import Heading, { HeadingColor, HeadingVariant } from "components/common/ui/Heading/Heading";
import { useStore } from "stores/store";
import {  Select } from "@mantine/core";
import {  observer } from "mobx-react-lite";
import Button, { ButtonVariant } from "components/common/ui/Button/Button";
import {  runInAction } from "mobx";
const FormInputs = () => {
  const store = useStore()
  const { values, setFieldValue}:any = useFormikContext()
  const [id, setId] = useState({
    company_id: 0,
    filial_id: 0
  })
  const memoized = React.useMemo(() => {
    const allCompanies = store.companyStore.getCompanies()
    const companies = allCompanies.filter((c: any) => c.parent === null)
    const filials = allCompanies.filter((c: any) => c.parent !== null && c.parent.id === values.company_id)
    return <>
      <Select className={'col-span-full'} onOptionSubmit={(value:any) => {
        setFieldValue('company_id', Number(value))
        setFieldValue('filial_id', Number(0))
      }} searchable clearable label={'Выберите компанию'} placeholder={'Компания'} data={companies.map((c:any) => ({
      label: c.name,
      value: String(c.id)
    }))} name={'company_id'} />
      <Select value={values.filial_id !== 0 ? values.filial_id : null} className={'col-span-full'} disabled={filials.length === 0} onOptionSubmit={(value:any) => {
        setFieldValue('filial_id', Number(value))
      }}  searchable clearable label={'Выберите компанию'} placeholder={'Компания'} data={filials.map((c:any) => ({
        label: c.name,
        value: String(c.id)
      }))} name={'company_id'} />
    </>
  }, [values])
  return <>{memoized}</>
}
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
const FormModalCreatePrice =  () => {
    const store = useStore()
    const initValues = {
      company_id: 0,
      filial_id: 0
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
                        text={'Создать прайс-лист Заказчику'}
                        className={'col-span-2 !mb-8'}
                        variant={HeadingVariant.h2}
                        color={HeadingColor.accent}
                    />
                    <FormInputs />
                    <footer className={'pt-12 col-span-full'}>
                      <Button text={"Отменить"}
                        action={() => store.appStore.closeModal()}
                        variant={ButtonVariant["accent-outline"]}
               />
                      <Button text={"Сохранить"}
                        type={'submit'}
                        action={() => {
                          console.log(values);

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

export default observer(FormModalCreatePrice)
