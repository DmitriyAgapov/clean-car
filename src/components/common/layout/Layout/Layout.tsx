import React, { FC, ReactNode, useEffect } from "react";
import styles from './Layout.module.scss'
import { useStore } from 'stores/store'
import { Observer, observer } from "mobx-react-lite";
import Logo from 'components/common/layout/Logo/Logo'
import Header from 'components/common/layout/Header/Header'
import Footer from 'components/common/layout/Footer/Footer'
import Burger from 'components/common/ui/Burger/Burger'
import '../../../../assets/styles.scss'
import MobileMenu from 'components/common/layout/MobileMenu/MobileMenu'
import Modal from 'components/common/layout/Modal/Modal'
import { useWindowDimensions } from "utils/utils";
import { useNavigation, useSearchParams } from "react-router-dom";
import { LoadingOverlay } from "@mantine/core";
import { SvgCleanCarLoader } from "components/common/ui/Icon";

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
  let [searchParams, setSearchParams] = useSearchParams()
  const navigation = useNavigation();
  const {width} = useWindowDimensions();
  // console.log('st', (navigation.state === "idle" || store.appStore.getAppState) ? false : (navigation.state === "loading" || navigation.state === 'submitting') ? true : true );
  const { appStore, userStore, authStore } = store;
  return (
    <div className={styles.Layout + ' ' + className } data-theme={appStore.appTheme} data-app-type={appStore.appType}>
      <Header>
        {(width  && width > 960) && <Logo className={' logo-header'}/>}
        {headerContent}
        <Burger className={'lg:hidden'} action={!userStore.currentUser ? () => store.appStore.setBurgerState() : () => store.appStore.setAsideState()}/>
      </Header>
      <MobileMenu items={sidebarMenu} />
      {/* {!store.appStore.loaderBlocked && <LoadingOverlay transitionProps={{ transition: 'fade', duration: 1000, exitDuration: 1000 }} classNames={{ */}
      {/*   overlay: 'bg-black/80 backdrop-blur-xl z-9999' */}
      {/* }} visible={store.appStore.getAppState ? store.appStore.getAppState :  (navigation.state === "idle" ? false : (navigation.state === "loading" || navigation.state === 'submitting') ? true : true )} loaderProps={{ children: <SvgCleanCarLoader/> }} />} */}
      {/* <LoadingOverlay transitionProps={{ transition: 'fade', duration: 1000, exitDuration: 500 }} classNames={{ */}
      {/*   overlay: 'bg-black/80 backdrop-blur-xl' */}
      {/* }} visible={store.appStore.AppState } loaderProps={{ children: <SvgCleanCarLoader/> }} /> */}
      <main className={'!contents'}>{children}</main>
      <Footer className={'desktop:block hidden'}>
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
