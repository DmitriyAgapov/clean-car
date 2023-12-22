import React from 'react'
import styles from './Logo.module.scss'
import { observer } from 'mobx-react-lite'
import { useStore } from 'stores/store'
import { Link } from 'react-router-dom'

export interface LogoProps {
  className?: string
  position?: string
}

const Logo = ({className = "", position = ""}:LogoProps) => {
  const store = useStore()
  const logoName = store.appStore.appName
  const routeName = store.appStore.appRouteName

  return (
    <div className={styles.Logo + " " + className} data-app-type={store.appStore.appType} data-position={position}>
      <Link to={'/'} className={styles.logoName}>
        {logoName}
      </Link>
      <span className={styles.routeName}>{routeName}</span>
    </div>
  )
}

export default observer(Logo)
