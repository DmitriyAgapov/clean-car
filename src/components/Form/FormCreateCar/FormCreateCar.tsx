import React, { useEffect, useState } from 'react'
import { Form, Formik, useFormikContext } from 'formik'
import * as Yup from 'yup'
import 'yup-phone-lite'
import { useStore } from 'stores/store'
import { useNavigate, useParams } from 'react-router-dom'
import { CreateFormikInput } from 'components/common/ui/CreateInput/CreateInput'
import SelectCustom from 'components/common/ui/Select/Select'
import { UserTypeEnum } from 'stores/userStore'
import { Combobox, Input, InputBase, ScrollArea, Select, useCombobox } from '@mantine/core'
import Button, { ButtonDirectory, ButtonSizeType, ButtonVariant } from 'components/common/ui/Button/Button'
import { Car, CarType } from 'stores/carStore'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import { Step } from 'components/common/layout/Step/Step'
import { FormCard } from 'components/Form/FormCards/FormCards'
import FormModalAddUser from 'components/Form/FormModalAddUser/FormModalAddUser'

const SignupSchema = Yup.object().shape({
    first_name: Yup.string().min(1, 'Слишком короткое!').max(255, 'Слишком длинное!').required('Обязательное поле'),
    last_name: Yup.string().min(1, 'Слишком короткое!').max(255, 'Слишком длинное!').required('Обязательное поле'),
    phone: Yup.string()
        .max(16, 'Слишком длинное!')
        .phone('RU', 'Введите правильный номер')
        .required('Требуется номер телефона'),
    email: Yup.string().email('Неверный email').required('Укажите email'),
    group: Yup.number().min(1).required('Выберите группу'),
    company_id: Yup.number().min(1).required('Выберите компанию'),
})
const SelectCompanyFilials = () => {
    const store = useStore()
    const { values, setValues } = useFormikContext<any>()
    const [companies, setCompanies] = useState<any>([])
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    })
    const [searchString, setSearchString] = useState<string>('')
    useEffect(() => {
        const getCompany = async () => {
            const data = await store.companyStore.getAllCompanies({ name: searchString })

            setCompanies(data)
        }
        getCompany()
    }, [searchString])
    const handleChangeSearch = React.useCallback((e: any) => {
        setSearchString(e.currentTarget.value)
        // console.log(e.currentTarget.value);
    }, [])
    const options = companies.map((item: any) => (
        <Combobox.Option
            value={item.id}
            onClick={() => setValues({ ...values, company_name: item.name, company_id: item.id })}
            key={item.id}
        >
            {item.name}
        </Combobox.Option>
    ))
    return (
        <>
            <hr className={'col-span-full'} />
            <SelectCustom
                value={'company'}
                defaultValue={values.company_filials}
                name={'company_filials'}
                label={'Относится к'}
                options={[
                    { label: 'Компании', value: 'company' },
                    { label: 'Филиалы', value: 'filials' },
                ]}
                className={'col-span-3'}
            />

            <Combobox
                store={combobox}
                onOptionSubmit={(val) => {
                    setValues({ ...values, company_id: Number(val) })
                    combobox.closeDropdown()
                }}
            >
                <Combobox.Target>
                    <InputBase
                        classNames={{
                            input: 'bg-white data-[disabled=true]:bg-white rounded-[0.625rem] border-color-[var(--formBorder)] h-10 m-8fb7ebe7 mantine-Input-input mantine-Select-input',
                        }}
                        label={'Компания'}
                        component='button'
                        type='button'
                        pointer
                        rightSection={<Combobox.Chevron />}
                        rightSectionPointerEvents='none'
                        onClick={() => {
                            combobox.toggleDropdown()
                        }}
                        className={'col-span-6'}
                    >
                        {values.company_name || (
                            <Input.Placeholder
                                classNames={{
                                    placeholder: 'text-gray-1 ',
                                }}
                            >
                                Выбрать Компанию
                            </Input.Placeholder>
                        )}
                    </InputBase>
                </Combobox.Target>
                <Combobox.Dropdown>
                    <Combobox.Search
                        onChange={handleChangeSearch}
                        className={'border-0  w-full !px-3 pt-1 !placeholder:text-gray-1'}
                        classNames={{
                            input: 'border-1 px-0 border-accent',
                        }}
                        placeholder='Быстрый поиск'
                    />
                    <Combobox.Options>
                        <ScrollArea.Autosize type='scroll' mah={200}>
                            {options}
                        </ScrollArea.Autosize>
                    </Combobox.Options>
                    <Combobox.Footer className={'pb-3 mt-0'}>+ Создать филиал</Combobox.Footer>
                </Combobox.Dropdown>
            </Combobox>
        </>
    )
}

