import React, { ReactNode } from 'react'
import DList from 'components/common/ui/DList/DList'
import CardSimple from 'components/common/layout/Cards/CardSimple/CardSimple'
import LinkStyled from 'components/common/ui/LinkStyled/LinkStyled'
import Button, { ButtonSizeType, ButtonVariant } from 'components/common/ui/Button/Button'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import Panel, { PanelColor, PanelProps, PanelRouteStyle, PanelVariant } from 'components/common/layout/Panel/Panel'
import TableWithSort from 'components/common/layout/TableWithSort/TableWithSort'
import { User } from 'stores/usersStore'
import Tabs, { TabsProps } from '../../../components/common/layout/Tabs/Tabs'
import { useStore } from 'stores/store'
import CreateInput from 'components/common/ui/CreateInput/CreateInput'
import { useNavigate } from 'react-router-dom'
import TableWithSortNewPure from 'components/common/layout/TableWithSort/TableWithSortNewPure'
import { translite } from 'utils/utils'
import { CAR_RADIUS } from 'stores/priceStore'
import { ScrollArea } from '@mantine/core'
import { observer } from 'mobx-react-lite'
import CarouselCustom from 'components/common/ui/CarouselCustom/CarouselCustom'
import { BidsStatus } from 'stores/bidsStrore'
import { PermissionNames } from 'stores/permissionStore'
import dayjs from 'dayjs'

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
export const TabsVariantsFilial =  ({label, parentCompany, data, state, name, className, companyId, company_type, props}:TabsVariantsProps) => {
  const store = useStore()
  let result
  console.log(parentCompany);
  switch (label) {
    case "Основная информация":

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
              <Button text={'Отменить'} action={() => store.appStore.closeModal()}       variant={ButtonVariant.cancel} />,
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
          text: (
              <div className={'grid gap-12 mb-12'}>
                  <CreateInput text={'Сумма начисления'} name={'paymoney'} type={'number'} />
                  <DList label={'Компания'} title={data.name} />
                  <DList label={'Зачислил'} title={data.name} />
              </div>
          ),
          header: 'Пополнить счет',
          state: true,
      }
      const performers = React.useMemo(() => {
        const result: any[] = [];
        if(data[`${company_type}profile`].performer_company && data[`${company_type}profile`].performer_company.length > 0) {        data[`${company_type}profile`].performer_company.forEach((item: any, index:number) => {
          const el:any = store.companyStore.companies.filter((c: any) => c.id === item)[0];

          if(el && el.name) {
            result.push(<span key={el.id} className={'text-xs font-normal'}>{el.name}{!(index === data[`${company_type}profile`].performer_company.length - 1) && ', '} </span>)
          }

        })
        return <>{result}</>}
        return null
      }, [data[`${company_type}profile`].performer_company])

      result = (<Tabs.Panel state={state} name={'info'}  className={'pt-8'} company_type={company_type}>
         {company_type === 'customer' && <DList label={'Оплата'} title={data[`${company_type}profile`].payment} />}
        <DList label={'ИНН'} title={data[`${company_type}profile`].inn ?? "0"} />
        <DList label={'ОГРН'} title={data[`${company_type}profile`].ogrn} />
        {company_type === 'customer' && <CardSimple className={'p-5 grid gap-y-9 bg-gray-3 rounded-062 row-span-2'}>
          <DList label={'Исполнители'} title={<>{performers}</>} />
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
        {/* //TODO  Высота въезда*/}
        {company_type === 'performer' && <>
          <DList label={'Макс. высота транспорта, в см'} title={<>{data[`${company_type}profile`].height} <sub className={'bottom-0 text-white/75'}> см</sub></>} />
        <DList label={'Время работы'} title={data[`${company_type}profile`].working_time} />
        </>}
        {data.active_services && data.active_services.length > 0 && <DList label={'Подключенные услуги'} className={'col-span-2 row-start-5'} title={<>{data.active_services.map((s:string, index:number) => <span key={`s_${index}`} className={'text-accent'}>{s}{!(index === data.active_services.length - 1) && ', '}</span>)}</>} />}
        <DList label={'Контакты для связи'} title={data[`${company_type}profile`].contacts} />
        {/*{company_type === 'customer' &&  <Button text={'Пополнить счет'}  action={async () => {*/}
        {/*store.appStore.setModal(fundBill) }}*/}
        {/* variant={ButtonVariant['accent-outline']} className={'col-start-3'} size={ButtonSizeType.sm} /> }*/}
      </Tabs.Panel>)
      break;

    case 'Сотрудники':
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
          }))} initFilterParams={[{label: 'Статус', value: 'state'}, {label: 'Город', value:  'city'}]} state={false} variant={PanelVariant.default} footer={false}   ar={['Статус', 'Филиал', 'Город']}/> : <Heading  variant={HeadingVariant.h2} text={'Нет филиалов'} className={'py-12'}/>}
      </Tabs.Panel>)
      break;

    case 'Автомобили':
      result = (<Tabs.Panel  state={state} name={'cars'} variant={PanelVariant.dataPadding} background={PanelColor.default} className={'!bg-none !border-0'}  bodyClassName={'!bg-transparent'}>
        {data.length !== 0 ? <TableWithSort  className={'!rounded-none  !bg-none overflow-visible !border-0'} bodyClassName={'!bg-none !rounded-none !bg-transparent'} background={PanelColor.default} search={true} filter={true}
          data={data.map((item: any & {rootRoute?: string} ) => ({
            state: item.is_active,
            brand: item.brand.name,
            model: item.model.name,
            car_type: item.model.car_type,
            number: item.number,
            filial: item.company.parent ? item.company.parent.name : '-',
            city: item.company.city.name,
            id: item.id,
            query: {
              company_id: companyId,
              rootRoute: `/account/cars/${item.id}`,
            },
          }))} initFilterParams={[{label: 'Статус', value: 'state'}, {label: 'Город', value:  'city'}]} state={false} variant={PanelVariant.default} footer={false}   ar={['Статус', 'Бренд', 'Модель', 'Класс', 'Номер', 'Филиал', 'Город']}/> : <Heading  variant={HeadingVariant.h2} text={'Нет автомобилей'} className={'py-12'}/>}
      </Tabs.Panel>)
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
      result = (<Tabs.Panel state={state} name={'info'}  className={'pt-8'} company_type={company_type}>
       <DList label={'Марка'} title={data.brand.name} />
       <DList label={'Модель'} title={data.model.name} />
       <DList label={'Тип'} title={data.model.car_type} />
       <DList label={'Высота'} title={data.height + " см"} />
       <DList label={'Радиус колес'} title={data.radius} />
        {/* todo: Добавить высоту и радиус */}
        {/* <div className={'subgrid'}> */}
          <DList label={'Компания'} title={data.company.parent ? data.company.parent.name : data.company.name} />
        {/* todo: Добавить филиал */}
          {data.company.parent && <DList label={'Филиал'} title={data.company.name} />}
        {/* </div> */}
      </Tabs.Panel>)
      break;

    case 'Сотрудники':
      // @ts-ignore


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

