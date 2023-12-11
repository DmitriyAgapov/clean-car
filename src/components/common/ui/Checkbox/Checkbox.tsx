import React, { useId } from 'react'
import styles from './Checkbox.module.scss'

type CheckboxProps = {
  label?: string
  checked?: boolean | null
  disabled: boolean
  available?: boolean
  name: string
  action?: React.EventHandler<any>
}
const Checkbox = ({ label, name, checked, disabled, available = true, action }: CheckboxProps) => {
  const id = useId()
  return (
    <label className={styles.Checkbox} data-availible={checked == null ? false : available}>
      <input
        onChange={action}
        name={name}
        id={id}
        type={'checkbox'}
        disabled={checked !== null ? disabled : true}
        checked={checked !== null ? checked : false}
      />
      {label}
    </label>
  )
}

export default Checkbox
