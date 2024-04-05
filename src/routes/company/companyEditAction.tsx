import React, { useEffect, useState } from 'react'
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelColor, PanelVariant } from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import Button, { ButtonVariant } from 'components/common/ui/Button/Button'
import { useStore } from 'stores/store'
import { Navigate, Outlet, useLoaderData, useLocation, useNavigate, useParams, useRevalidator } from "react-router-dom";
import { SvgBackArrow } from 'components/common/ui/Icon'
import FormCreateCompany from 'components/Form/FormCreateCompany/FormCreateCompany'
import FormEditCompany from "components/Form/FormCreateCompany/FormEditCompany";
import { PermissionNames } from "stores/permissionStore";
import FormCreateUpdateCompany from "components/Form/FormCreateCompany/FormCreateUpdateCompany";
import { CompanyType, Payment } from "stores/companyStore";
import agent from "utils/agent";
import { Loader } from "@mantine/core";
import useSWR from "swr";
import { useDidUpdate } from "@mantine/hooks";

export default function CompanyPageEditAction(props: any) {
  const store = useStore()
  const navigate = useNavigate()
  const params = useParams()
  const revalidator = useRevalidator()
  const {isLoading, data:loaderData, mutate} = useSWR(`company_${params.id}`, () => agent.Companies.getCompanyData(params.company_type as string, Number(params.id)).then(r => r.data), {
    revalidateOnMount: true
  })
  useDidUpdate(
    () => {
      if(location.pathname.includes('companies')) {

        mutate()
        revalidator.revalidate()
      }
    },
    [location.pathname]
  );
  if(!store.userStore.getUserCan(PermissionNames["Компании"], 'update')) return <Navigate to={'/account'}/>
  if(isLoading) return <Loader/>
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
      <FormCreateUpdateCompany edit company={{
        id: params.id,
        company_name: loaderData.name,
        address: loaderData[`${params.company_type}profile`].address ? loaderData[`${params.company_type}profile`].address : "Нет адреса",
        city: String(loaderData.city.id),
        inn: loaderData[`${params.company_type}profile`].inn,
        ogrn: loaderData[`${params.company_type}profile`].ogrn,
        legal_address: loaderData[`${params.company_type}profile`].legal_address,
        height: loaderData[`${params.company_type}profile`].height,
        // @ts-ignore
        type: CompanyType[params.company_type],
        lat: loaderData[`${params.company_type}profile`].lat,
        lon: loaderData[`${params.company_type}profile`].lon,
        working_time: loaderData[`${params.company_type}profile`].working_time,
        contacts: loaderData[`${params.company_type}profile`].contacts,
        service_percent: loaderData[`${params.company_type}profile`].service_percent | 0,
        overdraft_sum: loaderData[`${params.company_type}profile`].overdraft_sum,
        payment: Payment.postoplata,
        overdraft: loaderData[`${params.company_type}profile`].overdraft ? "1" : "2",
        performers_list: '1',
        performer_company: loaderData[`${params.company_type}profile`].performer_company,
        bill: loaderData[`${params.company_type}profile`].bill,
      }}
      />
      {/* <FormEditCompany /> */}
    </Section>
  )
}
