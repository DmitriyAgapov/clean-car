import React, { useState } from 'react'
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelColor, PanelVariant } from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import Button, { ButtonVariant } from 'components/common/ui/Button/Button'
import { useStore } from 'stores/store'
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom'
import { SvgBackArrow } from 'components/common/ui/Icon'
import PermissionTable from 'components/common/layout/PermissionTable/PermissionTable'
import { toJS } from 'mobx'

export default function GroupPageCreateAction(props: any) {
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
              text={'Создать группу'}
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
        footer={
          <div className={'accounts-group_header gap-4 text-[#606163] grid font-medium'}>
            <div className={'flex justify-end gap-5 justify-self-end'}>
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
                  await store.permissionStore.createPermissionStoreAdmin(changes)
                  setTimeout(() => navigate('/account/groups'), 500)
                  // navigate('/account/groups')
                }}
                className={'float-right'}
                variant={ButtonVariant.accent}
              />
            </div>
          </div>
        }
        background={PanelColor.glass}
      >
        <div className={'accounts-group_body text-[#606163] w-full gap-x-4 gap-y-16 font-medium py-12'}>
          <label className={'account-form__input flex-1  px-5 mb-7'} htmlFor='cleanm'>
            Название группы
            <input id='name' name='name' type='text' value={changes.name} onChange={handleChangeName} />
          </label>
          <div>
            <Heading
              text={'Присвойте права группе'}
              color={HeadingColor.accent}
              variant={HeadingVariant.h4}
              className={' px-5'}
            />
          </div>
          <div>
            <PermissionTable editable={true} data={changes.permissions} action={handlePermissions} />
          </div>
        </div>
      </Panel>
    </Section>
  )
}
