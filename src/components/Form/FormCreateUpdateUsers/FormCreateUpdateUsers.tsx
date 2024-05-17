import React, { useEffect } from "react";
import { yupResolver } from "mantine-form-yup-resolver";
import { CreateUserSchema } from "utils/validationSchemas";
import { InputBase, Select, TextInput } from "@mantine/core";
import { createFormActions, createFormContext } from "@mantine/form";
import { useStore } from "stores/store";
import { observer } from "mobx-react-lite";
import { IMask, IMaskInput } from "react-imask";
import userStore, { UserTypeEnum } from "stores/userStore";
import label from "utils/labels";
import Button, { ButtonVariant } from "components/common/ui/Button/Button";
import { useNavigate, useParams, useRevalidator } from "react-router-dom";
import { CompanyTypeRus, CompanyType } from "stores/companyStore";
import PanelForForms from "components/common/layout/Panel/PanelForForms";
import agent from "utils/agent";

interface InitValues {
	id: string | number
	company_id: string   | null;
	email: string;
	first_name: string;
	group: string   | null;
	company_name?: string
	last_name: string;
	phone: string;
	type: string | null,
	depend_on: string  | null;
	is_active: string;
}

export const [FormProvider, useFormContext, useForm] = createFormContext<any>();
export const createUserFormActions= createFormActions<InitValues>('createUserForm');

