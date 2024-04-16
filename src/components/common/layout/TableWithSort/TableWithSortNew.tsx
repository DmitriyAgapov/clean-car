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
import { useStore } from "stores/store";


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




const TableWithSortNew = observer(({ variant, withOutLoader, search = false,headerBar = true, filter = false, state = false, className, ar, background = PanelColor.default, style = PanelRouteStyle.default, initFilterParams, ...props
}: TableWithSortProps) => {
    const localStore = useLocalStore<LocalRootStore>()
    const store =useStore()
    const rows = toJS(localStore.getData)?.results
    const initCount = localStore.getData?.count || 0
    const {data, params: {getSearchParams: {page_size: pageSize}}} = localStore
    const noData = localStore.getData?.results?.length === 0 && !localStore.isLoading
    let [searchParams, setSearchParams] = useSearchParams([['page', '1'], ['page_size', '10']])
    console.log(localStore);
    // @ts-ignore
    const [sortedField, setSortedField] = useState<null | string>(null)
    const [currentPage, setCurrentPage] = useState<number>(1);

    const handleCurrentPage = React.useCallback((value: any) => {
        localStore.params.setSearchParams({page: value})
        if(withOutLoader) {
            searchParams.set('page', String(value))
            setSearchParams(searchParams.toString())

        } else  {
            searchParams.set('page', String(value));
            setSearchParams(searchParams.toString()
            )        }
        setCurrentPage(Number(value))
    }, [sortedField, currentPage, searchParams, localStore.params.searchParams])


    const RowDataMemoized = React.useMemo(() => {
        if(withOutLoader) {
            let initPage = (currentPage === 1) ? currentPage - 1 : (currentPage - 1) * pageSize
            if (data && data.length > 0) return data.slice(initPage, initPage + pageSize).map((item: any, index: number) => <RowData  {...item} key={item.id + '_00' + index} />)
        }
        if(data && data.length > 0) return data.map((item: any, index: number) => <RowData    {...item} key={item.id + '_00' + index} />)

    }, [data, currentPage])

    const handleHeaderAction = React.useCallback((e: any) => {
        // @ts-ignore
        searchParams.set('page', '1')
        if(e.reversed) {
            searchParams.set('ordering', encodeURIComponent(`-${ar[e.index].name}`))
            // store.paramsStore.setParams({ordering: encodeURIComponent(`-${ar[e.index].name}`)});

            setSortedField(`-${ar[e.index].name}`)
        } else {
            // @ts-ignore
            searchParams.set('ordering', encodeURIComponent(`${ar[e.index].name}`))
            // store.paramsStore.setParams({ordering: encodeURIComponent(`${ar[e.index].name}`)});

            setSortedField(ar[e.index].name)
        }
        setSearchParams(searchParams.toString())
    }, [sortedField, currentPage, searchParams])

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
             (Math.ceil(initCount / localStore.params.searchParams.page_size)) > 1 && (
               <Pagination
                        classNames={{
                            control:
                                'hover:border-accent data-[active=true]:border-accent data-[active=true]:text-accent',
                        }}
                        total={Math.ceil(initCount / localStore.params.searchParams.page_size)}
                        value={localStore.params.searchParams.page}
                        onChange={value => localStore.params.setSearchParams({page: Number(value)})}
                        // boundaries={2}
                        defaultValue={5}
                    />
                )
            }
            {...props}
        >

            <table  className={styles.TableWithSort} data-style={style} data-width={`${Math.floor(100 / ar.length)}`}>
                {headerBar && <RowHeading total={initCount} ar={ar} />}
                <tbody>
                {!noData &&  ( (rows && rows.length > 0)  ?  rows.map((item: any, index: number) => <RowData    {...item} key={item.id + '_00' + index} />) :  <Heading className={'min-h-[40vh] flex items-center justify-center hidden'} text={'Нет данных'} variant={HeadingVariant.h3} />)}
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
