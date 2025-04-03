import React, { useEffect } from 'react'
import Layout from 'components/common/layout/Layout/Layout'
import styles from './account.module.scss'
import Sidebar from 'components/common/layout/Sidebar/Sidebar'
import { Outlet, useNavigation } from "react-router-dom";
import UserMenu from 'components/common/layout/UserMenu/UserMenu'
import LinkStyled from 'components/common/ui/LinkStyled/LinkStyled'
import { ButtonVariant } from 'components/common/ui/Button/Button'

const AccountPage = () => {

    return (
        <Layout
            className={'page-account'}
            headerContent={
              <UserMenu />
            }
            footerContent={
                <>
                    <LinkStyled to={'/account/support'} text={'Служба поддержки'} variant={ButtonVariant.text} className={'mb-7'} />
                    <hr className={'border-accent my-7'} />
                </>
            }
        >
            <Sidebar />

            <Outlet />

        </Layout>
    )
}

export default AccountPage
