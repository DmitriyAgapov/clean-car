import React from 'react'
import Layout from 'components/common/layout/Layout/Layout'
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import { useStore } from 'stores/store'
import { observer } from 'mobx-react-lite'
import { Navigate } from 'react-router-dom'

function Root() {
  const store = useStore()
  if (store.appStore.appType !== "" && location.pathname !== 'policy') {
    return <Navigate to={'/account/bids'} />
  }
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
export default observer(Root)
