import React, { useState } from 'react'
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelColor, PanelVariant } from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import Button, { ButtonVariant } from 'components/common/ui/Button/Button'
import { useStore } from 'stores/store'
import { Navigate, useLoaderData, useLocation, useNavigate } from 'react-router-dom'
import { SvgBackArrow } from 'components/common/ui/Icon'
import PermissionTable from 'components/common/layout/PermissionTable/PermissionTable'
import { toJS } from 'mobx'

export default function GroupPageEditAction(props: any) {
  const store = useStore()
  const location = useLocation()

  const navigate = useNavigate()
  // @ts-ignore
  const { group } = useLoaderData()
  const [changes, setChanges] = useState(group)
  const handleChangeName = (event: any) => {
    setChanges((prevState: any) => ({
      ...prevState,
      name: event.target.value,
    }))
  }
  const handlePermissions = (event: any, id: number) => {
    const indexAr = changes.permissions.findIndex((value: any) => value.id === id)
    const newArrayItem = {
      ...changes.permissions[indexAr],
      [event.target.name]: event.target.checked,
    }
    const newArray = toJS(changes.permissions)
    newArray.splice(indexAr, 1, newArrayItem)

    setChanges((prevState: any) => ({
      ...prevState,
      permissions: newArray,
    }))
  }
  if(!store.userStore.getUserCan('users', 'update')) return <Navigate to={'/account'}/>
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
              className={'flex items-center gap-2 font-medium text-[#606163] hover:text-gray-300 leading-none !mb-4'}
              action={() => navigate(-1)}
              variant={ButtonVariant.text}
            />
            <Heading
              text={'Редактирование группы'}
              variant={HeadingVariant.h1}
              className={'!mb-0 inline-block'}
              color={HeadingColor.accent}
            />
          </>
        }
      ></Panel>
      <Panel
        variant={PanelVariant.textPadding}
        state={store.permissionStore.loadingPermissions}
        bodyClassName={'!pt-0 !px-0'}
        className={'grid grid-rows-[auto_1fr_auto]'}
        header={<label className={'account-form__input flex-1'} htmlFor='cleanm'>
          Название группы
          <input id='name' name='name' type='text' value={changes.name} onChange={handleChangeName} />
        </label>}
        footer={
          <>
            <Button
              text={'Удалить'}
              action={async () => {
                store.appStore.setModal({
                  actions: [
                    <Button text={'Нет'} action={() => store.appStore.closeModal()} variant={ButtonVariant.default} />,
                    <Button
                      text={'Да, удалять'}
                      action={async () => {
                        store.permissionStore.deletePermissionStore(changes.id).then(() => {
                          store.appStore.closeModal()
                          navigate('/account/groups', { replace: false })
                        })

                      }}
                      variant={ButtonVariant['accent-outline']}
                    />,
                  ],
                  text: `Вы уверены, что хотите удалить ${changes.name}`,
                  state: true,
                })
              }}
              className={'justify-self-start mr-auto'}
            />
            <div className={'flex justify-end gap-5'}>
              <Button
                text={'Отменить'}
                action={() => navigate(-1)}
                className={'float-right'}
                variant={ButtonVariant['accent-outline']}
              />
              <Button
                text={'Сохранить'}
                action={async () => {
                  // @ts-ignore
                  store.permissionStore.setPermissionStore(changes.id, changes)
                  setTimeout(() => navigate('/account/groups'), 500)
                }}
                className={'float-right'}
                variant={ButtonVariant.accent}
              />
            </div>
          </>
        }
        background={PanelColor.glass}
      >
        <div className={'accounts-group_body text-[#606163] py-6'}>
            <Heading
              text={'Настройте права группы'}
              color={HeadingColor.accent}
              variant={HeadingVariant.h3}
              className={'px-8'}
            />

            <PermissionTable editable={true} data={changes.permissions} action={handlePermissions} />

        </div>
      </Panel>
    </Section>
  )
}
