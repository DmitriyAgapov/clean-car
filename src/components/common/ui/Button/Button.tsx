import React, { EventHandler } from 'react';
import styles from './Button.module.scss';

export enum ButtonVariant {
	outline =  "outline" ,
	default = "default",
	accent = "accent",
	"accent-outline" = "accent-outline"
}

export enum ButtonSizeType {
	sm =  "sm" ,
	base = "base",
	lg = "accent"
}

type ButtonProps = {
	text: string
	variant?: ButtonVariant
	size?: ButtonSizeType
	action?: EventHandler<any>
	href?: string
}

const Button = ({ text, href = "#", size = ButtonSizeType.base, variant = ButtonVariant.default, action,  ...props}: ButtonProps) => {

	return <a href={href} className={styles.Button} data-variant={variant} data-size={size} onClick={action} {...props}>{text}</a>;
};

export default Button;
