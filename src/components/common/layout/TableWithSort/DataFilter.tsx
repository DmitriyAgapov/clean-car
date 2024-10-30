import styles from "components/common/layout/TableWithSort/TableWithSort.module.scss";
import icon from "assets/icons/filter.png"
import FilterBar from 'components/common/layout/TableWithSort/FilterBar'
import { useState } from 'react'
import React from 'react'
import { useClickOutside, useDisclosure } from '@mantine/hooks'
import Image from "components/common/ui/Image/Image";
import { LocalRootStore, LocalStoreProvider, useLocalStore } from "stores/localStore";
import { TableSearchParams } from 'components/common/layout/TableWithSort/TableWithSort.store'
import { Popover } from '@mantine/core'
import { Button as Btn } from '@mantine/core'
import { observer } from "mobx-react-lite";
import { SvgClose } from 'components/common/ui/Icon'
import { keys } from "mobx";
export enum FilterData {
  city= 'city',
  city__id= 'city__id',
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
export const ctx = React.createContext<any>({
  page: 1,
  page_size: 10
})
function DataFilter({ filterData}: {filterData: any[] | undefined}) {
  const [opened, { close, open, toggle}, ] = useDisclosure(false);
  const ref = useClickOutside(() => {
    close()
  })
  const localStore = useLocalStore<LocalRootStore>()
  // const isActiveBtn = Array.from(Object.keys(localStore.params.getSearchParams)).length > 4
  const isActiveBtn = localStore.params.getFilterState
  const paramsS = localStore.params.getSearchParams

  React.useEffect(() => {
    const except = ['page', "page_size", "ordering", "q"]
    const isFilterActive = keys(paramsS).some((el:any) => !except.includes(el))
    localStore.params.setFilterState(isFilterActive)
  }, [paramsS])
  return (
        <div className={styles.btnFilter + ` ` + ` border ${isActiveBtn && '!border-accent'}`}>
            <ctx.Provider value={localStore.params.getSearchParams}>
                {/* <Popover   middlewares={{ shift: { padding: 20 } }} trapFocus opened={opened} width={"100vw"}   classNames={{ */}
                {/*   dropdown: '!top-0' */}
                {/* } */}

                {/* } clickOutsideEvents={['mouseup', 'touchend']} */}

                {/*   position="bottom" */}
                {/*   withArrow */}
                {/*   shadow="md"> */}
                <Popover opened={opened}  clickOutsideEvents={['mouseup', 'touchend', 'click']} width={240} position='bottom-end' shadow='md'   classNames={{
                  dropdown: '!px-0'
                }}>
                    <Popover.Target>
                        <a className={`flex-1 flex justify-center items-center`} onClick={toggle}>
                            {/* <SvgFilter /> */}
                            <Image src={icon} alt={''} className={`w-5 h-6 `} />
                        </a>
                    </Popover.Target>
                    <Popover.Dropdown className={'!bg-transparent border-0'}>
                        <div className={styles.wrapper}>
                            {/* <a onClick={close}>Close</a> */}
                            <FilterBar state={opened} filters={filterData} action={toggle} ref={ref}/>
                        </div>
                    </Popover.Dropdown>
                </Popover>
            </ctx.Provider>
        </div>
    )
}

export default observer(DataFilter)
