import React, { useState } from 'react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import 'yup-phone-lite'
import { useStore } from 'stores/store'
import { useNavigate } from 'react-router-dom'
import { CreateFormikInput } from 'components/common/ui/CreateInput/CreateInput'
import SelectCustom from 'components/common/ui/Select/Select'
import { UserTypeEnum } from 'stores/userStore'
import label from "utils/labels";
const SignupSchema = Yup.object().shape({
    first_name: Yup.string().min(1, 'Слишком короткое!').max(255, 'Слишком длинное!').required('Обязательное поле'),
    last_name: Yup.string().min(1, 'Слишком короткое!').max(255, 'Слишком длинное!').required('Обязательное поле'),
    phone: Yup.string()
    .max(16, 'Слишком длинное!')
    .phone('RU', 'Введите правильный номер')
    .required('Требуется номер телефона'),
    email: Yup.string().email('Неверный email').required('Укажите email')
})
const initValues = {
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    user_type: UserTypeEnum.executor,
    group: null,
    is_active: true
}
type FormCreateCompanyProps = {}
const FormCreateUser = () => {
    const store = useStore()
    const [step, setStep] = useState(1)
    const [animate, setAnimate] = useState(false)
    const changeStep = (step?: number) => {
        setAnimate((prevState) => !prevState)
        setTimeout(() => {
            setAnimate(false)
            setStep(step ? step : 2)
        }, 1200)
    }
    const navigate = useNavigate()
    return (
        <Formik
            initialValues={initValues}
            validationSchema={SignupSchema}
            onSubmit={(values) => {
                if (values.user_type === UserTypeEnum.executor) {
                    // store.companyStore.addCompany({ company: { name: values.company_name, is_active: true, /* @ts-ignore */ city: values.city, }, address: values.address, connected_prices: 'string', inn: String(values.inn), ogrn: String(values.ogrn), legal_address: values.legal_address, contacts: values.contacts, service_percent: values.service_percent, application_type: values.application_type, }, 'Исполнитель',).then(() => changeStep(3))
                }
                if (values.user_type === UserTypeEnum.customer) {
                    // const data = {
                    //     ...values,
                    //     company: {
                    //         name: values.company_name,
                    //         is_active: true, // @ts-ignore
                    //         city: Number(values.city),
                    //     },
                    //     address: values.address,
                    //     connected_prices: 'some prices',
                    //     inn: String(values.inn),
                    //     ogrn: String(values.ogrn),
                    //     legal_address: values.legal_address,
                    //     contacts: values.contacts,
                    //     application_type: values.application_type,
                    //     overdraft: values.overdraft === '1',
                    // }
                    // store.companyStore.addCompany(data, 'Заказчик').then(() => changeStep(3))
                }
            }}
        >
            {({ errors, touched, values }) => (
                <Form style={{ display: 'contents' }}>

                        <CreateFormikInput fieldName={'user_firstName'} label={'Имя'} placeHolder={""} fieldType={"text"} className={'col-span-3'}/>
                        <CreateFormikInput fieldName={'user_lastName'} label={'Фамилия'} placeHolder={""} fieldType={"text"} className={'col-span-3'}/>
                        <CreateFormikInput fieldName={'user_phone'} label={'Номер телефона'} placeHolder={""} fieldType={"tel"} className={'col-span-3'}/>
                        <CreateFormikInput fieldName={'user_email'} label={'E-mail'} placeHolder={""} fieldType={"email"} className={'col-span-3'}/>
                        <SelectCustom value={""} name={'user_type'} label={'Тип'} options={Object.entries(UserTypeEnum).map((item:any) => ({  label: label(item[0]), value: item[1] }))} className={'col-span-2'}/>
                        <SelectCustom value={""} name={'user_groups'} label={'Группа'} options={store.permissionStore.permissions.map((item:any) => ({  label: item.name, value: String(item.id)}))} className={'col-span-2'}/>
                        <SelectCustom value={""} name={'user_status'} label={'Статус'} options={[{  label: 'Активен', value: 'true'},{  label: 'Неактивен', value: 'false'}]} className={'col-span-2'}/>
                </Form>
            )}
        </Formik>
    )
}

export default FormCreateUser;
