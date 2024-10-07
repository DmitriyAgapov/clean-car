import React, { ReactElement, ReactNode, useEffect, useRef, useState } from 'react'
import styles from './Tabs.module.scss'
import { PanelColor, PanelProps, PanelVariant } from 'components/common/layout/Panel/Panel'
import TabsVariants, { TabsVariantBids, TabsVariantPrice, TabsVariantsCars, TabsVariantsFilial } from "routes/company/TabsVariants/TabsVariants";
import { Observer, observer } from "mobx-react-lite";
import { useStore } from 'stores/store'
import { useDebouncedValue, useElementSize, useScrollIntoView, useViewportSize } from '@mantine/hooks'
export enum TabsType {
  bid = 'bid',
  company = 'company',
  filial = 'filial',
  user = 'user',
  price = 'price',
  priceEdit = 'priceEdit',
  car = 'car',
}
export type TabsProps = {
  data?: any
  className?: string
  type?: TabsType
  activeTab?: (active:string) => void
}
const HeadersTabs = ({ data, state, setState, }: { data: any, state: any, setState: (event: any, key: string) => void }) => {
    // console.log(data);
    const result: any = []
    for (const key in data) {
        // @ts-ignore
        result.push(
            <Tabs.Tab
                onClick={(event: Event) => setState(event, data[key].label)}
                title={data[key].label}
                state={data[key].label == state}
                key={data[key].label + `-tab`}
            />,
        )
    }
    return result
}
const TabPanels = ({ data, type, items, state }:{data:any, type:any, items:any[], state: string}) => {
    const result: any = []
    if (type == TabsType.bid) {
        data.forEach((item: any, index: number) => {
            result.push(
                <TabsVariantBids
                    key={`tab_${index}`}
                    state={state == item.label}
                    data={item.data}
                    label={item.label}
                    props={items}
                    className={'!pb-0 h-full'}
                />,
            )
        })
        return result
    }
    if (type == TabsType.price) {

        (data && data.length > 0) && data.forEach((item: any, index: number) => {

            result.push(
                <TabsVariantPrice
                    key={`tab_${index}`}
                    state={state == item.label}
                    data={item.dataTable}
                    label={item.label}
                    props={items}
                    className={'!pb-0'}
                />,
            )
        })
        return result
    }
    if (type == TabsType.priceEdit) {
        // console.log(data);
        data.forEach((item: any, index: number) => {
            result.push(
                <TabsVariantPrice
                    key={`tab_${index}`}
                    edit={type == TabsType.priceEdit}
                    state={state == item.label}
                    data={item.data}
                    label={item.label}
                    props={items}
                    className={'!pb-0'}
                />
            )
        })
        return result
    }

    if (type == TabsType.car) {
        data.forEach((item: any, index: number) => {
            result.push(
                <TabsVariantsCars
                    company_type={item.company_type}
                    companyId={item.company_id}
                    key={`tab_${index}`}
                    state={state == item.label}
                    data={item.data}
                    label={item.label}
                    props={items}
                />,
            )
        })
        return result
    }
    if (type == TabsType.filial) {
        data.forEach((item: any, index: number) => {
            result.push(
                <TabsVariantsFilial
                    companyId={item.company_id}
                    key={`tab_${index}`}
                    state={state == item.label}
                    parentCompany={item.parent}
                    company_type={data[0].company_type}
                    data={item.data}
                    label={item.label}
                    props={data}
                />,
            )
        })
        return result
    }
    if (type == TabsType.company) {
        data.forEach((item: any, index: number) => {
            result.push(
                <TabsVariants
                    key={`var-${item.label}`}
                    company_type={data[0].company_type}
                    companyId={data[0].data.id}
                    content_type={item.label}
                    state={state == item.label}
                    data={item.data}
                    label={item.label}
                    props={items}
                    className={'!pb-0'}
                />,
            )
        })
        return result
    } else if (data) {
        for (const key in data) {
            result.push(
                <TabsVariants
                    companyId={data.company.data.id}
                    content_type={data[key].label}
                    label={data[key].label}
                    data={data[key].data}
                    state={state == data[key].label}
                    key={`var-${data[key].label}`}
                    company_type={data.company.company_type}
                />,
            )
        }
    }

    return result
}
const Tabs = ({ data, className, activeTab, panels, items, type, variant=null }: TabsProps & {panels?: any, items?: any, variant?: string|null}) => {
  const store = useStore()
  const aTab = store.bidsStore.ActiveTab
  const [state, setState] = useState('');
  React.useEffect(() => {
    if(data && data.length > 0) {
      setState(data[0]?.label)
    }
  }, [])

  const  handleChangeTabState = React.useCallback((event: Event, label: string) => {
    if (activeTab) {
      label && activeTab(label);
    }
    setState(label);

  }, [])

  React.useEffect(() => {
    console.log('atab', aTab);
    if(aTab !== null) {
      setState(aTab)
    }
    store.bidsStore.setActiveTab(null)
  }, [aTab]);
  const ref = useRef(null)
  useEffect(() => {
    console.log('ref', ref);
  }, [ref.current]);
 const headerRef = useRef(null)
  useEffect(() => {
    // @ts-ignore
    console.log('headerRef', headerRef.current?.children[0].clientHeight);
  }, [headerRef.current]);

    return (
        <div ref={ref} className={styles.Tabs + ' ' + (className ? className : "")} data-variant={variant} data-panel={"tabs"}>
            <Tabs.TabHeaderContainer ref={headerRef}>
              <HeadersTabs data={data} state={state} setState={handleChangeTabState} />
            </Tabs.TabHeaderContainer>
           <TabPanels data={data} state={state} items={items} type={type}/>
        </div>
    )
  }

Tabs.Tab = ({ title, state, type, ...props }: { title: string; state: boolean} | any) => {
  return (
      <li className={styles.tabHeader} data-state={state} {...props}>
          {title}
      </li>
  )
}
Tabs.Panel = ({ children, state, name, className = " ", company_type, ...props }: {className?: string,company_type?: string, children: ReactNode | ReactNode[] | React.ReactElement | string, state: boolean, name?: string } & PanelProps) =>  {

 if(state) return (
    <div data-company-type={company_type}  className={styles.tabPanel + " " + className} data-panel={"panel"}  data-state={state} data-name={name}>
      {children}
    </div>
  )
  return null
}
Tabs.PanelPure = ({ children, state, name, className = " ", company_type, ...props }: {className?: string,company_type?: string, children: ReactNode | ReactNode[] | React.ReactElement | string, state: boolean, name?: string } & PanelProps) =>  {

 if(state) return (
    <div data-company-type={company_type}  className={styles.tabPanelPure + " " + className} data-state={state} data-name={name}>
      {children}
    </div>
  )
  return null
}

Tabs.TabHeaderContainer = React.forwardRef(({ children }: { children: ReactNode | ReactNode[] | React.ReactElement | string}, ref:any) => (
  <div className={styles.tabHeaderWrapper} data-tab-position={"header"} ref={ref}>
    <ul className={styles.containerHeader}>{children}</ul>
  </div>
  ))
export default observer(Tabs);
