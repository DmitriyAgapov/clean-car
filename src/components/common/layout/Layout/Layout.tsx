import React, { FC, ReactNode } from 'react'
import styles from './Layout.module.scss'
import { useStore } from 'stores/store'
import { observer } from 'mobx-react-lite'
import Logo from 'components/common/layout/Logo/Logo'
import Header from 'components/common/layout/Header/Header'
import Footer from 'components/common/layout/Footer/Footer'
import Burger from 'components/common/ui/Burger/Burger'
import '../../../../assets/styles.scss'
import MobileMenu from 'components/common/layout/MobileMenu/MobileMenu'
import Modal from 'components/common/layout/Modal/Modal'
import { entries, toJS, values } from 'mobx'
import { useWindowDimensions } from "utils/utils";

const sidebarMenu: { title: string; url: string }[] = [
  {
    title: 'Дашборд',
    url: '/dashboard',
  },
  {
    title: 'Сайт cleancar.ru',
    url: 'https://cleancar.ru',
  },
  {
    title: 'Помощь',
    url: '/help',
  },
  {
    title: 'Вход в личный кабинет',
    url: '/auth',
  },
  {
    title: 'Регистрация',
    url: '/',
  },
]

interface ChildrenProps {
  children: ReactNode | ReactNode[]
  className?: string
  headerContent?: ReactNode | ReactNode[]
  footerContent?: ReactNode | ReactNode[]
}

const Layout: FC<ChildrenProps> = ({ children, headerContent, className = '', footerContent }) => {
  const store = useStore()
  const {width} = useWindowDimensions()

  const { appStore, userStore, authStore } = store;
  return (
    <div className={styles.Layout + ' ' + className} data-theme={appStore.appTheme} data-app-type={appStore.appType}>
      <Header>
        {(width  && width > 960) && <Logo className={' logo-header'}/>}
        {headerContent}
        <Burger className={'tablet:hidden'} action={!userStore.currentUser ? () => store.appStore.setBurgerState() : () => store.appStore.setAsideState()}/>
      </Header>
      <MobileMenu items={sidebarMenu} />
      <main className={'!contents'}>{children}</main>
      <Footer>
        {footerContent}
        <div>2023 (c.)</div>
        <div>Политика конфиденциальности</div>
      </Footer>

      <div className={'lineBg'}>
        <div />
        <div />
        <div />
        <div />
        <div />
        <div className={'leftMask'} />
        <div className={'rightMask'} />
      </div>
      <Modal />
    </div>
  )
}

export default observer(Layout)
