import React, { ReactNode } from 'react'
import DList from 'components/common/ui/DList/DList'
import CardSimple from 'components/common/layout/Cards/CardSimple/CardSimple'
import LinkStyled from 'components/common/ui/LinkStyled/LinkStyled'
import Button, { ButtonSizeType, ButtonVariant } from 'components/common/ui/Button/Button'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import Panel, { PanelColor, PanelProps, PanelVariant } from 'components/common/layout/Panel/Panel'
import TableWithSort from 'components/common/layout/TableWithSort/TableWithSort'
import { User } from 'stores/usersStore'
import Tabs, { TabsProps } from '../../../components/common/layout/Tabs/Tabs'
import { useStore } from 'stores/store'
import CreateInput from 'components/common/ui/CreateInput/CreateInput'
import { useNavigate } from 'react-router-dom'
import TableWithSortNewPure from 'components/common/layout/TableWithSort/TableWithSortNewPure'
import { tires } from "utils/utils";
import { CAR_RADIUS } from "stores/priceStore";

type TabsVariantsProps = {
  label: string
  data: any
  companyId?: number
  company_type?: string
  content_type?: string
  parentCompany?: string
  props?: any

} & TabsProps & {className?: string, children?: ReactNode | ReactNode[] | React.ReactElement | string, state: boolean, name?: string } & PanelProps
export const TabsVariantsFilial =  ({label, parentCompany, data, state, name, className, companyId, company_type, props}:TabsVariantsProps) => {
  const store = useStore()
  let result
  console.log(props[0].data.name);
  switch (label) {
    case "Основная информация":
      console.log(parentCompany);
      const navigate = useNavigate()
      const fundBill = {
        actions: [
          <Button text={'Отменить'} action={() => store.appStore.closeModal()} variant={ButtonVariant.default} />,
          <Button
            text={'Сохранить'}
            action={() => {
              // store.permissionStore.deletePermissionStoreAdmin(changes.id)
              store.appStore.closeModal()
              navigate('/account/groups')
            }}
            variant={ButtonVariant['accent-outline']}
          />,
        ],
        text: <div className={'grid gap-12 mb-12'}><CreateInput text={'Сумма начисления'} name={'paymoney'} type={'number'}/>
          <DList label={'Компания'} title={data.name}/>
          <DList label={'Зачислил'}  title={data.name}/>
        </div>,
        header: 'Пополнить счет',
        state: true,
      };


      result = (<Tabs.Panel state={state} name={'info'}  className={'pt-8'} company_type={company_type+'_filial'}>

        <DList label={'Адрес'} title={data[`${company_type}profile`].address} />

        <DList label={'Компания'}
          // @ts-ignore
          title={parentCompany.data.name} />

      </Tabs.Panel>)
      break;

    case 'Сотрудники':
      console.log(data);
      result = (<Tabs.Panel  state={state} name={'users'} variant={PanelVariant.dataPadding} background={PanelColor.default} className={'!bg-none !border-0'}  bodyClassName={'!bg-transparent'}>
        {data.length !== 0 ? <TableWithSort  className={'rounded-none !bg-none overflow-visible !border-0'} bodyClassName={'!bg-none !bg-transparent'} background={PanelColor.default} search={true} filter={true}
          data={props[2].data.map((item: User & any & {rootRoute?: string} ) => ({
            state: item.employee.is_active,
            name: item.employee.first_name + ' ' + item.employee.last_name,
            phone: item.employee.phone,
            email: item.employee.email,
            group: item.group.name,
            // @ts-ignore
            company: props[0].data.name,
            // @ts-ignore
            city: props[0].data.city.name,
            id: item.id,
            query: {
              company_id: companyId,
              rootRoute: `/account/users/${companyId}/${item.id}`,
            },
          }))} initFilterParams={[{label: 'Статус', value: 'state'}, {label: 'Город', value:  'city'}]} state={false} variant={PanelVariant.dataPadding} footer={false}   ar={['Статус', 'ФИО', 'Телефон', 'e-mail', 'Группа', 'Компания', 'Город']}/> : <Heading  variant={HeadingVariant.h2} text={'Нет сотрудников'} className={'py-12'}/>}
      </Tabs.Panel>)
      break;
      case 'Автомобили':
      console.log(data);
      result = (<Tabs.Panel  state={state} name={'users'} variant={PanelVariant.dataPadding} background={PanelColor.default} className={'!bg-none !border-0'}  bodyClassName={'!bg-transparent'}>
        {data.length !== 0 ? <TableWithSort  className={'rounded-none !bg-none overflow-visible !border-0'} bodyClassName={'!bg-none !bg-transparent'} background={PanelColor.default} search={true} filter={true}
          data={props[2].data.map((item: User & any & {rootRoute?: string} ) => ({
            state: item.employee.is_active,
            name: item.employee.first_name + ' ' + item.employee.last_name,
            phone: item.employee.phone,
            email: item.employee.email,
            group: item.group.name,
            // @ts-ignore
            company: props[0].data.name,
            // @ts-ignore
            city: props[0].data.city.name,
            id: item.id,
            query: {
              company_id: companyId,
              rootRoute: `/account/users/${companyId}/${item.id}`,
            },
          }))}
          initFilterParams={[{label: 'Статус', value: 'state'}, {label: 'Город', value:  'city'}]}
          state={false} variant={PanelVariant.dataPadding}
          footer={false}
          ar={['Статус', 'ФИО', 'Телефон', 'e-mail', 'Группа', 'Компания', 'Город']}/>
          : <Heading  variant={HeadingVariant.h2} text={'Нет автомобилей'} className={'py-12'}/>}
      </Tabs.Panel>)
      break;
    default:
      return null;
  }
  return  result
}
const TabsVariants = ({label, content_type, data, state, name, className, companyId, company_type, ...props}:TabsVariantsProps) => {
  const store = useStore()
  let result

  switch (label) {
    case "Основная информация":
      const navigate = useNavigate()
      const fundBill = {
        className: '',
        actions: [
          <Button text={'Отменить'} action={() => store.appStore.closeModal()} variant={ButtonVariant.default} />,
          <Button
            text={'Сохранить'}
            action={() => {
              // store.permissionStore.deletePermissionStoreAdmin(changes.id)
              store.appStore.closeModal()
              navigate('/account/groups')
            }}
            variant={ButtonVariant['accent-outline']}
          />,
        ],
        text: <div className={'grid gap-12 mb-12'}><CreateInput text={'Сумма начисления'} name={'paymoney'} type={'number'}/>
          <DList label={'Компания'} title={data.name}/>
          <DList label={'Зачислил'}  title={data.name}/>
        </div>,
        header: 'Пополнить счет',
        state: true,
      };
      result = (<Tabs.Panel state={state} name={'info'}  className={'pt-8'} company_type={company_type}>
         {company_type === 'customer' && <DList label={'Оплата'} title={data[`${company_type}profile`].payment} />}
        <DList label={'ИНН'} title={data[`${company_type}profile`].inn ?? "0"} />
        <DList label={'ОГРН'} title={data[`${company_type}profile`].ogrn} />
        {company_type === 'customer' && <CardSimple className={'p-5 grid gap-y-9 bg-gray-3 rounded-062 row-span-2'}>
          <DList label={'Исполнители'} title={data[`${company_type}profile`].ogrn} />
          <CardSimple.Footer>
            <LinkStyled variant={ButtonVariant.text} style={{color: 'var(--accentColor)'}} text={'Подробнее'} to={'#'} />
          </CardSimple.Footer>
        </CardSimple>}
        {company_type === 'customer' ? data.balance && <DList label={'Счет'} title={<>
          <Heading text={data.balance.total + ' ₽'}  variant={HeadingVariant.h2} color={HeadingColor.accent} />
          <Heading text={data[`${company_type}profile`].overdraft_sum + ' ₽' + ' с овердрафтом'}  variant={HeadingVariant.h4} color={HeadingColor.accent} />
        </>

        }/> : <DList label={'Процент сервиса'} title={<>
          <Heading text={data.performerprofile.service_percent + ' %'}  variant={HeadingVariant.h2} color={HeadingColor.accent} />
        </>

        }/>}
        <DList label={'Адрес'} title={data[`${company_type}profile`].address} />
        <DList label={'Юридический адрес'} title={data[`${company_type}profile`].legal_address} />
        <DList label={'Подключенные услуги'} title={''} />
        <DList label={'Контакты для связи'} title={data[`${company_type}profile`].contacts} />
        {company_type === 'customer' &&  <Button text={'Пополнить счет'}  action={async () => {
        store.appStore.setModal(fundBill) }}
         variant={ButtonVariant['accent-outline']} size={ButtonSizeType.sm} /> }
      </Tabs.Panel>)
      break;

    case 'Сотрудники':
      console.log(data);
      result = (<Tabs.Panel  state={state} name={'users'} variant={PanelVariant.dataPadding} background={PanelColor.default} className={'!bg-none !border-0'}  bodyClassName={'!bg-transparent'}>
        {data.length !== 0 ? <TableWithSort  className={'!rounded-none  !bg-none overflow-visible !border-0'} bodyClassName={'!bg-none !rounded-none !bg-transparent'} background={PanelColor.default} search={true} filter={true}
          data={data.map((item: any & {rootRoute?: string} ) => ({
            state: item.employee.is_active,
            name: item.employee.first_name + ' ' + item.employee.last_name,
            phone: item.employee.phone,
            email: item.employee.email,
            group: item.group.name,
            // @ts-ignore
            company: store.companyStore.fullCompanyData.get(`${companyId}`).company.data.name,
            // @ts-ignore
            city: store.companyStore.fullCompanyData.get(`${companyId}`).company.data.city.name,
            id: item.id,
            query: {
              company_id: companyId,
              rootRoute: `/account/users/${companyId}/${item.id}`,
            },
          }))} initFilterParams={[{label: 'Статус', value: 'state'}, {label: 'Город', value:  'city'}]} state={false} variant={PanelVariant.default} footer={false}   ar={['Статус', 'ФИО', 'Номер телефона', 'e-mail', 'Группа', 'Компания', 'Город']}/> : <Heading  variant={HeadingVariant.h2} text={'Нет сотрудников'} className={'py-12'}/>}
      </Tabs.Panel>)
      break;
    case 'Филиалы':
      console.log(data);
      result = (<Tabs.Panel  state={state} name={'filials'} variant={PanelVariant.dataPadding} background={PanelColor.default} className={'!bg-none !border-0'}  bodyClassName={'!bg-transparent'}>
        {data.length !== 0 ? <TableWithSort  className={'!rounded-none  !bg-none overflow-visible !border-0'} bodyClassName={'!bg-none !rounded-none !bg-transparent'} background={PanelColor.default} search={true} filter={true}
          data={data.map((item: any & {rootRoute?: string} ) => ({
            state: item.is_active,
            name: item.name,
            city: item.city.name,
            id: item.id,
            query: {
              company_id: companyId,
              rootRoute: `/account/filials/${company_type}/${companyId}/${item.id}`,
            },
          }))} initFilterParams={[{label: 'Статус', value: 'state'}, {label: 'Город', value:  'city'}]} state={false} variant={PanelVariant.default} footer={false}   ar={['Статус', 'Филиал', 'Город']}/> : <Heading  variant={HeadingVariant.h2} text={'Нет автомобилей'} className={'py-12'}/>}
      </Tabs.Panel>)
      break;
    default:
      return null;
  }
  return  result
};
export const TabsVariantsCars = ({label, content_type, data, state, name, className, companyId, company_type, ...props}:TabsVariantsProps) => {
  const store = useStore()
  let result

  switch (label) {
    case "Основная информация":
      const navigate = useNavigate()


      result = (<Tabs.Panel state={state} name={'info'}  className={'pt-8'} company_type={company_type}>
       <DList label={'Марка'} title={data.brand.name} />
       <DList label={'Модель'} title={data.model.name} />
       <DList label={'Тип'} title={data.model.car_type} />
        {/* todo: Добавить высоту и радиус */}
        <div className={'subgrid'}>
          <DList label={'Компания'} title={data.company.name} />
        {/* todo: Добавить филиал */}
          {data.company.parent && <DList label={'Филиал'} title={data.company.parent} />}
        </div>
      </Tabs.Panel>)
      break;

    case 'Сотрудники':
      // @ts-ignore
      console.log(data);
      // console.log(props[0].data && props[0].data?.company.name || '');
      result = (<Tabs.Panel  state={state} name={'users'} variant={PanelVariant.dataPadding} background={PanelColor.default} className={'!bg-none !border-0'}  bodyClassName={'!bg-transparent'}>
        {data.employees.length !== 0 ? <TableWithSort total={data.count}  className={'!rounded-none  !bg-none overflow-visible !border-0'} bodyClassName={'!bg-none !rounded-none !bg-transparent'} background={PanelColor.default} search={true} filter={true}
          data={data.employees.map((item: any & {rootRoute?: string} ) => ({
            state: item.is_active,
            name: item.first_name + ' ' + item.last_name,
            phone: item.phone,
            email: item.email,

            company: data.company.name,

            city: data.company.city.name,
            id: item.id,
            query: {
              company_id: data.company.id,
              rootRoute: `/account/users/${data.company.company_type === "Компания-Заказчик" ? 'customer' : 'performer'}/${data.company.id}/${item.id}`,
            },
          }))} initFilterParams={[{label: 'Статус', value: 'state'}, {label: 'Город', value:  'city'}]} state={false} variant={PanelVariant.default} footer={false}
          ar={['Статус', 'ФИО', 'Номер телефона', 'e-mail',  'Компания', 'Город']}/> : <Heading  variant={HeadingVariant.h2} text={'Нет сотрудников'} className={'py-12'}/>}
      </Tabs.Panel>)
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
    //       }))} initFilterParams={[{label: 'Статус', value: 'state'}, {label: 'Город', value:  'city'}]} state={false} variant={PanelVariant.default} footer={false}   ar={['Статус', 'Филиал', 'Город']}/> : <Heading  variant={HeadingVariant.h2} text={'Нет автомобилей'} className={'py-12'}/>}
    //   </Tabs.Panel>)
    //   break;
    default:
      return null;
  }
  return  result
};

