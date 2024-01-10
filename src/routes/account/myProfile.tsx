import { useStore } from 'stores/store'
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelColor, PanelVariant } from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import { observer } from 'mobx-react-lite'
import { useLocation, useNavigate } from 'react-router-dom'
import React from 'react'
import DList from 'components/common/ui/DList/DList'
import { CompanyType } from 'stores/companyStore'
import Button from 'components/common/ui/Button/Button'
import { SvgLoading } from 'components/common/ui/Icon'
import { UserTypeEnum } from "stores/userStore";

const MyProfilePage = () => {
  const store = useStore()
  const navigate = useNavigate()
  const location = useLocation()
  const user = store.userStore.currentUser;
  // console.log(user);

  const userData = React.useMemo(() => {
    if(user)
      return (
        <>
          <DList label={'Пользователь'} title={user.first_name + ' ' + user.last_name} />
          <DList label={'Номер телефона'} title={user.phone} />
          <DList label={'E-mail'} title={user.email} />
          <DList
            label={'Тип'}
            title={user.company?.company_type ?? UserTypeEnum.admin}
            directory={user.company?.company_type === CompanyType.customer ? 'customer' : 'performers'}
          />

         <DList label={'Группа'} title={(user.account_bindings && user.account_bindings[0]) ? user.account_bindings[0]?.group?.name : user.staff_group?.name} />
          <DList

            label={'Статус'}
            title={
              <span className={user.is_active ? 'text-active' : 'text-error'}>
                          {user.is_active ? 'Активный' : 'Не активный'}
                      </span>
            }
          />
          {user.company?.id && <hr className={'mt-0 col-span-2'}/>}
          {user.company?.name && <DList label={'Компания'} title={user.company.name} />}
          {user.company?.city.name && <DList label={'Город'} title={user.company.city.name} />}
          {user.company?.city.name && <DList label={'Филиал'} title={user.company.city.name} />}
        </>
      )
      return null
  }, [user])

  if(user)
    return (
      <Section type={SectionType.default} >
        <Panel
          className={'col-span-full'}
          headerClassName={'flex justify-between flex-wrap items-end'}
          header={
            <>

                <Heading
                  text={'Профиль Пользователя'}
                  variant={HeadingVariant.h1}
                  className={'!mb-0 inline-block flex-1'}
                  color={HeadingColor.accent}
                />

              {/* {store.userStore.getUserCan('users', 'update') && <Button */}
              {/*   text={'Редактировать'} */}
              {/*   action={() => navigate(`/account/users/${user.company.company_type === CompanyType.customer ? 'customer' : user.company.company_type === CompanyType.performer ? 'performer' : 'admin'}/${user?.company.id}/${user?.id}/edit`)} */}
              {/*   className={'inline-flex ml-auto'} */}

              {/* />} */}
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
                {user.first_name[0]}
                {user.last_name[0]}
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
  return <SvgLoading/>
}

export default observer(MyProfilePage)
