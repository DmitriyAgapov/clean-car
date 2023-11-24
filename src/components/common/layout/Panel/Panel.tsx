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

type PanelProps  = {
	children: ReactNode | ReactNode[]
	variant?: PanelVariant
	background?: PanelColor
	className?: string
}

const Panel = ({children, variant = PanelVariant.default, background = PanelColor.default, className = "" }:PanelProps) => {
	return (
		<div className={styles.Panel + " " + className}  data-variant={variant} data-background={background}>{children}</div>
	);
};

export default Panel;
