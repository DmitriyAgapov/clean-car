import React, { useEffect } from "react";
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelColor, PanelRouteStyle, PanelVariant } from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import Button, { ButtonDirectory, ButtonSizeType } from 'components/common/ui/Button/Button'
import { useStore } from 'stores/store'
import { observer, useLocalStore } from "mobx-react-lite";
import { Outlet, useLoaderData, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { PermissionNames } from 'stores/permissionStore'
import TableWithSortNew from 'components/common/layout/TableWithSort/TableWithSortNew'
import agent, { client } from "utils/agent";
import useSWR from "swr";
import { createParams, dateTransformShort } from "utils/utils";
import { TableWithSortStore } from "components/common/layout/TableWithSort/TableWithSort.store";
import {  LocalRootStore } from "stores/localStore";
import userStore from "stores/userStore";

const localRootStore =  new LocalRootStore()

const CompaniesPage = () => {
  const location = useLocation()
  const localStore = useLocalStore<LocalRootStore>(() => localRootStore)
  const store = useStore()
  const navigate = useNavigate()

  const {isLoading, data, error} = useSWR(['companies', localStore.params.getSearchParams] , ([url, args]) => client.companiesOnlyCompaniesList(args))
  useEffect(() => {
    localStore.setData = {
      ...data,
      results: data?.results?.map((item:any) => ({
        status: item.is_active as boolean,
        company: item.name,
        type: item.company_type,
        city: item.city.name,
        id: item.id
      }))}
    localStore.setIsLoading = isLoading
  },[data])

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
        store={localRootStore}
        variant={PanelVariant.dataPadding}
        search={true}
        style={PanelRouteStyle.company}
        background={PanelColor.glass}
        className={'col-span-full table-groups'}
        filter={false}
        state={isLoading}
        ar={[{ label: 'Статус', name: 'is_active' }, {label: 'Компания', name: 'name'}, {label: 'Тип', name: 'company_type'},{ label: 'Город', name: 'city' }]}
      />
    </Section>
  )
}

export default observer(CompaniesPage)
