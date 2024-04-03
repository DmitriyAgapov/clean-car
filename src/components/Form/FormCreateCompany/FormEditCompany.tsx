import React, { useState } from 'react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import 'yup-phone-lite'
import { useStore } from 'stores/store'
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { FormStep1 } from "components/Form/FormCreateCompany/Steps/StepOne";
import { FormStepTwo } from "components/Form/FormCreateCompany/Steps/StepTwoThree";
import { FormStepSuccess } from "components/Form/FormCreateCompany/Steps/StepSuccess";
import { Company, CompanyType } from "stores/companyStore";
import { observer } from "mobx-react-lite";
import { string } from "yup";

const SignupSchema = Yup.object().shape({
    company_name: Yup.string().min(1, 'Слишком короткое!').max(255, 'Слишком длинное!').required('Обязательное поле'),
    address: Yup.string().min(2, 'Слишком короткое!').required('Обязательное поле'),
    legal_address: Yup.string().min(2, 'Слишком короткое!').required('Обязательное поле'),
    inn: Yup.string().min(2, 'Слишком короткое!').max(255, 'Слишком длинное!').required('Обязательное поле'),
    ogrn: Yup.string().min(2, 'Слишком короткое!').max(255, 'Слишком длинное!').required('Обязательное поле'),
    contacts: Yup.string().min(2, 'Слишком короткое!').required('Обязательное поле'),
})

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
    const {data:loaderData, type}:any = useLoaderData()

    const navigate = useNavigate()


    const initValues = {
        id: id,
        company_name: loaderData.company.data?.name,
        address: loaderData.company.data[`${type}profile`].address ? loaderData.company.data[`${type}profile`].address : "Нет адреса",
        city: String(loaderData.company.data.city.id),
        inn: Number(loaderData.company.data[`${type}profile`].inn),
        ogrn: Number(loaderData.company.data[`${type}profile`].ogrn),
        legal_address: loaderData.company.data[`${type}profile`].legal_address,
        // @ts-ignore
        application_type: CompanyType[type],
        lat: 0,
        lon: 0,
        working_time: loaderData.company.data[`${type}profile`].working_time,
        contacts: loaderData.company.data[`${type}profile`].contacts,
        service_percent: loaderData.company.data[`${type}profile`].service_percent | 0,
        overdraft_sum: loaderData.company.data[`${type}profile`].overdraft_sum,
        payment: loaderData.company.data[`${type}profile`].payment,
        overdraft: loaderData.company.data[`${type}profile`].overdraft ? "1" : "2",
        performers_list: 'Да',
        bill: loaderData.company.data[`${type}profile`].bill,
    }

    return (
        <Formik
            initialValues={initValues}
            validationSchema={SignupSchema}
            onSubmit={(values) => {

                if (values.application_type === CompanyType.performer) {
                    const data:Company<CompanyType.performer> = {
                        city:  Number(values.city),
                        is_active: true,
                        name: values.company_name,
                        performerprofile:  {
                            address: values.address,
                            inn: String(values.inn),
                            ogrn: String(values.ogrn),
                            legal_address: values.legal_address,
                            contacts: values.contacts,
                            application_type: values.application_type.value,
                            lat: Number(values.lat),
                            lon: Number(values.lon),
                            service_percent: values.service_percent,
                            working_time: values.working_time
                        }
                    }

                    store.companyStore.editCompany(data, CompanyType.performer, values.id).then((r) => {
                        !r.status ? navigate(`/account/companies/performer/${values.id}`) : 'Ошибка'
                    })
                }
                if (values.application_type.value === CompanyType.customer) {

                        const data:Company<CompanyType.customer> = {

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
                                lat: Number(values.lat),
                                lon: Number(values.lon),
                                performer_company: [4]
                            }
                        }


                        store.companyStore.editCompany(data, CompanyType.customer, values.id).then((r) => {
                            !r.status ? navigate(`/account/companies/customer/${values.id}`) : 'Ошибка'
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
                    action1={() => {
                        changeStep(2)

                    }}
                    errors={errors}
                    touched={touched}
                    store={store}
                    prop8={(o: any) => ({
                      label: o.name, value: String(o.id)
                    })} />
                  <FormStepTwo step={step} animate={animate}
                    action={() => changeStep(1)}
                    values={values}

                    errors={errors}
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

export default observer(FormEditCompany);
