import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './Sidebar.module.scss'
import { SectionType } from '../Section/Section'

type SidebarProps = {
  children?: React.ReactNode | React.ReactNode[]
  type?: SectionType
  items?: { icon: React.ReactNode | never; title: string; url: string }[]
}
const Sidebar = ({ children, items, type, ...props }: SidebarProps) => {
  const location = useLocation()

  return (
    <aside className={styles.Sidebar} {...props}>
      <nav>
        <ul>
          {items?.map((i, index) => {
            if (i.url === location.pathname) {
            }
            return (
              <li key={`item-${index}`} className={styles.listItem} data-active={location.pathname.includes(i.url)}>
                <span>{i.icon}</span>
                <Link className={styles.navLink} to={i.url}>
                  {i.title}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
      {children}
    </aside>
  )
}

export default Sidebar
