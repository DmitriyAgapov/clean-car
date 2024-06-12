import React, { useEffect } from 'react'
import Layout from 'components/common/layout/Layout/Layout'
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelColor, PanelVariant } from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import { useStore } from 'stores/store'
import LinkStyled from 'components/common/ui/LinkStyled/LinkStyled'
import { observer } from 'mobx-react-lite'
import Button, { ButtonDirectory, ButtonSizeType, ButtonVariant } from "components/common/ui/Button/Button";
import { SvgAuthBg, SvgAuthBgSec } from 'components/common/ui/Icon'
import FormRestore from 'components/Form/FormRestore/FormRestore'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useForm, yupResolver } from '@mantine/form'
import agent from 'utils/agent'
import { PasswordInput, TextInput } from '@mantine/core'
import { RestorePasswordNewSchema, SignupSchemaNew } from "utils/validationSchemas";

function RestorePasswordNewPage() {
  const store = useStore()
  let [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate()
  const formData = useForm({
    name: "newPasswordForm",
    initialValues: {
      user_uid: '',
      token: '',
      password: '',
      password2: ''
    },
    validate: yupResolver(RestorePasswordNewSchema),
  })
  useEffect(() => {
    if(searchParams.size > 0) {
      const _user_uid = searchParams.get('user_uid')
      const _token = searchParams.get('token');
      if(_token) formData.setFieldValue('token', _token)
      if(_user_uid) formData.setFieldValue('user_uid', _user_uid)
    }
  }, []);
  console.log(formData.values);
  console.log(store.userStore.currentUser);
  return (
      <Layout
          className={'page-intro'}
          headerContent={
              <Button
                  className={'!hidden tablet:!inline-flex ml-auto mr-8'}
                  text={'Помощь'}
                  variant={ButtonVariant.tech}
              />
          }
      >
          <Section type={SectionType.centered}>
              <Panel
                className={'!col-span-6  desktop-max:!col-span-full w-full max-w-lg  tablet:px-6 tablet:justify-self-center desktop:justify-self-auto'}
                header={
                  <Heading
                    text={'Восстановление пароля'}
                    className={'desktop:!text-6xl tablet:!text-4xl !leading-tight !font-bold'}
                    variant={HeadingVariant.h1}
                    color={HeadingColor.accent}
                  />
                }
              >
                  <p>
                      <strong>Пожалуйста, введите вашу почту, которую вы оставляли при регистрации.</strong> Мы отправим
                      вам письмо с активной ссылкой для смены пароля.{' '}
                  </p>
              </Panel>
              {!store.authStore.userIsLoggedIn ? (
                <Panel
                  bodyClassName={'!py-12'}
                  className={
                    'desktop:!col-start-8 desktop:!col-span-7 desktop:m-8 !tablet:col-start-2 !tablet:col-end-12 tablet:justify-self-center desktop:justify-self-auto w-full max-w-screen-sm tablet:py-12 tablet:px-6'
                  }
                  variant={PanelVariant.textPadding}
                  background={PanelColor.glass}
                >
                      <form className={'grid gap-4'}>
                          <PasswordInput
                              {...formData.getInputProps('password')}
                              label={'Придумайте новый пароль'}
                              size={'lg'}
                          />
                          <PasswordInput
                              {...formData.getInputProps('password2')}
                              label={'Повторите пароль'}
                              size={'lg'}
                          />

                          <Button
                              type={'button'}
                              text={'сохранить'}
                              disabled={!formData.isValid()}
                              action={() =>
                                  agent.Account.accountNewPassword(formData.values).then((r) => navigate(`/`),
                                )
                              }
                              size={ButtonSizeType.lg}
                              variant={ButtonVariant.accent}
                          />
                      </form>
                  </Panel>
              ) : (
                  <Panel
                      className={
                          'col-span-6 desktop:col-start-9 desktop:col-span-6  tablet:col-start-2 tablet:col-end-12 tablet:justify-self-center desktop:justify-self-auto w-full max-w-2xl'
                      }
                      footer={
                          <>
                              <Button text={'Logout'} action={() => store.authStore.logout()} />
                              <LinkStyled
                                  text={'в личный кабинет'}
                                  variant={ButtonVariant.accent}
                                  directory={ButtonDirectory.customer}
                                  to={'/register/success'}
                              />
                          </>
                      }
                  >
                      UserId: <h4>{store.userStore.currentUser?.id}</h4>
                  </Panel>
              )}
          </Section>
          <SvgAuthBg className={'authBg'} />
          <SvgAuthBgSec className={'authBgSec'} />
      </Layout>
  )
}

export default observer(RestorePasswordNewPage)
