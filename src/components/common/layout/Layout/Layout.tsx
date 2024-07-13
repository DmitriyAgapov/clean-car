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
import { useNavigatorOnLine } from 'utils/utils'
import { LoadingOverlay } from '@mantine/core'
import { SvgCleanCarLoader, SvgDisconnect } from 'components/common/ui/Icon'
import Button, { ButtonVariant } from 'components/common/ui/Button/Button'
import { Link, Navigate, useLocation } from 'react-router-dom'
import LinkStyled from 'components/common/ui/LinkStyled/LinkStyled'
import Errors from 'components/common/layout/Errors/Errors'
import { useViewportSize } from '@mantine/hooks'
import { UserPermissionVariants } from "stores/userStore";

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
  const { width } = useViewportSize();
  // console.log(store.userStore.getUserCan());
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
  const exceptions = ['policy', '404', 'restore', 'register', 'support' ]
  const isInException = (url:string) =>   exceptions.some((value:string) => url.includes(value))
  const _path = loc.pathname.split('/')[2]
  // @ts-ignore
  const _permissionName = _path ? UserPermissionVariants[_path.toString()] : false
  // @ts-ignore
  if(!store.appStore.token && loc.pathname !== "/" && !isInException(loc.pathname)) {
    return (<Navigate to={'/'}/>)
  }
  if(_permissionName && !isInException(loc.pathname)) {
    if(!store.userStore.getUserCan(_permissionName, "read")) return <Navigate to={'/account/profile'}/>
  }
  return (
      <div className={styles.Layout + ' ' + className} data-theme={appStore.appTheme} data-app-type={appStore.appType}>
          <Header>
              {(width && width > 960 && store.appStore.appType != "") || store.appStore.appType === ""  ? <Logo className={'logo-header tablet:pl-6'} /> : null}
              {headerContent}
              <Burger
                  className={'lg:hidden'}
                  action={() =>
                      !userStore.currentUser
                          ?  store.appStore.setBurgerState()
                          : store.appStore.setAsideState()
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
              visible={false}
              loaderProps={{ children: <SvgCleanCarLoader /> }}
          />
          <main>{children}</main>
       <Footer className={'flex desktop:!hidden tablet-max:!hidden !col-span-full !px-8  pt-4 pb-4 mt-auto pl-5 pr-0.5'}>
          <div>

            <LinkStyled className={'!text-sm font-medium'} to={'/account/support'}  variant={ButtonVariant.text}  text={'Служба поддержки'}/>
          </div>

          <hr className={'mt-3 mb-2 -mr-8 border-accent'} />

          <Link to={'/policy'}  className={'text-xs hover:text-accent'}>Политика конфиденциальности</Link>
        </Footer>
        {!loc.pathname.includes('account') ? <Footer className={'tablet:px-6'}>
              {footerContent}
              <div>2023 (c.)</div>
              <LinkStyled text={'Политика конфиденциальности'} variant={ButtonVariant.text} className={'!text-sm'} to={'/policy'}></LinkStyled>
          </Footer> : null}

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
