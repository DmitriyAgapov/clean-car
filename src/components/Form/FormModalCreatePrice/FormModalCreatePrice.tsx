import { CreateFormikInput } from "components/common/ui/CreateInput/CreateInput";
import { Form, Formik, useFormikContext } from 'formik'
import React, { useState } from "react";
import * as Yup from "yup";
import "yup-phone-lite";
import Heading, { HeadingColor, HeadingVariant } from "components/common/ui/Heading/Heading";
import { useStore } from "stores/store";
import { Modal, Select } from '@mantine/core'
import {  observer } from "mobx-react-lite";
import Button, { ButtonVariant } from "components/common/ui/Button/Button";
import {  runInAction } from "mobx";
import agent from "utils/agent";
import { useRevalidator } from "react-router-dom";
import useSWR from "swr";
import { useForm } from "components/Form/FormCreateCompany/FormCreateUpdateCompany";
import { CreateModalPrice } from "utils/validationSchemas";
import styles from "components/common/layout/Modal/Modal.module.scss";
import { SvgClose } from 'components/common/ui/Icon'
import { yupResolver } from "mantine-form-yup-resolver";
import data from "utils/getData";
// const FormInputs = () => {
//   const store = useStore()
//
//   const { values, setFieldValue}:any = useFormikContext()
//   const allCompanies = store.companyStore.getCompanies()
//   const memoized = React.useMemo(() => {
//     const companies = allCompanies.filter((c: any) => c.parent === null && c.company_type === "Клиент")
//     const filials = allCompanies.filter((c: any) => c.parent !== null && c.parent.id === values.company_id)
//     return <>
//       <Select className={'col-span-full'} onOptionSubmit={(value:any) => {
//         setFieldValue('company_id', Number(value))
//         setFieldValue('filial_id', Number(0))
//       }} searchable clearable label={'Выберите компанию'} placeholder={'Компания'} data={companies.map((c:any) => ({
//       label: c.name,
//       value: String(c.id)
//     }))} name={'company_id'} />
//       <Select value={values.filial_id !== 0 ? values.filial_id : null} className={'col-span-full'} disabled={filials.length === 0} onOptionSubmit={(value:any) => {
//         setFieldValue('filial_id', Number(value))
//       }}  searchable clearable label={'Выберите филиал'} placeholder={'Компания'} data={filials.map((c:any) => ({
//         label: c.name,
//         value: String(c.id)
//       }))} name={'company_id'} />
//     </>
//   }, [values])
//   return <>{memoized}</>
// }
// const SignupSchema = Yup.object().shape({
//   first_name: Yup.string()
//   .min(2, 'Too Short!')
//   .max(50, 'Too Long!')
//   .required('Required'),
//   last_name: Yup.string()
//   .min(2, 'Too Short!')
//   .max(50, 'Too Long!')
//   .required('Required'),
//   email: Yup.string().email('Invalid email').required('Required'),
//   phone: Yup.string().required('Required'),
//   group: Yup.string().required('Required'),
// })
// const FormModalCreatePrice =  () => {
//     const store = useStore()
//   const {mutate} = useSWR('prices')
//   const initValues = {
//       company_id: null,
//       filial_id: null
//     }
//     let revalidator = useRevalidator();
//     return (
//         <Formik
//             initialValues={initValues}
//             validationSchema={SignupSchema}
//             onSubmit={(values, FormikHelpers) => {
//                 console.log(values)
//             }}
//         >
//             {({ submitForm,  handleChange, isSubmitting, errors, touched, values, isValid }) => (
//                 <Form
//                     onChange={() => store.formStore.handleChangeForm('formCreateUser', values)}
//                     style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}
//                 >
//                     <Heading
//                         text={'Создать прайс-лист Клиенту'}
//                         className={'col-span-2 !mb-8'}
//                         variant={HeadingVariant.h2}
//                         color={HeadingColor.accent}
//                     />
//                     <FormInputs />
//                     <footer className={'pt-12 col-span-full flex'}>
//                       <Button text={"Отменить"}
//                         className={'!flex-1'}
//                         action={() => store.appStore.closeModal()}
//                         variant={ButtonVariant["accent-outline"]}
//                     />
//                       <Button
//                         text={"Сохранить"}
//                         type={'button'}
//                         isOnce={true}
//                         disabled={!!values.company_id}
//                         action={() => {
//                           if(values.company_id || values.filial_id) {
//                             const _id  = values.filial_id !== null ? Number(values.filial_id) : values.company_id
//                             _id && agent.Price.createPrice(_id)
//                             .then(r => {
//                               if(r.status === 201) {
//                                 mutate().then(() => {
//                                     store.appStore.closeModal()
//                                   }
//                                 )
//                               }
//                           })
//                             }
//                         }}
//                         className={'!flex-1'}
//                         // action={async () => {
//                         //     store.
//                         // }}
//                         variant={ButtonVariant.accent} />
//                     </footer>
//                 </Form>
//             )}
//         </Formik>
//     )
// }
const FormModalCreatePrice =  (props: { opened: boolean, onClose: () => void , mutateSWR: any}) => {

  const store = useStore()
  const {mutate} = useSWR('prices')
  const group = store.permissionStore.getCompanyPermissions
  const initValues = {
    company_id: null,
    filial_id: null
  }

  const form = useForm({
    name: 'createModalPrice',
    initialValues: initValues,
    validateInputOnBlur: true,
    // onValuesChange: (values, previous) => console.log(values),
    validate: yupResolver(CreateModalPrice),
  })
  React.useEffect(() => {
    form.reset();
    // (async () => await store.permissionStore.loadCompanyPermissions(
    //   Number(props.company_id),
    // ))()
  }, [props.opened]);
  const [memData, setMemData] = React.useState<any>({
    company: ['Нет'],
    filials: ['Нет']
  })
  const allCompanies = store.companyStore.getCompanies()
  React.useEffect(() => {
    const companies = allCompanies.filter((c: any) => c.parent === null && c.company_type === "Клиент")
    const filials = allCompanies.filter((c: any) => c.parent !== null && c.parent.id == form.values.company_id)
    console.log(filials, form.values.company_id, allCompanies);
    setMemData({
      company: companies.map((c:any) => ({
        label: c.name,
        value: String(c.id)
      })),
      filials: filials.map((c:any) => ({
        label: c.name,
        value: String(c.id)
      }))
    })

  }, [form.values.company_id])
  console.log(memData);
  // @ts-ignore
  // const memData = React.useMemo(  ():any => {
  //   let ar = group
  //
  //   // @ts-ignore
  //   if(ar.length > 0) return ar.map((item: any) => ({label: item.name, value: String(item.id)}))
  //   return null
  //   // @ts-ignore
  // }, [props.company_id, group])
  //   React.useEffect(() => {
  //     form.reset();
  //     (async () => await store.permissionStore.loadCompanyPermissions(
  //       Number(props.company_id),
  //     ))()
  //   }, [props.opened]);


  return (
    <Modal.Root size={'md'} opened={props.opened} onClose={props.onClose} centered className={'z-[999]'}>
      <Modal.Overlay className={'bg-black/90'}/>
      <Modal.Content radius={20} className={styles.ModalUpBalance + " " + "tablet-max:*:!block tablet-max:*:!px-3"}>
        <Modal.Header className={'static'}>
          <Modal.Title>
            <Heading
              text={'Создать прайс-лист Клиенту'}
              className={'col-span-2 !mb-8'}
              variant={HeadingVariant.h3}
              color={HeadingColor.accent}
            /></Modal.Title>
          <Modal.CloseButton className={"hover:rotate-90 hover:bg-transparent transition-all absolute top-5 right-5 tablet-max:hidden"} icon={<SvgClose className={'close__modal'} />}/>
        </Modal.Header>
        <Modal.Body className={'!p-0'}>
          <form onSubmit={form.onSubmit((props) => console.log('form', props))}
            onReset={form.onReset}
            className={'tablet:grid grid-cols-1 gap-4'}

          >
            <Select clearable
              label={'Выберите компанию'}
              placeholder={'Компания'}
              maxDropdownHeight={200}
              {...form.getInputProps('company_id')}
              onOptionSubmit={() => {
                form.reset()
              }}
              data={memData.company} />
            <Select label={'Выберите филиал'}
              placeholder={'Филиал'}
              maxDropdownHeight={200}
              {...form.getInputProps('filial_id')}
              disabled={memData.filials.length === 0}
              data={memData.filials} />
          </form>
          <footer className={'!pt-8  tablet-max:flex tablet-max:flex-col'}>
            <Button type={'button'}
              text={'Сохранить'}
              action={() => {
                if(form.values.company_id || form.values.filial_id) {
                  const _id  = form.values.filial_id !== null ? Number(form.values.filial_id) : form.values.company_id
                  _id && agent.Price.createPrice(_id)
                  .then(r => {
                    if(r.status === 201) {
                      mutate().then((r) => {
                        props.mutateSWR()
                        props.onClose()
                        }
                      )
                    }
                  })
                }
              }}
              isOnce={false}
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
export default observer(FormModalCreatePrice)
