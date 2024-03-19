import React from 'react'
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelColor, PanelRouteStyle, PanelVariant } from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import { useStore } from 'stores/store'
import { Outlet, useLoaderData, useLocation, useNavigate } from 'react-router-dom'
import { PermissionNames } from 'stores/permissionStore'
import Button, { ButtonDirectory, ButtonSizeType, ButtonVariant } from 'components/common/ui/Button/Button'
import { SvgBackArrow } from 'components/common/ui/Icon'
import TableWithSortNew from 'components/common/layout/TableWithSort/TableWithSortNew'
import CarHelper from 'components/common/layout/CarHelper/CarHelper'
import { useDisclosure } from "@mantine/hooks";
import { PriceCopy } from "components/common/layout/Modal/PriceCopy";
import { CarClasses } from "components/common/layout/Modal/CarClasses";


const ReferencesPage = () => {
    const store = useStore()
    const navigate = useNavigate()
    const location = useLocation()
  const [opened, { open, close }] = useDisclosure(false);
    const { data, page, textData }: any = useLoaderData()
  const memoModal = React.useMemo(() => {

    return  <CarClasses opened={opened} onClose={close} />
  }, [opened]);
    if (location.pathname !== `/account/references/${textData.path}`) return <Outlet />
    return (
        <Section type={SectionType.default}>

            <Panel variant={PanelVariant.withGapOnly} state={false} headerClassName={'flex justify-between'}
              header={<><div><Button text={<><SvgBackArrow />Назад к справочнику{' '}</>} className={'flex items-center gap-2 font-medium text-[#606163] hover:text-gray-300 leading-none !mb-4'} action={() => navigate(location.pathname.split('/').slice(0, -1).join('/'))} variant={ButtonVariant.text} />
                  <Heading text={textData.title} variant={HeadingVariant.h1} className={'inline-block !mb-0'} color={HeadingColor.accent} /></div>
                  <div className={'flex gap-6'}>
                    {page === 'car_brands' && <><Button
                      text={'Классификация автомобилей'}
                      action={open}
                      trimText={true}
                      /* action={() => store.companyStore.addCompany()} */ className={'inline-flex'}
                      variant={ButtonVariant["accent-outline"]}
                      size={ButtonSizeType.sm}
                    /> {memoModal}</>}
                    {store.userStore.getUserCan(PermissionNames['Управление справочниками'], 'create') && (<Button text={textData.create} action={() => navigate('create')} trimText={true} className={'inline-flex'} directory={ButtonDirectory.directory} size={ButtonSizeType.sm} />)}
                  </div>
              </>}/>

          <Panel variant={PanelVariant.withGapOnly} className={'!mt-0 h-full'}>
                <TableWithSortNew total={data.count}
                  variant={PanelVariant.dataPadding}
                  search={true}
                  style={page === 'car_brands' ? PanelRouteStyle.refcars : PanelRouteStyle.default}
                  background={PanelColor.glass}
                  className={'col-span-full table-groups  h-full'}
                  filter={false}
                  data={data.results}
                  initFilterParams={[{ label: 'Статус', value: 'status' }, { label: 'Город', value: 'city' }]}
                  state={false}
                  ar={textData.tableHeaders} />
            </Panel>
        </Section>
    )
}
export default ReferencesPage
