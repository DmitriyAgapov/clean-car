import React, { ReactNode, useEffect, useRef, useState } from 'react'
import DList from 'components/common/ui/DList/DList'
import CardSimple from 'components/common/layout/Cards/CardSimple/CardSimple'
import Button, { ButtonSizeType, ButtonVariant } from 'components/common/ui/Button/Button'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import Panel, { PanelColor, PanelProps, PanelRouteStyle, PanelVariant } from 'components/common/layout/Panel/Panel'
import Tabs, { TabsProps } from '../../../components/common/layout/Tabs/Tabs'
import { useStore } from 'stores/store'
import TableWithSortNewPure from 'components/common/layout/TableWithSort/TableWithSortNewPure'
import { transformCompaniesToTree, translite } from 'utils/utils'
import { CAR_RADIUS } from 'stores/priceStore'
import { Box, ScrollArea, SimpleGrid, Text, Tree, useTree  } from '@mantine/core'
import { observer, useLocalStore } from 'mobx-react-lite'
import CarouselCustom from 'components/common/ui/CarouselCustom/CarouselCustom'
import { BidsStatus } from 'stores/bidsStrore'
import { PermissionNames } from 'stores/permissionStore'
import dayjs from 'dayjs'
import TableWithSortNew from 'components/common/layout/TableWithSort/TableWithSortNew'
import { LocalRootStore } from 'stores/localStore'
import TabFilials from 'routes/company/TabsVariants/TabFilials'
import TabCars from 'routes/company/TabsVariants/TabCars'
import TabUsers from 'routes/company/TabsVariants/TabUsers'
import TabBidHistory from 'routes/company/TabsVariants/TabBidHistory'
import { useViewportSize } from '@mantine/hooks'
import { WorkLoadStatus } from "components/common/Map/Map";
import agent from "utils/agent";
import { CompanyType, CompanyTypeRus } from "stores/companyStore";
import TabPermissions from "routes/company/TabsVariants/TabPermissions";
import useSWR from "swr";
import FilialsTree from 'components/FilialsTree/FilialsTree'
import  label from "utils/labels";
import TabHistory from "routes/company/TabsVariants/TabHistory";
import TabCarUsers from './TabCarUsers'
import TabUserCars from "routes/company/TabsVariants/TabUserCars";
import TabCarHistory from "routes/company/TabsVariants/TabCarHistory";
import { UserTypeEnum } from "stores/userStore";
const lbl = label
export type CAR_RADIUS_KEYS = {
  [K in keyof typeof CAR_RADIUS]: string | number;
}

export type ParsedResultTiresSubtype = {
  label: string
  items: CAR_RADIUS_KEYS
}

