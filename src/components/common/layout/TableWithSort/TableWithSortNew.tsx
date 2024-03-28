import React, { useMemo, useState } from "react";
import styles from "./TableWithSort.module.scss";
import Panel, { PanelColor, PanelProps, PanelRouteStyle, PanelVariant } from "components/common/layout/Panel/Panel";
import { SvgChevron, SvgCleanCarLoader, SvgLoading, SvgSort } from "components/common/ui/Icon";
import Chips from "components/common/ui/Chips/Chips";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { LoadingOverlay, Pagination } from "@mantine/core";
import DataFilter, { FilterData } from "components/common/layout/TableWithSort/DataFilter";
import TableSearch from "components/common/layout/TableWithSort/TableSearch";
import { useDebouncedState } from "@mantine/hooks";
import label from "utils/labels";
import { useWindowDimensions } from "utils/utils";
import Button, { ButtonSizeType, ButtonVariant } from "components/common/ui/Button/Button";
import { CompanyType } from "stores/companyStore";
import Status from "components/common/ui/Status/Status";
import Heading, { HeadingVariant } from "components/common/ui/Heading/Heading";
import { useStore } from "stores/store";
import { observer } from "mobx-react-lite";

type TableWithSortProps = {
    data?: any[]
    state?: boolean
    className?: string
    background?: PanelColor
    ar: { label: string, name: string }[]
    style?: PanelRouteStyle
    search?: boolean
    initFilterParams?: FilterData[] | undefined
    total: number
    withOutLoader?: boolean
    filter?: boolean
    pageSize?: number
    variant?: PanelVariant
} & PanelProps

const RowHeading = ({ ar, sort, action, total }: any) => {
    const [count, setCount] = useState({
        index: 0,
        reversed: false,
        count: total ?? 0,
    })
    const handleSortKey = (index: number) => {

        let newVal = {
            index: index,
            reversed: false,
            count: 0,
        }
        if (count.index === index) {
            newVal.count = count.count + 1
        } else {
            newVal.index = index
            newVal.count = 0
        }
        if (newVal.count === 1) {
            newVal.reversed = true
        }
        if (newVal.count > 1) {
            newVal = {
                index: index,
                reversed: false,
                count: 0,
            }
        }
        setCount(newVal)
        action(newVal)
    }
    return (
        <thead>
            <tr className={styles.tableheader + ' tableheader'}>
                {ar.map((arItem: { label: string, name: string }, index: number) => {
                    return (
                        <th
                            key={`rh-${index}`}
                            // style={(index !== 0 && index !== ar.length - 1) ? ({ width: `${100 / ar.length}%` } ): {}}
                            className={styles.tableheading}
                            onClick={() => handleSortKey(index)}
                            data-sort-selected={index === count.index}
                            data-sort-reversed={index === count.index && count.reversed === true}
                        >
                            <div style={{ display: 'flex' }}>
                                <span>{arItem.label}</span>
                                <SvgSort />
                            </div>
                        </th>
                    )
                })}
            </tr>
        </thead>
    )
}

const RowData = (props: any) => {
    const navigate = useNavigate()
    const location = useLocation()
    const querys = React.useCallback(() => {
        let queryString = ''
        if (props.query) {
            for (const key in props.query) {
                queryString = queryString + `/${props.query[key]}`
            }
            return queryString
        }
        return ''
    }, [])

    const queryCompanyType = React.useCallback(() => {
        let queryString = ''
        if (props.type) {
            return props.type == CompanyType.performer ? '/performer' : props.type == CompanyType.customer ? '/customer' : '/admin'
        }
        return ''
    }, [])
    const queryUrl = querys()
    const queryCompanyTypeUrl = queryCompanyType()


    const handleClick = () => {
        if (props.query && props.query.rootRoute) {
            return navigate(props.query.rootRoute)
        }
        const route = location.pathname + queryCompanyTypeUrl + queryUrl + `/${props.id}`

        props.id ? navigate(route) : void null
    }

    const propsRender = () => {
        const ar = []
        for (const key in props) {
            if (typeof props[key] !== 'object') {
                if (props[key] === 'Активна' || props[key] === true) {
                    ar.push(<td key={key}
                      className={styles.tableCell}>
                        <Chips state={true} />
                    </td>,)
                } else if(props[key] === 'Неактивна'  || props[key] === false) {
                    ar.push(<td key={key}
                      className={styles.tableCell}>
                        <Chips state={false} />
                    </td>,)
                } else if(key === 'status') {
                    ar.push(<td key={key}
                      className={styles.tableCell}>
                        <Status variant={props[key]} />
                    </td>,)
                } else {
                    if (key !== 'id' && key !== 'companyId') {
                        ar.push(<td key={key}
                          className={styles.tableCell} data-label={label(key)}>
                            {' '}
                            <p className={'m-0'}>{props[key]}{' '}</p>
                        </td>,)
                    }
                }
            }
        }
        return ar
    }
    // @ts-ignore
    const {width} = useWindowDimensions()

    const [open, setOpen] = useState(false);
    return (
        <tr className={styles.tableRow} onClick={(width && width > 961) ? handleClick : () => setOpen(prevState => !prevState)} data-state-mobile={open}>
            {propsRender()}
            {(width && width < 961) && <td data-position={'icon-open'} onClick={() => setOpen(prevState => !prevState)}>
                <SvgChevron/>
            </td>}
            {(width && width < 961) && <td data-position="button-mobile" ><Button text={'Подробнее'} variant={ButtonVariant['accent-outline']} className={'w-full col-span-full max-w-xs m-auto mt-4'} size={ButtonSizeType.sm} action={handleClick}/></td>}
        </tr>
    )
}

