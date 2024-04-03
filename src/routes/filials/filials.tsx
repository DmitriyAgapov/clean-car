import React, { useEffect } from "react";
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelColor, PanelRouteStyle, PanelVariant } from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import { ButtonDirectory, ButtonSizeType } from 'components/common/ui/Button/Button'
import { useStore } from 'stores/store'
import LinkStyled from 'components/common/ui/LinkStyled/LinkStyled'
import { Outlet, useLoaderData, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import TableWithSortNew from "components/common/layout/TableWithSort/TableWithSortNew";
import companyStore from "stores/companyStore";
import { observer, useLocalStore } from "mobx-react-lite";
import agent, { client } from "utils/agent";
import { LocalRootStore } from "stores/localStore";
import useSWR from "swr";
const localRootStore =  new LocalRootStore()
const FilialsPage = () => {
  const localStore = useLocalStore<LocalRootStore>(() => localRootStore)
  const store = useStore()
  const location = useLocation()
  const {isLoading, data, error} = useSWR(['filials', localStore.params.getSearchParams] , ([url, args]) => client.companiesOnlyBranchesList(args))
  useEffect(() => {
    localStore.setData = {
      ...data,
      results: data?.results?.map((item: any) => ({
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
              // action={() => store.companyStore.addCompany()}
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
        style={PanelRouteStyle.filials}
        background={PanelColor.glass}
        filter={true}
        state={isLoading}
        ar={[{ label: 'Статус', name: 'is_active' }, {label: 'Компания', name: 'name'},  { label: 'Город', name: 'city' }, {label: 'Тип', name: 'company_type'},{ label: 'Принадлежит', name: 'parent'}]}     />


    </Section>
  )
}

export default observer(FilialsPage)
