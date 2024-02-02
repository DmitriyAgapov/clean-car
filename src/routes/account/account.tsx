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
import { Loader } from "@mantine/core";

const AccountPage = () => {
    const store = useStore()
  console.log(store);
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
            <Sidebar/>
            <Outlet />
            <SvgAccount className={styles.svg} />
        </Layout>
    )

}

export default observer(AccountPage)
