import React, { ReactNode, useEffect, useState } from 'react'
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
import { PanelVariant } from 'components/common/layout/Panel/Panel'


type TabsProps = {}
const Tabs = ({ data }: any) => {
  const store = useStore()
    const [state, setState] = useState(0);
  useEffect(() => {
    console.log(state);
    console.log(state == 0);
    // @ts-ignore
  }, [state]);
  const navigate = useNavigate()
  const fundBill = {
    actions: [
      <Button text={'Отменить'} action={() => store.appStore.closeModal()} variant={ButtonVariant.default} />,
      <Button
        text={'Сохранить'}
        action={() => {
          // store.permissionStore.deletePermissionStoreAdmin(changes.id)
          store.appStore.closeModal()
          navigate('/account/groups')
        }}
        variant={ButtonVariant['accent-outline']}
      />,
    ],
    text: <div className={'grid gap-12 mb-12'}><CreateInput text={'Сумма начисления'} name={'paymoney'} type={'number'}/>
      <DList label={'Компания'} title={data[0].value.company.name}/>
      <DList label={'Зачислил'}  title={data[0].value.company.name}/>
    </div>,
    header: 'Пополнить счет',
    state: true,
  }
    const  handleChangeTabState = (event: Event, index: number) => {
     setState(index);
    }


    return (
        <div className={styles.Tabs}>
            <Tabs.TabHeaderContainer>
              {data.map((d: any, index: number) => (
                <Tabs.Tab onClick={(event: Event) => handleChangeTabState(event, index)} title={d.label} state={index == state} key={index + `-tab`} />
              ))}
            </Tabs.TabHeaderContainer>
            <Tabs.Panel state={state == 0} name={'info'}>
                <DList label={'Оплата'} title={data[0].value.payment} />
                <DList label={'ИНН'} title={data[0].value.inn} />
                <DList label={'ОГРН'} title={data[0].value.ogrn} />
                <CardSimple className={'p-5 grid gap-y-9 bg-gray-3 rounded-062 row-span-2'}>
                  <DList label={'Исполнители'} title={data[0].value.ogrn} />
                  <CardSimple.Footer>
                    <LinkStyled variant={ButtonVariant.text} style={{color: 'var(--accentColor)'}} text={'Подробнее'} to={'#'} />
                  </CardSimple.Footer>
                </CardSimple>
               <DList label={'Счет'} title={<>
                 <Heading text={data[0].value.bill + ' ₽'}  variant={HeadingVariant.h2} color={HeadingColor.accent} />
                 <Heading text={data[0].value.overdraft_sum + ' ₽' + ' с овердрафтом'}  variant={HeadingVariant.h4} color={HeadingColor.accent} />
               </>

               }/>
               <DList label={'Адрес'} title={data[0].value.address} />
               <DList label={'Юридический адрес'} title={data[0].value.legal_address} />
               <DList label={'Подключенные услуги'} title={''} />
               <DList label={'Контакты для связи'} title={data[0].value.contacts} />
              <Button text={'Пополнить счет'}  action={async () => {
                store.appStore.setModal(fundBill)
              }} variant={ButtonVariant['accent-outline']} size={ButtonSizeType.sm}/>
            </Tabs.Panel>
          <Tabs.Panel  state={state === 2} name={'users'}>
            <TableWithSort  data={data[0].value.users.map((item: User ) => ({
              state: item.is_active,
              name: item.first_name + ' ' + item.last_name,
              phone: item.phone,
              email: item.email,
              group: item.group,
              company: data[0].value.company.name,
              city: data[0].value.company.city.name,
              id: item.id,
              query: {
              company_id: data[0].value.company.id,
            },
            }))} state={false} variant={PanelVariant.withGapOnly} search={false} filter={false}   ar={['Статус', 'ФИО', 'Номер телефона', 'e-mail', 'Тип', 'Компания', 'Город']}/>
          </Tabs.Panel>

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
Tabs.Panel = ({ children, state, name }: { children: ReactNode | ReactNode[] | React.ReactElement | string, state: boolean, name?: string }) =>  {
  console.log('p', state);
 if(state) return (
    <div className={styles.tabPanel} data-state={state} data-name={name}>
      {children}
    </div>
  )
  return null
}

Tabs.TabHeaderContainer = ({ children }: { children: ReactNode | ReactNode[] | React.ReactElement | string }) => (
    <ul className={styles.containerHeader}>{children}</ul>
)
export default Tabs;
