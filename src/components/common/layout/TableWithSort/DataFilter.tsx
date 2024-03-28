import { useOutsideClick } from "utils/utils";
import styles from "components/common/layout/TableWithSort/TableWithSort.module.scss";
import { SvgFilter } from "components/common/ui/Icon";
import FilterBar from 'components/common/layout/TableWithSort/FilterBar'
import { useState } from 'react'
import React from 'react'
import { Select } from "@mantine/core";
import { useStore } from "stores/store";
import { useClickOutside } from "@mantine/hooks";
import { BidsStatus } from "stores/bidsStrore";
import dayjs from "dayjs";
import { DateInput, DateTimePicker } from "@mantine/dates";
export enum FilterData {
  city= 'city',
  service_type= 'service_type',
  is_active= 'is_active',
  start_date = 'start_date',
  end_date = 'end_date'
}

export default function DataFilter({ filterData}: {filterData: any[] | undefined}) {
    const [state, setState] = useState(false)
    const ref = useClickOutside(() => setState(false))

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
