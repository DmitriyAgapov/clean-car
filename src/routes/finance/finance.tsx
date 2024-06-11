import React, { useEffect } from 'react'
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelColor, PanelRouteStyle, PanelVariant } from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import Button, { ButtonDirectory, ButtonSizeType, ButtonVariant } from 'components/common/ui/Button/Button'
import { useStore } from 'stores/store'
import { observer, useLocalStore } from 'mobx-react-lite'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import TableWithSortNew from 'components/common/layout/TableWithSort/TableWithSortNew'
import useSWR from 'swr'
import { LocalRootStore } from 'stores/localStore'
import { useDidUpdate, useViewportSize } from '@mantine/hooks'
import { NumberFormatter } from '@mantine/core'
import { FilterData } from 'components/common/layout/TableWithSort/DataFilter'
import agent from "utils/agent";

const localRootStore =  new LocalRootStore()
const FinanceBottom = observer((props: { data: any }) => {
    const { width, height } = useViewportSize()
    const store = useStore()
    const [open, setOpen] = React.useState<boolean>(false);
    if (width < 1024) {
        return (
          <Panel

            variant={PanelVariant.suffixFooter}
            background={PanelColor.withSuffix}
            footerClassName={'!p-2 !pt-4 '}
            bodyClassName={'!pt-0 !pb-0'}
            className={`top-0 !grid-cols-1 mobile_total_block ${open ? " open-state" : " close-state"} !border-gray-2 !border relative z-50`}
            footer={  <Button className={'w-full'} action={() => setOpen(prevState => !prevState)} type={'button'} text={open ? 'Свернуть отчет' : 'Развернуть отчет'} size={ButtonSizeType.sm} variant={ButtonVariant["accent"]}/>}
          >
              <ul className={'grid col-span-full !gap-0'}>

                      <li className={"finance_part finance_part__header"}>
                          <ul>
                              <li></li>
                              <li>Заявки</li>
                              <li>Всего</li>
                          </ul>

                      </li>
                      <li className={"finance_part"}>
                          <ul>
                              <li className={'finance_part__title'}>Заказчик</li>
                              <li>{props.data?.total.total_customers.total_count}
                              </li>
                              <li>
                                  <NumberFormatter thousandSeparator={" "}
                                    suffix=" ₽"
                                    value={props.data?.total.total_customers.total_sum} />
                              </li>
                          </ul>
                          <ul>
                              <li>Шиномонтаж</li>
                              <li>{props.data?.total.total_customers.tire_count}
                              </li>
                              <li>
                                  <NumberFormatter thousandSeparator={" "}
                                    suffix=" ₽"
                                    value={props.data?.total.total_customers.tire_total_sum} />
                              </li>
                          </ul>
                          <ul>
                              <li>Мойка</li>
                              <li>{props.data?.total.total_customers.wash_count}</li>
                              <li>
                                  <NumberFormatter thousandSeparator={" "}
                                    suffix=" ₽"
                                    value={props.data?.total.total_customers.wash_total_sum} />
                              </li>
                          </ul>
                          <ul>
                              <li>Эвакуация</li>
                              <li>{props.data?.total.total_customers.evac_count}
                              </li>
                              <li>
                                  <NumberFormatter thousandSeparator={" "}
                                    suffix=" ₽"
                                    value={props.data?.total.total_customers.evac_total_sum} />
                              </li>
                          </ul>


                      </li>
                      <li className={"finance_part"}>
                          <ul>
                              <li  className={'finance_part__title'}>Партнер</li>
                              <li>{props.data?.total.total_performers.total_count}
                              </li>
                              <li>
                                  <NumberFormatter thousandSeparator={" "}
                                    suffix=" ₽"
                                    value={props.data?.total.total_performers.total_sum} />
                              </li>
                          </ul>
                          <ul>
                              <li>Шиномонтаж</li>
                              <li>{props.data?.total.total_performers.tire_count}
                              </li>
                              <li>
                                  <NumberFormatter thousandSeparator={" "}
                                    suffix=" ₽"
                                    value={props.data?.total.total_performers.tire_total_sum} />
                              </li>
                          </ul>
                          <ul>
                              <li>Мойка</li>
                              <li>{props.data?.total.total_customers.wash_count}</li>
                              <li>
                                  <NumberFormatter thousandSeparator={" "}
                                    suffix=" ₽"
                                    value={props.data?.total.total_performers.wash_total_sum} />
                              </li>
                          </ul>
                          <ul>
                              <li>Эвакуация</li>
                              <li>{props.data?.total.total_performers.evac_count}
                              </li>
                              <li>
                                  <NumberFormatter thousandSeparator={" "}
                                    suffix=" ₽"
                                    value={props.data?.total.total_performers.evac_total_sum} />
                              </li>
                          </ul>


                      </li>
                      <li className={"finance_part"}>
                          <ul>
                              <li className={'finance_part__title'}>{store.appStore.appType ==="admin" ? "Прибыль" : "Итог"}</li>

                              <li>
                                  <NumberFormatter thousandSeparator={" "}
                                    suffix=" ₽"
                                    value={props.data?.total.profit.total_sum} />
                              </li>
                          </ul>
                          <ul>
                              <li>Шиномонтаж</li>

                              <li>
                                  <NumberFormatter thousandSeparator={" "}
                                    suffix=" ₽"
                                    value={props.data?.total.profit.tire_total_sum} />
                              </li>
                          </ul>
                          <ul>
                              <li>Мойка</li>
                              <li>
                                  <NumberFormatter thousandSeparator={" "}
                                    suffix=" ₽"
                                    value={props.data?.total.profit.wash_total_sum} />
                              </li>
                          </ul>
                          <ul>
                              <li>Эвакуация</li>

                              <li>
                                  <NumberFormatter thousandSeparator={" "}
                                    suffix=" ₽"
                                    value={props.data?.total.profit.evac_total_sum} />
                              </li>
                          </ul>


                      </li>


              </ul>
          </Panel>
        )
    }
    return (
        <>

            <Panel variant={PanelVariant.suffixFooter}
              background={PanelColor.withSuffix}>
                <ul className={"finance_total_headers col-span-2"}>
                    <li>
                        <span data-directory={ButtonDirectory.customer}></span>Итог Заказчик
                    </li>
                    <li>
                        <span data-directory={ButtonDirectory.performer}></span>Итог Партнер
                    </li>
                    <li className={"text-accent uppercase"}>{store.appStore.appType === "admin" ? "Прибыль" : "Итог"}</li>
                </ul>
                <ul className={"finance_total_tire"}
                  data-content-type={"values"}>
                    <li>
                        {props.data?.total.total_performers.tire_count} /{" "}
                        <NumberFormatter className={"text-accent"}
                          thousandSeparator={" "}
                          suffix=" ₽"
                          value={props.data?.total.total_customers.tire_total_sum} />
                    </li>
                    <li>
                        {props.data?.total.total_performers.tire_count} /{' '}
                        <NumberFormatter
                            className={'text-accent'}
                            thousandSeparator={' '}
                            suffix=' ₽'
                            value={props.data?.total.total_performers.tire_total_sum}
                        />
                    </li>
                    <li className={'text-accent uppercase'}>
                        <NumberFormatter
                            className={'text-accent'}
                            thousandSeparator={' '}
                            suffix=' ₽'
                            value={props.data?.total.profit.tire_total_sum}
                        />
                    </li>
                </ul>
                <ul className={'finance_total_wash'} data-content-type={'values'}>
                    <li>
                        {props.data?.total.total_customers.wash_count} /{' '}
                        <NumberFormatter
                            className={'text-accent'}
                            thousandSeparator={' '}
                            suffix=' ₽'
                            value={props.data?.total.total_customers.wash_total_sum}
                        />
                    </li>
                    <li>
                        {props.data?.total.total_performers.wash_count} /{' '}
                        <NumberFormatter
                            className={'text-accent'}
                            thousandSeparator={' '}
                            suffix=' ₽'
                            value={props.data?.total.total_performers.wash_total_sum}
                        />
                    </li>
                    <li className={'text-accent uppercase'}>
                        <NumberFormatter
                            className={'text-accent'}
                            thousandSeparator={' '}
                            suffix=' ₽'
                            value={props.data?.total.profit.wash_total_sum}
                        />
                    </li>
                </ul>
                <ul className={'finance_total_evac'} data-content-type={'values'}>
                    <li>
                        {props.data?.total.total_customers.evac_count} /{' '}
                        <NumberFormatter
                            className={'text-accent'}
                            thousandSeparator={' '}
                            suffix=' ₽'
                            value={props.data?.total.total_customers.evac_total_sum}
                        />
                    </li>
                    <li>
                        {props.data?.total.total_performers.evac_count} /{' '}
                        <NumberFormatter
                            className={'text-accent'}
                            thousandSeparator={' '}
                            suffix=' ₽'
                            value={props.data?.total.total_performers.evac_total_sum}
                        />
                    </li>
                    <li className={'text-accent uppercase'}>
                        <NumberFormatter
                            className={'text-accent'}
                            thousandSeparator={' '}
                            suffix=' ₽'
                            value={props.data?.total.profit.evac_total_sum}
                        />
                    </li>
                </ul>
                <ul className={'finance_total'} data-content-type={'values'}>
                    <li>
                        {props.data?.total.total_customers.total_count} /
                        <NumberFormatter
                            thousandSeparator={' '}
                            suffix=' ₽'
                            value={props.data?.total.total_customers.total_sum}
                        />
                    </li>
                    <li>
                        {props.data?.total.total_performers.total_count} /{' '}
                        <NumberFormatter
                            thousandSeparator={' '}
                            suffix=' ₽'
                            value={props.data?.total.total_performers.total_sum}
                        />
                    </li>
                    <li className={'text-accent uppercase'}>
                        <NumberFormatter
                            className={'text-accent'}
                            thousandSeparator={' '}
                            suffix=' ₽'
                            value={props.data?.total.profit.total_sum}
                        />
                    </li>
                </ul>
            </Panel>
        </>
    )
})

