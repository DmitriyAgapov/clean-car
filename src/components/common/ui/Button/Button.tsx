import React, { EventHandler, ReactNode } from 'react'
import styles from './Button.module.scss'
import {  useViewportSize } from '@mantine/hooks'
import { Button as Btn } from '@mantine/core';
import { once, useWindowDimensions } from "utils/utils";
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
  isOnce?: boolean
  type?: string
  loading?: boolean
  directory?: ButtonDirectory
}

const Button = React.forwardRef(({
  text,
  href,
  size = ButtonSizeType.base,
  className,
  directory,
  disabled = false,
  type,
  loading = undefined,
  trimText,
  isOnce = false,
  variant = ButtonVariant.default,
  action,
  ...props
}: ButtonProps, ref: React.ForwardedRef<any>) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const {width} = useWindowDimensions()
  const handleAction = (event: any) => {
    console.log('is once', isOnce);
    if(isOnce)  {
      setIsSubmitting(true)
    }
    return action?.call(this, event)
  };
  React.useEffect(() => {
    if(isOnce && !loading) {
      setIsSubmitting(false)
    }
  }, [loading]);

  if(type === 'submit') return  <Btn type={'submit'} onClick={handleAction} className={styles.Button + ' ' + className}
    data-directory={directory}
    disabled={disabled}
    data-variant={variant}
    loading={isSubmitting}
    data-size={size}  {...props}> {text}</Btn>
  if(type === 'button') return  <Btn ref={ref} type={'button'} onClick={handleAction} className={styles.Button + ' ' + className}
    data-disabled={disabled}
    data-directory={directory}
    loading={isSubmitting}
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
})

export default Button
