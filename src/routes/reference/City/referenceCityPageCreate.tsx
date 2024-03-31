import React from 'react'
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelVariant } from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import Button, {  ButtonVariant } from "components/common/ui/Button/Button";
import { useStore } from 'stores/store'
import { Navigate, useLoaderData, useLocation, useNavigate, useParams } from "react-router-dom";
import { SvgBackArrow } from 'components/common/ui/Icon'
import { PermissionNames } from "stores/permissionStore";
import FormCreateCarBrand from "components/Form/FormCreateCarBrand/FormCreateCarBrand";
import { useMap } from "react-leaflet";
import { textDataCities } from "routes/reference/City/cities";
import FormCreateUpdateCarBrand from "components/Form/FormCreateCarBrand/FormCreateUpdateCarBrand";
import agent from "utils/agent";
import FormCreateCity from "components/Form/FormCreateCity/FormCreateCity";
function ReferenceCityPageCreate(props: any) {

  const store = useStore()
  const location = useLocation()
  const navigate = useNavigate()
  const params = useParams()
  const {isLoading, data, error} = agent.Catalog.getCityNew(params.id as string)

  // const { textDataCars }: any = useLoaderData()
  console.log(data);
  if(!store.userStore.getUserCan(PermissionNames["Управление справочниками"], 'create')) return <Navigate to={'/account'}/>
  return (
    <Section type={SectionType.default}>
      <Panel variant={PanelVariant.withGapOnly}
        headerClassName={'flex justify-between'}
        header={<><div>
          <Button text={<>
          <SvgBackArrow />{textDataCities.createPageBack}</>} className={'flex items-center gap-2 font-medium text-[#606163] hover:text-gray-300 leading-none !mb-4'} action={() => navigate(location.pathname.split('/').slice(0, -1).join('/'))} variant={ButtonVariant.text} />
          <Heading text={!props.edit ? textDataCities.createPage : textDataCities.editPage} variant={HeadingVariant.h1} className={'inline-block !mb-0'} color={HeadingColor.accent} /></div></>}>
      </Panel>
      {!isLoading && <FormCreateCity edit={props.edit} {...props.edit ? ({
        id: data.id,
        city: data.name,
        timezone: data.name,
        is_active: data.car_type
      }) : null}/>}
      {/* {!location.pathname.includes('edit') ? textDataCars.createPageForm() : textDataCars.editPageForm(props)} */}

    </Section>
  )
}

export default ReferenceCityPageCreate
