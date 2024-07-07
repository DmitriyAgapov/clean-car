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
import { SvgBackArrow } from "components/common/ui/Icon";

const localRootStore =  new LocalRootStore()
localRootStore.params.setSearchParams({
  // page: 1,
  // page_size: 10,
  // start_date: dayjs().set('date', 1).format("YYYY-MM-DD"),
})

const financeByTypeAndTypeId = () => {
  const location = useLocation()
  const localStore = useLocalObservable<LocalRootStore>(() => localRootStore)
  const store = useStore()

  const navigate = useNavigate()
  const params = useParams()
  const {isLoading, data, mutate} = useSWR([`by-type/${params.service_type}`,localStore.params.getSearchParams], ([url, args]) => agent.Balance.getServiceReportByType(params.service_type as string, args).then(r => r.data))
  const ar = React.useMemo(() => {
    const init = [
      { label: 'Дата', name: 'date' },
      { label: 'Заявка', name: 'bid_id' },
      { label: 'Партнер', name: 'partner' },
      { label: 'Заказчик', name: 'company' },
      { label: 'Адрес', name: 'address' }
    ]
    data?.results.forEach((el:any) => {
        const {id, date, bid_id, partner, company, address, amount, ...props} = el;

        for(const key in props) {
          let t:{label: string, name: string}|undefined  = init.filter((el:any) => el.label == key)[0]

          !t ?  init.push({label: key, name: key[props]}) : null
        }
    })
    init.push(  { label: 'Итог', name: 'amount' },)
    if(!data || data?.results.length === 0) return []
    return init
  }, [data])
  useEffect(() => {
    const _data = {
      ...data,
      results: data?.results?.map((item:any) =>{
        const {id, date, bid_id, partner, company, address, amount, ...props} = item;
        return ({
          // idNum: item.bid_id,
          date: dayjs(item.date).format('DD.MM.YY'),
          bid_id: `№ ${item.bid_id}`,
          partner: item.partner,
          company: item.company,
          address: item.address,
          ...props,
          total_amount: item.amount + " ₽",
        })
      })}
    if(data && _data) {
      const _res = _data.results;
      const {bids_count, total_amount, ...props} = data.total
      _res.push({wrapper: ""})
      _res.push({total_total_label: "Итого", bids_count: bids_count, ...props, total_amount: total_amount + " ₽"})

      localStore.setData = {
        ..._data,
        results: _res
      }
    }

    localStore.setIsLoading = isLoading
  },[data])
  console.log(localStore.data)
  useDidUpdate(
    () => {
      if(location.pathname === `/account/finance/by-type/${params.service_type}`) {
        mutate()
      }
    },
    [location.pathname]
  );
  if(store.appStore.appType !== "admin") return  <Navigate to={`${store.userStore.myProfileData.company.id}`}/>

  if (!location.pathname.includes(`/account/finance/by-type/${params.service_type}`)) return <Outlet />
  return (
      <Section type={SectionType.withSuffix}>
        <Panel headerClassName={'flex justify-between'}
          variant={PanelVariant.withGapOnly}
          header={
            <>
              <div>
                <Button
                  text={
                    <>
                      <SvgBackArrow />
                      Назад к компании
                    </>
                  }
                  className={
                    'flex flex-[1_100%] items-center gap-2 font-medium text-[#606163] hover:text-gray-300 leading-none !mb-5'
                  }
                  action={() => navigate(-1)}
                  variant={ButtonVariant.text}
                />
              <Heading text={'Отчет по заявкам'}
                variant={HeadingVariant.h1}
                className={'inline-block !mb-0'}
                color={HeadingColor.accent} />
              </div>
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
          style={PanelRouteStyle.financeByTypeServiceId}
          background={PanelColor.glass}
          className={'col-span-full table-groups tablet-max:pb-28'}
          initFilterParams={[FilterData.is_active, FilterData.city, FilterData.start_date, FilterData.end_date]}
          filter={true}
          state={isLoading}
          ar={ar} />
      </Section>
  )
}

export default observer(financeByTypeAndTypeId)
