import React, { JSX } from 'react'
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelColor, PanelVariant } from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingDirectory, HeadingVariant } from 'components/common/ui/Heading/Heading'
import Button, { ButtonSizeType, ButtonVariant } from 'components/common/ui/Button/Button'
import { useStore } from 'stores/store'
import { Outlet, useLoaderData, useLocation, useNavigate, useParams } from 'react-router-dom'
import { SvgBackArrow, SvgClose } from "components/common/ui/Icon";
import { PermissionNames } from 'stores/permissionStore'
import { dateTransform, dateTransformShort } from "utils/utils";
import { CompanyType } from 'stores/companyStore'
import Tabs, { TabsType } from 'components/common/layout/Tabs/Tabs'
import LinkStyled from 'components/common/ui/LinkStyled/LinkStyled'
import { ScrollArea } from '@mantine/core'
import { notifications } from "@mantine/notifications";

const test = [
  {
    label: ''
  }
]
const PriceEditPage = ():JSX.Element => {
  const navigate = useNavigate()
  const location = useLocation()
  const params = useParams()
  const store = useStore()
  const { data, dataTable }: any = useLoaderData()
  const  textData  : any = store.priceStore.TextData
  const  company = store.companyStore.getCompanyById(Number(params.id))

  return (
    <Section type={SectionType.default}>
      <Panel variant={PanelVariant.withGapOnly} headerClassName={'flex justify-between'} state={false}
        header={<>
          <div>
            <Button text={<><SvgBackArrow />{textData.createPageBack}</>} className={'flex items-center gap-2 font-medium text-[#606163] hover:text-gray-300 leading-none !mb-4'} action={() => navigate(-1)} variant={ButtonVariant.text} />
            <Heading text={company.name} variant={HeadingVariant.h1} className={'inline-block !mb-0'} color={HeadingColor.accent} />
          </div>
          {/* {store.userStore.getUserCan(PermissionNames["Управление прайс-листом"], 'update') && <Button */}
          {/*   text={'Редактировать'} */}
          {/*   action={() => navigate(location.pathname + '/edit')} */}
          {/*   className={'justify-self-end'} */}
          {/*   variant={ButtonVariant.default} */}
          {/* />} */}
        </>}>

      </Panel>

      <Panel
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
              {store.userStore.getUserCan(PermissionNames["Управление прайс-листом"], 'update') && <Button text={'Сохранить'}  action={() => {
                 store.priceStore.updatePrices().then((r) => {
                   console.log('success', r)
                   r.forEach((r: any) => {
                     setTimeout(() => {
                   if(r.status === 201) {
                     notifications.show({
                       id: 'car-created',
                       withCloseButton: true,
                       onClose: () => console.log('unmounted'),
                       onOpen: () => console.log('mounted'),
                       autoClose: 5000,
                       title: "Прайс обновлен",
                       message: 'Возвращаемся на страницу прайса',
                       icon: <SvgClose />,
                       className: 'my-notification-class z-[9999] absolute top-12 right-12',

                       loading: false,
                     });
                      setTimeout(() => {
                        store.priceStore.clearPriceOnChange()
                        navigate(location.pathname.split('/edit')[0])
                      }, 1000)
                   } else {
                     notifications.show({
                       id: 'car-created',
                       withCloseButton: true,
                       onClose: () => console.log('unmounted'),
                       onOpen: () => console.log('mounted'),
                       autoClose: 5000,
                       title: "Ошибка",
                       message: 'Прайс не удалось обновить',
                       color: 'red',
                       className: 'my-notification-class z-[9999]',
                       style: { backgroundColor: 'red' },
                       loading: false,
                     });
                   }}, 2000)})

              })}} size={ButtonSizeType.sm} variant={ButtonVariant["accent"]}/>

              }
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
        <Tabs data={data.tabs} type={TabsType.priceEdit} className={'page-price flex-[1_auto]'}/>
      </Panel>
    </Section>
  )
}
export default PriceEditPage
