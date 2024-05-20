import styles from "components/common/layout/TableWithSort/TableWithSort.module.scss";
import icon from "assets/icons/filter.png"
import FilterBar from 'components/common/layout/TableWithSort/FilterBar'
import { useState } from 'react'
import React from 'react'
import { useClickOutside } from "@mantine/hooks";
import Image from "components/common/ui/Image/Image";
export enum FilterData {
  city= 'city',
  car_type= 'car_type',
  employee__is_active= 'employee__is_active',
  brand= 'brand',
  service_type= 'service_type',
  company_type = 'company_type',
  company_type_c = 'company_type_c',
  is_active= 'is_active',
  bidStatus= 'bidStatus',
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
            <a className={'flex-1 flex justify-center items-center'} onClick={(event) => handleState(event)}>
                {/* <SvgFilter /> */}
              <Image src={icon} alt={''} className={'w-5 h-6'}/>
            </a>
            {state && <FilterBar state={state} filters={filterData} action={handleState}/>}
        </div>
    )
}
