import React, { useEffect } from 'react'
import Layout from 'components/common/layout/Layout/Layout'
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import { useStore } from 'stores/store'
import { observer } from 'mobx-react-lite'
import { SvgAuthBg, SvgAuthBgSec } from 'components/common/ui/Icon'
import { useSearchParams } from 'react-router-dom'
import Button, { ButtonVariant } from "components/common/ui/Button/Button";

function RestorePasswordPageSuccess() {
  const store = useStore()

  useEffect(() => {
    store.appStore.setAppRouteName('.авторизация')
  }, [store.appStore.token])
  const [searchparams] = useSearchParams()
  return (
    <Layout
      className={'page-intro'}
      headerContent={
        <Button className={'!hidden tablet:!inline-flex ml-auto mr-8'} text={'Помощь'}  href={"mailto:info@clean-car.net"} variant={ButtonVariant.tech} />
      }
    >
      <Section type={SectionType.centered}>
        <Panel
          footerClassName={'mt-16'}
          className={'!col-span-6  desktop-max:!col-span-full w-full max-w-lg  tablet:px-6 tablet:justify-self-center desktop:justify-self-auto'}
          header={
            <Heading
              text={`Пожалуйста, проверьте почту ${searchparams.get('email')}`}
              className={'desktop:!text-6xl tablet:!text-4xl !leading-tight !font-bold'}
              variant={HeadingVariant.h1}
              color={HeadingColor.accent}
            />
          }
          // footer={<LinkStyled text={'Мне не пришло письмо'} to={'/restore'} />}
        >
          <p>
            На указанный почтовый ящик, мы отправили письмо с активной ссылкой для смены пароля
          </p>
        </Panel>
      </Section>
      <SvgAuthBg className={'authBg'} />
      <SvgAuthBgSec className={'authBgSec'} />
    </Layout>
  )
}

export default observer(RestorePasswordPageSuccess)
