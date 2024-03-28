import styles from "components/common/layout/TableWithSort/TableWithSort.module.scss";
import SelectPure from "components/common/ui/Select/SelectPure";
import Button, { ButtonSizeType, ButtonVariant } from 'components/common/ui/Button/Button'
import React, { JSX, ReactNode, useState } from "react";
import { Select } from "@mantine/core";
import { BidsStatus } from "stores/bidsStrore";
import { DateInput } from "@mantine/dates";
import dayjs from "dayjs";
import { FilterData } from "components/common/layout/TableWithSort/DataFilter";
import { useStore } from "stores/store";
import { useSearchParams } from "react-router-dom";

interface FilterBarProps {
  state: boolean
  filters:  any[] | undefined
}
const ctx = React.createContext<{
  company__city?: string
  status?: string
  start_date?: string
  end_date?: string
  service_type?: string
}>({})

const SelectStyles = {
    root: '!mb-0 !pb-0',
    label: 'text-xss uppercase mb-1 text-gray-2',
    input: 'h-8 rounded-sm !bg-gray-2/20 border-gray-2/80 text-white focus:border-white/40 focus:filter-none',
}
const FilterElements = ({ filters }:{filters: any}) => {
    const params = React.useContext(ctx)
    console.log(params, 'ctx')
    const store = useStore()
    const elements: JSX.Element[] = []
    filters && filters.forEach((el: FilterData) => {
            switch (el) {
                case FilterData.city:
                    elements.push(
                        <Select
                          classNames={SelectStyles}
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
                            }))}
                        />,
                    )
                    break
                case FilterData.is_active:
                    elements.push(
                        <Select
                            label={'Статус'}
                            size={'xs'}
                            clearable
                          defaultValue={params.status}
                            onChange={(value) => {
                                if (value !== null) {
                                  params.status = value
                                    // setParams((prevState) => ({...prevState, status: value}))
                                } else {
                                    let newParams: any = params
                                    delete params.status
                                    // setParams(newParams)
                                }
                            }}
                            classNames={SelectStyles}
                            comboboxProps={{ withinPortal: false }}
                            data={Object.keys(BidsStatus)
                                .filter((v) => isNaN(Number(v)))
                                .map((key, index) => ({
                                    label: key,
                                    value: (index + 1).toString(),
                                }))}
                        />,
                    )
                    break
                case FilterData.service_type:
                    elements.push(
                        <Select
                            clearable
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
                            }))}
                        />,
                    )
                    break
                case FilterData.start_date:
                    elements.push(
                        <DateInput
                            classNames={{
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
                            placeholder=''
                        />,
                    )
                    break
                case FilterData.end_date:
                    elements.push(
                        <DateInput
                            classNames={{
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
                            placeholder=''
                        />,
                    )
                    break

                default:
                    break
            }
        })
    return <>{elements}</>
}

export default function FilterBar({ filters, state = false }: FilterBarProps) {
  let [searchParams, setSearchParams] = useSearchParams();
  const [params, setParams] = useState<{
    company__city?: string
    status?: string
    start_date?: string
    end_date?: string
    service_type?: string
  }>(() => {
    const data = {}
    searchParams.has('service_type') && Object.assign(data, {service_type: searchParams.get('service_type')})
    searchParams.has('company__city') && Object.assign(data, {company__city: searchParams.get('company__city')})
    searchParams.has('start_date') && Object.assign(data, {start_date: searchParams.get('start_date')})
    searchParams.has('end_date') && Object.assign(data, {end_date: searchParams.get('end_date')})
    searchParams.has('status') && Object.assign(data, {status: searchParams.get('status')})
    return data
  })
  const handleAction = React.useCallback(() => {
      searchParams.set('page', '1')
      searchParams.set('page_size', '10')
      params.company__city ? searchParams.set('company__city', params.company__city) : searchParams.delete('company__city')
      params.status ? searchParams.set('status', params.status) : searchParams.delete('status')
      params.service_type ? searchParams.set('service_type', params.service_type) : searchParams.delete('service_type')
      params.start_date ? searchParams.set('start_date', params.start_date) : searchParams.delete('start_date')
      params.end_date ? searchParams.set('end_date', params.end_date) : searchParams.delete('end_date')
      setSearchParams((prev) => {
        return searchParams
      })
  }, [params])
  const handleClearAction = React.useCallback(() => {
      setSearchParams({page: "1", page_size: "10"})
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
