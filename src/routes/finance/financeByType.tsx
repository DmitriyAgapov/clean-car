import React, { useEffect } from 'react'
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelColor, PanelRouteStyle, PanelVariant } from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import Button, { ButtonDirectory, ButtonSizeType, ButtonVariant } from 'components/common/ui/Button/Button'
import { useStore } from 'stores/store'
import { observer, useLocalObservable } from 'mobx-react-lite'
import { Navigate, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import TableWithSortNew from 'components/common/layout/TableWithSort/TableWithSortNew'
import useSWR from 'swr'
import { LocalRootStore } from 'stores/localStore'
import { useDidUpdate, useViewportSize } from '@mantine/hooks'
import { NumberFormatter } from '@mantine/core'
import { FilterData } from 'components/common/layout/TableWithSort/DataFilter'
import agent, { PaginationProps } from "utils/agent";
import dayjs from 'dayjs'
import TableWithScroll from "components/common/layout/TableWithSort/TableWithScroll";

const localRootStore =  new LocalRootStore()
localRootStore.params.setSearchParams({
  // page: 1,
  // page_size: 10,
  // start_date: dayjs().set('date', 1).format("YYYY-MM-DD"),
})

const FinaceByTypePage = () => {
  const location = useLocation()
  const localStore = useLocalObservable<LocalRootStore>(() => localRootStore)
  const store = useStore()
  const isReadyy = localStore.params.getIsReady

  const params = useParams()

  const {isLoading, data, mutate} = useSWR(["by-type", localStore.params.getSearchParams], ([url, args]) => agent.Balance.getServiceReport(args).then(r => r.data))


  useEffect(() => {

    console.log(isReadyy,data);
    localStore.setData = {
      ...data,
      results: data?.results?.map((item:any) => ({
        id: item.id,
        service_type_name: item.name,
        bids_count: item.bids_count}))}
    localStore.setIsLoading = isLoading
  },[data])

  useDidUpdate(
    () => {
      if(location.pathname === '/account/finance/by-type') {
        mutate()
      }
    },
    [location.pathname]
  );
  console.log(localRootStore);
  if(store.appStore.appType !== "admin") return  <Navigate to={`${store.userStore.myProfileData.company.id}`}/>

  if (!location.pathname.includes('/account/finance/by-type')) return <Outlet />
  return (
      <Section type={SectionType.withSuffix}>
        <Panel headerClassName={'flex justify-between'}
          variant={PanelVariant.withGapOnly}
          header={
            <>
              <Heading text={'Отчет по заявкам'}
                variant={HeadingVariant.h1}
                className={'inline-block'}
                color={HeadingColor.accent} />
              <Button text={'Сохранить Excel'}
                action={async () => await agent.Balance.getBalanceExportReport(localStore.params.getSearchParams)}
                trimText={true}
                variant={ButtonVariant['accent-outline']}
                // action={() => store.companyStore.addCompany()}
                className={'inline-flex'}
                size={ButtonSizeType.sm} />
            </>
          } />
        <TableWithSortNew store={localStore}
          variant={PanelVariant.dataPaddingWithoutFooter}
          search={true}
          autoScroll={true}
          style={PanelRouteStyle.finance}
          background={PanelColor.glass}
          className={'col-span-full table-groups tablet-max:pb-28'}
          initFilterParams={[FilterData.is_active, FilterData.city, FilterData.start_date, FilterData.end_date]}
          filter={true}
          state={isLoading}
          ar={[
            { label: 'Услуга', name: 'service_type_name' },
            { label: 'Количество заявок', name: 'bids_count'}
          ]} />
      </Section>
  )
}

export default observer(FinaceByTypePage)
