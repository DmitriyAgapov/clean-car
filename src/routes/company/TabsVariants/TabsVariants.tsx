import React, { ReactNode } from "react";
import DList from "components/common/ui/DList/DList";
import CardSimple from "components/common/layout/Cards/CardSimple/CardSimple";
import LinkStyled from "components/common/ui/LinkStyled/LinkStyled";
import Button, { ButtonSizeType, ButtonVariant } from "components/common/ui/Button/Button";
import Heading, { HeadingColor, HeadingVariant } from "components/common/ui/Heading/Heading";
import { PanelColor, PanelProps, PanelVariant } from "components/common/layout/Panel/Panel";
import TableWithSort from "components/common/layout/TableWithSort/TableWithSort";
import { User } from "stores/usersStore";
import Tabs, { TabsProps } from "../../../components/common/layout/Tabs/Tabs";
import { useStore } from "stores/store";
import CreateInput from "components/common/ui/CreateInput/CreateInput";
import { useNavigate } from "react-router-dom";

type TabsVariantsProps = {
  label: string,
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

export default TabsVariants;
