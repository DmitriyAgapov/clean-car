import React, { ReactNode } from 'react'
import styles from './Section.module.scss'

export enum SectionType {
  centered = 'centered',
  default = 'default',
}

export enum SectionPosition {
  centered = 'centered',
  default = 'default',
}

type SectionProps = {
  children: ReactNode | ReactNode[]
  type?: SectionType
}

const Section = ({ children, type = SectionType.default }: SectionProps) => {

  return (
    <section data-variant={type} className={styles.Section}>
      {children}
    </section>
  )
}

export default Section