export const TabsVariantBids = ({
    label,
    content_type,
    data,
    state,
    name,
    className,
    companyId,
    company_type,
    ...props
}: TabsVariantsProps) => {
    const store = useStore()
    let result
    console.log(data)
    console.log(label)
    switch (label) {
        case 'Основная информация':
            const navigate = useNavigate()

            result = (
                <Tabs.Panel
                    className={'pt-8 grid !grid-cols-3  !gap-y-3  gap-x-12 content-start !py-8' + ' ' + className}
                    state={state}
                    name={'bidInfo'}
                    company_type={company_type}
                >
                    <DList
                        className={'child:dt:text-accent'}
                        label={'Заказчик'}
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
                    <DList
                        className={'child:dt:text-accent col-span-2 col-start-1 row-start-5'}
                        label={'Комментарий'}
                        title={<p>{data.customer_comment}</p>}
                    />
                    <Panel
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
                            label={'Адрес'}
                            title={<Heading variant={HeadingVariant.h4} text={data.performer.name} />}
                        />
                    </Panel>
                    {/* /!* //todo: address *!/ */}
                    {/* <DList className={'child:dt:text-accent'}  label={'Адрес выезда'}  title={data.address} /> */}
                    {/* <DList className={'child:dt:text-accent'}  label={'Важность'}  title={store.bidsStore.formResultsAll.important.label} /> */}
                    {/* <DList className={'child:dt:text-accent'}  label={'Время'}  title={store.bidsStore.formResultsAll.time.value} /> */}
                    {/* <DList className={'child:dt:text-accent'}  label={'Дополнительные данные'}  title={<><ul><li>{store.bidsStore.formResultsAll.secretKey.label}</li><li>{store.bidsStore.formResultsAll.parking.label}</li></ul></>} /> */}
                    {/* <DList className={'child:dt:text-accent'}  label={'Дополнительные опции'}  title={<><ul>{store.bidsStore.currentBid.service_option.map((i:any) => <li key={i.id}>{i.name}</li>)}</ul></>} /> */}
                </Tabs.Panel>
            )
            break

        case 'Сотрудники':
            // @ts-ignore
            console.log(data)
            // console.log(props[0].data && props[0].data?.company.name || '');
            result = (
                <Tabs.Panel
                    state={state}
                    name={'users'}
                    variant={PanelVariant.dataPadding}
                    background={PanelColor.default}
                    className={'!bg-none !border-0'}
                    bodyClassName={'!bg-transparent'}
                >
                    {data.employees.length !== 0 ? (
                        <TableWithSort
                            total={data.count}
                            className={'!rounded-none  !bg-none overflow-visible !border-0'}
                            bodyClassName={'!bg-none !rounded-none !bg-transparent'}
                            background={PanelColor.default}
                            search={true}
                            filter={true}
                            data={data.employees.map((item: any & { rootRoute?: string }) => ({
                                state: item.is_active,
                                name: item.first_name + ' ' + item.last_name,
                                phone: item.phone,
                                email: item.email,

                                company: data.company.name,

                                city: data.company.city.name,
                                id: item.id,
                                query: {
                                    company_id: data.company.id,
                                    rootRoute: `/account/users/${data.company.company_type === 'Компания-Заказчик' ? 'customer' : 'performer'}/${data.company.id}/${item.id}`,
                                },
                            }))}
                            initFilterParams={[
                                { label: 'Статус', value: 'state' },
                                { label: 'Город', value: 'city' },
                            ]}
                            state={false}
                            variant={PanelVariant.default}
                            footer={false}
                            ar={['Статус', 'ФИО', 'Номер телефона', 'e-mail', 'Компания', 'Город']}
                        />
                    ) : (
                        <Heading variant={HeadingVariant.h2} text={'Нет сотрудников'} className={'py-12'} />
                    )}
                </Tabs.Panel>
            )
            break
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
        //       }))} initFilterParams={[{label: 'Статус', value: 'state'}, {label: 'Город', value:  'city'}]} state={false} variant={PanelVariant.default} footer={false}   ar={['Статус', 'Филиал', 'Город']}/> : <Heading  variant={HeadingVariant.h2} text={'Нет автомобилей'} className={'py-12'}/>}
        //   </Tabs.Panel>)
        //   break;
        default:
            return null
    }
    return result
}
export type CAR_RADIUS_KEYS = {
  [K in keyof typeof CAR_RADIUS]: string | number;
};
export type  ParsedResultTiresSubtype = {
  label: string
  items: CAR_RADIUS_KEYS
}

