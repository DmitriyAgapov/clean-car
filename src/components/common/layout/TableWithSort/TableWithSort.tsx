import React, { useState } from 'react'
import styles from './TableWithSort.module.scss'
import Panel, { PanelColor, PanelRouteStyle, PanelVariant } from 'components/common/layout/Panel/Panel'
import { SvgFilter, SvgLoading, SvgSearch, SvgSort } from 'components/common/ui/Icon'
import Chips from 'components/common/ui/Chips/Chips'
import { useLocation, useNavigate } from 'react-router-dom'
import Pagination from 'components/common/Pagination/Pagination'

type TableWithSortProps = {
    data: any[]
    state: boolean
    className?: string
    ar: string[]
    style?: PanelRouteStyle
    search?: boolean
    filter?: boolean
}

const RowHeading = ({ ar, sort, action }: any) => {
    const [count, setCount] = useState({
        index: 0,
        reversed: false,
        count: 0,
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
                {ar.map((arItem: string, index: number) => {
                    return (
                        <th
                            key={`rh-${index}`}
                            className={styles.tableheading}
                            onClick={() => handleSortKey(index)}
                            data-sort-selected={index === count.index}
                            data-sort-reversed={index === count.index && count.reversed === true}
                        >
                            <span>{arItem}</span> <SvgSort />
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
                // queryString = queryString + `${key}=${props.query[key]}&`
            }
            return queryString
        }
        return ''
    }, [])
    const queryUrl = querys()
    const queryCompanyType = props.type == "Компания-Исполнитель" ? "/performer" : props.type == "Компания-Заказчик" ? "/customer" : null;
    const handleClick = () => (props.id ? navigate(location.pathname + queryCompanyType + queryUrl + `/${props.id}`) : void null)

    const propsRender = () => {
        const ar = []
        for (const key in props) {
            if (typeof props[key] !== 'object') {
                if (typeof props[key] === 'boolean') {
                    ar.push(
                        <td key={key} className={styles.tableCell}>
                            <Chips state={props[key]} />
                        </td>,
                    )
                } else {
                    if (key !== 'id') {
                        if (key !== 'companyId') {
                            ar.push(
                                <td key={key} className={styles.tableCell}>
                                    {props[key]}
                                </td>,
                            )
                        }
                    }
                }
            }
        }
        return ar
    }

    return (
        <tr className={styles.tableRow} onClick={handleClick}>
            {propsRender()}
        </tr>
    )
}
export const TableSearch = ({inputProps, action}:{ inputProps?: {list?:string}, action?: (e: any) => void}) => (
    <div className={'form-search relative h-8'}>
        <input type={'search'} placeholder={'Быстрый поиск'} onChange={action} className={'search-dashboard'} {...inputProps}/>
        <SvgSearch />
    </div>
)

const TableWithSort = ({
    data,
    search = false,
    filter = false,
    state,
    className,
    ar,
    style = PanelRouteStyle.default,
}: TableWithSortProps) => {
    const [filterString, setFilterString] = React.useState({
        index: 0,
        reversed: false,
    })

    const [dataFiltered, setFilteredData] = useState(data)
    const [currentPage, setCurrentPage] = useState(1)
    const handleCurrentPage = (value: any) => {
        // @ts-ignore
        setCurrentPage(value)
    }
    const someData = React.useCallback(() => {
        let sortData = Object.keys(data[0])[filterString.index]

        const fData = dataFiltered.sort((a, b) => {
            if (a[sortData] < b[sortData]) {
                return 1
            }
            if (a[sortData] > b[sortData]) {
                return -1
            }
            return 0
        })

        if (!filterString.reversed) {
            setFilteredData(fData.reverse())
        } else setFilteredData(fData)
    }, [filterString])

    const RowDataMemoized = React.useMemo(() => {
        someData()
        return dataFiltered
            .slice(currentPage == 1 ? currentPage - 1 : (currentPage - 1) * 10, currentPage * 10)
            .map((item: any, index: number) => <RowData {...item} key={item.id + '_00' + index} />)
    }, [filterString, dataFiltered, currentPage])

    const handleHeaderAction = (props: any) => {
        setFilterString({
            index: props.index,
            reversed: props.reversed,
        })
    }
    if (state) return <SvgLoading className={'m-auto'} />
    return (
        <Panel
            className={styles.TableWithSortPanel + ' ' + className + ' col-span-full grid grid-rows-[auto_1fr_auto]'}
            routeStyle={style}
            variant={PanelVariant.default}
            background={PanelColor.glass}
            footerClassName={'px-6 pt-2 pb-6 flex  justify-end'}
            headerClassName={''}
            header={
                <>
                    {' '}
                    {search && <TableSearch />}
                    {filter && (
                        <div className={styles.btnFilter}>
                            <SvgFilter />
                        </div>
                    )}
                </>
            }
            footer={
                <Pagination
                    itemsLength={dataFiltered.length}
                    action={(event: any) => handleCurrentPage(event)}
                    currenPage={currentPage}
                />
            }
        >
            <table className={styles.TableWithSort} data-style={style}>
                <RowHeading action={(props: any) => handleHeaderAction(props)} ar={ar} />
                <tbody>{RowDataMemoized}</tbody>
            </table>
        </Panel>
    )
}

export default TableWithSort;
