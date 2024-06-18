import React, { useState } from "react";
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import { SvgBackArrow } from 'components/common/ui/Icon'
import Button, { ButtonDirectory, ButtonSizeType, ButtonVariant } from 'components/common/ui/Button/Button'
import { Navigate, useNavigate } from 'react-router-dom'
import 'yup-phone-lite'
import { useStore } from "stores/store";
import LinkStyled from "components/common/ui/LinkStyled/LinkStyled";
import { PermissionNames } from "stores/permissionStore";
import FormCreateUpdateCar from "components/Form/FormCreateCar/FormCreateUpdateCar";
import { ActionIcon, FileButton } from "@mantine/core";
import agent from "utils/agent";
import { notifications } from "@mantine/notifications";

export default function CarsPageCreateAction() {
  const store = useStore()
  const [loading, setLoading] = useState(false)
  const [success, setSucces] = useState(false)
  const navigate = useNavigate()
  const handleFileChange = React.useCallback((files: File) => {
    // setFile(files);
    const formData = new FormData();
    formData.append("cars_xlsx", new Blob(["Name"], { type: "text/plain" }));
    formData.append('cars_xlsx', new File([files], files.name, { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }) )
    if (files) {
      (async () => {
        setLoading(true)

        agent.Cars.uploadCars(formData)
        .then(r => {
          if(r.status === 201) {
            setSucces(true)
            notifications.show({
              id: 'file-cars-uploaded',
              withCloseButton: true,
              onClose: () => navigate('/account/cars'),
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
              id: 'file-cars-not-uploaded',
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
        .finally(() =>
          setLoading(false)
        )
      })()
    }
  }, [])

  if(!store.userStore.getUserCan(PermissionNames["Управление автомобилями"], 'update')) return <Navigate to={'/account'}/>
  store.usersStore.clearSelectedUsers()
  store.formStore.formClear('formCreateCar')

  return (
    <Section type={SectionType.default}>
      <Panel
        className={'col-span-full'}
        headerClassName={'md:flex  justify-between flex-wrap'}
        header={<>
          <div>
            <LinkStyled text={<><SvgBackArrow />Назад к списку автомобилей{' '}</>} className={'flex flex-[1_100%] items-center gap-2 font-medium text-[#606163] hover:text-gray-300 leading-none !mb-4'} to={'/account/cars'} variant={ButtonVariant.text} />
            <Heading text={'Добавить автомобиль'} variant={HeadingVariant.h1} className={'inline-block mr-auto flex-1 !mb-0'} color={HeadingColor.accent} />
          </div>
          {store.appStore.appType === "admin" && <div className={"flex gap-6 mobile:max-w-96 mobile:mt-6"}>
            <Button text={"Скачать шаблон"}
            variant={ButtonVariant["accent-outline"]}
              href={'/Шаблон_автомобили.xlsx'}
              className={"inline-flex desktop-max:flex-1"}
            size={ButtonSizeType.sm} />
            <FileButton
              //@ts-ignore
              onChange={handleFileChange} accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
              {(props) => <Button
                text={
                  <span style={{ display: "block", width: 'fit-content' , color: 'black !important'}}>{!success ? 'Загрузить файл' : 'Загружено'}</span>
             }

                className={'inline-flex mr-5'}
                directory={ButtonDirectory.directory}
                size={ButtonSizeType.sm}
                {...props}
              />}
            </FileButton>
          </div>}
          </>
        }
      >
      </Panel>
      <FormCreateUpdateCar/>
    </Section>
  )
}
