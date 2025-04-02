import React, { useEffect } from "react";
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelColor, PanelRouteStyle, PanelVariant } from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import { ButtonDirectory, ButtonSizeType } from 'components/common/ui/Button/Button'
import { useStore } from 'stores/store'
import LinkStyled from 'components/common/ui/LinkStyled/LinkStyled'
import { Outlet, useLocation } from "react-router-dom";
import TableWithSortNew from "components/common/layout/TableWithSort/TableWithSortNew";
import { observer, useLocalObservable } from "mobx-react-lite";
import { LocalRootStore } from "stores/localStore";
import useSWR from "swr";
import { useDidUpdate } from "@mantine/hooks";
import { FilterData } from "components/common/layout/TableWithSort/DataFilter";
import { flattenCompanies } from "utils/utils";


const localRootStore =  new LocalRootStore()
localRootStore.params.setSearchParams({page_size: 10})
const FilialsPage = () => {

  const store = useStore()
  const location = useLocation()

  const localStore = useLocalObservable<LocalRootStore>(() => localRootStore)

  const isReadyy = localStore.params.getIsReady
  const {isLoading, data, mutate} = useSWR(isReadyy ? ['filials', localStore.params.getSearchParams] : null , ([url, args]) => store.companyStoreNew.loadFilialsList(args))
  useDidUpdate(
    () => {
      if(location.pathname === '/account/filials') {
        mutate()
      }
    },
    [location.pathname]
  );
  // @ts-ignore
  useEffect(() => {
    let ar = data?.results;
    if(data?.results && data?.results?.length == 1 && data?.results[0].children && !store.userStore.isAdmin) {
      // @ts-ignore
      ar = flattenCompanies(data?.results)
    }
    localStore.setData = {
      ...data,
      results: ar?.map((item: any) => ({
        status: item.is_active as boolean,
        company: item.name,
        city: item.city.name,
        type: item.company_type || store.userStore.myProfileData.company.company_type,
        parent: item.parent?.name || store.userStore.myProfileData.company.name,
        id: item.id,
        query: {
          company_id: item.parent?.id || store.userStore.myProfileData.company.id
        }
      }))}
    localStore.setIsLoading = isLoading
  },[data])

  if ('/account/filials' !== location.pathname) return <Outlet />
  if (location.pathname.includes('edit')) return <Outlet />
  return (
    <Section type={SectionType.default}>
      <Panel
        headerClassName={'flex justify-between'}
        variant={PanelVariant.withGapOnly}
        header={
          <>
            <Heading
              text={'Филиалы'}
              variant={HeadingVariant.h1}
              className={'inline-block'}
              color={HeadingColor.accent}
            />
            <LinkStyled
              text={'Создать филиал'}
              to={'create'}
              className={'inline-flex'}
              directory={ButtonDirectory.directory}
              size={ButtonSizeType.sm}
            />
          </>
        }
      />
      <TableWithSortNew
        store={localRootStore}
        variant={PanelVariant.dataPadding}
        search={true}
        className={'col-span-full table-groups table-bids'}
        style={PanelRouteStyle.filials}
        background={PanelColor.glass}
        filter={true}
        initFilterParams={[FilterData.city__id, FilterData.company_type_c]}
        state={false}
        ar={[{ label: 'Статус', name: 'is_active' }, {label: 'Компания', name: 'name'},  { label: 'Город', name: 'city' }, {label: 'Тип', name: 'company_type'},{ label: 'Принадлежит', name: 'parent'}]}     />
    </Section>
  )
}

export default observer(FilialsPage)
