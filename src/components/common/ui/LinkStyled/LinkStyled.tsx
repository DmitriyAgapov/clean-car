import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import styles from '../Button/Button.module.scss';
import { ButtonSizeType, ButtonVariant } from "components/common/ui/Button/Button";

export enum ButtonDirectory {
	admin =  "admin" ,
	customer = "customer",
	executor = "executor"
}

interface ButtonProps  {
	text: string
	variant?: ButtonVariant
	size?: ButtonSizeType
	directory?: ButtonDirectory
}

const LinkStyled = ({ text, to, size = ButtonSizeType.base, className, directory, variant = ButtonVariant.default, ...props}: LinkProps & ButtonProps) => {

	return <Link to={to}  className={styles.Button + " " + className} data-directory={directory} data-variant={variant} data-size={size} {...props}>{text}</Link>;
};

export default LinkStyled;
