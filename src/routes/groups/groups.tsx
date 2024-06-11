import React, { useEffect } from "react";
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelColor, PanelRouteStyle, PanelVariant } from "components/common/layout/Panel/Panel";
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import Button, { ButtonDirectory, ButtonSizeType } from 'components/common/ui/Button/Button'
import { useStore } from 'stores/store'
import { Outlet, useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { observer, useLocalStore } from "mobx-react-lite";
import moment from 'moment'
import { PermissionNames } from "stores/permissionStore";
import TableWithSortNew from "components/common/layout/TableWithSort/TableWithSortNew";
import { LocalRootStore } from "stores/localStore";
import useSWR from "swr";
import { useDidUpdate } from "@mantine/hooks";
const localRootStore =  new LocalRootStore()
const GroupsPage = () => {
    const store = useStore()

  const localStore = useLocalStore<LocalRootStore>(() => localRootStore)
  const {isLoading, data, mutate} = useSWR(['groups', localStore.params.getSearchParams] , ([url, args]) => store.permissionStore.loadPermissions().then(r => r.data))
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
      localStore.setData = {
        ...data,
          results: data?.results?.map((item: any) => ({
          date: moment(item.created).format('DD.MM.YYYY HH:mm'),
          name: item.name,
          id: item.id,
          query:{
            group: store.appStore.appType
          }
        }))}
      localStore.setIsLoading = isLoading
    },[data])
    useDidUpdate(
      () => {
        if(location.pathname === '/account/groups') {
          mutate().then(r => console.log(r))
        }
      },
      [location.pathname]
    );
  // console.log(data);
  if ('/account/groups' !== location.pathname) return <Outlet />
  if (location.pathname.includes('edit')) return <Outlet />

  return (
        <Section type={SectionType.default}>
            <Panel
                variant={PanelVariant.withGapOnly}
                headerClassName={'flex justify-between'}
                state={false}
                header={
                    <>
                        <Heading
                            text={'Права доступа'}
                            variant={HeadingVariant.h1}
                            className={'inline-block'}
                            color={HeadingColor.accent}
                        />
                        {store.userStore.getUserCan(PermissionNames["Управление пользователями"], 'create') && (
                            <Button
                                trimText={true}
                                text={'Создать группу'}
                                action={() => navigate('/account/groups/create')}
                                className={'inline-flex'}
                                directory={ButtonDirectory.directory}
                                size={ButtonSizeType.sm}
                            />
                        )}
                    </>
                }
            >
                <p className={''}>
                    Вы можете создавать свою иерархию полномочий,
                    <br />
                    чтобы управлять доступом к различным ресурсам системы{' '}
                </p>
            </Panel>
          <TableWithSortNew
            store={localRootStore}
            variant={PanelVariant.dataPadding}
            search={true}
            style={PanelRouteStyle.groups}
            background={PanelColor.glass}
            className={'col-span-full table-groups'}
            filter={true}
            state={isLoading}
            ar={[{ label: "дата и время", name: "created" }, {label: 'Название группы', name: 'name'}]}
          />
        </Section>
    )
}
export default observer(GroupsPage)
