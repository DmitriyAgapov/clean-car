import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './Sidebar.module.scss'
import { SectionType } from '../Section/Section'
import { useStore } from "stores/store";
import Burger from 'components/common/ui/Burger/Burger'
import { observer } from 'mobx-react-lite';
import { useOutsideClick, useWindowDimensions } from "utils/utils";
import Logo, { LogoProps } from "components/common/layout/Logo/Logo";

type SidebarProps = {
    children?: React.ReactNode | React.ReactNode[]
    type?: SectionType

    items?: { icon: React.ReactNode | never; title: string; url: string }[]
}

function BackDrop({action}:any) {
    return <div className={styles.backdrop} onClick={action}></div>
}

const Sidebar = ({ children, items, type, ...props }: SidebarProps) => {
  const location = useLocation()
  const store = useStore()
  const {appStore} = store
  const {width} = useWindowDimensions()

  return (
    <>
      {store.appStore.asideState && <BackDrop action={() => store.appStore.setAsideClose()}/>}
    <aside  className={styles.Sidebar} {...props} data-state={appStore.asideState}>
      {(width && width < 960) && <Logo position={'aside'}/>}

      <nav>
        <ul>
          {items?.map((i, index) => {
            if (i.url === location.pathname) {
            }
            return (
              <li key={`item-${index}`} className={styles.listItem} data-active={location.pathname.includes(i.url)}>
                <span>{i.icon}</span>
                <Link className={styles.navLink} onClick={() => store.appStore.setAsideClose()} to={i.url}>
                  {i.title}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
      {children}
    </aside>

  </>
  )
}

export default observer(Sidebar)
