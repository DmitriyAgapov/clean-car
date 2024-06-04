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
import { useNavigatorOnLine, useWindowDimensions } from 'utils/utils'
import { LoadingOverlay } from '@mantine/core'
import { SvgCleanCarLoader, SvgDisconnect } from 'components/common/ui/Icon'
import Button, { ButtonVariant } from 'components/common/ui/Button/Button'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import { Navigate, useLocation } from 'react-router-dom'
import LinkStyled from 'components/common/ui/LinkStyled/LinkStyled'
import Errors from "components/common/layout/Errors/Errors";

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
  const isOnline = useNavigatorOnLine()
  const loc = useLocation()
  const {width} = useWindowDimensions();
  // console.log('st', (navigation.state === "idle" || store.appStore.getAppState) ? false : (navigation.state === "loading" || navigation.state === 'submitting') ? true : true );
  const { appStore, userStore, authStore } = store;
  if (!store.appStore.getNetWorkStatus)
      return (
        <Errors className={className}/>
          // <LoadingOverlay
          //     transitionProps={{ transition: 'fade', duration: 1000, exitDuration: 500 }}
          //     classNames={{
          //         overlay: 'bg-black/80 backdrop-blur-xl',
          //     }}
          //     visible={!store.appStore.getNetWorkStatus}
          //     loaderProps={{
          //         children: (
          //
          //
          //             <div className={'flex flex-col  items-center'}>
          //               <SvgDisconnect className={'mb-6'}/>
          //                 <Heading text={'Нет соединения'} variant={HeadingVariant.h1} color={HeadingColor.accent}/>
          //               {isOnline && <Button variant={ButtonVariant["accent-outline"]} action={() => location.reload()} text={'Обновить'}/>}
          //             </div>
          //         ),
          //     }}
          // />
      )
  const exceptions = [
    'policy', '404', 'restore', 'register'
  ]
  const isInException = (url:string) =>   exceptions.some((value:string) => url.includes(value))

  if(!store.appStore.token && loc.pathname !== "/" && !isInException(loc.pathname)) {
    return (<Navigate to={'/'}/>)
  }

  return (
      <div className={styles.Layout + ' ' + className} data-theme={appStore.appTheme} data-app-type={appStore.appType}>
          <Header>
              {width && width > 1024 && <Logo className={' logo-header tablet:pl-6'} />}
              {headerContent}
              <Burger
                  className={'desktop:hidden'}
                  action={
                      !userStore.currentUser
                          ? () => store.appStore.setBurgerState()
                          : () => store.appStore.setAsideState()
                  }
              />
          </Header>
          <MobileMenu items={sidebarMenu} />
          {/* {!store.appStore.loaderBlocked && <LoadingOverlay transitionProps={{ transition: 'fade', duration: 1000, exitDuration: 1000 }} classNames={{ */}
          {/*   overlay: 'bg-black/80 backdrop-blur-xl z-9999' */}
          {/* }} visible={store.appStore.getAppState ? store.appStore.getAppState :  (navigation.state === "idle" ? false : (navigation.state === "loading" || navigation.state === 'submitting') ? true : true )} loaderProps={{ children: <SvgCleanCarLoader/> }} />} */}
          <LoadingOverlay
              transitionProps={{ transition: 'fade', duration: 1000, exitDuration: 500 }}
              classNames={{
                  overlay: 'bg-black/80 backdrop-blur-xl',
              }}
              visible={store.appStore.AppState}
              loaderProps={{ children: <SvgCleanCarLoader /> }}
          />
          <main className={'!contents'}>{children}</main>
          <Footer className={'desktop:flex hidden  tablet:px-6'}>
              {footerContent}
              <div>2023 (c.)</div>
              <LinkStyled text={'Политика конфиденциальности'} variant={ButtonVariant.text} to={'/policy'}></LinkStyled>
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
