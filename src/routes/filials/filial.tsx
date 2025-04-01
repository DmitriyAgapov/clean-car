import React from 'react'
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelColor, PanelVariant } from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingDirectory, HeadingVariant } from 'components/common/ui/Heading/Heading'
import Button, { ButtonSizeType, ButtonVariant } from "components/common/ui/Button/Button";
import { useStore } from 'stores/store'
import LinkStyled from 'components/common/ui/LinkStyled/LinkStyled'
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import Tabs, { TabsType } from "components/common/layout/Tabs/Tabs";
import { dateTransform } from 'utils/utils'
import { SvgBackArrow } from 'components/common/ui/Icon'
import { CompanyType } from "stores/companyStore";
import { PermissionNames } from "stores/permissionStore";
import agent from "utils/agent";
import useSWR from "swr";
import { useDidUpdate } from '@mantine/hooks'
import { observer } from "mobx-react-lite";

const FilialPage = () => {
  const store = useStore()
  const location = useLocation()
  const params = useParams()

  const [sparams, setsParams] = useSearchParams()
    if(sparams?.get('activeTab')) {
        store.bidsStore.setActiveTab(sparams?.get('activeTab'));
    }

  const navigate = useNavigate()
  const {isLoading, data, mutate} = useSWR(`/filial/${params.company_type}/${params.id}/retrieve`, () => agent.Filials.getFilial(params.company_type as string, Number(params.company_id), Number(params.id)).then((r) => r.data))
    console.log(store.bidsStore.ActiveTab);
  useDidUpdate(
    () => {
      if(location.pathname === `/account/filials/${params.company_type}/${params.company_id}/${params.id}`) {
        mutate()
      }
        if(sparams?.get('activeTab')) {
            store.bidsStore.setActiveTab(sparams?.get('activeTab'));
        }
    },
    [location.pathname]

  );
    const currentATab = store.companyStore.getActiveTab
    const handleActiveTab = React.useCallback((active:string) => {
        store.companyStore.setActiveTab(active);
    }, [currentATab])
  const tabedData = React.useMemo(() => {
      console.log(data);
    return [
      { label: 'Основная информация', data: data, company_type: params.company_type  },
      { label: 'Филиалы', data: data, company_type: params.company_type , company_id: params.id  },
      { label: 'Сотрудники', data: data, company_type: params.company_type, company_id: params.id  },
      (params.company_type !== "performer") && { label: 'Автомобили', data: data,  company_type: params.company_type , company_id: params.id  },
      { label: "Права доступа", data: data, company_type: params.company_type , company_id: params.id  },
      // { label: 'Прайс-лист', data: data, company_type: params.company_type  },
      // { label: 'История заявок', data: data, company_type: params.company_type  }
    ]
  }, [data, isLoading]);
  return (
      <Section type={SectionType.default}>
          <Panel
            headerClassName={'justify-between gap-4 flex'}
              state={isLoading}
              variant={PanelVariant.withGapOnly}
              header={<><div>
                <Button text={<><SvgBackArrow />Назад к списку филиалов{' '}</>} className={'flex items-center gap-2 font-medium text-[#606163] hover:text-gray-300 leading-none !mb-4'} action={() => navigate('/account/filials')} variant={ButtonVariant.text} />
                <Heading text={'Филиал'} variant={HeadingVariant.h1} className={'!mb-0 inline-block'} color={HeadingColor.accent} /></div>
              {store.userStore.getUserCan(PermissionNames["Управление филиалами"], 'update') && <LinkStyled text={'Редактировать'} to={'edit'}/* action={() => store.companyStore.addCompany()} */ className={'float-right mt-auto '}     size={ButtonSizeType.sm} variant={ButtonVariant.default} />}</>}
          />

          <Panel
            state={isLoading}
              className={'col-span-full tablet:grid grid-rows-[auto_1fr_auto]  tablet-max:-mx-6'}
              variant={PanelVariant.textPadding}
              background={PanelColor.glass}
              bodyClassName={''}
              footerClassName={'flex  justify-end'}
              headerClassName={'border-bottom-none'}
              header={
                  <>

                    <div className={'flex col-span-2  tablet-max:col-span-full justify-between'}>
                      <Heading text={data?.name} variant={HeadingVariant.h2} color={HeadingColor.accent} />
                        {store.userStore.getUserCan(PermissionNames["Управление пользователями"], 'create') && currentATab === "Права доступа" && <Button text={'Создать группу'} href={`/account/groups/${params.id}/create`} className={"mb-auto"} variant={ButtonVariant.default} size={ButtonSizeType.sm}/>}
                  </div>
                      <div className={'flex items-baseline justify-between  tablet-max:col-span-full tablet-max:block row-start-2'}>
                          <div className={'text-xs text-gray-2'}>
                              Дата и время регистрации: <span>{dateTransform(data?.updated).date}</span>
                          </div>
                          <div className={'flex flex-1 tablet-max:flex-col justify-around'}>
                              <Heading
                                  className={'!m-0'}
                                  text={data?.is_active ? 'Активен' : 'Не активна'}
                                  color={data?.is_active ? HeadingColor.active : HeadingColor.notActive}
                                  variant={HeadingVariant.h4}
                              />
                              <Heading
                                  className={'!m-0'}
                                  text={params.company_type == 'customer'
                                    ? CompanyType.customer
                                    : CompanyType.performer}
                                  variant={HeadingVariant.h4}
                                  directory={
                                    params.company_type == 'customer'
                                          ? HeadingDirectory.customer
                                          : HeadingDirectory.performer
                                  }
                              />
                              <Heading className={'!m-0'} text={data?.city.name} variant={HeadingVariant.h4} />
                          </div>
                      </div>
                  </>
              }
          >
              <Tabs variant={'bid-tabs'} data={tabedData} activeTab={handleActiveTab} initActiveTab={sparams?.get('activeTab') as string}  type={TabsType.filial} />
          </Panel>
      </Section>

  )
}

export default observer(FilialPage)
