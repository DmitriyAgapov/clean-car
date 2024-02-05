import React from 'react'
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelColor, PanelRouteStyle, PanelVariant } from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import Button, { ButtonDirectory, ButtonSizeType } from 'components/common/ui/Button/Button'
import { useStore } from 'stores/store'
import { observer } from 'mobx-react-lite'
import TableWithSort from 'components/common/layout/TableWithSort/TableWithSort'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { PermissionNames } from "stores/permissionStore";
import TableWithSortNew from "components/common/layout/TableWithSort/TableWithSortNew";

const CompaniesPage = () => {
  const store = useStore()
  const location = useLocation()
  const navigate = useNavigate()
  const { loading,companies, error } = store.companyStore.allCompanies;
  console.log({ loading,companies, error });
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
            {store.userStore.getUserCan(PermissionNames["Компании"], 'create') && <Button
              text={'Создать компанию'}
              action={() => navigate('create')}
              trimText={true}
              // action={() => store.companyStore.addCompany()}
              className={'inline-flex'}
              directory={ButtonDirectory.directory}
              size={ButtonSizeType.sm}
            />}
          </>
        }
      />
      <TableWithSortNew
        total={companies.length}
        variant={PanelVariant.dataPadding}
        search={true}
        background={PanelColor.glass}
        className={'col-span-full table-groups'}
        filter={false}
        data={companies.map((item: any) => ({
          status: item.is_active as boolean,
          company: item.name,
          type: item.company_type,
          city: item.city.name,
          id: item.id
        }))}
        initFilterParams={[{ label: 'Статус', value: 'status' }, { label: 'Город', value: 'city' }]}
        state={false}
        ar={[{ label: 'Статус', name: 'status' }, {label: 'Компания', name: 'company'}, {label: 'Тип', name: 'type'},{ label: 'Город', name: 'city' }]}
      />

      <TableWithSort
        filter={true}
        search={true}
        background={PanelColor.glass}
        style={PanelRouteStyle.company}
        ar={['Статус', 'Компания', 'Тип', 'Город']}
        data={companies.map((item: any) => ({
          status: item.is_active as boolean,
          company: item.name,
          type: item.company_type,
          city: item.city.name,
          id: item.id
        }))}
        initFilterParams={[{label: 'Статус', value: 'status'}, {label: 'Город', value:  'city'}]}
        state={store.companyStore.loadingCompanies
      }
      />
    </Section>
  )
}

export default observer(CompaniesPage)
