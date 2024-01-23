import React, { useMemo, useState } from 'react'
import styles from './TableWithSort.module.scss'
import Panel, { PanelColor, PanelProps, PanelRouteStyle, PanelVariant } from 'components/common/layout/Panel/Panel'
import { SvgChevron, SvgLoading, SvgSort } from 'components/common/ui/Icon'
import Chips from 'components/common/ui/Chips/Chips'
import { useAsyncValue, useLoaderData, useLocation, useNavigate, useRevalidator, useSearchParams } from "react-router-dom";
// import Pagination from 'components/common/Pagination/Pagination'
import {Pagination} from "@mantine/core";
import DataFilter from 'components/common/layout/TableWithSort/DataFilter'
import TableSearch from 'components/common/layout/TableWithSort/TableSearch'
import { useDebouncedState } from '@mantine/hooks'
import label from 'utils/labels'
import { useWindowDimensions } from 'utils/utils'
import Button, { ButtonSizeType, ButtonVariant } from 'components/common/ui/Button/Button'
import { UserTypeEnum } from "stores/userStore";
import { CompanyType } from "stores/companyStore";
import { useStore } from "stores/store";
import agent from "utils/agent";

type TableWithSortProps = {
    data: any[]
    state: boolean
    className?: string
    background?: PanelColor
    ar: string[]
    style?: PanelRouteStyle
    search?: boolean
    initFilterParams?: {}
    total?: number
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
        // console.log('click');
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
                {ar.map((arItem: string, index: number) => {
                    return (
                        <th
                            key={`rh-${index}`}
                            className={styles.tableheading}
                            onClick={() => handleSortKey(index)}
                            data-sort-selected={index === count.index}
                            data-sort-reversed={index === count.index && count.reversed === true}
                        >
                            <div style={{display: 'flex'}}><span>{arItem}</span><SvgSort /></div>
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
        const route = location.pathname + queryCompanyTypeUrl + queryUrl + `${props.id}`

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
    data,
    search = false,
    filter = false,
    state,
    className,
    total,
    ar,
    action,
    pageSize = 10,
    background = PanelColor.default,
    style = PanelRouteStyle.default,
    initFilterParams,
    ...props
}: TableWithSortProps) => {
    const [filterString, setFilterString] = React.useState({
        index: 0,
        reversed: false,
    })
    const {data:loaderData, textData}:any = useLoaderData()

    let location = useLocation()
    const navigate = useNavigate()
    let [searchParams, setSearchParams] = useSearchParams()
    // @ts-ignore
    const [sortedField, setSortedField] = useState(textData.tableHeaders[0])
    const [currentPage, setCurrentPage] = useState(1)

    const handleCurrentPage = React.useCallback((value: any) => {
        setCurrentPage(value)
        setSearchParams((prevstate) => ({...prevstate, page: value}));
    }, [])

    // Быстрый поиск
    const [fastSearchString, setFastSearchString] = useDebouncedState('', 200)

    const fastSearch = React.useCallback((event: React.BaseSyntheticEvent) => {
        event.preventDefault()
        setFastSearchString(event.target.value)

        if(fastSearchString.length > 0 )  {
            setSearchParams((prevstate) => ({...prevstate, searchString: event.target.value}));
        } else {
            setCurrentPage(1)
        }
    }, [fastSearchString])

    //Сортировка результатов
    const someData = React.useCallback((event:  React.BaseSyntheticEvent) => {
        event.preventDefault()
        setFastSearchString(event.target.value)

        if(fastSearchString.length > 0 )  {
            setSearchParams((prevstate) => ({...prevstate, searchString: event.target.value}));
        } else {
            setCurrentPage(1)
        }
    }, [filterString])

    //Фильтрация результатов
    const [filterParams, setFilterParams] = useState(initFilterParams)

    const filteredData = useMemo(() => {
        // @ts-ignore
        return null
    }, [filterParams])

    const RowDataMemoized = React.useMemo(() => {
        // @ts-ignore
        return loaderData.results.map((item: any, index: number) => <RowData {...item} key={item.id + '_00' + index} />)
    }, [loaderData])

    const handleHeaderAction = React.useCallback((event: React.BaseSyntheticEvent) => {
        // @ts-ignore
        setSortedField(textData.tableHeaders[event.index])
        // @ts-ignore
        setSearchParams((prevstate) => ({...prevstate, ordering: sortedField}));
        setCurrentPage(1)
    }, [sortedField])

    if (state) return <SvgLoading className={'m-auto'} />

    return (
        <Panel
            background={background ? background : PanelColor.glass}
            className={styles.TableWithSortPanel + ' ' + className + ' col-span-full grid grid-rows-[auto_1fr_auto]'}
            routeStyle={style}
            variant={variant ? variant : PanelVariant.dataPadding}
            footerClassName={'px-6 pt-2 pb-6 flex  justify-end'}
            headerClassName={''}
            header={
                <>
                    {search && <TableSearch action={fastSearch} />}
                    {filter && <DataFilter filterData={filteredData} />}
                </>
            }
            footer={
             ( loaderData.count / pageSize) > 1 && (
                    <Pagination
                        classNames={{
                            control:
                                'hover:border-accent data-[active=true]:border-accent data-[active=true]:text-accent',
                        }}
                        total={loaderData.count / pageSize}
                        value={currentPage}
                        onChange={(e) => handleCurrentPage(e)}
                        boundaries={2}
                        defaultValue={10}
                    />
                )
            }
            {...props}
        >
            <table className={styles.TableWithSort} data-style={style}>
                <RowHeading action={handleHeaderAction} total={total} ar={ar} />
                <tbody>{RowDataMemoized}</tbody>
            </table>
        </Panel>
    )
}

export default TableWithSortNew;
