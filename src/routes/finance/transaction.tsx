import React, { useEffect } from 'react'
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelColor, PanelRouteStyle, PanelVariant } from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import Button, { ButtonSizeType, ButtonVariant } from 'components/common/ui/Button/Button'
import { useStore } from 'stores/store'
import { observer, useLocalStore } from 'mobx-react-lite'
import { useLocation, useNavigate } from 'react-router-dom'
import TableWithSortNew from 'components/common/layout/TableWithSort/TableWithSortNew'
import agent, { client } from 'utils/agent'
import useSWR from 'swr'
import { LocalRootStore } from 'stores/localStore'
import { useDidUpdate } from '@mantine/hooks'
import dayjs from "dayjs";

const localRootStore =  new LocalRootStore()

const TransactionPage = () => {
  const location = useLocation()
  const localStore = useLocalStore<LocalRootStore>(() => localRootStore)
  const store = useStore()
  const navigate = useNavigate()

  const {isLoading, data, mutate} = useSWR(['transaction', localStore.params.getSearchParams] , ([url, args]) => agent.Balance.getTransactionList(2,args).then(r => r.data))
  console.log(data);
  useEffect(() => {
    localStore.setData = {
      ...data,
      results: data?.results?.map((item:any) => ({
        created: dayjs(item.created).format('DD.MM.YY hh:mm'),
        //TODO Добавить компанию, название
        company: "ООО \"Компания-Заказчик\"",
        //TODO Добавить тип компании
        company_type: "Компания-Заказчик",
        amount: String(item.amount).includes('-') ? `- ${String(item.amount).split('-')[1]} ₽` : `+ ${String(item.amount).split('-')[1]} ₽`,
        ts_maker: item.ts_maker,
        bid: item.bid,
        purpose: item.purpose
      }))
    }
    localStore.setIsLoading = isLoading
  },[data])
  useDidUpdate(
    () => {
      if(location.pathname === '/account/finance/transaction') {
        mutate()
      }
    },
    [location.pathname]
  );
  // if ('/account/finance/repop' !== location.pathname) return <Outlet />

  return (
    <Section type={SectionType.default}>
      <Panel
        headerClassName={'flex justify-between'}
        variant={PanelVariant.withGapOnly}
        header={
          <>
            <Heading
              text={'Транзакции'}
              variant={HeadingVariant.h1}
              className={'inline-block'}
              color={HeadingColor.accent}
            />
            <Button
              text={'Сохранить Excel'}
              action={() => navigate('#')}
              trimText={true}
              variant={ButtonVariant["accent-outline"]}
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
        ar={[{ label: 'Дата', name: 'created' }, {label: 'Компания', name: 'company'}, {label: 'Тип компании', name: 'company_type'}, { label: 'Сумма', name: 'amount' }, { label: 'Пользователь', name: 'ts_maker' }, { label: 'Заявка №', name: 'bid' }, {label: 'Платеж', name: 'purpose'} ]}
      />
    </Section>
  )
}

export default observer(TransactionPage)
