import React from 'react'
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelColor, PanelVariant } from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import Button, { ButtonSizeType, ButtonVariant } from "components/common/ui/Button/Button";
import { useLoaderData, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useStore } from 'stores/store'
import { observer } from 'mobx-react-lite'
import { SvgBackArrow } from 'components/common/ui/Icon'
import DList from 'components/common/ui/DList/DList'

const UserPage = () => {
  const store = useStore()
  const navigate = useNavigate()
  const {companyid} = useParams()
  console.log(companyid);
  const { user }: any = useLoaderData()
  // @ts-ignore
  console.log(store.permissionStore.loadCompanyPermissions(companyid));
  console.log(user.group);
  const userData = React.useMemo(() => {
    return (
      <>
        <DList  label={'Пользователь'} title={user.first_name + ' ' + user.last_name} />
        <DList  label={'Номер телефона'} title={user.phone} />
        <DList  label={'E-mail'} title={user.email} />
        <DList

          label={'Группа'}
          title={store.permissionStore.permissions.filter((el) => el.id === user.group)[0].name}
        />
        <DList
          className={'my-8'}
          label={'Статус'}
          title={
            <span className={user.is_active ? 'text-active' : 'text-error'}>
              {user.is_active ? 'Активный' : 'Не активный'}
            </span>
          }
        />

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
            {store.userStore.getUserCan('users', 'update') && <Button
              text={'Редактировать'}
              action={() => navigate('/account/users/create')}
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
}

export default observer(UserPage)