export type ParsedResultTires = {
  label: string
  items: ParsedResultTiresSubtype[]
}
type TabsVariantsProps = {
  label: string
  data: any
  companyId?: number
  company_type?: string
  content_type?: string
  parentCompany?: string
  props?: any
} & TabsProps & {className?: string, children?: ReactNode | ReactNode[] | React.ReactElement | string, state: boolean, name?: string } & PanelProps
export const TabsVariantsUser =  ({label, parentCompany, data, state, name, className, companyId, company_type, props}:TabsVariantsProps) => {

  if(!data) {
    return  null
  }
  const userData = React.useMemo(() => {
    return (
        <Tabs.Panel  state={state} name={'users'} variant={PanelVariant.dataPadding} background={PanelColor.default} className={'!bg-none !border-0 grid-cols-2 my-4'}  bodyClassName={'!bg-transparent'}>
          <DList label={'Пользователь'} title={data.employee?.last_name + ' ' + data?.employee?.first_name} />
          <DList label={'Номер телефона'} title={data?.employee?.phone} />
          <DList label={'E-mail'} title={data?.employee?.email} />
          <DList label={'Пользователь видит заявки'} title={data?.employee?.bid_visibility ? "Да" : "Нет"} />
          <DList
              label={'Тип'}
              title={lbl(company_type ? company_type : "admin")}
              directory={company_type}
          />

          {data?.group && data?.group.name && <DList label={'Группа'} title={data?.group.name} />}
          <DList

              label={'Статус'}
              title={
                <span className={data?.employee?.is_active ? 'text-active' : 'text-error'}>
                        {data?.employee?.is_active ? 'Активный' : 'Не активный'}
                    </span>
              }
          />

          {data?.company?.name && data?.company?.parent ? <DList label={'Компания'} title={data?.company?.parent.name} /> : <DList label={'Компания'} title={data?.company?.name} />}
          {data?.company?.city.name && <DList label={'Город'} title={data?.company.city.name} />}
          {data?.company?.parent && <DList label={'Филиал'} title={data?.company.name} />}
        </Tabs.Panel>
    )
  }, [data, state])
  let result
  switch (label) {
    case "Основная информация":
      result = userData
      break;
    case 'История':
      result = (<TabHistory state={state} company_id={data?.company.id} user_id={data.employee?.id} company_type={company_type} />)
      break;
    case 'Автомобили':
      result = (<TabUserCars userId={data?.employee?.id} state={state} companyId={data?.company.id} company_type={company_type} />)
      break;
    // case 'Автомобили':
    //   result = (<TabCars state={state} companyId={companyId} company_type={company_type} />)
    //   break;

    default:
      return null;
  }
  return  result
}
export const TabsVariantsFilial =  ({label, parentCompany, data, state, name, className, companyId, company_type, props}:TabsVariantsProps) => {

  if(!data) {
    return  null
  }
  let result
  switch (label) {
    case "Основная информация":
      result = (<Tabs.Panel state={state} name={'info'}  className={'pt-8'} company_type={company_type+'_filial'}>
        {data.customerprofile ? null : <DList label={'Адрес'} title={data[`${company_type}profile`].address} />}
        {data.parent.name && <DList label={'Компания'}
          // @ts-ignore
          title={data.parent.name} />}
        <FilialsTree data={data} company_type={company_type}/>
        {data?.performerprofile &&    <DList label={'Загруженность'} title={<WorkLoadStatus hasDot={false} status={data?.performerprofile.workload} className={'!top-0 !right-0 relative i:hidden'}/>} />}
        {data?.performerprofile && data?.performerprofile.height && <DList label={'Максимальная высота авто'} title={data?.performerprofile.height + ' см'} className={'!top-0 !right-0 relative i:hidden'}/>}

      </Tabs.Panel>)
      break;
    case 'Сотрудники':
      result = (<TabUsers state={state} companyId={companyId} company_type={company_type} />)
      break;

    case 'Филиалы':
      // result = null
      result = (<TabFilials state={state} companyId={companyId} company_type={company_type} />)
      break;
    case 'Права доступа':
      result = (<TabPermissions state={state} companyId={companyId} company_type={company_type} />)
      break;
    case 'Автомобили':
      result = (<TabCars state={state} companyId={companyId} company_type={company_type} />)
      break;
    // case 'Автомобили':
    //   result = (<TabCars state={state} companyId={companyId} company_type={company_type} />)
    //   break;

    default:
      return null;
  }
  return  result
}
const localRootStore =  new LocalRootStore()
const TabsVariants = ({label, content_type, data, state, name, className, companyId, company_type, ...props}:TabsVariantsProps) => {
  // console.log(props);
  const store = useStore()
  let result
  switch (label) {
    case "Основная информация":
      result = (<Tabs.Panel state={state}
        name={"info"}
        className={"pt-8"}
        company_type={company_type}>
        {/* {company_type === 'customer' && <DList label={'Оплата'} title={data[`${company_type}profile`].payment} />} */}
        {company_type === 'customer' ? (data.balance && <DList className={"row-span-2"} label={'Счет'} title={<>
          <Heading text={data.balance.total + ' ₽'}  variant={HeadingVariant.h2} color={HeadingColor.accent} />
          <Heading text={data[`${company_type}profile`].overdraft_sum + ' ₽' + ' с овердрафтом'}  variant={HeadingVariant.h4} color={HeadingColor.accent} />
        </>

        }/>)  : store.appStore.appType == "admin" ? <DList label={'Процент сервиса'} title={<>
          <Heading text={data.performerprofile.service_percent + ' %'}  variant={HeadingVariant.h2} color={HeadingColor.accent} />
        </>

        }/> : null}
        <DList label={'ИНН'} title={data[`${company_type}profile`].inn ?? "0"} />
        <DList label={'ОГРН'} title={data[`${company_type}profile`].ogrn} />

        <DList label={'Адрес'} title={data[`${company_type}profile`].address} />
        <DList label={'Юридический адрес'} title={data[`${company_type}profile`].legal_address} />
        <DList label={'Контакты для связи'} title={data[`${company_type}profile`].contacts}  className={"col-span-2 col-start-1 row-start-6"}/>
        {company_type === 'customer' && <CardSimple className={'p-5 grid gap-y-9 bg-gray-3 rounded-062 col-span-2 col-start-1 tablet:row-start-5'}>
        <DList label={'Партнеры'} title={store.companyStore.companies.filter((c: any) =>
          data[`${company_type}profile`].performer_company.includes(c.id)).map((item: any, index ) => (
          <span key={item.id} className={'text-xs font-normal'}>
                {item.name}{!(index === data[`${company_type}profile`].performer_company.length - 1) && ', '}
            </span>))} />

        <CardSimple.Footer>
          <Button variant={ButtonVariant.text} className={'text-accent'} text={'Подробнее'} action={ () => store.bidsStore.setActiveTab("Партнеры")} />
        </CardSimple.Footer>
      </CardSimple>}

        {/* //TODO  Высота въезда*/}
        {company_type === 'performer' && <>
          <DList label={'Макс. высота транспорта, в см'} title={<>{data[`${company_type}profile`].height} <sub className={'bottom-0 text-white/75'}> см</sub></>} />
        <DList label={'Время работы'} title={data[`${company_type}profile`].working_time} />
        </>}
        {data?.performerprofile &&    <DList label={'Загруженность'} title={<WorkLoadStatus hasDot={false} status={data?.performerprofile.workload} className={'!top-0 !right-0 relative i:hidden'}/>} />}
        {data.active_services && data.active_services.length > 0 && <DList label={'Подключенные услуги'} className={'tablet:!col-[2_/_2_span] tablet:!row-start-4'} title={<>{data.active_services.map((s:string, index:number) => <span key={`s_${index}`} className={'text-accent'}>{s}{!(index === data.active_services.length - 1) && ', '}</span>)}</>} />}


      </Tabs.Panel>)
      break;

    case 'Сотрудники':
      result = (<TabUsers state={state} companyId={companyId} company_type={company_type} />)
      break;

    case 'Филиалы':
      // result = null
      result = (<TabFilials state={state} companyId={companyId} company_type={company_type} />)
      break;
    case 'Права доступа':
      result = (<TabPermissions state={state} companyId={companyId} company_type={company_type} />)
      break;
    case 'Автомобили':
      result = (<TabCars state={state} companyId={companyId} company_type={company_type} />)
      break;
    case 'Партнеры':
      const localStore = useLocalStore<LocalRootStore>(() => localRootStore)

      // const memoizedPerf = React.useMemo(() => {
      //   const perAr:any[] = []
      //   data.customerprofile.performer_company.forEach((el:number) => {
      //     const _company = store.companyStore.getCompanyById(el)
      //     perAr.push(_company)
      //   })
      //   return perAr
      // }, [data])
      // console.log(memoizedPerf);
      useEffect(() => {
        localStore.setData = {
          canSort: false,
          results: data?.map((item:any) => ({
            status: item?.is_active as boolean,
            company: item?.name,
            type: item?.company_type,
            city: item?.city.name,
            id: item?.id,
          query: {
            rootRoute: `/account/companies/${CompanyTypeRus(item?.company_type)}/${item?.id}`,
          },
          }))}
      },[data])
      console.log(localStore);
      result = (<Tabs.Panel state={state}> <TableWithSortNew
        store={localRootStore}
        footerHeight={"12rem"}
        canSort={false}
        className={'!rounded-none  !bg-none overflow-visible !border-0'}
        bodyClassName={'!bg-none !rounded-none !bg-transparent'}
        background={PanelColor.default}
        variant={PanelVariant.default}
        footer={false}
        search={false}
        // headerBar={false}
        style={PanelRouteStyle.company}
        filter={false}
        state={state}
        ar={[{ label: 'Статус', name: 'is_active' }, {label: 'Компания', name: 'name'}, {label: 'Тип', name: 'company_type'},{ label: 'Город', name: 'city' }]}
      /></Tabs.Panel>)
      break;


    default:
      return null;
  }
  return  result
};
export const TabsVariantsCars = ({label, content_type, data, state, name, className, companyId, company_type, ...props}:TabsVariantsProps) => {
  let result

  switch (label) {
    case "Основная информация":
      result = (<Tabs.Panel state={state} name={'info'}  className={'pt-8 tablet-max:pb-16'} company_type={company_type}>
       <DList label={'Марка'} title={data.brand.name} />
       <DList label={'Модель'} title={data.model.name} />
       <DList label={'Тип'} title={data.model.car_type} />
       <DList label={'Высота'} title={data.height + " см"} />
       <DList label={'Радиус колес'} title={data.radius} />
        {/* todo: Добавить высоту и радиус */}
        {/* <div className={'subgrid'}> */}
          <DList label={'Компания'} title={data.company.name} />
        {/* todo: Добавить филиал */}
          {data.company.parent && data.company.parent.name && <DList label={'Филиал'} title={data.company.parent.name} />}
        {/* </div> */}
      </Tabs.Panel>)
      break;

    case 'Сотрудники':
      result = (<TabCarUsers state={state} carId={data.id} companyId={companyId} company_type={company_type} />)
      break;
    case 'История':
      result = (<TabCarHistory state={state} company_id={data?.company.id} car_id={data.id} company_type={company_type} />)
      break;
    // case 'Филиалы':
    //   console.log(data);
    //   result = (<Tabs.Panel  state={state} name={'filials'} variant={PanelVariant.dataPadding} background={PanelColor.default} className={'!bg-none !border-0'}  bodyClassName={'!bg-transparent'}>
    //     {data.length !== 0 ? <TableWithSort  className={'!rounded-none  !bg-none overflow-visible !border-0'} bodyClassName={'!bg-none !rounded-none !bg-transparent'} background={PanelColor.default} search={true} filter={true}
    //       data={data.map((item: any & {rootRoute?: string} ) => ({
    //         state: item.is_active,
    //         name: item.name,
    //         city: item.city.name,
    //         id: item.id,
    //         query: {
    //           company_id: companyId,
    //           rootRoute: `/account/filials/${company_type}/${companyId}/${item.id}`,
    //         },
    //       }))}   state={false} variant={PanelVariant.default} footer={false}   ar={['Статус', 'Филиал', 'Город']}/> : <Heading  variant={HeadingVariant.h2} text={'Нет автомобилей'} className={'py-12'}/>}
    //   </Tabs.Panel>)
    //   break;
    default:
      return null;
  }
  return  result
};

