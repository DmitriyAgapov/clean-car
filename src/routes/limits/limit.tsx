import React from 'react'
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelColor, PanelVariant } from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingDirectory, HeadingVariant } from 'components/common/ui/Heading/Heading'
import Button, { ButtonSizeType, ButtonVariant } from 'components/common/ui/Button/Button'
import { useStore } from 'stores/store'
import { observer } from 'mobx-react-lite'
import LinkStyled from 'components/common/ui/LinkStyled/LinkStyled'
import { useLocation, useNavigate, useParams, useRevalidator } from 'react-router-dom'
import { SvgBackArrow } from 'components/common/ui/Icon'
import { CompanyType } from 'stores/companyStore'
import { PermissionNames } from 'stores/permissionStore'
import dayjs from 'dayjs'
import { client } from 'utils/agent'
import { useDidUpdate } from '@mantine/hooks'
import useSWR from 'swr'
import { Box, Divider } from "@mantine/core";
import DList from 'components/common/ui/DList/DList'

const LimitPage = () => {
  const store = useStore()
  const location = useLocation()
  const navigate = useNavigate()
  const params = useParams()
  const revalidator = useRevalidator()
  // @ts-ignore
  const {isLoading, data, mutate} = useSWR(`limit_${params.company_id}_${params.id}`, () => client.limitsRetrieve(params.company_id as string, Number(params.id)), {
    revalidateOnMount: true
  })
  console.log('data', data, isLoading);
  useDidUpdate(
    () => {
      if(location.pathname.includes('limits')) {

        mutate()
        revalidator.revalidate()
      }
    },
    [location.pathname]
  );


  return (
      <Section type={SectionType.default}>
          <Panel
            headerClassName={'justify-between gap-4 flex'}
              variant={PanelVariant.withGapOnly}
              header={
                  <>
                      <div>
                          <Button
                              text={
                                  <>
                                      <SvgBackArrow />
                                      Назад к списку лимитов{' '}
                                  </>
                              }
                              className={
                                  'flex items-center gap-2 font-medium text-[#606163] hover:text-gray-300 leading-none !mb-4'
                              }
                              action={() => navigate(-1)}
                              variant={ButtonVariant.text}
                          />
                          <Heading
                              text={'Лимит'}
                              variant={HeadingVariant.h1}
                              className={'!mb-0 inline-block'}
                              color={HeadingColor.accent}
                          />
                      </div>

                      {store.userStore.getUserCan(PermissionNames['Управление лимитами'], 'update') && (
                          <LinkStyled
                              text={'Редактировать'}
                              to={'edit'}
                              size={ButtonSizeType.sm}
                              /* action={() => store.companyStore.addCompany()} */ className={'float-right mobile:mt-auto'}
                              variant={ButtonVariant.default}
                          />
                      )}
                  </>
              }
          />

          <Panel
              state={isLoading}
              className={'col-span-full tablet:grid grid-rows-[auto_1fr_auto]  tablet-max:-mx-6'}
              variant={PanelVariant.textPadding}
              background={PanelColor.glass}
              bodyClassName={''}
              footerClassName={'flex  justify-end mobile:!justify-center'}
              headerClassName={'border-bottom-none'}
              header={
                  <>
                      <Heading text={
                        // @ts-ignore
                        data?.company.name} variant={HeadingVariant.h2} color={HeadingColor.accent} />
                      <div className={'flex  tablet-max:block  items-baseline justify-between '}>
                          <div className={'text-xs text-gray-2'}>
                              Дата и время регистрации:{' '}
                              <span className={'block'}>
                                  {dayjs(data?.updated).locale('ru').format('DD MMMM YYYY г. HH:mm')}
                              </span>
                          </div>
                          <div className={'flex tablet-max:flex-col tablet-max:gap-1 tablet-max:mt-4 flex-1 gap-4 tablet:ml-4'}>
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
                              {/* <Heading className={'!m-0'} text={data?.city?.name} variant={HeadingVariant.h4} /> */}
                          </div>
                      </div>
                  </>
              }
          >
            <Divider />
            <Box my={'xl'}>
            {data?.employee && <DList
              className={'child:dt:text-accent'}
              label={'Пользователь'}
              title={
                <Heading
                  variant={HeadingVariant.h4}
                  // @ts-ignore
                  text={`${data.employee.first_name} ${data.employee.last_name}`}
                />
              }
            />}
            {                  // @ts-ignore
              data?.company.parent && <DList
              className={'child:dt:text-accent'}
              label={'Филиал'}
              title={
                <Heading
                  variant={HeadingVariant.h4}
                  // @ts-ignore
                  text={data?.company.parent.name}
                />
              }
            />}

              {/* <Tabs */}
              {/*     data={tabedData} */}
              {/*   variant={'bid-tabs'} */}
              {/*     type={TabsType.company} */}
              {/* /> */}
            </Box>
          </Panel>
      </Section>
  )
}

export default observer(LimitPage)
