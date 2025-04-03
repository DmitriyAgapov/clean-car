import React, { useId } from 'react'
import styles from './Checkbox.module.scss'
import { Checkbox as Chck } from '@mantine/core'
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
    <Chck classNames={{
      root: styles.Checkbox
    }} data-availible={checked == null ? false : available} onChange={action}
      name={name}
      label={label}
      id={id}
      type={'checkbox'}
      disabled={checked !== null ? disabled : true}
      checked={checked !== null ? checked : false}/>

  )
}

export default Checkbox
