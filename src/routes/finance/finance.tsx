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
                  <li>90/ 14 000 ₽</li>
                  <li>90/ 14 000 ₽</li>
                  <li  className={'text-accent uppercase'}>1 000 ₽</li>
              </ul>
              <ul className={'finance_total_wash'} data-content-type={'values'}>
                  <li>90/ 14 000 ₽</li>
                  <li>90/ 14 000 ₽</li>
                  <li  className={'text-accent uppercase'}>1 000 ₽</li>
              </ul>
              <ul className={'finance_total_evac'} data-content-type={'values'}>
                  <li>90/ 14 000 ₽</li>
                  <li>90/ 14 000 ₽</li>
                  <li  className={'text-accent uppercase'}>1 000 ₽</li>
              </ul>
              <ul className={'finance_total'} data-content-type={'values'}>
                  <li>90/ 14 000 ₽</li>
                  <li>90/ 14 000 ₽</li>
                  <li  className={'text-accent uppercase'}>1 000 ₽</li>
              </ul>
          </Panel>
      </Section>
  )
}

export default observer(FinacePage)
