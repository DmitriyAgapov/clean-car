import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import styles from './LinkStyled.module.scss';

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

interface ButtonProps  {
	text: string
	variant?: ButtonVariant
	size?: ButtonSizeType
}

const LinkStyled = ({ text, to, size = ButtonSizeType.base, variant = ButtonVariant.default, ...props}: LinkProps & ButtonProps) => {

	return <Link to={to} className={styles.Button} data-variant={variant} data-size={size}{...props}>{text}</Link>;
};

export default LinkStyled;
