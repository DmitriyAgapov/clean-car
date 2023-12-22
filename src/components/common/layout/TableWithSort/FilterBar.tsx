import styles from "components/common/layout/TableWithSort/TableWithSort.module.scss";
import SelectPure from "components/common/ui/Select/SelectPure";
import Button, { ButtonSizeType, ButtonVariant } from 'components/common/ui/Button/Button'
import React from 'react'

interface FilterBarProps {
  state: boolean
  filters: {
    filterData: {
      label: string
      options: any[]
    }[]
  }
}

export default function FilterBar({ filters, state = false }: FilterBarProps) {
  return (
    <div className={styles.filterBar} data-state={state}>
      {filters.filterData.map((f:any) => {

        return <SelectPure label={f.label} value={f.options[0]} name={f.label} options={f.options} />
      })}
      <Button
        text={'Применить'}
        variant={ButtonVariant.accent}
        size={ButtonSizeType.sm}
        className={'!rounded-xl'}
      />
      <Button
        text={'Сбросить'}
        variant={ButtonVariant['accent-outline']}
        size={ButtonSizeType.sm}
        className={'!rounded-xl'}
      />
    </div>
  )
}
