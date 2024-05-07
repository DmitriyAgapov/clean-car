import { useElementSize } from '@mantine/hooks'
import React, { ReactNode } from 'react'
import styles from './Section.module.scss'

export enum SectionType {
  centered = 'centered',
  default = 'default',
  withSuffix = 'withSuffix'
}

export enum SectionPosition {
  centered = 'centered',
  default = 'default',
}

type SectionProps = {
  children: ReactNode | ReactNode[]
  type?: SectionType
  noScroll?: boolean
}

const Section = ({ children, type = SectionType.default,  noScroll = false}: SectionProps) => {
  const { ref, width:wElSize, height:hElSize } = useElementSize();
  return (
    <section data-variant={type} className={styles.Section} data-noScroll={noScroll} ref={ref}>
      {children}
    </section>
  )
}

export default Section
