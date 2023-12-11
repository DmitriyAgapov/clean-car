import { observer } from 'mobx-react-lite'
import React from 'react'
import styles from './Burger.module.scss'
import { useStore } from 'stores/store'

type BurgerProps = {
  className?: string
}
const Burger = ({ className, ...props }: BurgerProps) => {
  const store = useStore()
  return (
    <a
      className={styles.Burger + ' ' + className}
      onClick={() => store.appStore.setBurgerState()}
      data-state={store.appStore.burgerState}
    >
      <span />
      <span />
      <span />
    </a>
  )
}

export default observer(Burger)