const FormCreateUpdateUsers =({ user, edit }: any) => {
	const store = useStore()
	const params = useParams()
	const initData = React.useMemo(() => {
		let initValues: InitValues = {
			id: 0,
			company_id: store.userStore.myProfileData.company.company_type === "Администратор системы" ? null : String(store.userStore.myProfileData.company.id),
			type: store.userStore.myProfileData.company.company_type === "Администратор системы" ? UserTypeEnum.performer : CompanyTypeRus(store.userStore.myProfileData.company.company_type),
			email: '',
			first_name: '',
			group: null,
			last_name: '',
			phone: '',
			depend_on: 'company',
			is_active: 'true'
		}

		if (edit) {
			initValues = {

				id: user.employee.id,
				company_id: user.company === undefined ? 1: user.company.id.toString(),
				company_name: user.company === undefined ? "Администратор системы" : user.company.name,
				depend_on: user.company?.parent === null ? 'company' : 'filials',
				first_name: user.employee.first_name,
				last_name: user.employee.last_name,
				phone: user.employee.phone,
				email: user.employee.email,
				type: user.company?.company_type === "Администратор системы" ? "admin" : user.company?.performerprofile ? 'performer' : "customer",
				group: String(user.group.id),
				is_active: user.employee.is_active ? "true" : "false",
			}
		}
		console.log(user, 'user edit');
		console.log(initValues, 'initval');
		return initValues

	}, [edit, user])

	const form = useForm({
			name: 'createUserForm',
      initialValues: initData,
			validateInputOnBlur: true,
      onValuesChange: (values, previous) => console.log(values),
      validate: yupResolver(CreateUserSchema),
      enhanceGetInputProps: (payload) => {

        if(payload.options.dependOn === 'depend_on') {
					return ({
						disabled: form.values.depend_on === "" || form.values.depend_on === null,
						className: 'w-full flex-grow  !flex-[1_0_20rem] col-span-3'
					})
        }
				if(payload.field === 'type') {
					return ({

						className: `w-full flex-grow  !flex-[1_0_20rem] col-span-2 ${store.appStore.appType !== "admin" && 'hidden'}`,
					})
        }
				if(payload.field === 'group') {
					return ({
						disabled: payload.form.values.company_id === null && payload.form.values.type !== 'admin',
						className: `w-full flex-grow  !flex-[1_0_20rem] col-span-4 ${store.appStore.appType !== "admin" && 'col-span-3'}`
					})
        }
	      if(payload.field === 'company_id') {
		      return ({
			      disabled: companyVar?.length === 0 || payload.form.values.depend_on === null,
			      className: 'w-full flex-grow  !flex-[1_0_20rem] col-span-4'
		      })
	      }
				if(payload.field === 'is_active') {
					return ({
						className: `w-full flex-grow  !flex-[1_0_20rem] col-span-2 ${store.appStore.appType !== "admin" && 'col-span-3'}`
					})
        }
				return ({
					className: 'w-full flex-grow  !flex-[1_0_20rem] col-span-3'
				})
      },
  })
	let revalidator = useRevalidator();
	const navigate = useNavigate()
	const handleCreateUser = React.useCallback(async ():Promise<any> => {
		const _companyType = form.values.type;
		// if(form.values.type === "admin") {
		// 	const senData = {
		// 		phone: form.values.phone.replaceAll(' ', ''),
		// 		email: form.values.email,
		// 		first_name: form.values.first_name,
		// 		last_name: form.values.last_name,
		// 		company_id: 1,
		// 		is_active: form.values.is_active === 'true',
		// 		group: Number(form.values.group)
		// 	}
		//
		// 	agent.Account.createAdminUser(senData).then((res) => {
		// 		console.log(res);
		// 	})
		// }
		// else {
		const compId = form.values.type === "admin" ? 1 : Number(form.values.company_id)

		const senData = {
				id: edit ? user.employee.id : 0,
				phone: form.values.phone.replaceAll(' ', ''),
				email: form.values.email,
				first_name: form.values.first_name,
				last_name: form.values.last_name,
				company_id: edit && !user.company ? 1 : compId,
				is_active: form.values.is_active === 'true',
				group: Number(form.values.group)
			}
			if(edit) {
				agent.Account.updateCompanyUser(senData.company_id, senData).then((res) => {
					if (400 > res.status) {
						const userId = edit ? form.values.id : res.data.id
						revalidator.revalidate()
						// @ts-ignore
						navigate(`/account/users/${_companyType}/${compId}/${userId}`)
					}})
			} else {
				await agent.Account.createCompanyUser(senData.company_id, senData).then((res) => {
					if (res && res.status && res.status < 400) {
						// @ts-ignore
						const userId = edit ? form.values.id : res.data.id
						revalidator.revalidate()
						// @ts-ignore
						navigate(`/account/users/${_companyType}/${compId}/${userId}`)
						}

					// @ts-ignore
					if(res &&  res.response && res.response.status && res.response.status === 400) {

						// @ts-ignore
						const errorBody = res.response.data
						for(const err in errorBody) {
							form.setFieldError(err, errorBody[err][0].toString())
						}
					}
					}
				)
			}
		// }
		},[form.values])
	// @ts-ignore
	const companyVar = React.useMemo(() => {
// @ts-ignore
			console.log(form.values.depend_on === "company" ? store.companyStore.getCompaniesAll?.filter((c) => c.parent === null && c.company_type === CompanyType[form.values.type]) : store.companyStore.getFilialsAll);
			//@ts-ignore
			console.log(form.values.depend_on === "company" ? store.companyStore.getCompaniesAll?.filter((c) => c.parent === null && c.company_type === CompanyType[form.values.type]) : store.companyStore.getFilialsAll);
			// @ts-ignore
			console.log(CompanyType[form.values.type]);
			// @ts-ignore
			return form.values.depend_on === "company" ? store.companyStore.getCompaniesAll?.filter((c) => c.parent === null && c.company_type === CompanyType[form.values.type]) : store.companyStore.getFilialsAll
		},
		[form.values.depend_on, form.values.type])

	const groupData = React.useMemo(() => {
		// console.log('edit', edit && !!user.company.groups);
		// console.log('edit', edit && user.company);
		const _permissions = store.permissionStore.getCompanyPermissions

		// if(form.values.type !== UserTypeEnum.admin) {
			console.log('edit a', _permissions);
			return _permissions.map((p: any) => ({
				label: p.name,
				value: String(p.id),
			}))
		// } else {
		// 	return _permissions.map((p: any) => ({
		// 		label: p.name,
		// 		value: String(p.id),
		// 	}))
		// }
	}, [form.values.type, form.values.company_id, edit])

	useEffect(() => {
		store.permissionStore.loadCompanyPermissionsResults(form.values.company_id)
	}, [form.values.company_id]);
	const masked = IMask.createMask({
		mask: '+7 000 00 000 00',
		autofix: true,
		overwrite: true,
		// format: (value:any) => formatPhone(value)
		// ...and other options
	});
	// @ts-ignore
	return (
        <FormProvider form={form}>
            <PanelForForms
                className={' tablet-max:-mx-6'}
                bodyClassName={'tablet-max:block '}
                footerClassName={
                    'tablet-max:child:flex tablet-max:child:flex-col tablet-max:child:w-full tablet-max:child:*:flex-1 tablet-max:child:*:w-full  tablet-max:-mx-2'
                }
                actionCancel={
                    <>
                        <Button
                            type={'button'}
                            text={'Отменить'}
                            action={(e) => {
                                e.preventDefault()
                                navigate(-1)
                            }}
                            className={'float-right'}
                            variant={ButtonVariant.cancel}
                        />
                        {/*   <Button */}
                        {/*     type={'button'} */}
                        {/*     text={'Чек'} */}
                        {/*     action={(e) => { */}
                        {/* 			e.preventDefault() */}
                        {/*       console.log(form.errors) */}
                        {/*       console.log(form.values) */}
                        {/*       form.validate() */}
                        {/*       console.log(form.isValid()) */}

                        {/* 		}} */}
                        {/*     className={'float-right'} */}
                        {/*     variant={ButtonVariant['accent-outline']} */}
                        {/* /> */}
                    </>
                }
                actionNext={
                    <Button
                        type={'submit'}
                        action={handleCreateUser}
                        disabled={!form.isValid()}
                        text={'Сохранить'}
                        className={'float-right'}
                        variant={ButtonVariant.accent}
                    />
                }
            >
                <form
                    onSubmit={form.onSubmit((props) => console.log('form', props))}
                    onReset={form.onReset}
                    style={{ display: 'contents' }}
                >
	                <Select
		                label={'Тип'}
		                allowDeselect={false}
		                onOptionSubmit={(e) => {
			                e === 'admin' && store.permissionStore.loadCompanyPermissionsResults(1)

			                form.setValues({ ...form.values, company_id: null, group: null })
		                }}
		                {...form.getInputProps('type')}
		                defaultValue={form.values.type}
		                data={Object.entries(UserTypeEnum).map((item: any) => ({
			                label: label(item[0]),
			                value: item[1],
		                }))}
	                />
                    {!(form.values.type === null || form.values.type === UserTypeEnum.admin) && (
                        <>

                            <Select
                                onOptionSubmit={() => form.setValues({ ...form.values, company_id: null, group: null })}
                                label={'Относится к'}
                                {...form.getInputProps('depend_on', { dependOn: 'type' })}
                                defaultValue={form.values.depend_on}
                                data={[
                                    { label: 'Компании', value: 'company' },
                                    { label: 'Филиалы', value: 'filials' },
                                ]}
                            />
                            <Select
                                searchable
                                label={form.values.depend_on === 'company' ? 'Компании' : 'Филиал'}
                                {...form.getInputProps('company_id', { dependOn: 'type' })}
                                onOptionSubmit={(e) => {
                                    form.setValues({ ...form.values, group: null })
                                    store.permissionStore.loadCompanyPermissionsResults(Number(e))
                                }}
                                data={companyVar.map((item: any) => ({ label: item.name, value: String(item.id) }))}
                            />
                            <hr className={'col-span-full'} />
                        </>
                    )}
                    <TextInput label={'Имя'} {...form.getInputProps('first_name')} />
                    <TextInput label={'Фамилия'} {...form.getInputProps('last_name')} />
                    <InputBase
                        // onPaste={(value) => {
                        //   console.log(formatPhone(value.clipboardData.getData('text/plain')));
                        // 	return formatPhone(value.clipboardData.getData('text/plain'))
                        // 	// console.log(value.clipboardData.getData('text/plain'), 'paste')
                        // }}
                        {...form.getInputProps('phone')}
                        label={'Телефон'}
                        component={IMaskInput}
                        {...masked}
                        placeholder='+7 000 000 0000'
                    />
                    <TextInput label={'E-mail'} {...form.getInputProps('email')} />

                    <Select
                        clearable
                        label={'Группа'}
                        disabled={!groupData}
                        {...form.getInputProps('group', { dependOn: 'company_id' })}
                        data={
                            (store.permissionStore.getCompanyPermissions.map((p: any) => ({
                                label: p.name,
                                value: String(p.id),
                            })) as any) ?? [{ label: '1', value: 'null' }]
                        }
                    />
                    <Select
                        label={'Статус'}
                        {...form.getInputProps('is_active')}
                        data={[
                            { label: 'Активен', value: 'true' },
                            { label: 'Неактивен', value: 'false' },
                        ]}
                    />
                </form>
            </PanelForForms>
        </FormProvider>
    )
};

export default observer(FormCreateUpdateUsers);
