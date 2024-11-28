import styles from 'components/common/layout/TableWithSort/TableWithSort.module.scss'
import Button, { ButtonSizeType, ButtonVariant } from 'components/common/ui/Button/Button'
import React from 'react'
import { Select } from '@mantine/core'
import { BidsStatus } from 'stores/bidsStrore'
import { DateInput } from '@mantine/dates'
import dayjs from 'dayjs'
import {  FilterData } from "components/common/layout/TableWithSort/DataFilter";
import { useStore } from 'stores/store'
import { LocalRootStore, useLocalStore } from "stores/localStore";
import { observer } from 'mobx-react-lite'
import { TableSearchParams } from "components/common/layout/TableWithSort/TableWithSort.store";
import { CarType } from "stores/carStore";
import { useViewportSize } from '@mantine/hooks'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)


interface FilterBarProps {
  state: boolean
  filters:  any[] | undefined
  action: (state:any) => void
}

const SelectStyles = {
    root: '!mb-0 !pb-0',
    label: 'text-xss uppercase mb-1 text-gray-2',
    input: 'h-8 rounded-sm !bg-gray-2/20 border-gray-2/80 text-white focus:border-white/40 focus:filter-none',
    dropdown: '!rounded-[0.25rem]'
}
const FilterElements = observer(({ filters, values }: { filters: any, values?: TableSearchParams }) => {
    const  localStore = useLocalStore<any>();
    const params = values;
    const { width } = useViewportSize()
    const portalState = React.useMemo(() => {
        return width && width > 740 ? true : false
    }, [width])
    const store = useStore()
    const setInitParams = React.useCallback(() => {
        if (localStore.params) {
          localStore.params.setFilterState(false)
          localStore.params.setSearchParams({
            page:1,
            page_size:10,
          })
        }
    }, [])

    const elem = ():React.ReactNode => {
      const elements: any[] = []
      filters.forEach((el: FilterData) => {
        switch (el) {
          case FilterData.city:
            elements.push(
              <Select
                classNames={SelectStyles}
                label={'Город'}
                size={'xs'}
                clearable
                value={localStore.params.getSearchParams.company__city || null}
                onChange={(value) => {
                  setInitParams()
                  if (value !== null) {
                    localStore.params.setSearchParams({
                      company__city: value
                    })
                  } else if (value === null) {
                    localStore.params.deleteParams("company__city")
                  }
                }}
                comboboxProps={{ withinPortal: portalState }}
                data={store.catalogStore.allCities.map((city: any) => ({
                  label: city.name,
                  value: city.id.toString(),
                }))}
              />,
            )
            break;
          case FilterData.city__id:
            elements.push(
              <Select
                classNames={SelectStyles}
                label={'Город'}
                size={'xs'}
                clearable
                value={localStore.params.getSearchParams.city || null}
                onChange={(value) => {
                  setInitParams()
                  if (value !== null) {
                    localStore.params.setSearchParams({
                      city: value
                    })
                  } else if (value === null) {
                    localStore.params.deleteParams("city")
                  }
                }}
                comboboxProps={{ withinPortal: portalState }}
                data={store.catalogStore.allCities.map((city: any) => ({
                  label: city.name,
                  value: city.id.toString(),
                }))}
              />,
            )
            break;

          case FilterData.bidStatus:
            elements.push(
              <Select
                label={'Статус'}
                size={'xs'}
                clearable
                value={localStore.params.getSearchParams.status || null}
                onChange={(value) => {
                  setInitParams()
                  if (value !== null) {
                    localStore.params.setSearchParams({
                      status: value
                    })
                    // setParams((prevState) => ({...prevState, status: value}))
                  } else {
                    let newParams: any = localStore.params
                    localStore.params.deleteParams("status")
                    // setParams(newParams)
                  }
                }}
                classNames={SelectStyles}
                comboboxProps={{ withinPortal: portalState }}
                data={Object.keys(BidsStatus)
                .filter((v) => isNaN(Number(v)))
                .map((key, index) => ({
                  label: key,
                  value: index.toString(),
                }))}
              />,
            )
            break
          case FilterData.brand:
            // @ts-ignore
            elements.push(
              <Select
                label={'Марка'}
                size={'xs'}
                clearable
                value={localStore.params.getSearchParams.brand || null}
                onChange={(value) => {
                  setInitParams()
                  if (value !== null) {
                    localStore.params.setSearchParams({
                      brand: value
                    })
                    // setParams((prevState) => ({...prevState, status: value}))
                  } else {
                    let newParams: any = localStore.params
                    localStore.params.deleteParams("brand")
                    // setParams(newParams)
                  }
                }}
                classNames={SelectStyles}
                comboboxProps={{ withinPortal: portalState }}
                //@ts-ignore
                data={(() => {
                  const _data = store.catalogStore.carBrandsCurrent
                  return _data.map((brand: any) => ({
                    label: brand.name,
                    value: brand.id.toString(),
                  }))
                })()}
              />,
            )
            break
          case FilterData.is_active:
            elements.push(
              <Select
                label={'Статус'}
                size={'xs'}
                clearable
                value={String(localStore.params.getSearchParams.is_active) || null}
                defaultValue={null}
                onChange={(value) => {
                  setInitParams()
                  if (value !== null) {
                    localStore.params.setSearchParams({
                      is_active: value
                    })
                    // setParams((prevState) => ({...prevState, status: value}))
                  } else {
                    let newParams: any = localStore.params
                    localStore.params.deleteParams("is_active")
                    // setParams(newParams)
                  }
                }}
                classNames={SelectStyles}
                comboboxProps={{ withinPortal: portalState }}
                data={[
                  { label: 'Активен', value: 'true' },
                  { label: 'Неактивен', value: 'false' },
                ]}
              />,
            )
            break

          case FilterData.service_type:
            elements.push(
              <Select
                clearable
                label={'Услуга'}
                size={'xs'}
                value={localStore.params.getSearchParams.service_type || null}
                onChange={(value) => {
                  setInitParams()
                  if (value !== null) {
                    localStore.params.setSearchParams({
                      service_type: value
                    })
                    // setParams((prevState) => ({...prevState, service_type: value}))
                  } else {
                    let newParams: any =localStore.params
                    localStore.params.deleteParams("service_type")
                    // setParams(newParams)
                  }
                }}
                classNames={SelectStyles}
                comboboxProps={{ withinPortal: portalState }}
                data={store.catalogStore.allServices.map((service: any) => ({
                  label: service.name,
                  value: service.id.toString(),
                }))}
              />,
            )
            break
          case FilterData.company_type:
            elements.push(
              <Select
                clearable
                label={'Тип компании'}
                size={'xs'}
                value={localStore.params.getSearchParams.company__company_type || null}
                onChange={(value) => {
                  setInitParams();
                  if (value !== null) {
                    localStore.params.setSearchParams({
                      company__company_type: value
                    })
                    // setParams((prevState) => ({...prevState, service_type: value}))
                  } else {
                    let newParams: any =localStore.params
                    localStore.params.deleteParams("company__company_type")
                    // setParams(newParams)
                  }
                }}
                classNames={SelectStyles}
                comboboxProps={{ withinPortal: portalState }}
                data={[
                  'Клиент',
                  'Партнер',
                  'Физическое лицо',
                  'Администратор системы',
                ].map((el: string) => ({
                  label: el,
                  value: el,
                }))}
              />,
            )
            break
          case FilterData.company_type_c:
            // console.log('company_type_c')
            elements.push(
              <Select
                clearable
                label={'Тип компании'}
                size={'xs'}
                value={localStore.params.getSearchParams.company_type || null}
                onChange={(value) => {
                  // console.log(value);
                  setInitParams()
                  if (value !== null) {
                    localStore.params.setSearchParams({
                      company_type: value
                    })
                    // setParams((prevState) => ({...prevState, service_type: value}))
                  } else {
                    let newParams: any = localStore.params
                    localStore.params.deleteParams("company_type")
                    delete localStore.params.company_type
                    // setParams(newParams)
                  }
                }}
                classNames={SelectStyles}
                comboboxProps={{ withinPortal: portalState }}
                data={[
                  'Клиент',
                  'Партнер',
                  // 'Физическое лицо',
                  // 'Администратор системы',
                ].map((el: string) => ({
                  label: el,
                  value: el,
                }))}
              />,
            )
            break
          case FilterData.employee__is_active:
            elements.push(
              <Select
                clearable
                label={'Статус'}
                size={'xs'}
                value={localStore.params.getSearchParams.employee__is_active || null}
                onChange={(value) => {
                  setInitParams()
                  if (value !== null) {
                    localStore.params.setSearchParams({
                      employee__is_active: value
                    })
                    // setParams((prevState) => ({...prevState, service_type: value}))
                  } else {
                    let newParams: any =localStore.params
                    localStore.params.deleteParams("employee__is_active")
                    // setParams(newParams)
                  }
                }}
                classNames={SelectStyles}
                comboboxProps={{ withinPortal: portalState }}
                data={[
                  { label: 'Активен', value: 'true' },
                  { label: 'Неактивен', value: 'false' },
                ]}
              />,
            )
            break
          case FilterData.car_type:
            elements.push(
              <Select
                clearable
                label={'Тип'}
                size={'xs'}
                value={localStore.params.getSearchParams.car_type || null}
                onChange={(value) => {
                  setInitParams()
                  if (value !== null) {
                    localStore.params.setSearchParams({
                      car_type: value
                    })
                    // setParams((prevState) => ({...prevState, service_type: value}))
                  } else {
                    let newParams: any =localStore.params
                    localStore.params.deleteParams("car_type")
                    // setParams(newParams)
                  }
                }}
                classNames={SelectStyles}
                comboboxProps={{ withinPortal: portalState }}
                data={Object.keys(CarType).map((type: any, index: number) => ({
                  label: type,
                  value: type.toString(),
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
                value={localStore.params.getSearchParams.start_date ? dayjs(localStore.params.getSearchParams.start_date).utc(true).toDate() : null}
                clearable
                onChange={(value) => {
                  setInitParams()
                  const timestamp = dayjs(String(value)).format()
                  if (value !== null) {
                    localStore.params.setSearchParams({
                      start_date: timestamp
                    })
                    // setParams((prevState) => ({...prevState, start_date: timestamp}))
                  } else {
                    localStore.params.deleteParams("start_date")
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
                value={localStore.params.getSearchParams.end_date ? dayjs(localStore.params.getSearchParams.end_date).utc(true).toDate() : null}
                onChange={(value) => {
                  setInitParams()
                  const timestamp = dayjs(String(value)).format()
                  if (value !== null) {
                    localStore.params.setSearchParams({
                      end_date: timestamp
                    })
                    // setParams((prevState) => ({...prevState, end_date: timestamp}))
                  } else {
                      let newParams: any = localStore.params
                      localStore.params.deleteParams('end_date')
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
      return elements
    }

  return <>{elem()}</>
})

const FilterBar = React.forwardRef(({ filters, state = false, action }: FilterBarProps, ref: any) => {
  const localStore = useLocalStore<LocalRootStore>()
  const params = localStore.params.getSearchParams
  const handleAction = React.useCallback(() => {
      localStore.params.clearParams()
      localStore.params.setSearchParams(params)
  }, [params])

  const handleClearAction = React.useCallback(() => {
    localStore.params.clearParams()
    action(false)
    // setParams()
  }, [])
  // @ts-ignore
  return (

    <div className={styles.filterBar} data-state={true} ref={ref}>

      <FilterElements filters={filters} values={params}/>


      <Button
        text={'Сбросить'}
        action={handleClearAction}
        variant={ButtonVariant['cancel']}
        size={ButtonSizeType.sm}
        className={'!rounded-md mt-5 !text-sm !font-normal'}
      />
      <Button
        text={'Применить'}
        type={'button'}
        action={action}
        variant={ButtonVariant.accent}
        size={ButtonSizeType.sm}
        className={'!rounded-xl tablet-max:!block !hidden'}
      />
    </div>
  )
})

export default observer(FilterBar)
