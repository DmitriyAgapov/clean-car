import React from 'react'
import { useRouteError } from 'react-router-dom'
import Section, { SectionType } from "components/common/layout/Section/Section";
import Panel, { PanelColor, PanelVariant } from "components/common/layout/Panel/Panel";
import Button, { ButtonSizeType, ButtonVariant } from "components/common/ui/Button/Button";
import { SvgAuthBg, SvgAuthBgSec, SvgBackArrow } from "components/common/ui/Icon";
import Heading, { HeadingColor, HeadingVariant } from "components/common/ui/Heading/Heading";
import Layout from "components/common/layout/Layout/Layout";
import Header from "components/common/layout/Header/Header";

export default function ErrorPageDisconnect() {
  const error = useRouteError()
  // console.error(error);

  return (
    <Layout
      className={'page-intro page-intro_policy'}

    >
      <Section type={SectionType.default}>


        <Panel
          className={
            'tablet:justify-self-center desktop:justify-self-auto'
          }
          header={<Heading variant={HeadingVariant.h1} text={'нет подключения к интернету'}/>}
          variant={PanelVariant.textPadding}
          background={PanelColor.glass}
          footer={<Button className={'col-span-1'}
            variant={ButtonVariant['accent-outline']}
            size={ButtonSizeType.base}
            action={() => console.log('click')}
            text={'отменить'}
            type={'button'} />}
        >
          <p>Нет соединения. Приносим свои извинения. Вы можете связаться с поддержкой.</p>

        </Panel>

      </Section>
      <SvgAuthBg className={'authBg'} />
      <SvgAuthBgSec className={'authBgSec'} />
    </Layout>
  )
}
