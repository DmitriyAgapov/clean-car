import styles from 'components/common/layout/TableWithSort/TableWithSort.module.scss'
import Button, { ButtonSizeType, ButtonVariant } from 'components/common/ui/Button/Button'
import React, { JSX, useState } from 'react'
import { Select } from '@mantine/core'
import { BidsStatus } from 'stores/bidsStrore'
import { DateInput } from '@mantine/dates'
import dayjs from 'dayjs'
import { FilterData } from 'components/common/layout/TableWithSort/DataFilter'
import { useStore } from 'stores/store'
import { useLocalStore } from 'stores/localStore'
import { observer } from 'mobx-react-lite'
import { TableSearchParams } from 'components/common/layout/TableWithSort/TableWithSort.store'
import { Status } from 'utils/schema'
import { CarType } from "stores/carStore";

interface FilterBarProps {
  state: boolean
  filters:  any[] | undefined
}
const ctx = React.createContext<TableSearchParams | null>(null)

const SelectStyles = {
    root: '!mb-0 !pb-0',
    label: 'text-xss uppercase mb-1 text-gray-2',
    input: 'h-8 rounded-sm !bg-gray-2/20 border-gray-2/80 text-white focus:border-white/40 focus:filter-none',
}
const FilterElements = ({ filters }:{filters: any}) => {

    const params = React.useContext(ctx)

    const store = useStore()

  return React.useMemo(() => {
    const elements: any[] = []

    params && filters && filters.forEach((el: FilterData) => {
      switch (el) {
        case FilterData.city:
          elements.push(
            <Select classNames={SelectStyles}
              label={'Город'}
              size={'xs'}
              clearable
              defaultValue={params.company__city}
              onChange={(value) => {
                if (value !== null) {
                  params.company__city = value
                } else if (value === null) {
                  console.log('cityIsNull', value)
                  delete params.company__city
                }
                console.log('cityIsNullAfter', params)
              }}

              comboboxProps={{ withinPortal: false }}
              data={store.catalogStore.allCities.map((city: any) => ({
                label: city.name,
                value: city.id.toString(),
              }))} />,
          )
          break
        case FilterData.is_active:
          elements.push(
            <Select label={'Статус'}
              size={'xs'}
              clearable
              defaultValue={params.status}
              onChange={(value) => {
                if (value !== null) {
                  params.status = value as Status
                  // setParams((prevState) => ({...prevState, status: value}))
                } else {
                  let newParams: any = params
                  delete params.status
                  // setParams(newParams)
                }
              }}
              classNames={SelectStyles}
              comboboxProps={{ withinPortal: false }}
              data={Object.keys(BidsStatus).filter((v) => isNaN(Number(v))).map((key, index) => ({
                label: key,
                value: (index + 1).toString(),
              }))} />,
          )
          break
        case FilterData.service_type:
          elements.push(
            <Select clearable
              label={'Услуга'}
              size={'xs'}
              defaultValue={params.service_type}
              onChange={(value) => {
                if (value !== null) {
                  params.service_type = value
                  // setParams((prevState) => ({...prevState, service_type: value}))
                } else {
                  let newParams: any = params
                  delete params.service_type
                  // setParams(newParams)
                }
              }}
              classNames={SelectStyles}
              comboboxProps={{ withinPortal: false }}
              data={store.catalogStore.allServices.map((service: any) => ({
                label: service.name,
                value: service.id.toString(),
              }))} />,
          )
          break
        case FilterData.car_type:
          elements.push(
            <Select clearable
              label={'Тип'}
              size={'xs'}
              defaultValue={params.car_type}
              onChange={(value) => {
                if (value !== null) {
                  params.car_type = value
                  // setParams((prevState) => ({...prevState, service_type: value}))
                } else {
                  let newParams: any = params
                  delete params.car_type
                  // setParams(newParams)
                }
              }}
              classNames={SelectStyles}
              comboboxProps={{ withinPortal: false }}
              data={Object.keys(CarType).map((type: any, index: number) => ({
                label: type,
                value: index.toString(),
              }))} />,
          )
          break;
        case FilterData.start_date:
          elements.push(
            <DateInput classNames={{
              ...SelectStyles,
              monthCell: 'text-white',
              day: 'text-white data-[disabled=true]:text-white/40 data-[selected=true]:text-accent hover:text-accent/80',
            }}
              popoverProps={{
                withinPortal: false,
                width: 300,
                styles: {
                  dropdown: {
                    width: 280,
                  },
                },
              }}
              defaultValue={params.start_date ? dayjs(params.start_date).toDate() : null}
              clearable
              onChange={(value) => {
                const timestamp = dayjs(String(value)).format('YYYY-MM-DD')
                if (value !== null) {
                  params.start_date = timestamp
                  // setParams((prevState) => ({...prevState, start_date: timestamp}))
                } else {
                  delete params.start_date
                  // setParams(newParams)
                }
              }}
              valueFormat='DD.MM.YYYY'
              label={'Дата начала'}
              placeholder='' />,
          )
          break
        case FilterData.end_date:
          elements.push(
            <DateInput classNames={{
              ...SelectStyles,
              monthCell: 'text-white',
              day: 'text-white data-[disabled=true]:text-white/40 data-[selected=true]:text-accent hover:text-accent/80',
            }}
              clearable
              popoverProps={{
                withinPortal: false,
                width: 300,
                styles: {
                  dropdown: {
                    width: 280,
                  },
                },
              }}
              defaultValue={params.end_date ? dayjs(params.end_date).toDate() : null}
              onChange={(value) => {
                const timestamp = dayjs(String(value)).format('YYYY-MM-DD')
                if (value !== null) {
                  params.end_date = timestamp
                  // setParams((prevState) => ({...prevState, end_date: timestamp}))
                } else {
                  let newParams: any = params
                  delete params.end_date
                  // setParams(newParams)
                }
              }}
              valueFormat='DD.MM.YYYY'
              label={'Дата конца'}
              placeholder='' />,
          )
          break

        default:
          break
      }
    })

    return <>{elements}</>

  }, [filters, params])
}

const FilterBar = ({ filters, state = false }: FilterBarProps) => {
  const localStore = useLocalStore()

  const [params, setParams] = useState<TableSearchParams | null>(localStore.params.getSearchParams)

  const handleAction = React.useCallback(() => {
      localStore.params.clearParams()
      localStore.params.setSearchParams(params)
  }, [params])

  const handleClearAction = React.useCallback(() => {
    localStore.params.clearParams()
    setParams(null)
  }, [params])


  // @ts-ignore
  return (
    <div className={styles.filterBar} data-state={state}>
      <ctx.Provider value={params}>
        <FilterElements filters={filters}/>
      </ctx.Provider>
      <Button
        text={'Применить'}
        type={'button'}
        action={handleAction}
        variant={ButtonVariant.accent}
        size={ButtonSizeType.sm}
        className={'!rounded-xl'}
      />
      <Button
        text={'Сбросить'}
        action={handleClearAction}
        variant={ButtonVariant['accent-outline']}
        size={ButtonSizeType.sm}
        className={'!rounded-xl'}
      />
    </div>
  )
}

export default observer(FilterBar)
