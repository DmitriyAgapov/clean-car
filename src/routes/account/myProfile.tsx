import { useStore } from "stores/store";
import Section, { SectionType } from "components/common/layout/Section/Section";
import Panel, { PanelColor, PanelVariant } from "components/common/layout/Panel/Panel";
import Heading, { HeadingColor, HeadingVariant } from "components/common/ui/Heading/Heading";
import { observer } from "mobx-react-lite";
import { useLocation, useNavigate } from "react-router-dom";
import React from "react";
import DList from "components/common/ui/DList/DList";
import { CompanyType } from "stores/companyStore";
import { UserTypeEnum } from "stores/userStore";
import Button, { ButtonSizeType, ButtonVariant } from "components/common/ui/Button/Button";
import { FileButton, InputBase, TextInput } from '@mantine/core'
import { useForm, yupResolver } from "@mantine/form";
import {  UpdateUserProfileSchema } from "utils/validationSchemas";
import { IMask, IMaskInput } from "react-imask";
import NotificationCC from "components/common/ui/NotificationCC/NotificationCC";
import agent from 'utils/agent'
import { useDisclosure } from "@mantine/hooks";
import { UploadUserPhoto } from "components/common/layout/Modal/UploadUserPhoto";
import ImageCrop from "components/common/ui/Image/ImageCrop";
import Image from "components/common/ui/Image/Image";

