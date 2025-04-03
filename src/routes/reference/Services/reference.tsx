import React from "react";
import Section, { SectionType } from "components/common/layout/Section/Section";
import Panel, { PanelColor, PanelVariant } from "components/common/layout/Panel/Panel";
import Heading, { HeadingColor, HeadingVariant } from "components/common/ui/Heading/Heading";
import Button, { ButtonSizeType, ButtonVariant } from "components/common/ui/Button/Button";
import { useStore } from "stores/store";
import { Outlet, useLoaderData, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { SvgBackArrow } from "components/common/ui/Icon";
import { PermissionNames } from "stores/permissionStore";
import { dateTransform, useWindowDimensions } from "utils/utils";
import { FormCard } from "components/Form/FormCards/FormCards";
import LinkStyled from "components/common/ui/LinkStyled/LinkStyled";
import AddType from "routes/reference/Services/addType";
import AddOption from "routes/reference/Services/addOption";
import { Pagination } from "@mantine/core";
import agent from 'utils/agent'
import { notifications } from "@mantine/notifications";

const ServicePage = () => {
    const store = useStore()
    const params = useParams()
    const navigate = useNavigate()
    const location = useLocation()
    const { data, textData, pageRequest }: any = useLoaderData()
    const {width} = useWindowDimensions()
    let [searchParams, setSearchParams] = useSearchParams()
    const backToUrlLevel = location.pathname.split('/').slice(0, -1).join('/')
    const memoizedData = React.useMemo(() => {
        return data.results?.subtypes?.results?.map((subtype: any) => (
            <FormCard
                title={subtype.name}
                titleVariant={HeadingVariant.h4}
                className={'group relative w-full overflow-hidden'}
                actions={
                    <div
                        className={
                            'absolute  group-hover:opacity-100 opacity-0 top-0.5 right-0.5 bottom-0.5 left-0.5  gap-2 px-8 flex items-center justify-center flex-col bg-black/80 hover:outline-accent rounded hover:outline hover:outline-2'
                        }
                    >
                        <Button
                            action={async () => {
                                store.appStore.setModal({
                                    header: (
                                        <Heading
                                            text={`Добавить новую опцию услуги  ${subtype.name}`}
                                            variant={HeadingVariant.h3}
                                        />
                                    ),
                                    component: <AddOption subtype_id={subtype.id} id={Number(params.id)} />,
                                    state: true,
                                })
                            }}
                            className={'!text-xs text-accent uppercase w-full'}
                            variant={ButtonVariant['accent-outline']}
                            size={ButtonSizeType.sm}
                            text={'Добавить опцию'}
                        />
                        <Button
                            action={async () => {
                                store.appStore.setModal({
                                    header: (
                                        <Heading
                                            text={`Редактировать тип услуги  ${subtype.name}`}
                                            variant={HeadingVariant.h3}
                                        />
                                    ),
                                    component: (
                                        <AddType
                                            edit={true}
                                            data={{
                                                service_type: data.results.id,
                                                subtypeName: subtype.name,
                                                status: subtype.is_active ? 'true' : 'false',
                                            }}
                                            subtype_id={subtype.id}
                                            id={data.results.id}
                                        />
                                    ),
                                    state: true,
                                })
                            }}
                            className={'!text-xs uppercase w-full [-webkit-text-fill-color=initial]'}
                            variant={ButtonVariant['outline']}
                            size={ButtonSizeType.sm}
                            text={'Редактировать'}
                        />
                        {subtype.options.length > 0 && (
                            <LinkStyled
                                to={String(subtype.id)}
                                className={'!text-xs text-accent uppercase w-full'}
                                variant={ButtonVariant['outline']}
                                size={ButtonSizeType.sm}
                                text={'Подробнее'}
                            />
                        )}
                    </div>
                }
            >
                <div
                    className={`absolute w-4 h-4 right-3 top-3 rounded-full ${
                        subtype.is_active ? 'bg-active' : 'bg-red-500'
                    }`}
                />
                <div>
                    {subtype.options.length > 0 ? (
                        <>
                            <span className={'text-base text-accent'}>{subtype.options.length}</span>
                            <span className={'text-sm text-gray-2 uppercase font-medium ml-2'}>
                                {' '}
                                дополнительных опций
                            </span>
                        </>
                    ) : (
                        <span className={'text-sm text-gray-2 uppercase font-medium ml-2'}>
                            {' '}
                            нет дополнительных опций
                        </span>
                    )}
                </div>
            </FormCard>
        ))
    }, [data.results])
    // @ts-ignore

  if (location.pathname.includes('edit')) return <Outlet />
  if (location.pathname.split('/')[location.pathname.split('/').length - 1] === params.subtype_id) return <Outlet />

    return (
        <Section type={SectionType.default}>
            <Panel
                variant={PanelVariant.withGapOnly}
                headerClassName={'flex justify-between'}
                state={false}
                header={
                  <>
                    <div>
                      <LinkStyled text={
                        <>
                          <SvgBackArrow />
                          {textData.createPageBack}
                        </>
                      }
                        className={
                          "flex items-center gap-2 font-medium text-[#606163] hover:text-gray-300 leading-none !mb-4"
                        }
                        to={location.pathname.split("/").slice(0, -1).join("/")}
                        variant={ButtonVariant.text} />
                      <Heading text={textData.referenceTitle}
                        variant={HeadingVariant.h1}
                        className={"inline-block !mb-0"}
                        color={HeadingColor.accent} />
                    </div>
                    <div className={"flex gap-6 tablet-max:max-w-96 mobile:mt-6"}>
                      <Button text={"Обновить прайс-листы"}
                        action={() => {
                          agent.Price.updatePrice().then((r:any) =>  {
                            if(r && r.status < 300) {
                              notifications.show({
                                id: 'updatePrice_success',
                                withCloseButton: true,
                                autoClose: 5000,
                                title: 'Прайс обновлен',
                                message: '',
                                color: 'var(--accentColor)',
                                // style: { backgroundColor: 'red' },
                                loading: false,
                              })
                            }
                          })
                        }}
                        // trimText={true}
                        /* action={() => store.companyStore.addCompany()} */
                        className={"inline-flex tablet-max:flex-1"}
                        variant={ButtonVariant["accent-outline"]}
                        size={ButtonSizeType.sm} />
                    </div>
                  </>
                }></Panel>
          <Panel className={"col-span-full grid grid-rows-[auto_1fr_auto]  tablet-max:pb-8"}
            variant={PanelVariant.textPadding}
            background={PanelColor.glass}
            bodyClassName={"grid tablet:grid-cols-3 items-start content-start tablet:gap-8 gap-4"}
            headerClassName={"flex gap-10"}
            header={
              <>
                <div className={"tablet:flex items-baseline justify-between flex-1 "}>
                  <div className={"flex-1"}>
                    <Heading text={data.results.name}
                                    variant={HeadingVariant.h2}
                                    color={HeadingColor.accent}
                                />
                                <div className={'tablet:flex flex-1 items-end gap-12'}>
                                    <div className={'text-xs text-gray-2'}>
                                        Дата и время регистрации: <span>{dateTransform(data.updated).date}</span>
                                    </div>
                                    <Heading
                                        className={'!m-0'}
                                        text={data.results.is_active ? 'Активен' : 'Не активна'}
                                        color={data.results.is_active ? HeadingColor.active : HeadingColor.notActive}
                                        variant={HeadingVariant.h4}
                                    />
                                </div>
                            </div>
                            {store.userStore.getUserCan(PermissionNames['Управление справочниками'], 'update') && (
                                <Button
                                    text={'+ Добавить тип'}
                                    size={ButtonSizeType.sm}
                                    action={async () => {
                                        store.appStore.setModal({
                                            header: (
                                                <Heading
                                                    text={`Добавить новый тип услуги ${data.results.name}`}
                                                    variant={HeadingVariant.h3}
                                                />
                                            ),
                                            text: `Вы уверены, что хотите удалить ${data.results.name}`,
                                            component: <AddType id={Number(params.id)} />,
                                            state: true,
                                        })
                                    }}
                                    className={'justify-self-end ml-auto tablet-max:mt-4'}
                                    variant={ButtonVariant['accent-outline']}
                                />
                            )}
                        </div>
                    </>
                }
                footer={
                  data.results?.subtypes?.count / pageRequest.page_size > 1 && (
                        <Pagination
                            classNames={{
                                control:
                                    'hover:border-accent data-[active=true]:border-accent data-[active=true]:text-accent',
                            }}
                            total={Math.ceil(data.results?.subtypes?.count / 9)}
                            onChange={(value:any) => {

                                setSearchParams((prevState: any) => ({...prevState, page: value}))
                            }}

                          boundaries={1}
                          value={Number(String(searchParams.get('page')))}
                          defaultValue={1}
                        />
                    )
                }
            >
              {data.results.subtypes?.results?.map((subtype: any) => (
              <FormCard
                title={subtype.name}
                titleVariant={HeadingVariant.h4}
                className={'group relative w-full overflow-hidden'}
                navigate={(event) => {
                  event.stopPropagation();
                  width && width < 960 ?  navigate(String(subtype.id)) : void null
                }}
                actions={
                  <div
                    className={
                      'tablet:absolute tablet-max:mt-4 cursor-auto  tablet:group-hover:opacity-100 tablet:opacity-0 top-0.5 right-0.5 bottom-0.5 left-0.5  gap-2 tablet:px-8 flex items-center justify-center tablet:flex-col tablet:bg-black/80 hover:outline-accent rounded hover:outline hover:outline-2'
                    }
                  >
                    <Button
                      action={async (event) => {
                        event.stopPropagation();
                        store.appStore.setModal({
                          header: (
                            <Heading
                              text={`Добавить новую опцию услуги  ${subtype.name}`}
                              variant={HeadingVariant.h3}
                            />
                          ),
                          component: <AddOption subtype_id={subtype.id} id={Number(params.id)} />,
                          state: true,
                        })
                      }}
                      className={'!text-xs text-accent uppercase w-full'}
                      variant={ButtonVariant['accent-outline']}
                      size={ButtonSizeType.sm}
                      text={'Добавить опцию'}
                    />
                    <Button
                      action={async  (event) => {
                        event.stopPropagation();
                        store.appStore.setModal({
                          header: (
                            <Heading
                              text={`Редактировать тип услуги  ${subtype.name}`}
                              variant={HeadingVariant.h3}
                            />
                          ),
                          component: (
                            <AddType
                              edit={true}
                              data={{
                                service_type: data.results.id,
                                subtypeName: subtype.name,
                                status: subtype.is_active ? 'true' : 'false',
                              }}
                              subtype_id={subtype.id}
                              id={data.results.id}
                            />
                          ),
                          state: true,
                        })
                      }}
                      className={'!text-xs uppercase w-full [-webkit-text-fill-color=initial]'}
                      variant={ButtonVariant['outline']}
                      size={ButtonSizeType.sm}
                      text={'Редактировать'}
                    />
                    {subtype.options.length > 0 && (
                      <LinkStyled
                        to={String(subtype.id)}
                        className={'!text-xs text-accent uppercase w-full tablet-max:!hidden'}
                        variant={ButtonVariant['outline']}
                        size={ButtonSizeType.sm}
                        text={'Подробнее'}
                      />
                    )}
                  </div>
                }
              >
                <div
                  className={`absolute w-4 h-4 right-3 top-3 rounded-full ${
                    subtype.is_active ? 'bg-active' : 'bg-red-500'
                  }`}
                />
                <div>
                  {subtype.options.length > 0 ? (
                    <>
                      <span className={'text-base text-accent'}>{subtype.options.length}</span>
                      <span className={'text-sm text-gray-2 uppercase font-medium ml-2'}>
                                {' '}
                        дополнительных опций
                            </span>
                    </>
                  ) : (
                    <span className={'text-sm text-gray-2 uppercase font-medium ml-2'}>
                            {' '}
                      нет дополнительных опций
                        </span>
                  )}
                </div>
              </FormCard>
              ))}
                {/* {memoizedData} */}
            </Panel>
        </Section>
    )
}
export default ServicePage
