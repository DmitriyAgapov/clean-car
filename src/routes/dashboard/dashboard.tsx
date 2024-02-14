import React, {  useRef, useState } from 'react'
import Section, { SectionType } from "components/common/layout/Section/Section";
import Panel, { PanelColor, PanelVariant } from "components/common/layout/Panel/Panel";
import Heading, { HeadingColor, HeadingVariant } from "components/common/ui/Heading/Heading";
import SearchBar from "components/common/layout/SearchBar/SearchBar";
import Button, { ButtonDirectory, ButtonSizeType, ButtonVariant } from "components/common/ui/Button/Button";
import CreateInput from "components/common/ui/CreateInput/CreateInput";
import agent from "utils/agent";
// import { Combobox,Loader, TextInput, useCombobox } from '@mantine/core'
import InputAutocomplete from "components/common/ui/InputAutocomplete/InputAutocomplete";
import { TextInput, Checkbox, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import TestForm, { createUserFormActions, useFormContext } from "components/Form/TestForm/TestForm";



const sidebarMenu: { icon: React.ReactNode; title: string; url: string }[] = [
  {
    icon: <img src={'/icons/home.png'} alt={''} />,
    title: 'Дашборд',
    url: 'dashboard',
  },
  {
    icon: <img src={'/icons/company.png'} alt={''} />,
    title: 'Компании',
    url: 'companies',
  },
  {
    icon: <img src={'/icons/filials.png'} alt={''} />,
    title: 'Филиалы',
    url: 'filials',
  },
  {
    icon: <img src={'/icons/users.png'} alt={''} />,
    title: 'Пользователи',
    url: 'users',
  },
  {
    icon: <img src={'/icons/groups.png'} alt={''} />,
    title: 'Группы',
    url: 'groups',
  },
  {
    icon: <img src={'/icons/auto.png'} alt={''} />,
    title: 'Автомобили',
    url: 'auto',
  },
  {
    icon: <img src={'/icons/zayavki.png'} alt={''} />,
    title: 'Заявки',
    url: 'orders',
  },
  {
    icon: <img src={'/icons/price-list.png'} alt={''} />,
    title: 'Прайс-лист',
    url: 'price',
  },
  {
    icon: <img src={'/icons/limits.png'} alt={''} />,
    title: 'Лимиты',
    url: 'limits',
  },
  {
    icon: <img src={'/icons/budget.png'} alt={''} />,
    title: 'Бюджет',
    url: 'budget',
  },
  {
    icon: <img src={'/icons/zp.png'} alt={''} />,
    title: 'Зарплата',
    url: 'salary',
  },
  {
    icon: <img src={'/icons/spravochnik.png'} alt={''} />,
    title: 'Справочник',
    url: 'reference',
  },
]
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
      <TestForm />
    </Section>
    </>
  )
}
