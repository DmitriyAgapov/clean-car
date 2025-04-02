import React, { useEffect, useMemo } from "react";
import { yupResolver } from "mantine-form-yup-resolver";
import { CreateUserSchema } from "utils/validationSchemas";
import { InputBase, Select, Switch, TextInput } from '@mantine/core'
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
import { PermissionNames } from "stores/permissionStore";
import useSWR from "swr";
import { flattenCompanies, getAllChildrenObjects } from "utils/utils";

interface InitValues {
	id: string | number
	company_id: string   | null;
	email: string;
	first_name: string;
	group: string   | null;
	company_name?: string
	last_name: string;
	bid_visibility: boolean
	phone: string;
	type: string | null,
	depend_on: string  | null;
	is_active: string;
}

export const [FormProvider, useFormContext, useForm] = createFormContext<any>();
export const createUserFormActions= createFormActions<InitValues>('createUserForm');

const FormCreateUpdateUsers =({ user, edit }: any) => {
	const store = useStore()
	const {company} = store.userStore.getMyProfileData;
	const company_id = user?.company?.id || company.id;
	const {data, isLoading} = useSWR(`availible_companies_for_${company_id}`, () => agent.Companies.companyWithChildren(company_id))

	const availibleCompanies = useMemo(() => {
		if(data?.data?.results[0]) {
			const allCompaniesAndFilialls = flattenCompanies(data.data.results);
			return ({
				companies: allCompaniesAndFilialls.filter((el:any) => el.parent == null),
				filials:  allCompaniesAndFilialls.filter((el:any) => el.parent != null),
			})
		}
		return null
	}, [data?.data?.results, edit]);

	const initData = React.useMemo(() => {
		let initValues: InitValues = {
			id: 0,
			company_id: store.userStore.myProfileData.company.company_type === "Администратор системы" ? null : String(store.userStore.myProfileData.company.id),
			type: store.userStore.myProfileData.company.company_type === "Администратор системы" ? UserTypeEnum.customer : CompanyTypeRus(store.userStore.myProfileData.company.company_type),
			email: '',
			first_name: '',
			group: null,
			last_name: '',
			phone: '',
			bid_visibility: true,
			depend_on: 'company',
			is_active: 'true'
		}

		if (edit) {
			initValues = {

				id: user.employee.id,
				company_id: user.company === undefined ? 1: user.company?.id.toString(),
				company_name: user.company === undefined ? "Администратор системы" : user.company?.name,
				depend_on: user.company?.parent === null ? 'company' : 'filials',
				first_name: user.employee.first_name,
				bid_visibility: user.employee.bid_visibility.toString(),
				last_name: user.employee.last_name,
				phone: user.employee.phone,
				email: user.employee.email,
				type: user.company?.company_type === "Администратор системы" ? "admin" : user.company?.performerprofile ? 'performer' : "customer",
				group: String(user.group.id),
				is_active: user.employee.is_active ? "true" : "false",
			}
		}
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
						disabled: form.values.depend_on === "" || form.values.depend_on === null  || !store.userStore.getUserCan(PermissionNames['Компании'], "update"),
						className: 'w-full  !flex-[1_1_30%] col-span-3'
					})
        }
				if(payload.field === 'type') {
					return ({
						disabled: edit,
						className: `w-full !flex-[1_1_30%] col-span-3 ${store.appStore.appType !== "admin" && 'hidden'}`,
					})
        }
				if(payload.field === 'group') {
					return ({
						disabled: payload.form.values.company_id === null && payload.form.values.type !== 'admin',
						className: `w-full  !flex-[1_1_30%] col-span-3 ${store.appStore.appType !== "admin" && 'col-span-3'}`
					})
        }
	      if(payload.field === 'company_id') {
		      return ({
			      disabled: companyVar?.length === 0 || payload.form.values.depend_on === null || !store.userStore.getUserCan(PermissionNames['Компании'], "update"),
			      className: 'w-full  !flex-[1_1_30%] col-span-3'
		      })
	      }
				if(payload.field === 'is_active') {
					return ({
						className: `w-full  !flex-[1_1_30%] col-span-3 ${store.appStore.appType !== "admin" && 'col-span-3'}`
					})
        }
				return ({
					className: 'w-full  !flex-[1_1_30%] col-span-3'
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
				bid_visibility: form.values.bid_visibility === "true",
				first_name: form.values.first_name,
				last_name: form.values.last_name,
				company_id: edit && !user.company ? 1 : compId,
				is_active: form.values.is_active === 'true',
				group: Number(form.values.group)
			}
			if(edit) {
				if(senData.company_id.toString() !== initData.company_id?.toString() && initData.company_id) {
					console.log('Редактируем')
					agent.Users.transferUser({
						new_company_id: senData.company_id.toString(),
						old_company_id: initData.company_id.toString(),
						employee_id: senData.id.toString(),
						new_group_id: senData.group.toString()
					}).then((res) => {
						if (400 > res.status) {
							const userId = edit ? form.values.id : res.data.id
							// revalidator.revalidate()
							store.userStore.userData.id === userId ? store.userStore.loadMyProfile() : void null
							// @ts-ignore
							navigate(`/account/users/${_companyType}/${compId}/${userId}`)
						}})
				} else {
				agent.Account.updateCompanyUser(senData.company_id, senData).then((res) => {
					if (400 > res.status) {
						const userId = edit ? form.values.id : res.data.id
						// revalidator.revalidate()
						store.userStore.userData.id === userId ? store.userStore.loadMyProfile() : void null
						// @ts-ignore
						navigate(`/account/users/${_companyType}/${compId}/${userId}`)
					}})
				}
			} else {
				await agent.Account.createCompanyUser(senData.company_id, senData).then((res) => {
					if (res && res.status && res.status < 400) {
						// @ts-ignore
						const userId = edit ? form.values.id : res.data.id
						// revalidator.revalidate()

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
	const [companyVar, setCompanyVar] = React.useState([{name: "Нет ", id: "none"}])
	// @ts-ignore
	React.useEffect(() => {
		if(availibleCompanies) {
			setCompanyVar([ { name: "Нет ", id: "none" } ]);
			const setRes = async () => {
				let res: any[] = []

				if (form.values.depend_on === "company") {

					res = availibleCompanies.companies

				} else {
					res = availibleCompanies.filials
				}
				if (res.length === 1) {
					form.values.company_id = String(res[0].id)
				}
				console.log(res);
				setCompanyVar(res)
			}
			(async () => {
				if (form.values.depend_on === "company" || store.appStore.appType === "admin") {
					const _res = await store.companyStore.getAllCompanies()
					if (_res) {
						setRes()
					}
				}
				if (form.values.depend_on === "filials") {
					await store.companyStore.loadAllFilials()
					setRes()
				}
			})()
		}
		},
		[form.values.depend_on, form.values.type, availibleCompanies])

	const groupData = React.useMemo(() => {
        // console.log('edit', edit && !!user.company?.groups);
        // console.log('edit', edit && user.company);
        const _permissions = store.permissionStore.getCompanyPermissions

        // if(form.values.type !== UserTypeEnum.admin) {
        // console.log('edit a', _permissions)
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
		if(form.values.company_id) {

			store.permissionStore.loadCompanyPermissionsResults(form.values.company_id)
		}
	}, [form.values.company_id]);
	const masked = IMask.createMask({
		mask: "+7 000 000 00 00",
		autofix: true,
		// overwrite: true,
		skipInvalid: false,
		prepare: (appended, masked) => {
			if (appended[0] === '8' && masked.value === "") {
				return appended.slice(1);
			}
			return appended
		},
	});
	console.log(companyVar);
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
                    </>
                }
                actionNext={
				<>
                    <Button
                        type={'submit'}
                        action={handleCreateUser}
                        disabled={!form.isValid()}
                        text={'Сохранить'}
                        className={'float-right'}
                        variant={ButtonVariant.accent}
                    />
				</>
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
                        data={Object.entries(UserTypeEnum).filter((item:string[]) => item[0] !== UserTypeEnum.fizlico).map((item: any) => ({
                            label: label(item[0]),
                            value: item[1],
                        }))}
                    />
                    {!(form.values.type === null || form.values.type === UserTypeEnum.admin) && store.userStore.getUserCan(PermissionNames["Управление пользователями"], 'create') && (
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
							{/*@TODO С новой ручкой хрен выберешь филиал или компания*/}
							<Select
                                searchable
								disabled={companyVar.length === 0}
                                label={form.values.depend_on === 'company' ? 'Компании' : 'Филиал'}
                                {...form.getInputProps('company_id', { dependOn: 'type' })}
                                onOptionSubmit={(e) => {
                                    form.setValues({ ...form.values, group: null })
                                    store.permissionStore.loadCompanyPermissionsResults(Number(e))
                                }}
                                data={companyVar.map((item: any) => ({ label: item.name, value: String(item.id) })) ?? []}
                            />
                        </>
                    )}
	                {!edit && <hr className={'col-span-full border-gray-2'} />}
                    <TextInput label={'Имя'} {...form.getInputProps('first_name')} />
                    <TextInput label={'Фамилия'} {...form.getInputProps('last_name')} />
                    <InputBase
                        {...form.getInputProps('phone')}
	                      placeholder='+7 000 000 0000'
                        label={'Телефон'}
                        component={IMaskInput}
                        {...masked}
	                      onPaste={(e) => {
		                      const numb = e.clipboardData.getData('Text');
													form.setFieldValue('phone', numb)
													return e
	                      }}



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
	                <Select
		                {...form.getInputProps('bid_visibility')}
		                className={'z-50 overflow-hidden relative col-span-3'}
		                label="Пользователь видит заявки:"
		                data={[{label: "Все", value: 'true'}, {label:'Свои', value: "false"}]}
	                />
                </form>
            </PanelForForms>
        </FormProvider>
    )
};

export default observer(FormCreateUpdateUsers);
