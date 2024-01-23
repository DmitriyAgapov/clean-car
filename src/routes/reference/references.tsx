import React from 'react'
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelColor, PanelVariant } from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import { useStore } from 'stores/store'
import { Outlet, useLoaderData, useLocation, useNavigate } from "react-router-dom";
import TableWithSort from 'components/common/layout/TableWithSort/TableWithSort'
import { PermissionNames } from 'stores/permissionStore'
import Button, { ButtonDirectory, ButtonSizeType, ButtonVariant } from 'components/common/ui/Button/Button'
import { SvgBackArrow } from 'components/common/ui/Icon'

import CarData from 'components/common/layout/CarData/CarData'
import TableWithSortNew from "components/common/layout/TableWithSort/TableWithSortNew";

const ReferencesPage = () => {
    const store = useStore()
    const navigate = useNavigate()
    const location = useLocation()
    const { data, page, pageRequest, textData }: any = useLoaderData()
    if (location.pathname.includes('create') || location.pathname.includes('edit')) return <Outlet />
    if (location.pathname !== `/account/references/${textData.path}/`) return <Outlet />
    return (
        <Section type={SectionType.default}>
            <Panel variant={PanelVariant.withGapOnly} headerClassName={'flex justify-between'} state={store.permissionStore.loadingPermissions} header={<><div><Button text={<><SvgBackArrow />Назад к справочнику{' '}</>} className={'flex items-center gap-2 font-medium text-[#606163] hover:text-gray-300 leading-none !mb-4'} action={() => navigate(-1)} variant={ButtonVariant.text} /><Heading text={textData.title} variant={HeadingVariant.h1} className={'inline-block !mb-0'} color={HeadingColor.accent} /></div>{store.userStore.getUserCan(PermissionNames['Управление справочниками'], 'create') && (<Button text={textData.create} action={() => navigate('create')} trimText={true}/* action={() => store.companyStore.addCompany()} */ className={'inline-flex'} directory={ButtonDirectory.directory} size={ButtonSizeType.sm} />)}</>}></Panel>
            <Panel variant={PanelVariant.withGapOnly} className={'!mt-0'}>
                <TableWithSortNew total={data.count}
                  variant={PanelVariant.dataPadding}
                  search={true}
                  background={PanelColor.glass}
                  className={'col-span-full table-groups'}
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
