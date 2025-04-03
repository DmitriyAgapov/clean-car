import { useElementSize } from '@mantine/hooks'
import React, { forwardRef, ReactNode } from "react";
import styles from './Panel.module.scss'
import { useLocalStore } from "stores/localStore";

export enum PanelVariant {
    default = 'default',
    textPadding = 'textPadding',
    dataPadding = 'dataPadding',
    withGapOnly = 'withGapOnly',
    modal = 'modal',
    // withPaddingSm = 'withPaddingSm',
    withPaddingSmWithBody = 'withPaddingSmWithBody',
    dataPaddingWithoutFooter = 'dataPaddingWithoutFooter',
    suffixFooter = 'suffixFooter'
    // 'withPadding_1_2' = 'withPadding_1_2',
}

export enum PanelColor {
    default = 'default',
    glass = 'glass',
    withSuffix = 'withSuffix',
}

export enum PanelRouteStyle {
    default = 'default',
    price_evac = 'price_evac',
    default_form = 'default_form',
    limits = 'limits',
    prices = 'prices',
    financeTransaction = 'financeTransaction',
    price = 'price',
    finance = 'finance',
    financeByTypeServiceId = 'financeByTypeServiceId',
    financeByType = 'financeByType',
    financeId = 'financeId',
    bids = 'bids',
    bid_histories = 'bid_histories',
    auth = 'auth',
    company = 'company',
    cars = 'cars',
    filials = 'filials',
    users = 'users',
    groups = 'groups',
    refcars = 'refcars',
    user_history = 'user_history',
    car_history = 'car_history',
    price_history = 'price_history',
    price_tire = 'price_tire'






}

export type PanelProps = {
    search?: boolean
    children?: ReactNode | ReactNode[]
    header?: ReactNode | ReactNode[]
    footer?: ReactNode | ReactNode[] | JSX.Element
    routeStyle?: PanelRouteStyle
    variant?: PanelVariant
    background?: PanelColor
    className?: string
    headerClassName?: string
    bodyClassName?: string | ''
    style?: any
    footerClassName?: string
    state?: boolean
    ref?: any
    action?: (event: any) => void | any
}

const Panel = forwardRef(function Panel({
    children,
    search = false,
    action,
    state = false,
    header,
    headerClassName = '',
    bodyClassName = '',
    footerClassName = '',
    footer,
    routeStyle = PanelRouteStyle.default,
    variant = PanelVariant.default,
    background = PanelColor.default,
    className = '',
  ...props
}: PanelProps,
  refBody:any
){

    if (state) return null

    return (
        <div          ref={refBody}

          onClick={action}
            className={styles.Panel + '  ' + className}
            data-style={routeStyle}
            data-variant={variant}
            data-background={background}
          {...props}
        >
            {header && (
                <header data-panel={'header'} className={headerClassName}>
                    {header}
                </header>
            )}
            {children && (
            <div className={styles.panelBody + ' ' + bodyClassName} data-panel={'body'}>
                {children}
            </div>)}
            {footer && (
                <footer data-panel={'footer'} className={footerClassName}>
                    {footer}
                </footer>
            )}
        </div>
    )
})

export default Panel;