export type ParsedResultTires = {
  label: string
  items: ParsedResultTiresSubtype[]
}
export const TabsVariantPrice = ({
    label,
    content_type,
    data,
    state,
    name,
    className,
    companyId,
    company_type,
    ...props
}:any) => {
    const store = useStore()
    let result
  const mapEdTire = (ar: any[], compareField: any) => React.useMemo(() => {
    let meta ={
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

    let newMap:any = new Map(ar.map((item: any) => [item.service_subtype.name,  innerData(ar, 'service_subtype', item.service_subtype.name)]))
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

    let result:any[] = []

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
            resultInnerCartypes.push({ label: key, data: value.amount })
          })
          resultInnerAr.push({label: key, data: resultInnerCartypes })
        })
        resultInner.push({label: key, data: resultInnerAr})
      })
      result.push({ label: key, data: resultInner })
    })
    console.log(result);
    return result.map((item: any) => (
      <div className={'col-span-full'}>
        <Heading text={item.label} variant={HeadingVariant.h6} className={'text-xs uppercase !mb-0 py-2 pt-4 px-6  border-b border-gray-4/70'}/>
        {item.data.map((item: any) => {


          console.log(item.data[0].data.filter((i: any) => i.label == 'R14'));

          return (<div>
            <Heading text={item.label} variant={HeadingVariant.h6} className={'text-xs capitalize  !mb-0 py-2  px-6  border-b border-gray-4/70'}/>
            <TableWithSortNewPure total={item.data.length}  variant={PanelVariant.default}
              search={false}
              background={PanelColor.default}
              className={'col-span-full table-groups'}
              filter={false}
              data={item.data.map((it: any) => ({
                [it.label]: it.label ? it.label : '-',
                r14: it.data.filter((i: any) => i.label == 'R14').length > 0 ? it.data.filter((i: any) => i.label == 'R14')[0].data : '-',
                r15: it.data.filter((i: any) => i.label == 'R15').length > 0 ? it.data.filter((i: any) => i.label == 'R15')[0].data : '-',
                r16: it.data.filter((i: any) => i.label == 'R16').length > 0 ? it.data.filter((i: any) => i.label == 'R16')[0].data : '-',
                r17: it.data.filter((i: any) => i.label == 'R17').length > 0 ? it.data.filter((i: any) => i.label == 'R17')[0].data : '-',
                r18: it.data.filter((i: any) => i.label == 'R18').length > 0 ? it.data.filter((i: any) => i.label == 'R18')[0].data : '-',
                r19: it.data.filter((i: any) => i.label == 'R19').length > 0 ? it.data.filter((i: any) => i.label == 'R19')[0].data : '-',
                r20: it.data.filter((i: any) => i.label == 'R20').length > 0 ? it.data.filter((i: any) => i.label == 'R20')[0].data : '-',
                r2123: it.data.filter((i: any) => i.label == 'R20-23').length > 0 ? it.data.filter((i: any) => i.label == 'R20-23')[0].data : '-',
                r15C: it.data.filter((i: any) => i.label == 'R15C').length > 0 ? it.data.filter((i: any) => i.label == 'R15C')[0].data : '-',
                r16C: it.data.filter((i: any) => i.label == 'R16C').length > 0 ? it.data.filter((i: any) => i.label == 'R16C')[0].data : '-'

              }) as any)}
              // data={item.data.map((it: any) => {
              //   const ad = it.data.map((i: any) => ({
              //     [i.label]: i.data
              //   }))
              //   ad.push({service: item.label})
              //   console.log(ad);
              //   return ad
              //   })}
              initFilterParams={[{ label: 'Статус', value: 'status' }, { label: 'Город', value: 'city' }]}
              state={false}
              ar={[{ label: 'Тип услуги', name: 'service_option' },
                  {label: 'R14', name: 'R14}'},
                  {label: 'R15', name: 'R15'},
                  {label: 'R16', name: 'R16'},
                  {label: 'R17', name: 'R17'},
                  {label: 'R18', name: 'R18'},
                  {label: 'R19', name: 'R19'},
                  {label: 'R20', name: 'R20'},
                  {label: 'R20-23', name: 'R20-23'},
                  {label: 'R15C', name: 'R15C'},
                  {label: 'R16C', name: 'R16C'}

              ]}
            />
          </div>)})}

      </div>
    ))
  }, [])
    switch (label) {
        case 'Мойка':
            const navigate = useNavigate()

            result = (
                <Tabs.PanelPure
                    className={'pt-8 grid !grid-cols-3  !gap-y-3  gap-x-12 content-start !py-8' + ' ' + className}
                    state={state}
                    name={'wash'}
                >
                    <span>Мойка</span>
                    {/* <DList className={'child:dt:text-accent'}  label={'Заказчик'}  title={<Heading variant={HeadingVariant.h4} text={data.company.name}/>} /> */}
                    {/* <DList className={'child:dt:text-accent'}  label={'Город'}  title={<Heading variant={HeadingVariant.h4} text={data.company.city.name}/>} /> */}
                    {/* <DList className={'child:dt:text-accent'}  label={'Пользователь'}  title={<Heading variant={HeadingVariant.h4} text={`${data.author.first_name} ${data.author.last_name}`}/>} /> */}
                    {/* <DList className={'child:dt:text-accent'}  label={'Услуга'}  title={<Heading variant={HeadingVariant.h4} text={data.service_type.name} color={HeadingColor.active} />} /> */}
                    {/* <DList className={'child:dt:text-accent'}  label={'Номер телефона'}  title={<Heading variant={HeadingVariant.h4} text={data.phone}/>} /> */}
                    {/* <DList className={'child:dt:text-accent'}  label={'Марка автомобиля'}  title={<Heading variant={HeadingVariant.h4} text={data.car.brand.name + ' ' + data.car.model.name}/>} /> */}
                    {/* <DList className={'child:dt:text-accent'}  label={'Гос. номер'}  title={<Heading variant={HeadingVariant.h4} text={data.car.number}/>} /> */}
                    {/* <DList className={'child:dt:text-accent'}  label={'Тип'}  title={<Heading variant={HeadingVariant.h4} text={data.car.model.car_type}/>} /> */}
                    {/* <DList className={'child:dt:text-accent col-span-2 col-start-1 row-start-5'}  label={'Комментарий'}  title={<p>{data.customer_comment}</p>} /> */}
                    {/* <Panel variant={PanelVariant.withPaddingSmWithBody} background={PanelColor.glass} className={'!col-start-3 row-span-5'}> */}
                    {/*   <DList className={'child:dt:text-accent'}  label={'Партнер'}  title={<Heading variant={HeadingVariant.h4} text={data.performer.name}/>} /> */}
                    {/*   <DList className={'child:dt:text-accent'}  label={'Адрес'}  title={<Heading variant={HeadingVariant.h4} text={data.performer.name}/>} /> */}
                    {/* </Panel> */}
                    {/* /!* /!* //todo: address *!/ *!/ */}
                    {/* /!* <DList className={'child:dt:text-accent'}  label={'Адрес выезда'}  title={data.address} /> *!/ */}
                    {/* /!* <DList className={'child:dt:text-accent'}  label={'Важность'}  title={store.bidsStore.formResultsAll.important.label} /> *!/ */}
                    {/* /!* <DList className={'child:dt:text-accent'}  label={'Время'}  title={store.bidsStore.formResultsAll.time.value} /> *!/ */}
                    {/* /!* <DList className={'child:dt:text-accent'}  label={'Дополнительные данные'}  title={<><ul><li>{store.bidsStore.formResultsAll.secretKey.label}</li><li>{store.bidsStore.formResultsAll.parking.label}</li></ul></>} /> *!/ */}
                    {/* /!* <DList className={'child:dt:text-accent'}  label={'Дополнительные опции'}  title={<><ul>{store.bidsStore.currentBid.service_option.map((i:any) => <li key={i.id}>{i.name}</li>)}</ul></>} /> *!/ */}
                </Tabs.PanelPure>
            )
            break

        case 'Шиномонтаж':


          console.log(data);
            // console.log(props[0].data && props[0].data?.company.name || '');
            result = (
              <Tabs.PanelPure
                state={state}
                name={'tire'}
                variant={PanelVariant.default}
                background={PanelColor.default}
                className={'mt-3 grid !grid-cols-3  !gap-y-3  gap-x-12 content-start !pb-8  table-price h-full' + ' ' + className}
                bodyClassName={'!bg-transparent'}
              >

                  {mapEdTire(tires.tire_positions, 'car_type')}

                    {/* {data.employees.length !== 0 ? <TableWithSort total={data.count}  className={'!rounded-none  !bg-none overflow-visible !border-0'} bodyClassName={'!bg-none !rounded-none !bg-transparent'} background={PanelColor.default} search={true} filter={true} */}
                    {/*   data={data.employees.map((item: any & {rootRoute?: string} ) => ({ */}
                    {/*     state: item.is_active, */}
                    {/*     name: item.first_name + ' ' + item.last_name, */}
                    {/*     phone: item.phone, */}
                    {/*     email: item.email, */}

                    {/*     company: data.company.name, */}

                    {/*     city: data.company.city.name, */}
                    {/*     id: item.id, */}
                    {/*     query: { */}
                    {/*       company_id: data.company.id, */}
                    {/*       rootRoute: `/account/users/${data.company.company_type === "Компания-Заказчик" ? 'customer' : 'performer'}/${data.company.id}/${item.id}`, */}
                    {/*     }, */}
                    {/*   }))} initFilterParams={[{label: 'Статус', value: 'state'}, {label: 'Город', value:  'city'}]} state={false} variant={PanelVariant.default} footer={false} */}
                    {/*   ar={['Статус', 'ФИО', 'Номер телефона', 'e-mail',  'Компания', 'Город']}/> : <Heading  variant={HeadingVariant.h2} text={'Нет сотрудников'} className={'py-12'}/>} */}
                </Tabs.PanelPure>
            )
            break;
        case 'Эвакуация':
          console.log(data);
            result = (
                <Tabs.PanelPure
                    state={state}
                    name={'evacuation'}
                    variant={PanelVariant.default}
                    background={PanelColor.default}
                    className={'mt-3 grid !grid-cols-3  !gap-y-3  gap-x-12 content-start !pb-8  table-price h-full' + ' ' + className}
                    bodyClassName={'!bg-transparent'}
                >
                  <TableWithSortNewPure
                    total={data.length}
                    variant={PanelVariant.default}
                    search={false}
                    background={PanelColor.default}
                    className={'col-span-full table-groups'}
                    filter={false}
                    data={data}
                    initFilterParams={[{ label: 'Статус', value: 'status' }, { label: 'Город', value: 'city' }]}
                    state={false}
                    ar={[{ label: 'Тип услуги', name: 'service_option' }, {label: 'До 2 тонн', name: 'service_option'}, { label: 'от 2 тонн', name: 'service_option_1' }]}
                  />
                </Tabs.PanelPure>
            )
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
        //       }))} initFilterParams={[{label: 'Статус', value: 'state'}, {label: 'Город', value:  'city'}]} state={false} variant={PanelVariant.default} footer={false}   ar={['Статус', 'Филиал', 'Город']}/> : <Heading  variant={HeadingVariant.h2} text={'Нет автомобилей'} className={'py-12'}/>}
        //   </Tabs.Panel>)
        //   break;
        default:
            return null
    }
    return result
}
export default TabsVariants;
