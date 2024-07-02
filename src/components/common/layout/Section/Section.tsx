import { useElementSize } from '@mantine/hooks'
import React, { ReactNode } from 'react'
import styles from './Section.module.scss'

export enum SectionType {
    centered = 'centered',
    default = 'default',
    withSuffix = 'withSuffix',
}

type SectionProps = {
    children: ReactNode | ReactNode[]
    type?: SectionType
    noScroll?: boolean
    className?: string
  style?: any
}

const Section = ({ children, type = SectionType.default, noScroll = false,  className, ...props }: SectionProps) => {
    // const { ref, width:wElSize, height:hElSize } = useElementSize();
    return (
        <section data-variant={type} className={styles.Section + " " + className} data-noscroll={noScroll} {...props}>
            {children}
        </section>
    )
}

export default Section
