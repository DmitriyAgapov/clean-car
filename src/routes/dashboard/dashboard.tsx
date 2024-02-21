import React from 'react'
import Section, { SectionType } from "components/common/layout/Section/Section";
import Panel from "components/common/layout/Panel/Panel";
import Heading, { HeadingColor, HeadingVariant } from "components/common/ui/Heading/Heading";
import SearchBar from "components/common/layout/SearchBar/SearchBar";
import { useForm } from '@mantine/form';
import FormCreateUpdateUsers from "components/Form/FormCreateUpdateUsers/FormCreateUpdateUsers";
import FormCreateUpdateCompany from "components/Form/FormCreateCompany/FormCreateUpdateCompany";
import FormCreateUpdateFilial from "components/Form/FormCreateFilials/FormCreateUpdateFilial";

export default function DashboardPage() {
  const form = useForm({
    initialValues: {
      email: '',
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });
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
      <FormCreateUpdateFilial/>
    </Section>
    </>
  )
}
