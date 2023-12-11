import React from 'react'
import styles from './DList.module.scss'

type DListProps = { label: string | React.ReactNode; title: string | React.ReactNode; className?: string }
const DList = ({ label, title, className = '', ...props }: DListProps) => {
  return (
    <dl {...props} className={styles.DList + ' ' + className}>
      <dt>{label}</dt>
      <dd>{title}</dd>
    </dl>
  )
}

export default DList
