import React, { useState } from "react";
import { yupResolver } from 'mantine-form-yup-resolver';
import { CreateUserSchema } from "utils/validationSchemas";
import { InputBase, Select, TextInput } from "@mantine/core";
import { createFormActions, createFormContext } from "@mantine/form";
import { useStore } from "stores/store";
import { observer } from "mobx-react-lite";
import { IMaskInput } from "react-imask";
import { UserTypeEnum } from "stores/userStore";
import label from "utils/labels";
import Button, { ButtonVariant } from "components/common/ui/Button/Button";
import { useNavigate, useRevalidator } from "react-router-dom";
import { CompanyType } from "stores/companyStore";
import PanelForForms from "components/common/layout/Panel/PanelForForms";

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

let initValues: InitValues = {
	id: 0,
	company_id: null,
	email: '',
	first_name: '',
	group: null,
	type: UserTypeEnum.performer,
	last_name: '',
	phone: '',
	depend_on: null,
	is_active: 'true'
}

export const [FormProvider, useFormContext, useForm] = createFormContext<any>();
export const createUserFormActions= createFormActions<InitValues>('createUserForm');

const FormCreateUpdateUsers =({ user, edit }: any) => {
	const store = useStore()
	if (edit) {
		initValues = {
			id: user.employee.id,
			company_id: user.company.id.toString(),
			company_name: user.company.name,
			depend_on: user.company.parent === null ? 'company' : 'filials',
			first_name: user.employee.first_name,
			last_name: user.employee.last_name,
			phone: user.employee.phone,
			email: user.employee.email,
			type: CompanyType.customer === user.company.company_type ? UserTypeEnum.customer : UserTypeEnum.performer ,
			group: String(user.group.id),
			is_active: user.employee.is_active ? "true" : "false",
		}
	}

	const form = useForm({
			name: 'createUserForm',
      initialValues: initValues,
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
						className: 'w-full flex-grow  !flex-[1_0_20rem] col-span-2',
					})
        }
				if(payload.field === 'group') {
					return ({
						disabled: payload.form.values.company_id === null && payload.form.values.type !== 'admin',
						className: 'w-full flex-grow  !flex-[1_0_20rem] col-span-2'
					})
        }
	      if(payload.field === 'company_id') {
		      return ({
			      disabled: companyVar.length === 0 || payload.form.values.depend_on === null,
			      className: 'w-full flex-grow  !flex-[1_0_20rem] col-span-6'
		      })
	      }
				if(payload.field === 'is_active') {
					return ({
						className: 'w-full flex-grow  !flex-[1_0_20rem] col-span-2'
					})
        }
				return ({
					className: 'w-full flex-grow  !flex-[1_0_20rem] col-span-3'
				})
      },
  })
	let revalidator = useRevalidator();
	const navigate = useNavigate()

	// @ts-ignore
	const companyVar = React.useMemo(() => form.values.depend_on === "company" ? store.companyStore.getCompaniesAll.filter((c) => c.parent === null && c.company_type === CompanyType[form.values.type]) : store.companyStore.getFilialsAll.filter((c) => c.company_type === CompanyType[form.values.type]),
		[form.values.depend_on, form.values.type])
	console.log(store.permissionStore.getCompanyPermissions);
	return (

        <FormProvider form={form}>
            <PanelForForms
                actionCancel={
                    <Button
	                      type={'button'}
                        text={'Отменить'}
                        action={(e) => {
													e.preventDefault()
													navigate(-1)}}
                        className={'float-right'}
                        variant={ButtonVariant['accent-outline']}
                    />
                }
                actionNext={
                    <Button
                        type={'submit'}
	                      action={() => store.usersStore.createNewUser(edit, form.values).then((res) => {
													console.log('finished', res)
													const userId = edit ? form.values.id : res.data.id
		                      revalidator.revalidate()
		                      // @ts-ignore
		                      navigate(`/account/users/${form.values.type}/${form.values.company_id}/${userId}`)
	                      })}
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
                    <TextInput withAsterisk label={'Имя'} {...form.getInputProps('first_name')} />
                    <TextInput withAsterisk label={'Фамилия'} {...form.getInputProps('last_name')} />
                    <InputBase
                        {...form.getInputProps('phone')}
                        // onAccept={(mask, value) => form.setFieldValue('phone', value.unmaskedValue)}
                        withAsterisk
                        label={'Телефон'}
                        component={IMaskInput}
                        mask='+7 000 000 0000'
                        placeholder='+7 000 000 0000'
                    />
                    <TextInput withAsterisk label={'E-mail'} {...form.getInputProps('email')} />
                    <Select
                        withAsterisk
		                    onOptionSubmit={(e) => {
			                    console.log('Группа', e)
			                    // store.permissionStore.loadCompanyPermissionsResults(Number(e))
		                    }}
                        label={'Тип'}
	                      clearButtonProps={{
													onClick: () => form.setValues(initValues)
	                      }}
                        clearable
                        {...form.getInputProps('type')}
                        data={Object.entries(UserTypeEnum).map((item: any) => ({
                            label: label(item[0]),
                            value: item[1],
                        }))}
                    />
                    <Select
                        withAsterisk
                        clearable
                        label={'Группа'}
		                    onOptionSubmit={(e) => {
			                    console.log('Группа', e)
			                    // store.permissionStore.loadCompanyPermissionsResults(Number(e))
		                    }}
                        {...form.getInputProps('group', { dependOn: 'company_id' })}
                        data={(form.values.type !== UserTypeEnum.admin ? store.permissionStore.getCompanyPermissions : store.permissionStore.getAdminPermissions).map((p: any) => ({
                            label: p.name,
                            value: String(p.id),
                        }))}
                    />
                    <Select
	                      withAsterisk
                        label={'Статус'}
                        {...form.getInputProps('is_active')}
                        data={[
                            { label: 'Активен', value: 'true' },
                            { label: 'Неактивен', value: 'false' },
                        ]}
                    />

                    {!(form.values.type === null || form.values.type === UserTypeEnum.admin) && (
                        <>
                            <hr className={'col-span-full'} />
                            <Select
                                clearable
                                withAsterisk
                                label={'Относится к'}
                                {...form.getInputProps('depend_on', { dependOn: 'type' })}
                                onOptionSubmit={(e) => {
                                    console.log(e)
                                    // store.permissionStore.loadCompanyPermissionsResults(Number(e))
                                }}
                                data={[
                                    { label: 'Компании', value: 'company' },
                                    { label: 'Филиалы', value: 'filials' },
                                ]}
                            />
                            <Select
                                searchable
                                clearable
                                withAsterisk
                                label={'Компании'}
                                {...form.getInputProps('company_id', { dependOn: 'type' })}
                                onOptionSubmit={(e) => {
	                                console.log(e)
	                                store.permissionStore.loadCompanyPermissionsResults(Number(e))
                                }}
                                data={companyVar.map((item) => ({ label: item.name, value: String(item.id) }))}
                            />
                        </>
                    )}
								</form>
            </PanelForForms>
        </FormProvider>

    )
};

export default observer(FormCreateUpdateUsers);
