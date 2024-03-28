import React from 'react'
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelColor, PanelVariant } from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingDirectory, HeadingVariant } from 'components/common/ui/Heading/Heading'
import Button, { ButtonVariant } from 'components/common/ui/Button/Button'
import { useStore } from 'stores/store'
import { observer } from 'mobx-react-lite'
import LinkStyled from 'components/common/ui/LinkStyled/LinkStyled'
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom'
import Tabs, { TabsType } from 'components/common/layout/Tabs/Tabs'
import { dateTransform } from 'utils/utils'
import { SvgBackArrow } from 'components/common/ui/Icon'
import { CompanyType } from 'stores/companyStore'
import { PermissionNames } from 'stores/permissionStore'
import { values } from 'mobx'
import dayjs from "dayjs";

const CompanyPage = () => {
  const store = useStore()
  const location = useLocation()
  const { id, type,data }:any = useLoaderData()
  const navigate = useNavigate()
  const  companyData = store.companyStore.getCompanyFullData(id);
  const { company, users, address, application_type,   company_type, contacts, created,inn, legal_address, ogrn, service_percent, updated } = companyData

  return (
      <Section type={SectionType.default}>
          <Panel
              variant={PanelVariant.withGapOnly}
              header={<><div>
                <Button text={<><SvgBackArrow />Назад к списку компаний{' '}</>} className={'flex items-center gap-2 font-medium text-[#606163] hover:text-gray-300 leading-none !mb-4'} action={() => navigate(-1)} variant={ButtonVariant.text} />
                <Heading text={'Компания'} variant={HeadingVariant.h1} className={'!mb-0 inline-block'} color={HeadingColor.accent} /></div>
              {store.userStore.getUserCan(PermissionNames['Компании'], 'update') && <LinkStyled text={'Редактировать'} to={'edit'}/* action={() => store.companyStore.addCompany()} */ className={'float-right'} variant={ButtonVariant.default} />}</>}
          />

          <Panel
              className={'col-span-full grid grid-rows-[auto_1fr_auto]'}
              variant={PanelVariant.textPadding}
              background={PanelColor.glass}
              bodyClassName={''}
              footerClassName={'flex  justify-end'}
              headerClassName={'border-bottom-none'}
              header={
                  <>
                      <Heading text={company.data.name} variant={HeadingVariant.h2} color={HeadingColor.accent} />
                      <div className={'flex items-baseline justify-between'}>
                          <div className={'text-xs text-gray-2'}>
                              Дата и время регистрации: <span className={'block'}>{dayjs(company.data.updated).locale('ru').format('DD MMMM YYYY г. HH:mm')}</span>
                          </div>
                          <div className={'flex flex-1 justify-around'}>
                              <Heading
                                  className={'!m-0'}
                                  text={company.data.is_active ? 'Активен' : 'Не активна'}
                                  color={company.data.is_active ? HeadingColor.active : HeadingColor.notActive}
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
                              <Heading className={'!m-0'} text={company.data.city.name} variant={HeadingVariant.h4} />
                          </div>
                      </div>
                  </>
              }
          >
              <Tabs data={values(companyData)} type={TabsType.company}/>
          </Panel>
      </Section>

  )
}

export default observer(CompanyPage)
