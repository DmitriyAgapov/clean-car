import React, { useEffect } from 'react'
import Layout from 'components/common/layout/Layout/Layout'
import styles from './account.module.scss'
import Sidebar from 'components/common/layout/Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'
import { SvgAccount } from 'components/common/ui/Icon'
import { useStore } from 'stores/store'
import DateComponent from 'components/common/layout/DateComponent/DateComponent'
import UserMenu from 'components/common/layout/UserMenu/UserMenu'
import LinkStyled from 'components/common/ui/LinkStyled/LinkStyled'
import { ButtonVariant } from 'components/common/ui/Button/Button'
import { observer } from 'mobx-react-lite'

const sidebarMenu: { icon: React.ReactNode; title: string; url: string, urlMap: string }[] = [

    {
        icon: <img src={'/icons/company.png'} alt={''} />,
        title: 'Компании',
        url: 'companies',
        urlMap: 'companies',
    },
    {
        icon: <img src={'/icons/filials.png'} alt={''} />,
        title: 'Филиалы',
        url: 'filial',
        urlMap: 'filial',
    },
    {
        icon: <img src={'/icons/users.png'} alt={''} />,
        title: 'Пользователи',
        url: 'users',
        urlMap: 'users',
    },
    {
        icon: <img src={'/icons/groups.png'} alt={''} />,
        title: 'Группы',
        url: 'groups',
        urlMap: 'users',
    },
    {
        icon: <img src={'/icons/auto.png'} alt={''} />,
        title: 'Автомобили',
        url: 'cars',
        urlMap: 'cars',
    },
    {
        icon: <img src={'/icons/zayavki.png'} alt={''} />,
        title: 'Заявки',
        url: 'bids',
        urlMap: 'bids',
    },
    {
        icon: <img src={'/icons/price-list.png'} alt={''} />,
        title: 'Прайс-лист',
        url: 'price',
        urlMap: 'price',
    },
    {
        icon: <img src={'/icons/limits.png'} alt={''} />,
        title: 'Лимиты',
        url: 'limits',
        urlMap: 'limits',
    },
    {
        icon: <img src={'/icons/budget.png'} alt={''} />,
        title: 'Бюджет',
        url: 'finance',
        urlMap: 'finance',
    },
    {
        icon: <img src={'/icons/zp.png'} alt={''} />,
        title: 'Зарплата',
        url: 'calculate',
        urlMap: 'calculate',
    },
    {
        icon: <img src={'/icons/spravochnik.png'} alt={''} />,
        title: 'Справочник',
        url: 'references',
        urlMap: 'references',
    },
]

const AccountPage = () => {
    const store = useStore()

    const routesWithPermissions = React.useCallback(() => {
        const routeWithPermissions: any[] = [  {
            icon: <img src={'/icons/home.png'} alt={''} />,
            title: 'Дашборд',
            url: 'dashboard',
        }]

        const addRouteWithPermissions = (el: any) => {
            const store = useStore()
            if (store.userStore.currentUserPermissions.has(el.urlMap) && store.userStore.currentUserPermissions.get(el.urlMap)?.read) {
               routeWithPermissions.push(el)
            }
        }
        sidebarMenu.forEach((el) => addRouteWithPermissions(el))
        return routeWithPermissions
    }, [store.appStore.appType])
    return (
        <Layout
            className={'page-account'}
            headerContent={
                <>
                    <DateComponent />
                    <UserMenu />
                </>
            }
            footerContent={
                <>
                    <LinkStyled to={'#'} text={'Служба поддержки'} variant={ButtonVariant.text} className={'mb-7'} />
                    <hr className={'border-accent my-7'} />
                </>
            }
        >
            <Sidebar items={routesWithPermissions()} />
            <Outlet />
            <SvgAccount className={styles.svg} />
        </Layout>
    )
}

export default observer(AccountPage)
