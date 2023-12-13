import React from 'react'
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelColor, PanelVariant } from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import Button, { ButtonVariant } from 'components/common/ui/Button/Button'
import { useStore } from 'stores/store'
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom'
import { SvgBackArrow } from 'components/common/ui/Icon'
import Checkbox from 'components/common/ui/Checkbox/Checkbox'
import PermissionTable from 'components/common/layout/PermissionTable/PermissionTable'
import { observer } from 'mobx-react-lite'
import moment from 'moment'

const GroupPage = () => {
  const store = useStore()
  const location = useLocation()
  const navigate = useNavigate()
  // @ts-ignore
  const { group } = useLoaderData()
  console.log(group)
  return (
    <Section type={SectionType.default}>
      <Panel
        className={'col-span-full'}
        header={
          <>
            <Button
              text={
                <>
                  <SvgBackArrow />
                  Назад к списку групп{' '}
                </>
              }
              className={'flex items-center gap-2 font-medium text-[#606163] hover:text-gray-300 leading-none !mb-7'}
              action={() => navigate(-1)}
              variant={ButtonVariant.text}
            />
            <Heading
              text={'Группа'}
              variant={HeadingVariant.h1}
              className={'!mb-0 inline-block'}
              color={HeadingColor.accent}
            />
          </>
        }
      ></Panel>
      <Panel
        variant={PanelVariant.withPaddingSm}
        state={store.permissionStore.loadingPermissions}
        className={'col-span-full grid grid-rows-[auto_1fr_auto]'}
        header={
          <div className={'accounts-group_header pt-7 grid grid-cols-2'}>
            <div>
              <Heading text={group.name} color={HeadingColor.accent} variant={HeadingVariant.h2} />
              <div className={'text-gray-2 text-xs'}>
                Дата и время создания {moment(group.created).format('DD.MM.YYYY HH:mm')}
              </div>
            </div>
            <Button
              text={'Редактировать'}
              action={() => navigate(location.pathname + '/edit')}
              className={'justify-self-end'}
              variant={ButtonVariant.default}
            />
          </div>
        }
        footer={
          <div className={'flex gap-10 text-gray-2 font-medium text-xs'}>
            <Checkbox
              name={'test_change_availible_checked'}
              checked={true}
              disabled={false}
              label={'Выбранная позиция'}
            />
            <Checkbox name={'test_change_availible'} checked={false} disabled={false} label={'Доступно к выбору'} />
            <Checkbox name={'test_change_availible_disabled'} available={false} disabled={true} label={'Недоступно'} />
          </div>
        }
        background={PanelColor.glass}
      >
        <div className={'accounts-group_body text-[#606163] pt-14'}>
          <Heading className={'px-5'} text={'Права группы'} variant={HeadingVariant.h3} color={HeadingColor.accent} />
          <PermissionTable data={group.permissions} />
        </div>
      </Panel>
    </Section>
  )
}
export default observer(GroupPage)