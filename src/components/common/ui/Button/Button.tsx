import React, { EventHandler } from 'react';
import styles from './Button.module.scss';


export enum ButtonVariant {
	tech =  "tech",
	default = "default",
	accent = "accent",
	"accent-outline" = "accent-outline"
}


export enum ButtonSizeType {
	sm =  "sm" ,
	base = "base",
	lg = "accent"
}

export type ButtonProps = {
	text: string
	variant?: ButtonVariant
	size?: ButtonSizeType
	action?: EventHandler<any>
	className?: string
	href?: string
}

const Button = ({ text, href = "#", size = ButtonSizeType.base, className, variant = ButtonVariant.default, action,  ...props}: ButtonProps) => {

	return <a href={href} className={styles.Button + " " + className} data-variant={variant} data-size={size} onClick={action} {...props}>{text}</a>;
};

export default Button;
