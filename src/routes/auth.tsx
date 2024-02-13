import React from 'react'
import Layout from 'components/common/layout/Layout/Layout'
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelColor,  PanelVariant } from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import FormAuth from 'components/Form/FormAuth/FormAuth'
import { useStore } from 'stores/store'
import LinkStyled from 'components/common/ui/LinkStyled/LinkStyled'
import { observer } from 'mobx-react-lite'
import { Navigate } from 'react-router-dom'
import { SvgAuthBg, SvgAuthBgSec } from 'components/common/ui/Icon'
import Button, { ButtonSizeType, ButtonVariant } from 'components/common/ui/Button/Button'

function AuthPage() {
  const store = useStore()
  
  return (
    <Layout
      className={'page-intro'}
      headerContent={
        <Button
          className={'!hidden tablet:!inline-flex ml-auto mr-8'}
          text={'Помощь'}
          variant={ButtonVariant['accent-outline']}
          size={ButtonSizeType.sm}
        />
      }
    >
      <Section type={SectionType.centered}>
        <Panel

          className={'!col-span-6 mb-12 !tablet:col-span-full !desktop:col-span-6'}
          header={
            <Heading
              text={'Вход в систему'}
              variant={HeadingVariant.h1}
              className={'desktop:!text-6xl tablet:!text-4xl !leading-snug !font-extrabold '}
              color={HeadingColor.accent}
            />
          }
          footer={<LinkStyled text={'У меня нет аккаунта'} to={'/register'} />}
        >
          <p className={'!mb-4'}>
            <strong>Добро пожаловать в сервис CleanCar.</strong>
            <br />
            Для входа в систему, введите ваши данные{' '}
          </p>
        </Panel>
        {!store.appStore.token ? (
          <Panel
            bodyClassName={'!py-12'}
            className={
              '!col-span-6 !desktop:col-start-9 !desktop:col-span-6  !tablet:col-start-2 !tablet:col-end-12 tablet:justify-self-center desktop:justify-self-auto w-full max-w-2xl'
            }
            variant={PanelVariant.textPadding}
            background={PanelColor.glass}
          >
            <FormAuth />
          </Panel>
        ) : (
          <Navigate to='/account' replace={true} />
        )}
      </Section>
      <SvgAuthBg className={'authBg'} />
      <SvgAuthBgSec className={'authBgSec'} />
    </Layout>
  )
}

export default observer(AuthPage)