interface _res2 {
  service: { label: string | null, values: any[], unit: string };
  role: string;
  options: { label: string, values: any[], unit: string }[];
  count: number;
  calc: () => any;
}

export const TabsVariantBids = observer(({ label, content_type, data, state, name, className, companyId, company_type, ...props }: TabsVariantsProps) => {
    const store = useStore()
    let result
    switch (label) {
        case 'Основная информация':
            result = (
                <Tabs.Panel
                    className={'pt-8 grid !grid-cols-3  !gap-y-3  gap-x-12 content-start !py-8' + ' ' + className}
                    state={state}
                    name={'bidInfo'}
                    variant={PanelVariant.default}
                    company_type={company_type}
                >
                    <DList
                        className={'child:dt:text-accent'}
                        label={'Клиент'}
                        title={<Heading variant={HeadingVariant.h4} text={data.company.name} />}
                    />
                    <DList
                        className={'child:dt:text-accent'}
                        label={'Город'}
                        title={<Heading variant={HeadingVariant.h4} text={data.company.city.name} />}
                    />
                    <DList
                        className={'child:dt:text-accent'}
                        label={'Пользователь'}
                        title={
                            <Heading
                                variant={HeadingVariant.h4}
                                text={`${data.author.first_name} ${data.author.last_name}`}
                            />
                        }
                    />
                    <DList
                        className={'child:dt:text-accent'}
                        label={'Услуга'}
                        title={
                            <Heading
                                variant={HeadingVariant.h4}
                                text={data.service_type.name}
                                color={HeadingColor.active}
                            />
                        }
                    />
                    <DList
                        className={'child:dt:text-accent'}
                        label={'Номер телефона'}
                        title={<Heading variant={HeadingVariant.h4} text={data.phone} />}
                    />
                    <DList
                        className={'child:dt:text-accent'}
                        label={'Марка автомобиля'}
                        title={
                            <Heading
                                variant={HeadingVariant.h4}
                                text={data.car.brand.name + ' ' + data.car.model.name}
                            />
                        }
                    />
                    <DList
                        className={'child:dt:text-accent'}
                        label={'Гос. номер'}
                        title={<Heading variant={HeadingVariant.h4} text={data.car.number} />}
                    />
                    <DList
                        className={'child:dt:text-accent'}
                        label={'Тип'}
                        title={<Heading variant={HeadingVariant.h4} text={data.car.model.car_type} />}
                    />
                  {data.customer_comment && <DList
                        className={'child:dt:text-accent col-span-2 col-start-1 row-start-5'}
                        label={'Комментарий'}
                        title={<p>{data.customer_comment}</p>}
                    />}
                  {store.appStore.appType !== "performer" && <Panel
                        variant={PanelVariant.withPaddingSmWithBody}
                        background={PanelColor.glass}
                        className={'!col-start-3 row-span-5'}
                    >
                        <DList
                            className={'child:dt:text-accent'}
                            label={'Партнер'}
                            title={<Heading variant={HeadingVariant.h4} text={data.performer.name} />}
                        />
                    <DList
                        className={'child:dt:text-accent'}
                        label={'Номер телефона'}
                        title={<Heading variant={HeadingVariant.h4} text={data.performer.performerprofile.contacts} />}
                    />
                    <DList
                        className={'child:dt:text-accent'}
                        label={'Адрес'}
                        title={<Heading variant={HeadingVariant.h4} text={data.performer.performerprofile.address} />}
                    />
                    </Panel>}
                    {/* /!* //todo: address *!/ */}
                    {/* <DList className={'child:dt:text-accent'}  label={'Адрес выезда'}  title={data.address} /> */}
                    {/* <DList className={'child:dt:text-accent'}  label={'Важность'}  title={store.bidsStore.formResultsAll.important.label} /> */}
                    {/* <DList className={'child:dt:text-accent'}  label={'Время'}  title={store.bidsStore.formResultsAll.time.value} /> */}
                    {/* <DList className={'child:dt:text-accent'}  label={'Дополнительные данные'}  title={<><ul><li>{store.bidsStore.formResultsAll.secretKey.label}</li><li>{store.bidsStore.formResultsAll.parking.label}</li></ul></>} /> */}
                    {/* <DList className={'child:dt:text-accent'}  label={'Дополнительные опции'}  title={<><ul>{store.bidsStore.currentBid.service_option.map((i:any) => <li key={i.id}>{i.name}</li>)}</ul></>} /> */}
                </Tabs.Panel>
            )
            break
        case 'Услуги':
            const servicesPrice = React.useMemo(() => {
              const serviceName = data.service_type.name + " - " + data.service_subtype.name
              const serviceName_exclude = data.service_type.name + " - " + data.service_subtype.name + " - "
              const tableParams = {
                cols: 6,
                nameColSpan: 3,
                valuesSpan: 1,
                valueStyle: 'text-accent font-medium text-sm tablet-max:before:content-[attr(data-label)":_"] tablet-max:before:text-gray-2 tablet-max:before:font-medium tablet-max:before:text-sm tablet-max:before:pr-2 tablet-max:before:uppercase'
              }
              const addTotalPercent = (value: number, ar: any[]) => {
                let initVal = 0
                let totalPercentUp = ar.reduce((acc:number, val:any) => val.unit === "%" ? acc + val.amount : acc, initVal);
                return totalPercentUp !== 0 ? value + (value * totalPercentUp / 100) : value
              }
              const _res2: _res2 = {
                service: { label: null, values: [], unit: '₽' }, options: [], role: store.appStore.appType, count: data.price_positions.performer.length,
                calc: function() {
                  //Исполнитель
                  if(this.role === "performer") {
                    const el = data.price_positions.performer;
                    for(let i = 0; el.length > i; i++) {
                      let _performerValue = parseFloat(el[i].amount)
                      if(el[i].name === serviceName)  {
                        this.service.label = el[i].name;
                        const _ar = []
                        _performerValue && _ar.push(Math.round(_performerValue * 100) / 100)
                        this.service.values = _ar
                      } else if(el[i].unit === "%")  {
                        _performerValue = parseFloat(el[i].amount)
                        this.service.label = data.service_subtype.name
                        const _ar = []
                        _performerValue && _ar.push((Math.round(_performerValue * 100) / 100))
                        this.options.push({
                          label: el[i].name.replace(serviceName_exclude, ''),
                          values: _ar,
                          unit: el[i].unit,
                        })
                      }  else  {
                        this.service.label = data.service_subtype.name
                        const _ar = []
                        _performerValue && _ar.push(Math.round(_performerValue * 100) / 100)
                        this.options.push({
                          label: el[i].name.replace(serviceName_exclude, ''),
                          values: _ar,
                          unit: el[i].unit,
                        })
                      }
                    }
                    return this
                  }
                  if(this.role === "customer") {
                    const el = data.price_positions.performer;
                    if(data.service_percent == null) {
                      for(let i = 0; el.length > i; i++) {
                        let _customerValue =  parseFloat(data.price_positions.customer[i].amount)
                        if(el[i].name === serviceName)  {
                          this.service.label = el[i].name;
                          const _ar = []
                          _ar.push(Math.round(_customerValue * 100) / 100)
                          this.service.values = _ar
                        }  else if(el[i].unit === "%")  {
                          _customerValue = parseFloat(el[i].amount)
                          this.service.label = data.service_subtype.name
                          const _ar = []
                          _customerValue && _ar.push((Math.round(_customerValue * 100) / 100))
                          this.options.push({
                            label: el[i].name.replace(serviceName_exclude, ''),
                            values: _ar,
                            unit: el[i].unit,
                          })
                        } else  {
                          this.service.label = data.service_subtype.name
                          const _ar = []
                         _ar.push(Math.round(_customerValue * 100) / 100)
                          this.options.push({
                            label: el[i].name.replace(serviceName_exclude, ''),
                            values: _ar,
                            unit: el[i].unit,
                          })
                        }
                      }
                    } else {
                      for(let i = 0; el.length > i; i++) {
                        let _customerValue = parseFloat(data.price_positions.performer[i].amount)  * (1 + data.service_percent / 100)
                        if(el[i].name === serviceName)  {
                          const _ar = []
                          _ar.push(Math.round(_customerValue * 100) / 100)
                          this.service.label = el[i].name;
                          this.service.values = _ar
                        }  else if(el[i].unit === "%")  {
                          _customerValue = parseFloat(el[i].amount)
                          this.service.label = data.service_subtype.name
                          const _ar = []
                          _customerValue && _ar.push((Math.round(_customerValue * 100) / 100))
                          this.options.push({
                            label: el[i].name.replace(serviceName_exclude, ''),
                            values: _ar,
                            unit: el[i].unit,
                          })
                        }else  {
                          const _customerValue = parseFloat(data.price_positions.performer[i].amount)

                          this.service.label = data.service_subtype.name
                          const _ar = []
                          _ar.push(Math.round(_customerValue * 100) / 100)
                          this.options.push({
                            label: el[i].name.replace(serviceName_exclude, ''),
                            values: _ar,
                            unit: el[i].unit,
                          })
                        }
                      }
                    }
                    return this
                  }
                  if(this.role === "admin") {
                    const el = data.price_positions.performer;
                    if(data.service_percent === null) {
                      for(let i = 0; el.length > i; i++) {
                        let _performerValue =  parseFloat(el[i].amount)
                        let _customerValue =  parseFloat(data.price_positions.customer[i].amount)
                        if(el[i].name === serviceName)  {
                          this.service.label = el[i].name;
                          const _ar = []
                          _ar.push(Math.round(_customerValue * 100) / 100)
                          _ar.push(Math.round(_performerValue * 100) / 100)
                          _ar.push(Math.round((_customerValue - _performerValue) * 100) / 100)
                          this.service.values = _ar
                        } else if(el[i].unit === "%")  {
                          _performerValue = parseFloat(el[i].amount)
                          _customerValue =  parseFloat(data.price_positions.customer[i].amount)
                          this.service.label = data.service_subtype.name
                          const _ar = []
                          _customerValue && _ar.push((Math.round(_customerValue * 100) / 100))
                          _performerValue && _ar.push((Math.round(_performerValue * 100) / 100))
                          _ar.push(Math.round((_customerValue - _performerValue) * 100) / 100)
                          this.options.push({
                            label: el[i].name.replace(serviceName_exclude, ''),
                            values: _ar,
                            unit: el[i].unit,
                          })
                        } else  {
                          console.log('else admin', _customerValue, _performerValue);
                          this.service.label = data.service_subtype.name
                          const _ar = []
                          _ar.push(Math.round(_customerValue * 100) / 100)
                          _ar.push(Math.round(_performerValue * 100) / 100)
                          _ar.push(Math.round((_customerValue - _performerValue) * 100) / 100)
                          this.options.push({
                            label: el[i].name.replace(serviceName_exclude, ''),
                            values: _ar,
                            unit: el[i].unit,
                          })
                        }
                      }
                    } else {
                      let _customerValue =  addTotalPercent(parseFloat(data.price_positions.customer[0]?.amount), data.price_positions.customer)  ?? null
                      for(let i = 0; el.length > i; i++) {
                        const _performerValue =  addTotalPercent(parseFloat(el[i].amount), data.price_positions.performer)
                        if(isNaN(_customerValue)) {
                          _customerValue = _performerValue * (1 + data.service_percent / 100)
                        }
                        if(el[i].name === serviceName)  {
                          const _ar = []
                          _ar.push(Math.round(_customerValue * 100) / 100)
                          _ar.push(Math.round(_performerValue * 100) / 100)
                          _ar.push(Math.round((_customerValue - _performerValue) * 100) / 100)
                          this.service.label = el[i].name;
                          this.service.values = _ar
                        } else  {
                          let _customerValue =  addTotalPercent(parseFloat(data.price_positions.customer[i]?.amount), data.price_positions.customer)
                          console.log(_customerValue);
                          if(isNaN(_customerValue)) {
                            _customerValue = _performerValue * (1 + data.service_percent / 100)
                          }
                          this.service.label = data.service_subtype.name
                          const _ar = []
                          _ar.push(Math.round(_customerValue * 100) / 100)
                          _ar.push(Math.round(_performerValue * 100) / 100)
                          _ar.push(Math.round((_customerValue - _performerValue) * 100) / 100)
                          this.options.push({
                            label: el[i].name.replace(serviceName_exclude, ''),
                            values: _ar,
                            unit: el[i].unit,
                          })
                        }
                      }
                    }
                    return this
                  }

                }
              }

              const _res = _res2.calc()
              const totalCustomer = addTotalPercent(_res.options?.reduce((acc:number, item:any) => item.unit !== "%" ? acc + item.values[0] : acc,  0),  data.price_positions.customer)
              const totalPerformer = addTotalPercent(_res.options?.reduce((acc:number, item:any) => item.unit !== "%" ? acc + item.values[_res.role !== "performer" ? 1 : 0] : acc, _res.role !== "performer" ? 0 : _res.service.values[0] ?? 0),  data.price_positions.performer)
              const totalProfit =  totalCustomer - totalPerformer

              const _tar = []
              !!totalCustomer && _tar.push(Math.round(totalCustomer * 100) / 100)
              !!totalPerformer && _tar.push(Math.round(totalPerformer * 100) / 100)
              !!totalProfit && _tar.push(Math.round((totalProfit) * 100) / 100)

              let total = _tar
              if(_res.service.values.length > 0) {
                const _total:number[] = []
                total.forEach((el:number, index:number) => _total.push(el + _res.service.values[index]))
                total = _total
              }
              if(store.appStore.appType === "admin")  {
                tableParams.cols = 6
              }  else {
                if(store.appStore.appType === "customer") {
                  if(data.service_percent != null) {
                    let _total:number[] = []
                    total.forEach((el:number, index:number) => _total.push(el * (100 + data.service_percent) / 100))
                    total = _total
                    let _totalOptions:any = []
                    _res.options.forEach((el:any) => _totalOptions.push({
                      ...el,
                      values: el.values.map((el:any) => el * (100 + data.service_percent) / 100)
                    }))
                    _res.options = _totalOptions;
                  }
                }
                tableParams.cols = 4
              }
              let labels:any = {
                  "0": 'Клиент',
                  "1": "Партнер",
                  "2": "Разница"
              }
              return (
                  <>
                      <SimpleGrid key={'grid_1'} cols={tableParams.cols} spacing={8} className={'mb-6 items-start flex-1 content-start tablet-max:flex tablet-max:flex-col'}>
                          {/*  Header  */}
                          <Box
                              style={{ gridColumn: `span ${tableParams.nameColSpan}` }}
                              className={'text-gray-2 font-medium'}
                          >
                              Тип услуги
                          </Box>
                          {store.appStore.appType !== 'admin' ?
                            store.userStore.getUserCan(PermissionNames['Финансовый блок'], 'read') && (
                              <Box className={'text-gray-2 font-medium text-xss'} style={{ gridColumn: `span ${tableParams.valuesSpan}` }}>Стоимость</Box>
                          ) : store.userStore.getUserCan(PermissionNames['Финансовый блок'], 'read') && (
                              <>
                                  <Box
                                      style={{ gridColumn: `span ${tableParams.valuesSpan}` }}
                                      className={'text-gray-2 font-medium text-xss uppercase tablet-max:hidden'}
                                  >
                                    Клиент
                                  </Box>
                                  <Box
                                      style={{ gridColumn: `span ${tableParams.valuesSpan}` }}
                                      className={'text-gray-2 font-medium text-xss  uppercase  tablet-max:hidden'}
                                  >
                                    Партнер
                                  </Box>
                                  <Box
                                      style={{ gridColumn: `span ${tableParams.valuesSpan}` }}
                                      className={'text-gray-2 font-medium text-xss  uppercase  tablet-max:hidden'}
                                  >
                                      Разница
                                  </Box>
                              </>
                          )}

                          {/* Услуга */}
                          <Box style={{ gridColumn: `span ${tableParams.nameColSpan}` }}>
                              <Text className={'font-semibold font-sans tablet-max:!mb-1'}>{_res.service.label}</Text>
                          </Box>
                          {

                            store.userStore.getUserCan(PermissionNames['Финансовый блок'], 'read') && _res.service.values.map(
                              (
                                  value: string | number, index: number
                              ) => (
                                  <Box
                                    key={`${index}_box`}
                                    data-label={labels[index]}
                                      className={tableParams.valueStyle}
                                      style={{ gridColumn: `span ${tableParams.valuesSpan}` }}
                                  >
                                      {value} {_res.service.unit}
                                  </Box>
                              ),
                          )}

                          {/* Доп опции*/}
                          <Box
                              style={{ gridColumn: `span ${tableParams.cols}` }}
                              className={'text-gray-2 font-medium mt-4'}
                          >
                              Дополнительные опции
                          </Box>

                          {_res.options?.map((o: any, index: number) => (
                              <>
                                  <Box
                                    key={`${index}_box_option`}
                                      className={'font-semibold font-sans  mt-2'}
                                      style={{ gridColumn: `span ${tableParams.nameColSpan}` }}
                                  >
                                      <Text>{o.label}</Text>
                                  </Box>
                                  {
                                    store.userStore.getUserCan(PermissionNames['Финансовый блок'], 'read') && o.values.map((value: number, index: number) => (
                                      <Box
                                        key={`${index}_box_option_values`}
                                          data-label={labels[index]}
                                          className={tableParams.valueStyle}
                                          style={{ gridColumn: `span ${tableParams.valuesSpan}` }}
                                      >
                                          {value} {o.unit === 'Р' ? '₽' : o.unit ?? '₽'}
                                      </Box>
                                  ))}
                              </>
                          ))}
                      </SimpleGrid>
                      <SimpleGrid key={'grid_2'}  cols={tableParams.cols} spacing={8} className={'mb-0 flex-0  tablet-max:flex tablet-max:flex-col items-start'}>
                        {/* Стоимость услуги*/}

                        <>
                          {data.create_amount !== null &&
                            store.userStore.getUserCan(PermissionNames['Финансовый блок'], 'read')  &&  <Box
                              className={'font-semibold font-sans  mt-4  self-end tablet-max:self-start'}
                              style={{ gridColumn: `span ${tableParams.nameColSpan}` }}
                            >

                              <DList
                                className={'child:dt:text-accent mt-auto child:*:text-accent mb-0'}
                                label={'Стоимость услуги'}
                                title={
                                  <Heading
                                    variant={HeadingVariant.h2}
                                    className={'!mb-0  tablet-max:!mb-1'}
                                    text={String(store.appStore.appType === "performer" ? totalPerformer : data.create_amount) + ' ₽'}
                                  />
                                }
                              />


                            </Box>}
                          {store.userStore.getUserCan(PermissionNames['Финансовый блок'], 'read') && store.appStore.appType === "admin" && total.map((value: number, index: number) => (
                            <Box
                              data-label={labels[index]}
                              className={tableParams.valueStyle + "  " + " self-end  tablet-max:self-start"}
                              style={{ gridColumn: `span ${tableParams.valuesSpan}` }}
                            >
                              {value}
                              {' ₽'}
                            </Box>
                          ))}
                        </>
                      </SimpleGrid>
                      {data.truck_type && (
                          <DList
                              className={'child:dt:text-accent'}
                              label={'Тип эвакуатора'}
                              title={<Heading variant={HeadingVariant.h4} text={data.truck_type} />}
                          />
                      )}

                      {data.wheel_lock && (
                          <DList
                              label={'Нерабочие колеса'}
                              title={<Heading variant={HeadingVariant.h4} text={data.wheel_lock + 'шт.'} />}
                          />
                      )}
                  </>
              )
            }, [])

            result = (
                <Tabs.Panel
                  className={'pt-8 grid !grid-cols-5  !gap-y-3  gap-x-12 !py-8' + ' ' + className}
                  state={state}
                  name={'bidService'}
                  variant={PanelVariant.default}
                  company_type={company_type}
                >
                  <Panel
                    variant={PanelVariant.withGapOnly}
                    background={PanelColor.default}
                    className={'desktop:!col-span-2 desktop:row-span-5 child:*:mb-5 desktop-max:mb-4 lg-to-desktop:!col-span-2'}
                  >
                  <DList
                    className={'child:dt:text-accent'}
                    label={'Услуга'}
                    title={
                      <Heading
                        variant={HeadingVariant.h2}
                        className={'!mb-0'}
                        text={store.catalogStore.getServiceType(Number(data.service_type.id)).name}
                        color={HeadingColor.accent}
                      />
                    }
                  />
                  {/* {store.appStore.appType === "performer" && <p className={'col-span-2'}>Ознакомьтесь с услугой. И при необходимости внесите изменения. Сервис передаст их на согласование</p>} */}
                  {/* {(store.appStore.appType === "customer" || store.appStore.appType === "admin") && <p className={'col-span-2'}>Исполнитель отредактировал перечень услуг. Пожалуйста проверьте и подтвердите изменения </p>} */}

                  {data.address_from && <DList
                    className={'child:dt:text-accent col-span-2'}
                    label={'Адрес забора'}
                    title={data.address_from}
                  />}
                    {/* {!data.schedule && <DList */}
                    {/*   className={'child:dt:text-accent'} */}
                    {/*   label={'Важность'} */}
                    {/*   title={data.schedule !== null ? 'По времени' : 'Побыстрее'} */}
                    {/* />} */}
                    {data.schedule && <DList
                      className={'child:dt:text-accent'}
                      label={'Время'}
                      title={dayjs(data.schedule).format("DD.MM.YYYY HH:mm")}
                    />}
                  {data.address_to && <DList
                    className={'child:dt:text-accent  col-span-2'}
                    label={'Адрес доставки'}
                    title={data.address_to}
                  />}
                  {data.keys && <DList
                    className={'child:dt:text-accent'}
                    label={'Секретка и ключ'}
                    title={data.keys}
                  />}
                  {data.is_parking && <DList
                    className={'child:dt:text-accent'}
                    label={'Есть ли парковочное место?'}
                    title={data.is_parking ? "Да" : "Нет"}
                  />}
                  </Panel>
                  <Panel
                    variant={PanelVariant.withPaddingSmWithBody}
                    background={PanelColor.glass}
                    bodyClassName={'flex flex-col  h-full'}
                    className={'desktop:!col-start-3 desktop:col-span-2 desktop:row-span-5 !border-active  lg-max:!col-span-full lg-to-desktop:!col-span-3 lg-to-desktop:!col-start-3  lg-to-desktop:row-span-5'}
                  >
                    {servicesPrice}
                  </Panel>
                </Tabs.Panel>
            )
            break
        case 'Фото':
          if(data.photos.results.length > 0) {
            result = (
                <Tabs.Panel
                    className={'pt-8 grid !grid-cols-5  !gap-y-3 !grid-flow-row !grid-rows-[repeat(3,_minmax(0,_auto))]  gap-x-12 content-start !py-8' + ' ' + className}
                    state={state}
                    name={'bidService'}
                    variant={PanelVariant.default}
                    company_type={company_type}
                >
                    <div className={'col-span-2  pr-12'}>
                        <Heading text={'Фотографии До'} variant={HeadingVariant.h3} color={HeadingColor.accent} />
                        <p>Фотографии до оказания услуги. Загрузил Клиент</p>
                    </div>
                    <div className={'col-span-3'}>
                        <CarouselCustom closeBtn={false} items={data.photos.results.filter((e: any) => e.is_before).map((item:any) => item.foto)} />
                    </div>
                    <hr className={'col-span-full border-gray-4/70 border mt-0'} />
                    <div className={'col-span-2   pr-12'}>
                        <Heading text={'Фотографии После'} variant={HeadingVariant.h3} color={HeadingColor.accent} />
                        <p>После оказания услуги загрузите пожалуйста фотографии</p>
                        {store.appStore.appType === 'performer' &&
                            data.status !== BidsStatus['Выполнена'] &&
                            data.status !== BidsStatus['Завершена'] && (
                                <Button
                                    type={'button'}
                                    action={() => store.bidsStore.setModalCurrentState(true)}
                                    disabled={data.status !== BidsStatus['В работе']}
                                    text={'Загрузить'}
                                    variant={ButtonVariant['accent-outline']}
                                    className={'mt-7'}
                                    size={ButtonSizeType.sm}
                                />
                            )}
                    </div>
                    <div className={'col-span-3'}>
                        <CarouselCustom closeBtn={false} items={data.photos.results.filter((e: any) => !e.is_before).map((item:any) => item.foto)} />
                    </div>
                </Tabs.Panel>
            )
          } else result = null
        break;
        case 'История заявки':
          result = (<TabBidHistory state={state} companyId={companyId} company_type={company_type} />)
          break;
        default:
            return null
    }
    return result
})

