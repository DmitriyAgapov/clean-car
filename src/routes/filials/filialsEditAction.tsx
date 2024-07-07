import React, { useEffect, useState } from 'react'
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelColor, PanelVariant } from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import Button, { ButtonVariant } from 'components/common/ui/Button/Button'
import { useStore } from 'stores/store'
import { Navigate,  useNavigate, useParams } from "react-router-dom";
import { SvgBackArrow } from 'components/common/ui/Icon'
import { PermissionNames } from "stores/permissionStore";
import FormCreateUpdateFilial from "components/Form/FormCreateFilials/FormCreateUpdateFilial";
import { CompanyType, Payment } from "stores/companyStore";
import useSWR from "swr";
import agent from "utils/agent";

export default function FilialsPageEditAction(props: any) {
  const store = useStore()

  const params = useParams()
  const navigate = useNavigate()
  const { company_type, id } = useParams();

  const {isLoading, data:loaderData} = useSWR(`/filial/${params.company_type}/${params.id}/retrieve`, () => agent.Filials.getFilial(params.company_type as string, Number(params.company_id), Number(params.id)).then((r) => r.data))

  if(!store.userStore.getUserCan(PermissionNames["Управление филиалами"], 'update')) return <Navigate to={'/account'}/>
  return (
      <Section type={SectionType.default}>
          <Panel
              className={'col-span-full'}
              header={
                  <>
                      <Button
                          text={<><SvgBackArrow />Назад к компании</>}
                          className={'inline-flex items-center gap-2 font-medium text-[#606163] hover:text-gray-300 leading-none !mb-4'}
                          action={() => navigate(location.pathname.split('/').slice(0, -1).join('/'))}
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
          {(!isLoading && loaderData) &&
              <FormCreateUpdateFilial
                  edit
                  company={{
                      id: params.id,
                      company_id: params.company_id,
                      is_active: loaderData?.is_active,
                      company_name: loaderData?.name,
                      address: loaderData[`${company_type}profile`].address
                          ? loaderData[`${company_type}profile`].address
                          : 'Нет адреса',
                      city: String(loaderData?.city.id),
                      inn: loaderData[`${company_type}profile`].inn,
                      ogrn: loaderData[`${company_type}profile`].ogrn,
                      legal_address: loaderData[`${company_type}profile`].legal_address,
                      workload: loaderData[`${company_type}profile`].workload,
                      height: loaderData[`${company_type}profile`].height,
                      parent: loaderData.parent.parent_id,
                      // @ts-ignore
                      type: CompanyType[params.company_type],
                      lat: loaderData[`${company_type}profile`].lat,
                      lon: loaderData[`${company_type}profile`].lon,
                      working_time: loaderData[`${company_type}profile`].working_time,
                      contacts: loaderData[`${company_type}profile`].contacts,
                      service_percent: loaderData[`${company_type}profile`].service_percent | 0,
                      overdraft_sum: loaderData[`${company_type}profile`].overdraft_sum,
                      payment: Payment.postoplata,
                      overdraft: loaderData[`${company_type}profile`].overdraft ? '1' : '2',
                      performers_list: '1',
                      performer_company: loaderData[`${company_type}profile`].performer_company,
                      bill: loaderData[`${company_type}profile`].bill,
                  }}
              />
          }
      </Section>
  )
}
