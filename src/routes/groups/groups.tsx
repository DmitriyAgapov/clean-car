import React from "react";
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelColor, PanelVariant } from "components/common/layout/Panel/Panel";
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import Button, { ButtonDirectory, ButtonSizeType } from 'components/common/ui/Button/Button'
import { useStore } from 'stores/store'
import { Outlet, useLoaderData, useLocation, useNavigate } from "react-router-dom";
import {  observer } from "mobx-react-lite";
import TableWithSort from 'components/common/layout/TableWithSort/TableWithSort'
import moment from 'moment'
import { PermissionNames } from "stores/permissionStore";
import TableWithSortNew from "components/common/layout/TableWithSort/TableWithSortNew";

const GroupsPage = () => {
    const store = useStore()
    const navigate = useNavigate()
    const location = useLocation()
  // const data = useLoaderData()
    const {loading, groups, errors} = store.permissionStore.allPermissionsState
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
                            text={'Группы'}
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
            total={groups.length}
              background={PanelColor.glass}
                filter={false}
                search={true}
                className={'table-groups'}
                ar={[{label: 'дата и время', name: 'created'}, {label: 'Название группы', name: 'name'}]}
                data={groups.map((item: any) => ({
                    date: moment(item.created).format('DD.MM.YYYY HH:mm'),
                    name: item.name,
                    id: item.id,
                    query:{
                      group: store.appStore.appType
                    }
                }))}
                state={false}
            />
        </Section>
    )
}
export default observer(GroupsPage)
