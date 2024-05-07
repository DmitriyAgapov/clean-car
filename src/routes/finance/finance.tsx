import React, { useEffect } from 'react'
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelColor, PanelRouteStyle, PanelVariant } from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import Button, { ButtonDirectory, ButtonSizeType, ButtonVariant } from "components/common/ui/Button/Button";
import { useStore } from 'stores/store'
import { observer, useLocalStore } from 'mobx-react-lite'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import TableWithSortNew from 'components/common/layout/TableWithSort/TableWithSortNew'
import agent, { client } from 'utils/agent'
import useSWR from 'swr'
import { LocalRootStore } from 'stores/localStore'
import { useDidUpdate } from '@mantine/hooks'
import { NumberFormatter } from '@mantine/core';

const localRootStore =  new LocalRootStore()
const testData = {
  "count": 12,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": 1,
      "company": {
        "id": 2,
        "name": "ООО Заказчик-ред1",
        "company_type": "Компания-Заказчик",
        "parent": {
            "id": 2,
            "name": "ООО Заказчик-ред1",
            "city": {
              "id": 1,
              "name": "Москва"
            },
            "company_type": "Компания-Заказчик"
          }
      },
      "tire": {
        "name": "Шиномонтаж",
        "count": 30,
        "total_sum": 10000
      },
      "wash": {
        "name": "Мойка",
        "count": 55,
        "total_sum": 3000
      },
      "evac": {
        "name": "Эвакуация",
        "count": 32,
        "total_sum": 40000
      },
      //Итог можно и тут считать. Не факт что нужен
      "total": {
        "name": "Всего",
        "count": 30,
        "total_sum": 4000
      }
    },
    {
      "id": 3,
      "company": {
        "id": 2,
        "name": "ООО Заказчик-ред1",
        "company_type": "Компания-Заказчик",
        "parent": {
            "id": 2,
            "name": "ООО Заказчик-ред1",
            "city": {
              "id": 1,
              "name": "Москва"
            },
            "company_type": "Компания-Заказчик"
          }
      },
      "tire": {
        "name": "Шиномонтаж",
        "count": 30,
        "total_sum": 4000
      },
      "wash": {
        "name": "Мойка",
        "count": 30,
        "total_sum": 4000
      },
      "evac": {
        "name": "Эвакуация",
        "count": 30,
        "total_sum": 4000
      },
      //Итог можно и тут считать. Не факт что нужен
      "total": {
        "name": "Всего",
        "count": 30,
        "total_sum": 4000
      },
      "city": {
        "id": 1,
        "name": "Москва"
      },
    },
    {
      "id": 2,
      "company": {
        "id": 2,
        "name": "ООО Заказчик-ред1",
        "company_type": "Компания-Заказчик",
        "parent": {
            "id": 2,
            "name": "ООО Заказчик-ред1",
            "city": {
              "id": 1,
              "name": "Москва"
            },
            "company_type": "Компания-Заказчик"
          }
      },
      "tire": {
        "name": "Шиномонтаж",
        "count": 30,
        "total_sum": 4000
      },
      "wash": {
        "name": "Мойка",
        "count": 30,
        "total_sum": 4000
      },
      "evac": {
        "name": "Эвакуация",
        "count": 30,
        "total_sum": 4000
      },
      //Итог можно и тут считать. Не факт что нужен
      "total": {
        "name": "Всего",
        "count": 30,
        "total_sum": 4000
      },
      "city": {
        "id": 1,
        "name": "Москва"
      },
    },
     {
      "id": 1,
      "company": {
        "id": 2,
        "name": "ООО Заказчик-ред1",
        "company_type": "Компания-Заказчик",
        "parent": {
            "id": 2,
            "name": "ООО Заказчик-ред1",
            "city": {
              "id": 1,
              "name": "Москва"
            },
            "company_type": "Компания-Заказчик"
          }
      },
      "tire": {
        "name": "Шиномонтаж",
        "count": 30,
        "total_sum": 4000
      },
      "wash": {
        "name": "Мойка",
        "count": 30,
        "total_sum": 4000
      },
      "evac": {
        "name": "Эвакуация",
        "count": 30,
        "total_sum": 4000
      },
      //Итог можно и тут считать. Не факт что нужен
      "total": {
        "name": "Всего",
        "count": 30,
        "total_sum": 4000
      },
      "city": {
        "id": 1,
        "name": "Москва"
      },
    },
    {
      "id": 3,
      "company": {
        "id": 2,
        "name": "ООО Заказчик-ред1",
        "company_type": "Компания-Заказчик",
        "parent": {
            "id": 2,
            "name": "ООО Заказчик-ред1",
            "city": {
              "id": 1,
              "name": "Москва"
            },
            "company_type": "Компания-Заказчик"
          }
      },
      "tire": {
        "name": "Шиномонтаж",
        "count": 30,
        "total_sum": 4000
      },
      "wash": {
        "name": "Мойка",
        "count": 30,
        "total_sum": 4000
      },
      "evac": {
        "name": "Эвакуация",
        "count": 30,
        "total_sum": 4000
      },
      //Итог можно и тут считать. Не факт что нужен
      "total": {
        "name": "Всего",
        "count": 30,
        "total_sum": 4000
      },
      "city": {
        "id": 1,
        "name": "Москва"
      },
    },
    {
      "id": 2,
      "company": {
        "id": 2,
        "name": "ООО Заказчик-ред1",
        "company_type": "Компания-Заказчик",
        "parent": {
            "id": 2,
            "name": "ООО Заказчик-ред1",
            "city": {
              "id": 1,
              "name": "Москва"
            },
            "company_type": "Компания-Заказчик"
          }
      },
      "tire": {
        "name": "Шиномонтаж",
        "count": 30,
        "total_sum": 4000
      },
      "wash": {
        "name": "Мойка",
        "count": 30,
        "total_sum": 4000
      },
      "evac": {
        "name": "Эвакуация",
        "count": 30,
        "total_sum": 4000
      },
      //Итог можно и тут считать. Не факт что нужен
      "total": {
        "name": "Всего",
        "count": 30,
        "total_sum": 4000
      },
      "city": {
        "id": 1,
        "name": "Москва"
      },
    },
     {
      "id": 1,
      "company": {
        "id": 2,
        "name": "ООО Заказчик-ред1",
        "company_type": "Компания-Заказчик",
        "parent": {
            "id": 2,
            "name": "ООО Заказчик-ред1",
            "city": {
              "id": 1,
              "name": "Москва"
            },
            "company_type": "Компания-Заказчик"
          }
      },
      "tire": {
        "name": "Шиномонтаж",
        "count": 30,
        "total_sum": 4000
      },
      "wash": {
        "name": "Мойка",
        "count": 30,
        "total_sum": 4000
      },
      "evac": {
        "name": "Эвакуация",
        "count": 30,
        "total_sum": 4000
      },
      //Итог можно и тут считать. Не факт что нужен
      "total": {
        "name": "Всего",
        "count": 30,
        "total_sum": 4000
      },
      "city": {
        "id": 1,
        "name": "Москва"
      },
    },
    {
      "id": 3,
      "company": {
        "id": 2,
        "name": "ООО Заказчик-ред1",
        "company_type": "Компания-Заказчик",
        "parent": {
            "id": 2,
            "name": "ООО Заказчик-ред1",
            "city": {
              "id": 1,
              "name": "Москва"
            },
            "company_type": "Компания-Заказчик"
          }
      },
      "tire": {
        "name": "Шиномонтаж",
        "count": 30,
        "total_sum": 4000
      },
      "wash": {
        "name": "Мойка",
        "count": 30,
        "total_sum": 4000
      },
      "evac": {
        "name": "Эвакуация",
        "count": 30,
        "total_sum": 4000
      },
      //Итог можно и тут считать. Не факт что нужен
      "total": {
        "name": "Всего",
        "count": 30,
        "total_sum": 4000
      },
      "city": {
        "id": 1,
        "name": "Москва"
      },
    },
    {
      "id": 2,
      "company": {
        "id": 2,
        "name": "ООО Заказчик-ред1",
        "company_type": "Компания-Партнер",
        "parent": {
            "id": 2,
            "name": "ООО Заказчик-ред1",
            "city": {
              "id": 1,
              "name": "Москва"
            },
            "company_type": "Компания-Партнер"
          }
      },
      "tire": {
        "name": "Шиномонтаж",
        "count": 31,
        "total_sum": 4400
      },
      "wash": {
        "name": "Мойка",
        "count": 77,
        "total_sum": 120000
      },
      "evac": {
        "name": "Эвакуация",
        "count": 12,
        "total_sum": 41000
      },
      //Итог можно и тут считать. Не факт что нужен
      "total": {
        "name": "Всего",
        "count": 30,
        "total_sum": 4000
      },
      "city": {
        "id": 1,
        "name": "Москва"
      },
    },
     {
      "id": 1,
      "company": {
        "id": 2,
        "name": "ООО Заказчик-ред1",
        "company_type": "Компания-Партнер",
        "parent": {
            "id": 2,
            "name": "ООО Заказчик-ред1",
            "city": {
              "id": 1,
              "name": "Москва"
            },
            "company_type": "Компания-Партнер"
          }
      },
      "tire": {
        "name": "Шиномонтаж",
        "count": 30,
        "total_sum": 4000
      },
      "wash": {
        "name": "Мойка",
        "count": 30,
        "total_sum": 4000
      },
      "evac": {
        "name": "Эвакуация",
        "count": 30,
        "total_sum": 4000
      },
      //Итог можно и тут считать. Не факт что нужен
      "total": {
        "name": "Всего",
        "count": 30,
        "total_sum": 4000
      },
      "city": {
        "id": 1,
        "name": "Москва"
      },
    }
  ]
}

