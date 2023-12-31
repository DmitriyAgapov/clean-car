import React, { useEffect, useState } from 'react'
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelColor, PanelVariant } from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import Button, { ButtonVariant } from 'components/common/ui/Button/Button'
import { useStore } from 'stores/store'
import { Navigate, Outlet, useLoaderData, useLocation, useNavigate } from 'react-router-dom'
import { SvgBackArrow } from 'components/common/ui/Icon'
import FormCreateCompany from 'components/Form/FormCreateCompany/FormCreateCompany'
import FormEditCompany from "components/Form/FormCreateCompany/FormEditCompany";

export default function CompanyPageEditAction(props: any) {
  const store = useStore()
  const location = useLocation()

  const navigate = useNavigate()
  // @ts-ignore
  const [changes, setChanges] = useState({})

  const handleChangeName = (event: any) => {
    setChanges((prevState: any) => ({
      ...prevState,
      name: event.target.value,
    }))
  }
  // @ts-ignore
  const {data} = useLoaderData()
  if(!store.userStore.getUserCan('companies', 'update')) return <Navigate to={'/account'}/>
  return (
    <Section type={SectionType.default}>
      <Panel
        className={'col-span-full'}
        header={
          <>
            <Button text={<><SvgBackArrow />Назад к компании</>}
              className={'flex items-center gap-2 font-medium text-[#606163] hover:text-gray-300 leading-none !mb-4'}
              action={() => navigate(-1)}
              variant={ButtonVariant.text}
            />
            <Heading
              text={'Редактирование компании'}
              variant={HeadingVariant.h1}
              className={'!mb-2 block'}
              color={HeadingColor.accent}
            />
          </>
        }
      />
      <FormEditCompany />
    </Section>
  )
}
