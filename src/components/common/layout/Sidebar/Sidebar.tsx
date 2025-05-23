import React, { useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom'
import styles from './Sidebar.module.scss'
import { SectionType } from '../Section/Section'
import { useStore } from "stores/store";
import { Observer, observer } from "mobx-react-lite";
import {  useViewportSize } from '@mantine/hooks'
import Footer from "components/common/layout/Footer/Footer";
import LinkStyled from "components/common/ui/LinkStyled/LinkStyled";
import { ButtonVariant } from "components/common/ui/Button/Button";

const BackDrop = () => {
  const store = useStore()
  if (store.appStore.asideState)
    return (
      <Observer
        children={() => <div className={styles.backdrop} onClick={() => store.appStore.setAsideClose()}></div>}
      />
    )
  return null
}

export const sidebarMenu: { icon: React.ReactNode; title: string; url: string, urlMap: string, sublevel?: {
    url: string
    title: string
  }[] }[] = [

  {
    icon: <img src={'/icons/company.png'} alt={''} />,
    title: 'Компании',
    url: 'companies',
    urlMap: 'Компании',
  },
  {
    icon: <img src={'/icons/filials.png'} alt={''} />,
    title: 'Филиалы',
    url: 'filials',
    urlMap: 'Управление филиалами',
  },
  {
    icon: <img src={'/icons/users.png'} alt={''} />,
    title: 'Пользователи',
    url: 'users',
    urlMap: 'Управление пользователями',
  },
  {
    icon: <img src={'/icons/groups.png'} alt={''} />,
    title: 'Права доступа',
    url: 'groups',
    urlMap: 'Управление пользователями',
  },
  {
    icon: <img src={'/icons/auto.png'} alt={''} />,
    title: 'Автомобили',
    url: 'cars',
    urlMap: 'Управление автомобилями',
  },
  // {
  //   icon: <img src={'/icons/zayavki.png'} alt={''} />,
  //   title: 'Заявки',
  //   url: 'bids',
  //   urlMap: 'Управление заявками',
  // },
  {
    icon: <img src={'/icons/price-list.png'} alt={''} />,
    title: 'Прайс-лист',
    url: 'price',
    urlMap: 'Управление прайс-листом',
  },
  {
    icon: <img src={'/icons/rouble.png'} alt={''} />,
    title: 'Финансы',
    url: 'finance/report',
    urlMap: 'Финансовый блок',
    sublevel: [
      {
        title: 'Отчет по заявкам',
        url: 'finance/report'
      },
      {
        title: 'Отчет по типу услуг',
        url: 'finance/by-type'
      },

      {
        title: 'Транзакции',
        url: 'finance/transaction',
      }
    ]
  },
  {
    icon: <img src={'/icons/limits.png'} alt={''} />,
    title: 'Лимиты',
    url: 'limits',
    urlMap: 'Управление лимитами',
  },

  // {
  //   icon: <img src={'/icons/budget.png'} alt={''} />,
  //   title: 'Бюджет',
  //   url: 'finance',
  //   urlMap: 'Финансовый блок',
  // },
  // {
  //   icon: <img src={'/icons/zp.png'} alt={''} />,
  //   title: 'Зарплата',
  //   url: 'calculate',
  //   urlMap: 'Финансовый блок',
  // },
  {
    icon: <img src={'/icons/spravochnik.png'} alt={''} />,
    title: 'Справочник',
    url: 'references',
    urlMap: 'Управление справочниками',
  },
]

type SidebarProps = {
    children?: React.ReactNode | React.ReactNode[]
    type?: SectionType

    items?: { icon: React.ReactNode | never; title: string; url: string }[]
}

function ListItem(props: { i: any }) {
    const location = useLocation()
    const store = useStore()
    const [state, setState ] = React.useState()
    useEffect(() => {
      let state = location.pathname.includes(props.i.url) || (props.i.sublevel && props.i.sublevel.length > 0) && props.i.sublevel.some((el:any) => location.pathname.includes(el.url) )
      // console.log(state);
      setState(state)
      state && store.appStore.setSublevelOpen()
    }, [location.pathname])
    return (
        <li
            data-sublevel={props.i.sublevel && 'true'}
            className={styles.listItem}
            data-active={location.pathname.includes(props.i.url) || (props.i.sublevel && props.i.sublevel.length > 0) && props.i.sublevel.some((el:any) => location.pathname.includes(el.url) )}
        >
            <span>{props.i.icon}</span>
            <Link className={styles.navLink} onClick={() => {
              if(!props.i.sublevel) {
                store.appStore.setAsideClose()
              }
              store.appStore.setSublevelClose()
              if(props.i.sublevel) {
                store.appStore.setSublevelOpen()
              }
              }
            } to={props.i.url}>
                {props.i.title}
            </Link>
            {props.i.sublevel && <ul data-state-open={state} className={styles.sublevel}>{props.i.sublevel.map((sub: any) => {
              if(sub.url === "finance/by-type" && store.appStore.appType !== "admin") return
              return (<li data-active={location.pathname.includes(sub.url)} key={sub.url} className={styles.sublevelItem}>
                <Link onClick={() => store.appStore.setAsideClose()} to={sub.url}>{sub.title}</Link>
              </li>)})}
            </ul>}
        </li>
    )
}

const Sidebar = ({ children, items, type, ...props }: SidebarProps) => {
  const location = useLocation()
  const store = useStore()
  const {appStore} = store
  const {width} = useViewportSize()
  const [routes, setRoutes] = React.useState<any[]>([])

  React.useEffect(() => {
    const routeWithPermissions: any[] = [{
      icon: <img src={'/icons/zayavki.png'} alt={''} />,
      title: 'Заявки',
      url: 'bids',
    }
    ]
    const addRouteWithPermissions = (el: any) => {
      if (store.userStore.currentUserPermissions.has(el.urlMap) && store.userStore.currentUserPermissions.get(el.urlMap)?.read) {
        if(store.userStore.myProfileData.company.company_type === "Партнер" && el.url === "cars") {} else {
          routeWithPermissions.push(el)
        }
      }
    }
    sidebarMenu.forEach((el) => addRouteWithPermissions(el))
    setRoutes(routeWithPermissions)
  }, [store.userStore.myProfileData.permissions])

  return (
      <>
          <BackDrop />
          <aside className={styles.Sidebar} {...props} data-state={appStore.asideState}>
              {/* {(width && width < 960) ? <Logo position={'aside'} /> : null} */}

              <nav>
                  <ul>
                      {routes.map((i, index) => {if (i.url === location.pathname) {}return <ListItem key={`item-${index}`} i={i} />})}
                  </ul>
              </nav>
              {children}
            {width && (width > 1299 || width < 960) ? <Footer className={'block  overflow-hidden pt-4 pb-4 mt-auto pl-5 pr-0.5'}>
                  <div>
                    <LinkStyled className={'!text-sm font-medium'} to={'/account/support'}  variant={ButtonVariant.text}  text={'Служба поддержки'} onClick={() => store.appStore.setAsideClose()}/>
                  </div>

                  <hr className={'mt-3 mb-2 -mr-8 border-accent'} />

              <LinkStyled  className={'!text-xs '} to={'/policy'} text={'Политика конфиденциальности'} variant={ButtonVariant.text}   onClick={() => store.appStore.setAsideClose()}/>
              </Footer> : null}
          </aside>
      </>
  )
}

export default observer(Sidebar)
