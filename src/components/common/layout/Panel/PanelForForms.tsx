import React, { ReactNode } from 'react'
import Panel, { PanelRouteStyle } from 'components/common/layout/Panel/Panel'

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

const PanelForForms = ({actionCancel, actionNext, actionBack, children, ...props }:{actionBack?: JSX.Element | null, actionCancel?: JSX.Element | null, actionNext?: JSX.Element, children: React.ReactNode} & PanelProps) => {

    return <Panel
      {...props}
        routeStyle={PanelRouteStyle.default_form}
      className={props.className + " " + 'col-span-full  grid grid-rows-[1fr_auto] items-start  overflow-x-hidden'}
      bodyClassName={`${props.bodyClassName} ${!props.animate ? 'slide-in-left-500' : 'slide-out-right-500'} grid  grid-cols-9 items-start gap-4 gap-y-4`}
      variant={props.variant ?? PanelVariant.textPadding}
      headerClassName={!props.animate ? 'slide-in-left' : 'slide-out-right'}
      footerClassName={props.footerClassName}
      footer={(actionBack || actionCancel || actionNext) &&
          // <div className={'accounts-group_header gap-4 text-[#606163] grid grid-cols-[1.25fr_2fr] grid- font-medium'}>
              <div className={'flex flex-1 col-start-2 justify-end gap-5 flex-wrap'}>
                  <div className={'mr-auto'}> {actionCancel}</div>
                  <div className={'flex gap-5'}>
                      {actionBack}
                     {actionNext}
                  </div>
              </div>
          // </div>
      }
      background={props.background ?? PanelColor.glass}
    >

        {children}
    </Panel>
}

export default PanelForForms;
