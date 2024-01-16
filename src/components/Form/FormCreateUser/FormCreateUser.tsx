import React, { useEffect, useState } from 'react'
import { Form, Formik, useFormikContext, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import 'yup-phone-lite'
import { useStore } from 'stores/store'
import { useNavigate, useParams } from 'react-router-dom'
import { CreateFormikInput } from 'components/common/ui/CreateInput/CreateInput'
import SelectCustom from 'components/common/ui/Select/Select'
import { UserTypeEnum } from 'stores/userStore'
import label from 'utils/labels'
import { Combobox, Input, InputBase, ScrollArea, Select, useCombobox } from '@mantine/core'
import Panel, { PanelColor, PanelVariant } from 'components/common/layout/Panel/Panel'
import Button, { ButtonVariant } from 'components/common/ui/Button/Button'
import RequestErrors from 'components/Form/RequestErrors'
import { CompanyType } from 'stores/companyStore'
import { observer, Observer } from "mobx-react-lite";
import useAxios from "axios-hooks";
import { API_ROOT } from "utils/agent";
let initValues = {
    id: 0,
    company_id: 0,
    company_name: '',
    company_filials: 'company',
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    type: '',
    group: null,
    is_active: true,
}

const SelectCompanyFilials = observer(() => {
    const store = useStore()
    const { values, setValues } = useFormikContext<any>()
    console.log(values);

    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    })
    const [searchString, setSearchString] = useState<string>('')
    const [companies, setCompanies] = useState<any>([])
    useEffect(() => {
        console.log(searchString);
        const getCompany =  async () => {
            const data =  await store.companyStore.getAllCompanies({ name: searchString })
            console.log(data);
            console.log(store.companyStore.allCompanies);
            setCompanies(store.companyStore.companies)
        }
        getCompany()
    }, [searchString])
    const handleChangeSearch = React.useCallback((e: any) => {
        console.log(e);

        // console.log(e.currentTarget.value);
    }, [searchString])


    console.log(store.companyStore.companies);

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
                        onChange={(e) => setSearchString(e.currentTarget.value)}
                        className={'border-0  w-full !px-3 pt-1 !placeholder:text-gray-1'}
                        classNames={{
                            input: 'border-1 px-0 border-accent',
                        }}
                        placeholder='Быстрый поиск'
                    />
                    <Combobox.Options>
                        <ScrollArea.Autosize type='scroll' mah={200}>
                         {store.companyStore.companies.map((item: any) => (
                              <Combobox.Option
                                value={item.id}
                                onClick={() => setValues({ ...values, company_name: item.name, company_id: item.id })}
                                key={item.id}
                              >
                                  {item.name}
                              </Combobox.Option>
                            ))}
                        </ScrollArea.Autosize>
                    </Combobox.Options>
                    <Combobox.Footer className={'pb-3 mt-0'}>+ Создать филиал</Combobox.Footer>
                </Combobox.Dropdown>
            </Combobox>
        </>
    )
})

const  UserGroupSelect = observer(()=> {
    const store = useStore()
    const { values, setValues } = useFormikContext<any>()
    const [permissions, setPermissions] = useState<any>([])
    const [{ data, error, response, loading }, refetch] = useAxios(values.type !== UserTypeEnum.admin ? {
        url: `${API_ROOT}/permissions/${values.company_id}/groups/list/`,
        method: 'GET',
    } : {
        url: `${API_ROOT}/permissions_admin/groups/list/`,
        method: 'GET',
    })

    useEffect(() => {

        const getGroups = async () => {
            console.log(data);
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
                refetch().then(r => setPermissions(r.data.results)).catch(e => console.log(e))
            }
            if (values.company_id !== 0 && values.type !== UserTypeEnum.admin) {

                setPermissions([])
                refetch().then(r => setPermissions(r.data.results)).catch(e => console.log(e))
            }
        }
        getGroups()
    }, [values.type, values.company_id])

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
            {permissions && <Select
                value={String(values.group)}
                name={'groups'}
                label={'Группа'}

                defaultValue={String(values.group)}
                onChange={(value) => {
                    setValues({ ...values, group: Number(value) })
                }}
                placeholder='Выбрать группу'
                disabled={permissions.length === 0}
                data={permissions && permissions.map((item: any) => ({
                    label: item.name,
                    value: String(item.id),
                }))}
                className={'col-span-2'}
            />}
        </>
    )
})

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