function UserGroupSelect() {
    const store = useStore()
    const { values, setValues } = useFormikContext<any>()
    const [permissions, setPermissions] = useState<any>([])

    useEffect(() => {
        const getGroups = () => {
            if (values.type == null) {
                values.company_id = 0
                setPermissions([])
            }
            if (values.company_id === 0 || values.company_id == null) {
                setPermissions([])
            }
            if (values.type !== UserTypeEnum.admin && values.company_id === 0) {
                setPermissions([])
            }
            if (values.type === UserTypeEnum.admin) {
                setPermissions([])
                setPermissions(store.permissionStore.permissions)
            }
            if (values.company_id !== 0 && values.type !== UserTypeEnum.admin) {
                setPermissions([])
                store.permissionStore.loadCompanyPermissions(values.company_id).then((data) => {
                    setPermissions(data)
                })
            }
            values.group
        }
        getGroups()
    }, [values.company_id, values.type, values.group])
    console.log(values.group);
    return (
        <>
            {/*   <SelectCustom */}
            {/*   value={values.group} */}
            {/*   name={'groups'} */}
            {/*   label={'Группа'} */}
            {/*   defaultValue={''} */}
            {/*   placeholder="Выбрать группу" */}
            {/*   disabled={permissions.length < 1} */}
            {/*   options={permissions.map((item: any) => ({ */}
            {/*     label: item.name, */}
            {/*     value: String(item.id), */}
            {/*   }))} */}
            {/*   className={'col-span-2'} */}
            {/* /> */}
            <Select
                value={String(values.group)}
                name={'groups'}
                label={'Группа'}

                defaultValue={String(values.group)}
                onChange={(value) => {
                    setValues({ ...values, group: Number(value) })
                }}
                placeholder='Выбрать группу'
                disabled={permissions.length < 1}
                data={permissions.map((item: any) => ({
                    label: item.name,
                    value: String(item.id),
                }))}
                className={'col-span-2'}
            />
        </>
    )
}

type UserData =
    | {
          id?: number
          first_name?: string
          last_name?: string
          phone?: string
          group?: number
          email?: string
      }
    | null
    | undefined

