import React from 'react'
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelVariant } from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import Button, {  ButtonVariant } from "components/common/ui/Button/Button";
import { useStore } from 'stores/store'
import { Navigate, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import { SvgBackArrow } from 'components/common/ui/Icon'
import { PermissionNames } from "stores/permissionStore";
// import FormCreateUpdateCarBrand from "components/Form/FormCreateCarBrand/FormCreateUpdateCarBrand";
import agent from "utils/agent";
import useSWR from 'swr'
import { observer, useLocalObservable } from 'mobx-react-lite'
import FormCreateUpdateCarBrand from 'components/Form/FormCreateCarBrand/FormCreateUpdateCarBrand'
import { useDidUpdate } from '@mantine/hooks';
import { LocalRootStore, LocalStoreProvider, useLocalStore } from "stores/localStore";

const localRootStore =  new LocalRootStore()

function referenceCarPageUpdate() {
  const localStore = useLocalObservable(() => localRootStore)
  const store = useStore()

  // if(!store.userStore.getUserCan(PermissionNames["Управление справочниками"], 'create')) return <Navigate to={'/account'}/>
  if(!store.userStore.getUserCan(PermissionNames["Управление справочниками"], 'update')) return <Navigate to={'/account'}/>
  const location = useLocation()

  const navigate = useNavigate()
  const params = useParams()
  // @ts-ignore
  const {isLoading, data, mutate} = useSWR([`refCar_${params.id}/edit`, params.id], ([url, id]) => agent.Catalog.getCarModelWithBrand(Number(id)).then((res) => res.data), {   revalidateOnMount: true
  })
  console.log();
  useDidUpdate(
    () => {
      if(location.pathname === `/account/references/car_brands/${params.id}/edit`) {
        mutate()
      }
    },
    [location.pathname]
  );
  React.useEffect(() => {
    if(data) {
      localStore.setData = {
        ...data,
        edit: true
      }
    }
    localStore.setIsLoading = isLoading
  }, [data, isLoading]);
  // if (!location.pathname.includes('edit')) return <Outlet />
  return (
    <Section type={SectionType.default}>
      <Panel variant={PanelVariant.withGapOnly}
        state={isLoading}
        headerClassName={'flex justify-between'}
        header={<><div>
          <Button text={<>
          <SvgBackArrow />{'Назад к списку марок автомобилей'}</>} className={'flex items-center gap-2 font-medium text-[#606163] hover:text-gray-300 leading-none !mb-4'} action={() => navigate(location.pathname.split('/').slice(0, -1).join('/'))} variant={ButtonVariant.text} />
          <Heading text={'Редактировать марку автомобиля'} variant={HeadingVariant.h1} className={'inline-block !mb-0'} color={HeadingColor.accent} />
        </div></>}>
      </Panel>
      <LocalStoreProvider stores={localRootStore}>
         <FormCreateUpdateCarBrand />
      </LocalStoreProvider>
      {/* {!location.pathname.includes('edit') ? textDataCars.createPageForm() : textDataCars.editPageForm(props)} */}

    </Section>
  )
}

export default observer(referenceCarPageUpdate)
