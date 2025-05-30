import React from 'react'
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import { SvgBackArrow } from 'components/common/ui/Icon'
import Button, { ButtonDirectory, ButtonSizeType, ButtonVariant } from 'components/common/ui/Button/Button'
import { Navigate, useLoaderData, useLocation, useNavigate, useParams } from "react-router-dom";
import 'yup-phone-lite'
import FormCreateUser from 'components/Form/FormCreateUser/FormCreateUser'
import { useStore } from "stores/store";
import { observer } from "mobx-react-lite";
import { PermissionNames } from "stores/permissionStore";
import FormCreateUpdateUsers from "components/Form/FormCreateUpdateUsers/FormCreateUpdateUsers";
import useSWR from "swr";

const UsersPageEditAction = () => {
  const store = useStore()
  const navigate = useNavigate()
  const params = useParams()
  const {isLoading, data, mutate}:any = useSWR(`users_${params.company_id}_${params.id}`,() => store.usersStore.userLoader({company_type : params.company_type, id:Number(params.id), company_id:Number(params.company_id)}))

  if(!store.userStore.getUserCan(PermissionNames["Управление пользователями"], 'update')) return <Navigate to={'/account'}/>
  return (
      <Section type={SectionType.default}>
          <Panel
              className={'col-span-full'}
              headerClassName={'tablet:flex justify-between flex-wrap'}
              header={
                  <>
                      <Button
                          text={
                              <>
                                  <SvgBackArrow />
                                  Назад к списку пользователей{' '}
                              </>
                          }
                          className={
                              'flex flex-[1_100%] items-center gap-2 font-medium text-[#606163] hover:text-gray-300 leading-none !mb-4'
                          }
                          action={() => navigate('/account/users')}
                          variant={ButtonVariant.text}
                      />
                      <Heading
                          text={'Редактировать пользователя'}
                          variant={HeadingVariant.h1}
                          className={'tablet:!mb-0 inline-block mr-auto flex-1'}
                          color={HeadingColor.accent}
                      />
                    {/* {store.appStore.appType === "admin" && <div className={'flex gap-8 tablet-max:max-w-96'}><Button */}
                    {/*   text={'Скачать шаблон'} */}
                    {/*   variant={ButtonVariant["accent-outline"]} */}
                    {/*   action={() => navigate('/account/users/create')} */}
                    {/*   className={'inline-flex tablet-max:flex-1'} */}
                    {/*   size={ButtonSizeType.sm} */}
                    {/* /> */}
                    {/*   <Button */}
                    {/*     text={'Загрузить файл'} */}
                    {/*     action={() => navigate('/account/users/create')} */}
                    {/*     className={'inline-flex tablet-max:flex-1'} */}
                    {/*     directory={ButtonDirectory.directory} */}
                    {/*     size={ButtonSizeType.sm} */}
                    {/*   /> */}
                    {/* </div>} */}
                  </>
              }
          ></Panel>

        {!isLoading && <FormCreateUpdateUsers user={{ ...data, company_type: params.company_type, ...{} }} edit={true} />}
      </Section>
  )
}
export default observer(UsersPageEditAction)
