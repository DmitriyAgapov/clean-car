import React from 'react'
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelVariant } from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import Button, {  ButtonVariant } from "components/common/ui/Button/Button";
import { useStore } from 'stores/store'
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { SvgBackArrow } from 'components/common/ui/Icon'
import { PermissionNames } from "stores/permissionStore";
import FormCreateCarBrand from "components/Form/FormCreateCarBrand/FormCreateCarBrand";
function ReferencePageCreate(props: any) {

  const store = useStore()
  const location = useLocation()
  const navigate = useNavigate()

  const memVariants = React.useMemo(() => {
   if(!location.pathname.includes('edit')) return <FormCreateCarBrand />
   return <FormCreateCarBrand  edit={true}/>
  },[])

  if(!store.userStore.getUserCan(PermissionNames["Управление справочниками"], 'create')) return <Navigate to={'/account'}/>
  return (
    <Section type={SectionType.default}>
      <Panel variant={PanelVariant.withGapOnly}
        headerClassName={'flex justify-between'}
        header={<><div>
          <Button text={<>
          <SvgBackArrow />{store.catalogStore.textData.createPageBack}</>} className={'flex items-center gap-2 font-medium text-[#606163] hover:text-gray-300 leading-none !mb-4'} action={() => navigate(-1)} variant={ButtonVariant.text} />
          <Heading text={!props.edit ? store.catalogStore.textData.createPage : store.catalogStore.textData.editPageHeader} variant={HeadingVariant.h1} className={'inline-block !mb-0'} color={HeadingColor.accent} /></div></>}>
      </Panel>

      {memVariants}

    </Section>
  )
}

export default ReferencePageCreate
