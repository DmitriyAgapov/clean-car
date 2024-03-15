import React, { useState } from 'react'
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelColor, PanelVariant } from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import Button, { ButtonVariant } from 'components/common/ui/Button/Button'
import { useStore } from 'stores/store'
import { Navigate, useLoaderData, useLocation, useNavigate, useRevalidator } from "react-router-dom";
import { SvgBackArrow } from 'components/common/ui/Icon'
import PermissionTable from 'components/common/layout/PermissionTable/PermissionTable'
import { toJS } from 'mobx'
import { PermissionNames } from "stores/permissionStore";

export default function GroupPageCreateAction(props: any) {
  const store = useStore()
  const location = useLocation()

  const revalidator = useRevalidator()
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
  if(!store.userStore.getUserCan(PermissionNames["Управление пользователями"], 'create')) return <Navigate to={'/account'}/>
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
                          className={
                              'flex items-center gap-2 font-medium text-[#606163] hover:text-gray-300 leading-none !mb-4'
                          }
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
              variant={PanelVariant.textPadding}
              state={store.permissionStore.loadingPermissions}
              className={'grid  grid-rows-[auto_1fr_auto]'}
            footerClassName={'flex !justify-between gap-5'}
              footer={
                  <>
                      <Button
                          text={'Отменить'}
                          action={() => navigate(-1)}

                        variant={ButtonVariant.cancel}
                      />

                      <Button
                          text={'Сохранить'}
                          action={async () => {
                              // @ts-ignore
                              store.permissionStore.createPermission(changes)
                              .then(() => revalidator.revalidate())
                              .finally(() => {
                                navigate('/account/groups')
                              })
                              // navigate('/account/groups')
                          }}

                          variant={ButtonVariant.accent}
                      />
                  </>
              }
              header={
                  <label className={'account-form__input flex-1'} htmlFor='cleanm'>
                      Название группы
                      <input id='name' name='name' type='text' value={changes.name} onChange={handleChangeName} />
                  </label>
              }
              background={PanelColor.glass}
          >
              <div className={'accounts-group_body text-[#606163] w-full gap-x-4 gap-y-16 font-medium py-5'}>
                  <div>
                      <Heading
                          text={'Присвойте права группе'}
                          color={HeadingColor.accent}
                          variant={HeadingVariant.h4}
                          className={'px-8'}
                      />
                  </div>

                  <PermissionTable editable={true} data={changes.permissions} action={handlePermissions} />
              </div>
          </Panel>
      </Section>
  )
}