const FinacePage = () => {
  const location = useLocation()
  const localStore = useLocalStore<LocalRootStore>(() => localRootStore)
  const store = useStore()
  const navigate = useNavigate()
  const {isLoading, data, mutate} = useSWR(['report', localStore.params.getSearchParams] , ([url, args]) => store.financeStore.getReport(undefined,args))

  useEffect(() => {
    localStore.setData = {
      ...data,
      results: data?.results?.map((item:any) => ({...{
        name: item.name,
        company_type: item.type,
        tire: `${item.tire_count} / ${item.tire_total_sum} ₽`,
        wash: `${item.wash_count} / ${item.wash_total_sum} ₽`,
        evac: `${item.evac_count} / ${item.evac_total_sum} ₽`,
        total: `${item.total_count} / ${item.total_sum} ₽`,
        id: item.id
    }}))}
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

  if ('/account/finance/report' !== location.pathname) return <Outlet />
  return (
      <Section type={SectionType.withSuffix}>
          <Panel
              headerClassName={'flex justify-between'}
              variant={PanelVariant.withGapOnly}
              header={
                  <>
                      <Heading
                          text={'Отчет по заявкам'}
                          variant={HeadingVariant.h1}
                          className={'inline-block'}
                          color={HeadingColor.accent}
                      />
                      <Button
                          text={'Сохранить Excel'}
                          action={() => navigate('#')}
                          trimText={true}
                          variant={ButtonVariant['accent-outline']}
                          // action={() => store.companyStore.addCompany()}
                          className={'inline-flex'}
                          size={ButtonSizeType.sm}
                      />
                  </>
              }
          />
          <TableWithSortNew
              store={localRootStore}
              variant={PanelVariant.dataPaddingWithoutFooter}
              search={true}
              style={PanelRouteStyle.finance}
              background={PanelColor.glass}
              className={'col-span-full table-groups'}
              filter={false}
              state={isLoading}
              ar={[
                  { label: 'Компания', name: 'company' },
                  { label: 'Тип компании', name: 'company_type' },
                  { label: 'Шиномонтаж', name: 'tire' },
                  { label: 'Мойка', name: 'wash' },
                  { label: 'Эвакуация', name: 'evac' },
                  { label: 'Всего', name: 'total' },
              ]}
          />
          <Panel variant={PanelVariant.suffixFooter} background={PanelColor.withSuffix}>
              <ul className={'finance_total_headers col-span-2'}>
                  <li>
                      <span data-directory={ButtonDirectory.customer}></span>Итог Заказчик
                  </li>
                  <li>
                      <span data-directory={ButtonDirectory.performer}></span>Итог Партнер
                  </li>
                  <li className={'text-accent uppercase'}>Прибыль</li>
              </ul>
              <ul className={'finance_total_tire'} data-content-type={'values'}>
                  <li>
                    {data?.total.total_performers.tire_count} / <NumberFormatter className={'text-accent'}  thousandSeparator={" "}  suffix=" ₽" value={data?.total.total_customers.tire_total_sum}/>
                  </li>
                  <li>
                      {data?.total.total_performers.tire_count} / <NumberFormatter className={'text-accent'} thousandSeparator={" "}  suffix=" ₽" value={data?.total.total_performers.tire_total_sum}/>
                  </li>
                  <li className={'text-accent uppercase'}><NumberFormatter className={'text-accent'} thousandSeparator={" "}  suffix=" ₽" value={data?.total.profit.tire_total_sum}/></li>
              </ul>
              <ul className={'finance_total_wash'} data-content-type={'values'}>
                  <li>
                    {data?.total.total_customers.wash_count} / <NumberFormatter className={'text-accent'} thousandSeparator={" "}  suffix=" ₽" value={data?.total.total_customers.wash_total_sum}/>
                  </li>
                  <li>
                    {data?.total.total_performers.wash_count} / <NumberFormatter className={'text-accent'} thousandSeparator={" "}  suffix=" ₽" value={data?.total.total_performers.wash_total_sum}/>
                  </li>
                  <li className={'text-accent uppercase'}><NumberFormatter className={'text-accent'} thousandSeparator={" "}  suffix=" ₽" value={data?.total.profit.wash_total_sum} /></li>
              </ul>
              <ul className={'finance_total_evac'} data-content-type={'values'}>
                  <li>
                    {data?.total.total_customers.evac_count} / <NumberFormatter className={'text-accent'} thousandSeparator={" "}  suffix=" ₽" value={data?.total.total_customers.evac_total_sum}/>
                  </li>
                  <li>
                    {data?.total.total_performers.evac_count} / <NumberFormatter className={'text-accent'} thousandSeparator={" "}  suffix=" ₽" value={data?.total.total_performers.evac_total_sum}/>
                  </li>
                  <li className={'text-accent uppercase'}><NumberFormatter className={'text-accent'} thousandSeparator={" "}  suffix=" ₽" value={data?.total.profit.evac_total_sum}/></li>
              </ul>
              <ul className={'finance_total'} data-content-type={'values'}>
                <li> {data?.total.total_customers.total_count} / <NumberFormatter className={'text-accent'} thousandSeparator={" "}  suffix=" ₽" value={data?.total.total_customers.total_sum}/></li>
                <li>{data?.total.total_performers.total_count} / <NumberFormatter className={'text-accent'} thousandSeparator={" "}  suffix=" ₽" value={data?.total.total_performers.total_sum}/></li>
                  <li className={'text-accent uppercase'}><NumberFormatter className={'text-accent'} thousandSeparator={" "}  suffix=" ₽" value={data?.total.profit.total_sum}/></li>
              </ul>
          </Panel>
      </Section>
  )
}

export default observer(FinacePage)
