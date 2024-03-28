import React, { useEffect, useState } from "react";
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelColor, PanelVariant } from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingDirectory, HeadingVariant } from 'components/common/ui/Heading/Heading'
import Button, { ButtonSizeType, ButtonVariant } from "components/common/ui/Button/Button";
import { useLoaderData, useLocation, useNavigate, useNavigation } from "react-router-dom";
import { useStore } from 'stores/store'
import { observer } from 'mobx-react-lite'
import { SvgBackArrow, SvgCleanCarLoader } from "components/common/ui/Icon";
import { PermissionNames } from 'stores/permissionStore'
import Tabs from 'components/common/layout/Tabs/Tabs'
import { Loader } from "@mantine/core";
import { CompanyType } from "stores/companyStore";

const CarPage = () => {
  const store = useStore()
  const location = useLocation()
  const navigate = useNavigate()
  const { data,  company_type }: any = useLoaderData()
  const navigation = useNavigation();
  console.log(data);

  const [state, setState] = useState(navigation.state)

const dataMap = new Map([])
  const userData = React.useMemo(() => {
    return (
        <>

          {/*   <DList label={'Пользователь'} title={user.employee.first_name + ' ' + user.employee.last_name} /> */}
          {/*   <DList label={'Номер телефона'} title={user.employee.phone} /> */}
          {/*   <DList label={'E-mail'} title={user.employee.email} /> */}
          {/*   <DList */}
          {/*       label={'Тип'} */}
          {/*       title={user.company.company_type} */}
          {/*       directory={user.company.company_type === CompanyType.customer ? 'customer' : 'performers'} */}
          {/*   /> */}

          {/*   <DList label={'Группа'} title={user.group.name} /> */}
          {/*   <DList */}

          {/*       label={'Статус'} */}
          {/*       title={ */}
          {/*           <span className={user.employee.is_active ? 'text-active' : 'text-error'}> */}
          {/*               {user.employee.is_active ? 'Активный' : 'Не активный'} */}
          {/*           </span> */}
          {/*       } */}
          {/*   /> */}
          {/*   {user.company.id && <hr className={'mt-0 col-span-2'}/>} */}
          {/* {user.company.name && <DList label={'Компания'} title={user.company.name} />} */}
          {/* {user.company.city.name && <DList label={'Город'} title={user.company.city.name} />} */}
          {/* {user.company.city.name && <DList label={'Филиал'} title={user.company.city.name} />} */}
        </>
    )
  }, [])
  if(navigation.state === 'loading') return <SvgCleanCarLoader/>
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
                    Назад к списку автомобилей
                  </>
                }
                className={'flex flex-[1_100%] items-center gap-2 font-medium text-[#606163] hover:text-gray-300 leading-none !mb-5'}
                action={() => navigate(-1)}
                variant={ButtonVariant.text}
              />
              <Heading
                text={'Автомобиль'}
                variant={HeadingVariant.h1}
                className={'!mb-0 inline-block flex-1'}
                color={HeadingColor.accent}
              />
            </div>
            {store.userStore.getUserCan(PermissionNames["Управление автомобилями"], 'update') && <Button
              trimText={true}
              text={'Редактировать'}
              action={() => navigate(`/account/cars/${data.results.id}/edit`)}
              // className={'inline-flex'}

            />}
          </>
        }
      />
      <Panel
        state={false}
        className={'col-span-full grid grid-rows-[auto_1fr_auto]'}
        variant={PanelVariant.textPadding}
        background={PanelColor.glass}
        bodyClassName={''}

        headerClassName={'border-bottom-none'}
        header={
          <>
            <Heading text={data.results.number} variant={HeadingVariant.h2} color={HeadingColor.accent} />
            <div className={'flex items-baseline justify-between'}>
              <div className={'text-xs text-gray-2'}>
                {/* Дата и время регистрации: <span>{dateTransform(data.results.company.updated).date}</span> */}
              </div>
              <div className={'flex flex-1 justify-around'}>
                <Heading
                  className={'!m-0'}
                  text={data.results.is_active ? 'Активен' : 'Не активна'}
                  color={data.results.is_active ? HeadingColor.active : HeadingColor.notActive}
                  variant={HeadingVariant.h4}
                />
                <Heading
                  className={'!m-0'}
                  text={company_type == 'Компания-Заказчик'
                    ? data.results.number
                    : data.results.number}
                  variant={HeadingVariant.h4}
                  directory={
                    company_type == 'Компания-Заказчик'
                      ? HeadingDirectory.customer
                      : HeadingDirectory.performer
                  }
                />
                <Heading className={'!m-0'} text={data.results.company.city.name} variant={HeadingVariant.h4} />
              </div>
            </div>
          </>
        }
      >
        <Tabs data={[
          {
            label: 'Основная информация',
            data: data.results,
          },
          {
            label: 'Сотрудники',
            data: data.results,
          },
        ]} items={true} />
      </Panel>
    </Section>
  )
}

export default observer(CarPage)
