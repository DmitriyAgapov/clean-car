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
              autoClose: 3000,
              // title: "Ошибка",
              message: 'Файл успешно загружен',
              // color: 'red',
              // icon: <SvgClose />,
              className:
                'my-notification-class z-[9999]  notification_cleancar success',
              // style: { backgroundColor: 'red' },
              loading: false,
            })
          } else {
            notifications.show({
              id: 'file-users-not-uploaded',
              withCloseButton: true,
              // onClose: () => navigate('/account/cars'),
              // onOpen: () => console.log('mounted'),
              autoClose: 3000,
              // title: "Ошибка",
              message: 'Ошибка',
              // color: 'red',
              // icon: <SvgClose />,
              className:
                'my-notification-class z-[9999]  notification_cleancar',
              // style: { backgroundColor: 'red' },
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
        headerClassName={'flex justify-between flex-wrap'}
        header={
          <>
            <Button
              text={
                <>
                  <SvgBackArrow />
                  Назад к списку пользователей{' '}
                </>
              }
              className={'flex flex-[1_100%] items-center gap-2 font-medium text-[#606163] hover:text-gray-300 leading-none !mb-4'}
              action={() => navigate('/account/users')}
              variant={ButtonVariant.text}
            />
            <Heading
              text={'Добавить пользователя'}
              variant={HeadingVariant.h1}
              className={'!mb-0 inline-block mr-auto flex-1'}
              color={HeadingColor.accent}
            />
            {store.appStore.appType === "admin" && <><Button
              text={'Скачать шаблон'}
              href={'/Шаблон_автомобилей.xlsx'}
              variant={ButtonVariant["accent-outline"]}
              // action={() => navigate('/account/users/create')}
              className={'inline-flex mr-5'}
              size={ButtonSizeType.sm}
            />
              <FileButton
                //@ts-ignore
                onChange={handleFileChange} accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
                {(props) => <Button
                  text={!success ? 'Загрузить файл' : 'Загружено'}

                  className={'inline-flex mr-5'}
                  directory={ButtonDirectory.directory}
                  size={ButtonSizeType.sm}
                  {...props}
                />}
              </FileButton>
            </>}

              </>
        }
      />

      <FormCreateUpdateUsers/>

    </Section>
  )
}
