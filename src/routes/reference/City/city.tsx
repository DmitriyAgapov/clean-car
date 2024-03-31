import React, { JSX } from "react";
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelColor, PanelVariant } from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import Button, { ButtonDirectory, ButtonSizeType, ButtonVariant } from 'components/common/ui/Button/Button'
import { useStore } from 'stores/store'
import { Outlet, useLoaderData, useLocation, useNavigate, useParams, useRevalidator, useSearchParams } from "react-router-dom";
import { SvgBackArrow } from 'components/common/ui/Icon'
import { PermissionNames } from "stores/permissionStore";
import DList from "components/common/ui/DList/DList";
import label from "utils/labels";
import agent from "utils/agent";
import { Loader } from "@mantine/core";
import { textDataCities } from "routes/reference/City/cities";

const ReferenceCityPage = ():JSX.Element => {
  const navigate = useNavigate()
  const location = useLocation()
  const store = useStore()
  const params = useParams()
  const {isLoading, data, error} = agent.Catalog.getCityNew(params.id as string)
  console.log(data,'car');
  const items = React.useMemo(() => {

    let itemsAr: JSX.Element[] = []
    const items = function (obj:any) {
        let counter = 0
        for (let key in obj) {
            if (key !== 'id') {

                if (typeof obj[key] === 'boolean') {
                    itemsAr.push(
                        <DList
                            key={key}
                            label={label(key)}
                            title={
                              obj[key] ? (
                                    <span className={'text-accent'}>Активен</span>
                                ) : (
                                    <span className={'text-red-500'}>Неактивен</span>
                                )
                            }
                        />,
                    )
                    counter++
                } else {
                    itemsAr.push(<DList key={key}    label={label(key)} title={obj[key]} />)
                    counter++
                }
            }
        }
    }
    if(data) {
      items(data)
    }

    return <>{itemsAr}</>
  }, [isLoading, data])

  if (location.pathname.includes('edit')) return <Outlet />
  if (location.pathname.includes('create') || location.pathname.includes('edit')) return <Outlet />

  return (
    <Section type={SectionType.default}>
      <Panel variant={PanelVariant.withGapOnly} headerClassName={'flex justify-between'} state={false}
        header={<>
          <div>
            <Button text={<><SvgBackArrow />{textDataCities.createPageBack}</>} className={'flex items-center gap-2 font-medium text-[#606163] hover:text-gray-300 leading-none !mb-4'} action={() => navigate(location.pathname.split('/').slice(0, -1).join('/'))} variant={ButtonVariant.text} />
            <Heading text={textDataCities.referenceTitle} variant={HeadingVariant.h1} className={'inline-block !mb-0'} color={HeadingColor.accent} />
          </div>
        </>}>
      </Panel>
      <Panel
        state={isLoading}
        className={'col-span-full grid grid-rows-[auto_1fr_auto]'}
        variant={PanelVariant.textPadding}
        background={PanelColor.glass}
        bodyClassName={'!pl-44 grid grid-cols-2 items-start content-start gap-8'}
        headerClassName={'flex gap-10'}
        header={
          <>
            <div
              className={'w-24 h-24 flex rounded-full mr-2'}
              style={{ background: 'var(--gradient-directory)' }}
              data-app-type={'admin'}
            >
              <span className={'text-black font-sans uppercase text-3xl leading-none m-auto'}>
                {data?.name[0]}

              </span>
            </div>

            {store.userStore.getUserCan(PermissionNames["Управление пользователями"], 'update') && <Button
              text={'Редактировать'}
              action={() => navigate(location.pathname + '/edit')}
              className={'justify-self-end ml-auto'}
              variant={ButtonVariant.default}
            />}
          </>
        }
      >
        {items}
      </Panel>

    </Section>
  )
}
export default ReferenceCityPage