const TableWithSortNew = ({
    variant,
    withOutLoader,
    data,
    search = false,
    filter = false,
    state = false,
    className,
    ar,
    action,
    pageSize = 10,
    background = PanelColor.default,
    style = PanelRouteStyle.default,
    initFilterParams,
    ...props
}: TableWithSortProps) => {

    const initCount = props.total || 0
    const store = useStore()

    let [searchParams, setSearchParams] = useSearchParams()

    // @ts-ignore
    const [sortedField, setSortedField] = useState<null | string>(searchParams.get('ordering'))
    const [currentPage, setCurrentPage] = useState<number>(Number(searchParams.get('page')) ?? 1)

    const handleCurrentPage = React.useCallback((value: any) => {
        const pageParams = searchParams.get('page');
        if(withOutLoader) {
            // console.log('withyout', searchParams);
            // searchParams.set('page', encodeURIComponent(value))
            store.paramsStore.setParams({page: encodeURIComponent(value)});
            setSearchParams((prev) => {
                searchParams.set('page', encodeURIComponent(value))
                return searchParams
            })} else  {
            console.log('withyout', searchParams.get('page'));
            // searchParams.set('page', encodeURIComponent(value))
            store.paramsStore.setParams({page: encodeURIComponent(value)});
            setSearchParams((prev) => {
                searchParams.set('page', encodeURIComponent(value))
                return searchParams
            })
        }
        setCurrentPage(Number(searchParams.get('page')))
    }, [searchParams])
    React.useEffect(() => {
        const pageParams = searchParams.get('page');
        setCurrentPage(Number(searchParams.get('page')))
    }, [searchParams.get('page')])


    const RowDataMemoized = React.useMemo(() => {
        if(withOutLoader) {
            let initPage = (currentPage === 1) ? currentPage - 1 : (currentPage - 1) * pageSize
            if (data && data.length > 0) return data.slice(initPage, initPage + pageSize).map((item: any, index: number) => <RowData {...item} key={item.id + '_00' + index} />)
        }
        //* TODO Сделать прелоадер *//

        // return <tr className={' !-mb-48'}><td colSpan={100}><LoadingOverlay transitionProps={{ transition: 'fade', duration: 1000, exitDuration: 1000 }} classNames={{
        //     overlay: 'bg-black/80 backdrop-blur-xl z-9999',
        //     loader: 'w-8 h-8'
        // }} visible={true}  loaderProps={{ children: <SvgCleanCarLoader className={'!w-16 !h-16 !m-0'}/> }} />
        // </td>
        // </tr>
        if(data && data.length > 0) return data.map((item: any, index: number) => <RowData  {...item} key={item.id + '_00' + index} />)

    }, [data, currentPage])

    const handleHeaderAction = React.useCallback((e: any) => {
        // @ts-ignore
        if(e.reversed) {
            // searchParams.set('ordering', encodeURIComponent(`-${ar[e.index].name}`))
            store.paramsStore.setParams({ordering: encodeURIComponent(`-${ar[e.index].name}`)});
            setSearchParams((prev) => ({...store.paramsStore.params as URLSearchParams, ordering: encodeURIComponent(`-${ar[e.index].name}`)}))
            setSortedField(`-${ar[e.index].name}`)
        } else {
            // @ts-ignore
            // searchParams.set('ordering', encodeURIComponent(`${ar[e.index].name}`))
            store.paramsStore.setParams({ordering: encodeURIComponent(`${ar[e.index].name}`)});
            setSearchParams((prev) => ({...store.paramsStore.params as URLSearchParams, ordering: encodeURIComponent(`${ar[e.index].name}`)}))
            setSortedField(ar[e.index].name)
        }
    }, [sortedField, searchParams.get('ordering')])


    // if (state) return <SvgLoading className={'m-auto'} />

    return (
        <Panel
            background={background ? background : PanelColor.glass}
            className={styles.TableWithSortPanel + ' ' + className + ' col-span-full grid grid-rows-[auto_1fr_auto]'}
            routeStyle={style}
            variant={variant ? variant : PanelVariant.dataPadding}
            footerClassName={'px-6 pt-2 pb-6 flex  justify-end'}
            headerClassName={''}
            header={search || filter ?
                <>
                    {search && <TableSearch/>}
                    {(filter && initFilterParams && initFilterParams?.length > 0) && <DataFilter filterData={initFilterParams} />}
                </> : null
            }
            footer={
             ( Math.ceil(initCount / pageSize)) > 1 && (
                    <Pagination
                        classNames={{
                            control:
                                'hover:border-accent data-[active=true]:border-accent data-[active=true]:text-accent',
                        }}
                        total={Math.ceil(initCount / pageSize)}
                        value={currentPage}
                        onChange={(e) => handleCurrentPage(e)}
                        // boundaries={2}
                        defaultValue={10}
                    />
                )
            }
            {...props}
        >       {(initCount === 0 && props.total ) ? <Heading className={'min-h-[40vh] flex items-center justify-center'} text={'Нет данных'} variant={HeadingVariant.h3} />:
          <table className={styles.TableWithSort} data-style={style} data-width={`${Math.floor(100 / ar.length)}`}>

                <RowHeading action={handleHeaderAction} total={initCount} ar={ar} />

                <tbody>{RowDataMemoized}</tbody>
            </table>}
        </Panel>
    )
}

export default observer(TableWithSortNew);
