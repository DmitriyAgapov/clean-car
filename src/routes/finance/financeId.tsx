import React, { useEffect } from 'react'
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelColor, PanelRouteStyle, PanelVariant } from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import Button, { ButtonDirectory, ButtonSizeType, ButtonVariant } from "components/common/ui/Button/Button";
import { useStore } from 'stores/store'
import { observer, useLocalObservable } from 'mobx-react-lite'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
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
  page: 1,
  page_size: 10,
  start_date: dayjs().set('date', 1).format("YYYY-MM-DD"),
})
const FinaceIdPage = () => {
  const location = useLocation()
  const localStore = useLocalObservable<LocalRootStore>(() => localRootStore)
  const store = useStore()
  const navigate = useNavigate()
  const params = useParams()
  const [opened, { open, close }] = useDisclosure(false)

  const isMyCompany = params.company_id == store.userStore.myProfileData.company.id

  const {isLoading, data, mutate} = useSWR(localStore.params.isReady && [`reportId_${params.company_id}`, Number(params.company_id), localStore.params.getSearchParams] , ([url, id, args]) => store.financeStore.getReport(id, args))

  useEffect(() => {
      const _root = data?.root_company
      const _ar = []
      if(_root) {
        _ar.push(_root)
      }
      if(data?.results) {
        _ar.push(...data?.results)
      }
      localStore.setData = {
          ...data,
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
      if (location.pathname === `/account/finance/report/${params.company_id}`) {
          mutate()
      }
  }, [location.pathname])
  console.log(data);
  const memoModal = React.useMemo(() => {
    if(isLoading && !data) return null
    if(data && data.root_company) return <UpBalance companyName={data.root_company.name} id={data.root_company.id} opened={opened} onClose={close} />
  }, [opened, data, isLoading])

  return (
      <Section type={SectionType.withSuffix}>
          <Panel
              headerClassName={'flex justify-between'}
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

                      <div className={"flex gap-6 tablet-max:max-w-96 mobile:mt-6"}>
                        {data?.root_company?.company_type === 'Клиент' &&
                          <div className={'lg:col-start-3 grid gap-4 lg-max:justify-end lg-max:row-start-1 lg-max:grid-flow-col lg-max:col-span-full'}>
                            <Button text={'Пополнить счет'}  action={open} variant={ButtonVariant['accent-outline']}  size={ButtonSizeType.sm} />
                            <Button text={'Бонусы и штрафы'}  action={open} variant={ButtonVariant['accent-outline']}  size={ButtonSizeType.sm} />
                          </div>
                        }
                      <Button
                          text={'Сохранить Excel'}
                          action={() => navigate('#')}
                          trimText={true}
                          variant={ButtonVariant['accent-outline']}
                          // action={() => store.companyStore.addCompany()}
                          className={'inline-flex'}
                          size={ButtonSizeType.sm}
                      />
                      </div>
                  </>
              }
          />
          <TableWithSortNew
              store={localRootStore}
              variant={PanelVariant.dataPaddingWithoutFooter}
              search={true}
              style={PanelRouteStyle.financeId}
              background={PanelColor.glass}
              className={'col-span-full table-groups'}
              initFilterParams={[FilterData.is_active, FilterData.city, FilterData.start_date, FilterData.end_date]}
              filter={true}
              state={false}
              ar={[
                  { label: 'Компания', name: 'company' },
                  { label: 'Шиномонтаж', name: 'tire' },
                  { label: 'Мойка', name: 'wash' },
                  { label: 'Эвакуация', name: 'evac' },
                  { label: 'Всего', name: 'total' },
              ]}
          />
          <Panel variant={PanelVariant.suffixFooter} background={PanelColor.withSuffix}>
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
          </Panel>

        {memoModal}
      </Section>
  )
}

export default observer(FinaceIdPage)
