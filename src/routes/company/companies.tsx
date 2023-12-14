import React from 'react'
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelRouteStyle } from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import { ButtonDirectory, ButtonSizeType } from 'components/common/ui/Button/Button'
import { useStore } from 'stores/store'
import { observer } from 'mobx-react-lite'
import TableWithSort from 'components/common/layout/TableWithSort/TableWithSort'
import LinkStyled from 'components/common/ui/LinkStyled/LinkStyled'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

const CompaniesPage = () => {
  const store = useStore()
  const location = useLocation()
  const navigate = useNavigate()
  if ('/account/companies' !== location.pathname) return <Outlet />
  return (
    <Section type={SectionType.default}>
      <Panel
        className={'col-span-full'}
        header={
          <>
            <Heading
              text={'Компании'}
              variant={HeadingVariant.h1}
              className={'!mb-6 inline-block'}
              color={HeadingColor.accent}
            />
            <LinkStyled
              text={'Создать компанию'}
              to={'create'}
              // action={() => store.companyStore.addCompany()}
              className={'float-right'}
              directory={ButtonDirectory.directory}
              size={ButtonSizeType.sm}
            />
          </>
        }
      />

      <TableWithSort
        filter={true}
        search={true}
        style={PanelRouteStyle.company}
        ar={['Статус', 'Компания', 'Тип', 'Город']}
        data={store.companyStore.companies.map((item: any) => ({
          status: item.is_active as boolean,
          company: item.name,
          type: item.company_type,
          city: item.city.name,
          id: item.profile_id,
        }))}
        state={store.companyStore.loadingCompanies}
      />
    </Section>
  )
}

export default observer(CompaniesPage)
