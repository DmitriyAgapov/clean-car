import React, { ReactNode } from 'react';
import styles from './Panel.module.scss';

export enum PanelVariant {
	default =  "default" ,
	withPadding = "withPadding"
}

export enum PanelColor {
	default =  "default" ,
	glass = "glass"
}
export enum PanelRouteStyle {
	default =  "default" ,
	company = "company",
	groups = "groups"
}
type PanelProps  = {
	children?: ReactNode | ReactNode[]
	header?: ReactNode | ReactNode[]
	footer?: ReactNode | ReactNode[]
	routeStyle?: PanelRouteStyle
	variant?: PanelVariant
	background?: PanelColor
	className?: string
	state?: boolean
}

const Panel = ({children, state = false, header, footer, routeStyle = PanelRouteStyle.default, variant = PanelVariant.default, background = PanelColor.default, className = "" }:PanelProps) => {
	if(state) return <div>{'loading'}</div>;
	return (
		<div className={styles.Panel + "  " + className} data-style={routeStyle}  data-variant={variant} data-background={background}>
			{header && <header  data-panel={'header'}>
				{header}
			</header>}
			<div className={styles.panelBody} data-panel={'body'}>
				{children}
			</div>
			{footer && <footer  data-panel={'footer'}>
				{footer}
			</footer>}
</div>
	);
};

export default Panel;
