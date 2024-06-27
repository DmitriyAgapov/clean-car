import React from 'react'
import styles from './Chips.module.scss'

export enum ChipsVariant {
  active = 'active',
  deactive = 'deactive',
}

type ChipsProps = {
  state: boolean
}
const Chips = ({ state }: ChipsProps) => {
  return (
    <span className={styles.Chips} data-state={state}>
      {state ? 'Активен' : 'Неактивен'}
    </span>
  )
}

export default Chips
