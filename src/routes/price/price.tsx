import React, { JSX, useEffect } from "react";
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelColor, PanelVariant } from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingDirectory, HeadingVariant } from 'components/common/ui/Heading/Heading'
import Button, { ButtonSizeType, ButtonVariant } from 'components/common/ui/Button/Button'
import { useStore } from 'stores/store'
import { Outlet, useLoaderData, useLocation, useNavigate, useParams } from 'react-router-dom'
import { SvgBackArrow } from 'components/common/ui/Icon'
import { PermissionNames } from 'stores/permissionStore'
import {  dateTransformShort } from "utils/utils";
import { CompanyType } from 'stores/companyStore'
import Tabs, { TabsType } from 'components/common/layout/Tabs/Tabs'
import LinkStyled from 'components/common/ui/LinkStyled/LinkStyled'
import { observer } from "mobx-react-lite";
import priceStore from "stores/priceStore";

const PricePage = ():JSX.Element => {
  const navigate = useNavigate()
  const location = useLocation()
  const params = useParams()
  const store = useStore()
  // const { data, dataTable }: any = useLoaderData()
  const  textData  : any = store.priceStore.TextData


  const  currentPriceById = store.priceStore.currentPriceById;
  const  company = store.companyStore.getCompanyById(Number(params.id));
  console.log(currentPriceById.data);
  React.useEffect(() => {
    console.log(currentPriceById.data.tabs)
    console.log(currentPriceById.loading)
  }, [currentPriceById.loading])
  // console.log((!currentPriceById.loading && currentPriceById.data.tabs && currentPriceById.data.tabs.length > 0));
  // console.log('loading', !currentPriceById.loading);
  // console.log('data.tabs.length > 0)', currentPriceById.data.tabs?.length > 0);
  // console.log('data.tabs', currentPriceById.data.tabs);
  if (location.pathname.includes('create') || location.pathname.includes('edit')) return <Outlet />
  return (
    <Section type={SectionType.default}>
      <Panel variant={PanelVariant.withGapOnly} headerClassName={'flex justify-between'} state={false}
        header={<>
          <div>
            <Button text={<><SvgBackArrow />{textData.createPageBack}</>} className={'flex items-center gap-2 font-medium text-[#606163] hover:text-gray-300 leading-none !mb-4'} action={() => navigate(-1)} variant={ButtonVariant.text} />
            <Heading text={company.name} variant={HeadingVariant.h1} className={'inline-block !mb-0'} color={HeadingColor.accent} />
          </div>

        </>}>

      </Panel>

      <Panel
        state={false}
        className={'col-span-full grid grid-rows-[auto_1fr] px-5 py-8 !gap-10 '}
        variant={PanelVariant.withGapOnly}
        background={PanelColor.glass}
        bodyClassName={'flex'}
        footerClassName={'flex  justify-end'}
        headerClassName={'border-bottom-none !grid gap-5 !justify-normal'}
        header={
          <>
            <div className={'flex w-full  col-span-full gap-2.5'}>
              <Heading text={company.name} variant={HeadingVariant.h2} color={HeadingColor.accent} className={'mr-auto'}/>
              {store.userStore.getUserCan(PermissionNames["Управление прайс-листом"], 'update') && <><LinkStyled to={'history'} text={'История'} size={ButtonSizeType.sm} variant={ButtonVariant["accent-outline"]}/>
              <LinkStyled to={'history'} text={'Дублировать'} size={ButtonSizeType.sm} variant={ButtonVariant["accent-outline"]}/>
              <LinkStyled to={'edit'} text={'Редактировать'} size={ButtonSizeType.sm} variant={ButtonVariant["accent-outline"]}/></>}
            </div>
            <div className={'flex items-baseline  gap-6'}>
              <div className={'text-xs text-gray-2'}>
                Дата и время регистрации: <span>{dateTransformShort(company.updated).date}</span>
              </div>
              <div className={'flex flex-1 gap-6'}>
                <Heading
                  className={'!m-0'}
                  text={company.is_active ? 'Активен' : 'Не активна'}
                  color={company.is_active ? HeadingColor.active : HeadingColor.notActive}
                  variant={HeadingVariant.h4}
                />
                <Heading
                  className={'!m-0'}
                  text={company.company_type == 'customer'
                    ? CompanyType.customer
                    : CompanyType.performer}
                  variant={HeadingVariant.h4}
                  directory={
                    company.company_type == 'customer'
                      ? HeadingDirectory.customer
                      : HeadingDirectory.performer
                  }
                />

              </div>
            </div>
          </>
        }
      >
        {currentPriceById.data.tabs ? <Tabs data={currentPriceById.data.tabs} type={TabsType.price} className={'page-price flex-[1_auto]'}/> : null}
      </Panel>
    </Section>
  )
}
export default observer(PricePage)
