import React from 'react'
import Section, { SectionType } from "components/common/layout/Section/Section";
import Panel, { PanelColor, PanelVariant } from "components/common/layout/Panel/Panel";
import Heading, { HeadingColor, HeadingVariant } from "components/common/ui/Heading/Heading";
import SearchBar from "components/common/layout/SearchBar/SearchBar";
import { useForm } from '@mantine/form';
import FormCreateUpdateUsers from "components/Form/FormCreateUpdateUsers/FormCreateUpdateUsers";
import FormCreateUpdateCompany from "components/Form/FormCreateCompany/FormCreateUpdateCompany";
import FormCreateUpdateFilial from "components/Form/FormCreateFilials/FormCreateUpdateFilial";
import FormCreateUpdateCar from "components/Form/FormCreateCar/FormCreateUpdateCar";
import FormCreateUpdateBid from 'components/Form/FormCreateBid/FormCreateUpdateBid'
import DList from "components/common/ui/DList/DList";
import PanelForForms from "components/common/layout/Panel/PanelForForms";
import { useStore } from 'stores/store'
import { observer } from "mobx-react-lite";

const testWashData = {
  "id": 29,
  "performer": 2,
  "executor": null,
  "company": 3,
  "conductor": 3,
  "car": 1,
  "service_type": 2,
  "service_subtype": 6,
  "service_option": [
    27
  ],
  "phone": "+79273041000",
  "truck_type": "эвакуатор",
  "customer_comment": "",
  "schedule": null,
  "address_from": null,
  "address_to": null
}

export default function DashboardPage() {
  return (
    <>
    <Section type={SectionType.default}>
      <Panel
        className={'col-span-full'}
        search={true}
        header={
          <>
            <Heading text={'Дашборд'} variant={HeadingVariant.h1} className={'!mb-6'} color={HeadingColor.accent} />
            <SearchBar />
          </>
        }
      />
      <FormCreateUpdateBid/>
    </Section>
    </>
  )
}
