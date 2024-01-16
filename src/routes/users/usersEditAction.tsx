import React from 'react'
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import { SvgBackArrow } from 'components/common/ui/Icon'
import Button, { ButtonDirectory, ButtonSizeType, ButtonVariant } from 'components/common/ui/Button/Button'
import { Navigate, useLoaderData, useNavigate } from 'react-router-dom'
import 'yup-phone-lite'
import FormCreateUser from 'components/Form/FormCreateUser/FormCreateUser'
import { useStore } from "stores/store";
import { observer } from "mobx-react-lite";
import { PermissionNames } from "stores/permissionStore";

const UsersPageEditAction = () => {
  const store = useStore()
  const navigate = useNavigate()
  const { user }: any = useLoaderData()
  console.log(user);
  if(!store.userStore.getUserCan(PermissionNames["Управление пользователями"], 'update')) return <Navigate to={'/account'}/>
  return (
    <Section type={SectionType.default}>
      <Panel
        className={'col-span-full'}
        headerClassName={'flex justify-between flex-wrap'}
        header={
          <>
            <Button
              text={
                <>
                  <SvgBackArrow />
                  Назад к списку пользователей{' '}
                </>
              }
              className={'flex flex-[1_100%] items-center gap-2 font-medium text-[#606163] hover:text-gray-300 leading-none !mb-4'}
              action={() => navigate(-1)}
              variant={ButtonVariant.text}
            />
            <Heading
              text={'Добавить пользователя'}
              variant={HeadingVariant.h1}
              className={'!mb-0 inline-block mr-auto flex-1'}
              color={HeadingColor.accent}
            />
            <Button
              text={'Скачать шаблон'}
              variant={ButtonVariant["accent-outline"]}
              action={() => navigate('/account/users/create')}
              className={'inline-flex mr-5'}
              size={ButtonSizeType.sm}
            />
            <Button
              text={'Загрузить файл'}
              action={() => navigate('/account/users/create')}
              className={'inline-flex mr-5'}
              directory={ButtonDirectory.directory}
              size={ButtonSizeType.sm}
            />
          </>
        }
      ></Panel>

      <FormCreateUser user={user} edit={true}/>

    </Section>
  )
}
export default UsersPageEditAction
