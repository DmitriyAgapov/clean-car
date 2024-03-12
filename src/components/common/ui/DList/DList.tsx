import React from 'react'
import styles from './DList.module.scss'

type DListProps = { label: string | React.ReactNode; directory?: string, title: string | React.ReactNode| React.ReactNode[]; className?: string; classNameDt?: string }
const DList = ({ label, title, className = '',classNameDt = '',directory, ...props }: DListProps) => {
  return (
    <dl {...props} className={styles.DList + ' ' + className}>
      <dt className={classNameDt}>{label}</dt>
      <dd data-directory={directory}>{title}</dd>
    </dl>
  )
}

export default DList
