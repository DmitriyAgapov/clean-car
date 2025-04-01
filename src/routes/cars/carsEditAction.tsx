import React from 'react'
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import { SvgBackArrow } from 'components/common/ui/Icon'
import Button, { ButtonDirectory, ButtonSizeType, ButtonVariant } from 'components/common/ui/Button/Button'
import { Navigate, useLoaderData, useNavigate, useParams } from "react-router-dom";
import 'yup-phone-lite'
import { useStore } from "stores/store";
import { PermissionNames } from "stores/permissionStore";
import LinkStyled from "components/common/ui/LinkStyled/LinkStyled";
import FormCreateUpdateCar from "components/Form/FormCreateCar/FormCreateUpdateCar";
import { observer } from "mobx-react-lite";
import useSWR from "swr";

const CarsPageEditAction = () => {
  const store = useStore()
  const navigate = useNavigate()
  // const { data, page, pageRequest, textData, company_type }: any = useLoaderData()
  // const values = data.results

  const params = useParams()
  const {isLoading, data, mutate}:any = useSWR(`car_${params.company_id}`,() => store.carStore.getCarByCompanyId(String(params.company_id), Number(params.id)))

  React.useEffect(() => {
    store.catalogStore.getAllCities()
    store.usersStore.clearSelectedUsers()
    store.formStore.formClear('formCreateCar')
    store.carStore.setBrand(data?.model.brand);
    store.usersStore.getUsers(data?.company.id);
    data?.employees.forEach((i:any) => {
      store.usersStore.addToSelectedUsers(i.id);
    })
  }, [])
  if(!store.userStore.getUserCan(PermissionNames["Управление автомобилями"], 'update')) return <Navigate to={'/account'}/>

  return (
      <Section type={SectionType.default}>
          <Panel
              state={isLoading}
              className={'col-span-full'}
              headerClassName={'tablet:flex justify-between flex-wrap'}
              header={
                  <>
                      <LinkStyled
                          text={
                              <>
                                  <SvgBackArrow />
                                  Назад к списку автомобилей{' '}
                              </>
                          }
                          className={
                              'flex flex-[1_100%] items-center gap-2 font-medium text-[#606163] hover:text-gray-300 leading-none !mb-4'
                          }
                          to={location.pathname.split('/').slice(0, -1).join('/')}
                          variant={ButtonVariant.text}
                      />

                      <Heading
                          text={'Редактировать автомобиль'}
                          variant={HeadingVariant.h1}
                          className={'!mb-0 inline-block mr-auto flex-1'}
                          color={HeadingColor.accent}
                      />

                          {store.appStore.appType === 'admin' && (
                            <div className={" tablet-max:mt-4"}>

                              <Button text={"Скачать шаблон"}
                                variant={ButtonVariant["accent-outline"]}
                                href={"/account/cars/create"}
                                className={"inline-flex mr-5"}
                                size={ButtonSizeType.sm} />
                              <LinkStyled text={"Загрузить файл"}
                                to={"/account/cars/create"}
                                className={"inline-flex mr-5"}
                                directory={ButtonDirectory.directory}
                                size={ButtonSizeType.sm} />
                            </div>
                          )}

                </>
              }
          ></Panel>

          {!isLoading && (
              <FormCreateUpdateCar
                  edit={true}
                  car={{
                      id: params.id,
                      number: data?.number,
                      height: data?.height,
                      radius: data?.radius,
                      city: String(data?.company.city.id),
                      company_id: String(data?.company.id),
                      company_type: data?.company.company_type,
                      is_active: data?.is_active ? 'true' : 'false',
                      depend_on: data?.company.parent === null ? 'company' : 'filials',
                      brand: String(data?.model.brand),
                      model: String(data?.model.id),
                      car_type: data?.model.car_type,
                      employees: data?.employees.map((e: any) => e.id),
                  }}
              />
          )}
      </Section>
  )
}
export default observer(CarsPageEditAction)
