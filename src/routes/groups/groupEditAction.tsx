import React, { useState } from 'react'
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelColor, PanelVariant } from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import Button, { ButtonVariant } from 'components/common/ui/Button/Button'
import { useStore } from 'stores/store'
import { Navigate, useLoaderData, useLocation, useNavigate, useParams, useRevalidator } from 'react-router-dom'
import { SvgBackArrow } from 'components/common/ui/Icon'
import PermissionTable from 'components/common/layout/PermissionTable/PermissionTable'
import { toJS } from 'mobx'
import { PermissionNames } from "stores/permissionStore";
import { modificationSchema, modifyPermissions } from "utils/utils";
import agent from 'utils/agent'
import useSWR from 'swr'
import { observer } from 'mobx-react-lite'

function GroupPageEditAction() {
  const store = useStore()
  const revalidator = useRevalidator()
  const navigate = useNavigate()
  const params = useParams()
  const {isLoading, data:group, mutate} = useSWR(`group_${params.id}_${params.groupId}`,() => agent.Permissions.getPermissionById(params.groupId ? params.id as string : store.userStore.myProfileState.company.id as string,params.groupId ? params.groupId as string :  params.id as string).then(r => r.data))
  const [changes, setChanges] = useState<any>(null)

  React.useEffect(() => {
    let modifCatedData = null;
    if(!isLoading && group) {
      modifCatedData = { ...group }
      const except = store.appStore.appType === "admin" ? [null] : ['Управление справочниками']
      const _ar: any[] = []
      modifyPermissions(group, modificationSchema, store.appStore.appType, except).forEach((item: any) => {
        if (item) {
          _ar.push(item)
        }
      })
      modifCatedData.permissions = _ar;
    }
    setChanges(modifCatedData)

  }, [group, isLoading]);



  const handleChangeName = (event: any) => {
    setChanges((prevState: any) => ({
      ...prevState,
      name: event.target.value,
    }))
  }
  const handlePermissions = React.useCallback((event: any, id: string) => {
    if(changes && changes.permissions && changes.permissions.length) {
      const indexAr = changes.permissions.findIndex((value: any) => {
        if (value) {
          return value.name === id
        }
      })
      const newArrayItem = {
        ...changes?.permissions[indexAr],
        [event.target.name]: event.target.checked,
      }
      const newArray = toJS(changes?.permissions)
      newArray.splice(indexAr, 1, newArrayItem)

      setChanges((prevState: any) => ({
        ...prevState,
        permissions: newArray,
      }))
    }
  }, [changes, isLoading])
  if(!store.userStore.getUserCan(PermissionNames["Управление пользователями"], 'update')) return <Navigate to={'/account'}/>
  return (
    <Section type={SectionType.default}>
      <Panel
        className={'col-span-full'}
        headerClassName={'justify-between gap-4 flex'}
        header={
          <>
          <div>
            <Button text={
              <>
                <SvgBackArrow />
                Назад к списку групп </>
            }
              className={     'flex items-center gap-2 font-medium text-[#606163] hover:text-gray-300 leading-none !mb-4'}
              action={() => navigate(-1)}
              variant={ButtonVariant.text} />
            <Heading text={"Редактирование группы"}
              variant={HeadingVariant.h1}
              className={'!mb-0 inline-block'}
              color={HeadingColor.accent} />

          </div>
          </>
          }
          ></Panel>
          <Panel
        variant={PanelVariant.textPadding}
        state={isLoading}
            bodyClassName={'!py-0 tablet:!px-0'}
        className={'col-span-full tablet:grid grid-rows-[auto_1fr_auto] tablet-max:-mx-3'}
        header={<label className={'account-form__input flex-1'} htmlFor='cleanm'>
          Название группы
          <input id='name' name='name' type='text' value={changes?.name} onChange={handleChangeName} />
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
                      text={'Удалить'}
                      action={async () => {
                        store.permissionStore.deletePermissionStore(changes?.id).then(() => {
                          store.appStore.closeModal()
                          revalidator.revalidate()
                          navigate('/account/groups', { replace: false })
                        })

                      }}
                      variant={ButtonVariant['accent-outline']}
                    />,
                  ],
                  text: `Вы уверены, что хотите удалить ${changes?.name}`,
                  state: true,
                })
              }}
              className={'justify-self-start mr-auto  tablet-max:order-1'}
            />
            <div className={'flex tablet-max:flex-col  justify-end gap-4 tablet-max:!mb-4 '}>
              <Button
                text={'Отменить'}
                action={() => navigate(-1)}
                className={'float-right'}
                variant={ButtonVariant.cancel}
              />
              <Button
                text={'Сохранить'}
                action={async () => {
                  // @ts-ignore
                  store.permissionStore.setPermissionStore(params.id || changes?.id, params.groupdId, changes)
                  revalidator.revalidate()
                  setTimeout(() => navigate('/account/groups'), 500)
                }}
                className={'float-right tablet-max:-order-1  '}
                variant={ButtonVariant.accent}
              />
            </div>
          </>
        }
            footerClassName={'flex tablet-max:flex-col  justify-end mobile:!justify-center tablet-max:!px-3  tablet-max:border-t mt-6 pt-4 border-gray-2'}
        background={PanelColor.glass}
      >
        <div className={'accounts-group_body text-[#606163] py-6'}>
            <Heading
              text={'Настройте права доступов'}
              color={HeadingColor.accent}
              variant={HeadingVariant.h3}
              className={'tablet:px-8'}
            />

          {changes && changes.permissions ? <PermissionTable editable={true} data={changes.permissions} action={handlePermissions} /> : null}

        </div>
      </Panel>
    </Section>
  )
}
export default observer(GroupPageEditAction)
