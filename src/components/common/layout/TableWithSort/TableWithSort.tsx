import React, { useState } from 'react'
import styles from './TableWithSort.module.scss'
import Panel, { PanelColor, PanelRouteStyle, PanelVariant } from 'components/common/layout/Panel/Panel'
import { SvgFilter, SvgLoading, SvgSearch, SvgSort } from 'components/common/ui/Icon'
import Chips from 'components/common/ui/Chips/Chips'
import { useLocation, useNavigate } from 'react-router-dom'

type TableWithSortProps = {
  data: any[]
  state: boolean
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
  console.log(queryUrl)
  const handleClick = () => (props.id ? navigate(location.pathname + queryUrl + `/${props.id}`) : void null)

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
export const TableSearch = () => (
  <div className={'form-search relative h-8'}>
    <input type={'search'} placeholder={'Быстрый поиск'} className={'search-dashboard'} />
    <SvgSearch />
  </div>
)

const TableWithSort = ({
  data,
  search = false,
  filter = false,
  state,
  ar,
  style = PanelRouteStyle.default,
}: TableWithSortProps) => {
  const [filterString, setFilterString] = React.useState({
    index: 0,
    reversed: false,
  })

  const [dataFiltered, setFilteredData] = useState(data)

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
    return dataFiltered.map((item: any, index: number) => <RowData {...item} key={item.id + '_00' + index} />)
  }, [filterString, dataFiltered])
  const handleHeaderAction = (props: any) => {
    setFilterString({
      index: props.index,
      reversed: props.reversed,
    })
  }
  if (state) return <SvgLoading className={'m-auto'} />
  return (
    <Panel
      className={styles.TableWithSortPanel + ' ' + 'col-span-full'}
      routeStyle={style}
      variant={PanelVariant.default}
      background={PanelColor.glass}
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
    >
      <table className={styles.TableWithSort} data-style={style}>
        <RowHeading action={(props: any) => handleHeaderAction(props)} ar={ar} />
        <tbody>{RowDataMemoized}</tbody>
      </table>
    </Panel>
  )
}

export default TableWithSort
