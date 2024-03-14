import React, { useEffect, useState } from 'react'
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelColor, PanelVariant } from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import Button, { ButtonVariant } from 'components/common/ui/Button/Button'
import { useStore } from 'stores/store'
import { Navigate, Outlet, useLoaderData, useLocation, useNavigate, useParams } from "react-router-dom";
import { SvgBackArrow } from 'components/common/ui/Icon'
import FormCreateCompany from 'components/Form/FormCreateCompany/FormCreateCompany'
import FormEditCompany from "components/Form/FormCreateCompany/FormEditCompany";
import { PermissionNames } from "stores/permissionStore";
import FormCreateUpdateFilial from "components/Form/FormCreateFilials/FormCreateUpdateFilial";
import { CompanyType, Payment } from "stores/companyStore";

export default function FilialsPageEditAction(props: any) {
  const store = useStore()

  const navigate = useNavigate()
  const { company_type, id } = useParams();
  // @ts-ignore
  const {data: loaderData, type, parent} = useLoaderData()
  console.log('parent', parent);
  const  company = {
    id: id,
    company_id: parent.data.id,
    is_active: loaderData.company.data?.is_active,
    company_name: loaderData.company.data?.name,
    address: loaderData.company.data[`${company_type}profile`].address ? loaderData.company.data[`${company_type}profile`].address : "Нет адреса",
    city: String(loaderData.company.data.city.id),
    inn: loaderData.company.data[`${company_type}profile`].inn,
    ogrn: loaderData.company.data[`${company_type}profile`].ogrn,
    legal_address: loaderData.company.data[`${company_type}profile`].legal_address,
    height: loaderData.company.data[`${company_type}profile`].height,
    parent: parent.data.parent,
    // @ts-ignore
    type: CompanyType[type],
    lat: loaderData.company.data[`${company_type}profile`].lat,
    lon: loaderData.company.data[`${company_type}profile`].lon,
    working_time: loaderData.company.data[`${company_type}profile`].working_time,
    contacts: loaderData.company.data[`${company_type}profile`].contacts,
    service_percent: loaderData.company.data[`${company_type}profile`].service_percent | 0,
    overdraft_sum: loaderData.company.data[`${company_type}profile`].overdraft_sum,
    payment: Payment.postoplata,
    overdraft: loaderData.company.data[`${company_type}profile`].overdraft ? "1" : "2",
    performers_list: '1',
    performer_company: loaderData.company.data[`${company_type}profile`].performer_company,
    bill: loaderData.company.data[`${company_type}profile`].bill,
  }
  if(!store.userStore.getUserCan(PermissionNames["Управление филиалами"], 'update')) return <Navigate to={'/account'}/>
  return (
    <Section type={SectionType.default}>
      <Panel
        className={'col-span-full'}
        header={
          <>
            <Button text={<><SvgBackArrow />Назад к компании</>}
              className={'flex items-center gap-2 font-medium text-[#606163] hover:text-gray-300 leading-none !mb-4'}
              action={() => navigate(-1)}
              variant={ButtonVariant.text}
            />
            <Heading
              text={'Редактирование компании'}
              variant={HeadingVariant.h1}
              className={'!mb-2 block'}
              color={HeadingColor.accent}
            />
          </>
        }
      />
      <FormCreateUpdateFilial edit company={company}/>
    </Section>
  )
}
