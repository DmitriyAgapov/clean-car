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
import FormCreateUpdateCompany from "components/Form/FormCreateCompany/FormCreateUpdateCompany";
import { CompanyType, Payment } from "stores/companyStore";

export default function CompanyPageEditAction(props: any) {
  const store = useStore()
  const location = useLocation()
  const { companytype, id } = useParams();
  const navigate = useNavigate()
  // @ts-ignore
  const [changes, setChanges] = useState({})

  const handleChangeName = (event: any) => {
    setChanges((prevState: any) => ({
      ...prevState,
      name: event.target.value,
    }))
  }
  // @ts-ignore
  const {data:loaderData, type} = useLoaderData()

  const  company = {
    id: id,
    company_name: loaderData.company.data?.name,
    address: loaderData.company.data[`${type}profile`].address ? loaderData.company.data[`${type}profile`].address : "Нет адреса",
    city: String(loaderData.company.data.city.id),
    inn: loaderData.company.data[`${type}profile`].inn,
    ogrn: loaderData.company.data[`${type}profile`].ogrn,
    legal_address: loaderData.company.data[`${type}profile`].legal_address,
    // @ts-ignore
    type: CompanyType[type],
    lat: loaderData.company.data[`${type}profile`].lat,
    lon: loaderData.company.data[`${type}profile`].lon,
    working_time: loaderData.company.data[`${type}profile`].working_time,
    contacts: loaderData.company.data[`${type}profile`].contacts,
    service_percent: loaderData.company.data[`${type}profile`].service_percent | 0,
    overdraft_sum: loaderData.company.data[`${type}profile`].overdraft_sum,
    payment: Payment.postoplata,
    overdraft: loaderData.company.data[`${type}profile`].overdraft ? "1" : "2",
    performers_list: '1',
    performer_company: loaderData.company.data[`${type}profile`].performer_company,
    bill: loaderData.company.data[`${type}profile`].bill,
  }
  if(!store.userStore.getUserCan(PermissionNames["Компании"], 'update')) return <Navigate to={'/account'}/>
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
      <FormCreateUpdateCompany edit company={company}/>
      {/* <FormEditCompany /> */}
    </Section>
  )
}
