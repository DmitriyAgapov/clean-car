import React, { useEffect } from "react";
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelColor, PanelRouteStyle, PanelVariant } from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import { useStore } from 'stores/store'
import { Outlet, useLoaderData, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { PermissionNames } from 'stores/permissionStore'
import Button, { ButtonDirectory, ButtonSizeType, ButtonVariant } from 'components/common/ui/Button/Button'
import { SvgBackArrow } from 'components/common/ui/Icon'
import TableWithSortNew from 'components/common/layout/TableWithSort/TableWithSortNew'
import agent, { client } from "utils/agent";
import useSWR from "swr";
import { LocalRootStore } from "stores/localStore";
import { observer, useLocalStore } from "mobx-react-lite";
export const textDataCities= {
  path: 'cities',
  title: 'Города',
  create: 'Добавить',
  labelsForItem: ['Город', 'Часовой пояс', 'Статус'],
  referenceTitle: 'Город',
  createPage: 'Добавить город',
  editPage: 'Редактировать город',
  tableHeaders: [
    { label: 'Статус', name: 'is_active' },
    { label: 'Город', name: 'name' },
    { label: 'Часовой пояс', name: 'timezone' },
  ],
  createPageDesc: 'Добавьте новый город',
  editPageDesc: 'Вы можете изменить город или удалить его из системы',
  // createPageForm: FormCreateCity.bind(props),
  createPageBack: 'Назад к списку городов',
  createAction: agent.Catalog.createCity,
  editAction: agent.Catalog.editCity,
  // editPageForm: FormCreateCity.bind(props, { ...data, edit:true }),
}
const localRootStore =  new LocalRootStore()
const RefCitiesPage = () => {
  const location = useLocation()

  const localStore = useLocalStore<LocalRootStore>(() => localRootStore)

    const store = useStore()
    const navigate = useNavigate()
    const {isLoading, data, error} = useSWR(['refCities', localStore.params.getSearchParams] , ([url, args]) => agent.Catalog.getCities(args).then((res) => res.data))
    useEffect(() => {
      localStore.setData = {
        ...data,
        results: data?.results?.map((item:any) => ({id: item.id, status: item.is_active, name: item.name, timezone: item.timezone ?? ''}))}
      localStore.setIsLoading = isLoading
    },[data])
  if (location.pathname !== `/account/references/cities`) return <Outlet />
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
                                text={textDataCities.title}
                                variant={HeadingVariant.h1}
                                className={'inline-block !mb-0'}
                                color={HeadingColor.accent}
                            />
                        </div>
                        <div className={'flex gap-6'}>


                            {store.userStore.getUserCan(PermissionNames['Управление справочниками'], 'create') && (
                                <Button
                                    text={textDataCities.create}
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
                store={localRootStore}
                variant={PanelVariant.dataPadding}
                search={true}
                style={PanelRouteStyle.refcars}
                background={PanelColor.glass}
                className={'col-span-full table-groups  h-full'}
                filter={false}
                state={isLoading}
                ar={textDataCities.tableHeaders}
              />
            </Panel>
        </Section>
    )
}
export default observer(RefCitiesPage)
