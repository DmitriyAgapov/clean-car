import React, { useEffect } from "react";
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelColor, PanelRouteStyle, PanelVariant } from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import Button, { ButtonDirectory, ButtonSizeType } from 'components/common/ui/Button/Button'
import { useStore } from 'stores/store'
import { observer, useLocalObservable, useLocalStore } from 'mobx-react-lite'
import { Outlet, useLoaderData, useLocation, useNavigate, useParams, useRevalidator, useSearchParams } from "react-router-dom";
import { PermissionNames } from 'stores/permissionStore'
import TableWithSortNew from 'components/common/layout/TableWithSort/TableWithSortNew'
import agent, { client } from "utils/agent";
import useSWR from "swr";
import { createParams, dateTransformShort } from "utils/utils";
import { TableWithSortStore } from "components/common/layout/TableWithSort/TableWithSort.store";
import {  LocalRootStore } from "stores/localStore";
import userStore from "stores/userStore";
import { useDidUpdate } from "@mantine/hooks";

const localRootStore =  new LocalRootStore()

const LimitsPage = () => {
  const location = useLocation()
  const localStore = useLocalObservable<LocalRootStore>(() => localRootStore)
  const store = useStore()
  const navigate = useNavigate()
  const revalidator =     useRevalidator()
  const isReadyy = localStore.params.getIsReady
  const {isLoading, data, mutate} = useSWR(isReadyy ? ['limits', localStore.params.getSearchParams] : null , ([url, args]) => store.limitStore.getAllLimits(args).then((res) => res.data))

  useEffect(() => {
    localStore.setData = {
      ...data,
      results: data?.results?.map((item:any) => ({
        status: item.is_active,
        company:  item.company.parent ? item.company.parent.name : item.company.name,

        city: item.city ? item.city.name : ' - ',
        company__parent: item.company.parent ? item.company.name : ' - ',
        employee: item.employee ? `${item.employee.first_name} ${item.employee.last_name}`  : ' - ',
        service_type: store.catalogStore.services.get(String(item.service_type)).name,
        is_day: item.is_day ? 'Дневной' : 'Месячный',
        amount: `${item.amount}/100`,
        id: item.id,
        query: {
          company_id: item.company.id,
        }
      }))}
    localStore.setIsLoading = isLoading
  },[data])

  useDidUpdate(
    () => {
      if(location.pathname === '/account/limits') {
        mutate().then(r => console.log('updated', r))
        revalidator.revalidate()
      }
    },
    [location.pathname]
  );
  if ('/account/limits' !== location.pathname) return <Outlet />
  if (location.pathname.includes('edit')) return <Outlet />

  return (
    <Section type={SectionType.default}>
      <Panel
        headerClassName={'flex justify-between'}
        variant={PanelVariant.withGapOnly}
        header={
          <>
            <Heading
              text={'Лимиты'}
              variant={HeadingVariant.h1}
              className={'inline-block'}
              color={HeadingColor.accent}
            />
            {store.userStore.getUserCan(PermissionNames["Управление лимитами"], 'create') && <Button
              text={'Создать лимит'}
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
        style={PanelRouteStyle.limits}
        background={PanelColor.glass}
        className={'col-span-full table-groups'}
        filter={false}
        state={isLoading}
        ar={[{ label: 'Статус', name: 'is_active' },{ label: 'Компания', name: 'company' }, {label: 'Город', name: 'city'},{ label: 'Филиал', name: 'company__parent' }, {label: 'Пользователь', name: 'employee'},{ label: 'Услуга', name: 'service_type' }, {label: 'Тип лимита', name: 'is_day'}, {label: 'Факт/Лимит', name: 'amount'}]}
      />
    </Section>
  )
}

export default observer(LimitsPage)
