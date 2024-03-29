import React, { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import styles from './Footer.module.scss'

type FooterProps = {
  className?: string
  children: ReactNode | ReactNode[]
}
const Footer = ({ children, className }: FooterProps) => {
  const location = useLocation()
  return (
    <footer className={styles.Footer + " " + className} data-layout-account={location.pathname.includes('account')}>
      {children}
    </footer>
  )
}

export default Footer
