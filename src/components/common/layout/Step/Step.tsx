import Panel, { PanelColor, PanelVariant } from "components/common/layout/Panel/Panel";
import Button, { ButtonVariant } from "components/common/ui/Button/Button";
import Heading, { HeadingColor, HeadingVariant } from "components/common/ui/Heading/Heading";
import SelectCustom from 'components/common/ui/Select/Select'
import { Field, useFormik, useFormikContext } from 'formik'
import React, { useEffect } from 'react'
import { CompanyType } from "stores/companyStore";
import InputAutocomplete from "components/common/ui/InputAutocomplete/InputAutocomplete";

export function Step(props: {
  step: any
  animate: any
  action: () => any
  action1: () => void
  children: React.ReactNode
  stepIndex: number
  footer?: React.ReactNode
  header?: React.ReactNode
}) {
  const { values, touched,  errors, isValidating, isValid }:any = useFormikContext();
  // console.log(values);
  return (
    <Panel
      variant={PanelVariant.textPadding}
      state={props.step !== props.stepIndex}
      className={'grid grid-rows-[auto_1fr_auto] overflow-x-hidden'}
      background={PanelColor.glass}
      headerClassName={!props.animate ? 'slide-in-left' : 'slide-out-right'}
      bodyClassName={!props.animate ? 'slide-in-left-500' : 'slide-out-right-500'}
      footer={
        <div className={'accounts-group_header gap-4 text-[#606163] grid font-medium'}>
          <div className={'lg:flex block justify-end gap-5 justify-self-end'}>
            {props.footer}
          </div>
        </div>
      }
      header={props.header}
    >
      <div className={'mt-10 flex flex-wrap gap-6'}>
        {props.children}
      </div>
    </Panel>
  )
}
