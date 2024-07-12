import React, { useEffect } from 'react'
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelColor, PanelRouteStyle, PanelVariant } from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import Button, { ButtonSizeType, ButtonVariant } from 'components/common/ui/Button/Button'
import { useStore } from 'stores/store'
import { observer, useLocalObservable } from 'mobx-react-lite'
import { useLocation, useNavigate } from 'react-router-dom'
import TableWithSortNew from 'components/common/layout/TableWithSort/TableWithSortNew'
import agent, { client } from 'utils/agent'
import useSWR from 'swr'
import { LocalRootStore } from 'stores/localStore'
import { useDidUpdate } from '@mantine/hooks'
import dayjs from "dayjs";
import { PurposeOfTransaction } from "components/common/layout/Modal/UpBalance";

const localRootStore =  new LocalRootStore()
localRootStore.params.setSearchParams({
  ordering: "-created"
})

const TransactionPage = () => {

  const location = useLocation()
  const localStore = useLocalObservable<LocalRootStore>(() => localRootStore)

  const store = useStore()
  const navigate = useNavigate()

  const {isLoading, data, mutate} = useSWR(localStore.params.isReady && ['transactions', localStore.params.getSearchParams] , ([url, args]) => store.financeStore.getTransactions(args).then(r => r.data))

  useEffect(() => {
    localStore.setData = {
      ...data,
      results: data?.results?.map((item:any) => ({
        company: store.appStore.appType === "admin" ? item.balance.company.name : store.userStore.myProfileData.company.name,
        created: dayjs(item.created).format('DD.MM.YY HH:mm'),
        company_type: store.appStore.appType === "admin" ? item.balance.company.company_type : store.userStore.myProfileData.company.company_type,
        amount: String(item.amount).includes('-') ? `- ${String(item.amount).split('-')[1]} ₽` : `+ ${String(item.amount)} ₽`,
        ts_maker: item.ts_maker.first_name + " " + item.ts_maker.last_name,
        bid: {bidId: item.bid, company: store.appStore.appType === "admin" ? item.balance.company.id : store.userStore.myProfileData.company.id},
        purpose: PurposeOfTransaction[item.purpose]
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
        variant={PanelVariant.dataPadding}
        search={true}

        style={PanelRouteStyle.financeTransaction}
        background={PanelColor.glass}
        className={'col-span-full table-groups'}
        filter={false}
        state={isLoading}
        ar={[{label: 'Компания', name: 'balance__company'}, { label: 'Дата', name: 'created' }, {label: 'Тип компании', name: 'balance__company__company_type'}, { label: 'Сумма', name: 'amount' }, { label: 'Пользователь', name: 'ts_maker' }, { label: 'Заявка №', name: 'bid' }, {label: 'Платеж', name: 'purpose'} ]}
      />
    </Section>
  )
}

export default observer(TransactionPage)
