import React, { JSX, useEffect, useState } from 'react'
import Section, { SectionType } from "components/common/layout/Section/Section";
import Panel, { PanelColor, PanelRouteStyle, PanelVariant } from "components/common/layout/Panel/Panel";
import Heading, { HeadingColor, HeadingDirectory, HeadingVariant } from "components/common/ui/Heading/Heading";
import Button, { ButtonSizeType, ButtonVariant } from "components/common/ui/Button/Button";
import { useStore } from "stores/store";
import {  useLocation, useNavigate, useParams } from "react-router-dom";
import { SvgBackArrow } from "components/common/ui/Icon";
import { CompanyType } from "stores/companyStore";
import Tabs, { TabsType } from "components/common/layout/Tabs/Tabs";
import dayjs from "dayjs";
import { useDisclosure } from "@mantine/hooks";
import { PriceCopy } from "components/common/layout/Modal/PriceCopy";
import { observer } from "mobx-react-lite";
import { CarClasses } from "components/common/layout/Modal/CarClasses";

const PriceHistoryIdPage = ():JSX.Element => {
  const navigate = useNavigate()
  const location = useLocation()
  const params = useParams()
  const store = useStore()
  const  textData  : any = store.priceStore.TextData

  const [opened, { open, close }] = useDisclosure(false);

  const  currentPriceById = store.priceStore.currentPriceById;

  const  company = store.companyStore.getCompanyById(Number(params.id)) ?? store.userStore.myProfileData.company;
  const isHistory = location.pathname.includes('history');
  // @ts-ignore
  const isCreate = currentPriceById.data?.tabs && currentPriceById.data?.tabs[0]?.data;
    useEffect(() => {
        console.log(store.priceStore.currentPriceById);
    }, [store.priceStore.currentPriceById]);
  store.appStore.setAppState(currentPriceById.loading);

  useEffect(() => {
    store.appStore.getAppState ? store.appStore.setAppState(!!company) : void null
  },[company])

  const memoModal = React.useMemo(() => {
    if(!isHistory) {
    return  <PriceCopy opened={opened} id={isCreate.id} title={company.name}
      onClose={close} />
      }
    return null
  }, [opened]);
  React.useEffect(() => {
    // if(currentPriceById.loading) {
    console.log('history');
    store.appStore.setAppState(false);
    // }
  }, [])
    const [date, setDate] = useState("")
  const [openedCar, { open:openCar, close:closeCar }] = useDisclosure(false)
  const memoModalCarClasses = React.useMemo(() => {
    return <CarClasses opened={openedCar} onClose={closeCar} />
  }, [openedCar])
    const handleActiveTab = (value:string) => {
        const tabDate = dayjs(currentPriceById?.data?.tabs.filter((price:any) => price.label === value)[0]?.data?.created).format('DD.MM.YY HH:mm');

        if(tabDate) setDate(tabDate)
    }
  return (
      <Section type={SectionType.default}>
          <Panel
              variant={PanelVariant.withGapOnly}
              headerClassName={'flex justify-between'}
              state={false}
              header={
                  <>
                      <div>
                          <Button
                              text={
                                  <>
                                      <SvgBackArrow />
                                      {textData.createPageBack}
                                  </>
                              }
                              className={
                                  'flex items-center gap-2 font-medium text-[#606163] hover:text-gray-300 leading-none !mb-4'
                              }
                              action={() => navigate(location.pathname.split('/').slice(0, -2).join('/'), {})}
                              variant={ButtonVariant.text}
                          />
                          <Heading
                              text={
                                  isHistory && isCreate
                                      ? `Прайс лист ${dayjs(isCreate.created).format('DD.MM.YY')} - ${dayjs(isCreate.expired).format('DD.MM.YY')}`
                                      : company?.name
                              }
                              variant={HeadingVariant.h1}
                              className={'inline-block !mb-0'}
                              color={HeadingColor.accent}
                          />
                      </div>
                      <div className={'flex gap-6 tablet-max:max-w-96 mobile:mt-6'}>
                          <Button
                              text={'Классификация автомобилей'}
                              action={openCar}
                              trimText={true}
                              /* action={() => store.companyStore.addCompany()} */
                              className={'inline-flex tablet-max:flex-1'}
                              variant={ButtonVariant['accent-outline']}
                              size={ButtonSizeType.sm}
                          />{' '}
                          {memoModalCarClasses}
                      </div>
                  </>
              }
          ></Panel>

          <Panel
              state={false}
            className={'col-span-full grid grid-rows-[auto_1fr] self-stretch px-5 mobile:px-3 py-8 mobile:pb-0 mobile:-mb-8 !gap-6 '}
              variant={PanelVariant.withGapOnly}
              background={PanelColor.glass}
              routeStyle={PanelRouteStyle.price}
              bodyClassName={'flex'}
              footerClassName={'flex  justify-end'}
              headerClassName={'border-bottom-none !grid gap-5 !justify-normal'}
              header={
                  <>
                      <div className={'flex mobile:flex-wrap w-full  col-span-full gap-2.5'}>
                          <Heading
                              text={company.name}
                              variant={HeadingVariant.h2}
                              color={HeadingColor.accent}
                              className={'mr-auto'}
                          />
                          {/* {store.userStore.getUserCan(PermissionNames['Управление прайс-листом'], 'update') && */}
                          {/*     !location.pathname.includes('history') && ( */}
                          {/*         <> */}
                          {/*             <LinkStyled */}
                          {/*                 to={`history`} */}
                          {/*                 text={'История'} */}
                          {/*                 size={ButtonSizeType.sm} */}
                          {/*                 variant={ButtonVariant['accent-outline']} */}
                          {/*             /> */}
                          {/*             <Button */}
                          {/*                 action={open} */}
                          {/*                 type={'button'} */}
                          {/*                 text={'Дублировать'} */}
                          {/*                 size={ButtonSizeType.sm} */}
                          {/*                 variant={ButtonVariant['accent-outline']} */}
                          {/*             /> */}
                          {/*             <LinkStyled */}
                          {/*                 to={'edit'} */}
                          {/*                 text={'Редактировать'} */}
                          {/*                 size={ButtonSizeType.sm} */}
                          {/*                 variant={ButtonVariant['accent-outline']} */}
                          {/*             /> */}
                          {/*         </> */}
                          {/*     )} */}
                      </div>
                      <div className={'flex  mobile:flex-wrap  items-baseline  gap-6'}>
                          <div className={'text-xs text-gray-2'}>
                            <div>Дата создания: <span>{dayjs(isCreate?.created).format('DD.MM.YY')}</span></div>
                            <div>Дата изменения: <span>{dayjs(isCreate?.updated).format('DD.MM.YY')}</span></div>
                          </div>
                          <div className={'flex flex-1 gap-6'}>
                              {isCreate && isCreate.is_active && (
                                  <Heading
                                      className={'!m-0'}
                                      text={isCreate.is_active ? 'Активен' : 'Не активна'}
                                      color={company.is_active ? HeadingColor.active : HeadingColor.notActive}
                                      variant={HeadingVariant.h4}
                                  />
                              )}
                              <Heading
                                  className={'!m-0'}
                                  text={
                                      company.company_type == 'customer' ? CompanyType.customer : CompanyType.performer
                                  }
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
              <Tabs data={currentPriceById.data.tabs}  activeTab={handleActiveTab} type={TabsType.price} className={'page-price flex-[1_auto]'} />
              {memoModal}
          </Panel>
      </Section>
  )
}
export default observer(PriceHistoryIdPage)
