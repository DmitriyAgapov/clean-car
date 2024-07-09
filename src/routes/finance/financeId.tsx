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
import { useDidUpdate, useDisclosure } from '@mantine/hooks'
import { NumberFormatter } from '@mantine/core';
import { SvgBackArrow } from "components/common/ui/Icon";
import { FilterData } from 'components/common/layout/TableWithSort/DataFilter'
import dayjs from 'dayjs';
import { UpBalance } from "components/common/layout/Modal/UpBalance";

const localRootStore =  new LocalRootStore()
localRootStore.params.setSearchParams({
  // page: 1,
  // page_size: 10,
  start_date: dayjs().set('date', 1).format("YYYY-MM-DD"),
})

const FinaceIdPage = () => {
  const location = useLocation()
  const localStore = useLocalObservable<LocalRootStore>(() => localRootStore)
  const store = useStore()
  const navigate = useNavigate()
  const params = useParams()
  const [opened, { open, close }] = useDisclosure(false)
  const [openedf, { open:openf, close:closef }] = useDisclosure(false)
  const isMyCompany = params.company_id == store.userStore.myProfileData.company.id

  const {isLoading, data, mutate} = useSWR([`reportId_${params.company_id}`, localStore.params.getSearchParams] , ([url, args]) => store.financeStore.getReport(Number(params.company_id),  args))

  useEffect(() => {
      const _root = data?.root_company
      const _ar = []
      if(_root) {
        _ar.push(_root)
      }
      if(data?.results) {
        _ar.push(...data?.results)
      }
    console.log(_ar);
      localStore.setData = {
          ...data,
          count: Number(data?.count) + 1,
          results: _ar.map((item: any) => ({
              ...{
                  name: item.name,
                  tire: `${item.tire_count} / ${item.tire_total_sum} ₽`,
                  wash: `${item.wash_count} / ${item.wash_total_sum} ₽`,
                  evac: `${item.evac_count} / ${item.evac_total_sum} ₽`,
                  total: `${item.total_count} / ${item.total_sum} ₽`,
                  id: item.id,
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

  const memoModal = React.useMemo(() => {
    if(isLoading && !data) return null
    if(data && data.root_company) return <UpBalance upBalance={true} companyName={data.root_company.name} id={data.root_company.id} opened={opened} onClose={close} />
  }, [opened, data, isLoading])

  const memoModalF = React.useMemo(() => {
    if(isLoading && !data) return null
    if(data && data.root_company) return <UpBalance upBalance={false} companyName={data.root_company.name} id={data.root_company.id} opened={openedf} onClose={closef} />
  }, [openedf, data, isLoading])
  console.log(localStore);
  console.log(data);

  if (!location.pathname.includes('/account/finance/report')) return <Outlet />
  return (
      <Section type={SectionType.withSuffix}>
          <Panel
              headerClassName={'tablet:flex justify-between'}
              variant={PanelVariant.withGapOnly}
              header={
                  <>
                      <div>
                        {(store.appStore.appType === "admin" || !isMyCompany) && <Button
                              text={
                                  <>
                                      <SvgBackArrow />
                                      Назад к компании
                                  </>
                              }
                              className={
                                  'flex flex-[1_100%] items-center gap-2 font-medium text-[#606163] hover:text-gray-300 leading-none !mb-5'
                              }
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
                          text={'Отчет по заявкам'}
                          variant={HeadingVariant.h1}
                          className={'!mb-0 inline-block flex-1'}
                          color={HeadingColor.accent}
                        />
                      </div>


                        {data?.root_company?.company_type === 'Клиент' &&        <div className={"flex gap-6 tablet-max:max-w-96 mobile:mt-6 self-end"}>
                            <Button text={'Пополнить счет'}  action={open} variant={ButtonVariant['accent-outline']}  size={ButtonSizeType.sm} />
                            <Button text={'Бонусы и штрафы'}  action={openf} variant={ButtonVariant['accent-outline']}  size={ButtonSizeType.sm} />
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
            footer={<Panel variant={PanelVariant.suffixFooter} background={PanelColor.withSuffix}>
              <ul className={'finance_total_headers col-span-2'}>
                <li className={'text-accent uppercase'}>{store.appStore.appType ==="admin" ? "Прибыль" : "Итог"}</li>
              </ul>
              <ul className={'finance_total_tire'} data-content-type={'values'}>
                <li className={'text-accent uppercase'}>
                  <NumberFormatter
                    className={'text-accent'}
                    thousandSeparator={' '}
                    suffix=' ₽'
                    value={data?.total.tire_total_sum}
                  />
                </li>
              </ul>
              <ul className={'finance_total_wash'} data-content-type={'values'}>
                <li className={'text-accent uppercase'}>
                  <NumberFormatter
                    className={'text-accent'}
                    thousandSeparator={' '}
                    suffix=' ₽'
                    value={data?.total.wash_total_sum}
                  />
                </li>
              </ul>
              <ul className={'finance_total_evac'} data-content-type={'values'}>
                <li className={'text-accent uppercase'}>
                  <NumberFormatter
                    className={'text-accent'}
                    thousandSeparator={' '}
                    suffix=' ₽'
                    value={data?.total.evac_total_sum}
                  />
                </li>
              </ul>
              <ul className={'finance_total'} data-content-type={'values'}>
                <li className={'text-accent uppercase'}>
                  <NumberFormatter
                    className={'text-accent'}
                    thousandSeparator={' '}
                    suffix=' ₽'
                    value={data?.total.total_sum}
                  />
                </li>
              </ul>
            </Panel>}
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


        {memoModal}
        {memoModalF}
      </Section>
  )
}

export default observer(FinaceIdPage)
