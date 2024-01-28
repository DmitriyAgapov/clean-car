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
import FormCreateCar from "components/Form/FormCreateCar/FormCreateCar";
import { PermissionNames } from "stores/permissionStore";

export default function CarsPageCreateAction() {
  const store = useStore()
  const navigate = useNavigate()
  if(!store.userStore.getUserCan(PermissionNames["Управление автомобилями"], 'update')) return <Navigate to={'/account'}/>
  return (
    <Section type={SectionType.default}>
      <Panel
        className={'col-span-full'}
        headerClassName={'flex justify-between flex-wrap'}
        header={<>
            <LinkStyled text={<><SvgBackArrow />Назад к списку автомобилей{' '}</>} className={'flex flex-[1_100%] items-center gap-2 font-medium text-[#606163] hover:text-gray-300 leading-none !mb-4'} to={'/account/cars'} variant={ButtonVariant.text} />
            <Heading text={'Добавить автомобиль'} variant={HeadingVariant.h1} className={'!mb-0 inline-block mr-auto flex-1'} color={HeadingColor.accent} />
            <LinkStyled text={'Скачать шаблон'} variant={ButtonVariant["accent-outline"]} to={'/account/cars/create'} className={'inline-flex mr-5'} size={ButtonSizeType.sm} />
            <LinkStyled text={'Загрузить файл'} to={'/account/cars/create'} className={'inline-flex mr-5'} directory={ButtonDirectory.directory} size={ButtonSizeType.sm} />
          </>
        }
      >
      </Panel>

      <FormCreateCar/>

    </Section>
  )
}
