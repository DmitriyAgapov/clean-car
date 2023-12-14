import React, { useState } from 'react'
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelColor, PanelVariant } from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import Button, { ButtonVariant } from 'components/common/ui/Button/Button'
import { useStore } from 'stores/store'
import { useLocation, useNavigate } from 'react-router-dom'
import { SvgBackArrow } from 'components/common/ui/Icon'
import FormCreateCompany from 'components/Form/FormCreateCompany/FormCreateCompany'

export default function CompanyPageCreateAction(props: any) {
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
  // const handlePermissions = (event: any, id: number) => {
  //   const indexAr = changes.permissions.findIndex((value: any) => value.id === id)
  //   const newArrayItem = {
  //     ...changes.permissions[indexAr],
  //     [event.target.name]: event.target.checked,
  //   }
  //   const newArray = toJS(changes.permissions)
  //   newArray.splice(indexAr, 1, newArrayItem)
  //
  //   setChanges((prevState: any) => ({
  //     ...prevState,
  //     permissions: newArray,
  //   }))
  // }
  return (
    <Section type={SectionType.default}>
      <Panel
        className={'col-span-full'}
        header={
          <>
            <Button text={<><SvgBackArrow />Назад к списку компаний{' '}</>}
              className={'flex items-center gap-2 font-medium text-[#606163] hover:text-gray-300 leading-none !mb-7'}
              action={() => navigate(-1)}
              variant={ButtonVariant.text}
            />
            <Heading
              text={'Создание компании'}
              variant={HeadingVariant.h1}
              className={'!mb-0 inline-block'}
              color={HeadingColor.accent}
            />
          </>
        }
      />

      <FormCreateCompany />

    </Section>
  )
}
