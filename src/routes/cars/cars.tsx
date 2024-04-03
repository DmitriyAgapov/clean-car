import React, { useEffect } from "react";
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelColor, PanelRouteStyle, PanelVariant } from "components/common/layout/Panel/Panel";
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import Button, { ButtonDirectory, ButtonSizeType } from 'components/common/ui/Button/Button'
import TableWithSort from 'components/common/layout/TableWithSort/TableWithSort'
import { Outlet, useLoaderData, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useStore } from 'stores/store'
import { observer, useLocalStore } from "mobx-react-lite";
import { Company, CompanyType } from "stores/companyStore";
import { User } from 'stores/usersStore'
import { UserTypeEnum } from "stores/userStore";
import { PermissionNames } from "stores/permissionStore";
import TableWithSortNew from "components/common/layout/TableWithSort/TableWithSortNew";
import agent, { client } from "utils/agent";
import FormCreateCarBrand from "components/Form/FormCreateCarBrand/FormCreateCarBrand";
import { LocalRootStore } from "stores/localStore";
import useSWR from "swr";
const localRootStore =  new LocalRootStore()
const CarsPage = () => {
  const store = useStore()
  const localStore = useLocalStore<LocalRootStore>(() => localRootStore)
  const location = useLocation()
  const navigate = useNavigate()
  const {isLoading, data, error} =useSWR(['cars', localStore.params.getSearchParams] , ([url, args]) => store.carStore.getAllCars(args))
  console.log(isLoading, data);
  useEffect(() => {
    localStore.setData = {
      ...data,
      results: data?.results?.map((item:any) => ({
        id: item.id,
        is_active: item.is_active,
        brand: item.brand.name,
        model: item.model.name,
        car_type: item.model.car_type,
        number: item.number,
        company: item.company.name,
        city: item.company.city.name,
        query: {
          company_id: item.company.id
        }
      }))}
    localStore.setIsLoading = isLoading
  },[data])

  if ('/account/cars' !== location.pathname) return <Outlet />
  return (
    <Section type={SectionType.default}>
      <Panel
        variant={PanelVariant.withGapOnly}
        className={'col-span-full'}
        headerClassName={'flex justify-between'}
        header={
          <>
            <Heading
              text={'Автомобили'}
              variant={HeadingVariant.h1}
              className={'inline-block mr-auto flex-1'}
              color={HeadingColor.accent}
            />

            {store.userStore.getUserCan(PermissionNames["Управление автомобилями"], 'create') && <Button
              trimText={true}
              text={'Добавить'}
              action={() => navigate('/account/cars/create')}
              className={'inline-flex'}
              directory={ButtonDirectory.directory}
              size={ButtonSizeType.sm}
            />}
          </>
        }
      >

      </Panel>
      <TableWithSortNew
        store={localRootStore}
        variant={PanelVariant.dataPadding}
        search={true}
        style={PanelRouteStyle.cars}
        background={PanelColor.glass}
        className={'col-span-full table-groups'}
        filter={false}
        state={isLoading}
        ar={[{label: "Статус", name: 'is_active'}, {label: 'Марка', name: 'brand'},{label: 'Модель', name: 'model'}, {label: 'Тип', name: 'model__car_type'}, {label: 'Гос.номер', name: 'number'}, {label: 'Принадлежит', name: 'company'}, {label: 'Город', name: 'company__city__name'}]}
      />

    </Section>
  )
}

export default observer(CarsPage)
