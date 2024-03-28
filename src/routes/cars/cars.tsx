import React from 'react'
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelColor, PanelVariant } from "components/common/layout/Panel/Panel";
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import Button, { ButtonDirectory, ButtonSizeType } from 'components/common/ui/Button/Button'
import TableWithSort from 'components/common/layout/TableWithSort/TableWithSort'
import { Outlet, useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { useStore } from 'stores/store'
import { observer } from 'mobx-react-lite'
import { Company, CompanyType } from "stores/companyStore";
import { User } from 'stores/usersStore'
import { UserTypeEnum } from "stores/userStore";
import { PermissionNames } from "stores/permissionStore";
import TableWithSortNew from "components/common/layout/TableWithSort/TableWithSortNew";

const CarsPage = () => {
  const store = useStore()
  const location = useLocation()
  const navigate = useNavigate()
  const { data, page, pageRequest, textData }: any = useLoaderData()
  console.log(data);
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
        total={data.count}
        variant={PanelVariant.dataPadding}
        search={true}
        background={PanelColor.glass}
        className={'col-span-full table-groups'}
        filter={false}
        data={data.results}

        state={false}
        ar={textData.tableHeaders} />

    </Section>
  )
}

export default observer(CarsPage)
