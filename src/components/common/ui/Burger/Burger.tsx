import { observer } from 'mobx-react-lite'
import React from 'react'
import styles from './Burger.module.scss'
import { useStore } from 'stores/store'

type BurgerProps = {
  className?: string
  action: () => void
}
const Burger = ({ className, action, ...props }: BurgerProps) => {
  const store = useStore()
  return (
    <div className={styles.Burger  + ' ' + className}   data-state={store.appStore.burgerState}>
    <a
      className={styles.Burger_inner}
      onClick={action}

    >
      <span />
      <span />
      <span />
    </a>
    </div>
  )
}

export default observer(Burger)
