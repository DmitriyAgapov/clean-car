import React from 'react'
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import { SvgBackArrow } from 'components/common/ui/Icon'
import { ButtonDirectory, ButtonSizeType, ButtonVariant } from 'components/common/ui/Button/Button'
import { Navigate, useNavigate } from 'react-router-dom'
import 'yup-phone-lite'
import { useStore } from "stores/store";
import LinkStyled from "components/common/ui/LinkStyled/LinkStyled";
import { PermissionNames } from "stores/permissionStore";
import FormCreateUpdateCar from "components/Form/FormCreateCar/FormCreateUpdateCar";

export default function CarsPageCreateAction() {
  const store = useStore()
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
            <Heading text={'Добавить автомобиль'} variant={HeadingVariant.h1} className={'inline-block mr-auto flex-1'} color={HeadingColor.accent} />
          </div>
          <div className={"flex gap-6 max-w-96"}>
            <LinkStyled text={"Скачать шаблон"}
            variant={ButtonVariant["accent-outline"]}
            to={"/account/cars/create"}
              className={"inline-flex desktop-max:flex-1"}
            size={ButtonSizeType.sm} />
            <LinkStyled text={"Загрузить файл"} to={'/account/cars/create'}                 className={"inline-flex desktop-max:flex-1"} directory={ButtonDirectory.directory} size={ButtonSizeType.sm} />
          </div>
          </>
        }
      >
      </Panel>
      <FormCreateUpdateCar/>
    </Section>
  )
}
