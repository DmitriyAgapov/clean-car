import React from "react";
import Section, { SectionType } from 'components/common/layout/Section/Section';
import Panel, { PanelColor, PanelVariant } from 'components/common/layout/Panel/Panel';
import Heading, { HeadingColor, HeadingDirectory, HeadingVariant } from 'components/common/ui/Heading/Heading';
import Button, { ButtonSizeType, ButtonVariant } from "components/common/ui/Button/Button";
import {  useLocation, useNavigate, useNavigation, useParams } from "react-router-dom";
import { useStore } from 'stores/store';
import { observer } from 'mobx-react-lite';
import { SvgBackArrow, SvgCleanCarLoader } from "components/common/ui/Icon";
import { PermissionNames } from 'stores/permissionStore'
import Tabs, { TabsType } from "components/common/layout/Tabs/Tabs";
import { CompanyType, CompanyTypeRus } from "stores/companyStore";
import useSWR from "swr";
import { useDidUpdate } from "@mantine/hooks";

const CarPage = () => {
  const store = useStore()
  const location = useLocation()
  const navigate = useNavigate()
  const navigation = useNavigation();
  const params = useParams()
  const {isLoading, data, mutate} = useSWR(`car_${params.company_id}`,() => store.carStore.getCarByCompanyId(String(params.company_id), Number(params.id)))

  useDidUpdate(
    () => {
      if(location.pathname === `/account/cars/${params.company_id}/${params.id}`) {
        mutate()
      }
    },
    [location.pathname]
  );

  const tabedData = React.useMemo(() => {
    store.appStore.setAppState(isLoading)
    return [
      { label: 'Основная информация', data: data, company_type: CompanyTypeRus(data?.company?.company_type)},
      (store.userStore.myProfileState.company.company_type !== CompanyType.fizlico && { label: 'Сотрудники', data: data, company_type: CompanyTypeRus(data?.company?.company_type), company_id: params.company_id }),
      { label: 'История', data: data, company_type: params.company_type , company_id: params.id  },
      // { label: 'Прайс-лист', data: data, company_type: params.company_type  },
      // { label: 'История заявок', data: data, company_type: params.company_type  }
    ]
  }, [isLoading])

  if(navigation.state === 'loading') return <SvgCleanCarLoader/>
  return (
    <Section
      type={SectionType.default}

    >
      <Panel
        variant={PanelVariant.withGapOnly}
        className={'col-span-full'}
        headerClassName={'justify-between gap-4 flex'}
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
                action={() => navigate('/account/cars')}
                variant={ButtonVariant.text}
              />
              <Heading
                text={'Автомобиль'}
                variant={HeadingVariant.h1}
                className={'!mb-0 inline-block flex-1'}
                color={HeadingColor.accent}
              />
            </div>
            <div className={"flex gap-6 tablet-max:max-w-96 mobile:mt-6"}>
            {store.userStore.getUserCan(PermissionNames["Управление автомобилями"], 'update') && <Button
              trimText={true}
              text={'Редактировать'}
              size={ButtonSizeType.sm}
              action={() => navigate(`/account/cars/${params.company_id}/${params.id}/edit`)}
              // className={'inline-flex'}

            />}</div>
          </>
        }
      />
      <Panel
        state={isLoading}
        className={'col-span-full grid grid-rows-[auto_1fr_auto]'}
        variant={PanelVariant.textPadding}
        background={PanelColor.glass}
        bodyClassName={''}

        headerClassName={'border-bottom-none'}
        header={
          <>
            <Heading text={data?.number} variant={HeadingVariant.h2} color={HeadingColor.accent} />
            <div className={'flex items-baseline justify-between'}>
              <div className={'text-xs text-gray-2'}>
                {/* Дата и время регистрации: <span>{dateTransform(data.results.company.updated).date}</span> */}
              </div>
              <div className={'flex flex-1 justify-around'}>
                <Heading
                  className={'!m-0'}
                  text={data?.is_active ? 'Активен' : 'Не активна'}
                  color={data?.is_active ? HeadingColor.active : HeadingColor.notActive}
                  variant={HeadingVariant.h4}
                />
                <Heading
                  className={'!m-0'}
                  text={data?.company?.company_type == 'Клиент'
                    ? data?.number
                    : data?.number}
                  variant={HeadingVariant.h4}
                  directory={
                    data?.company?.company_type == 'Клиент'
                      ? HeadingDirectory.customer
                      : HeadingDirectory.performer
                  }
                />
                <Heading className={'!m-0'} text={data?.company?.city.name} variant={HeadingVariant.h4} />
              </div>
            </div>
          </>
        }
      >
        <Tabs
          data={tabedData}
          type={TabsType.car}
        />
        {/* <Tabs data={[ */}
        {/*   { */}
        {/*     label: 'Основная информация', */}
        {/*     data: data.results, */}
        {/*   }, */}
        {/*   { */}
        {/*     label: 'Сотрудники', */}
        {/*     data: data.results, */}
        {/*   }, */}
        {/* ]} items={true} /> */}
      </Panel>
    </Section>
  )
}

export default observer(CarPage)
