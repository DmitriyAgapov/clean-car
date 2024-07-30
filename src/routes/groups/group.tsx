import React from 'react'
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelColor, PanelVariant } from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor,  HeadingVariant } from "components/common/ui/Heading/Heading";
import Button, { ButtonSizeType, ButtonVariant } from "components/common/ui/Button/Button";
import { useStore } from 'stores/store'
import {useLocation, useNavigate, useParams } from 'react-router-dom'
import { SvgBackArrow } from 'components/common/ui/Icon'
import Checkbox from 'components/common/ui/Checkbox/Checkbox'
import PermissionTable from 'components/common/layout/PermissionTable/PermissionTable'
import { observer } from 'mobx-react-lite'
import  { PermissionNames } from "stores/permissionStore";
import { modificationSchema, modifyPermissions } from "utils/utils";
import dayjs from 'dayjs'
import useSWR from 'swr';
import agent from "utils/agent";


const GroupPage = () => {
  const store = useStore()
  const location = useLocation()
  const navigate = useNavigate()
  const params = useParams()
  const {isLoading, data:group, mutate} = useSWR(`group_${params.id}`,() => agent.Permissions.getPermissionById(store.userStore.myProfileState.company.id as string, params.id as string).then(r => r.data))

  const memoizedAndModificatedGroup = React.useMemo(() => {
    let modifCatedData = null;
    if(!isLoading && group) {
      modifCatedData = { ...group }
      const except = store.appStore.appType === "admin" ? [null] : ['Управление справочниками']
      modifCatedData.permissions = modifyPermissions(group, modificationSchema, store.appStore.appType, except);
    }
    if(!modifCatedData && isLoading) return
    return <PermissionTable data={modifCatedData.permissions} />;
  }, [group, isLoading]);

  return (
    <Section type={SectionType.default}>
      <Panel
        className={'col-span-full'}
        headerClassName={'justify-between gap-4 flex'}
        header={
          <>
            <div>
              <Button
                text={
                  <>
                    <SvgBackArrow />
                    Назад к списку групп{' '}
                  </>
                }
                className={
                  'flex items-center gap-2 font-medium text-[#606163] hover:text-gray-300 leading-none !mb-4'
                }
                action={() => navigate('/account/groups')}
                variant={ButtonVariant.text}
              />
              <Heading
                text={'Права доступа'}
                variant={HeadingVariant.h1}
                className={'!mb-0 inline-block'}
                color={HeadingColor.accent}
              />
            </div>
            {store.userStore.getUserCan(PermissionNames["Управление пользователями"], 'update') && <Button
              text={'Редактировать'}
              action={() => navigate(location.pathname + '/edit')}
              className={'float-right mobile:mt-auto'}
              variant={ButtonVariant.default}

              size={ButtonSizeType.sm}
            />}

          </>
        }

      ></Panel>
      <Panel
        variant={PanelVariant.textPadding}
        state={isLoading}
        className={'col-span-full tablet:grid grid-rows-[auto_1fr_auto] tablet-max:-mx-3'}
        footerClassName={'flex  justify-end mobile:!justify-center tablet-max:!px-3  tablet-max:border-t mt-6 pt-4 border-gray-2'}
        headerClassName={'border-bottom-none'}
        bodyClassName={'!py-0 tablet:!px-0'}
        header={
          <>
            <Heading text={group?.name} color={HeadingColor.accent} variant={HeadingVariant.h3} />
            <div className={'flex  tablet-max:block  items-baseline justify-between '}>
              <div className={'text-gray-2 text-xs'}>
                Дата и время создания {dayjs(group?.created).locale('ru').format('DD MMMM YYYY г. HH:mm')}
              </div>
            </div>
            <Heading className={'mt-6 !mb-2'} text={'Права доступа'} variant={HeadingVariant.h3} color={HeadingColor.accent} />
          </>
        }
        footer={
          <div className={'flex gap-10 tablet-max:gap-3 tablet-max:flex-col text-gray-2 font-medium text-xs'}>
            <Checkbox name={'test_change_availible_checked'} checked={true} disabled={false} label={'Выбранная позиция'} />
            <Checkbox name={'test_change_availible'} checked={false} disabled={false} label={'Доступно к выбору'} />
            <Checkbox name={'test_change_availible_disabled'} available={false} disabled={true} label={'Недоступно'} />
          </div>
        }
        background={PanelColor.glass}
      >
        {memoizedAndModificatedGroup}
      </Panel>
    </Section>
  )
}
export default observer(GroupPage)
