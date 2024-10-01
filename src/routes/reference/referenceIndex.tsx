import React from 'react'
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelColor, PanelVariant } from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import { useStore } from 'stores/store'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import TableWithSort from 'components/common/layout/TableWithSort/TableWithSort'
import moment from 'moment'
import { FormCard } from 'components/Form/FormCards/FormCards'

const ReferencesPage = () => {
    const store = useStore()
    const navigate = useNavigate()
    const location = useLocation()
    const {loading, groups, errors} = store.permissionStore.allPermissionsState
  if ('/account/references' !== location.pathname) return <Outlet />
  return (
        <Section type={SectionType.default}>
            <Panel
                variant={PanelVariant.withGapOnly}
                headerClassName={'flex justify-between'}
                state={store.permissionStore.loadingPermissions}
                header={

                        <Heading
                            text={'Справочник CleanCar'}
                            variant={HeadingVariant.h1}
                          className={'inline-block  !mb-0'}
                            color={HeadingColor.accent}
                        />


                }
            >
                <p className={''}>
                  Вы можете дополнять и расширять справочник под свои запросы. К созданию доступны: марки автомобилей, города. Раздел услуги — есть возможность интегрировать свои подтипы услуг.
                </p>
            </Panel>
          <Panel  bodyClassName={' subgrid  col-span-full  desktop-max:gap-y-6 content-start'} className={'grid xl:grid-cols-12 md:grid-cols-8   grid-cols-4 gap-8 justify-items-stretch col-span-full !backdrop:filter-none !bg-transparent content-stretch items-stretch desktop:mt-12'} variant={PanelVariant.withGapOnly}>
            <FormCard  title={'Автомобили'} titleVariant={HeadingVariant.h3} titleColor={HeadingColor.accent} className={'col-span-4 h-full w-full !py-8 !px-4'} navigate={() => navigate(location.pathname + '/car_brands')}/>
            <FormCard title={'Города'} titleVariant={HeadingVariant.h3} titleColor={HeadingColor.accent} className={'col-span-4 h-full w-full !py-8 !px-4'}  actions={null} navigate={() => navigate(location.pathname + '/cities')}/>
            <FormCard title={'Услуги'} titleVariant={HeadingVariant.h3} titleColor={HeadingColor.accent} className={'col-span-4 w-full h-full !py-8 !px-4'}  actions={null} navigate={() => navigate(location.pathname + '/services')}/>
          </Panel>

          {/* {groups.length > 0 && <TableWithSort */}
          {/*     background={PanelColor.glass} */}
          {/*       filter={false} */}
          {/*       search={true} */}
          {/*       className={'table-groups'} */}
          {/*       ar={['дата и время', 'Название группы']} */}
          {/*       data={groups.map((item: any) => ({ */}
          {/*           date: moment(item.created).format('DD.MM.YYYY HH:mm'), */}
          {/*           name: item.name, */}
          {/*           id: item.id, */}
          {/*           query:{ */}
          {/*             group: store.appStore.appType */}
          {/*           } */}
          {/*       }))} */}
          {/*       state={groups.length === 0} */}
          {/*   />} */}
        </Section>
    )
}
export default ReferencesPage
