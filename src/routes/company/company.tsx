import React from 'react'
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelColor, PanelVariant } from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingDirectory, HeadingVariant } from 'components/common/ui/Heading/Heading'
import { ButtonVariant } from 'components/common/ui/Button/Button'
import { useStore } from 'stores/store'
import { observer } from 'mobx-react-lite'
import LinkStyled from 'components/common/ui/LinkStyled/LinkStyled'
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom'
import Tabs from 'components/common/layout/Tabs/Tabs'
import { dateTransform } from 'utils/utils'

const CompanyPage = () => {
  const store = useStore()
  const location = useLocation()
  const { id, type }:any = useLoaderData()
  const navigate = useNavigate()
  const companyData = store.companyStore.getCompanyFullData(id)
  const { company, address, application_type,  company_type, contacts, created,inn, legal_address, ogrn, service_percent, updated } = companyData

  return (
      <Section type={SectionType.default}>
          <Panel
              className={'col-span-full'}
              header={
                  <>
                      <Heading
                          text={'Компания'}
                          variant={HeadingVariant.h1}
                          className={'!mb-6 inline-block'}
                          color={HeadingColor.accent}
                      />
                      <LinkStyled
                          text={'Редактировать'}
                          to={'edit'}
                          // action={() => store.companyStore.addCompany()}
                          className={'float-right'}
                          variant={ButtonVariant.default}
                      />
                  </>
              }
          />

          <Panel
              className={'col-span-full grid grid-rows-[auto_1fr_auto]'}
              variant={PanelVariant.default}
              background={PanelColor.glass}
              footerClassName={'px-6 pt-2 pb-6 flex  justify-end'}
              headerClassName={'px-8 pt-8 pb-4 border-bottom-none'}
              header={
                  <>
                      <Heading text={company.name} variant={HeadingVariant.h2} color={HeadingColor.accent} />
                      <div className={'text-xs text-gray-2'}>
                          Дата и время регистрации: <span>{dateTransform(updated).date}</span>
                      </div>
                    <div className={'flex'}>
                      <Heading text={company.is_active ? "Активен" : "Не активна"} variant={HeadingVariant.h3} directory={HeadingDirectory.executor}/>
                      <Heading text={application_type} variant={HeadingVariant.h3} directory={HeadingDirectory.executor}/>
                      <Heading text={company.city.name} variant={HeadingVariant.h3} directory={HeadingDirectory.executor}/>
                    </div>
                  </>
              }
          >
              <Tabs data={[ { label: 'Основная информация', value: companyData }, { label: 'Филиалы', value: companyData }, { label: 'Сотрудники', value: companyData }, {label: 'Автомобили', value: companyData}, {label: 'Лимиты', value: companyData}, {label: 'прайс-лист', value: companyData}, {label: 'История заявок', value: companyData}, {label: 'История начислений', value: companyData} ]}/>
          </Panel>
      </Section>
  )
}

export default observer(CompanyPage)