const FinacePage = () => {
  const location = useLocation()
  const localStore = useLocalStore<LocalRootStore>(() => localRootStore)
  const store = useStore()

  const _p = localStore.params.getSearchParams
  React.useEffect(() => {
    console.log(_p);
    console.log(new Date().getMonth())
  }, [_p])
  const {isLoading, data, mutate} = useSWR(['report', localStore.params.getSearchParams] , ([url, args]) => store.financeStore.getReport(undefined,args))

  useEffect(() => {
    localStore.setData = {
      ...data,
      results: data?.results?.map((item:any) => ({...{
          company_name: item.name,
        company_type: item.type,
        tire: `${item.tire_count} / ${item.tire_total_sum} ₽`,
        wash: `${item.wash_count} / ${item.wash_total_sum} ₽`,
        evac: `${item.evac_count} / ${item.evac_total_sum} ₽`,
        total: `${item.total_count} / ${item.total_sum} ₽`
    }, ...item.has_child && {
        id: item.id}
      , attributes: {
          ...item
      }
      }))}
    localStore.setIsLoading = isLoading
  },[data])

  useDidUpdate(
    () => {
      if(location.pathname === '/account/finance/report') {
        mutate()
      }
    },
    [location.pathname]
  );
  if(store.appStore.appType !== "admin") return  <Navigate to={`${store.userStore.myProfileData.company.id}`}/>

  if ('/account/finance/report' !== location.pathname) return <Outlet />
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
        <TableWithSortNew store={localRootStore}
          variant={PanelVariant.dataPaddingWithoutFooter}
          search={true}

          style={PanelRouteStyle.finance}
          background={PanelColor.glass}
          className={'col-span-full table-groups tablet-max:pb-28'}
          initFilterParams={[FilterData.is_active, FilterData.city, FilterData.start_date, FilterData.end_date]}
          filter={true}
          state={isLoading}
          ar={[
            { label: 'Компания', name: 'company' },
            { label: 'Тип компании', name: 'company_type' },
            { label: 'Шиномонтаж', name: 'tire' },
            { label: 'Мойка', name: 'wash' },
            { label: 'Эвакуация', name: 'evac' },
            { label: 'Всего', name: 'total' },
          ]} />
        <FinanceBottom data={data} />
      </Section>
  )
}

export default observer(FinacePage)
