import React from 'react'
import Layout from 'components/common/layout/Layout/Layout'
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelColor,  PanelVariant } from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import FormAuth from 'components/Form/FormAuth/FormAuth'
import { useStore } from 'stores/store'
import { observer } from 'mobx-react-lite'
import { Navigate } from 'react-router-dom'
import { SvgAuthBg, SvgAuthBgSec } from 'components/common/ui/Icon'

function AuthPage() {
  const store = useStore()
  if (store.appStore.appType !== "") {
    return <Navigate to={'/account'} />
  }
  return (
    <Layout
      className={'page-intro'}
      // headerContent={
      //   <Button
      //     className={'!hidden tablet:!inline-flex ml-auto mr-8'}
      //     text={'Помощь'}
      //     variant={ButtonVariant['accent-outline']}
      //     size={ButtonSizeType.sm}
      //   />
      // }
    >
      <Section type={SectionType.centered}>
        <Panel

          className={'!col-span-6  desktop-max:!col-span-full w-full max-w-lg  tablet:px-6 tablet:justify-self-center desktop:justify-self-auto'}
          header={
            <Heading
              text={'Вход в систему'}
              variant={HeadingVariant.h1}
              className={'desktop:!text-6xl tablet:!text-4xl mobile:!text-4xl !leading-snug !font-extrabold '}
              color={HeadingColor.accent}
            />
          }
          // footer={<LinkStyled text={'У меня нет аккаунта'} to={'/register'} />}
        >
          <p className={'!mb-4'}>
            <strong>Добро пожаловать в сервис CleanCar.
           </strong><br/>
            Для входа в систему, введите ваши данные
          </p>
        </Panel>

          <Panel
            bodyClassName={'!py-12'}
            className={
              'desktop:!col-start-8 desktop:!col-span-7 desktop:m-8 !tablet:col-start-2 !tablet:col-end-12 tablet:justify-self-center desktop:justify-self-auto w-full max-w-screen-sm tablet:py-12 tablet:px-6'
            }
            variant={PanelVariant.textPadding}
            background={PanelColor.glass}
          >
            <FormAuth />
          </Panel>

      </Section>
      <SvgAuthBg className={'authBg'} />
      <SvgAuthBgSec className={'authBgSec'} />
    </Layout>
  )
}

export default observer(AuthPage)
