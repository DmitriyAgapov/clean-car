import React, { useState } from 'react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import 'yup-phone-lite'
import { useStore } from 'stores/store'
import { useNavigate, useRevalidator } from "react-router-dom";
import { FormStep1 } from 'components/Form/FormCreateFilials/Steps/StepOne'
import { type Company, CompanyType } from 'stores/companyStore'
import { UserTypeEnum } from 'stores/userStore'
import { observer } from 'mobx-react-lite'
import { FormStepTwo } from "components/Form/FormCreateFilials/Steps/StepTwoThree";
import { FormStepSuccess } from "components/Form/FormCreateFilials/Steps/StepSuccess";

const SignupSchema = Yup.object().shape({
    filial_name: Yup.string().min(1, 'Слишком короткое!').max(255, 'Слишком длинное!').required('Обязательное поле'),
    address: Yup.string(),
    city: Yup.string(),
    status: Yup.string()
})


type FormCreateCompanyProps = {}

interface InitValues {
    id: number
    filial_name: string
    filial_id: number
    company_id: number
    company_name: string
    address: string
    city: string
    type: string
    status: boolean
    company_filials: string
    application_type: CompanyType,
    readOnly: boolean
    lat: number
    lon: number
    service_percent: number
}

const FormCreateFilials = () => {
    const store = useStore()
    const [step, setStep] = useState(1)
    const [animate, setAnimate] = useState(false)
    // @ts-ignore
    const initValues:InitValues = {
        id: 0,
        filial_name:  '',
        filial_id: 0,
        company_id: store.userStore.currentUser?.company?.id ?? 0 ,
        company_name: store.userStore.myProfileData?.company?.name ?? '',
        address: '',
        city: '',
        status: true,
        company_filials: 'company',
        type: store.appStore.appType !== UserTypeEnum.admin ? store.appStore.appType : '',
        application_type: CompanyType.customer,
        // @ts-ignore
        readOnly: Boolean(store.userStore.currentUser?.company?.id),
        // contacts: '',
        lat: 0,
        lon: 0,
        service_percent: 1,
        // overdraft_sum: 123,
        // payment: Payment.postoplata,
        // overdraft: 'Да',
        // performers_list: 'Да',
        // bill: '100',
    }
    const changeStep = (step?: number) => {
        setAnimate((prevState) => !prevState)
        setTimeout(() => {
            setAnimate(false)
            store.companyStore.loadingCompanies = false
            setStep(step ? step : 2)
        }, 1200)
    }
    const navigate = useNavigate()
    const revalidate = useRevalidator()
    return (
        <Formik
            initialValues={initValues}
            validationSchema={SignupSchema}
            onSubmit={(values) => {

                if (values.application_type == CompanyType.performer) {

                    const data:Company<CompanyType.performer> = {
                        city:  Number(values.city),
                        is_active: true,
                        name: values.filial_name,
                        performerprofile:  {
                            address: values.address,
                            lat: Number(values.lat),
                            lon: Number(values.lon),
                            service_percent: values.service_percent ?? 1,
                        }
                    }

                    store.companyStore.createFilial(data,'performer',  values.company_id).then((r) => {
                        values.id = r.id
                        revalidate.revalidate()
                        navigate(`/account/filials/performer/${values.company_id}/${r.id}`)
                    })
                }
                if (values.application_type == CompanyType.customer) {

                    const data:Company<CompanyType.customer> = {
                        name: values.filial_name,
                        is_active: true,
                        city: Number(values.city),
                        customerprofile: {
                            address: values.address,
                            lat: Number(values.lat),
                            lon: Number(values.lon)
                        }
                    }

                    store.companyStore.createFilial(data, 'customer', values.company_id).then((r) => {
                        values.id = r.id
                        revalidate.revalidate()
                        navigate(`/account/filials/performer/${values.company_id}/${r.id}`)
                    })
                }
            }}
        >
            {({ errors, touched, values, isValid }) => (
                <Form style={{ display: 'contents' }}>
                  <FormStep1 step={step}
                    animate={animate}
                    action={() => navigate(-1)}
                    values={values}
                    action1={() => changeStep(2)}
                    errors={errors}
                    touched={touched}
                    store={store}
                    prop8={(o: any) => ({
                      label: o.name, value: String(o.id)
                    })} />
                  <FormStepSuccess step={step} animate={animate}
                    action={() => changeStep(1)}
                    values={values}
                    errors={errors}

                    touched={touched}
                    store={store}

                  />
                  {/*  <FormStepSuccess step={step} animate={animate} */}

                  {/*   values={values} */}
                  {/*   touched={touched} */}
                  {/*   store={store}  prop8={(o: any) => ({ */}
                  {/*   label: o.name, value: String(o.id) */}
                  {/* })} title={step == 3 ? '3' : '2'}/> */}

                </Form>
            )}
        </Formik>
    )
}

export default observer(FormCreateFilials);
