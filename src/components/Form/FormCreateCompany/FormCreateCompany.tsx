import React, { useState } from 'react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import 'yup-phone-lite'
import { useStore } from 'stores/store'
import { useNavigate } from 'react-router-dom'
import { FormStep1 } from "components/Form/FormCreateCompany/Steps/StepOne";
import { FormStepTwo } from "components/Form/FormCreateCompany/Steps/StepTwoThree";
import { FormStepSuccess } from "components/Form/FormCreateCompany/Steps/StepSuccess";
import { CompanyType, Payment } from "stores/companyStore";
import type { Company } from "stores/companyStore";

const SignupSchema = Yup.object().shape({
    company_name: Yup.string().min(1, 'Слишком короткое!').max(255, 'Слишком длинное!').required('Обязательное поле'),
    address: Yup.string().min(2, 'Слишком короткое!').required('Обязательное поле'),
    legal_address: Yup.string().min(2, 'Слишком короткое!').required('Обязательное поле'),
    inn: Yup.string().min(2, 'Слишком короткое!').max(255, 'Слишком длинное!').required('Обязательное поле'),
    ogrn: Yup.string().min(2, 'Слишком короткое!').max(255, 'Слишком длинное!').required('Обязательное поле'),
    contacts: Yup.string().min(2, 'Слишком короткое!').required('Обязательное поле'),
    service_percent: Yup.number().min(0, 'Минимум').max(100, 'Максимум')
})
const initValues = {
    id: 0,
    company_name: '',
    address: '',
    city: '',
    inn: '',
    ogrn: '',
    legal_address: '',
    application_type: CompanyType.performer,
    contacts: '',
    service_percent: 0,
    overdraft_sum: 123,
    payment: Payment.postoplata,
    overdraft: 'Да',
    executors_list: 'Да',
    bill: '100',
}

type FormCreateCompanyProps = {}



const FormCreateCompany = () => {
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
                if (values.application_type === CompanyType.performer) {
                    const data:Company<CompanyType.performer> = {
                        company_type: values.application_type,
                        city:  Number(values.city),
                        name: values.company_name,
                        performerprofile:  {
                            address: values.address,
                            inn: values.inn,
                            ogrn: values.ogrn,
                            legal_address: values.legal_address,
                            contacts: values.contacts,
                            application_type: values.application_type,
                            lat: 0,
                            lon: 0,
                            service_percent: values.service_percent,
                            working_time: ''
                        }
                    }
                    store.companyStore.addCompany(data, CompanyType.performer).then((r) => {
                        values.id = r.id
                        console.log(values);
                        changeStep(3)
                    })
                }
                if (values.application_type === CompanyType.customer) {
                    console.log(values);
                    const data:Company<CompanyType.customer> = {

                        company_type: values.application_type,

                        name: values.company_name,
                            is_active: true,
                            city: Number(values.city),
                        customerprofile: {
                             address: values.address,
                                payment: values.payment,
                             inn: String(values.inn),
                             ogrn: String(values.ogrn),
                             legal_address: values.legal_address,
                             contacts: values.contacts,
                            bill: String(values.bill),
                             overdraft: values.overdraft === '1',
                             overdraft_sum: values.overdraft_sum,

                            performer_company: [4]
                        }
                    }
                    store.companyStore.addCompany(data, CompanyType.customer).then((r) => {
                        console.log(r);
                        values.id = r.id
                        console.log(values);
                        changeStep(3)
                    })
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

export default FormCreateCompany;
