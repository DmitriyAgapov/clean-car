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
import TabsVariants, { TabsVariantBids, TabsVariantsCars, TabsVariantsFilial } from "routes/company/TabsVariants/TabsVariants";
import Logo from "components/common/layout/Logo/Logo";
import company from "routes/company/company";

export enum TabsType {
  bid = 'bid',
  company = 'company',
  user = 'user',
  price = 'price',
}
export type TabsProps = {
  data?: any
  className?: string
  type?: TabsType
}
const Tabs = ({ data, className, panels, items, type }: TabsProps & {panels?: any, items?: any}) => {
  console.log(data);
  const store = useStore()
    const [state, setState] = useState('Основная информация');

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
    const TabPanels = ():any => {
    const result:any = []
      if(type == TabsType.bid) {
        data.forEach((item: any) => {
          result.push(<TabsVariantBids state={state == item.label} data={item.data} label={item.label} props={items} className={'!pb-0'}/>)
        })
        return result
      }
      if(type == TabsType.price) {
        data.forEach((item: any, index: number) => {
          result.push(
            <span>{index}</span>
            // <TabsVariantBids state={state == item.label} data={item.data} label={item.label} props={items} className={'!pb-0'}/>
          )
        })
        return result
      }
      if(items) {
        data.forEach((item: any) => {
          result.push(<TabsVariantsCars state={state == item.label} data={item.data} label={item.label} props={items}/>)
        })
        return result
      }
        else if(panels) {
        panels.forEach((item: any) => {
          result.push(<TabsVariantsFilial state={state == item.label} parentCompany={item.parent} company_type={panels[0].company_type} data={item.data} label={item.label} props={panels}/>)
        })
        return result
      } else if(data){
        for(const key in data) {
          result.push(<TabsVariants companyId={data.company.data.id} content_type={data[key].label} label={data[key].label}
            data={data[key].data}
            state={state == data[key].label}
            key={`var-${data[key].label}`}
            company_type={data.company.company_type}
          />)
        }
      }
      return result
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
        <div className={styles.Tabs + ' ' + className}>
            <Tabs.TabHeaderContainer>
              <HeadersTabs/>
            </Tabs.TabHeaderContainer>
        <TabPanels/>

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
Tabs.Panel = ({ children, state, name, className = " ", company_type, ...props }: {className?: string,company_type?: string, children: ReactNode | ReactNode[] | React.ReactElement | string, state: boolean, name?: string } & PanelProps) =>  {

 if(state) return (
    <div data-company-type={company_type}  className={styles.tabPanel + " " + className} data-state={state} data-name={name}>
      {children}
    </div>
  )
  return null
}

Tabs.TabHeaderContainer = ({ children }: { children: ReactNode | ReactNode[] | React.ReactElement | string }) => (
    <ul className={styles.containerHeader}>{children}</ul>
)
export default Tabs;
