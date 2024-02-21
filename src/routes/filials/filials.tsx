import React from 'react'
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelColor, PanelRouteStyle, PanelVariant } from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import { ButtonDirectory, ButtonSizeType } from 'components/common/ui/Button/Button'
import { useStore } from 'stores/store'
import LinkStyled from 'components/common/ui/LinkStyled/LinkStyled'
import { Outlet, useLoaderData, useLocation, useNavigate } from "react-router-dom";
import TableWithSortNew from "components/common/layout/TableWithSort/TableWithSortNew";
import companyStore from "stores/companyStore";
import { observer } from "mobx-react-lite";

const FilialsPage = () => {
  const store = useStore()
  const location = useLocation()
  const {data}:any = useLoaderData()
  const all = store.companyStore.getFillialsData

  const navigate = useNavigate()
  if ('/account/filials' !== location.pathname) return <Outlet />
  if (location.pathname.includes('edit')) return <Outlet />
  return (
    <Section type={SectionType.default}>
      <Panel
        headerClassName={'flex justify-between'}
        variant={PanelVariant.withGapOnly}

        header={
          <>
            <Heading
              text={'Филиалы'}
              variant={HeadingVariant.h1}
              className={'inline-block'}
              color={HeadingColor.accent}
            />
            <LinkStyled
              text={'Создать филиал'}
              to={'create'}
              // action={() => store.companyStore.addCompany()}
              className={'inline-flex'}
              directory={ButtonDirectory.directory}
              size={ButtonSizeType.sm}
            />
          </>
        }
      />
   <TableWithSortNew
        total={data.count}
        filter={true}
        search={true}
        withOutLoader={true}
        background={PanelColor.glass}
        style={PanelRouteStyle.company}
        ar={[{ label: 'Статус', name: 'is_active' }, {label: 'Компания', name: 'name'},  { label: 'Город', name: 'city' }, {label: 'Тип', name: 'company_type'},{ label: 'Принадлежит', name: 'parent'}]}

        data={data.results.map((item: any) => ({
          status: item.is_active as boolean,
          company: item.name,
          city: item.city.name,
          type: item.company_type,
          parent: item.parent.name,
          id: item.id,
          query: {
            company_id: item.parent.id
          }
        }))}
        initFilterParams={[{label: 'Статус', value: 'status'}, {label: 'Город', value:  'city'}]}
        state={false}
      />

    </Section>
  )
}

export default observer(FilialsPage)
