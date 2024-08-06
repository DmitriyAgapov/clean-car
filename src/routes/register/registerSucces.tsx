import React, { useEffect } from 'react'
import Layout from 'components/common/layout/Layout/Layout'
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelColor, PanelVariant } from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingDirectory, HeadingVariant } from 'components/common/ui/Heading/Heading'

import Button, { ButtonDirectory, ButtonSizeType, ButtonVariant } from 'components/common/ui/Button/Button'
import LinkStyled from 'components/common/ui/LinkStyled/LinkStyled'
import { useStore } from 'stores/store'
import SpeedImg from '../../assets/icons/speed.png'
import QualityImg from '../../assets/icons/quality.png'
import ServiceImg from '../../assets/icons/service.png'
import CardFeaturesCircle from 'components/common/layout/Cards/CardFeaturesCircle/CardFeaturesCircle'
import { SvgAuthBgSec } from 'components/common/ui/Icon'
import { useLocation, useParams, useSearchParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

const cardsData = [
  {
    id: 'img-01',
    icon: <SpeedImg />,
    title: 'Скорость',
    text: 'Выполняем все необходимые операции в кратчайшие сроки',
  },
  {
    id: 'img-02',
    icon: <QualityImg />,
    title: 'Качество',
    text: 'Внедряем современные технологии',
  },
  {
    id: 'img-03',
    icon: <ServiceImg />,
    title: 'Сервис',
    text: 'Всегда создаем комфорт для клиентов',
  },
]
function RegisterSuccessPage() {
  const store = useStore()
  let [searchParams, setSearchParams] = useSearchParams();


  useEffect(() => {
    store.appStore.setAppRouteName('.регистрация')
  })
  useEffect(() => {
    const _uids:{
      company_uid?: string
      token?: string
      user_uid?: string
      result?: any
    } | null  = {}
    for(const u of searchParams) {
      if(u[0] === "company_id") {
        // @ts-ignore
        _uids.company_uid = u[1]
      } else {

        // @ts-ignore
        _uids[u[0]] = u[1]
      }
    }
    if(_uids.hasOwnProperty('token')) {
     store.authStore.emailVerify(_uids).then(r => console.log(r))
    }
  }, [searchParams]);
  // @ts-ignore
  return (
    <>
      <Layout
        className={'page-intro'}
        headerContent={
          <Button className={'!hidden tablet:!inline-flex ml-auto mr-8'} text={'Помощь'} variant={ButtonVariant.tech} />
        }
      >
        {store.authStore.isLoggedIn &&  <Section type={SectionType.centered}>
          <Panel
            footerClassName={'mt-16'}
            className={'!col-span-6 mb-12 tablet:!col-span-full desktop:!col-span-6'}
            header={
              <Heading
                className={'desktop:!text-5xl tablet:!text-4xl !leading-snug !font-extrabold '}
                directory={HeadingDirectory.customer}
                // @ts-ignore
                text={`${store.userStore.currentUser?.first_name} ${store.userStore.currentUser?.last_name}, регистрация прошла успешно!`}
                variant={HeadingVariant.h1}
                color={HeadingColor.accent}
              />
            }
            footer={
              <div className={'gap-4 flex flex-wrap'}>
                <LinkStyled
                  text={'В личный кабинет'}
                  directory={ButtonDirectory.customer}
                  variant={ButtonVariant['accent']}
                  size={ButtonSizeType.base}
                  to={'/account/bids'}
                  className={'!mr-2 flex-1 tablet:flex-grow-0 max-w-md'}
                />
                <LinkStyled
                  text={'На сайт'}
                  variant={ButtonVariant['accent-outline']}
                  size={ButtonSizeType.base}
                  to={'/auth'}
                  className={' flex-1 tablet:flex-grow-0 max-w-md'}
                />
              </div>
            }
          >
            <p>
              Приветствуем вас в нашем сервисе. Для вашего удобства, на указанный email направлено письмо с данными для
              входа.{' '}
            </p>
            <p>
              <strong>Приятного пользования!</strong>
            </p>
          </Panel>
         <Panel
            className={
              '!col-span-6 desktop:!col-start-7 desktop:!col-span-6 tablet:!col-start-2 tablet:!col-end-12 tablet:!justify-self-center desktop:!justify-self-auto relative hidden desktop:!block !bg-transparent'
            }
            variant={PanelVariant.textPadding}
            background={PanelColor.default}
          >
            {cardsData.map((c) => (
              <CardFeaturesCircle key={c.id} icon={c.icon} title={c.title} text={c.text} />
            ))}
          </Panel>
        </Section>}
        <SvgAuthBgSec className={'authBgSec success'} />
      </Layout>
    </>
  )
}
export default observer(RegisterSuccessPage)
