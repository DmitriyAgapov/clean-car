import React, { useEffect } from 'react'
import Layout from 'components/common/layout/Layout/Layout'
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelColor, PanelVariant } from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import FormRegister from 'components/Form/FormRegister/FormRegister'

import Button, { ButtonSizeType, ButtonVariant } from 'components/common/ui/Button/Button'
import LinkStyled from 'components/common/ui/LinkStyled/LinkStyled'
import Image from 'components/common/ui/Image/Image'
import imageBg from '../../assets/images/bg/welcomebg.png'

export default function RegisterPage() {
  return (
    <Layout
      className={'page-intro'}
      headerContent={
        <Button className={'!hidden tablet:!inline-flex ml-auto mr-8'} text={'Помощь'} variant={ButtonVariant.tech} />
      }
    >
      <Section type={SectionType.centered}>
        <Panel
          footerClassName={'mt-16'}
          className={'!col-span-6  desktop-max:!col-span-full w-full max-w-lg  tablet:px-6 tablet:justify-self-center desktop:justify-self-auto'}
          header={
            <Heading
              text={'Добро пожаловать в CleanCar.'}
              variant={HeadingVariant.h1}
              className={'desktop:!text-6xl !leading-snug desktop:!font-extrabold '}
              color={HeadingColor.accent}
            />
          }
          footer={
            <LinkStyled
              text={'У меня уже есть аккаунт'}
              variant={ButtonVariant['accent-outline']}
              size={ButtonSizeType.base}
              to={'/'}
            />
          }
        >
          <p className={'pb-8'}>
            Мы рады, что вы выбрали нас.
            <br />
            Пожалуйста, заполните данные для регистрации{' '}
          </p>
        </Panel>
        <Panel
          className={
            'desktop:!col-start-8 desktop:!col-span-7 desktop:m-8 !tablet:col-start-2 !tablet:col-end-12 tablet:justify-self-center desktop:justify-self-auto w-full max-w-xl tablet:py-4 tablet:px-2'
          }
          variant={PanelVariant.textPadding}
          background={PanelColor.glass}
        >
          <FormRegister />
        </Panel>
      </Section>

      <Image className={'absolute bottom-0 left-0 -z-10'} src={imageBg} alt={''} />
    </Layout>
  )
}
