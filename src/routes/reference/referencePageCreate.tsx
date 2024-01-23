import React, { useState } from 'react'
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelColor, PanelVariant } from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import Button, { ButtonDirectory, ButtonSizeType, ButtonVariant } from "components/common/ui/Button/Button";
import { useStore } from 'stores/store'
import { Navigate, Outlet, useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { SvgBackArrow } from 'components/common/ui/Icon'
import PermissionTable from 'components/common/layout/PermissionTable/PermissionTable'
import { toJS } from 'mobx'
import { PermissionNames } from "stores/permissionStore";
import TableWithSortNew from "components/common/layout/TableWithSort/TableWithSortNew";
import DList from "components/common/ui/DList/DList";
import RefForm from "components/Form/RefForm/RefForm";
import FormCreateCarBrand from "components/Form/FormCreateCarBrand/FormCreateCarBrand";
import FormActions from "routes/reference/FormActions/FormActions";

function ReferencePageCreate(props: any) {
  console.log('refPageCreate', props.edit);
  const store = useStore()
  const location = useLocation()
  const navigate = useNavigate()

  const { data, page, pageRequest, textData }: any = useLoaderData()

  if(!store.userStore.getUserCan(PermissionNames["Управление справочниками"], 'create')) return <Navigate to={'/account'}/>
  return (
    <Section type={SectionType.default}>
      <Panel variant={PanelVariant.withGapOnly} headerClassName={'flex justify-between'} state={store.permissionStore.loadingPermissions} header={<><div><Button text={<><SvgBackArrow />{textData.createPageBack}</>} className={'flex items-center gap-2 font-medium text-[#606163] hover:text-gray-300 leading-none !mb-4'} action={() => navigate(-1)} variant={ButtonVariant.text} /><Heading text={!props.edit ? textData.createPage : textData.editPage} variant={HeadingVariant.h1} className={'inline-block !mb-0'} color={HeadingColor.accent} /></div></>}></Panel>

        {!props.edit ? textData.createPageForm.call() : textData.editPageForm.call()}

    </Section>
  )
}

export default ReferencePageCreate
