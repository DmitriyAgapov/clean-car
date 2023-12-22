import { useOutsideClick } from "utils/utils";
import styles from "components/common/layout/TableWithSort/TableWithSort.module.scss";
import { SvgFilter } from "components/common/ui/Icon";
import FilterBar from 'components/common/layout/TableWithSort/FilterBar'
import { useState } from 'react'
import React from 'react'

export default function DataFilter(filterData: any) {
  const [state, setState] = useState(false)
  const ref = useOutsideClick(() => {
    setState(false)
  })
  const handleState = (event: React.MouseEvent<HTMLAnchorElement>) => {
    setState((prevState) => !prevState)
  }
  return (
    <div className={styles.btnFilter} ref={ref}>
      <a onClick={(event) => handleState(event)}>
        <SvgFilter />
      </a>
      {state && <FilterBar state={state} filters={filterData} />}
    </div>
  )
}
