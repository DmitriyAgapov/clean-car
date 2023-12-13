import React from 'react'
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import Button, { ButtonDirectory, ButtonSizeType } from 'components/common/ui/Button/Button'
import { useStore } from 'stores/store'
import { useLocation, useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import TableWithSort from 'components/common/layout/TableWithSort/TableWithSort'
import moment from 'moment'

export default observer(function GroupsPage() {
    const store = useStore()
    const location = useLocation()
    const navigate = useNavigate()

    return (
        <Section type={SectionType.default}>
            <Panel
                className={'col-span-full'}
                header={
                    <>
                        <Heading
                            text={'Группы'}
                            variant={HeadingVariant.h1}
                            className={'!mb-0 inline-block'}
                            color={HeadingColor.accent}
                        />
                        <Button
                            text={'Создать группу'}
                            action={() => navigate('/account/groups/create')}
                            className={'inline-flex float-right'}
                            directory={ButtonDirectory.directory}
                            size={ButtonSizeType.sm}
                        />
                    </>
                }
            >
                <p className={'-mt-4'}>
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
                }))}
                state={store.permissionStore.loadingPermissions}
            />
        </Section>
    )
})