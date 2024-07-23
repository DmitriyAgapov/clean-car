import React, { useEffect } from 'react'
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelColor, PanelRouteStyle, PanelVariant } from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import Button, { ButtonDirectory, ButtonSizeType, ButtonVariant } from "components/common/ui/Button/Button";
import { useStore } from 'stores/store'
import { observer, useLocalObservable } from 'mobx-react-lite'
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import TableWithSortNew from 'components/common/layout/TableWithSort/TableWithSortNew'
import useSWR from 'swr'
import { LocalRootStore } from 'stores/localStore'
import { useDidUpdate, useDisclosure, useViewportSize } from '@mantine/hooks'
import { NumberFormatter } from '@mantine/core';
import { SvgBackArrow } from "components/common/ui/Icon";
import { FilterData } from 'components/common/layout/TableWithSort/DataFilter'
import dayjs from 'dayjs';
import { UpBalance } from "components/common/layout/Modal/UpBalance";

const localRootStore =  new LocalRootStore()
localRootStore.params.setSearchParams({
    // page: 1,
    // page_size: 10,
    start_date: dayjs().set('date', 1).format('YYYY-MM-DD'),
})

function FinanceBottomID(props: { data: any, className?: string }) {
  const { width, height } = useViewportSize()
  const [open, setOpen] = React.useState<boolean>(false);
  const store = useStore()
    if(!width) return null
  if (width < 1024) {
    return (
        <Panel
            variant={PanelVariant.suffixFooter}
            background={PanelColor.withSuffix}
            footerClassName={'!p-2 !pt-4 '}
            bodyClassName={'!pt-0 !pb-0'}
            className={
                props.className +
                ' ' +
                `top-0 !grid-cols-1 mobile_total_block ${open ? ' open-state' : ' close-state'} !border-gray-2 !border relative z-50`
            }
            footer={
                <Button
                    className={'w-full'}
                    action={() => setOpen((prevState) => !prevState)}
                    type={'button'}
                    text={open ? 'Свернуть отчет' : 'Развернуть отчет'}
                    size={ButtonSizeType.sm}
                    variant={ButtonVariant['accent']}
                />
            }
        >
            <ul className={'grid col-span-full !gap-0'}>
                <li className={'finance_part finance_part__header'}>
                    <ul>
                        <li> {store.appStore.appType === 'admin' ? 'Прибыль' : 'Итог'}</li>
                    </ul>
                </li>
                <li className={'finance_part'}>
                    <ul>
                        <li className={'finance_part__title'}>
                            {store.appStore.appType === 'admin' ? 'Прибыль' : 'Итог'}
                        </li>

                        <li>
                            <NumberFormatter
                                thousandSeparator={' '}
                                suffix=' ₽'
                                value={props.data?.total.total_sum}
                            />
                        </li>
                    </ul>
                    <ul>
                        <li>Шиномонтаж</li>

                        <li>
                            <NumberFormatter
                                thousandSeparator={' '}
                                suffix=' ₽'
                                value={props.data?.total.tire_total_sum}
                            />
                        </li>
                    </ul>
                    <ul>
                        <li>Мойка</li>
                        <li>
                            <NumberFormatter
                                thousandSeparator={' '}
                                suffix=' ₽'
                                value={props.data?.total.wash_total_sum}
                            />
                        </li>
                    </ul>
                    <ul>
                        <li>Эвакуация</li>

                        <li>
                            <NumberFormatter
                                thousandSeparator={' '}
                                suffix=' ₽'
                                value={props.data?.total.evac_total_sum}
                            />
                        </li>
                    </ul>
                </li>
            </ul>
        </Panel>
    )
  }
    return (
        <Panel
          variant={PanelVariant.suffixFooter}
          background={PanelColor.withSuffix}
        >
            <ul className={'finance_total_headers col-span-2'}>
                <li className={'text-accent uppercase'}>
                    {store.appStore.appType === 'admin' ? 'Прибыль' : 'Итог'}
                </li>
            </ul>
            <ul className={'finance_total_tire'} data-content-type={'values'}>
                <li className={'text-accent uppercase'}>
                    <NumberFormatter
                        className={'text-accent'}
                        thousandSeparator={' '}
                        suffix=' ₽'
                        value={props.data?.total.tire_total_sum}
                    />
                </li>
            </ul>
            <ul className={'finance_total_wash'} data-content-type={'values'}>
                <li className={'text-accent uppercase'}>
                    <NumberFormatter
                        className={'text-accent'}
                        thousandSeparator={' '}
                        suffix=' ₽'
                        value={props.data?.total.wash_total_sum}
                    />
                </li>
            </ul>
            <ul className={'finance_total_evac'} data-content-type={'values'}>
                <li className={'text-accent uppercase'}>
                    <NumberFormatter
                        className={'text-accent'}
                        thousandSeparator={' '}
                        suffix=' ₽'
                        value={props.data?.total.evac_total_sum}
                    />
                </li>
            </ul>
            <ul className={'finance_total'} data-content-type={'values'}>
                <li className={'text-accent uppercase'}>
                    <NumberFormatter
                        className={'text-accent'}
                        thousandSeparator={' '}
                        suffix=' ₽'
                        value={props.data?.total.total_sum}
                    />
                </li>
            </ul>
        </Panel>
    )
}

