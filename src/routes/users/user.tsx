import React from 'react'
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelColor, PanelVariant } from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import Button, { ButtonSizeType, ButtonVariant } from "components/common/ui/Button/Button";
import { Outlet, useLoaderData, useLocation, useNavigate, useParams } from "react-router-dom";
import { useStore } from 'stores/store'
import { observer } from 'mobx-react-lite'
import { SvgBackArrow } from 'components/common/ui/Icon'
import DList from 'components/common/ui/DList/DList'
import { PermissionNames } from "stores/permissionStore";
import label from "utils/labels";
import useSWR from "swr";
import { useDidUpdate } from '@mantine/hooks'
import dayjs from 'dayjs';

const UserPage = () => {
  const store = useStore()
  const location = useLocation()
  const navigate = useNavigate()
  // const { user }: any = useLoaderData()
  const params = useParams()
  // console.log(user, 'user');
  const {isLoading, data, mutate}:any = useSWR(`users_${params.company_id}_${params.id}`,() => store.usersStore.userLoader({company_type : params.company_type, id:Number(params.id), company_id:Number(params.company_id)}))
  // const {isLoading:userLoading, data:userDatas, mutate:mutateData} = useSWR(`users_${params.company_id}_${params.id}`,() => store.usersStore.userLoader({company_type : params.company_type, id:Number(params.id), company_id:Number(params.company_id)}))
  // console.log(userDatas,userLoading, 'usersDatas');
  console.log(data, isLoading);
  useDidUpdate(
    () => {
      if(location.pathname === `/account/users/${params.company_type}/${params.company_id}/${params.id}`) {
        console.log('mutate');
        mutate()
      }
    },
    [location.pathname]
  );
  // console.log(userDatas, 'userdata');
  const companyType = params.company_type;
  // const company = companyType !== "admin" ? data.company : store.userStore.myProfileData.company;

  const userData = React.useMemo(() => {

    if(!isLoading) return (
        <>
            <DList label={'Пользователь'} title={data.employee?.first_name + ' ' + data?.employee?.last_name} />
            <DList label={'Номер телефона'} title={data?.employee?.phone} />
            <DList label={'E-mail'} title={data?.employee?.email} />
          <DList
                label={'Тип'}
                title={label(companyType ? companyType : "admin")}
                directory={companyType}
            />

          {data?.group && data?.group.name && <DList label={'Группа'} title={data?.group.name} />}
            <DList

                label={'Статус'}
                title={
                    <span className={data?.employee?.is_active ? 'text-active' : 'text-error'}>
                        {data?.employee?.is_active ? 'Активный' : 'Не активный'}
                    </span>
                }
            />
          {data?.company?.id && <hr className={'mt-0 col-span-2'}/>}
          {data?.company?.name && <DList label={'Компания'} title={data?.company.name} />}
          {data?.company?.city.name && <DList label={'Город'} title={data?.company.city.name} />}
          {data?.company?.parent && <DList label={'Филиал'} title={data?.company.parent.name ?? data?.company.name} />}
        </>
    )
    return null
  }, [data, isLoading])

  console.log(data);
  if (location.pathname.includes('edit')) return <Outlet />
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
                action={() => navigate('/account/users')}
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
              size={ButtonSizeType.sm}
              action={() => navigate(`${location.pathname}/edit`)}
              className={'inline-flex ml-auto mobile:mt-auto'}

            />}
          </>
        }
      />
      <Panel
        state={isLoading}
        className={'col-span-full grid grid-rows-[auto_1fr_auto] tablet-max:-mx-6'}
        variant={PanelVariant.textPadding}
        background={PanelColor.glass}
        bodyClassName={'desktop:pl-44 desktop:grid flex flex-col desktop:grid-cols-2 items-start content-start desktop:gap-8 gap-4'}
        headerClassName={'flex desktop:gap-10 gap-4'}
        header={
        <>
          <div
            className={'w-24 h-24 flex rounded-full mr-2'}
            style={{ background: 'var(--gradient-directory)' }}
            data-app-type={'admin'}
          >
            <span className={'text-black font-sans uppercase text-3xl leading-none m-auto'}>
              {data?.employee.first_name[0]}
              {data?.employee.last_name[0]}
              {data?.employee.last_name[0]}
            </span>
          </div>
          <DList label={'Дата и время регистрации'} title={dayjs(data?.employee.date_joined).format('DD.MM.YYYY HH:mm')} />
        </>
        }
      >
        {userData}
      </Panel>
    </Section>
  )
}

export default observer(UserPage)