export const TabsVariantPrice = ({ label, content_type, data, state, name, className, companyId, company_type, ...props }:any) => {
  useEffect(() => {
    console.log(data, state, label);
  }, [data, state, label]);
  let result
  const { width } = useViewportSize();
  //Разбор массива для Мойка
  const mapEdWast =  React.useMemo(() => {

    let newMap:any = new Map(data.wash_positions?.map((item: any) => [item.service_subtype.name,  data.wash_positions.filter((it:any) => item.service_subtype.name === it.service_subtype.name)]));

    newMap.forEach((value:any, key: any) => {
      const newAr = new Map([])
      const  curVal = value;
      const  curKey = key;

      value.forEach((value:any, key: any) => {
        if(value.service_option && value.service_option.name) {
          newAr.set(value.service_option.name, curVal.filter((i: any) => i.service_option?.name == value.service_option?.name).sort((a:any, b:any) => {const nameA = a.car_class.toUpperCase();const nameB = b.car_class.toUpperCase();if (nameA < nameB) return -1;if (nameA > nameB) return 1;return 0;}).map((i:any) => ({id: i.id, label: i.car_class, value: i.amount})))
          } else {
              newAr.set('Мойка', curVal.filter((i: any) => !i.service_option).sort((a:any, b:any) => {const nameA = a.car_class.toUpperCase();const nameB = b.car_class.toUpperCase();if (nameA < nameB) return -1;if (nameA > nameB) return 1;return 0;}).map((i:any) => ({id: i.id, label: i.car_class, value: i.amount})))
          }
        }
      )
      newMap.set(key, newAr)
    })
    let result:any[] = []
    newMap.forEach((value: any, key: any) => {
        let resultInner: any[] = []
        value.forEach((value: any, key: any) => {
            let resultInnerAr: any[] = []
            value.forEach((value: any, key: any) => {
                resultInnerAr.push(value)
            })
            resultInner.push({
                service_option: key,
                class1: resultInnerAr[0]?.value,
                class2: resultInnerAr[1]?.value,
                class3: resultInnerAr[2]?.value,
                class4: resultInnerAr[3]?.value,
                class5: resultInnerAr[4]?.value,
                class6: resultInnerAr[5]?.value,
                class7: resultInnerAr[6]?.value,
                class8: resultInnerAr[7]?.value,
            })
        })
        result.push({ label: key, data: resultInner })
    })

    return result.map((item: any) => {

        return (
            <div className={'col-span-full border-gray-4/70 border-b mobile:mx-4'} key={translite(item.label)}>
              <Heading
                text={item.label}
                variant={HeadingVariant.h6}
                className={'text-xs uppercase !mb-0 py-2  px-6 mobile:px-3 border-b border-gray-4/70 sticky top-0 z-10 bg-[#090909]'}

              />
              <TableWithSortNewPure
                total={item.data.length}
                variant={PanelVariant.default}
                search={false}

                background={PanelColor.default}
                className={'col-span-full table-groups'}
                initFilterParams={[
                    { label: 'Статус', value: 'status' },
                    { label: 'Город', value: 'city' },
                ]}
                filter={false}
                data={item.data}
                state={false}
                ar={[
                    { label: 'Опция', name: 'service_option' },
                    { label: '1 класс', name: 'class1}' },
                    { label: '2 класс', name: 'class2' },
                    { label: '3 класс', name: 'class3' },
                    { label: '4 класс', name: 'class4', },
                    { label: '5 класс', name: 'class5' },
                    { label: '6 класс', name: 'class6' },
                    { label: '7 класс', name: 'class7' },
                    { label: '8 класс', name: 'class8' },
                ]}
                />
            </div>
        )
    })
  }, [data.wash_positions])

  //Разбор массива для Шиномонтажа
  const mapEdTire  = React.useMemo(() => {
    let meta = {
      car_type: [],
      service_subtype: []

    }
      function innerData(ar: any[], propKey: string, propValue: any) {
        let at = ar.filter((i: any) => i[propKey].name == propValue)
        meta = {
          ...meta,
          [propKey]: at
        }
        return at
      }
      let newMap:any = new Map(data.tire_positions?.map((item: any) => [item.service_subtype.name,  innerData(data.tire_positions, 'service_subtype', item.service_subtype.name)]))

      newMap.forEach((value:any, key: any) => {
        const newAr = new Map([])
        const  curVal = value;

        value.forEach((value:any, key: any) => {
            const filtered = curVal.filter((i: any) => i.car_type == value.car_type)
            const newArFC = new Map([])

            filtered.forEach((value:any, key: any) => {
              const filteredS = filtered.filter((i: any) => i.service_option.name == value.service_option.name)
              const newArF = new Map([])

              filteredS.forEach((value:any, key: any) => {
                newArF.set(value.radius, value)
              })
              newArFC.set(value.service_option.name, newArF)
            })
            newAr.set(value.car_type, newArFC)
          }
        )
        newMap.set(key, newAr)
      })

      let result:any[] = [];

      newMap.forEach((value:any, key: any) => {
        let resultInner:any[] = []
        value.forEach((value:any, key: any) => {
          let resultInnerAr:any[] = []
          value.forEach((value:any, key: any) => {
            let resultInnerCartypes:any[] = []
            value.forEach((value:any, key: any) => {
              let resultInnerOptions:any[] = []
              // value.forEach((value:any, key: any) => {
              //   resultInnerOptions.push
              // })
              resultInnerCartypes.push({ label: key, data: value.service_option.is_percent ? `${value.amount} %`: value.amount})
            })
            resultInnerAr.push({label: key, data: resultInnerCartypes })
          })
          resultInner.push({label: key, data: resultInnerAr})
        })
        result.push({ label: key, data: resultInner })
      })
      return result.map((item: any, index: number) => {
        return (
          <div className={'col-span-full border-gray-4/70 border-b'} key={translite(item.label ?? `null_${index}`)}>
            <Heading text={item.label} variant={HeadingVariant.h6} className={`text-xs uppercase !mb-0 py-2  px-6  border-b border-gray-4/70 ${item.data[0].label === null ? 'px-6 sticky top-0 z-10  bg-[#090909]' : ''}`}/>
            {(() => {
              console.log(item);
              return item.data.map((item: any, index: number) => {
              return (
                <div key={translite(item.label ?? `null_${index}`)}>
                  {item.label && <Heading
                    text={item.label}
                    variant={HeadingVariant.h6}
                    className={'text-xs capitalize  !mb-0 py-2  px-6 sticky top-0 z-10 bg-[#090909]'}
                  />}
                  <TableWithSortNewPure
                    edit={false}
                    total={item.data.length}
                    variant={PanelVariant.default}
                    search={false}
                    style={item.label ? PanelRouteStyle.price_tire : PanelRouteStyle.default}
                    background={PanelColor.default}
                    className={'col-span-full table-groups  mobile:mx-4'}
                    filter={false}
                    data={item.label ? item.data.map(
                      (it: any) =>
                        ({
                          [it.label]: it.label ? it.label : '-',
                          r14:
                            it.data.filter((i: any) => i.label == 'R14').length > 0
                              ? it.data.filter((i: any) => i.label == 'R14')[0].data
                              : '-',
                          r15:
                            it.data.filter((i: any) => i.label == 'R15').length > 0
                              ? it.data.filter((i: any) => i.label == 'R15')[0].data
                              : '-',
                          r16:
                            it.data.filter((i: any) => i.label == 'R16').length > 0
                              ? it.data.filter((i: any) => i.label == 'R16')[0].data
                              : '-',
                          r17:
                            it.data.filter((i: any) => i.label == 'R17').length > 0
                              ? it.data.filter((i: any) => i.label == 'R17')[0].data
                              : '-',
                          r18:
                            it.data.filter((i: any) => i.label == 'R18').length > 0
                              ? it.data.filter((i: any) => i.label == 'R18')[0].data
                              : '-',
                          r19:
                            it.data.filter((i: any) => i.label == 'R19').length > 0
                              ? it.data.filter((i: any) => i.label == 'R19')[0].data
                              : '-',
                          r20:
                            it.data.filter((i: any) => i.label == 'R20').length > 0
                              ? it.data.filter((i: any) => i.label == 'R20')[0].data
                              : '-',
                          r2123:
                            it.data.filter((i: any) => i.label == 'R21-23').length > 0
                              ? it.data.filter((i: any) => i.label == 'R21-23')[0].data
                              : '-',
                          r15C:
                            it.data.filter((i: any) => i.label == 'R15C').length > 0
                              ? it.data.filter((i: any) => i.label == 'R15C')[0].data
                              : '-',
                          r16C:
                            it.data.filter((i: any) => i.label == 'R16C').length > 0
                              ? it.data.filter((i: any) => i.label == 'R16C')[0].data
                              : '-',
                        }) as any,
                    ) : item.data.map(
                      (it: any) =>
                        ({
                          [it.label]: it.label ? it.label : '-',
                          value: it.data[0].data,
                        }) as any,
                    )}
                    initFilterParams={[
                      { label: 'Статус', value: 'status' },
                      { label: 'Город', value: 'city' },
                    ]}
                    state={false}
                    ar={item.label ? [
                      { label: 'Тип услуги', name: 'service_option' },
                      { label: 'R14', name: 'R14' },
                      { label: 'R15', name: 'R15' },
                      { label: 'R16', name: 'R16' },
                      { label: 'R17', name: 'R17' },
                      { label: 'R18', name: 'R18' },
                      { label: 'R19', name: 'R19' },
                      { label: 'R20', name: 'R20' },
                      { label: 'R21-23', name: 'R21-23' },
                      { label: 'R15C', name: 'R15C' },
                      { label: 'R16C', name: 'R16C' },
                    ] : [
                      { label: 'Тип услуги', name: 'service_option' },
                      { label: 'Цена', name: 'price' }
                    ]}
                  />
                </div>
              )})})()}

          </div>
        )
      })
    }, [data.tire_positions])

  switch (label) {
      case 'Мойка':
          result = (
              <Tabs.PanelPure
                  state={state}
                  name={'wash'}
                variant={PanelVariant.default}
                background={PanelColor.default}
                className={'grid !grid-cols-3  !gap-y-3  gap-x-12 content-start  table-price h-full' + ' ' + className}
                bodyClassName={'!bg-transparent'}
              >
                {!props.edit ? mapEdWast : <TableWithSortNewPure
                  meta={{company_id: data.company, price_id: data.id, label: label}}
                  edit={true}
                  offsetSticky={-1}
                  total={data.wash_positions.length}
                  variant={PanelVariant.default}
                  search={false}
                  background={PanelColor.default}
                  state={false}
                  routeStyle={PanelRouteStyle.price_tire}
                  className={'col-span-full table-groups  mobile:mx-4'}
                  filter={false}
                  data={data.wash_positions.map((item:any) => ({
                    id: item.id,
                    service_subtype: item.service_subtype.name,
                    ...(item.service_option ? ({service_option: item.service_option?.name}) : ({service_option: ""})),
                    ['Тип автомобиля'] : item.car_class,
                    ['Цена']: item.amount
                  }))}
                  ar={[{label: 'Тип услуги', name: 'service_subtype'}, {label: 'Доп. опции', name: 'service_option'}, {label: 'Тип автомобиля', name: 'car_class'}, {label: 'Cтоимость', name: 'amount'}, ]}
                />}
               </Tabs.PanelPure>
          )
          break

      case 'Шиномонтаж':
          result = (
            <Tabs.PanelPure
              state={state}
              name={'tire'}
              variant={PanelVariant.default}
              background={PanelColor.default}
              className={'grid !grid-cols-3  !gap-y-3  gap-x-12 content-start  table-price h-full' + ' ' + className}
              bodyClassName={'!bg-transparent'}
            >
              {!props.edit ? mapEdTire :
                <TableWithSortNewPure
                  meta={{company_id: data.company, price_id: data.id, label: label}}
                edit={true}
                offsetSticky={-1}
                total={data.tire_positions.length}
                variant={PanelVariant.default}
                search={false}
                  style={PanelRouteStyle.price_tire}
                background={PanelColor.default}
                state={false}
                className={'col-span-full table-groups  mobile:mx-4'}
                filter={false}
                data={data.tire_positions.map((item:any) => ({
                  id: item.id,
                  radius: item.radius,
                  service_subtype: item.service_subtype.name,
                  service_option: item.service_option ? item.service_option.name : null,
                  car_class: item.car_type,
                  is_percent: item.service_option ? item.service_option.is_percent : false,
                  amount_price: item.amount
                }))}
                ar={[{label: 'Радиус', name: 'radius'},{label: 'Тип услуги', name: 'service_subtype'}, {label: 'Доп. опции', name: 'service_option'}, {label: 'Тип автомобиля', name: 'car_class'}, {label: 'Cтоимость', name: 'amount'}, ]}
              />}
            </Tabs.PanelPure>
          )
          break;
      case 'Эвакуация':

          result = (
              <Tabs.PanelPure
                  state={state}
                  name={'evacuation'}
                  variant={PanelVariant.default}
                  background={PanelColor.default}
                  className={
                      'grid !grid-cols-3  !gap-y-3  gap-x-12 content-start !pb-8  table-price h-full' + ' ' + className
                  }
                  bodyClassName={'!bg-transparent'}
              >
                  {!props.edit ? (
                      <div className={' col-span-full border-gray-4/70 border-b mobile:mx-4'}>
                          <TableWithSortNewPure
                              offsetSticky={0}
                              total={data.length}
                              variant={PanelVariant.default}
                              search={false}
                              background={PanelColor.default}
                              className={'col-span-full table-groups'}
                              filter={false}
                              data={data}
                              initFilterParams={[
                                  { label: 'Статус', value: 'status' },
                                  { label: 'Город', value: 'city' },
                              ]}
                              state={false}
                              ar={[
                                  { label: 'Тип услуги', name: 'service_option' },
                                  { label: 'До 2 тонн', name: 'service_option' },
                                  { label: 'от 2 тонн', name: 'service_option_1' },
                              ]}
                          />
                      </div>
                  ) : (
                      <div className={'col-span-full border-gray-4/70 border-b mobile:mx-4'}>
                          <TableWithSortNewPure
                              meta={{ company_id: data.company, price_id: data.id, label: label }}
                              edit={true}
                              offsetSticky={-1}
                              total={data.evacuation_positions.length}
                              variant={PanelVariant.default}
                              search={false}
                              background={PanelColor.default}
                              state={false}
                              routeStyle={PanelRouteStyle.price_evac}
                              className={'col-span-full table-groups'}
                              filter={false}
                              data={data.evacuation_positions.map((item: any) => ({
                                  id: item.id,
                                  service_subtype: item.service_subtype.name,
                                  service_option: item.service_option ? item.service_option.name : null,
                                  amount: item.amount,
                              }))}
                              ar={[
                                  { label: 'Тип услуги', name: 'service_subtype' },
                                  { label: 'Доп. опции', name: 'service_option' },
                                  { label: 'Cтоимость', name: 'amount' },
                              ]}
                          />
                      </div>
                  )}
              </Tabs.PanelPure>
          )
          break;
      default:
          return null
  }
  const ref = useRef<any>(null);
  const [panelScroll, setPanelScroll] = useState<{ height: number | null, readyToShow: boolean, heightRem?: number }>({ height: null, readyToShow: false, heightRem: 0 })

  useEffect(() => {
    if(ref && ref.current) {
      console.log(ref.current.parentNode.clientHeight);
      const fSize = parseFloat(window.getComputedStyle(window.document.getElementsByTagName('body')[0], null).getPropertyValue('font-size'));

      if(width > 1300) {
        setPanelScroll({ height: ref.current.parentNode.clientHeight, readyToShow: true, heightRem: ref.current.parentNode.clientHeight / fSize * 16 })
      } else setPanelScroll({ height: null, readyToShow: true, heightRem: ref.current.parentNode.clientHeight / fSize * 16 })
    }}, [ref.current, width]);

  // useEffect(() => {
  //   console.log('panel', panelScroll);
  // }, [panelScroll])

  return (
    <div ref={ref} style={!panelScroll.height ? {height: "100%"} : {maxHeight: panelScroll.height - 32 , overflow: "hidden"}}>
      {panelScroll.readyToShow ? <ScrollArea.Autosize style={{overflow: 'hidden'}}   data-position={"tabs-panel-container"}
        // @ts-ignore
        mah={width > 1024 ? `${panelScroll.heightRem - 32}` : `auto`} classNames={{
    root: 'tablet-max:-mx-5',
    scrollbar: 'z-50',
  }}>
    {result}
  </ScrollArea.Autosize> : null}
    </div>
  )
}
export default observer(TabsVariants);
