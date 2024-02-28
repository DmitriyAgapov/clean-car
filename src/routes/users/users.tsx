import React from 'react'
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelColor, PanelRouteStyle, PanelVariant } from "components/common/layout/Panel/Panel";
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import Button, { ButtonDirectory, ButtonSizeType } from 'components/common/ui/Button/Button'
import { Outlet, useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { useStore } from 'stores/store'
import { observer } from 'mobx-react-lite'
import { Company } from 'stores/companyStore'
import { User } from 'stores/usersStore'
import { UserTypeEnum } from 'stores/userStore'
import { PermissionNames } from "stores/permissionStore";
import TableWithSortNew from "components/common/layout/TableWithSort/TableWithSortNew";


const UsersPage = () => {
  const store = useStore()
  const location = useLocation()
  const navigate = useNavigate()
  const {data}:any = useLoaderData();

  if ('/account/users' !== location.pathname) return <Outlet />
  return (
    <Section type={SectionType.default}>
      <Panel
        variant={PanelVariant.withGapOnly}
        className={'col-span-full'}
        headerClassName={'flex justify-between'}

        header={
          <>
            <Heading
              text={'Пользователи'}
              variant={HeadingVariant.h1}
              className={'inline-block mr-auto flex-1'}
              color={HeadingColor.accent}
            />

            {store.userStore.getUserCan(PermissionNames["Управление пользователями"], 'create') && <Button
              trimText={true}
              text={'Добавить пользователя'}
              action={() => navigate('/account/users/create')}
              className={'inline-flex'}
              directory={ButtonDirectory.directory}
              size={ButtonSizeType.sm}
            />}
          </>
        }
      ></Panel>
      <TableWithSortNew
        total={data.count}
        background={PanelColor.glass}
        filter={true}
        search={true}
        ar={[{label: 'Статус', name: 'employee__is_active'},{label: 'ФИО', name: 'employee__first_name'}, {label: 'Телефон', name: 'employee__phone'}, {label: 'e-mail', name: 'email'}, {label: 'Тип', name: 'company__company_type'}, {label: 'Компания',name: 'company__name'}, {label:  'Город', name: 'company__city'}]}
        // @ts-ignore
        data={data.results.map((item: { company: Company; group: number; employee: User }) => {
          // console.log(item.company.company_type === "Компания-Заказчик");
          return ({
          state: item.employee.is_active,
          name: item.employee.first_name + ' ' + item.employee.last_name,
          phone: item.employee.phone,
          email: item.employee.email,
          group: item.company.company_type,
          company: item.company.name,
          city: item.company.city.name,
          id: item.employee.id,
          query: {
            type: item.company.company_type === "Компания-Заказчик" ? UserTypeEnum.customer : UserTypeEnum.performer,
            company_id: item.company.id,

          },
        })})}
        state={store.usersStore.loadingUsers}
        style={PanelRouteStyle.users}
        initFilterParams={[{label: 'Статус', value: 'is_active'}, {label: 'Город', value:  'city'}]}
      />
    </Section>
  )
}

export default observer(UsersPage)
