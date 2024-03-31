import React from 'react'
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelVariant } from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import Button, {  ButtonVariant } from "components/common/ui/Button/Button";
import { useStore } from 'stores/store'
import { Navigate, useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { SvgBackArrow } from 'components/common/ui/Icon'
import { PermissionNames } from "stores/permissionStore";
import FormCreateCarBrand from "components/Form/FormCreateCarBrand/FormCreateCarBrand";
import { useMap } from "react-leaflet";
function ReferencePageCreate(props: any) {

  const store = useStore()
  const location = useLocation()
  const navigate = useNavigate()
  const { textData }: any = useLoaderData()

  if(!store.userStore.getUserCan(PermissionNames["Управление справочниками"], 'create')) return <Navigate to={'/account'}/>
  return (
    <Section type={SectionType.default}>
      <Panel variant={PanelVariant.withGapOnly}
        headerClassName={'flex justify-between'}
        header={<><div>
          <Button text={<>
          <SvgBackArrow />{textData.createPageBack}</>} className={'flex items-center gap-2 font-medium text-[#606163] hover:text-gray-300 leading-none !mb-4'} action={() => navigate(location.pathname.split('/').slice(0, -1).join('/'))} variant={ButtonVariant.text} />
          <Heading text={!props.edit ? textData.createPage : textData.editPage} variant={HeadingVariant.h1} className={'inline-block !mb-0'} color={HeadingColor.accent} /></div></>}>
      </Panel>
      {/* {!location.pathname.includes('edit') ? textData.createPageForm() : textData.editPageForm(props)} */}

    </Section>
  )
}

export default ReferencePageCreate
