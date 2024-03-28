import React from 'react'
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelColor, PanelRouteStyle, PanelVariant } from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import Button, { ButtonDirectory, ButtonSizeType } from 'components/common/ui/Button/Button'
import { useStore } from 'stores/store'
import { observer } from 'mobx-react-lite'
import { Outlet, useLoaderData, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { PermissionNames } from 'stores/permissionStore'
import TableWithSortNew from 'components/common/layout/TableWithSort/TableWithSortNew'
import agent from "utils/agent";

const CompaniesPage = () => {
  const store = useStore()
  const location = useLocation()
  const navigate = useNavigate()
  let [searchParams, setSearchParams] = useSearchParams('page=1&page_size=10')
  const {isLoading, data, error} = agent.Companies.getOnlyAllCompaniesNew(searchParams.toString())
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
        total={data?.count}
        variant={PanelVariant.dataPadding}
        search={true}
        style={PanelRouteStyle.company}
        background={PanelColor.glass}
        className={'col-span-full table-groups'}
        filter={false}
        data={data?.results?.filter((item:any) => item.parent === null).map((item: any) => ({
          status: item.is_active as boolean,
          company: item.name,
          type: item.company_type,
          city: item.city.name,
          id: item.id
        }))}

        state={isLoading}
        ar={[{ label: 'Статус', name: 'is_active' }, {label: 'Компания', name: 'name'}, {label: 'Тип', name: 'company_type'},{ label: 'Город', name: 'city' }]}
      />
    </Section>
  )
}

export default observer(CompaniesPage)
