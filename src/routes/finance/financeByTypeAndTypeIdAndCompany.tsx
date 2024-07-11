import React, { useEffect } from 'react'
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelColor, PanelRouteStyle, PanelVariant } from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import Button, { ButtonSizeType, ButtonVariant } from 'components/common/ui/Button/Button'
import { useStore } from 'stores/store'
import { observer, useLocalObservable } from 'mobx-react-lite'
import { Navigate, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import TableWithSortNew from 'components/common/layout/TableWithSort/TableWithSortNew'
import useSWR from 'swr'
import { LocalRootStore } from 'stores/localStore'
import { useDidUpdate } from '@mantine/hooks'
import { FilterData } from 'components/common/layout/TableWithSort/DataFilter'
import agent from 'utils/agent'
import dayjs from 'dayjs'
import { SvgBackArrow } from 'components/common/ui/Icon'
import { PurposeOfTransaction } from "components/common/layout/Modal/UpBalance";

const localRootStore =  new LocalRootStore()
localRootStore.params.setSearchParams({
  // page: 1,
  // page_size: 10,
  // start_date: dayjs().set('date', 1).format("YYYY-MM-DD"),
})

const FinanceByTypeAndTypeIdAndCompany = () => {
  const location = useLocation()
  const localStore = useLocalObservable<LocalRootStore>(() => localRootStore)
  const store = useStore()
  const navigate = useNavigate()
  const searchParams = localStore.params.getSearchParams
  const getClean = localStore.params.getClean
  const params = useParams()
  const {isLoading, data, mutate} = useSWR([`by-type/${params.service_type}/${params.company_id}`,localStore.params.getSearchParams], ([url, args]) => agent.Balance.getServiceReportByTypeAndCompany(params.service_type as string,params.company_id as string, args).then(r => r.data))
 React.useEffect(() => {
   if(location.state) {
     const {company_city, ...state} = location.state
     const _res = {...(company_city ? {balance__company__city: company_city} : {}), ...state}

     localStore.params.setSearchParams(_res, true)
   } else if(!location.state) {

     localStore.params.setSearchParams({
       // start_date: dayjs().set('date', 1).format("YYYY-MM-DD"),
     }, true)
   }
 }, [location.state])
  const ar = React.useMemo(() => {

    const init = [
      { label: 'Дата', name: 'created' },// работает
      { label: 'Заявка', name: 'bid_id' }, // работает
      { label: 'Исполнитель', name: 'executor' },
      { label: 'Компания', name: 'company' }
    ]
    data?.results.forEach((el: any) => {
      const { id, date, bid_id, partner, company, user, amount, description, purpose, ...props } = el
      for (const key in props) {
        let t: { label: string; name: string } | undefined = init.filter((el: any) => el.label == key)[0]

        !t ? init.push({ label: key, name: key[props] }) : null
      }
    })
    init.push({ label: 'Бонус/Штраф', name: 'purpose' })
    init.push({ label: 'Комментарий', name: 'description' })
    init.push({ label: 'Итог', name: 'amount' })
    if (!data || data?.results.length === 0) return []
    return init
  }, [data])

  const [_footer, setFooter] = React.useState<any>(null)

  useEffect(() => {
    const itemWithProps  = data?.results?.filter((el:any) => el.bid_id !== "")
    let purposeRes:any
    if(itemWithProps && itemWithProps.length && itemWithProps.length > 0) {
      const { id, date, bid_id, user, company, amount, description, purpose, ...otherProps } = itemWithProps[0]
      purposeRes = Object.fromEntries(Object.entries(otherProps))

    }
    console.log(data);
    localStore.setData = {
      ...data,
      results: data?.results?.map((item: any, index: number) => {
        const { id, date, bid_id, user, company, amount, description, purpose, ...props } = item

       if(data?.results?.length > index && bid_id !== "") {
         return {
             date: dayjs(date).format('DD.MM.YY'),
             bid_id: `№ ${bid_id}`,
             executor: user?.last_name[0] + '.' + ' ' + user?.first_name,
             company: company,
             ...props,
             bonus: purpose ? PurposeOfTransaction[purpose] : "-",
             description: description,
             total_amount: (amount + ' ₽')[0] === "-" ? String(amount.toFixed(2) + ' ₽').slice(1) : amount.toFixed(2) + ' ₽',
         }
       } else {
         let _r = {}
         for (const key in purposeRes) {
           _r = {
             ..._r,
             [key]: ""
           }
         }
         return {
           date: dayjs(date).format('DD.MM.YY'),
           bid_id: ``,
           executor: "",
           company: company?.name,
           ..._r,
           bonus: amount + ' ₽',
           description: description,
           total_amount: amount.toFixed(2) + ' ₽',
         }
       }
      }),
    }
    if (data) {
      const {bonus, total_amount,  ...props } = data.total
      setFooter({ total_total_label: 'Итого', bids_count_v: "", ...props, bonus: bonus , description: "", total_amount: Math.abs(total_amount).toFixed(2) + ' ₽' })
    }
    localStore.setIsLoading = isLoading
  }, [data])

  useDidUpdate(
    () => {
      if(location.pathname === `/account/finance/by-type/${params.service_type}/${params.company_id}`) {
        mutate()
      }
    },
    [location.pathname]
  );
  if(store.appStore.appType !== "admin") return  <Navigate to={`${store.userStore.myProfileData.company.id}`}/>

  // if (location.pathname !== `/account/finance/by-type/${params.service_type}/${}`) return <Outlet />
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
                      Назад
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
                action={async () => await agent.Balance.getExportServiceReportByTypeAndCompany(params.service_type as string, params.company_id as string, localStore.params.getSearchParams)}
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
          footerHeight={"7rem"}
          footerProps={_footer}
          view={true}
          autoScroll={true}
          style={PanelRouteStyle.financeByTypeServiceId}
          background={PanelColor.glass}
          className={'col-span-full table-groups tablet-max:pb-8 self-stretch'}
          initFilterParams={[FilterData.is_active, FilterData.city, FilterData.start_date, FilterData.end_date]}
          filter={true}
          state={isLoading}
          ar={ar} />
      </Section>
  )
}

export default observer(FinanceByTypeAndTypeIdAndCompany)
