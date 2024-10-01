import React, { useEffect } from "react";
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelColor, PanelRouteStyle, PanelVariant } from "components/common/layout/Panel/Panel";
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import Button, { ButtonDirectory, ButtonSizeType, ButtonVariant } from "components/common/ui/Button/Button";
import { Outlet,useLocation, useNavigate } from "react-router-dom";
import { useStore } from 'stores/store'
import { observer, useLocalObservable } from "mobx-react-lite";
import { PermissionNames } from "stores/permissionStore";
import TableWithSortNew from "components/common/layout/TableWithSort/TableWithSortNew";
import { LocalRootStore } from "stores/localStore";
import useSWR from "swr";
import { useDidUpdate, useDisclosure } from "@mantine/hooks";
import { FilterData } from "components/common/layout/TableWithSort/DataFilter";
import { CarClasses } from "components/common/layout/Modal/CarClasses";

const localRootStore =  new LocalRootStore()

const CarsPage = () => {

  const store = useStore()
  const localStore = useLocalObservable<LocalRootStore>(() => localRootStore)
  const location = useLocation()
  const navigate = useNavigate()

  const [opened, { open, close }] = useDisclosure(false)

  const memoModal = React.useMemo(() => {
    return <CarClasses opened={opened} onClose={close} />
  }, [opened])
  const {isLoading, data, mutate} =useSWR(localStore.params.isReady && ['cars', {...localStore.params.getSearchParams}] , ([url, args]) => store.carStore.getAllCars(args))


  useEffect(() => {
    localStore.setData = {
      ...data,
      results: data?.results?.map((item:any) => ({
        id: item.id,
        is_active: item.is_active,
        brand: item.brand.name,
        model: item.model.name,
        model__car_type: item.model.car_type,
        number: item.number,
        company: item.company.name,
        city: item.company.city.name,
        query: {
          company_id: item.company.id
        }
      }))}
    localStore.setIsLoading = isLoading
  },[data])

  useDidUpdate(
    () => {
      if(location.pathname === '/account/cars') {
        mutate()
      }
    },
    [location.pathname]
  );
  if ('/account/cars' !== location.pathname) return <Outlet />
  return (
    <Section type={SectionType.default}>
      <Panel
        variant={PanelVariant.withGapOnly}
        className={'col-span-full'}
        headerClassName={'md:flex justify-between'}
        header={
          <>

            <Heading text={"Автомобили"}
              variant={HeadingVariant.h1}
              className={"inline-block mr-auto tablet-max:flex-1 !mb-0  "}
              color={HeadingColor.accent} />

            <div className={"flex gap-6 tablet-max:max-w-96 mobile:mt-6"}>
              <Button text={"Классификация автомобилей"}
                action={open}
                trimText={true}
                /* action={() => store.companyStore.addCompany()} */
                className={"inline-flex tablet-max:flex-1"}
                variant={ButtonVariant["accent-outline"]}
                size={ButtonSizeType.sm} />{" "}
              {memoModal}
              {store.userStore.getUserCan(PermissionNames["Управление автомобилями"], "create") && <Button trimText={true}
                text={"Добавить"}
                action={() => navigate("/account/cars/create")}
                className={"inline-flex tablet-max:flex-1"}
                directory={ButtonDirectory.directory}
                size={ButtonSizeType.sm} />}
            </div>
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
          filter={true}
          initFilterParams={[FilterData.is_active, FilterData.city, FilterData.brand]}
          state={isLoading}
          ar={[{label: "Статус", name: 'is_active'}, {label: 'Марка', name: 'brand'},{label: 'Модель', name: 'model'}, {label: 'Тип', name: 'model__car_type'}, {label: 'Гос.номер', name: 'number'}, {label: 'Принадлежит', name: 'company'}, {label: 'Город', name: 'company__city__name'}]}
      />

    </Section>
  )
}

export default observer(CarsPage)
