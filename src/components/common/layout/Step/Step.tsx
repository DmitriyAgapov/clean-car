import Panel, { PanelColor, PanelVariant } from "components/common/layout/Panel/Panel";
import Button, { ButtonVariant } from "components/common/ui/Button/Button";
import Heading, { HeadingColor, HeadingVariant } from "components/common/ui/Heading/Heading";
import SelectCustom from 'components/common/ui/Select/Select'
import { Field, useFormik, useFormikContext } from 'formik'
import React, { useEffect } from 'react'
import { CompanyType } from "stores/companyStore";
import InputAutocomplete from "components/common/ui/InputAutocomplete/InputAutocomplete";
import { useStore } from "stores/store";

export function Step(props: {
  step: any
  animate: any
  action: (event:  any) => void
  action1: () => void
  children: React.ReactNode
  stepIndex: number
  footer?: React.ReactNode
  header?: React.ReactNode
}) {
  const { values, touched, setValue, action, setValues,  errors, isValidating, isValid }:any = useFormikContext();
  const store = useStore()
  React.useEffect(() => {
    // @ts-ignore
    const models = store.catalogStore.getCarBrandModels(values.brand)
    // @ts-ignore
    console.log(models);
    setValues({...values, carModels: models })

    console.log(values.carModels);
  }, [values.brand])
  return (
    <Panel
      variant={PanelVariant.textPadding}
      state={props.step !== props.stepIndex}
      className={'grid grid-rows-[auto_1fr_auto] overflow-x-hidden flex-1'}
      background={PanelColor.glass}
      headerClassName={!props.animate ? 'slide-in-left' : 'slide-out-right'}
      bodyClassName={!props.animate ? 'slide-in-left-500' : 'slide-out-right-500'}
      footer={props.footer ? <div className={'accounts-group_header gap-4 text-[#606163] grid font-medium'}>
        <div className={'lg:flex block justify-end gap-5 justify-self-end'}>
          {props.footer}
        </div>
      </div> : null}

      header={props.header}>
      <div className={'mt-10 flex flex-wrap gap-6'}>
        {props.children}
      </div>
    </Panel>
  )
}
