import Panel, { PanelColor, PanelVariant } from "components/common/layout/Panel/Panel";
import Button, { ButtonVariant } from "components/common/ui/Button/Button";
import Heading, { HeadingColor, HeadingVariant } from "components/common/ui/Heading/Heading";
import SelectCustom from 'components/common/ui/Select/Select'
import { Field, useFormik, useFormikContext } from 'formik'
import React from 'react'
import SelectFromList from "components/common/SelectFromList/SelectFromList";
import { useStore } from "stores/store";

export function FormStepTwo(props: {
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
  const store = useStore()
  return (
    <Panel variant={PanelVariant.textPadding}
      state={props.step !== 2}
      className={' grid grid-rows-[auto_1fr_auto] overflow-x-hidden'}
      background={PanelColor.glass}
      headerClassName={!props.animate ? 'slide-in-left' : 'slide-out-right'}
      bodyClassName={!props.animate ? 'slide-in-left-500' : 'slide-out-right-500'}
      footer={<div className={'accounts-group_header flex-1 gap-4 text-[#606163] grid grid-cols-[1.25fr_2fr] grid- font-medium'}>
        <Button text={'Назад'}
          action={props.action}
          className={'justify-self-start'} />
        <div className={'flex justify-end gap-5 justify-self-end'}>
          <Button text={'Отменить'}
            action={props.action}
            className={'float-right'}
            variant={ButtonVariant.cancel}/>

          <Button text={'Сохранить'}
            type={'submit'}
            className={'float-right'}
            variant={ButtonVariant.accent} />
        </div>
      </div>}
      header={<>
        <Heading text={'Шаг 2. Индивидуальные настройки'}
          color={HeadingColor.accent}
          variant={HeadingVariant.h2}
          />
        <div className={'text-base'}>
          Укажите информацию о счета компании и предпочтительных исполнителей, если такие есть
        </div>
      </>}>
      <div className={'mt-10 flex flex-wrap gap-6'}>
        <SelectCustom label={'Оплата'}
          value={values.payment}
          name={'payment'}
          className={' w-fit  !flex-[0_0_auto]'}
          options={[ { label: 'Постоплата', value: 'Постоплата' }, { label: 'Предоплата', value: 'Предоплата' }, ]} />

        <SelectCustom label={'Овердрафт'}
          value={values.overdraft}
          name={'overdraft'}
          className={' w-fit  !flex-[0_0_auto]'}
          options={[ { label: 'Да', value: '1' }, { label: 'Нет', value: '2' }, ]} />
        <label className={'account-form__input w-24 flex-grow   !flex-[0_1_auto]'}
          htmlFor={'overdraft_sum'}
          data-form_error={errors.overdraft_sum && touched.overdraft_sum && 'error'}>
          {'Сумма '}
          <Field id={'overdraft_sum'}
            name='overdraft_sum'
            placeholder={'Введите название компании'}
            type={'number'} />
          {errors.overdraft_sum && touched.overdraft_sum ? (<div className={'form-error'}>{errors.overdraft_sum}</div>) : null}
        </label>
        <SelectCustom label={'Список Партнеров'}
          value={values.performers_list}
          name={'performers_list'}
          className={' w-fit  !flex-[0_0_auto]'}
          options={[ { label: 'Да', value: '1' }, { label: 'Нет', value: '2' }, ]} />
        <hr className={'my-4 flex-[1_0_100%] w-full border-gray-2'} />
        <SelectFromList items={store.companyStore.companiesPerformers} />
      </div>
    </Panel>
  )
}
