import React from 'react'
import Layout from 'components/common/layout/Layout/Layout'
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import { ButtonSizeType, ButtonVariant } from 'components/common/ui/Button/Button'
import LinkStyled from 'components/common/ui/LinkStyled/LinkStyled'

export default function Root() {
  return (
    // <Layout className={'page-intro'}>
      <Section type={SectionType.centered}>
        <Panel
          className={'col-span-6'}
          header={
            <Heading text={'Добро пожаловать в CleanCar.'} variant={HeadingVariant.h1} color={HeadingColor.accent} />
          }

        >
          {/* <p> */}
          {/*   Мы рады, что вы выбрали нас. */}
          {/*   <br /> */}
          {/*   Пожалуйста, заполните данные для регистрации{' '} */}
          {/* </p> */}
        </Panel>
      </Section>
    // </Layout>
  )
}
