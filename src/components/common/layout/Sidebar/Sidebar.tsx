import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './Sidebar.module.scss'
import { SectionType } from '../Section/Section'
import { useStore } from "stores/store";
import { Observer, observer } from "mobx-react-lite";
import { useWindowDimensions } from "utils/utils";
import Logo from "components/common/layout/Logo/Logo";

type SidebarProps = {
    children?: React.ReactNode | React.ReactNode[]
    type?: SectionType

    items?: { icon: React.ReactNode | never; title: string; url: string }[]
}

const BackDrop = () => {
   const store = useStore()
   if(store.appStore.asideState) return <Observer children={() => <div className={styles.backdrop} onClick={() => store.appStore.setAsideClose()}></div>}/>
   return null
}

const Sidebar = ({ children, items, type, ...props }: SidebarProps) => {
  const location = useLocation()
  const store = useStore()
  const {appStore} = store
  const {width} = useWindowDimensions()

  const sidebarMenu: { icon: React.ReactNode; title: string; url: string, urlMap: string }[] = [

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
      title: 'Группы',
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

  const [routes, setRoutes] = React.useState<any[]>([])

  React.useEffect(() => {

    const routeWithPermissions: any[] = [  {
      icon: <img src={'/icons/zayavki.png'} alt={''} />,
      title: 'Заявки',
      url: 'bids',
    }
    ]
    // if(process.env.NODE_ENV === "development") {
    //   routeWithPermissions.push({
    //     icon: <img src={'/icons/zayavki.png'} alt={''} />,
    //     title: 'Дэш',
    //     url: 'dashboard',
    //   })
    // }
    const addRouteWithPermissions = (el: any) => {
      if (store.userStore.currentUserPermissions.has(el.urlMap) && store.userStore.currentUserPermissions.get(el.urlMap)?.read) {
        if(store.userStore.myProfileData.company.company_type === "Компания-Партнер" && el.url === "cars") {


        } else {
          routeWithPermissions.push(el)
        }
      }
    }
    sidebarMenu.forEach((el) => addRouteWithPermissions(el))

    setRoutes( routeWithPermissions)
  }, [store.userStore.currentUserPermissions.size])
  return (
    <>
      <BackDrop/>
    <aside  className={styles.Sidebar} {...props} data-state={appStore.asideState}>
      {(width && width < 960) && <Logo position={'aside'}/>}

      <nav>
        <ul>
          {routes.map((i, index) => {
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
