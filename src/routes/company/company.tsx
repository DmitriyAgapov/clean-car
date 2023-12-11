import React from 'react'
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelRouteStyle } from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import Button, { ButtonDirectory, ButtonSizeType, ButtonVariant } from 'components/common/ui/Button/Button'
import { useStore } from 'stores/store'
import { observer } from 'mobx-react-lite'
import TableWithSort from 'components/common/layout/TableWithSort/TableWithSort'

const CompanyPage = () => {
  const store = useStore()
  console.log(store.companyStore.companies)
  return (
    <Section type={SectionType.default}>
      <Panel
        className={'col-span-full'}
        header={
          <>
            <Heading
              text={'Компании'}
              variant={HeadingVariant.h1}
              className={'!mb-6 inline-block'}
              color={HeadingColor.accent}
            />
            <Button
              text={'Создать компанию'}
              action={() => store.companyStore.addCompany()}
              variant={ButtonVariant.accent}
              className={'inline-flex float-right'}
              directory={ButtonDirectory.admin}
              size={ButtonSizeType.sm}
            />
          </>
        }
      />

      <TableWithSort
        filter={true}
        search={true}
        style={PanelRouteStyle.company}
        ar={['Статус', 'Компания', 'Тип', 'Город']}
        data={store.companyStore.companies.map((item: any) => ({
          status: item.is_active as boolean,
          company: item.name,
          type: item.company_type,
          city: item.city.name,
          id: item.id,
        }))}
        state={store.companyStore.loadingCompanies}
      />
    </Section>
  )
}

export default observer(CompanyPage)
