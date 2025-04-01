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

import useSWR from "swr";
import { useDidUpdate } from '@mantine/hooks'
import dayjs from 'dayjs';
import { CompanyType } from "stores/companyStore";
import Image from "components/common/ui/Image/Image";
import Tabs, { TabsType } from "components/common/layout/Tabs/Tabs";

const UserPage = () => {
  const store = useStore()
  const location = useLocation()
  const navigate = useNavigate()
  // const { user }: any = useLoaderData()
  const params = useParams()
  // console.log(user, 'user');
  const {isLoading, data, mutate}:any = useSWR(`users_${params.company_id}_${params.id}`,() => store.usersStore.userLoader({company_type : params.company_type, id:Number(params.id), company_id:Number(params.company_id)}))

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
  console.log(data);
    const tabedData = React.useMemo(() => {
        console.log(data);
        return [
            { label: 'Основная информация', data: data, company_type: params.company_type  },
            { label: 'История', data: data, company_type: params.company_type , company_id: params.id  },
            (params.company_type !== "performer") && { label: 'Автомобили', data: data,  company_type: params.company_type , company_id: params.id  },
        ]
    }, [data, isLoading]);


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
       className={'col-span-full tablet:grid grid-rows-[auto_1fr_auto]  tablet-max:-mx-6'}
        variant={PanelVariant.textPadding}
        background={PanelColor.glass}
        bodyClassName={''}
        headerClassName={'flex desktop:gap-10 gap-4'}
        header={
        <>

            <div className={'flex rounded-full mr-2 user__photo'}
              // style={avatar ? {background: `url(${avatar})`, backgroundSize: "cover"} :{ background: 'var(--gradient-directory)' }}
              data-app-type={companyType}>
              {!data?.employee.avatar ?<span className={'w-24 h-24 flex text-black font-sans uppercase text-3xl leading-none items-center justify-center'}>
              {data?.employee.first_name[0]}
                {data?.employee.last_name[0]}
            </span>: <Image src={data?.employee.avatar}
                alt={''}
                width={98}
                height={98}
                className={'rounded-full aspect-square'}
                data-directory={store.appStore.appType} />}
            </div>
          <DList label={'Дата и время регистрации'}
            title={dayjs(data?.employee.date_joined).format('DD.MM.YYYY HH:mm')} />
        </>
        }>
          <Tabs variant={'bid-tabs'} data={tabedData}   type={TabsType.user} />
      </Panel>
    </Section>
  )
}

export default observer(UserPage)
