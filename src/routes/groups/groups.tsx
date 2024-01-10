import React from 'react'
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelVariant } from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import Button, { ButtonDirectory, ButtonSizeType } from 'components/common/ui/Button/Button'
import { useStore } from 'stores/store'
import { useLocation, useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import TableWithSort from 'components/common/layout/TableWithSort/TableWithSort'
import moment from 'moment'

const GroupsPage = () => {
    const store = useStore()
    const location = useLocation()
    const navigate = useNavigate()
    const [ar, setAr] = React.useState<any[]>([])
    React.useEffect(() => {
      // console.log(ar);
      // console.log(store.permissionStore.permissions);
    }, [store.permissionStore.permissions]);

    return (
        <Section type={SectionType.default}>
            <Panel
                variant={PanelVariant.withGapOnly}
                headerClassName={'flex justify-between'}
                state={store.permissionStore.loadingPermissions}
                header={
                    <>
                        <Heading
                            text={'Группы'}
                            variant={HeadingVariant.h1}
                            className={'inline-block'}
                            color={HeadingColor.accent}
                        />
                        {store.userStore.getUserCan('users', 'create') && (
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

            <TableWithSort
                filter={false}
                search={true}
                className={'table-groups'}
                ar={['дата и время', 'Название группы']}
                data={store.permissionStore.permissions.map((item: any) => ({
                    date: moment(item.created).format('DD.MM.YYYY HH:mm'),
                    name: item.name,
                    id: item.id,
                    query:{
                      group: store.appStore.appType
                    }
                }))}
                state={store.permissionStore.loadingPermissions}
            />

        </Section>
    )
}
export default observer(GroupsPage)
