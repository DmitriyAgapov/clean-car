import React, { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import styles from './Footer.module.scss'

type FooterProps = {
  children: ReactNode | ReactNode[]
}
const Footer = ({ children }: FooterProps) => {
  const location = useLocation()
  return (
    <footer className={styles.Footer} data-layout-account={location.pathname.includes('account')}>
      {children}
    </footer>
  )
}

export default Footer