export const TabsVariantBids = observer(({
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
                      {data.performer.address && <DList
                            className={'child:dt:text-accent'}
                            label={'Адрес'}
                            title={<Heading variant={HeadingVariant.h4} text={data.performer.address} />}
                        />}
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
            result = (
                <Tabs.Panel
                  className={'pt-8 grid !grid-cols-3  !gap-y-3  gap-x-12 !py-8' + ' ' + className}
                  state={state}
                  name={'bidService'}
                  variant={PanelVariant.default}
                  company_type={company_type}
                >
                  <Panel
                    variant={PanelVariant.withGapOnly}
                    background={PanelColor.default}
                    className={'!col-span-2 row-span-5 child:*:mb-5'}
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
                  {store.appStore.appType === "performer" && <p className={'col-span-2'}>Ознакомьтесь с услугой. И при необходимости внесите изменения. Сервис передаст их на согласование</p>}
                  {(store.appStore.appType === "customer" || store.appStore.appType === "admin") && <p className={'col-span-2'}>Исполнитель отредактировал перечень услуг. Пожалуйста проверьте и подтвердите изменения </p>}

                  {data.address_from && <DList
                    className={'child:dt:text-accent col-span-2'}
                    label={'Адрес забора'}
                    title={data.address_from}
                  />}
                    {!data.schedule && <DList
                      className={'child:dt:text-accent'}
                      label={'Важность'}
                      title={data.schedule !== null ? 'По времени' : 'Побыстрее'}
                    />}
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
                    className={'!col-start-3 row-span-5 !border-active'}
                  >
                    <DList
                      className={'child:dt:text-accent'}
                      label={'Тип услуги'}
                      title={<Heading variant={HeadingVariant.h4} text={data.service_subtype.name} />}
                    />
                    {(data.service_option && data.service_option.length > 0) && <DList

                      label={'Дополнительные опции'}
                      title={data.service_option.map((o:any) => <Heading variant={HeadingVariant.h4} text={o.name} />)}
                    />}
                    {data.truck_type && <DList
                      className={'child:dt:text-accent'}
                      label={'Тип эвакуатора'}
                      title={<Heading variant={HeadingVariant.h4} text={data.truck_type} />}
                    />}


                    {data.wheel_lock && <DList

                      label={'Нерабочие колеса'}
                      title={<Heading  variant={HeadingVariant.h4} text={data.wheel_lock + "шт."} />}
                    />}

                    {data.create_amount !== null && store.userStore.getUserCan(PermissionNames["Финансовый блок"], "read") && <DList
                      className={'child:dt:text-accent mb-6 mt-auto child:*:text-accent'}
                      label={'Стоимость услуги'}
                      title={<Heading variant={HeadingVariant.h2} className={'!mb-0'} text={String(data.create_amount) + " ₽"} />}
                    />}
                  </Panel>
                </Tabs.Panel>
            )
            break
        case 'Фото':
          const ph = store.bidsStore.CurrentBidPhotosAll
          result = (<Tabs.Panel className={"pt-8 grid !grid-cols-5  !gap-y-3 !grid-flow-row  gap-x-12 content-start !py-8" + " " + className}
            state={state}
            name={"bidService"}
            variant={PanelVariant.default}
            company_type={company_type}>
            <div className={"col-span-2  pr-12"}>
              <Heading text={"Фотографии До"}
                variant={HeadingVariant.h3}
                color={HeadingColor.accent} />
              <p>Фотографии до оказания услуги. Загрузил Заказчик</p>

            </div>
            <div className={"col-span-3"}>
              <CarouselCustom items={ph.filter((e:any) => e.is_before)}/>
            </div>
              <hr className={"col-span-full border-gray-4/70 border"} />
            <div className={"col-span-2   pr-12"}>
              <Heading text={"Фотографии После"}
                variant={HeadingVariant.h3}
                color={HeadingColor.accent} />
              <p>После оказания услуги загрузите пожалуйста фотографии</p>
                {(store.appStore.appType === "performer" && data.status !== BidsStatus["Выполнено"] && data.status !== BidsStatus["Завершена"]) && <Button type={"button"}

                  action={() => store.bidsStore.setModalCurrentState(true)}



                  disabled={data.status !== BidsStatus["В работе"]} text={'Загрузить'} variant={ButtonVariant["accent-outline"]} className={'mt-7'} size={ButtonSizeType.sm}/>}
            </div>
            <div className={"col-span-3"}>
              <CarouselCustom items={ph.filter((e:any) => !e.is_before)}/>
            </div>

          </Tabs.Panel>
        )
        break;
        default:
            return null
    }
    return result
})

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
  let result
  //Разбор массива для Мойка
  const mapEdWast = (ar: any[]) => React.useMemo(() => {

    let newMap:any = new Map(ar.map((item: any) => [item.service_subtype.name,  ar.filter((it:any) => item.service_subtype.name === it.service_subtype.name)]));

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
    console.log(result, 'result');
    return result.map((item: any) => {

        return (
            <div className={'col-span-full border-gray-4/70 border-b pb-4'} key={translite(item.label)}>
              <Heading
                text={item.label}
                variant={HeadingVariant.h6}
                className={'text-xs uppercase !mb-0 py-2  px-6  border-b border-gray-4/70 sticky top-0 z-10 bg-[#090909]'}

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
  }, [ar])

  //Разбор массива для Шиномонтажа
  const mapEdTire = (ar: any[], edit: boolean) => React.useMemo(() => {
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
      let newMap:any = new Map(ar.map((item: any) => [item.service_subtype.name,  innerData(ar, 'service_subtype', item.service_subtype.name)]))
    console.log('newMap', newMap);
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
      return result.map((item: any, index: number) => {
        return (
          <div className={'col-span-full border-gray-4/70 border-b pb-4'} key={translite(item.label ?? `null_${index}`)}>
            <Heading text={item.label} variant={HeadingVariant.h6} className={`text-xs uppercase !mb-0 py-2  px-6  border-b border-gray-4/70 ${item.data[0].label === null ? 'px-6 sticky top-0 z-10  bg-[#090909]' : ''}`}/>
            {item.data.map((item: any, index: number) => {
              console.log('item', item);
              return (
                <div key={translite(item.label ?? `null_${index}`)}>
                  {item.label && <Heading
                    text={item.label}
                    variant={HeadingVariant.h6}
                    className={'text-xs capitalize  !mb-0 py-2  px-6 sticky top-0 z-10 bg-[#090909]'}
                  />}
                  <TableWithSortNewPure
                    edit={edit}
                    total={item.data.length}
                    variant={PanelVariant.default}
                    search={false}
                    style={item.label ? PanelRouteStyle.price_tire : PanelRouteStyle.default}
                    background={PanelColor.default}
                    className={'col-span-full table-groups'}
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
                          value: it.data[0].data
                        }) as any,
                    )}
                    // data={item.data.map((it: any) => {
                    //   const ad = it.data.map((i: any) => ({
                    //     [i.label]: i.data
                    //   }))
                    //   ad.push({service: item.label})
                    //   console.log(ad);
                    //   return ad
                    //   })}

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
              )})}

          </div>
        )
      })
    }, [ar, edit])


  switch (label) {

      case 'Мойка':
          result = (
              <Tabs.PanelPure
                  state={state}
                  name={'wash'}
                variant={PanelVariant.default}
                background={PanelColor.default}
                className={'grid !grid-cols-3  !gap-y-3  gap-x-12 content-start !pb-8  table-price h-full' + ' ' + className}
                bodyClassName={'!bg-transparent'}
              >
                {!props.edit ? mapEdWast(data.wash_positions) : <TableWithSortNewPure
                  meta={{company_id: data.company, price_id: data.id, label: label}}
                  edit={true}
                  offsetSticky={-1}
                  total={data.wash_positions.length}
                  variant={PanelVariant.default}
                  search={false}
                  background={PanelColor.default}
                  state={false}
                  className={'col-span-full table-groups'}
                  filter={false}
                  data={data.wash_positions.map((item:any) => ({
                    id: item.id,
                    service_subtype: item.service_subtype.name,
                    service_option: item.service_option ? item.service_option.name : null,
                    car_class: item.car_class,
                    amount: item.amount
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
              {!props.edit ? mapEdTire(data.tire_positions, false):
                <TableWithSortNewPure
                  meta={{company_id: data.company, price_id: data.id, label: label}}
                edit={true}
                offsetSticky={-1}
                total={data.tire_positions.length}
                variant={PanelVariant.default}
                search={false}
                background={PanelColor.default}
                state={false}
                className={'col-span-full table-groups'}
                filter={false}
                data={data.tire_positions.map((item:any) => ({
                  id: item.id,
                  radius: item.radius,
                  service_subtype: item.service_subtype.name,
                  service_option: item.service_option ? item.service_option.name : null,
                  car_class: item.car_type,
                  amount: item.amount
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
                  className={'grid !grid-cols-3  !gap-y-3  gap-x-12 content-start !pb-8  table-price h-full' + ' ' + className}
                  bodyClassName={'!bg-transparent'}
              >
                {!props.edit ? <TableWithSortNewPure

                  offsetSticky={0}
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
                /> : <TableWithSortNewPure
                  meta={{company_id: data.company, price_id: data.id, label: label}}
                  edit={true}
                  offsetSticky={-1}
                  total={data.evacuation_positions.length}
                  variant={PanelVariant.default}
                  search={false}
                  background={PanelColor.default}
                  state={false}
                  className={'col-span-full table-groups'}
                  filter={false}
                  data={data.evacuation_positions.map((item:any) => ({
                    id: item.id,
                    service_subtype: item.service_subtype.name,
                    service_option: item.service_option ? item.service_option.name : null,
                    amount: item.amount
                  }))}
                  ar={[{label: 'Тип услуги', name: 'service_subtype'}, {label: 'Доп. опции', name: 'service_option'}, {label: 'Cтоимость', name: 'amount'}, ]}
                />}

              </Tabs.PanelPure>
          )
          break;
      default:
          return null
  }
  return <ScrollArea.Autosize offsetScrollbars  mah={'52vh'}>
    {result}
  </ScrollArea.Autosize>
}
export default observer(TabsVariants);
