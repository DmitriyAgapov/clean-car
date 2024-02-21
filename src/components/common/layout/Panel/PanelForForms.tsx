import React, { ReactNode } from 'react'
import styles from './Panel.module.scss'
import Button, { ButtonVariant } from "components/common/ui/Button/Button";
import { InputBase, Select, TextInput } from "@mantine/core";
import { IMaskInput } from "react-imask";
import { UserTypeEnum } from "stores/userStore";
import label from "utils/labels";
import Panel from "components/common/layout/Panel/Panel";
import Progress from "components/common/ui/Progress/Progress";

export enum PanelVariant {
    default = 'default',
    textPadding = 'textPadding',
    dataPadding = 'dataPadding',
    withGapOnly = 'withGapOnly',
    modal = 'modal',
    // withPaddingSm = 'withPaddingSm',
    withPaddingSmWithBody = 'withPaddingSmWithBody',
    // 'withPadding_1_2' = 'withPadding_1_2',
}

export enum PanelColor {
    default = 'default',
    glass = 'glass',
}

export enum PanelRouteStyle {
    default = 'default',
    auth = 'auth',
    company = 'company',
    users = 'users',
    groups = 'groups',
}

export type PanelProps = {
    animate?: any
    step?: any
    search?: boolean
    children?: ReactNode | ReactNode[]
    header?: ReactNode | ReactNode[]
    footer?: ReactNode | ReactNode[]
    routeStyle?: PanelRouteStyle
    variant?: PanelVariant
    background?: PanelColor
    className?: string
    headerClassName?: string
    bodyClassName?: string | ''
    footerClassName?: string
    state?: boolean
    ref?: any
    action?: (event: any) => void | any
}

const PanelForForms = ({actionCancel, actionNext, actionBack, children, ...props }:{actionBack?: JSX.Element, actionCancel?: JSX.Element, actionNext?: JSX.Element, children: React.ReactNode} & PanelProps) => {

    return <Panel
      {...props}

      className={props.className + " " + 'col-span-full  grid grid-rows-[1fr_auto] items-start  overflow-x-hidden'}
      bodyClassName={`${props.bodyClassName} ${!props.animate ? 'slide-in-left-500' : 'slide-out-right-500'} grid  grid-cols-9 items-start gap-4 gap-y-4`}
      variant={props.variant ?? PanelVariant.textPadding}
      headerClassName={!props.animate ? 'slide-in-left' : 'slide-out-right'}
      footerClassName={props.footerClassName}
      footer={(actionBack || actionCancel || actionNext) &&
          // <div className={'accounts-group_header gap-4 text-[#606163] grid grid-cols-[1.25fr_2fr] grid- font-medium'}>
              <div className={'flex col-start-2 justify-end gap-5 flex-wrap'}>
                  {actionBack}
                  {actionCancel}
                  {actionNext}
              </div>
          // </div>
      }
      background={props.background ?? PanelColor.glass}
    >

        {children}
    </Panel>
}

export default PanelForForms;
