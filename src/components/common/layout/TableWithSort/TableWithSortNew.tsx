import React, { useEffect, useState } from "react";
import styles from "./TableWithSort.module.scss";
import Panel, { PanelColor, PanelProps, PanelRouteStyle, PanelVariant } from "components/common/layout/Panel/Panel";
import { useLocation, useSearchParams } from 'react-router-dom'
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
import { useElementSize, useWindowEvent, useViewportSize, useDebouncedValue } from '@mantine/hooks'


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
  const {width} = useViewportSize()
  const nextPageIsNotExist = localStore.getData?.next
  const pageS = localStore.params.getSearchParams.page_size ?? 1
  return React.useMemo(() => {
    // if(!nextPageIsNotExist && width && width < 1000) return
    // if(width && width < 1000) return <Button text={'Load more'} action={() => localStore.loadMore()}/>
    // if(localStore.params.searchParams.page_size === undefined) return <div></div>
    return <Pagination classNames={{
      control:
        'hover:border-accent data-[active=true]:border-accent data-[active]:bg-transparent data-[active=true]:text-accent',
    }}
      total={(initCount &&  Math.ceil(initCount / pageS) > 1) ? Math.ceil(initCount / pageS) : 0}
      value={localStore.params.searchParams.page}
      onChange={value => localStore.params.setSearchParams({ page: Number(value) })}
      boundaries={1}
      withControls={!!(width && width > 743)}
      siblings={1}
    />
  }, [width, nextPageIsNotExist]);
})

const TableWithSortNew = observer(({ variant, withOutLoader, search = false,headerBar = true, filter = false, state = false, className, ar, background = PanelColor.default, style = PanelRouteStyle.default, initFilterParams, ...props
}: TableWithSortProps) => {
    const store = useStore()
    const localStore = useLocalStore<LocalRootStore>()
    const _count = localStore.params.getItemsCount
    const rows = toJS(localStore.getData)?.results
    const initCount = _count
    const noData = localStore.getData?.results?.length === 0 && !localStore.isLoading && localStore.params.getIsReady
    const { ref: refBody, width, height } = useElementSize();
    const fontSize = store.appStore.fontSizeBodyCalc()
    const [heightVal, setHeightVal] = useState(0)
    const { height:heightV, width:widthV } = useViewportSize();
    const location = useLocation()

    React.useEffect(() => {
      heightVal !== 0 && setHeightVal(0)
      const correct = widthV > 1920 ? 5 : 3;
      (() => {
          if(height > 0 && heightVal == 0) {
            setHeightVal(height)
            const footehH = Math.ceil(fontSize * 6);
            const _height = Math.floor(height - footehH);
            const _fSize = Math.ceil(fontSize * 3) + correct;
            const  _res = Math.ceil(_height / _fSize);
            if(refBody.current !== null && _height > 0 && _count !== _res) {
              if (store.appStore.bodyRef.clientWidth > 960) {
                const val = !_count ? _res - 1 : _res
                localStore.params.setItemsCount(val)
              } else {
                localStore.params.setItemsCount(10)
              }
            }
          }
      })()
    }, [heightV, fontSize,  height]);

    return (
        <Panel ref={refBody} state={false}
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
                </> : false
            }
            footer={<PaginationComponent />}
            {...props}
        >
            <table  className={styles.TableWithSort} data-style={style} data-width={`${Math.floor(100 / ar.length)}`}>
                {headerBar && <RowHeading total={initCount} ar={ar} />}
                <tbody>
                {!noData ? rows && rows.map((item: any, index: number) => <RowData style={style} {...item} key={item.id + '_00' + index} />) :<Heading className={'min-h-[40vh] flex items-center justify-center hidden'} text={'Нет данных'} variant={HeadingVariant.h3} />}
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
