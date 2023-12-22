import React, { ReactElement, ReactNode, useEffect, useState } from 'react'
import styles from './Tabs.module.scss'
import DList from 'components/common/ui/DList/DList'
import CardSimple from 'components/common/layout/Cards/CardSimple/CardSimple'
import LinkStyled from 'components/common/ui/LinkStyled/LinkStyled'
import Button, { ButtonSizeType, ButtonVariant } from 'components/common/ui/Button/Button'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import { useStore } from 'stores/store'
import { useNavigate } from 'react-router-dom'
import CreateInput from 'components/common/ui/CreateInput/CreateInput'
import TableWithSort from 'components/common/layout/TableWithSort/TableWithSort'
import { User } from 'stores/usersStore'
import { PanelColor, PanelProps, PanelVariant } from 'components/common/layout/Panel/Panel'
import TabsVariants from "routes/company/TabsVariants/TabsVariants";
import Logo from "components/common/layout/Logo/Logo";


export type TabsProps = {
  data: any
}
const Tabs = ({ data }: TabsProps) => {

  const store = useStore()
    const [state, setState] = useState('Основная информация');
  // useEffect(() => {
  //   console.log(data);
  //   console.log(state == 0);
  //   // @ts-ignore
  // }, [state]);
  const navigate = useNavigate()
  // const fundBill = {
  //   actions: [
  //     <Button text={'Отменить'} action={() => store.appStore.closeModal()} variant={ButtonVariant.default} />,
  //     <Button
  //       text={'Сохранить'}
  //       action={() => {
  //         // store.permissionStore.deletePermissionStoreAdmin(changes.id)
  //         store.appStore.closeModal()
  //         navigate('/account/groups')
  //       }}
  //       variant={ButtonVariant['accent-outline']}
  //     />,
  //   ],
  //   text: <div className={'grid gap-12 mb-12'}><CreateInput text={'Сумма начисления'} name={'paymoney'} type={'number'}/>
  //     <DList label={'Компания'} title={data[0].data.company.name}/>
  //     <DList label={'Зачислил'}  title={data[0].data.company.name}/>
  //   </div>,
  //   header: 'Пополнить счет',
  //   state: true,
  // }
    const  handleChangeTabState = (event: Event, label: string) => {
     setState(label);
    }
    const TabPanels = () => {
    const result = []
      for(const key in data) {
        result.push(<TabsVariants companyId={data.company.data.id} label={data[key].label}
          data={data[key].data}
          state={state == data[key].label}
          key={`var-${data[key].label}`} />)
      }
        // data.map((i:any, index:number) =>
        // <TabsVariants label={i.label} data={i.data} state={state == index} key={`var-${index}`}/>)
      return <>{result}</>
    }

    const HeadersTabs = () => {
      const result:any = [];
      for(const key in data) {
        // @ts-ignore
        result.push(<Tabs.Tab onClick={(event: Event) => handleChangeTabState(event, data[key].label)} title={data[key].label} state={data[key].label == state} key={data[key].label + `-tab`} />)
      }
      return  result
    }
    return (
        <div className={styles.Tabs}>
            <Tabs.TabHeaderContainer>
              <HeadersTabs/>
            </Tabs.TabHeaderContainer>
        <TabPanels/>
          {/*   <Tabs.Panel state={state == 0} name={'info'} className={'py-12'}> */}
          {/*       <DList label={'Оплата'} title={data[0].value.payment} /> */}
          {/*       <DList label={'ИНН'} title={data[0].value.inn} /> */}
          {/*       <DList label={'ОГРН'} title={data[0].value.ogrn} /> */}
          {/*       <CardSimple className={'p-5 grid gap-y-9 bg-gray-3 rounded-062 row-span-2'}> */}
          {/*         <DList label={'Исполнители'} title={data[0].value.ogrn} /> */}
          {/*         <CardSimple.Footer> */}
          {/*           <LinkStyled variant={ButtonVariant.text} style={{color: 'var(--accentColor)'}} text={'Подробнее'} to={'#'} /> */}
          {/*         </CardSimple.Footer> */}
          {/*       </CardSimple> */}
          {/*      <DList label={'Счет'} title={<> */}
          {/*        <Heading text={data[0].value.bill + ' ₽'}  variant={HeadingVariant.h2} color={HeadingColor.accent} /> */}
          {/*        <Heading text={data[0].value.overdraft_sum + ' ₽' + ' с овердрафтом'}  variant={HeadingVariant.h4} color={HeadingColor.accent} /> */}
          {/*      </> */}

          {/*      }/> */}
          {/*      <DList label={'Адрес'} title={data[0].value.address} /> */}
          {/*      <DList label={'Юридический адрес'} title={data[0].value.legal_address} /> */}
          {/*      <DList label={'Подключенные услуги'} title={''} /> */}
          {/*      <DList label={'Контакты для связи'} title={data[0].value.contacts} /> */}
          {/*     <Button text={'Пополнить счет'}  action={async () => { */}
          {/*       store.appStore.setModal(fundBill) */}
          {/*     }} variant={ButtonVariant['accent-outline']} size={ButtonSizeType.sm}/> */}
          {/*   </Tabs.Panel> */}
          {/* <Tabs.Panel  state={state === 2} name={'users'} variant={PanelVariant.dataPadding} background={PanelColor.default} className={'!bg-none'}  bodyClassName={'!bg-transparent'}> */}
          {/*   <TableWithSort  className={'rounded-none !bg-none'} bodyClassName={'!bg-none !bg-transparent'} background={PanelColor.default} search={true} filter={true} */}
          {/*     data={data[0].value.users.map((item: User & {rootRoute?: string} ) => ({ */}

          {/*     state: item.is_active, */}
          {/*     name: item.first_name + ' ' + item.last_name, */}
          {/*     phone: item.phone, */}
          {/*     email: item.email, */}
          {/*     group: item.group, */}
          {/*     company: data[0].value.company.name, */}
          {/*     city: data[0].value.company.city.name, */}
          {/*     id: item.id, */}
          {/*     query: { */}
          {/*     company_id: data[0].value.company.id, */}
          {/*     rootRoute: `account/users/${data[0].value.company.id}/${item.id}`, */}
          {/*   }, */}
          {/*   }))} state={false} variant={PanelVariant.dataPadding} footer={false}   ar={['Статус', 'ФИО', 'Номер телефона', 'e-mail', 'Тип', 'Компания', 'Город']}/> */}
          {/* </Tabs.Panel> */}

        </div>
    )
}

Tabs.Tab = ({ title, state, ...props }: { title: string; state: boolean } | any) => {
  return (
      <li className={styles.tabHeader} data-state={state} {...props}>
          {title}
      </li>
  )
}
Tabs.Panel = ({ children, state, name, className = " ", ...props }: {className?: string, children: ReactNode | ReactNode[] | React.ReactElement | string, state: boolean, name?: string } & PanelProps) =>  {
 if(state) return (
    <div  className={styles.tabPanel + " " + className} data-state={state} data-name={name}>
      {children}
    </div>
  )
  return null
}

Tabs.TabHeaderContainer = ({ children }: { children: ReactNode | ReactNode[] | React.ReactElement | string }) => (
    <ul className={styles.containerHeader}>{children}</ul>
)
export default Tabs;
