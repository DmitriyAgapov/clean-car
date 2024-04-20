import React, { forwardRef, ReactNode } from "react";
import styles from './Panel.module.scss'

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
    default_form = 'default_form',
    limits = 'limits',
    finance = 'finance',
    bids = 'bids',
    auth = 'auth',
    company = 'company',
    cars = 'cars',
    filials = 'filials',
    users = 'users',
    groups = 'groups',
    refcars = 'refcars',
    price_history = 'price_history',
    price_tire = 'price_tire'






}

export type PanelProps = {
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
}: PanelProps, ref){
    if (state) return null
    return (
        <div
            onClick={action}
            className={styles.Panel + '  ' + className}
            data-style={routeStyle}
            data-variant={variant}
            data-background={background}
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
