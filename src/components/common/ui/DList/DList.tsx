import React from 'react'
import styles from './DList.module.scss'

type DListProps = { label: string | React.ReactNode; directory?: string, title: string | React.ReactNode| React.ReactNode[]; className?: string }
const DList = ({ label, title, className = '',directory, ...props }: DListProps) => {
  return (
    <dl {...props} className={styles.DList + ' ' + className}>
      <dt>{label}</dt>
      <dd data-directory={directory}>{title}</dd>
    </dl>
  )
}

export default DList
