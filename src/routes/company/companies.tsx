import React from 'react'
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelColor, PanelRouteStyle, PanelVariant } from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import Button, { ButtonDirectory, ButtonSizeType } from 'components/common/ui/Button/Button'
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
  if (location.pathname.includes('edit')) return <Outlet />
  return (
    <Section type={SectionType.default}>
      <Panel
        headerClassName={'flex justify-between'}
        variant={PanelVariant.withGapOnly}
        header={
          <>
            <Heading
              text={'Компании'}
              variant={HeadingVariant.h1}
              className={'inline-block'}
              color={HeadingColor.accent}
            />
            <Button
              text={'Создать компанию'}
              action={() => navigate('create')}
              trimText={true}
              // action={() => store.companyStore.addCompany()}
              className={'inline-flex'}
              directory={ButtonDirectory.directory}
              size={ButtonSizeType.sm}
            />
          </>
        }
      />
      <TableWithSort
        filter={true}
        search={true}
        background={PanelColor.glass}
        style={PanelRouteStyle.company}
        ar={['Статус', 'Компания', 'Тип', 'Город']}
        data={store.companyStore.companies.map((item: any) => ({
          status: item.is_active as boolean,
          company: item.name,
          type: item.company_type,
          city: item.city.name,
          id: item.id,
        }))}
        initFilterParams={[{label: 'Статус', value: 'status'}, {label: 'Город', value:  'city'}]}
        state={store.companyStore.loadingCompanies}
      />
    </Section>
  )
}

export default observer(CompaniesPage)
