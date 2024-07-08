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
  const params = useParams()
  const {isLoading, data, mutate} = useSWR([`by-type/${params.service_type}/${params.company_id}`,localStore.params.getSearchParams], ([url, args]) => agent.Balance.getServiceReportByTypeAndCompany(params.service_type as string,params.company_id as string, args).then(r => r.data))

  const ar = React.useMemo(() => {

    const init = [
      { label: 'Дата', name: 'date' },
      { label: 'Заявка', name: 'bid_id' },
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
    if(itemWithProps) {
      const { id, date, bid_id, user, company, amount, description, purpose, ...otherProps } = itemWithProps[0]
      purposeRes = Object.fromEntries(Object.entries(otherProps))
      console.log(purposeRes);
    }
    console.log(purposeRes);
    localStore.setData = {
      ...data,
      results: data?.results?.map((item: any, index: number) => {
        const { id, date, bid_id, user, company, amount, description, purpose, ...props } = item

       if(data?.results?.length > index && bid_id !== "") {
         return {
             date: dayjs(date).format('DD.MM.YY'),
             bid_id: `№ ${bid_id}`,
             executor: user?.last_name[0] + '.' + ' ' + user?.first_name,
             company: company?.name,
             ...props,
             purpose: "-",
             description: description,
             total_amount: (amount + ' ₽')[0] === "-" ? String(amount + ' ₽').slice(1) : amount + ' ₽',
         }
       } else {
         console.log(purpose > 3);
         let _r = {}
         for (const key in purposeRes) {
           console.log(key);
           _r = {
             ..._r,
             [key]: ""
           }
         }
         console.log(purpose > 3 ? "-" + amount + ' ₽' : amount + ' ₽');
         return {
           date: dayjs(date).format('DD.MM.YY'),
           bid_id: ``,
           executor: "",
           company: company?.name,
           ..._r,
           purpose: purpose > 4 ? "-" + amount + ' ₽' : amount + ' ₽',
           description: description,
           total_amount: purpose > 4 ? "-" + amount + ' ₽' : amount + ' ₽',
         }
       }
      }),
    }
    if (data) {
      const { bids_count, total_amount, ...props } = data.total
      setFooter({ total_total_label: 'Итого', bids_count_v: bids_count, ...props, purpose: "", description: "", total_amount: (total_amount + ' ₽')[0] === "-" ? String(total_amount + ' ₽').slice(1) : total_amount + ' ₽', })

    }

    localStore.setIsLoading = isLoading
  }, [data])
  console.log(localStore.data);
  useDidUpdate(
    () => {
      if(location.pathname === `/account/finance/by-type/${params.service_type}/${params.company_id}`) {
        mutate()
      }
    },
    [location.pathname]
  );
  if(store.appStore.appType !== "admin") return  <Navigate to={`${store.userStore.myProfileData.company.id}`}/>

  if (!location.pathname.includes(`/account/finance/by-type/${params.service_type}/${params.company_id}`)) return <Outlet />
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
          footerProps={_footer}
          footerClassName={"table width-full"}
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

export default observer(FinanceByTypeAndTypeIdAndCompany)
