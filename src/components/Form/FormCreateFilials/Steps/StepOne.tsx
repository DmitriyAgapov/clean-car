import Panel, { PanelColor, PanelVariant } from "components/common/layout/Panel/Panel";
import Button, { ButtonVariant } from "components/common/ui/Button/Button";
import Heading, { HeadingColor, HeadingVariant } from "components/common/ui/Heading/Heading";
import SelectCustom from 'components/common/ui/Select/Select'
import { Field, useFormikContext } from 'formik'
import React, { useEffect, useState } from 'react'
import { CompanyType } from "stores/companyStore";
import InputAutocomplete from "components/common/ui/InputAutocomplete/InputAutocomplete";
import { useStore } from 'stores/store'
import { Combobox, Input, InputBase, ScrollArea, useCombobox } from '@mantine/core'
import { Select } from '@mantine/core'
import { UserTypeEnum } from "stores/userStore";
import label from "utils/labels";
import {values as val } from 'mobx'
export function FormStep1(props: {
  step: any
  animate: any
  action: () => any
  values: any
  action1: () => any
  errors: any
  isValid?: boolean
  touched: any
  store: any
  prop8: (o: any) => { label: any; value: string }
}) {
  const  SelectCompanyFilials = () => {
    const store = useStore()
    const {values, setValues, errors} = useFormikContext<any>();
    const [companies, setCompanies] = useState<any>([]);
    console.log(errors);
    console.log(values);
    const combobox = useCombobox(
      {
        onDropdownClose: () => combobox.resetSelectedOption()
      });
    const [ searchString, setSearchString] = useState<string>('')

    useEffect(() => {
      const type = values.application_type === CompanyType.customer ? UserTypeEnum.customer : UserTypeEnum.performer
      const getCompany = async () => {
        if(type === UserTypeEnum.customer) {
          if (values.company_filials == 'company') {
            await store.companyStore.getCustomerCompany({name: searchString})
          }
          if(values.company_filials == 'filials') {
            await store.companyStore.getPerformersCompany({name: searchString})
          }
          setCompanies(store.companyStore.companiesCustomer)
        } else if(type === UserTypeEnum.performer) {
          if (values.company_filials == 'company') {
            await store.companyStore.getCustomerCompany({name: searchString})
          }
          if(values.company_filials == 'filials') {
            await store.companyStore.getPerformersCompany({name: searchString})
          }
          setCompanies(store.companyStore.companiesPerformers)
        }
      }
      getCompany()

    }, [searchString, values.company_filials, values.type]);
    const handleChangeSearch = React.useCallback((e:any) => {
      setSearchString(e.currentTarget.value);
    }, [])
    const options = React.useMemo(() => {

      if(companies.length !== 0) return companies.map((item:any) => (
        <Combobox.Option value={item.id} onClick={() => setValues({...values, company_name: item.name, company_id: item.id, type: item.company_type === "Компания-Заказчик" ? UserTypeEnum.customer : UserTypeEnum.performer})}
          key={item.id}>
          {item.name}
        </Combobox.Option>
      ))
      return ([<Combobox.Option value={"no"} onClick={() => setValues({...values, company_name: 'Нет данных', company_id: 1, type: UserTypeEnum.customer})}
        key={1}>
        Нет данных
        </Combobox.Option>])

    }, [companies]);

    return (
      <>
        <SelectCustom
          value={values.company_filials}
          defaultValue={values.company_filials}
          allowDeselect={false}
          name={'company_filials'}
          label={'Принадлежит'}
          options={[
            { label: 'Компании', value: 'company' },
            { label: 'Филиалу', value: 'filials' },
          ]}
          className={'col-span-3'}
        />

        <Combobox store={combobox}
          disabled={values.company_filials == 'company' && values.company_id === store.userStore.currentUser?.company?.id}
          onOptionSubmit={(val) => {
            const addProps = values.company_filials == 'company' ? ({company_id: Number(val)}) : ({filial_id: Number(val)})
            setValues(() => Object.assign(values, addProps))
            combobox.closeDropdown();
          }}>
          <Combobox.Target >
            <InputBase
              classNames={{
                input: 'bg-white data-[disabled=true]:bg-white rounded-[0.625rem] border-color-[var(--formBorder)] h-10 m-8fb7ebe7 mantine-Input-input mantine-Select-input',
              }}
              label={values.company_filials == 'company' ? 'Компания' : 'Филиал'}
              disabled={values.company_filials == 'company' && values.company_id === store.userStore.currentUser?.company?.id}
              defaultValue={values.company_filials == 'company' ? values.company_name : values.filial_id}
              component="button"
              type="button"
              pointer
              rightSection={<Combobox.Chevron />}
              rightSectionPointerEvents="none"
              onClick={() => {
                combobox.toggleDropdown()
                }
              }
              className={'col-span-6 flex-1'}
            >
              {values.company_filials == 'company' ? values.company_name : companies[0]?.name || null  || <Input.Placeholder classNames={{
                placeholder: 'text-gray-1 '
              }}>Выбрать {values.company_filials === 'company' ? 'Компанию' : 'Филиал'}</Input.Placeholder>}
            </InputBase>
          </Combobox.Target>
          {companies.length > 0 && <Combobox.Dropdown>
            {companies.length > 5 && <Combobox.Search onChange={handleChangeSearch} className={'border-0  w-full !px-3 pt-1 !placeholder:text-gray-1'} classNames={{
              input: 'border-1 px-0 border-accent'
            }} placeholder="Быстрый поиск" />}
            <Combobox.Options>
              <ScrollArea.Autosize type="scroll" mah={200}>
                {options}
              </ScrollArea.Autosize>
            </Combobox.Options>
          </Combobox.Dropdown>}
        </Combobox>
      </>
    )
  }
  const { values, touched,  errors, isValidating, isValid, setValues }:any = useFormikContext();
  const store = useStore()
   return (
    <Panel
      variant={PanelVariant.textPadding}
      state={props.step !== 1}
      className={'grid grid-rows-[auto_1fr_auto] overflow-x-hidden'}
      background={PanelColor.glass}
      headerClassName={!props.animate ? 'slide-in-left' : 'slide-out-right'}
      bodyClassName={!props.animate ? 'slide-in-left-500' : 'slide-out-right-500'}
      footer={
        <div className={'accounts-group_header gap-4 text-[#606163] grid font-medium'}>
          <div className={'lg:flex block justify-end gap-5 justify-self-end'}>
            <Button
              text={'Отменить'}
              action={props.action}
              className={'float-right lg:mb-0 mb-5'}
              variant={ButtonVariant['accent-outline']}
            />

            {values.application_type == CompanyType.customer || values.application_type.value == CompanyType.customer ? (
              <Button
                type={'submit'}
                disabled={!isValid}
                text={'Дальше'}
                action={props.action1}
                className={'float-right'}
                variant={ButtonVariant.accent}
              />
            ) : (
              <Button
                type={'submit'}
                action={props.action1}
                disabled={!isValid}
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

          />
          <div className={'text-base'}>Укажите основную информацию о филиале для добавления ее в список </div>
        </>
      }
    >
      <div className={'mt-10 flex flex-wrap gap-6'}>
        <label className={'account-form__input w-full flex-grow'}
          htmlFor={'filial_name'}
          data-form_error={errors.filial_name && touched.filial_name && 'error'}>
          {'Название филиала'}
          <Field id={'filial_name'}
            name='filial_name'
            placeholder={'Введите название филиала'}
            type={'text'} />
          {errors.filial_name && touched.filial_name ? (
            <div className={'form-error'}>{errors.filial_name}</div>
          ) : null}
        </label>
        <React.Suspense>
          <SelectCustom label={'Город'}
            value={props.values.city}
            name={'city'}
            className={' w-fit'}
            options={store.catalogStore.allCities.map(props.prop8)} />
          <InputAutocomplete className={'w-full flex-1'}/>
        </React.Suspense>
        <label className={'account-form__input w-full flex-grow'}
          htmlFor={'status'}
          data-form_error={errors.status && touched.status && 'error'}>
          {'Статус'}
          <SelectCustom id={'status'}
            name='status'
            value={values.status ? 'active' : 'inactive'}
            defaultValue={values.status ? 'active' : 'inactive'}
            options={[
              { label: 'Активный', value: 'active' },
              { label: 'Неактивный', value: 'inactive' },
            ]}
          />
          {errors.status && touched.status ? (
            <div className={'form-error'}>{errors.status}</div>
          ) : null}
        </label>
        <Select
          value={String(values.status)}
          withCheckIcon={false}
          name={'status'}
          onChange={(value) => setValues({ ...values, status: value === 'true' })}
          label={'Статус'}
          data={[
            { label: 'Активен', value: 'true' },
            { label: 'Неактивен', value: 'false' },
          ]}
          className={'col-span-2'}
        />
        {/* <label className={'account-form__input w-fit flex-grow-0'} */}
        {/*   htmlFor={'status'} */}
        {/*   data-form_error={errors.status && touched.status && 'error'}> */}
        {/*   {'Статус'} */}
        {/*   <SelectCustom id={'status'} */}
        {/*     name='status' */}
        {/*     value={values.status ? 'active' : 'inactive'} */}
        {/*     defaultValue={values.status ? 'active' : 'inactive'} */}

        {/*     options={[ */}
        {/*       { label: 'Активный', value: 'active' }, */}
        {/*       { label: 'Неактивный', value: 'inactive' }, */}
        {/*     ]} */}
        {/*   /> */}
        {/*   {errors.filial_name && touched.filial_name ? ( */}
        {/*     <div className={'form-error'}>{errors.filial_name}</div> */}
        {/*   ) : null} */}
        {/* </label> */}
        <SelectCustom
          label={'Тип'}
          disabled={props.values.application_type.readOnly}
          defaultValue={props.values.application_type || props.values.application_type.value}
          value={props.values.application_type.value || props.values.application_type.value}
          name={'application_type'}
          allowDeselect={false}
          className={' w-fit'}
          options={[
            { label: 'Заказчик', value: CompanyType.customer },
            { label: 'Партнер', value: CompanyType.performer },
          ]}
        />
        <hr className={'my-4 flex-[1_0_100%] w-full border-gray-2'} />
        {/* <SelectCustom */}
        {/*   label={'Тип'} */}
        {/*   disabled={props.values.application_type.readOnly} */}
        {/*   defaultValue={props.values.application_type || props.values.application_type.value} */}
        {/*   value={props.values.application_type.value || props.values.application_type.value} */}
        {/*   name={'application_type'} */}
        {/*   className={' w-fit'} */}
        {/*   options={[ */}
        {/*     { label: 'Заказчик', value: CompanyType.customer }, */}
        {/*     { label: 'Партнер', value: CompanyType.performer }, */}
        {/*   ]} */}
        {/* /> */}
        <SelectCompanyFilials />
      </div>
    </Panel>
   )
}
