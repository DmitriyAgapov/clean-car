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
import agent from "utils/agent";
import { useRevalidator } from "react-router-dom";
import useSWR from "swr";
const FormInputs = () => {
  const store = useStore()

  const { values, setFieldValue}:any = useFormikContext()
  const [id, setId] = useState({
    company_id: 0,
    filial_id: 0
  })
  const memoized = React.useMemo(() => {
    const allCompanies = store.companyStore.getCompanies()
    const companies = allCompanies.filter((c: any) => c.parent === null && c.company_type === "Клиент")
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
      }}  searchable clearable label={'Выберите филиал'} placeholder={'Компания'} data={filials.map((c:any) => ({
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
  const {mutate} = useSWR('prices')
  const initValues = {
      company_id: 0,
      filial_id: 0
    }
    let revalidator = useRevalidator();
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
                    <footer className={'pt-12 col-span-full flex'}>
                      <Button text={"Отменить"}
                        className={'!flex-1'}
                        action={() => store.appStore.closeModal()}
                        variant={ButtonVariant["accent-outline"]}
               />
                      <Button text={"Сохранить"}
                        type={'submit'}
                        disabled={values.company_id === 0}
                        action={() => {
                          console.log(values)
                          agent.Price.createPrice(values.filial_id !== 0 ? values.filial_id : values.company_id)
                            .then(r => {
                              if(r.status === 201) {
                                revalidator.revalidate();
                                mutate().then(() => {
                                  console.log('mutate')
                                    store.appStore.closeModal()
                                  }
                                )
                              }
                          })
                        }}
                        className={'!flex-1'}
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
