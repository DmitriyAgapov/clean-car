import React, { useEffect, useRef, useState } from 'react'
import styles from "./policy.module.scss"
import Layout from 'components/common/layout/Layout/Layout'
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelColor,  PanelVariant } from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import FormAuth from 'components/Form/FormAuth/FormAuth'
import { useStore } from 'stores/store'
import { observer } from 'mobx-react-lite'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { SvgAuthBg, SvgAuthBgSec, SvgBackArrow } from "components/common/ui/Icon";
import { Box, NavLink, ScrollArea } from '@mantine/core'
import Button, { ButtonSizeType, ButtonVariant } from "components/common/ui/Button/Button";
import { PermissionNames } from "stores/permissionStore";
import { confirmText, policyText, userText } from 'utils/texts'
import { useViewportSize } from '@mantine/hooks'
const links: {
  label: string
  href: string
}[] = [
  {
    label: "Пользовательское соглашение",
    href: 'user_text'
  },
  {
    label: "Политика обработки персональных данных",
    href: 'policy_text'
  },
  {
    label: "Соглашение об обработке персональных данных",
    href: 'confirm_text'
  }
]
function PolicyPage() {
  const store = useStore()
  const texts: {
    user_text: string | TrustedHTML
    policy_text: string | TrustedHTML
    confirm_text: string | TrustedHTML
  } = {
    user_text: userText,
    policy_text: policyText,
    confirm_text: confirmText
  }
  const viewport = useRef<HTMLDivElement>(null);
  const { height, width } = useViewportSize();
  const [active, setActive] = useState('policy_text')
  const navigate = useNavigate()
  const location = useLocation()
  useEffect(() => {
    console.log(location.hash.slice(1));
    if(location.hash.slice(1) !== active) {
      setActive(location.hash.slice(1))
    }
    if(location.hash.slice(1) === "") {
      setActive("policy_text")
    }
  }, [location.hash]);
  const content = React.useMemo(() => {
    viewport.current && viewport.current!.scrollTo({ top: 0, behavior: 'smooth' });
    if (width < 740) {
        return (
            <div
                className={styles.text}
                // @ts-ignore
                dangerouslySetInnerHTML={{ __html: texts[active] }}
            />
        )
    } else {
      return   <ScrollArea.Autosize viewportRef={viewport}  offsetScrollbars={'y'} mah={350}  mx="auto">
        <div
          className={styles.text}
          // @ts-ignore
          dangerouslySetInnerHTML={{ __html: texts[active] }}
        />
      </ScrollArea.Autosize>
    }
  }, [active, width])
  return (
      <Layout className={'page-intro page-intro_policy'}>
          <Section type={SectionType.default} className={"!min-h-full"}>
              <Panel className={'desktop:!col-span-3 desktop:!col-start-12 row-start-2 '}>
                  <Box>
                      {links.map((el: any) => (
                          <NavLink
                              className={''}
                              classNames={{
                                  root: 'hover:bg-transparent hover:!text-active data-[active]:text-accent',
                                  label: ' font-medium !text-base',
                              }}
                              variant='subtle'
                              href={`#${el.href}`}
                              active={el.href === active}
                              // @ts-ignore
                              onClick={() => setActive(() => el.href)}
                              label={el.label}
                          />
                      ))}
                  </Box>
              </Panel>
              <Panel
                  className={'w-full tablet:px-6 tablet:justify-self-center desktop:justify-self-auto'}
                  header={
                      <>
                          <div>
                              <Button
                                  text={
                                      <>
                                          <SvgBackArrow />
                                          Назад
                                      </>
                                  }
                                  className={
                                      'flex flex-[1_100%] items-center gap-2 font-medium text-[#606163] hover:text-gray-300 leading-none !mb-5'
                                  }
                                  action={() => navigate(-1)}
                                  variant={ButtonVariant.text}
                              />
                              <Heading
                                  text={'Политика конфиденциальности'}
                                  variant={HeadingVariant.h1}
                                  className={
                                      'desktop:!text-6xl tablet:!text-4xl mobile:!text-2xl !leading-snug !font-extrabold '
                                  }
                                  color={HeadingColor.accent}
                              />
                          </div>
                      </>
                  }
                  // footer={<LinkStyled text={'У меня нет аккаунта'} to={'/register'} />}
              ></Panel>
              <Panel
                  className={
                      'tablet:justify-self-center !max-h-none desktop:justify-self-auto desktop:!col-span-11 tablet-max:-mx-5 tablet-max:px-2'
                  }
                  variant={PanelVariant.textPadding}
                  background={PanelColor.glass}
              >
                {content}
              </Panel>
          </Section>
          <SvgAuthBg className={'authBg'} />
          <SvgAuthBgSec className={'authBgSec'} />
      </Layout>
  )
}

export default observer(PolicyPage)
