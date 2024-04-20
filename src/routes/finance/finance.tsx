import React, { useEffect } from 'react'
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelColor, PanelRouteStyle, PanelVariant } from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import Button, { ButtonDirectory, ButtonSizeType, ButtonVariant } from "components/common/ui/Button/Button";
import { useStore } from 'stores/store'
import { observer, useLocalStore } from 'mobx-react-lite'
import { useLocation, useNavigate } from 'react-router-dom'
import TableWithSortNew from 'components/common/layout/TableWithSort/TableWithSortNew'
import { client } from 'utils/agent'
import useSWR from 'swr'
import { LocalRootStore } from 'stores/localStore'
import { useDidUpdate } from '@mantine/hooks'

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

  const {isLoading, data, mutate} = useSWR(['report', localStore.params.getSearchParams] , ([url, args]) => client.companiesOnlyCompaniesList(args))

  useEffect(() => {
    localStore.setData = {
      ...testData,
      results: testData?.results?.map((item:any) => ({
        company: item.company.name,
        company_type: item.company.company_type,
        tire: `${item.tire.count} / ${item.tire.total_sum} ₽`,
        wash: `${item.wash.count} / ${item.wash.total_sum} ₽`,
        evac: `${item.evac.count} / ${item.evac.total_sum} ₽`,
        total: `${item.total.count} / ${item.total.total_sum} ₽`,
        id: item.id
      }))}
    localStore.setIsLoading = isLoading
  },[testData])

  useDidUpdate(
    () => {
      if(location.pathname === '/account/finance/report') {
        mutate()
      }
    },
    [location.pathname]
  );
  const total = React.useMemo(() => {

    const customer = testData.results.filter((el:any) => el.company.company_type === "Компания-Заказчик")
    const performer = testData.results.filter((el:any) => el.company.company_type === "Компания-Партнер")

    function calcTotal(ar:any[]) {
       const _totalTire = ar.reduce((acc, value):any => {
         return ({ count: acc.count + value.tire.count, total_sum: Number(acc.total_sum) + Number(value.tire.total_sum) })}, { count: 0, total_sum: 0 }
       )
       const _totalWash = ar.reduce((acc, value):any => {
         return ({ count: acc.count + value.wash.count, total_sum: Number(acc.total_sum) + Number(value.wash.total_sum) })}, { count: 0, total_sum: 0 }
       )
       const _totalEvac = ar.reduce((acc, value):any => {
         return ({ count: acc.count + value.evac.count, total_sum: Number(acc.total_sum) + Number(value.evac.total_sum) })}, { count: 0, total_sum: 0 }
       )
       return ({
         tire: _totalTire,
         wash: _totalWash,
         evac: _totalEvac,
         total: ({
           count: _totalTire.count + _totalWash.count + _totalEvac.count,
           total_sum: _totalTire.total_sum + _totalWash.total_sum + _totalEvac.total_sum,
         })
       })
   }
   const _resCustomer = calcTotal(customer)
   const _resPerformer = calcTotal(performer)

   return ({
     customer: _resCustomer,
     performer: _resPerformer
   })
  }, [testData])

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
                      {total.customer.tire.count}/ {total.customer.tire.total_sum} ₽
                  </li>
                  <li>
                      {total.performer.tire.count}/ {total.performer.tire.total_sum} ₽
                  </li>
                  <li className={'text-accent uppercase'}>1 000 ₽</li>
              </ul>
              <ul className={'finance_total_wash'} data-content-type={'values'}>
                  <li>
                      {total.customer.wash.count}/ {total.customer.wash.total_sum} ₽
                  </li>
                  <li>
                      {total.performer.wash.count}/ {total.performer.wash.total_sum} ₽
                  </li>
                  <li className={'text-accent uppercase'}>1 000 ₽</li>
              </ul>
              <ul className={'finance_total_evac'} data-content-type={'values'}>
                  <li>
                      {total.customer.evac.count}/ {total.customer.evac.total_sum} ₽
                  </li>
                  <li>
                      {total.performer.evac.count}/ {total.performer.evac.total_sum} ₽
                  </li>
                  <li className={'text-accent uppercase'}>1 000 ₽</li>
              </ul>
              <ul className={'finance_total'} data-content-type={'values'}>
                  <li> {total.customer.total.count}/ {total.customer.total.total_sum} ₽</li>
                  <li>{total.performer.total.count}/ {total.performer.total.total_sum} ₽</li>
                  <li className={'text-accent uppercase'}>1 000 ₽</li>
              </ul>
          </Panel>
      </Section>
  )
}

export default observer(FinacePage)
