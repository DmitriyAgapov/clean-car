import React, { JSX, useEffect, useState } from 'react'
import Section, { SectionType } from "components/common/layout/Section/Section";
import Panel, { PanelColor, PanelRouteStyle, PanelVariant } from "components/common/layout/Panel/Panel";
import Heading, { HeadingColor, HeadingDirectory, HeadingVariant } from "components/common/ui/Heading/Heading";
import Button, { ButtonSizeType, ButtonVariant } from "components/common/ui/Button/Button";
import { useStore } from "stores/store";
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import { PriceOptionsSVG, SvgBackArrow } from "components/common/ui/Icon";
import { PermissionNames } from "stores/permissionStore";
import { dateTransformShort } from "utils/utils";
import { CompanyType } from "stores/companyStore";
import Tabs, { TabsType } from "components/common/layout/Tabs/Tabs";
import LinkStyled from "components/common/ui/LinkStyled/LinkStyled";
import dayjs from 'dayjs'
import { useDidUpdate, useDisclosure, useViewportSize, useWindowScroll } from '@mantine/hooks'
import { PriceCopy } from "components/common/layout/Modal/PriceCopy";
import { observer } from "mobx-react-lite";
import { CarClasses } from 'components/common/layout/Modal/CarClasses'
import { ActionIcon, Affix, Overlay, Transition } from '@mantine/core'

function PriceActions(props: {  action: any }) {
  const store = useStore()
  const location = useLocation()
  const [state, setState] = useState(false)
  const {width} = useViewportSize();
  if(width > 1024) return store.userStore.getUserCan(PermissionNames['Управление прайс-листом'], 'update') &&
    !location.pathname.includes('history') && <>
      <LinkStyled to={`history`} text={'История'} size={ButtonSizeType.sm} variant={ButtonVariant["accent-outline"]}/>
      <Button     action={props.action} type={'button'} text={'Дублировать'} size={ButtonSizeType.sm} variant={ButtonVariant["accent-outline"]}/>
    <LinkStyled to={'edit'} text={'Редактировать'} size={ButtonSizeType.sm} variant={ButtonVariant["accent-outline"]}/></>
  return store.userStore.getUserCan(PermissionNames['Управление прайс-листом'], 'update') &&
          !location.pathname.includes('history') && ( <>{state && <Overlay color="#000" onClick={() => setState(false)} top={ "-50vh"} left={ "-50vw"} bottom={ "-50vh"} right={ "-50vw"} backgroundOpacity={0.85} zIndex={9999}/> }  <Affix position={{ bottom: 20, right: 10 }} className={'flex flex-col items-end gap-6'}>
        {state && <Transition transition="slide-up" mounted={state} >
            {(transitionStyles) => (
              <div className={'flex flex-col gap-3 !items-end'} style={transitionStyles}>


                <LinkStyled
                  to={`history`}
                  text={'История'}
                  className={'!self-end '}
                  size={ButtonSizeType.base}
                  variant={ButtonVariant['accent-outline']}
                />
                <Button
                  trimText={true}
                  action={props.action}
                  type={'button'}
                  className={'!self-end '}
                  text={'Дублировать'}
                  size={ButtonSizeType.base}
                  variant={ButtonVariant['accent-outline']}
                />
                <LinkStyled
                  to={'edit'}
                  className={'!self-end '}
                  text={'Редактировать'}
                  size={ButtonSizeType.base}
                  variant={ButtonVariant['accent-outline']}
                />


              </div>   )}
          </Transition>}
          <ActionIcon variant="outline" className={'border-2 border-accent bg-black/80'}  size="xl" radius="xl" aria-label="Settings" bg={""} onClick={() => setState((prevState) => !prevState)} >
            <PriceOptionsSVG style={{ width: '24px', height: '24px', fill: 'rgb(0, 255, 174)' }} stroke={"1.5"} />
          </ActionIcon>
          </Affix></>
    )
}

