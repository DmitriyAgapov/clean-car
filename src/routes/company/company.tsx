import React from 'react'
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelColor, PanelVariant } from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingDirectory, HeadingVariant } from 'components/common/ui/Heading/Heading'
import Button, { ButtonSizeType, ButtonVariant } from 'components/common/ui/Button/Button'
import { useStore } from 'stores/store'
import { observer, useLocalStore } from "mobx-react-lite";
import LinkStyled from 'components/common/ui/LinkStyled/LinkStyled'
import { useLocation, useNavigate, useParams, useRevalidator } from "react-router-dom";
import Tabs, { TabsType } from 'components/common/layout/Tabs/Tabs'
import { SvgBackArrow } from 'components/common/ui/Icon'
import { CompanyType } from 'stores/companyStore'
import { PermissionNames } from 'stores/permissionStore'
import dayjs from 'dayjs'
import agent from "utils/agent";
import { useDidUpdate, useDisclosure } from '@mantine/hooks'
import useSWR from "swr";
import { UpBalance } from "components/common/layout/Modal/UpBalance";

const CompanyPage = () => {
  const store = useStore()
  const location = useLocation()
  const navigate = useNavigate()
  // console.log(location);
  const params = useParams()

  const [opened, { open, close }] = useDisclosure(false)
  const {isLoading, data, mutate} = useSWR(`company_${params.id}`, () => agent.Companies.getCompanyData(params.company_type as string, Number(params.id)).then(r => r.data), {
    revalidateOnMount: true
  })
  useDidUpdate(
    () => {
      if(location.pathname === `/account/companies/${params.company_type}/${params.id}`) {
        mutate()
        // revalidator.revalidate()
      }
    },
    [location.pathname]
  );

  const tabedData = React.useMemo(() => {
    return [
      { label: 'Основная информация', data: data, company_type: params.company_type  },
      { label: 'Филиалы', company_type: params.company_type  },
      { label: 'Сотрудники', data: data, company_type: params.company_type  },
      (params.company_type === "customer") && { label: 'Автомобили',  company_type: params.company_type  },
      (params.company_type === "customer") && { label: 'Партнеры', data: data?.customerprofile?.performer_company.map((el:number) => store.companyStore.getCompanyById(el)),  company_type: params.company_type  },
      // { label: 'Прайс-лист', data: data, company_type: params.company_type  },
      // { label: 'История заявок', data: data, company_type: params.company_type  }
    ]
  }, [data, params])


  const memoModal = React.useMemo(() => {
    if(isLoading && !data) return null
    if(data) return <UpBalance upBalance={true} companyName={data.name} id={Number(data.id)} opened={opened} onClose={close} />
  }, [opened, data, isLoading, params])

  return (
      <Section type={SectionType.default}>
          <Panel
            headerClassName={'justify-between gap-4 tablet:flex'}
              variant={PanelVariant.withGapOnly}
              header={
                <>
                  <div>
                    <Button text={
                      <>
                        <SvgBackArrow />
                        Назад к списку компаний{" "}
                      </>
                    }
                      className={
                        "flex items-center gap-2 font-medium text-[#606163] hover:text-gray-300 leading-none !mb-4"
                      }
                      action={() => navigate("/account/companies")}
                      variant={ButtonVariant.text} />
                    <Heading text={"Компания"}
                      variant={HeadingVariant.h1}
                      className={"!mb-0 inline-block"}
                      color={HeadingColor.accent} />
                  </div>

                  <div className={"flex gap-6 tablet-max:max-w-96 mobile:mt-6 self-end"}>
                    {store.appStore.appType === "admin" && params.company_type === "customer" && <Button text={"Пополнить счет"} action={open} variant={ButtonVariant["accent-outline"]} size={ButtonSizeType.sm} />}
                    {store.userStore.getUserCan(PermissionNames["Компании"], "update") && (
                      <LinkStyled text={"Редактировать"}
                        to={"edit"}
                        size={ButtonSizeType.sm}
                        /* action={() => store.companyStore.addCompany()} */
                        className={"float-right mobile:mt-auto"}
                        variant={ButtonVariant.default} />
                    )}</div>
                  </>
                  } />

                <Panel
                state={isLoading}
            className={'col-span-full tablet:grid grid-rows-[auto_1fr_auto]  tablet-max:-mx-3 desktop-max:pb-12'}
              variant={PanelVariant.textPadding}
              background={PanelColor.glass}
              bodyClassName={''}
              footerClassName={'flex justify-end mobile:!justify-center'}
              headerClassName={'border-bottom-none'}
              header={
                  <>
                      <Heading text={data?.name} variant={HeadingVariant.h2} color={HeadingColor.accent} />
                      <div className={'flex  tablet-max:block  items-baseline justify-between '}>
                          <div className={'text-xs text-gray-2'}>
                              Дата и время регистрации:{' '}
                              <span className={'block'}>
                                  {dayjs(data?.updated).locale('ru').format('DD MMMM YYYY г. HH:mm')}
                              </span>
                          </div>
                          <div className={'flex tablet-max:flex-col tablet-max:gap-1 tablet-max:mt-4 flex-1 justify-around'}>
                              <Heading
                                  className={'!m-0'}
                                  text={data?.is_active ? 'Активен' : 'Не активна'}
                                  color={data?.is_active ? HeadingColor.active : HeadingColor.notActive}
                                  variant={HeadingVariant.h4}
                              />
                              <Heading
                                  className={'!m-0'}
                                  text={
                                      params.company_type == 'customer' ? CompanyType.customer : CompanyType.performer
                                  }
                                  variant={HeadingVariant.h4}
                                  directory={
                                      params.company_type == 'customer'
                                          ? HeadingDirectory.customer
                                          : HeadingDirectory.performer
                                  }
                              />
                              <Heading className={'!m-0'} text={data?.city?.name} variant={HeadingVariant.h4} />
                          </div>
                      </div>
                  </>
              }
          >
              <Tabs
                  data={tabedData}
                variant={'bid-tabs'}
                  type={TabsType.company}
              />
          </Panel>
        {memoModal}
      </Section>
  )
}

export default observer(CompanyPage)
