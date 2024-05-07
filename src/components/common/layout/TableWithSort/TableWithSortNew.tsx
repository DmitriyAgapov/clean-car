import React, { useEffect, useState } from "react";
import styles from "./TableWithSort.module.scss";
import Panel, { PanelColor, PanelProps, PanelRouteStyle, PanelVariant } from "components/common/layout/Panel/Panel";
import { useSearchParams } from "react-router-dom";
import { Pagination } from "@mantine/core";
import DataFilter, { FilterData } from "components/common/layout/TableWithSort/DataFilter";
import TableSearch from "components/common/layout/TableWithSort/TableSearch";
import Heading, { HeadingVariant } from "components/common/ui/Heading/Heading";
import { observer } from "mobx-react-lite";
import { LocalRootStore, LocalStoreProvider, useLocalStore } from "stores/localStore";
import RowHeading from "components/common/layout/TableWithSort/TableParts/RowHeading";
import RowData from "components/common/layout/TableWithSort/TableParts/RowData";
import { toJS } from "mobx";
import { useStore } from 'stores/store'
import { useDidUpdate } from "@mantine/hooks";


type TableWithSortProps = {
    data?: any[]
    state?: boolean
    className?: string
    headerBar?: boolean
    background?: PanelColor
    ar: { label: string, name: string }[]
    style?: PanelRouteStyle
    search?: boolean
    initFilterParams?: FilterData[] | undefined
    total?: number | undefined
    withOutLoader?: boolean
    filter?: boolean
    pageSize?: number
    variant?: PanelVariant
} & PanelProps


export const PaginationComponent = observer(():any => {
    const localStore = useLocalStore<LocalRootStore>()

  const initCount = localStore.countData
return <Pagination classNames={{
    control:
      'hover:border-accent data-[active=true]:border-accent data-[active]:bg-transparent data-[active=true]:text-accent',
  }}
    total={(initCount &&  Math.ceil(initCount / localStore.params.searchParams.page_size) > 1) ? Math.ceil(initCount / localStore.params.searchParams.page_size) : 0}
    value={localStore.params.searchParams.page}
    onChange={value => localStore.params.setSearchParams({ page: Number(value) })}
    // boundaries={2}
    defaultValue={5} />

})

const TableWithSortNew = observer(({ variant, withOutLoader, search = false,headerBar = true, filter = false, state = false, className, ar, background = PanelColor.default, style = PanelRouteStyle.default, initFilterParams, ...props
}: TableWithSortProps) => {
    const localStore = useLocalStore<LocalRootStore>()
    const store =useStore()
    const rows = toJS(localStore.getData)?.results
    const initCount = localStore.getData?.count || 0
    const {data, params: {getSearchParams: {page_size: pageSize}}} = localStore
    const noData = localStore.getData?.results?.length === 0 && !localStore.isLoading


    return (
        <Panel
            background={background ? background : PanelColor.glass}
            className={styles.TableWithSortPanel + ' ' + className + ' col-span-full grid grid-rows-[auto_1fr_auto] overflow-hidden'}
            routeStyle={style}
            variant={variant ? variant : PanelVariant.dataPadding}
            footerClassName={'px-6 pt-2 pb-6'}
            headerClassName={''}
            header={search || filter ?
                <>
                    {search && <TableSearch/>}
                    {(filter && initFilterParams && initFilterParams?.length > 0) && <DataFilter filterData={initFilterParams} />}
                </> : null
            }
footer={
  <PaginationComponent />}
            {...props}
        >

            <table  className={styles.TableWithSort} data-style={style} data-width={`${Math.floor(100 / ar.length)}`}>
                {headerBar && <RowHeading total={initCount} ar={ar} />}
                <tbody>
                {!noData &&  ( (rows && rows.length > 0)  ?  rows.map((item: any, index: number) => <RowData    style={style}  {...item} key={item.id + '_00' + index} />) :  <Heading className={'min-h-[40vh] flex items-center justify-center hidden'} text={'Нет данных'} variant={HeadingVariant.h3} />)}
                </tbody>
            </table>
        </Panel>
    )
})

const TableWithSort = (props:any) => {
    return (
      <LocalStoreProvider stores={props.store}>
          <TableWithSortNew {...props} />
      </LocalStoreProvider>
    )
}

export default observer(TableWithSort);
