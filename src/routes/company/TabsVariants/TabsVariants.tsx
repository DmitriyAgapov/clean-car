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

} & TabsProps & {className?: string, children?: ReactNode | ReactNode[] | React.ReactElement | string, state: boolean, name?: string } & PanelProps

const TabsVariants = ({label, data, state, name, className, companyId, company_type, ...props}:TabsVariantsProps) => {

  const store = useStore()
  let result

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
      result = (<Tabs.Panel state={state} name={'info'}  className={'pt-8'} company_type={company_type}>
         {company_type === 'customer' && <DList label={'Оплата'} title={data[`${company_type}profile`].payment} />}
        <DList label={'ИНН'} title={data[`${company_type}profile`].inn} />
        <DList label={'ОГРН'} title={data[`${company_type}profile`].ogrn} />
        {company_type === 'customer' && <CardSimple className={'p-5 grid gap-y-9 bg-gray-3 rounded-062 row-span-2'}>
          <DList label={'Исполнители'} title={data[`${company_type}profile`].ogrn} />
          <CardSimple.Footer>
            <LinkStyled variant={ButtonVariant.text} style={{color: 'var(--accentColor)'}} text={'Подробнее'} to={'#'} />
          </CardSimple.Footer>
        </CardSimple>}
        {company_type === 'customer' ? <DList label={'Счет'} title={<>
          <Heading text={data[`${company_type}profile`].bill + ' ₽'}  variant={HeadingVariant.h2} color={HeadingColor.accent} />
          <Heading text={data[`${company_type}profile`].overdraft_sum + ' ₽' + ' с овердрафтом'}  variant={HeadingVariant.h4} color={HeadingColor.accent} />
        </>

        }/>: <DList label={'Процент сервиса'} title={<>
          <Heading text={data.performerprofile.service_percent + ' %'}  variant={HeadingVariant.h2} color={HeadingColor.accent} />
        </>

        }/>}
        <DList label={'Адрес'} title={data[`${company_type}profile`].address} />
        <DList label={'Юридический адрес'} title={data[`${company_type}profile`].legal_address} />
        <DList label={'Подключенные услуги'} title={''} />
        <DList label={'Контакты для связи'} title={data[`${company_type}profile`].contacts} />
        {company_type === 'customer' &&  <Button text={'Пополнить счет'}  action={async () => {
          store.appStore.setModal(fundBill)
        }} variant={ButtonVariant['accent-outline']} size={ButtonSizeType.sm}/>}
      </Tabs.Panel>)
      break;


    case 'Сотрудники':
      result = (<Tabs.Panel  state={state} name={'users'} variant={PanelVariant.dataPadding} background={PanelColor.default} className={'!bg-none'}  bodyClassName={'!bg-transparent'}>
        {data.length !== 0 ? <TableWithSort  className={'rounded-none !bg-none overflow-visible'} bodyClassName={'!bg-none !bg-transparent'} background={PanelColor.default} search={true} filter={true}
          data={data.map((item: User & {rootRoute?: string} ) => ({
            state: item.is_active,
            name: item.first_name + ' ' + item.last_name,
            phone: item.phone,
            email: item.email,
            group: item.group,
            // @ts-ignore
            company: store.companyStore.fullCompanyData.get(`${companyId}`).company.data.name,
            // @ts-ignore
            city: store.companyStore.fullCompanyData.get(`${companyId}`).company.data.city.name,
            id: item.id,
            query: {
              company_id: companyId,
              rootRoute: `/account/users/${companyId}/${item.id}`,
            },
          }))} initFilterParams={[{label: 'Статус', value: 'state'}, {label: 'Город', value:  'city'}]} state={false} variant={PanelVariant.dataPadding} footer={false}   ar={['Статус', 'ФИО', 'Номер телефона', 'e-mail', 'Тип', 'Компания', 'Город']}/> : <Heading  variant={HeadingVariant.h2} text={'Нет сотрудников'} className={'py-12'}/>}
      </Tabs.Panel>)
      break;
    default:
      return null;
  }
  return  result
};

export default TabsVariants;
