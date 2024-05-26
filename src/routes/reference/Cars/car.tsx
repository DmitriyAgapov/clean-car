import React, { JSX } from "react";
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelColor, PanelVariant } from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import Button, { ButtonDirectory, ButtonSizeType, ButtonVariant } from 'components/common/ui/Button/Button'
import { useStore } from 'stores/store'
import {
    Outlet,
    useLoaderData,
    useLocation,
    useNavigate,
    useParams,
    useResolvedPath,
    useRevalidator,
    useSearchParams,
} from 'react-router-dom'
import { SvgBackArrow } from 'components/common/ui/Icon'
import { PermissionNames } from "stores/permissionStore";
import DList from "components/common/ui/DList/DList";
import label from "utils/labels";
import agent from "utils/agent";
import { Loader } from "@mantine/core";
import { textDataCars } from "routes/reference/Cars/cars";
import useSWR from "swr";
import { useDidUpdate } from "@mantine/hooks";

const ReferenceCarPage = ():JSX.Element => {
  const navigate = useNavigate()

  const location = useLocation()
  const store = useStore()
  const params = useParams()
  //TODO Resolved path
  // const path = useResolvedPath(`/${params.id}`)
  // console.log(path);
  const {isLoading, data, mutate} = useSWR([`refCar_${params.id}`, params.id], ([url, id]) => agent.Catalog.getCarModelWithBrand(Number(id)).then((res) => res.data))
  useDidUpdate(
    () => {
      if(location.pathname === `/account/references/car_brands/${params.id}`) {
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
      items({
        id: data.id,
        brand: data.brand.name,
        car_type: data.car_type,
        modelName: data.name
      })
    }
    return <>{itemsAr}</>
  }, [data])

  if (location.pathname.includes('edit')) return <Outlet />
  if (location.pathname.includes('create') || location.pathname.includes('edit')) return <Outlet />

  return (
    <Section type={SectionType.default}>
      <Panel variant={PanelVariant.withGapOnly} headerClassName={'flex justify-between'} state={false}
        header={<>
          <div>
            <Button text={<><SvgBackArrow />{textDataCars.createPageBack}</>} className={'flex items-center gap-2 font-medium text-[#606163] hover:text-gray-300 leading-none !mb-4'} action={() => navigate(location.pathname.split('/').slice(0, -1).join('/'))} variant={ButtonVariant.text} />
            <Heading text={textDataCars.referenceTitle} variant={HeadingVariant.h1} className={'inline-block !mb-0'} color={HeadingColor.accent} />
          </div>
        </>}>
      </Panel>
      <Panel
        state={isLoading}
        className={'col-span-full grid grid-rows-[auto_1fr_auto]  tablet-big-max:-mx-5'}
        variant={PanelVariant.textPadding}
        background={PanelColor.glass}
        bodyClassName={'desktop:pl-44 desktop:grid flex flex-col desktop:grid-cols-2 items-start content-start desktop:gap-8 gap-4'}
        headerClassName={'flex flex-col tablet_flex-row gap-10'}
        footer= {store.userStore.getUserCan(PermissionNames["Управление пользователями"], 'update') && <Button
          text={'Редактировать'}
          action={() => navigate(location.pathname + '/edit')}
          className={'justify-self-end ml-auto tablet-max:!flex'}
          variant={ButtonVariant.default}
        />}
        header={
          <>
            <div
              className={'w-24 h-24 flex rounded-full mr-2'}
              style={{ background: 'var(--gradient-directory)' }}
              data-app-type={'admin'}
            >
              <span className={'text-black font-sans uppercase text-3xl leading-none m-auto'}>
                {data?.brand.name ? data?.brand.name[0] : data?.name[0]}
                {data?.name ? data?.name[1] : data?.modelName[0]}

              </span>
            </div>

            {store.userStore.getUserCan(PermissionNames["Управление пользователями"], 'update') && <Button
              text={'Редактировать'}
              action={() => navigate(location.pathname + '/edit')}
              className={'justify-self-end ml-auto tablet-max:!hidden'}
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
export default ReferenceCarPage
