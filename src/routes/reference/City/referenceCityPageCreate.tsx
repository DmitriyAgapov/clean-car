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
import useSWR from "swr";
function ReferenceCityPageCreate(props: any) {

  const store = useStore()
  const location = useLocation()
  const navigate = useNavigate()
  const params = useParams()
  const {isLoading, data, mutate, isValidating} = useSWR(`ref_city_${params.id}`,() => agent.Catalog.getCity(Number(params.id)).then((res) => res.data))

  if(!store.userStore.getUserCan(PermissionNames["Управление справочниками"], 'create')) return <Navigate to={'/account'}/>
  return (
    <Section type={SectionType.default}>
      <Panel variant={PanelVariant.withGapOnly}
        headerClassName={'flex justify-between'}
        header={<><div>
          <Button text={<>
          <SvgBackArrow />{textDataCities.createPageBack}</>} className={'flex items-center gap-2 font-medium text-[#606163] hover:text-gray-300 leading-none !mb-4'} action={() => navigate(location.pathname.split('/').slice(0, -1).join('/'))} variant={ButtonVariant.text} />
          <Heading text={!location.pathname.includes('edit') ? textDataCities.createPage : textDataCities.editPage} variant={HeadingVariant.h1} className={'inline-block !mb-0'} color={HeadingColor.accent} /></div></>}>
      </Panel>
      {!isLoading && <FormCreateCity edit={location.pathname.includes('edit')} {...location.pathname.includes('edit') ? ({
        id: data.id,
        city: data.name,
        timezone: data.timezone,
        is_active: data.is_active ? 'true' : 'false',
      }) : null}/>}
      {/* {!location.pathname.includes('edit') ? textDataCars.createPageForm() : textDataCars.editPageForm(props)} */}

    </Section>
  )
}

export default ReferenceCityPageCreate
