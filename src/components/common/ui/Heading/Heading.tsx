import React, { ReactNode } from 'react'
import styles from './Heading.module.scss'
import { useStore } from "stores/store";
import { useLocation } from 'react-router-dom';

export enum HeadingVariant {
  h1 = 'h1',
  h2 = 'h2',
  h3 = 'h3',
  h4 = 'h4',
  h5 = 'h5',
  h6 = 'h6',
}

export enum HeadingDirectory {
  admin = 'admin',
  customer = 'customer',
  performer = 'performer',
}

export enum HeadingColor {
  default = 'default',
  accent = 'accent',
  active = 'active',
  notActive = 'notActive',
  gradient = 'gradient',
}

type HeadingProps = {
  text: string | ReactNode | ReactNode []
  variant: HeadingVariant
  color?: string
  directory?: HeadingDirectory | null
  className?: string
}

const Heading = ({
  text,
  variant = HeadingVariant.h2,
  className,
  directory = null,
  color = HeadingColor.default,
}: HeadingProps) => {
  const store = useStore()
  switch (variant) {

    case 'h1':

      return (
        <h1 className={styles.Heading + ' ' + className} data-directory={directory} color={color}>
          {text}
        </h1>
      )
    case 'h2':
      return (
        <h2 className={styles.Heading + ' ' + className} data-directory={directory} color={color}>
          {text}
        </h2>
      )
    case 'h3':
      return (
        <h3 className={styles.Heading + ' ' + className} data-directory={directory} color={color}>
          {text}
        </h3>
      )
    case 'h4':
      return (
        <h4 className={styles.Heading + ' ' + className} data-directory={directory} color={color}>
          {text}
        </h4>
      )
    case 'h5':
      return (
        <h5 className={styles.Heading + ' ' + className} color={color}>
          {text}
        </h5>
      )
    case 'h6':
      return <h6  className={styles.Heading + ' ' + className} data-directory={directory} color={color}>{text}</h6>
    default:
      return <div>{text}</div>
  }
}

export default Heading
