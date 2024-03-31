import React from 'react'
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelColor, PanelRouteStyle, PanelVariant } from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import { useStore } from 'stores/store'
import { Outlet, useLoaderData, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { PermissionNames } from 'stores/permissionStore'
import Button, { ButtonDirectory, ButtonSizeType, ButtonVariant } from 'components/common/ui/Button/Button'
import { SvgBackArrow } from 'components/common/ui/Icon'
import TableWithSortNew from 'components/common/layout/TableWithSort/TableWithSortNew'
import CarHelper from 'components/common/layout/CarHelper/CarHelper'
import { useDisclosure } from '@mantine/hooks'
import { PriceCopy } from 'components/common/layout/Modal/PriceCopy'
import { CarClasses } from 'components/common/layout/Modal/CarClasses'
import agent from "utils/agent";
import FormCreateUpdateCarBrand from "components/Form/FormCreateCarBrand/FormCreateUpdateCarBrand";
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
const RefCarsPage = () => {
  const location = useLocation()
  if (location.pathname !== `/account/references/car_brands`) return <Outlet />
    const store = useStore()
    const navigate = useNavigate()

    const [opened, { open, close }] = useDisclosure(false)

    let [searchParams, setSearchParams] = useSearchParams('page=1&page_size=10')
    const {isLoading, data, error} = agent.Catalog.getCarModelsNew(searchParams.toString())
    console.log(data);
    const memoModal = React.useMemo(() => {
        return <CarClasses opened={opened} onClose={close} />
    }, [opened])


    return (
        <Section type={SectionType.default}>
            <Panel
                variant={PanelVariant.withGapOnly}
                state={false}
                headerClassName={'flex justify-between'}
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
                        <div className={'flex gap-6'}>

                                <>
                                    <Button
                                        text={'Классификация автомобилей'}
                                        action={open}
                                        trimText={true}
                                        /* action={() => store.companyStore.addCompany()} */
                                        className={'inline-flex'}
                                        variant={ButtonVariant['accent-outline']}
                                        size={ButtonSizeType.sm}
                                    />{' '}
                                    {memoModal}
                                </>

                            {store.userStore.getUserCan(PermissionNames['Управление справочниками'], 'create') && (
                                <Button
                                    text={textDataCars.create}
                                    action={() => navigate('create')}
                                    trimText={true}
                                    className={'inline-flex'}
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
                    total={data?.count}
                    variant={PanelVariant.dataPadding}
                    search={true}
                    style={PanelRouteStyle.refcars}
                    background={PanelColor.glass}
                    className={'col-span-full table-groups  h-full'}
                    filter={false}
                    data={data?.results.map((c:any) => ({
                      id: c.id,
                      brand: c.brand.name,
                      car_type: c.car_type,
                      modelName: c.name
                    }))}
                    state={isLoading}
                    ar={textDataCars.tableHeaders}
                />
            </Panel>
        </Section>
    )
}
export default RefCarsPage
