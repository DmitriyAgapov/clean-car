import React, { useState } from 'react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import 'yup-phone-lite'
import { useStore } from 'stores/store'
import { useNavigate, useParams } from 'react-router-dom'
import { FormStep1 } from "components/Form/FormCreateCompany/Steps/StepOne";
import { FormStepTwo } from "components/Form/FormCreateCompany/Steps/StepTwoThree";
import { FormStepSuccess } from "components/Form/FormCreateCompany/Steps/StepSuccess";

const SignupSchema = Yup.object().shape({
    company_name: Yup.string().min(1, 'Слишком короткое!').max(255, 'Слишком длинное!').required('Обязательное поле'),
    address: Yup.string().min(2, 'Слишком короткое!').required('Обязательное поле'),
    legal_address: Yup.string().min(2, 'Слишком короткое!').required('Обязательное поле'),
    inn: Yup.string().min(2, 'Слишком короткое!').max(255, 'Слишком длинное!').required('Обязательное поле'),
    ogrn: Yup.string().min(2, 'Слишком короткое!').max(255, 'Слишком длинное!').required('Обязательное поле'),
    contacts: Yup.string().min(2, 'Слишком короткое!').required('Обязательное поле'),
})

type FormCreateCompanyProps = {}



const FormEditCompany = ({data}:any) => {
    const store = useStore()
    const [step, setStep] = useState(1)
    const [animate, setAnimate] = useState(false)
    const { companytype, id } = useParams();
    const changeStep = (step?: number) => {
        setAnimate((prevState) => !prevState)
        setTimeout(() => {
            setAnimate(false)
            setStep(step ? step : 2)
        }, 1200)
    }
    const companyData:any = store.companyStore.fullCompanyData.get(`${id}`)
    // @ts-ignore
    const {address, company, contacts, inn, ogrn, legal_address, service_percent} = companyData.company.data;

    console.log(address, company, contacts, inn, ogrn, legal_address, service_percent);
    const navigate = useNavigate()
    const initValues = {
        company_name: company.name,
        address: address,
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
                  <FormStep1 step={step}
                    animate={animate}
                    action={() => navigate(-1)}
                    values={values}
                    action1={() => changeStep()}
                    errors={errors}
                    touched={touched}
                    store={store}
                    prop8={(o: any) => ({
                      label: o.name, value: String(o.id)
                    })} />
                  <FormStepTwo step={step} animate={animate}
                    action={() => changeStep(1)}
                    values={values}
                    action1={() => changeStep()} errors={errors}
                    touched={touched}
                    store={store}  prop8={(o: any) => ({
                    label: o.name, value: String(o.id)
                  })}/>
                   <FormStepSuccess step={step} animate={animate}

                    values={values}
                    touched={touched}
                    store={store}  prop8={(o: any) => ({
                    label: o.name, value: String(o.id)
                  })} title={step == 3 ? '3' : '2'}/>

                </Form>
            )}
        </Formik>
    )
}

export default FormEditCompany;
