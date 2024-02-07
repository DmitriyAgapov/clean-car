import React, { JSX } from "react";
import Section, { SectionType } from "components/common/layout/Section/Section";
import Panel, { PanelColor, PanelVariant } from "components/common/layout/Panel/Panel";
import Heading, { HeadingColor, HeadingDirectory, HeadingVariant } from "components/common/ui/Heading/Heading";
import Button, { ButtonVariant } from "components/common/ui/Button/Button";
import { useStore } from "stores/store";
import { Outlet, useLoaderData, useLocation, useNavigate, useParams } from "react-router-dom";
import { SvgBackArrow } from "components/common/ui/Icon";
import { PermissionNames } from "stores/permissionStore";
import { dateTransform, tires } from "utils/utils";
import { CompanyType } from "stores/companyStore";
import Tabs, { TabsType } from "components/common/layout/Tabs/Tabs";

const test = [
  {
    label: ''
  }
]
const PricePage = ():JSX.Element => {
  const navigate = useNavigate()
  const location = useLocation()
  const params = useParams()
  const store = useStore()
  const { data }: any = useLoaderData()
  const  textData  : any = store.priceStore.TextData
  const  company = store.companyStore.getCompanyById(Number(params.id))






  if (location.pathname.includes('edit')) return <Outlet />
  if (location.pathname.includes('create') || location.pathname.includes('edit')) return <Outlet />
  return (
    <Section type={SectionType.default}>
      <Panel variant={PanelVariant.withGapOnly} headerClassName={'flex justify-between'} state={false}
        header={<>
          <div>
            <Button text={<><SvgBackArrow />{textData.createPageBack}</>} className={'flex items-center gap-2 font-medium text-[#606163] hover:text-gray-300 leading-none !mb-4'} action={() => navigate(-1)} variant={ButtonVariant.text} />
            <Heading text={company.name} variant={HeadingVariant.h1} className={'inline-block !mb-0'} color={HeadingColor.accent} />
          </div>
          {store.userStore.getUserCan(PermissionNames["Управление прайс-листом"], 'update') && <Button
            text={'Редактировать'}
            action={() => navigate(location.pathname + '/edit')}
            className={'justify-self-end'}
            variant={ButtonVariant.default}
          />}
        </>}>

      </Panel>

      <Panel
        className={'col-span-full grid grid-rows-[auto_1fr_auto] px-5 py-8 !gap-10'}
        variant={PanelVariant.withGapOnly}
        background={PanelColor.glass}
        bodyClassName={'flex'}
        footerClassName={'flex  justify-end'}
        headerClassName={'border-bottom-none !grid gap-5'}
        header={
          <>
            <Heading text={company.name} variant={HeadingVariant.h2} color={HeadingColor.accent} />
            <div className={'flex items-baseline justify-between'}>
              <div className={'text-xs text-gray-2'}>
                Дата и время регистрации: <span>{dateTransform(company.updated).date}</span>
              </div>
              <div className={'flex flex-1 justify-around'}>
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
        <Tabs data={data.tabs} type={TabsType.price} className={'page-price flex-[1_auto]'}/>

      </Panel>
    </Section>
  )
}
export default PricePage
