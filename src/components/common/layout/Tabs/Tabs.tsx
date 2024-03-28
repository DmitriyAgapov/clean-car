import React, { ReactElement, ReactNode, useEffect, useState } from 'react'
import styles from './Tabs.module.scss'
import { PanelColor, PanelProps, PanelVariant } from 'components/common/layout/Panel/Panel'
import TabsVariants, { TabsVariantBids, TabsVariantPrice, TabsVariantsCars, TabsVariantsFilial } from "routes/company/TabsVariants/TabsVariants";
import { Observer, observer } from "mobx-react-lite";
import { useStore } from "stores/store";
export enum TabsType {
  bid = 'bid',
  company = 'company',
  filial = 'filial',
  user = 'user',
  price = 'price',
  priceEdit = 'priceEdit',
}
export type TabsProps = {
  data?: any
  className?: string
  type?: TabsType
}
const Tabs = ({ data, className, panels, items, type }: TabsProps & {panels?: any, items?: any}) => {
  const store = useStore()
  const aTab = store.bidsStore.ActiveTab
  const [state, setState] = useState(data[0].label);

    const  handleChangeTabState = React.useCallback((event: Event, label: string) => {
      setState(label);
    }, [])

  React.useEffect(() => {
    if(aTab !== null) {
      setState(aTab)
    }
    store.bidsStore.setActiveTab(null);
  }, [aTab]);

  const TabPanels = observer(()=> {
      const result:any = []
        if(type == TabsType.bid) {
          data.forEach((item: any, index: number) => {
            result.push(<TabsVariantBids key={`tab_${index}`} state={state == item.label} data={item.data} label={item.label} props={items} className={'!pb-0 h-full content-between'}/>)
          })
          return result
        }
        if(type == TabsType.price) {
          data.forEach((item: any, index: number) => {
            result.push(
              <TabsVariantPrice key={`tab_${index}`} state={state == item.label} data={item.dataTable} label={item.label} props={items} className={'!pb-0'}/>
            )
          })
          return result
        }
        if(type == TabsType.priceEdit) {
          // console.log(data);
          data.forEach((item: any, index: number) => {
            result.push(
              <TabsVariantPrice key={`tab_${index}`} edit={type == TabsType.priceEdit} state={state == item.label} data={item.data} label={item.label} props={items} className={'!pb-0'}/>
            )
          })
          return result
        }

        if(items) {
          data.forEach((item: any, index: number) => {
            result.push(<TabsVariantsCars key={`tab_${index}`} state={state == item.label} data={item.data} label={item.label} props={items}/>)
          })
          return result
        }
        if(type == TabsType.filial) {
          data.forEach((item: any, index: number) => {
            result.push(<TabsVariantsFilial key={`tab_${index}`} state={state == item.label} parentCompany={item.parent} company_type={data[0].company_type} data={item.data} label={item.label} props={data}/>)
          })
          return result
        }
        if(type == TabsType.company) {
          // console.log(data);
          data.forEach((item: any, index: number) => {
            result.push(
              <TabsVariants   key={`var-${item.label}`}
                company_type={data[0].company_type}
                companyId={data[0].data.id} content_type={item.label} state={state == item.label} data={item.data} label={item.label} props={items} className={'!pb-0'}/>
            )
          })
          return result
        }
          else if(data) {
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
      })

      const HeadersTabs = () => {
        // console.log(data);
        const result:any = [];
        for(const key in data) {
          // @ts-ignore
          result.push(<Tabs.Tab onClick={(event: Event) => handleChangeTabState(event, data[key].label)} title={data[key].label} state={data[key].label == state} key={data[key].label + `-tab`} />)
        }
        return  result
      }
      return (
          <div className={styles.Tabs + ' ' + (className ? className : "")}>
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
Tabs.Panel = observer(({ children, state, name, className = " ", company_type, ...props }: {className?: string,company_type?: string, children: ReactNode | ReactNode[] | React.ReactElement | string, state: boolean, name?: string } & PanelProps) =>  {

 if(state) return (
    <div data-company-type={company_type}  className={styles.tabPanel + " " + className} data-state={state} data-name={name}>
      {children}
    </div>
  )
  return null
})
Tabs.PanelPure = observer(({ children, state, name, className = " ", company_type, ...props }: {className?: string,company_type?: string, children: ReactNode | ReactNode[] | React.ReactElement | string, state: boolean, name?: string } & PanelProps) =>  {

 if(state) return (
    <div data-company-type={company_type}  className={styles.tabPanelPure + " " + className} data-state={state} data-name={name}>
      {children}
    </div>
  )
  return null
})

Tabs.TabHeaderContainer = ({ children }: { children: ReactNode | ReactNode[] | React.ReactElement | string }) => (
    <ul className={styles.containerHeader}>{children}</ul>
)
export default observer(Tabs);
