import React from 'react'
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelVariant } from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import Button, {  ButtonVariant } from "components/common/ui/Button/Button";
import { useStore } from 'stores/store'
import { Navigate, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import { SvgBackArrow } from 'components/common/ui/Icon'
import { PermissionNames } from "stores/permissionStore";
import { textDataCars } from "routes/reference/Cars/cars";
import FormCreateUpdateCarBrand from "components/Form/FormCreateCarBrand/FormCreateUpdateCarBrand";
import agent from "utils/agent";
import useSWR from 'swr'
import { observer, useLocalObservable } from 'mobx-react-lite'
import { LocalRootStore, LocalStoreProvider } from 'stores/localStore'
const localRootStore =  new LocalRootStore()
function ReferenceCarPageCreate() {
  const localStore = useLocalObservable<any>(() => localRootStore)
  const store = useStore()

  if(!store.userStore.getUserCan(PermissionNames["Управление справочниками"], 'create')) return <Navigate to={'/account'}/>
  // if(props.edit && !store.userStore.getUserCan(PermissionNames["Управление справочниками"], 'update')) return <Navigate to={'/account'}/>
  const location = useLocation()

  const navigate = useNavigate()
  const params = useParams()
  // @ts-ignore
  // const {isLoading, data, mutate} = useSWR(props.edit ? [`refCar_${params.id}/edit`, params.id as string | undefined] : [`refCar_create`], ([url, id]) => id ? agent.Catalog.getCarModelWithBrand(Number(id)).then((res) => res.data): null)
  React.useEffect(() => {

      localStore.setData = {
        edit: false
      }
    localStore.setIsLoading = false
  }, []);
  // if (!location.pathname.includes('edit')) return <Outlet />
  return (
    <Section type={SectionType.default}>
      <Panel variant={PanelVariant.withGapOnly}
        state={false}
        headerClassName={'flex justify-between'}
        header={<><div>
          <Button text={<>
          <SvgBackArrow />{textDataCars.createPageBack}</>} className={'flex items-center gap-2 font-medium text-[#606163] hover:text-gray-300 leading-none !mb-4'} action={() => navigate(location.pathname.split('/').slice(0, -1).join('/'))} variant={ButtonVariant.text} />
          <Heading text={textDataCars.createPage} variant={HeadingVariant.h1} className={'inline-block !mb-0'} color={HeadingColor.accent} />
        </div></>}>
      </Panel>
      <LocalStoreProvider stores={localRootStore}>
        <FormCreateUpdateCarBrand/>
      </LocalStoreProvider>
      {/* {!location.pathname.includes('edit') ? textDataCars.createPageForm() : textDataCars.editPageForm(props)} */}

    </Section>
  )
}

export default observer(ReferenceCarPageCreate)
