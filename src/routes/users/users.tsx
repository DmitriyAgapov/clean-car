import React, { useEffect } from "react";
import Section, { SectionType } from "components/common/layout/Section/Section";
import Panel, { PanelColor, PanelRouteStyle, PanelVariant } from "components/common/layout/Panel/Panel";
import Heading, { HeadingColor, HeadingVariant } from "components/common/ui/Heading/Heading";
import Button, { ButtonDirectory, ButtonSizeType } from "components/common/ui/Button/Button";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useStore } from "stores/store";
import { observer, useLocalObservable } from "mobx-react-lite";
import { UserTypeEnum } from "stores/userStore";
import { PermissionNames } from "stores/permissionStore";
import TableWithSortNew from "components/common/layout/TableWithSort/TableWithSortNew";
import { useDidUpdate } from "@mantine/hooks";
import useSWR from "swr";
import { LocalRootStore } from "stores/localStore";
import { FilterData } from "components/common/layout/TableWithSort/DataFilter";

const localRootStore =  new LocalRootStore()
const UsersPage = () => {
  const store = useStore()
  const location = useLocation()
  const localStore = useLocalObservable<LocalRootStore>(() => localRootStore)
  const navigate = useNavigate()
  const {isLoading, data, isValidating, mutate} = useSWR(localStore.params.isReady && ['users', {...localStore.params.getSearchParams}] , ([url, args]) => store.usersStore.loadUserList(args), {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    revalidateOnMount: true,
    revalidateIfStale: false,
  })

  useDidUpdate(
    () => {
      if(location.pathname === '/account/users') {
        mutate()
      }
    },
    [location.pathname]
  );
  useEffect(() => {
    localStore.setData = {
      ...data,
      results: data?.results?.map((item:any) => ({
        state: item.employee.is_active,
        name: item.employee.last_name + ' ' + item.employee.first_name,
        phone: item.employee.phone ? item.employee.phone : " ",
        email: item.employee.email,
        ...((store.appStore.appType === "admin") && {group: item.company.company_type}),
        company: item.company.name,
        city: item.company.city.name,
        id: item.employee.id,
        query: {
          type: item.company.company_type === "Клиент" ? UserTypeEnum.customer : item.company.company_type === "Партнер" ? UserTypeEnum.performer : item.company.company_type === "Физическое лицо" ? UserTypeEnum.customer : "admin",
          company_id: item.company.id,


        },
      }))}
    localStore.setIsLoading = isLoading
  },[data])
  const th = React.useMemo(() => {
    const _th = [
      {label: 'Статус', name: 'employee__is_active'},{label: 'ФИО', name: 'employee__last_name'}, {label: 'Телефон', name: 'employee__phone'}, {label: 'e-mail', name: 'employee__email'}
    ]
    const _last = [{label: 'Компания',name: 'company__name'}, {label:  'Город', name: 'company__city__name'}]
    if(store.appStore.appType === "admin")  {
      _th.push({label: 'Тип', name: 'company__company_type'})
    }
    _th.push(..._last)
    return _th
  }, []);

  const ft = React.useMemo(() => {
    const _ft = []
    if(store.appStore.appType === "admin") {
      _ft.push(FilterData.company_type)
    }
    _ft.push(FilterData.employee__is_active)
    return _ft
  }, [])
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
        store={localRootStore}
        variant={PanelVariant.dataPadding}
        search={true}
        style={PanelRouteStyle.users}
        background={PanelColor.glass}
        filter={true}
        initFilterParams={ft}
        state={isLoading}
        ar={th}
      />

    </Section>
  )
}

export default observer(UsersPage)
