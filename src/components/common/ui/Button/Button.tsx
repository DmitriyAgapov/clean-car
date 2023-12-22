import React, { EventHandler, ReactNode } from 'react'
import styles from './Button.module.scss'
import { useWindowDimensions } from "utils/utils";

export enum ButtonVariant {
  tech = 'tech',
  default = 'default',
  accent = 'accent',
  'accent-outline' = 'accent-outline',
  outline = 'outline',
  text = 'text',
  icon = 'icon',
}

export enum ButtonDirectory {
  admin = 'admin',
  customer = 'customer',
  executor = 'executor',
  directory = 'directory',
}

export enum ButtonSizeType {
  sm = 'sm',
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
  type,
  trimText,
  variant = ButtonVariant.default,
  action,
  ...props
}: ButtonProps) => {
  const {width} = useWindowDimensions()

  if(type === 'submit') return  <button type={'submit'} className={styles.Button + ' ' + className}
    data-directory={directory}
    data-variant={variant}
    data-size={size}> {text}</button>
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
      {(width && width < 960 && trimText && typeof text === "string") ? text.split(' ')[0] : text}
    </a>
  )
}

export default Button
