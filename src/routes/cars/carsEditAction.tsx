import React from 'react'
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import { SvgBackArrow } from 'components/common/ui/Icon'
import Button, { ButtonDirectory, ButtonSizeType, ButtonVariant } from 'components/common/ui/Button/Button'
import { Navigate, useLoaderData, useNavigate } from 'react-router-dom'
import 'yup-phone-lite'
import FormCreateUser from 'components/Form/FormCreateUser/FormCreateUser'
import { useStore } from "stores/store";
import { PermissionNames } from "stores/permissionStore";
import LinkStyled from "components/common/ui/LinkStyled/LinkStyled";
import FormCreateCar from "components/Form/FormCreateCar/FormCreateCar";
import { values as val } from "mobx";

export default function CarsPageEditAction() {
  const store = useStore()
  const navigate = useNavigate()
  const { data, page, pageRequest, textData, company_type }: any = useLoaderData()
  const values = data.results


  React.useEffect(() => {
    store.catalogStore.getAllCities()
    store.usersStore.clearSelectedUsers()
    store.formStore.formClear('formCreateCar')
    store.carStore.setBrand(values.model.brand);
    store.usersStore.getUsers(values.company.id);
    values.employees.forEach((i:any) => {
      store.usersStore.addToSelectedUsers(i.id);
    })
  }, [])
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

      <FormCreateCar edit={true} car={{
        id: values.id,
        number: values.number,
        height: values.height,
        radius: values.radius,
        city: String(values.company.city.id),
        company_id: String(values.company.id),
        company_type: values.company.company_type,
        is_active: values.is_active ? "true" : "false",
        brand: String(values.model.brand),
        model: String(values.model.id),
        car_type: values.model.car_type,
        employees: values.employees.map((e:any) => e.id),
      }}/>

    </Section>
  )
}
