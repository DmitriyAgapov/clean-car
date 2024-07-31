import React, { useState } from "react";
import styles from "./TableWithSort.module.scss";
import stylesGrid from "./TableWithSortGrid.module.scss";
import Panel, { PanelColor, PanelProps, PanelRouteStyle, PanelVariant } from "components/common/layout/Panel/Panel";
import { Pagination, ScrollArea, Table } from '@mantine/core'
import DataFilter, { FilterData } from "components/common/layout/TableWithSort/DataFilter";
import TableSearch from "components/common/layout/TableWithSort/TableSearch";
import { observer } from "mobx-react-lite";
import { LocalRootStore, LocalStoreProvider, useLocalStore } from "stores/localStore";
import RowHeading from "components/common/layout/TableWithSort/TableParts/RowHeading";
import RowData from "components/common/layout/TableWithSort/TableParts/RowData";
import { toJS } from "mobx";
import { useStore } from "stores/store";
import { useDebouncedValue, useElementSize, useViewportSize } from "@mantine/hooks";
import { PaginationComponent } from "components/common/layout/TableWithSort/TableParts/PaginationComponent";
import { GridView, TableView } from "components/common/layout/TableWithSort/TableParts/TableView";


export type TableWithSortProps = {
    data?: any[]
    state?: boolean
    view?: boolean
    autoScroll?: boolean
    className?: string
    headerBar?: boolean
    background?: PanelColor
    ar: { label: string, name: string }[]
    style?: PanelRouteStyle
    search?: boolean
    initFilterParams?: FilterData[] | undefined
    total?: number | undefined
    withOutLoader?: boolean
    footerProps?:any
    footerHeight?:string
    filter?: boolean
    pageSize?: number
    variant?: PanelVariant
} & PanelProps
const TableWithSortNew = observer(({ variant, view = false, withOutLoader,  autoScroll, search = false,headerBar = true, filter = false, state = false, className, ar, background = PanelColor.default, style = PanelRouteStyle.default, initFilterParams, ...props
}: TableWithSortProps) => {
    const store = useStore()
    const localStore = useLocalStore<LocalRootStore>()
    const _count = localStore.params.getItemsCount
    const rows = toJS(localStore.getData)?.results
    const _countFetch = toJS(localStore.getData)?.count
    const initCount = _count
    const { ref: refBody, width, height } = useElementSize();
    const fontSize = store.appStore.fontSizeBodyCalc()
    const [heightVal, setHeightVal] = useState(0)
    const [value] = useDebouncedValue(heightVal, 500)
    const { height:heightV, width:widthV } = useViewportSize();

    React.useLayoutEffect(() => {
      setHeightVal((prevState) => height !== prevState ? height : prevState);
      const correct = widthV > 1920 ? 5 : 3;
      (() => {
          if(value > 0 && !autoScroll) {
            const footehH = Math.ceil(fontSize * 7.5);
            const headerH = Math.ceil(fontSize * 9);
            const _height = Math.floor(value - footehH - headerH);
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
    }, [height, fontSize, value, _count]);

      const {footerHeight, ...otherProps} = props

      return (
        <Panel ref={refBody} state={false}
            background={background ? background : PanelColor.glass}
            className={styles.TableWithSortPanel + ' ' + className + ' col-span-full grid grid-rows-[auto_1fr_auto] overflow-hidden'}
            // style={autoScroll ? {maxHeight: (heightV - Number(fontSize) * 22.5) +'px'} : {}}
            routeStyle={style}
            variant={variant ? variant : PanelVariant.dataPadding}
            footerClassName={'px-6 pt-2 pb-4 h-24' + " " + props.footerClassName}
            headerClassName={''}
            header={search || filter ?
                <>
                    {search && <TableSearch/>}
                    {(filter && initFilterParams && initFilterParams?.length > 0) && <DataFilter filterData={initFilterParams} />}
                </> : false
            }
            footer={!autoScroll ? <><PaginationComponent />{props.footer }</> : props.footer }
            {...otherProps}
        >
          {autoScroll ? view ? <GridView key={props.footerProps?.id + "_00"}
            props={{...props, ref: width}}
            dataStyle={style}
            ar={ar}
            headerBar={headerBar}
            total={initCount}
            view={true}
            autoScroll={autoScroll}
            rows={rows}
            countFetch={_countFetch}
            element={(item: any, index: number) => <RowData style={style} view={item.view} {...item}
            key={item.id + "_00" + index} />}/> :
            <TableView key={props.footerProps?.id + "_00"}
                props={props}
                dataStyle={style}
                ar={ar}
                headerBar={headerBar}
                total={initCount}
                autoScroll={autoScroll}
                rows={rows}
                countFetch={_countFetch}
                element={(item: any, index: number) => <RowData style={style} {...item} key={item.id + "_00" + index}
                />
            } /> : <table className={styles.TableWithSort} data-style={style} data-width={`${Math.floor(100 / ar.length)}`}>
            {/* Заголовок табилцы */}
            {headerBar && <RowHeading total={initCount} ar={ar} />}


            <tbody>{rows && rows.map((item: any, index: number) =>
              <RowData style={style} {...item}
                key={item.id + "_00" + index} />
            )}</tbody>
          </table>}

        </Panel>
      )
})

const TableWithSort = (props: TableWithSortProps & any & {store?: any}) => {
  const {store, ...otherProps} = props
  return (
    <LocalStoreProvider stores={store}>
      <TableWithSortNew {...otherProps} />
    </LocalStoreProvider>
  )
}

export default observer(TableWithSort);
