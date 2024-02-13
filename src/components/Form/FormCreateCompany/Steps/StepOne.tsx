import Panel, { PanelColor, PanelVariant } from "components/common/layout/Panel/Panel";
import Button, { ButtonVariant } from "components/common/ui/Button/Button";
import Heading, { HeadingColor, HeadingVariant } from "components/common/ui/Heading/Heading";
import SelectCustom from 'components/common/ui/Select/Select'
import { Field, useFormik, useFormikContext } from 'formik'
import React, { useEffect } from 'react'
import { CompanyType } from "stores/companyStore";
import InputAutocomplete from "components/common/ui/InputAutocomplete/InputAutocomplete";
import InputAutocompleteComponent from "components/common/ui/InputAutocompleteComponent/InputAutocompleteComponent";
import { values as val } from "mobx";
import SelectMantine from "components/common/ui/SelectMantine/SelectMantine";
export function FormStep1(props: {
  step: any
  animate: any
  action: () => any
  values: any
  action1: (e:any) => any
  errors: any
  isValid?: boolean
  touched: any
  store: any
  prop8: (o: any) => { label: any; value: string }
}) {
  const { values, touched,  errors, setFieldValue, isValidating, isValid }:any = useFormikContext();
    useEffect(() => {
      console.log(errors);
    }, [errors])
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
                text={'Дальше'}
                action={() => {
                  (Object.keys(errors).length == 0)
                 ? props.action1 : void null
                }}
                type={'submit'}
                className={'float-right'}
                variant={ButtonVariant.accent}
              />
            ) : (
              <Button
                type={'submit'}
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
          <div className={'text-base'}>Укажите основную информацию о компании для добавления ее в список</div>
        </>
      }
    >
      <div className={'mt-10 flex flex-wrap gap-6'}>
        <label
          className={'account-form__input  flex-grow  !flex-[1_0_20rem]'}
          htmlFor={'company_name'}
          data-form_error={errors.company_name && touched.company_name && 'error'}
        >
          {'Название компании'}
          <Field
            id={'company_name'}
            name='company_name'
            placeholder={'Введите название компании'}
            type={'text'}
          />
          {errors.company_name && touched.company_name ? (
            <div className={'form-error'}>{errors.company_name}</div>
          ) : null}
        </label>
        <React.Suspense>
          <SelectMantine
            label={'Город'}
            searchable={true}
            value={props.values.city}
            name={'city'}
            className={'!flex-auto'}
            data={val(props.store.catalogStore.cities).map(props.prop8)}
          />
          <InputAutocomplete />
        </React.Suspense>

        <label
          className={'account-form__input w-full flex-grow  !flex-[1_0_20rem]'}
          htmlFor={'inn'}
          data-form_error={errors.inn && touched.inn && 'error'}
        >
          {'ИНН'}
          <Field id={'inn'} name='inn' placeholder={'Введите название компании'} type={'number'} />
          {errors.inn && touched.inn ? (
            <div className={'form-error'}>{errors.inn}</div>
          ) : null}
        </label>
        <label
          className={'account-form__input w-full flex-grow  !flex-[1_0_20rem]'}
          htmlFor={'ogrn'}
          data-form_error={errors.ogrn && touched.ogrn && 'error'}
        >
          {'ОГРН'}
          <Field id={'ogrn'} name='ogrn' placeholder={'Введите название компании'} type={'number'} />
          {errors.ogrn && touched.ogrn ? (
            <div className={'form-error'}>{errors.ogrn}</div>
          ) : null}
        </label>
        <label
          className={'account-form__input w-full flex-grow  !flex-[1_0_20rem]'}
          htmlFor={'legal_address'}
          data-form_error={errors.legal_address && touched.legal_address && 'error'}
        >
          {'Юридический адрес'}
          <Field
            id={'legal_address'}
            name='legal_address'
            placeholder={'Введите название компании'}
            type={'text'}
          />
          {errors.legal_address && touched.legal_address ? (
            <div className={'form-error'}>{errors.legal_address}</div>
          ) : null}
        </label>
        {values.application_type === CompanyType.performer && <label
          className={'account-form__input w-full flex-grow  !flex-[1_0_20rem]'}
          htmlFor={'legal_address'}
          data-form_error={errors.working_time && touched.working_time && 'error'}
        >
          {'Часы работы'}
          <Field
            id={'working_time'}
            name='working_time'
            placeholder={'Введите время работы компании'}
            type={'text'}
          />
          {errors.working_time && touched.working_time ? (
            <div className={'form-error'}>{errors.working_time}</div>
          ) : null}
        </label>}

        <hr className={'my-4 flex-[1_0_100%] w-full border-gray-2'} />
        <SelectMantine
          allowDeselect={false}
          label={'Тип'}
          onChange={(value) => setFieldValue('application_type', {
            ...values,
            value: value
          })}

          // disabled={props.values.application_type.readOnly}
          defaultValue={props.values.application_type.value}
          value={values.application_type.value}
          name={'application_type'}
          className={'!flex-initial'}
          data={[
            { label: 'Заказчик', value: CompanyType.customer },
            { label: 'Партнер', value: CompanyType.performer },
          ]}
        />
        {(values.application_type == CompanyType.performer || values.application_type.value == CompanyType.performer) && (
          <label
            className={'account-form__input  !flex-[0_0_14rem]'}
            htmlFor={'service_percent'}
            data-form_error={errors.service_percent && touched.service_percent && 'error'}
          >
            {'Процент сервиса'}
            <Field
              id={'service_percent'}
              name='service_percent'
              placeholder={'Введите название компании'}
              type={'number'}
            />
            {errors.service_percent && touched.service_percent ? (
              <div className={'form-error'}>{errors.service_percent}</div>
            ) : null}
          </label>
        )}
        <label
          className={'account-form__input w-full flex-grow  !flex-[1_1]'}
          htmlFor={'contacts'}
          data-form_error={errors.contacts && touched.contacts && 'error'}
        >
          {'Контактные данные'}
          <Field id={'contacts'} name='contacts' placeholder={'Введите название компании'} type={'text'} />
          {errors.contacts && touched.contacts ? (
            <div className={'form-error'}>{errors.contacts}</div>
          ) : null}
        </label>
      </div>
    </Panel>
  )
}
