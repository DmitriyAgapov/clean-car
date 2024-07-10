import React, { useEffect, useState } from "react";
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import { SvgBackArrow, SvgLoading } from "components/common/ui/Icon";
import Button, { ButtonDirectory, ButtonSizeType, ButtonVariant } from 'components/common/ui/Button/Button'
import { Navigate, useNavigate } from 'react-router-dom'
import { useStore } from "stores/store";
import { PermissionNames } from "stores/permissionStore";
import FormCreateUpdateUsers from "components/Form/FormCreateUpdateUsers/FormCreateUpdateUsers";
import { ActionIcon, FileButton, rem, Text } from '@mantine/core'
import agent from "utils/agent";
import { notifications } from "@mantine/notifications";

export default function UsersPageCreateAction() {
  const store = useStore()
  const [loading, setLoading] = useState(false)
  const [success, setSucces] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    store.companyStore.loadCompanies()
    store.companyStore.loadAllFilials()
  }, [])

  const handleFileChange = React.useCallback((files: File) => {
    // setFile(files);
    const formData = new FormData();
    formData.append("users_xlsx", new Blob(["Name"], { type: "text/plain" }));
    formData.append('users_xlsx', new File([files], files.name, { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }) )
    if (files) {
      (async () => {
        setLoading(true)
        agent.Account.uploadUsers(formData)
        .then(r => {
          if(r.status === 201) {
            setSucces(true)
            notifications.show({
              id: 'file-users-uploaded',
              withCloseButton: true,
              onClose: () => navigate('/account/users'),
              // onOpen: () => console.log('mounted'),
              autoClose: 5000,
              title: 'Файл успешно загружен',
              message: null,
              color: 'var(--accentColor)',
              // style: { backgroundColor: 'red' },
              loading: false,
            })
          } else {
            notifications.show({
              id: 'file-users-not-uploaded',
              withCloseButton: true,
              // onClose: () => navigate('/account/cars'),
              // onOpen: () => console.log('mounted'),
              autoClose: 5000,
              title: "Ошибка",
              message: null,
              color: 'var(--errorColor)',
              loading: false,
            })
          }
        })
        // .catch(e => console.log(e))
          .finally(() => {
            setLoading(false)
          })
      })()
    }
  }, [])

  if(!store.userStore.getUserCan(PermissionNames["Управление пользователями"], 'create')) return <Navigate to={'/account'}/>
  // @ts-ignore
  return (
      <Section type={SectionType.default}>
          <Panel
              className={'col-span-full'}
            headerClassName={'md:flex  justify-between flex-wrap'}
              header={
                  <>
                      <div>
                          <Button
                              text={
                                  <>
                                      <SvgBackArrow />
                                      Назад к списку пользователей{' '}
                                  </>
                              }
                              className={'flex flex-[1_100%] items-center gap-2 font-medium text-[#606163] hover:text-gray-300 leading-none !mb-4 self-end'}
                            action={() => navigate('/account/users')}
                              variant={ButtonVariant.text}
                          />
                          <Heading
                              text={'Добавить пользователя'}
                              variant={HeadingVariant.h1}
                              className={'inline-block mr-auto flex-1 !mb-0 self-end'}
                              color={HeadingColor.accent}
                          />
                      </div>
                      {store.appStore.appType === 'admin' && (
                          <div className={'flex gap-6 mobile:max-w-96 mobile:mt-6 self-end'}>
                              <Button
                                  text={'Скачать шаблон'}
                                  href={'/Шаблон_пользователи.xlsx'}
                                  variant={ButtonVariant['accent-outline']}
                                  // action={() => navigate('/account/users/create')}
                                  className={'inline-flex mr-5'}
                                  size={ButtonSizeType.sm}
                              />
                              <FileButton
                                  //@ts-ignore
                                onChange={handleFileChange}
                                  accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                              >
                                  {(props) => (
                                      <Button
                                          text={!success ? 'Загрузить файл' : 'Загружено'}
                                          className={'inline-flex mr-5 self-end'}
                                          directory={ButtonDirectory.directory}
                                          size={ButtonSizeType.sm}
                                          {...props}
                                      />
                                  )}
                              </FileButton>
                          </div>
                      )}
                  </>
              }
          />

          <FormCreateUpdateUsers />
      </Section>
  )
}