const FormCreateCar = ({ user, edit }: any) => {
    const { company_type, companyid, id } = useParams<any>()
    let initValues:Car = {
        brand: {
            id: 0,
            name: '',
            country: '',
        },
        model: {
            id: 0,
            name: '',
            car_class: '',
            year_from: 0,
            year_to: 0,
        },
        car_type: CarType["Бизнес-класс и кроссоверы"],
        number: '',
        id: 0
    }
    if (edit) {
        // initValues = {}
    }

    const store = useStore()
    const [step, setStep] = useState(1)
    const [animate, setAnimate] = useState(false)
    const formData = [
        {
            label: 'Марка',
            name: 'brand',
            type: 'select',
            placeholder: 'Выберите марку',
            value: '',
            options: [],
            depend: false,
        },
        {
            label: 'Модель',
            name: 'model',
            placeholder: 'Выберите модель',
            type: 'select',
            value: '',
            options: [],
            depend: false,
        },
        {
            label: 'Тип автомобиля',
            placeholder: 'Выберите тип',
            name: 'car_type',
            type: 'select',
            value: '',
            options: [],
            depend: false,
        },
        {
            label: 'Гос. номер',
            placeholder: 'Введите гос. номер',
            name: 'number',
            type: 'text',
            value: '',
            options: [],
            depend: false,
        },
        {
            label: 'Высота автомобиля, м',
            placeholder: 'Введите высоту автомобиля',
            name: 'car_height',
            type: 'text',
            value: '',
            depend: false,
        },
        {
            label: 'Радиус колес, дюймы',
            placeholder: 'Введите высоту',
            name: 'wheel_radius',
            type: 'text',
            value: '',
            depend: false,
        },
        {
            label: 'Статус',
            placeholder: 'Выбрать статус',
            name: 'status',
            type: 'select',
            options: [
                { label: 'Активен', value: 'true' },
                { label: 'Неактивен', value: 'false' },
            ],
            value: '',
            depend: false,
        },
        {
            label: 'Город',
            placeholder: 'Выбрать город',
            name: 'city',
            type: 'select',
            options: [{ label: 'Москва', value: '16254' }],
            value: '',
            depend: false,
        },
        {
          type: 'divider'
        },
        {
            label: 'Принадлежит',
            placeholder: 'Выбрать компанию',
            name: 'belong_to',
            type: 'select',
            options: [
                { label: 'Филиалу', value: 'filial' },
                { label: 'Компании', value: 'company' },
            ],
            value: '',
            depend: false,
        },
        {
            label: 'Филиал',
            placeholder: 'Выбрать филиал',
            name: 'status',
            type: 'select',
            options: [
                { label: 'Филиал', value: '1625' },
                { label: 'Филиал2', value: '16252' },
            ],
            value: '',
            depend: true,
        },
    ]
    const FormInputs = ():JSX.Element => {
        // @ts-ignore
        return formData.map((item:any, index:number) => <CreateFormikInput key={index+'car_inputs'} value={item.value} options={item.options} fieldName={item.name}
                label={item.label}
                placeHolder={item.placeholder}
                fieldType={item.type}
                className={'col-span-3'} />
            )

    }

    const changeStep = (step?: number) => {
        setAnimate((prevState) => !prevState)
        setTimeout(() => {
            setAnimate(false)
            setStep(step ? step : 2)
        }, 1200)
    }
    React.useEffect(() => {
        if (companyid && id && company_type) {
            const currentUser = store.usersStore.getUser(companyid, Number(id), company_type as any)
            // console.log(companyid)
            // console.log(currentUser)
        }
    }, [])
    const navigate = useNavigate()
    // @ts-ignore
    return (
        <Formik
            initialValues={initValues}
            validationSchema={SignupSchema}
            onSubmit={(values, FormikHelpers) => {
                console.log(values);

            }}
        >
            {({
                submitForm,
                setSubmitting,
                setFieldError,
                handleChange,
                isSubmitting,
                errors,
                setValues,
                touched,
                values,
                status,
                isValid,
                isValidating,
            }) => (

                    <Form style={{ display: 'contents' }}>
                        <Step footer={<>
                            <Button text={'Отменить'} action={() => navigate(-1)} className={'float-right lg:mb-0 mb-5'} variant={ButtonVariant['accent-outline']} />
                            <Button text={'Дальше'} action={() => changeStep()}/* action={() => console.log(values)} */ className={'float-right'} variant={ButtonVariant.accent} />
                            </>}
                          header={<>
                              <Heading text={'Шаг 1. Основная информация'} color={HeadingColor.accent} variant={HeadingVariant.h2} />
                              <div className={'text-base'}>Укажите основную информацию о компании для добавления ее в список</div></>}
                          step={step} animate={animate} action={() => void null} action1={() => void null} stepIndex={1}
                        >
                            <FormInputs />
                        </Step>
                        <Step footer={<>
                            <Button text={'Отменить'} action={() => navigate(-1)} className={'float-right lg:mb-0 mb-5'} variant={ButtonVariant['accent-outline']} />
                            <Button text={'Дальше'} action={() => (Object.keys(errors).length == 0)}/* action={() => console.log(values)} */ className={'float-right'} variant={ButtonVariant.accent} />
                        </>}
                          header={<>
                              <Heading
                                text={'Шаг 2. Добавьте сотрудников для автомобиля'}
                                color={HeadingColor.accent}
                                variant={HeadingVariant.h2}
                              />
                              <div className={'text-base'}>Вы можете добавить или выбрать сотрудника из списка зарегистрированных пользователей</div>
                          </>}
                          step={step} animate={animate} action={() => void null} action1={() => void null} stepIndex={2}
                        >
                            <FormCard title={'Добавить нового сотрудника'} titleColor={HeadingColor.accent}  titleVariant={HeadingVariant.h4} actions={<Button text={'Добавить сотрудника'} size={ButtonSizeType.sm} variant={ButtonVariant.accent} directory={ButtonDirectory.directory} action={async () => {
                                store.appStore.setModal({
                                    className: '!px-10 gap-4 !justify-stretch',
                                    component: <FormModalAddUser/>,
                                    actions: [
                                        <Button text={'Отменить'} action={() => store.appStore.closeModal()}  variant={ButtonVariant["accent-outline"]} />,
                                        <Button
                                          text={'Добавить сотрудника'}
                                          action={async () => {
                                              store.permissionStore.deletePermissionStore(12).then(() => {
                                                  store.appStore.closeModal()
                                                  navigate('/account/groups', { replace: false })
                                              })
                                          }}
                                          variant={ButtonVariant.accent}
                                        />,
                                    ],
                                    text: `Вы уверены, что хотите удалить ${'name'}`,
                                    state: true,
                                })
                            }} />}/>

                            <FormCard title={'Выбрать сотрудника из зарегистрированных пользователей'} titleColor={HeadingColor.accent}  titleVariant={HeadingVariant.h4} actions={<Button text={'Выбрать сотрудника'} size={ButtonSizeType.sm} variant={ButtonVariant.accent} directory={ButtonDirectory.directory} action={async () => {
                                store.appStore.setModal({
                                    className: 'w-[50rem]',
                                    actions: [
                                        <Button text={'Нет'} action={() => store.appStore.closeModal()} variant={ButtonVariant.default} />,
                                        <Button
                                          text={'Да, удалять'}
                                          action={async () => {
                                              store.permissionStore.deletePermissionStore(12).then(() => {
                                                  store.appStore.closeModal()
                                                  navigate('/account/groups', { replace: false })
                                              })

                                          }}
                                          variant={ButtonVariant['accent-outline']}
                                        />,
                                    ],
                                    text: `Вы уверены, что хотите удалить ${'name'}`,
                                    state: true,
                                })
                            }} />}/>


                        </Step>
                    </Form>

            )}
        </Formik>
    )
}

export default FormCreateCar
