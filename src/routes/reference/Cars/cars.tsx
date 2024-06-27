import React, { useEffect } from "react";
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelColor, PanelRouteStyle, PanelVariant } from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import { useStore } from 'stores/store'
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { PermissionNames } from 'stores/permissionStore'
import Button, { ButtonDirectory, ButtonSizeType, ButtonVariant } from 'components/common/ui/Button/Button'
import { SvgBackArrow } from 'components/common/ui/Icon'
import TableWithSortNew, { PaginationComponent } from "components/common/layout/TableWithSort/TableWithSortNew";
import { useDidUpdate, useDisclosure } from "@mantine/hooks";
import { CarClasses } from 'components/common/layout/Modal/CarClasses'
import agent, { client } from "utils/agent";
import { LocalRootStore, LocalStoreProvider } from 'stores/localStore'
import { observer, useLocalObservable } from "mobx-react-lite";
import useSWR from "swr";
import { FilterData } from "components/common/layout/TableWithSort/DataFilter";
export const textDataCars = {
  path: 'car_brands',
  labelsForItem: ['Марка', 'Класс', 'Модель'],
  title: 'Автомобили',
  create: 'Добавить',
  referenceTitle: 'Марка автомобиля',
  createPage: 'Добавить автомобиль',
  editPage: 'Редактировать марку автомобиля',
  tableHeaders: [{label: 'Марка', name: 'brand'},{label: 'Модель', name: 'name'}, {label: 'Тип', name: 'car_type'}],
  createPageDesc: 'Укажите основную информацию о модели автомобиля, для добавления в справочник',
  editPageDesc: 'Укажите основную информацию о модели автомобиля, для добавления в справочник',
  // createPageForm: FormCreateUpdateCarBrand.bind(props),
  createPageBack: 'Назад к списку марок автомобилей',
  createAction:  agent.Catalog.createCarBrandWithExistBrand,
  editAction:  agent.Catalog.editCity,
  // editPageForm: FormCreateUpdateCarBrand.bind(props, { ...data, edit:true }),
}


const localRootStore =  new LocalRootStore()

const RefCarsPage = () => {
  const location = useLocation()

  const localStore = useLocalObservable<LocalRootStore>(() => localRootStore)

  const store = useStore()
  const navigate = useNavigate()
  const isReadyy = localStore.params.getIsReady
  const {isLoading, data, mutate} = useSWR(isReadyy ? ['refCars', {ordering: "brand", ...localStore.params.getSearchParams}] : null, ([url, args]) => store.catalogStore.getAllRefCarModels(args))
  useDidUpdate(
    () => {
      if(location.pathname === `/account/references/car_brands`) {
        console.log('mutate');
        mutate()
      }
    },
    [location.pathname]
  );
  useEffect(() => {
    localStore.setData = {
      ...data,
      results: data?.results?.map((item:any) => ({
        id: item.id,
        brand: item.brand.name,
        modelName: item.name,
        car_type:item.car_type,
      }))}
    localStore.setIsLoading = isLoading
  }, [data])

  const [opened, { open, close }] = useDisclosure(false)
  const memoModal = React.useMemo(() => {
      return <CarClasses opened={opened} onClose={close} />
  }, [opened])


  if (location.pathname !== `/account/references/car_brands`) return <Outlet />
  return (
      <Section type={SectionType.default}>
          <Panel
              variant={PanelVariant.withGapOnly}
              state={false}
              headerClassName={'justify-between gap-4'}
              header={
                  <>
                      <div>
                          <Button
                              text={
                                  <>
                                      <SvgBackArrow />
                                      Назад к справочнику{' '}
                                  </>
                              }
                              className={
                                  'flex items-center gap-2 font-medium text-[#606163] hover:text-gray-300 leading-none !mb-4'
                              }
                              action={() => navigate(location.pathname.split('/').slice(0, -1).join('/'))}
                              variant={ButtonVariant.text}
                          />
                          <Heading
                              text={textDataCars.title}
                              variant={HeadingVariant.h1}
                              className={'inline-block !mb-0'}
                              color={HeadingColor.accent}
                          />
                      </div>
                      <div className={'flex gap-6 tablet-max:max-w-96 mobile:mt-6'}>
                          <Button
                              text={'Классификация автомобилей'}
                              action={open}
                              trimText={true}
                              /* action={() => store.companyStore.addCompany()} */
                            className={"inline-flex tablet-max:flex-1"}
                              variant={ButtonVariant['accent-outline']}
                              size={ButtonSizeType.sm}
                          />{' '}
                          {memoModal}
                          {store.userStore.getUserCan(PermissionNames['Управление справочниками'], 'create') && (
                              <Button
                                  text={textDataCars.create}
                                  action={() => navigate('create')}
                                  trimText={true}
                                className={"inline-flex tablet-max:flex-1"}
                                  directory={ButtonDirectory.directory}
                                  size={ButtonSizeType.sm}
                              />
                          )}
                      </div>
                  </>
              }
          />
          <Panel variant={PanelVariant.withGapOnly} className={'!mt-0 h-full'}>
              <TableWithSortNew
                  store={localRootStore}
                  variant={PanelVariant.dataPadding}
                  search={true}
                  style={PanelRouteStyle.refcars}
                  background={PanelColor.glass}
                  className={'col-span-full table-groups  h-full'}
                  filter={true}
                  initFilterParams={[FilterData.brand, FilterData.car_type]}
                  state={isLoading}
                  ar={textDataCars.tableHeaders}
              />
          </Panel>
      </Section>
  )
}
export default observer(RefCarsPage)
