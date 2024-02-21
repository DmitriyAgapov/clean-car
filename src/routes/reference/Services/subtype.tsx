import React, { useEffect } from "react";
import Section, { SectionType } from "components/common/layout/Section/Section";
import Panel, { PanelColor, PanelVariant } from "components/common/layout/Panel/Panel";
import Heading, { HeadingColor, HeadingVariant } from "components/common/ui/Heading/Heading";
import { useStore } from "stores/store";
import { useLoaderData, useLocation, useNavigate, useParams, useRouteLoaderData } from "react-router-dom";
import { PermissionNames } from "stores/permissionStore";
import Button, { ButtonSizeType, ButtonVariant } from "components/common/ui/Button/Button";
import { SvgBackArrow } from "components/common/ui/Icon";
import { FormCard } from "components/Form/FormCards/FormCards";
import LinkStyled from "components/common/ui/LinkStyled/LinkStyled";
import { dateTransform } from "utils/utils";
import AddType from "routes/reference/Services/addType";
import AddOption from "routes/reference/Services/addOption";

const ServicesSubTypePage = () => {
    const store = useStore()
    const navigate = useNavigate()
    const location = useLocation()
    const params = useParams()
    const { data, page, pageRequest, textData }: any = useLoaderData()

    return (
        <Section type={SectionType.default}>
            <Panel
                variant={PanelVariant.withGapOnly}
                headerClassName={'flex justify-between'}

                header={
                    <>
                        <div>
                            <LinkStyled
                                text={
                                    <>
                                        <SvgBackArrow />
                                        Назад к справочнику{' '}
                                    </>
                                }
                                className={
                                    'flex items-center gap-2 font-medium text-[#606163] hover:text-gray-300 leading-none !mb-4'
                                }
                              to={location.pathname.split('/').slice(0, -1).join('/')}
                                variant={ButtonVariant.text}
                            />
                            <Heading
                                text={data.results.parent.name}
                                variant={HeadingVariant.h1}
                                className={'inline-block !mb-0'}
                                color={HeadingColor.accent}
                            />
                        </div>

                    </>
                }
            ></Panel>
          <Panel headerClassName={'!pb-2'} header={
            <>
              <div className={'flex items-baseline justify-between flex-1 '}>
                <div className={'flex-1'}>
                  <Heading
                    text={data.results.name}
                    variant={HeadingVariant.h2}
                    color={HeadingColor.accent}
                  />
                  <div className={'flex flex-1 items-end gap-12'}>
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
                    text={'+ Добавить опцию'}
                    size={ButtonSizeType.sm}
                    action={async () => {
                      store.appStore.setModal({
                        header: (
                          <Heading
                            text={`Добавить новый опцию услуги ${data.results.name}`}
                            variant={HeadingVariant.h3}
                          />
                        ),
                        text: `Вы уверены, что хотите удалить ${data.results.name}`,
                        component: (
                          <AddOption
                            subtype_id={Number(params.subtype_id)}
                            id={Number(params.id) as number}
                          />
                        ),
                        state: true,
                      })
                    }}
                    className={'justify-self-end ml-auto'}
                    variant={ButtonVariant['accent-outline']}
                  />
                )}
              </div>
              <Heading color={HeadingColor.accent} text={'Дополнительные опции'} className={'mt-12 !mb-0'} variant={HeadingVariant.h4}/>
            </>
          } variant={PanelVariant.textPadding} className={'!mt-0'} background={PanelColor.glass} bodyClassName={'grid grid-cols-3 gap-6'} >

              {data.results.options.map((card:any) => <FormCard key={card.id} title={card.name} titleVariant={HeadingVariant.h4}  className={'relative w-full group  overflow-hidden'}
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
                              text={`Редактировать опцию услуги  ${card.name}`}
                              variant={HeadingVariant.h3}
                            />
                          ),
                          text: `Вы уверены, что хотите удалить ${data.results.name}`,
                          component: (
                            <AddOption
                              edit={true}
                              data={{
                                service_type: Number(params.id),
                                subtypeName: card.name,
                                status: card.is_active ? 'true' : 'false',
                              }}
                              subtype_id={Number(params.subtype_id)}
                              id={Number(card.id) as number}
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

                  </div>
                }>
                  <div className={`absolute w-4 h-4 right-3 top-3 rounded-full ${card.is_active ? 'bg-active' : 'bg-red-500'}`}/>

                  </FormCard>)}

            </Panel>
        </Section>
    )
}
export default ServicesSubTypePage
