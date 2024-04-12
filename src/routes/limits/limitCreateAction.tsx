import React from 'react'
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import Button, { ButtonVariant } from 'components/common/ui/Button/Button'
import { useStore } from 'stores/store'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { SvgBackArrow } from 'components/common/ui/Icon'
import { PermissionNames } from "stores/permissionStore";
import FormCreateUpdateLimits from "components/Form/FormCreateUpdateLimits/FormCreateUpdateLimits";

export default function LimitPageCreateAction(props: any) {
  const store = useStore()
  const location = useLocation();
  const navigate = useNavigate();

  if(!store.userStore.getUserCan(PermissionNames["Управление лимитами"], 'create')) return <Navigate to={'/account'}/>
  return (
    <Section type={SectionType.default}>
      <Panel
        className={'col-span-full'}
        header={
          <>
            <Button text={<><SvgBackArrow />Назад к списку лимитов{' '}</>}
              className={'flex items-center gap-2 font-medium text-[#606163] hover:text-gray-300 leading-none !mb-4'}
              action={() => navigate(location.pathname.split('/').slice(0, -1).join('/'))}
              variant={ButtonVariant.text}
            />
            <Heading
              text={'Создать лимит'}
              variant={HeadingVariant.h1}
              className={'!mb-2 block'}
              color={HeadingColor.accent}
            />
          </>
        }
      />

      <FormCreateUpdateLimits />

    </Section>
  )
}
