import React, { EventHandler, ReactNode } from 'react'
import styles from './Button.module.scss'

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
  variant = ButtonVariant.default,
  action,
  ...props
}: ButtonProps) => {
  if(type === 'submit') return  <button type={'submit'} className={styles.Button + ' ' + className}
    data-directory={directory}
    data-variant={variant}
    data-size={size}> {text}</button>
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
      {text}
    </a>
  )
}

export default Button
