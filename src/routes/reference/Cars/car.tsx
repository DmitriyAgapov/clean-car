import React, { JSX } from "react";
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelColor, PanelVariant } from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import Button, {  ButtonSizeType, ButtonVariant } from 'components/common/ui/Button/Button'
import { useStore } from 'stores/store'
import { Outlet, useLocation, useNavigate, useParams, useResolvedPath } from 'react-router-dom'
import { SvgBackArrow } from 'components/common/ui/Icon'
import { PermissionNames } from "stores/permissionStore";
import DList from "components/common/ui/DList/DList";
import label from "utils/labels";
import agent from "utils/agent";
// import { textDataCars } from "routes/reference/Cars/cars";
import useSWR from "swr";
import { useDidUpdate } from '@mantine/hooks'
import { observer } from "mobx-react-lite";

const ReferenceCarPage = ():JSX.Element => {
  const navigate = useNavigate()

  const location = useLocation()

  const store = useStore()
  const params = useParams()


  //TODO Resolved path
  // const path = useResolvedPath(`/${params.id}`)
  // console.log(path);
  const {isLoading, data, mutate} = useSWR([`refCar_${params.id}`, params.id], ([url, id]) => agent.Catalog.getCarModelWithBrand(Number(id)).then((res) => res.data), {
    revalidateOnMount: true
  })
  useDidUpdate(
    () => {
      if(location.pathname === `/account/references/car_brands/${params.id}`) {
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
          modelName: data.name,
      })
    }
    return <>{ itemsAr }</>
  }, [data])
  if (location.pathname.includes('edit')) return <Outlet />
  return (
    <Section type={SectionType.default}>
      <Panel
        // variant={PanelVariant.withGapOnly}
        headerClassName={'flex justify-between flex-wrap items-end'}

        className={'col-span-full'}
        header={<>
          <div>
            <Button
              text={<><SvgBackArrow />Назад к списку марок автомобилей</>}
              className={'flex flex-[1_100%] items-center gap-2 font-medium text-[#606163] hover:text-gray-300 leading-none !mb-5'}
              action={() => navigate(location.pathname.split('/').slice(0, -1).join('/'))} variant={ButtonVariant.text} />
            <Heading text={'Марка автомобиля'} variant={HeadingVariant.h1}      className={'!mb-0 inline-block flex-1'} color={HeadingColor.accent} />
          </div>
          {store.userStore.getUserCan(PermissionNames["Управление автомобилями"], 'update') && <Button
            text={'Редактировать'}
            size={ButtonSizeType.sm}
            action={() => navigate(location.pathname + '/edit')}
            className={'inline-flex ml-auto mobile:mt-auto'}
            // variant={ButtonVariant.default}
          />}
        </>}>
      </Panel>
      <Panel
        state={false}
        className={'col-span-full grid grid-rows-[auto_1fr_auto] tablet-max:-mx-6'}
        variant={PanelVariant.textPadding}
        background={PanelColor.glass}
        bodyClassName={'desktop:pl-44 flex desktop:grid  flex-col desktop:grid-cols-2 items-start content-start desktop:gap-8 gap-4'}
        headerClassName={'flex  flex-col tablet_flex-row desktop:gap-10 gap-4'}
        header={
          <>
            <div
              className={'w-24 h-24 flex rounded-full mr-2'}
              style={{ background: 'var(--gradient-directory)' }}
              data-app-type={'admin'}
            >
              <span className={'w-24 h-24 flex text-black font-sans uppercase text-3xl leading-none items-center justify-center'}>
                {data?.brand.name ? data?.brand.name[0] : data?.name[0]}
                {data?.name ? data?.name[1] : data?.modelName[0]}

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
export default observer(ReferenceCarPage)
