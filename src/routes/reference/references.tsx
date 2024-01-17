import React, { ReactElement, useEffect, useMemo, useState } from "react";
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelColor, PanelVariant } from "components/common/layout/Panel/Panel";
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import { useStore } from 'stores/store'
import { Await, Outlet, useAsyncValue, useLoaderData, useLocation, useNavigate } from "react-router-dom";
import TableWithSort from 'components/common/layout/TableWithSort/TableWithSort'
import { FormCard } from 'components/Form/FormCards/FormCards'
import agent from 'utils/agent'
import moment from "moment/moment";
import { Loader } from "@mantine/core";
import { PermissionNames } from "stores/permissionStore";
import Button, { ButtonDirectory, ButtonSizeType, ButtonVariant } from "components/common/ui/Button/Button";
import { SvgBackArrow } from "components/common/ui/Icon";

import CarData from 'components/common/layout/CarData/CarData'



const ReferencesPage = () => {
    const store = useStore()
    const navigate = useNavigate()
    const location = useLocation()
    const { data, page, textData }: any = useLoaderData()

    console.log('here');
    // @ts-ignore
  return (
        <Section type={SectionType.default}>
            <Panel
                variant={PanelVariant.withGapOnly}
                headerClassName={'flex justify-between'}
                state={store.permissionStore.loadingPermissions}
                header={
                  <>
                  <div>
                    <Button text={<><SvgBackArrow />Назад к справочнику{" "}</>}
                      className={"flex items-center gap-2 font-medium text-[#606163] hover:text-gray-300 leading-none !mb-4"}
                      action={() => navigate(-1)}
                      variant={ButtonVariant.text} />
                    <Heading text={textData.title}
                      variant={HeadingVariant.h1}
                      className={"inline-block !mb-0"}
                      color={HeadingColor.accent} />
                    </div>
                    {store.userStore.getUserCan(PermissionNames["Управление справочниками"], "create") && <Button text={textData.create}
                      action={() => navigate("create")}
                      trimText={true}
                      // action={() => store.companyStore.addCompany()}
                      className={"inline-flex"}
                      directory={ButtonDirectory.directory}
                      size={ButtonSizeType.sm} />}
                  </>
                  }
                  >

                  </Panel>


                  <
            //@ts-ignore
            CarData/>
        </Section>
    )
}
export default ReferencesPage
