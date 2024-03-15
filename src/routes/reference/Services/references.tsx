import React from 'react'
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelColor, PanelVariant } from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import { useStore } from 'stores/store'
import { Outlet, useLoaderData, useLocation, useNavigate } from 'react-router-dom'
import { PermissionNames } from 'stores/permissionStore'
import Button, { ButtonDirectory, ButtonSizeType, ButtonVariant } from 'components/common/ui/Button/Button'
import { SvgBackArrow } from 'components/common/ui/Icon'
import { FormCard } from 'components/Form/FormCards/FormCards'
import LinkStyled from 'components/common/ui/LinkStyled/LinkStyled'

const ServicesPage = () => {
    const store = useStore()
    const navigate = useNavigate()
    const location = useLocation()
    const { data, page, pageRequest, textData }: any = useLoaderData()

    if (location.pathname.includes('create') || location.pathname.includes('edit')) return <Outlet />
    if (location.pathname !== `/account/references/${textData.path}`) return <Outlet />
    return (
        <Section type={SectionType.default}>
            <Panel
                variant={PanelVariant.withGapOnly}
                headerClassName={'flex justify-between'}
                state={store.permissionStore.loadingPermissions}
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
                                text={textData.title}
                                variant={HeadingVariant.h1}
                                className={'inline-block !mb-0'}
                                color={HeadingColor.accent}
                            />
                        </div>

                        {/* {store.userStore.getUserCan(PermissionNames['Управление справочниками'], 'create') && ( */}
                        {/*     <Button */}
                        {/*         text={textData.create} */}
                        {/*         action={() => navigate('create')} */}
                        {/*         trimText={true} */}
                        {/*      className={'inline-flex'} */}
                        {/*         directory={ButtonDirectory.directory} */}
                        {/*         size={ButtonSizeType.sm} */}
                        {/*     /> */}
                        {/* )} */}
                    </>
                }
            ></Panel>
          <Panel  variant={PanelVariant.textPadding} className={'!mt-0'} background={PanelColor.glass} bodyClassName={'grid grid-cols-3 gap-6'} header={<p>{textData.description}</p>}>
              {data && data.results && data.results.length > 0 && data.results.map((card:any) => <FormCard title={card.name} titleVariant={HeadingVariant.h4}  className={'relative w-full  group  overflow-hidden'}
                  actions={
                    <div
                      className={
                        'absolute  group-hover:opacity-100 opacity-0 top-0.5 right-0.5 bottom-0.5 left-0.5  gap-2 px-8 flex items-center justify-center flex-col bg-black/80 hover:outline-accent rounded hover:outline hover:outline-2'
                      }
                    ><LinkStyled to={String(card.id)}
                      className={'!text-xs uppercase w-full [-webkit-text-fill-color=initial]'}
                      variant={ButtonVariant['outline']}
                      size={ButtonSizeType.sm}
                      text={"Подробнее"} />     </div>}>
                      <div className={`absolute w-4 h-4 right-3 top-3 rounded-full ${card.is_active ? "bg-active" : "bg-red-500"}`} />
                      <div>
                        <span className={"text-base text-accent"}>{card.subtypes.length}</span>
                        <span className={"text-sm text-gray-2 uppercase font-medium ml-2"}> основных услуг</span>
                  </div>
                  </FormCard>)}

            </Panel>
        </Section>
    )
}
export default ServicesPage