const PricePage = ():JSX.Element => {
  const navigate = useNavigate()
  const store = useStore()
  const location = useLocation()
  const params = useParams()

  const  textData  : any = store.priceStore.TextData
  const [opened, { open, close }] = useDisclosure(false);

  const  currentPriceById = store.priceStore.currentPriceById;
  const  company = store.companyStore.getCompanyById(Number(params.id)) ?? store.userStore.myProfileData.company;
  const isHistory = location.pathname.includes('history');
  // @ts-ignore
  const isCreate = currentPriceById.data?.tabs && currentPriceById.data?.tabs[0]?.data;

  const memoModal = React.useMemo(() => {
    if(!isHistory) {
    return  <PriceCopy opened={opened} id={isCreate.id} title={company.name}
      onClose={close} />
      }
    return null
  }, [opened]);

  const [openedCar, { open:openCar, close:closeCar }] = useDisclosure(false)
  const memoModalCarClasses = React.useMemo(() => {
    return <CarClasses opened={openedCar} onClose={closeCar} />
  }, [openedCar])
  useDidUpdate(
    () => {
      if(location.pathname === `/account/price/${params.id}`) {
        store.appStore.setAppState(false)
      }
    },
    [location.pathname]
  );
  if (location.pathname.includes('create') || location.pathname.includes('edit') || (location.pathname.includes('history') && !params.bid_id)) return <Outlet />
  return (
    <Section type={SectionType.default} noScroll={true}>
      <Panel variant={PanelVariant.withGapOnly} headerClassName={'flex justify-between'} state={false}
        header={<>
          <div>
            <Button text={<><SvgBackArrow />{textData.createPageBack}</>} className={'flex items-center gap-2 font-medium text-[#606163] hover:text-gray-300 leading-none !mb-4'} action={() =>  navigate(location.pathname.split('/').slice(0, -1).join('/'), {})} variant={ButtonVariant.text} />
            <Heading text={(isHistory && isCreate) ? `Прайс лист ${dayjs(isCreate.created).format('DD.MM.YY')} - ${dayjs(isCreate.expired).format('DD.MM.YY')}` : 'Прайс компании'} variant={HeadingVariant.h1} className={'inline-block !mb-0'} color={HeadingColor.accent} />
          </div>
          <div className={'flex gap-6 tablet-max:max-w-96 mobile:mt-6'}>
            <Button
              text={'Классификация автомобилей'}
              action={openCar}
              trimText={true}
              /* action={() => store.companyStore.addCompany()} */
              className={"inline-flex tablet-max:flex-1"}
              variant={ButtonVariant['accent-outline']}
              size={ButtonSizeType.sm}
            />
            {memoModalCarClasses}
          </div>
        </>}>

      </Panel>

      <Panel
        state={currentPriceById.loading}
        className={'col-span-full grid grid-rows-[auto_1fr] px-5 mobile:px-3 py-8 mobile:pb-0 mobile:-mb-8 !gap-6 '}
        variant={PanelVariant.default}
        background={PanelColor.glass}
        routeStyle={PanelRouteStyle.price}
        bodyClassName={'flex'}
        footerClassName={'flex  justify-end'}
        headerClassName={'border-bottom-none !grid gap-5 !justify-normal'}
        header={
          <>
            <div className={'flex mobile:flex-wrap w-full  col-span-full gap-2.5'}>
              <Heading text={company.name}
                variant={HeadingVariant.h2}
                color={HeadingColor.accent}
                className={'mr-auto'} />
              <PriceActions
                action={open} />
            </div>
            <div className={'flex  mobile:flex-wrap  items-baseline  gap-6'}>
              <div className={'text-xs text-gray-2'}>
                Дата и время регистрации: <span>{dayjs(company.updated).format('DD.MM.YY hh:mm')}</span>
              </div>
              <div className={'flex flex-1 gap-6'}>
                {isCreate && isCreate.is_active && <Heading className={'!m-0'}
                  text={isCreate.is_active ? 'Активен' : 'Не активна'}
                  color={company.is_active ? HeadingColor.active : HeadingColor.notActive}
                  variant={HeadingVariant.h4} />}
                <Heading className={'!m-0'}
                  text={company.company_type == "Клиент"
                    ? CompanyType.customer
                    : CompanyType.performer}
                  variant={HeadingVariant.h4}
                  directory={
                    company.company_type == "Клиент"
                      ? HeadingDirectory.customer
                      : HeadingDirectory.performer
                  } />

              </div>
            </div>
          </>
        }
      >
       <Tabs data={currentPriceById.data.tabs} type={TabsType.price} className={'page-price flex-[1_auto]'}/>
        {memoModal}
      </Panel>
    </Section>
  )
}
export default observer(PricePage)
