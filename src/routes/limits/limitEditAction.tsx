import React from 'react'
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import Button, { ButtonVariant } from 'components/common/ui/Button/Button'
import { useStore } from 'stores/store'
import { Navigate,  useNavigate, useParams, useRevalidator } from "react-router-dom";
import { SvgBackArrow } from 'components/common/ui/Icon'
import { PermissionNames } from "stores/permissionStore";
import  { client } from "utils/agent";
import { Loader } from "@mantine/core";
import useSWR from "swr";
import { useDidUpdate } from "@mantine/hooks";
import FormCreateUpdateLimits from "components/Form/FormCreateUpdateLimits/FormCreateUpdateLimits";

export default function LimitPageEditAction(props: any) {
  const store = useStore()
  const navigate = useNavigate()
  const params = useParams()
  const revalidator = useRevalidator()
  const {isLoading, data, mutate} = useSWR(`limit_${params.company_id}_${params.id}`, () => client.limitsRetrieve(params.company_id as string, Number(params.id)), {
    revalidateOnMount: true
  })

  useDidUpdate(
    () => {
      if(location.pathname.includes('limits')) {
        mutate()
        revalidator.revalidate()
      }
    },
    [location.pathname]
  );

  if(!store.userStore.getUserCan(PermissionNames["Управление лимитами"], 'update')) return <Navigate to={'/account'}/>
  if(isLoading) return <Loader/>

  // @ts-ignore
  return (
    <Section type={SectionType.default}>
      <Panel
        className={'col-span-full'}
        header={
          <>
            <Button text={<><SvgBackArrow />Назад к лимиту</>}
              className={'flex items-center gap-2 font-medium text-[#606163] hover:text-gray-300 leading-none !mb-4'}
              action={() => navigate(location.pathname.split('/').slice(0, -1).join('/'))}
              variant={ButtonVariant.text}
            />
            <Heading
              text={'Редактирование лимита'}
              variant={HeadingVariant.h1}
              className={'!mb-2 block'}
              color={HeadingColor.accent}
            />
          </>
        }
      />

      <FormCreateUpdateLimits edit company={{
        id: params.id,
        company: params.company_id,
        // @ts-ignore
        car: data?.car ? data?.car.id : null,
        // @ts-ignore
        employee: data?.employee,
        // @ts-ignore
        service_type: data?.service_type,
        // @ts-ignore
        is_day: data?.is_day,
        // @ts-ignore
        amount: data?.amount,
        is_active: data?.is_active
      }}
      />
      {/* <FormEditCompany /> */}
    </Section>
  )
}
