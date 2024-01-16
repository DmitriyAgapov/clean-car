import React from 'react'
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelColor, PanelVariant } from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import Button, { ButtonSizeType, ButtonVariant } from "components/common/ui/Button/Button";
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom'
import { useStore } from 'stores/store'
import { observer } from 'mobx-react-lite'
import { SvgBackArrow } from 'components/common/ui/Icon'
import DList from 'components/common/ui/DList/DList'
import { CompanyType } from "stores/companyStore";
import { PermissionNames } from "stores/permissionStore";

const UserPage = () => {
  const store = useStore()
  const location = useLocation()
  const navigate = useNavigate()
  const { user }: any = useLoaderData()
  // console.log(user);
  const userData = React.useMemo(() => {
    return (
        <>
            <DList label={'Пользователь'} title={user.employee.first_name + ' ' + user.employee.last_name} />
            <DList label={'Номер телефона'} title={user.employee.phone} />
            <DList label={'E-mail'} title={user.employee.email} />
            <DList
                label={'Тип'}
                title={user.company.company_type}
                directory={user.company.company_type === CompanyType.customer ? 'customer' : 'performers'}
            />

            <DList label={'Группа'} title={user.group.name} />
            <DList

                label={'Статус'}
                title={
                    <span className={user.employee.is_active ? 'text-active' : 'text-error'}>
                        {user.employee.is_active ? 'Активный' : 'Не активный'}
                    </span>
                }
            />
            {user.company.id && <hr className={'mt-0 col-span-2'}/>}
          {user.company.name && <DList label={'Компания'} title={user.company.name} />}
          {user.company.city.name && <DList label={'Город'} title={user.company.city.name} />}
          {user.company.city.name && <DList label={'Филиал'} title={user.company.city.name} />}
        </>
    )
  }, [])
  return (
    <Section
      type={SectionType.default}

    >
      <Panel
        className={'col-span-full'}
        headerClassName={'flex justify-between flex-wrap items-end'}
        header={
          <>
            <div>
              <Button
                text={
                  <>
                    <SvgBackArrow />
                    Назад к списку пользователей{' '}
                  </>
                }
                className={'flex flex-[1_100%] items-center gap-2 font-medium text-[#606163] hover:text-gray-300 leading-none !mb-5'}
                action={() => navigate(-1)}
                variant={ButtonVariant.text}
              />
              <Heading
                text={'Пользователь'}
                variant={HeadingVariant.h1}
                className={'!mb-0 inline-block flex-1'}
                color={HeadingColor.accent}
              />
            </div>
            {store.userStore.getUserCan(PermissionNames["Управление пользователями"], 'update') && <Button
              text={'Редактировать'}
              action={() => navigate(`${location.pathname}/edit`)}
              className={'inline-flex ml-auto'}

            />}
          </>
        }
      />
      <Panel
        state={store.usersStore.loadingUsers}
        className={'col-span-full grid grid-rows-[auto_1fr_auto]'}
        variant={PanelVariant.textPadding}
        background={PanelColor.glass}
        bodyClassName={'!pl-44 grid grid-cols-2 items-start content-start gap-8'}
        headerClassName={'flex gap-10'}
        header={
        <>
          <div
            className={'w-24 h-24 flex rounded-full mr-2'}
            style={{ background: 'var(--gradient-directory)' }}
            data-app-type={'admin'}
          >
            <span className={'text-black font-sans uppercase text-3xl leading-none m-auto'}>
              {user.employee.first_name[0]}
              {user.employee.last_name[0]}
            </span>
          </div>
          <DList label={'Дата и время регистрации'} title={'08.10.23 07:14'} />
        </>
        }
      >
        {userData}
      </Panel>
    </Section>
  )
}

export default observer(UserPage)
