import React, { useState } from 'react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import 'yup-phone-lite'
import { useStore } from 'stores/store'
import { useNavigate } from 'react-router-dom'
import { FormStep1 } from "components/Form/FormCreateCompany/Steps/StepOne";
import { FormStepTwo } from "components/Form/FormCreateCompany/Steps/StepTwoThree";
import { FormStepSuccess } from "components/Form/FormCreateCompany/Steps/StepSuccess";
import { CreateFormikInput } from "components/common/ui/CreateInput/CreateInput";
import SelectPure from "components/common/ui/Select/SelectPure";
import Select from "components/common/ui/Select/Select";
import SelectCustom from "components/common/ui/Select/Select";

const SignupSchema = Yup.object().shape({
    company_name: Yup.string().min(1, 'Слишком короткое!').max(255, 'Слишком длинное!').required('Обязательное поле'),
    address: Yup.string().min(2, 'Слишком короткое!').required('Обязательное поле'),
    legal_address: Yup.string().min(2, 'Слишком короткое!').required('Обязательное поле'),
    inn: Yup.string().min(2, 'Слишком короткое!').max(255, 'Слишком длинное!').required('Обязательное поле'),
    ogrn: Yup.string().min(2, 'Слишком короткое!').max(255, 'Слишком длинное!').required('Обязательное поле'),
    contacts: Yup.string().min(2, 'Слишком короткое!').required('Обязательное поле'),
})
const initValues = {
    company_name: '',
    address: '',
    city: '',
    inn: '',
    ogrn: '',
    legal_address: '',
    application_type: 'customer',
    contacts: '',
    service_percent: 0,
    overdraft_sum: 123,
    payment: 'Предоплата',
    overdraft: 'Да',
    executors_list: 'Да',
    bill: '100',
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
                if (values.application_type === 'Исполнитель') {
                    store.companyStore.addCompany({ company: { name: values.company_name, is_active: true, /* @ts-ignore */ city: values.city, }, address: values.address, connected_prices: 'string', inn: String(values.inn), ogrn: String(values.ogrn), legal_address: values.legal_address, contacts: values.contacts, service_percent: values.service_percent, application_type: values.application_type, }, 'Исполнитель',).then(() => changeStep(3))
                }
                if (values.application_type === 'Заказчик') {
                    const data = {
                        ...values,
                        company: {
                            name: values.company_name,
                            is_active: true, // @ts-ignore
                            city: Number(values.city),
                        },
                        address: values.address,
                        connected_prices: 'some prices',
                        inn: String(values.inn),
                        ogrn: String(values.ogrn),
                        legal_address: values.legal_address,
                        contacts: values.contacts,
                        application_type: values.application_type,
                        overdraft: values.overdraft === '1',
                    }
                    store.companyStore.addCompany(data, 'Заказчик').then(() => changeStep(3))
                }
            }}
        >
            {({ errors, touched, values }) => (
                <Form style={{ display: 'contents' }}>

                        <CreateFormikInput fieldName={'user_firstName'} label={'Имя'} placeHolder={""} fieldType={"text"} className={'col-span-3'}/>
                        <CreateFormikInput fieldName={'user_lastName'} label={'Фамилия'} placeHolder={""} fieldType={"text"} className={'col-span-3'}/>
                        <CreateFormikInput fieldName={'user_phone'} label={'Номер телефона'} placeHolder={""} fieldType={"tel"} className={'col-span-3'}/>
                        <CreateFormikInput fieldName={'user_email'} label={'E-mail'} placeHolder={""} fieldType={"email"} className={'col-span-3'}/>
                        <SelectCustom value={""} name={'user_type'} label={'Тип'} options={['Администратор']} className={'col-span-2'}/>
                        <SelectCustom value={""} name={'user_groups'} label={'Группа'} options={['Администратор']} className={'col-span-2'}/>
                        <SelectCustom value={""} name={'user_status'} label={'Статус'} options={['Администратор']} className={'col-span-2'}/>
                </Form>
            )}
        </Formik>
    )
}

export default FormCreateUser;
