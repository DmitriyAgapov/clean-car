import Panel, { PanelColor, PanelVariant } from "components/common/layout/Panel/Panel";
import Button, { ButtonVariant } from "components/common/ui/Button/Button";
import Heading, { HeadingColor, HeadingVariant } from "components/common/ui/Heading/Heading";
import { useFormikContext } from "formik";
import React, { useEffect } from "react";
import { useStore } from "stores/store";
import { SvgPlus } from "components/common/ui/Icon";
import styles from './Step.module.scss'
import { useNavigate } from "react-router-dom";
import { CompanyType } from "stores/companyStore";
import LinkStyled from "components/common/ui/LinkStyled/LinkStyled";

export const CreateField = ({ title }: {title:string}) => (
    <div className={styles.createField}>
        <SvgPlus />
        <Heading text={title} variant={HeadingVariant.h3} color={HeadingColor.accent} />
    </div>
)
export function FormStepSuccess(props: {
  step: any
  animate: any
  title: string
  action?: () => any
  values?: any
  errors?: any
  touched?: any
  store?: any
  prop8?: (o: any) => { label: any; value: string }
}) {
  const { values, touched, errors }:any = useFormikContext();

  const navigate = useNavigate()
  const store = useStore()

  return (
    <Panel variant={PanelVariant.textPadding}
      state={props.step !== 3}
      className={'grid grid-rows-[auto_1fr_auto] overflow-x-hidden'}
      background={PanelColor.glass}
      headerClassName={!props.animate ? 'slide-in-left' : 'slide-out-right'}
      bodyClassName={!props.animate ? 'slide-in-left-500' : 'slide-out-right-500'}
      footer={<div className={'accounts-group_header gap-4 text-[#606163] grid grid-cols-[1.25fr_2fr] grid- font-medium '}>



          <LinkStyled text={'перейти к компании'}
            // action={async () => {
            //   // @ts-ignore
            //   await store.permissionStore.createPermissionStoreAdmin(changes)
            //   setTimeout(() => navigate('/account/groups'), 500)
            //   // navigate('/account/groups')
            // }}
            to={`/account/companies/${values.application_type == CompanyType.performer ? 'performer': 'customer'}/${values.id}`}
            type={'submit'}
            className={'float-right col-start-2 justify-self-end'}
            variant={ButtonVariant.accent} />

      </div>}
      header={<>
        <Heading text={`Шаг ${values.application_type == 'Партнер' && '2'|| props.title }. Компания создана `}
          color={HeadingColor.accent}
          variant={HeadingVariant.h2}
         />
        <div className={'text-base'}>
          Укажите информацию о счете компании и предпочтительных партнеров, если такие есть
        </div>
      </>}>
      <div className={'mt-10 flex flex-wrap gap-6'}>
          <CreateField title={'Создать прайс-лист'}/>
          <CreateField title={'Создать лимиты'}/>
      </div>
    </Panel>
  )
}
