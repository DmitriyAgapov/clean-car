import React, { useState } from 'react'
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelColor, PanelVariant } from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import Button, { ButtonVariant } from 'components/common/ui/Button/Button'
import { useStore } from 'stores/store'
import { Navigate, useLoaderData, useLocation, useNavigate } from 'react-router-dom'
import { SvgBackArrow } from 'components/common/ui/Icon'
import PermissionTable from 'components/common/layout/PermissionTable/PermissionTable'
import { toJS } from 'mobx'
import { PermissionNames } from "stores/permissionStore";

export default function ReferencePageCreate(props: any) {
  const store = useStore()
  const location = useLocation()
  const navigate = useNavigate()
  if(!store.userStore.getUserCan(PermissionNames["Управление пользователями"], 'create')) return <Navigate to={'/account'}/>
  return (
      <Section type={SectionType.default}>
        'body'
      </Section>
  )
}
