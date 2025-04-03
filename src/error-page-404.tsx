import React from 'react'
import { Navigate, useLocation, useNavigate, useRouteError } from 'react-router-dom'
import Section, { SectionType } from "components/common/layout/Section/Section";
import Panel, { PanelColor, PanelVariant } from "components/common/layout/Panel/Panel";
import Button, { ButtonSizeType, ButtonVariant } from "components/common/ui/Button/Button";
import { IconNotFoundSvg, SvgAuthBg, SvgAuthBgSec, SvgBackArrow } from "components/common/ui/Icon";
import Heading, { HeadingColor, HeadingVariant } from "components/common/ui/Heading/Heading";
import Layout from "components/common/layout/Layout/Layout";
import Header from "components/common/layout/Header/Header";
import LinkStyled from 'components/common/ui/LinkStyled/LinkStyled'
import { rem } from '@mantine/core';

export default function ErrorPageNotFound() {
  const error = useRouteError()
  // console.error(error);
  const navigate = useNavigate()
  const location = useLocation()
  if(location.pathname !== "/404") {
    return <Navigate to={'/404'} />
  }
  return (
    <Layout
      className={'page-intro page-error'}

    >
      <Section type={SectionType.centered}  className={'grid-row-[1/-1]'}>
        <Panel
          className={
            ' desktop-max:-mx-4  desktop-max:h-lvh'
          }
          header={<Heading variant={HeadingVariant.h1} text={'Ошибка 404'} className={'uppercase !mb-0'}/>}
          variant={PanelVariant.textPadding}
          background={PanelColor.glass}
          footerClassName={'!justify-start tablet-max:!px-4'}
          bodyClassName={'max-w-lg'}
          footer={<LinkStyled className={'col-span-1'} to={'/'}
            variant={ButtonVariant['accent-outline']}
            size={ButtonSizeType.base}
            action={() => console.log('click')}
            text={'Вернуться в личный кабинет'}
            type={'button'} />}
        >
          <p>В системе произошла ошибка. Приносим свои извинения. Вы можете связаться с поддержкой</p>

        </Panel>
        <IconNotFoundSvg  style={{ width: rem(966), height: rem(290) }} className={'absolute desktop:-bottom-48  desktop:-right-24  desktop-max:left-0  desktop-max:max:right-0 desktop-max:!w-full  desktop-max:top-1/3'}/>
      </Section>
      <SvgAuthBg className={'authBg'} />
      <SvgAuthBgSec className={'authBgSec'} />
    </Layout>
  )
}
