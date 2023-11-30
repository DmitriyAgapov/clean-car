import React, { EventHandler } from 'react';
import styles from './Button.module.scss';


export enum ButtonVariant {
	tech =  "tech",
	default = "default",
	accent = "accent",
	"accent-outline" = "accent-outline"
}
export enum ButtonDirectory {
	admin =  "admin" ,
	customer = "customer",
	executor = "executor"
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
	directory?: ButtonDirectory
}

const Button = ({ text, href = "#", size = ButtonSizeType.base, className, directory, variant = ButtonVariant.default, action,  ...props}: ButtonProps) => {

	return <a href={href} className={styles.Button + " " + className} data-directory={directory} data-variant={variant} data-size={size} onClick={action} {...props}>{text}</a>;
};

export default Button;
