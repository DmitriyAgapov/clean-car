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
	header?: ReactNode | ReactNode[]
	footer?: ReactNode | ReactNode[]
	variant?: PanelVariant
	background?: PanelColor
	className?: string
}

const Panel = ({children, header, footer, variant = PanelVariant.default, background = PanelColor.default, className = "" }:PanelProps) => {
	return (
		<div className={styles.Panel + " " + className}  data-variant={variant} data-background={background}>
			{header && <header>
				{header}
			</header>}
			<div className={styles.panelBody}>
				{children}
			</div>
			{footer && <footer>
				{footer}
			</footer>}
</div>
	);
};

export default Panel;
