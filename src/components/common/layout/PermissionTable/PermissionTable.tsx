import React from 'react'
import styles from './PermissionTable.module.scss'
import Checkbox from 'components/common/ui/Checkbox/Checkbox'

type PermissionTableRowProps = {
  create: boolean | null
  delete: boolean | null
  id: number
  name: string
  read: boolean | null
  update: boolean | null
}
type PermissionTableProps = {
  data: PermissionTableRowProps[]
  editable?: boolean
  action?: (event: Event, id: string) => void
}
const PermissionTable = ({ data, editable = false, action }: PermissionTableProps) => {
  const handleChange = React.useCallback((event: Event, id: string) => {
    if (action) {
      action(event, id)
    }
  }, [])

  return (
    <div className={styles.PermissionTable}>
      <div className={styles.PermissionTableHeader}>
        <div className={'flex'}>Раздел</div>
        <div className={'flex justify-center'}>Просмотр</div>
        <div className={'flex justify-center'}>Изменение</div>
        <div className={'flex justify-center'}>Добавление</div>
        <div className={'flex justify-center'}>Удаление</div>
      </div>
      {data.map((row: PermissionTableRowProps) => row && (
        <div key={row.name} className={styles.PermissionTableRow}>
          <div>{row.name}</div>
          <div className={'flex justify-center items-center'}>
            <Checkbox
              action={(event: Event) => handleChange(event, row.name)}
              name={'read'}
              disabled={!editable}
              available={editable}
              checked={row.read}
            />
          </div>
          <div className={'flex justify-center items-center'}>
            <Checkbox
              action={(event: Event) => handleChange(event, row.name)}
              name={'update'}
              disabled={!editable}
              available={editable}
              checked={row.update}
            />
          </div>
          <div className={'flex justify-center items-center'}>
            <Checkbox
              action={(event: Event) => handleChange(event, row.name)}
              name={'create'}
              disabled={!editable}
              available={editable}
              checked={row.create}
            />
          </div>
          <div className={'flex justify-center items-center'}>
            <Checkbox
              action={(event: Event) => handleChange(event, row.name)}
              name={'delete'}
              disabled={!editable}
              available={editable}
              checked={row.delete}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default PermissionTable
