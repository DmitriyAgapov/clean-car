import Panel, { PanelColor, PanelVariant } from "components/common/layout/Panel/Panel";
import Button, { ButtonVariant } from "components/common/ui/Button/Button";
import Heading, { HeadingColor, HeadingVariant } from "components/common/ui/Heading/Heading";
import SelectCustom from 'components/common/ui/Select/Select'
import { Field, useFormik, useFormikContext } from 'formik'
import React from 'react'

export function FormStep1(props: {
  step: any
  animate: any
  action: () => any
  values: any
  action1: () => void
  errors: any
  touched: any
  store: any
  prop8: (o: any) => { label: any; value: string }
}) {
  const { values, touched, errors }:any = useFormikContext();
  return (
    <Panel
      variant={PanelVariant.withPaddingSmWithBody}
      state={props.step !== 1}
      className={'col-span-full grid grid-rows-[auto_1fr_auto] overflow-x-hidden'}
      background={PanelColor.glass}
      headerClassName={!props.animate ? 'slide-in-left' : 'slide-out-right'}
      bodyClassName={!props.animate ? 'slide-in-left-500' : 'slide-out-right-500'}
      footer={
        <div className={'accounts-group_header gap-4 text-[#606163] grid font-medium'}>
          <div className={'flex justify-end gap-5 justify-self-end'}>
            <Button
              text={'Отменить'}
              action={props.action}
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
                action={props.action1}
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
          <div className={'text-base'}>Укажите основную информацию о компании для добавления ее в список</div>
        </>
      }
    >
      <div className={'mt-10 flex flex-wrap gap-6'}>
        <label
          className={'account-form__input w-full flex-grow  !flex-[1_0_20rem]'}
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
          <SelectCustom
            label={'Город'}
            value={props.values.city}
            name={'city'}
            className={' w-fit'}
            options={props.store.catalogStore.cities.map(props.prop8)}
          />
        </React.Suspense>
        <label
          className={'account-form__input w-full flex-grow  !flex-[1_0_20rem]'}
          htmlFor={'address'}
          data-form_error={errors.address && touched.address && 'error'}
        >
          {'Адрес'}
          <Field id={'address'} name='address' placeholder={'Введите название компании'} type={'text'} />
          {errors.address && touched.address ? (
            <div className={'form-error'}>{errors.address}</div>
          ) : null}
        </label>

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
        <hr className={'my-10 flex-[1_0_100%] w-full border-gray-2'} />
        <SelectCustom
          label={'Тип'}
          value={props.values.city}
          name={'application_type'}
          className={' w-fit'}
          options={[
            { label: 'Заказчик', value: 'Заказчик' },
            { label: 'Исполнитель', value: 'Исполнитель' },
          ]}
        />
        {props.values.application_type == 'Исполнитель' && (
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
