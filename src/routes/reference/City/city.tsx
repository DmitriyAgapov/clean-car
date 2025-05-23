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
import { textDataCities } from "routes/reference/City/cities";
import useSWR from "swr";
import { useDidUpdate } from "@mantine/hooks";

const ReferenceCityPage = ():JSX.Element => {
  const store = useStore()
  const navigate = useNavigate()
  const location = useLocation()

  const params = useParams()
  const {isLoading, data, mutate, isValidating} = useSWR(`ref_city_${params.id}`,() => agent.Catalog.getCity(Number(params.id)).then((res) => res.data))
  useDidUpdate(
    () => {
      if(location.pathname === `/account/references/cities/${params.id}`) {
        console.log('mutate');
        mutate()
      }
    },
    [location.pathname]
  );
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
  }, [data])

  if (location.pathname.includes('edit')) return <Outlet />
  if (location.pathname.includes('create') || location.pathname.includes('edit')) return <Outlet />

  return (
    <Section type={SectionType.default}>
      <Panel           className={'col-span-full'}
        headerClassName={'flex justify-between flex-wrap items-end'}
        header={<>
          <div>
            <Button text={<><SvgBackArrow />{textDataCities.createPageBack}</>}  className={'flex flex-[1_100%] items-center gap-2 font-medium text-[#606163] hover:text-gray-300 leading-none !mb-5'} action={() => navigate(location.pathname.split('/').slice(0, -1).join('/'))} variant={ButtonVariant.text} />
            <Heading text={textDataCities.referenceTitle} variant={HeadingVariant.h1}      className={'!mb-0 inline-block flex-1'} color={HeadingColor.accent} />
          </div>
          {store.userStore.getUserCan(PermissionNames["Управление справочниками"], 'update') && <Button
            text={'Редактировать'}
            size={ButtonSizeType.sm}
            action={() => navigate(`${location.pathname}/edit`)}
            className={'inline-flex ml-auto mobile:mt-auto'}

          />}
        </>}>
      </Panel>
      <Panel
        state={isLoading}
        className={'col-span-full grid grid-rows-[auto_1fr_auto] tablet-max:-mx-6'}
        variant={PanelVariant.textPadding}
        background={PanelColor.glass}
        bodyClassName={'desktop:pl-44 desktop:grid flex flex-col desktop:grid-cols-2 items-start content-start desktop:gap-8 gap-4'}
        headerClassName={'flex desktop:gap-10 gap-4'}

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

          </>
        }
      >
        {items}
      </Panel>

    </Section>
  )
}
export default ReferenceCityPage