const UserProfileEditForm = observer(({action}: {action: (val:boolean) => void }) => {
  const store = useStore()
  const { loading, permissions, user, company, error } = store.userStore.myProfileState;
  const masked = IMask.createMask({
    mask: "+7 000 000 00 00",
    autofix: true,
    // overwrite: true,
    prepare: (appended, masked) => {
      if (appended[0] === '8' && masked.value === "") {
        return appended.slice(1);
      }
      return appended
    },
  });
  const form  = useForm({
    name: 'profileEdit',
    initialValues: {
      first_name: user.first_name,
      last_name: store.userStore.myProfileData.user.last_name,
      phone: user.phone,
      email: user.email,
      bid_visibility: store.userStore.myProfileData.user.bid_visibility,
      is_active: true,
      company_id: store.userStore.myProfileData.company.id,
      group: store.userStore.myProfileData.user.account_bindings[0].group.id ?? 0
    },
    validateInputOnBlur: true,
    onValuesChange: (values, previous) => console.log(values),
    validate: yupResolver(UpdateUserProfileSchema),
  })

  const [opened, { open, close }] = useDisclosure(false)
  const memoModal = React.useMemo(() => {

    return <UploadUserPhoto  id={user.id} opened={opened} onClose={close} />
  }, [opened])
  const handleSubmit = React.useCallback(async () => {
      const response =  await agent.Account.updateCompanyUser(store.userStore.myProfileData.company.id, {id: store.userStore.currentUser.id, ...form.values})

      if(response.status === 200) {
        store.userStore.loadMyProfile().then(() => action(false))
      }
  }, [form.values])
  return (
    <Panel
      footerClassName={
        'tablet-max:child:flex tablet-max:child:flex-col tablet-max:child:w-full tablet-max:child:*:flex-1 tablet-max:child:*:w-full tablet-max:grid tablet-max:gap-4'
      }
      className={'col-span-full grid grid-rows-[auto_1fr_auto]  tablet-max:-mx-6'}
      variant={PanelVariant.textPadding}
      background={PanelColor.glass}
      bodyClassName={'tablet:!pl-44 grid grid-cols-2 items-start content-start gap-x-8 gap-y-2 tablet-max:grid-cols-1 '}
      headerClassName={'flex gap-10'}
      header={
        <>
          <div className={'w-24 h-24 flex rounded-full mr-2'}
            style={{ background: 'var(--gradient-directory)' }}
            data-app-type={'admin'}>
              <span className={'text-black font-sans uppercase text-3xl leading-none m-auto'}>
                {user.first_name[0]}
                {user.last_name[0]}
              </span>
          </div>
          <DList label={'Дата и время регистрации'}
            title={'08.10.23 07:14'} />
        </>
      }
      footer={
      <>
        <Button
          type={'button'}
          text={'Отменить'}
          action={(e) => {
            action(false)
          }}
          className={'mr-auto'}
          variant={ButtonVariant.cancel}
        />
        <FileButton
          // @ts-ignore
          onChange={(event) => {
            store.userStore.onLoadImage(event)
            open()
          }} accept='image/png,image/jpeg'>
          {(props:any) => (
            <Button  {...props} type={"button"}  text={'Загрузить фото'} variant={ButtonVariant["accent-outline"]} className={'button tablet:justify-self-start  tablet-max:-order-1'} >Upload image</Button>
          )}
        </FileButton>
        {/* <Button text={'Загрузить фото'} variant={ButtonVariant["accent-outline"]} className={'tablet:justify-self-start  tablet-max:-order-1'} action={() => { */}
        {/*   store.userStore.onLoadImage() */}
        {/* }}/> */}
        <Button
          type={'button'}
          action={handleSubmit}
          disabled={!form.isValid()}
          text={'Сохранить'}
          className={'float-right tablet-max:-order-1'}
          variant={ButtonVariant.accent}
        />
      </>
    }
    >
    <form style={{display: "grid", gridTemplateColumns: "subgrid", gridColumn: "1/-1"}} onSubmit={handleSubmit}>
      <TextInput label={'Имя'} {...form.getInputProps('first_name')} />
      <TextInput label={'Фамилия'} {...form.getInputProps('last_name')} />
      <InputBase
        {...form.getInputProps('phone')}
        label={'Телефон'}

        component={IMaskInput}
        {...masked}
        placeholder='+7 000 000 0000'
        onPaste={(e) => {
          const numb = e.clipboardData.getData('Text');
          form.setFieldValue('phone', numb)
          return e
        }}
      />
      <TextInput label={'E-mail'} {...form.getInputProps('email')} />

      {memoModal}
    </form>
    </Panel>
  )
})
const MyProfilePage = () => {
  const store = useStore()
  const navigate = useNavigate()
  const location = useLocation()
  const { loading, permissions, user, company, error } = store.userStore.myProfileState;
  const [edit, setEdit] = React.useState(false)
  const userData = React.useMemo(() => {
    const avatar = store.userStore.myProfileData.user.avatar;

    if(user) {
      if(edit) {
        return <UserProfileEditForm action={(val) => setEdit(val)}/>
      }
      return (
        <Panel state={store.usersStore.loadingUsers}
          className={'col-span-full grid grid-rows-[auto_1fr_auto]'}
          variant={PanelVariant.textPadding}
          background={PanelColor.glass}
          bodyClassName={'tablet:!pl-44 grid grid-cols-2 items-start content-start gap-8 tablet-max:grid-cols-1'}
          headerClassName={'flex gap-10'}
          header={
            <>
              <div className={'flex rounded-full mr-2 user__photo'}
                // style={avatar ? {background: `url(${avatar})`, backgroundSize: "cover"} :{ background: 'var(--gradient-directory)' }}
                data-app-type={store.appStore.appType !== "admin" ? (user.company?.company_type === CompanyType.customer || user.company?.company_type === CompanyType.fizlico) ? 'customer' : 'performers' : "admin"}>
                {!avatar ? <span className={'text-black font-sans uppercase text-3xl leading-none m-auto w-24 h-24 '}>
                {user.first_name[0]}
                {user.last_name[0]}
              </span>: <Image src={avatar} alt={''} width={98} height={98} className={'rounded-full aspect-square'} data-directory={store.appStore.appType}/>}
              </div>
              <DList label={'Дата и время регистрации'}
                title={'08.10.23 07:14'} />
            </>
          }>
          <DList label={'Пользователь'}
            title={user.first_name + ' ' + user.last_name} />
          <DList label={'Номер телефона'}
            title={user.phone} />
          <DList label={'E-mail'}
            title={user.email} />
          <DList label={'Тип'}
            title={user.company?.company_type ?? UserTypeEnum.admin}
            directory={store.appStore.appType !== "admin" ? user.company?.company_type === CompanyType.customer ? 'customer' : 'performers' : "admin"} />

          <DList label={'Группа'}
            title={store.userStore.myProfileData.permissionGroupName} />
          <DList

            label={'Статус'}
            title={
              <span className={user.is_active ? 'text-active' : 'text-error'}>
                          {user.is_active ? 'Активный' : 'Не активный'}
                      </span>
            } />
          {company?.id && <hr className={'mt-0 tablet:col-span-2'} />}
          {company?.name && <DList label={'Компания'}
            title={company.name} />}
          {company?.city.name && <DList label={'Город'}
            title={company.city.name} />}
          {company?.parent && <DList label={'Филиал'}
            title={company.parent.name ?? company.name} />}
        </Panel>
      )
    }
      return null
  }, [user, edit])

    return (
      <Section type={SectionType.default} >
        <Panel
          className={'col-span-full'}
          headerClassName={'flex justify-between flex-wrap items-end'}
          header={
            <>

                <Heading
                  text={'Профиль Пользователя'}
                  variant={HeadingVariant.h1}
                  className={'!mb-0 inline-block flex-1'}
                  color={HeadingColor.accent}
                />

             <Button
                text={'Редактировать'}
               size={ButtonSizeType.sm}
                action={() => setEdit(true)}
                className={'inline-flex ml-auto'}

              />
            </>
          }

        />

          {userData}

    </Section>
  )
}

export default observer(MyProfilePage)
