import React, { EventHandler, ReactNode } from 'react'
import styles from './Button.module.scss'
import { useWindowDimensions } from "utils/utils";
import { Button as Btn } from '@mantine/core';
export enum ButtonVariant {
  tech = 'tech',
  default = 'default',
  accent = 'accent',
  'accent-outline' = 'accent-outline',
  outline = 'outline',
  text = 'text',
  icon = 'icon',
  cancel = 'cancel',
}

export enum ButtonDirectory {
  admin = 'admin',
  customer = 'customer',
  performer = 'performer',
  directory = 'directory',
}

export enum ButtonSizeType {
  sm = 'sm',
  xs = 'xs',
  base = 'base',
  lg = 'accent',
}

export type ButtonProps = {
  text: string | ReactNode
  variant?: ButtonVariant
  size?: ButtonSizeType
  action?: EventHandler<any>
  className?: string
  trimText?: boolean
  disabled?: boolean
  href?: string
  type?: string
  directory?: ButtonDirectory
}

const Button = ({
  text,
  href,
  size = ButtonSizeType.base,
  className,
  directory,
  disabled = false,
  type,
  trimText,
  variant = ButtonVariant.default,
  action,
  ...props
}: ButtonProps) => {
  const {width} = useWindowDimensions()

  if(type === 'submit') return  <button type={'submit'} onClick={action} className={styles.Button + ' ' + className}
    data-directory={directory}
    disabled={disabled}
    data-variant={variant}
    data-size={size}> {text}</button>
  if(type === 'button') return  <Btn type={'button'} onClick={event => action && action(event)} className={styles.Button + ' ' + className}
    data-disabled={disabled}
    data-directory={directory}

    data-variant={variant}
    data-size={size} {...props}>{text}</Btn>

  // @ts-ignore
  return (
    <a
      href={href}
      className={styles.Button + ' ' + className}
      data-directory={directory}
      data-variant={variant}
      data-size={size}
      onClick={action}
      {...props}
    >
      {(width && width < 1025 && trimText && typeof text === "string") ? text.split(' ')[0] : text}
    </a>
  )
}

export default Button
