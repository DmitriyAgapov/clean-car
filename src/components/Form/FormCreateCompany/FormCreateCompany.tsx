import React, { useState } from 'react'
import styles from './FormCreateCompany.module.scss'
import { Field, Form, Formik} from 'formik'
import * as Yup from 'yup'
import 'yup-phone-lite'
import Panel, { PanelVariant } from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import { useStore } from 'stores/store'
import Button, { ButtonVariant } from 'components/common/ui/Button/Button'
import { useNavigate } from 'react-router-dom'
import SelectFromList from 'components/common/SelectFromList/SelectFromList'
import SelectCustom from "components/common/ui/Select/Select";
const SignupSchema =  Yup.object().shape({
    company_name: Yup.string()
        .min(1, 'Слишком короткое!')
        .max(255, 'Слишком длинное!')
        .required('Обязательное поле'),
    address: Yup.string()
        .min(2, 'Слишком короткое!')
        .required('Обязательное поле'),
    legal_address: Yup.string()
    .min(2, 'Слишком короткое!')
    .required('Обязательное поле'),
    inn: Yup.string()
    .min(2, 'Слишком короткое!')
    .max(255, 'Слишком длинное!')
    .required('Обязательное поле'),
    ogrn: Yup.string()
    .min(2, 'Слишком короткое!')
    .max(255, 'Слишком длинное!')
    .required('Обязательное поле'),
    contacts:  Yup.string()
    .min(2, 'Слишком короткое!')
    .required('Обязательное поле'),



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
    bill: "100",

}
type FormCreateCompanyProps = {}
const FormCreateCompany = () => {
    const store = useStore()
    const [step, setStep] = useState(1)
    const [animate, setAnimate] = useState(false)
    const changeStep = () => {
        setAnimate((prevState) => !prevState)
        setTimeout(() => {
            setAnimate(false)
            setStep(2)
        }, 1200)
    }
    const navigate = useNavigate()
    return (<Formik initialValues={initValues}
        validationSchema={SignupSchema}
        onSubmit={values => {

            if(values.application_type === 'Исполнитель') {

                store.companyStore.addCompany({
                    company: {
                        name: values.company_name,
                        is_active: true,
                        // @ts-ignore
                        city: values.city
                    },
                    address: values.address,
                    connected_prices: "string",
                    inn: String(values.inn),
                    ogrn:  String(values.ogrn),
                    legal_address: values.legal_address,
                    contacts: values.contacts,
                    service_percent: values.service_percent,
                    application_type: values.application_type
                }, 'Исполнитель')
            }
            if(values.application_type === 'Заказчик') {

                const data = {
                    ...values,
                    company: {
                        name: values.company_name,
                        is_active: true,
                        // @ts-ignore
                        city: Number(values.city)
                    },
                    address: values.address,
                    connected_prices: "some prices",
                    inn: String(values.inn),
                    ogrn:  String(values.ogrn),
                    legal_address: values.legal_address,
                    contacts: values.contacts,
                    application_type: values.application_type,
                    overdraft: values.overdraft === "1"

                }
                console.log(data);
                store.companyStore.addCompany(data, 'Заказчик')
            }

            // same shape as initial values

        }}>
          {({ errors, touched,values }) => (
            <Form>
              <Panel
                                            variant={PanelVariant.withPaddingSmWithBody}
                                            state={step !== 1}
                                            className={'overflow-x-hidden'}
                                            headerClassName={!animate ? 'slide-in-left' : 'slide-out-right'}
                                            bodyClassName={!animate ? 'slide-in-left-500' : 'slide-out-right-500'}
                                            footer={
                                                <div className={'accounts-group_header gap-4 text-[#606163] grid font-medium'}>
                                                    <div className={'flex justify-end gap-5 justify-self-end'}>
                                                        <Button
                                                            text={'Отменить'}
                                                            action={() => navigate(-1)}
                                                            className={'float-right'}
                                                            variant={ButtonVariant['accent-outline']}
                                                        />

                                                        {values.application_type == 'Заказчик' ? (
                                                            <Button
                                                                text={'Дальше'}
                                                                // action={async () => {
                                                                //   // @ts-ignore
                                                                //   await store.permissionStore.createPermissionStoreAdmin(changes)
                                                                //   setTimeout(() => navigate('/account/groups'), 500)
                                                                //   // navigate('/account/groups')
                                                                // }}
                                                                // action={(event) => handleSubmit(event)}
                                                                action={() => changeStep()}
                                                                className={'float-right'}
                                                                variant={ButtonVariant.accent}
                                                            />
                                                        ) : (
                                                            <Button
                                                                type={'submit'}
                                                                text={'Сохранить'}
                                                                className={'float-right'}
                                                                variant={ButtonVariant.accent}
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                            }
                                            header={
                                                <>
                                                    <Heading
                                                        text={'Шаг 1. Основная информация'}
                                                        color={HeadingColor.accent}
                                                        variant={HeadingVariant.h2}
                                                        className={'mb-6'}
                                                    />
                                                    <div className={'text-base'}>
                                                        Укажите основную информацию о компании для добавления ее в список
                                                    </div>
                                                </>
                                            }
                                        >

                                            <div className={'mt-10 flex flex-wrap gap-6'}>
                                                <label className={'account-form__input w-full flex-grow  !flex-[1_0_20rem]'} htmlFor={'company_name'}  data-form_error={(errors.company_name && touched.company_name) && "error"}>
                                                    {'Название компании'}
                                                    <Field id={'company_name'} name="company_name" placeholder={'Введите название компании'} type={'text'}/>
                                                    {errors.company_name && touched.company_name ? (<div className={'form-error'}>{errors.company_name}</div>) : null}
                                                </label>
                                                <SelectCustom label={'Город'} value={values.city} name={'city'} className={' w-fit'} options={[
                                                    {
                                                        label: "Миасс",
                                                        value: "2161"
                                                    },
                                                    {
                                                        label: "Москва",
                                                        value: "1619"
                                                    },
                                                    {
                                                        label: "Санкт-Петербург",
                                                        value: "1895"
                                                    }
                                                ]}/>
                                                <label className={'account-form__input w-full flex-grow  !flex-[1_0_20rem]'} htmlFor={'address'}  data-form_error={(errors.address && touched.address) && "error"}>
                                                    {'Адрес'}
                                                    <Field id={'address'} name="address" placeholder={'Введите название компании'} type={'text'}/>
                                                    {errors.address && touched.address ? (<div className={'form-error'}>{errors.address}</div>) : null}
                                                </label>

                                                <label className={'account-form__input w-full flex-grow  !flex-[1_0_20rem]'} htmlFor={'inn'}  data-form_error={(errors.inn && touched.inn) && "error"}>
                                                    {'ИНН'}
                                                    <Field id={'inn'} name="inn" placeholder={'Введите название компании'} type={'number'}/>
                                                    {errors.inn && touched.inn ? (<div className={'form-error'}>{errors.inn}</div>) : null}
                                                </label>
                                                <label className={'account-form__input w-full flex-grow  !flex-[1_0_20rem]'} htmlFor={'ogrn'} data-form_error={(errors.ogrn && touched.ogrn) && "error"}>
                                                    {'ОГРН'}
                                                    <Field id={'ogrn'} name="ogrn" placeholder={'Введите название компании'} type={'number'}/>
                                                    {errors.ogrn && touched.ogrn ? (<div className={'form-error'}>{errors.ogrn}</div>) : null}
                                                </label>
                                                <label className={'account-form__input w-full flex-grow  !flex-[1_0_20rem]'} htmlFor={'legal_address'} data-form_error={(errors.legal_address && touched.legal_address) && "error"}>
                                                    {'Юридический адрес'}
                                                    <Field id={'legal_address'} name="legal_address" placeholder={'Введите название компании'} type={'text'}/>
                                                    {errors.legal_address && touched.legal_address ? (<div className={'form-error'}>{errors.legal_address}</div>) : null}
                                                </label>
                                                <hr className={'my-10 flex-[1_0_100%] w-full border-gray-2'} />
                                                <SelectCustom label={'Тип'} value={values.city} name={'application_type'} className={' w-fit'} options={[
                                                    { label: 'Заказчик', value: 'Заказчик' },
                                                    { label: 'Исполнитель', value: 'Исполнитель' }
                                                ]}/>
                                                {values.application_type == "Исполнитель" &&   <label className={'account-form__input  !flex-[0_0_14rem]'} htmlFor={'service_percent'} data-form_error={(errors.service_percent && touched.service_percent) && "error"}>
                                                    {'Процент сервиса'}
                                                    <Field id={'service_percent'} name="service_percent" placeholder={'Введите название компании'} type={'number'}/>
                                                    {errors.service_percent && touched.service_percent ? (<div className={'form-error'}>{errors.service_percent}</div>) : null}
                                                </label>}
                                                <label className={'account-form__input w-full flex-grow  !flex-[1_1]'} htmlFor={'contacts'} data-form_error={(errors.contacts && touched.contacts) && "error"}>
                                                    {'Контактные данные'}
                                                    <Field id={'contacts'} name="contacts" placeholder={'Введите название компании'} type={'text'}/>
                                                    {errors.contacts && touched.contacts ? (<div className={'form-error'}>{errors.contacts}</div>) : null}
                                                </label>
                                            </div>
                                        </Panel>
                                        <Panel
                                            state={step !== 2}
                                            className={'overflow-x-hidden'}
                                            headerClassName={!animate ? 'slide-in-left' : 'slide-out-right'}
                                            bodyClassName={!animate ? 'slide-in-left-500' : 'slide-out-right-500'}
                                            variant={PanelVariant.withPaddingSmWithBody}
                                            footer={
                                                <div
                                                    className={
                                                        'accounts-group_header gap-4 text-[#606163] grid grid-cols-[1.25fr_2fr] grid- font-medium'
                                                    }
                                                >
                                                    <Button text={'Назад'} action={() => setStep(1)} className={'justify-self-start'} />
                                                    <div className={'flex justify-end gap-5 justify-self-end'}>
                                                        <Button
                                                            text={'Отменить'}
                                                            action={() => navigate(-1)}
                                                            className={'float-right'}
                                                            variant={ButtonVariant['accent-outline']}
                                                        />

                                                        <Button
                                                            text={'Сохранить'}
                                                            // action={async () => {
                                                            //   // @ts-ignore
                                                            //   await store.permissionStore.createPermissionStoreAdmin(changes)
                                                            //   setTimeout(() => navigate('/account/groups'), 500)
                                                            //   // navigate('/account/groups')
                                                            // }}
                                                            type={'submit'}
                                                            className={'float-right'}
                                                            variant={ButtonVariant.accent}
                                                        />
                                                    </div>
                                                </div>
                                            }
                                            header={
                                                <>
                                                    <Heading
                                                        text={'Шаг 2. Информация о счете и индивидуальные настройки '}
                                                        color={HeadingColor.accent}
                                                        variant={HeadingVariant.h2}
                                                        className={'mb-6'}
                                                    />
                                                    <div className={'text-base'}>
                                                        Укажите информацию о счета компании и предпочтительных исполнителей, если такие
                                                        есть
                                                    </div>
                                                </>
                                            }
                                        >
                                            <div className={'mt-10 flex flex-wrap gap-6'}>
                                                <SelectCustom label={'Оплата'} value={values.payment} name={'payment'} className={' w-fit  !flex-[0_0_10rem]'} options={[
                                                    { label: 'Постоплата', value: "Постоплата" }, { label: 'Предоплата',  value: "Предоплата" }
                                                ]}/>

                                                <SelectCustom label={'Овердрафт'} value={values.overdraft} name={'overdraft'} className={' w-fit  !flex-[0_0_10rem]'} options={[
                                                    { label: 'Да', value: "1" }, { label: 'Нет', value: "2" }
                                                ]}/>
                                                <label className={'account-form__input w-full flex-grow   !flex-[0_0_10rem]'} htmlFor={'overdraft_sum'}  data-form_error={(errors.overdraft_sum && touched.overdraft_sum) && "error"}>
                                                    {' '}
                                                    <Field id={'overdraft_sum'} name="overdraft_sum" placeholder={'Введите название компании'} type={'number'}/>
                                                    {errors.overdraft_sum && touched.overdraft_sum ? (<div className={'form-error'}>{errors.overdraft_sum}</div>) : null}
                                                </label>
                                                <SelectCustom label={'Список исполнителей'} value={values.executors_list} name={'executors_list'} className={' w-fit  !flex-[0_0_10rem]'} options={[
                                                    { label: 'Да', value: "1" }, { label: 'Нет', value: "2" }
                                                ]}/>
                                                             <hr className={'my-10 flex-[1_0_100%] w-full border-gray-2'} />
                                                             <SelectFromList items={store.companyStore.companiesPerformers}/>

                                                 </div>
                                        </Panel>

            </Form>)}
      </Formik>)
}

export default FormCreateCompany;