const FinaceIdPage = () => {
  const location = useLocation()
  const localStore = useLocalObservable<LocalRootStore>(() => localRootStore)
  const store = useStore()
  const navigate = useNavigate()
  const params = useParams()
  const [openedf, { open:openf, close:closef }] = useDisclosure(false)
  const isMyCompany = params.company_id == store.userStore.myProfileData.company.id
  const {width, height} = useViewportSize()
  const {isLoading, data, mutate} = useSWR([`reportId_${params.company_id}`, localStore.params.getSearchParams] , ([url, args]) => store.financeStore.getReport(Number(params.company_id),  args))
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
  useEffect(() => {
      const _root = data?.root_company
      const _ar = []
      if(_root) _ar.push(_root)
      if(data?.results) _ar.push(...data?.results)
      localStore.setData = {
          ...data,
          count: Number(data?.count) + 1,
          results: _ar.map((item: any) => ({
              ...{
                  company_name: item.name,
                  tire: `${item.tire_count} / ${item.tire_total_sum} ₽`,
                  wash: `${item.wash_count} / ${item.wash_total_sum} ₽`,
                  evac: `${item.evac_count} / ${item.evac_total_sum} ₽`,
                  total: `${item.total_count} / ${item.total_sum} ₽`,
                  id: item.id,
                  has_child: item.has_child
              },
          })),
      }
      localStore.setIsLoading = isLoading
  }, [data])

  useDidUpdate(() => {
      if (location.pathname === `/account/finance/report`) {
          mutate()
      }
  }, [location.pathname])

  const footer = React.useMemo(() => {
    if(!width) return null
    if(width && width < 741) {
      return ({
        footer: <FinanceBottomID data={data} />,
        section: null
      })
    }
    return  ({
      footer: null,
      section: <FinanceBottomID data={data}/>
    })
  }, [width, data])


  const memoModalF = React.useMemo(() => {
    if(isLoading && !data) return null
    if(data && data.root_company) return <UpBalance upBalance={false} companyName={data.root_company.name} id={data.root_company.id} opened={openedf} onClose={closef} />
  }, [openedf, data, isLoading])

  const company_name = localStore.getData

  if (location.pathname !== `/account/finance/report/${params.company_id}`) return <Outlet />
  return (
      <Section type={SectionType.withSuffix}>
          <Panel
              headerClassName={'tablet:flex justify-between'}
              variant={PanelVariant.withGapOnly}
              header={
                  <>
                      <div>
                        {(store.appStore.appType === "admin" || !isMyCompany) && <Button
                              text={<><SvgBackArrow />Назад к компании</>}
                              className={'flex flex-[1_100%] items-center gap-2 font-medium text-[#606163] hover:text-gray-300 leading-none !mb-5'}
                              action={() => navigate((() => {
                                if (data?.root_company.parent_id) {
                                  return `/account/finance/report/${data?.root_company.parent_id}`
                                } else {
                                  return `/account/finance/report`
                                }
                              })())}
                              variant={ButtonVariant.text}
                          />}
                        <Heading
                          text={'Отчет по заявкам' + ` ${company_name && company_name.root_company && company_name.root_company.name ? company_name.root_company.name : ""}`}
                          variant={HeadingVariant.h1}
                          className={'!mb-0 inline-block flex-1'}
                          color={HeadingColor.accent}
                        />
                      </div>
                        {store.appStore.appType === "admin" && (data?.root_company?.company_type === 'Клиент' || data?.root_company.company_type === "Партнер") &&        <div className={"flex gap-6 tablet-max:max-w-96 mobile:mt-6 self-end"}>
                          {/* {data?.root_company?.company_type === 'Клиент' &&        <Button text={'Пополнить счет'}  action={open} variant={ButtonVariant['accent-outline']}  size={ButtonSizeType.sm} />} */}
                          {(data?.root_company.company_type === "Партнер"  || data?.root_company.company_type === "Клиент") &&  <Button text={'Бонусы и штрафы'}  action={openf} variant={ButtonVariant['accent-outline']}  size={ButtonSizeType.sm} />}
                        </div>
                        }
                  </>
              }
          />
          <TableWithSortNew
            store={localStore}
              variant={PanelVariant.dataPaddingWithoutFooter}
              search={true}
            footerClassName={"px-0"}
            footerHeight={"7rem"}
            autoScroll={true}
            footer={footer?.section}
              style={PanelRouteStyle.financeId}
              background={PanelColor.glass}
              className={'col-span-full table-groups'}
              initFilterParams={[FilterData.is_active, FilterData.city, FilterData.start_date, FilterData.end_date]}
              filter={true}
              state={isLoading}
              ar={[
                  { label: 'Компания', name: 'company' },
                  { label: 'Шиномонтаж', name: 'tire' },
                  { label: 'Мойка', name: 'wash' },
                  { label: 'Эвакуация', name: 'evac' },
                  { label: 'Всего', name: 'total' },
              ]}
          />


        {footer?.footer}

        {memoModalF}
      </Section>
  )
}

export default observer(FinaceIdPage)
