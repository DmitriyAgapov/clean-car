import React, {  useRef, useState } from 'react'
import Section, { SectionType } from "components/common/layout/Section/Section";
import Panel, { PanelColor, PanelVariant } from "components/common/layout/Panel/Panel";
import Heading, { HeadingColor, HeadingVariant } from "components/common/ui/Heading/Heading";
import SearchBar from "components/common/layout/SearchBar/SearchBar";
import Button, { ButtonDirectory, ButtonSizeType, ButtonVariant } from "components/common/ui/Button/Button";
import CreateInput from "components/common/ui/CreateInput/CreateInput";
import agent from "utils/agent";
import { Combobox,Loader, TextInput, useCombobox } from '@mantine/core'
import InputAutocomplete from "components/common/ui/InputAutocomplete/InputAutocomplete";




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
  const [value, setValue] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<string[]>([]);
  async function getData() {
    try {
      // @ts-ignore
      const response = await agent.Utils.suggest({ query: value })
      console.log(response);
      // @ts-ignore
      setData(response.data.suggestions.map(item => item.value));
      setLoading(false);

      // @ts-ignore
      setResult(response.data.suggestions)
    } catch (e) {

    } finally {
      console.log('success');
    }
  }
  // const [value, setValue] = useState('');
  // const [debounced] = useDebouncedValue(value, 1200);
  // const [result, setResult] = useState([]);

  const handleSuggest  = (event: Event | string) => {
    // @ts-ignore
    // setValue(event && event.currentTarget.value || event)
    setValue(event)
  }
  // useEffect( () => {
  //
  //   getData().then(r => r)
  // }, [debounced]);

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
      <Panel className={'col-span-full'} variant={PanelVariant.textPadding} background={PanelColor.glass}>
        <div>
          <Heading text={'Buttons'} variant={HeadingVariant.h1} color={HeadingColor.accent}/>
          <div>
            <Button text={'Сохранить'} variant={ButtonVariant.accent} />
            <Button text={'Сохранить'} variant={ButtonVariant['accent-outline']} />
            <Button text={'Сохранить'} />
            <Button text={'Сохранить'} />
          </div>
          <div>
            <Heading text={'Small'} variant={HeadingVariant.h3} className={'mt-8'}/>
            <Button text={'Сохранить'} variant={ButtonVariant['accent-outline']} size={ButtonSizeType.sm} />
            <Button text={'Сохранить'} variant={ButtonVariant.accent} size={ButtonSizeType.sm} />
            <Button text={'Сохранить'} directory={ButtonDirectory.directory} size={ButtonSizeType.sm} />
            <Button text={'Сохранить'} directory={ButtonDirectory.admin} size={ButtonSizeType.sm} />
            <Button text={'Сохранить'} directory={ButtonDirectory.performer} size={ButtonSizeType.sm} />
            <Button text={'Сохранить'} directory={ButtonDirectory.customer} size={ButtonSizeType.sm} />
          </div>
        </div>
        <p>
          <InputAutocomplete/>
          {/* <Select */}
          {/*   searchable */}
          {/*   value={value} */}
          {/*   searchValue={value} */}
          {/*   onSearchChange={(event) => handleSuggest(event)} */}
          {/*   // @ts-ignore */}
          {/*   data={result && result.data?.suggestions} */}
          {/* /> */}
          <CreateInput text={'suggest'} action={(event: any) => handleSuggest(event)} name={'suggest'} type={'text'} />
          Мы рады, что вы выбрали нас.
          <br />
          Пожалуйста, заполните данные для регистрации{' '}
        </p>
      </Panel>
    </Section>


  <Section type={SectionType.default}>
    <Panel
      search={true}
      header={
        <>
          <Heading text={'Дашборд'} variant={HeadingVariant.h1}  color={HeadingColor.accent} />
          <SearchBar />
        </>
      }
    />
    <Panel
      variant={PanelVariant.textPadding} background={PanelColor.glass} header={
      <>
        <Heading text={'HEADER'}
          variant={HeadingVariant.h1} color={HeadingColor.accent} />
    </>}>
      <div>
        <Heading text={'Buttons'} variant={HeadingVariant.h1} color={HeadingColor.accent}/>
        <div>
          <Button text={'Сохранить'} variant={ButtonVariant.accent} />
          <Button text={'Сохранить'} variant={ButtonVariant['accent-outline']} />
          <Button text={'Сохранить'} />
          <Button text={'Сохранить'} />
        </div>
        <div>
          <Heading text={'Small'} variant={HeadingVariant.h3} className={'mt-8'}/>
          <Button text={'Сохранить'} variant={ButtonVariant['accent-outline']} size={ButtonSizeType.sm} />
          <Button text={'Сохранить'} variant={ButtonVariant.accent} size={ButtonSizeType.sm} />
          <Button text={'Сохранить'} directory={ButtonDirectory.directory} size={ButtonSizeType.sm} />
          <Button text={'Сохранить'} directory={ButtonDirectory.admin} size={ButtonSizeType.sm} />
          <Button text={'Сохранить'} directory={ButtonDirectory.performer} size={ButtonSizeType.sm} />
          <Button text={'Сохранить'} directory={ButtonDirectory.customer} size={ButtonSizeType.sm} />
        </div>
      </div>
      <p>
        Мы рады, что вы выбрали нас.
        <br />
        Пожалуйста, заполните данные для регистрации{' '}
      </p>
    </Panel>
  </Section>
    </>
  )
}