const FormCreateUser = ({ user, edit }: any) => {
    const store = useStore()
    const SignupSchema = Yup.object().shape({
        first_name: Yup.string().min(1, 'Слишком короткое!').max(255, 'Слишком длинное!').required('Обязательное поле'),
        last_name: Yup.string().min(1, 'Слишком короткое!').max(255, 'Слишком длинное!').required('Обязательное поле'),
        phone: Yup.string()
        .max(16, 'Слишком длинное!')
        .phone('RU', 'Введите правильный номер').required('Обязательное поле'),
        email: Yup.string().email('Неверный email').required('Обязательное поле'),
        group: Yup.number().min(1).required('Обязательное поле'),
        company_id: Yup.number().min(1),
    })
    const { company_type, companyid, id } = useParams<any>()

    if (edit) {
        initValues = {
            id: user.employee.id,
            company_id: user.company.id,
            company_name: user.company.name,
            company_filials: 'company',
            first_name: user.employee.first_name,
            last_name: user.employee.last_name,
            phone: user.employee.phone,
            email: user.employee.email,
            type: CompanyType.customer === user.company.company_type ? UserTypeEnum.customer : UserTypeEnum.performer ,
            group: user.group.id,
            is_active: user.employee.is_active,
        }
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

                let res: any
                if(edit) {
                    const data = {
                        id: values.id,
                        phone: values.phone,
                        email: values.email,
                        first_name: values.first_name,
                        last_name: values.last_name,
                        group: values.group,
                        is_active: values.is_active,
                    }
                    store.usersStore
                        .updateUser(values.company_id, data)
                        .then((r: any) => {
                            res = r
                            if (res && res.data.id)
                                navigate(`/account/users/${values.type}/${values.company_id}/${res.data.id}`)
                        })
                        .catch((error) => {
                            throw new Error(error)
                        })
                        .finally(() => {
                            FormikHelpers.setSubmitting(false)
                        })
                    return
                } else {
                    const data = {
                        phone: values.phone,
                        email: values.email,
                        first_name: values.first_name,
                        last_name: values.last_name,
                        group: values.group,
                        is_active: values.is_active,
                    }
                    store.usersStore.createUser(values.company_id, data).then((r: any) => {
                        res = r
                        if (res && res.data.id)
                            navigate(`/account/users/${values.type}/${values.company_id}/${res.data.id}`)
                    }).catch((error) => {
                        throw new Error(error)
                    }).finally(() => {
                        FormikHelpers.setSubmitting(false)
                    })
                }

                // @ts-ignore

                // console.log(values)
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
                <Panel
                    className={'col-span-full  grid grid-rows-[1fr_auto] items-start'}
                    bodyClassName={'grid  grid-cols-9 items-start gap-4 gap-y-8'}
                    variant={PanelVariant.textPadding}
                    footer={
                        <div
                            className={
                                'accounts-group_header gap-4 text-[#606163] grid grid-cols-[1.25fr_2fr] grid- font-medium'
                            }
                        >
                            <div className={'flex col-start-2 justify-end gap-5 flex-wrap'}>
                                <Button
                                    text={'Отменить'}
                                    action={() => navigate(-1)}
                                    className={'float-right'}
                                    variant={ButtonVariant['accent-outline']}
                                />
                                <Button
                                    type={'submit'}
                                    disabled={!isValid}
                                    text={'Сохранить'}
                                    action={() => {
                                        // console.log(`clicked`)
                                        // submitForm
                                        submitForm()
                                        setSubmitting(false)
                                    }}
                                    className={'float-right'}
                                    variant={ButtonVariant.accent}
                                />
                                <RequestErrors />
                            </div>
                        </div>
                    }
                    background={PanelColor.glass}
                >
                    <Form style={{ display: 'contents' }}>
                        <CreateFormikInput
                            fieldName={'first_name'}
                            label={'Имя'}
                            placeHolder={''}
                            fieldType={'text'}

                            className={'col-span-3'}
                        />
                        <CreateFormikInput
                            fieldName={'last_name'}
                            label={'Фамилия'}
                            placeHolder={''}
                            fieldType={'text'}
                            className={'col-span-3'}
                        />
                        <CreateFormikInput
                            fieldName={'phone'}
                            label={'Номер телефона'}
                            placeHolder={''}
                            fieldType={'text'}
                            className={'col-span-3'}
                        />
                        <CreateFormikInput
                            fieldName={'email'}
                            label={'E-mail'}
                            placeHolder={''}
                            fieldType={'text'}
                            className={'col-span-3'}
                        />
                        <SelectCustom
                            value={values.type}
                            name={'type'}
                            label={'Тип'}
                            defaultValue={values.type}
                            options={Object.entries(UserTypeEnum).map((item: any) => ({
                                label: label(item[0]),
                                value: item[1],
                            }))}
                            className={'col-span-2'}
                        />
                        <UserGroupSelect />
                        <Select
                            value={String(values.is_active)}
                            withCheckIcon={false}
                            name={'is_active'}
                            onChange={(value) => setValues({ ...values, is_active: value === 'true' })}
                            label={'Статус'}
                            data={[
                                { label: 'Активен', value: 'true' },
                                { label: 'Неактивен', value: 'false' },
                            ]}
                            className={'col-span-2'}
                        />
                        {(values.type == UserTypeEnum.customer || values.type == UserTypeEnum.performer) && (
                            <SelectCompanyFilials />
                        )}
                    </Form>
                </Panel>
            )}
        </Formik>
    )
}

export default FormCreateUser
