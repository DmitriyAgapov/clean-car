import React, { FC, ReactNode } from 'react'
import styles from './Header.module.scss'

interface HeaderProp {
  children?: ReactNode | ReactNode[]
}

const Header: FC<HeaderProp> = ({ children }) => {
  return <header className={styles.Header}>{children}</header>
}

export default Header
