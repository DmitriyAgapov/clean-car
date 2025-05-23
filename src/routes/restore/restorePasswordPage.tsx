import React, { useEffect } from 'react'
import Layout from 'components/common/layout/Layout/Layout'
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelColor, PanelVariant } from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import { useStore } from 'stores/store'
import LinkStyled from 'components/common/ui/LinkStyled/LinkStyled'
import { observer } from 'mobx-react-lite'
import Button, { ButtonDirectory, ButtonVariant } from 'components/common/ui/Button/Button'
import { SvgAuthBg, SvgAuthBgSec } from 'components/common/ui/Icon'
import FormRestore from 'components/Form/FormRestore/FormRestore'

function RestorePasswordPage() {
  const store = useStore()
  useEffect(() => {
    store.appStore.setAppRouteName('.восстановление пароля')
  }, [store.appStore.token])

  return (
    <Layout
      className={'page-intro'}
      headerContent={
        <Button className={'!hidden tablet:!inline-flex ml-auto mr-8'}  href={"mailto:info@clean-car.net"} text={'Помощь'} variant={ButtonVariant.tech} />
      }
    >
      <Section type={SectionType.centered}>
        <Panel
          footerClassName={'mt-16'}
          className={'!col-span-6  desktop-max:!col-span-full w-full max-w-lg  tablet:px-6 tablet:justify-self-center desktop:justify-self-auto'}
          header={
            <Heading
              text={'Восстановление пароля'}
              className={'desktop:!text-6xl tablet:!text-4xl !leading-tight !font-bold'}
              variant={HeadingVariant.h1}
              color={HeadingColor.accent}
            />
          }
          footer={<LinkStyled text={'У меня нет аккаунта'} to={'/register'} />}
        >
          <p>
            <strong>Пожалуйста, введите вашу почту, которую вы оставляли при регистрации.</strong> Мы отправим вам
            письмо с активной ссылкой для смены пароля.{' '}
          </p>
        </Panel>
        {!store.authStore.userIsLoggedIn ? (
            <Panel
              bodyClassName={'!py-12'}
              className={
                'desktop:!col-start-8 desktop:!col-span-7 desktop:m-8 !tablet:col-start-2 !tablet:col-end-12 tablet:justify-self-center desktop:justify-self-auto w-full max-w-screen-sm tablet:py-12 tablet:px-6'
              }
              variant={PanelVariant.textPadding}
              background={PanelColor.glass}
            >
              <FormRestore />
            </Panel>

        ) : (
          <Panel
            className={
              'col-span-6 desktop:col-start-9 desktop:col-span-6 tablet:col-start-2 tablet:col-end-12 tablet:justify-self-center desktop:justify-self-auto w-full max-w-2xl'
            }
            footer={
              <>
                <Button text={'Logout'} action={() => store.authStore.logout()} />
                <LinkStyled
                  text={'в личный кабинет'}
                  variant={ButtonVariant.accent}
                  directory={ButtonDirectory.customer}
                  to={'/register/success'}
                />
              </>
            }
          >
            UserId: <h4>{store.userStore.currentUser?.id}</h4>
          </Panel>
        )}
      </Section>

      <SvgAuthBg className={'authBg'} />
      <SvgAuthBgSec className={'authBgSec'} />
    </Layout>
  )
}

export default observer(RestorePasswordPage)
