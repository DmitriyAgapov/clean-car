import React, { useState } from 'react'
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelColor, PanelVariant } from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import Button, { ButtonSizeType, ButtonVariant } from "components/common/ui/Button/Button";
import { Outlet, useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { useStore } from 'stores/store'
import { observer } from 'mobx-react-lite'
import { IconTinkoff, PriceOptionsSVG, SvgBackArrow } from "components/common/ui/Icon";
import {  useDisclosure } from '@mantine/hooks'

import { Box, List, rem } from '@mantine/core'
import SupportModal from "components/common/layout/Modal/SupportModal";
import DList from "components/common/ui/DList/DList";

const SupportPage = () => {
  const store = useStore()
  const location = useLocation()
  const navigate = useNavigate()

  const [opened, { open, close }] = useDisclosure(false)
  const memoModal = React.useMemo(() => {
    return <SupportModal opened={opened} onClose={close}/>
  }, [opened])


  return (
      <Section type={SectionType.default}>
          <Panel
              className={'col-span-full'}
              headerClassName={'flex justify-between flex-wrap items-end'}
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
                              action={() => navigate('/account/users')}
                              variant={ButtonVariant.text}
                          />
                          <Heading
                              text={'Служба поддержки'}
                              variant={HeadingVariant.h1}
                              className={'!mb-0 inline-block flex-1'}
                              color={HeadingColor.accent}
                          />
                      </div>
                  </>
              }
          />
          <Panel
              className={'col-span-full grid grid-rows-[1fr_auto] tablet-max:-mx-6'}
              variant={PanelVariant.textPadding}
              background={PanelColor.glass}
              bodyClassName={
                  'desktop:grid flex flex-col desktop:grid-cols-2 items-start content-start desktop:gap-8 gap-4'
              }
              headerClassName={'flex desktop:gap-10 gap-4'}
              footer={
                  <Button
                      action={open}
                      type={'button'}
                      text={'Написать нам'}
                      className={'float-right'}
                      variant={ButtonVariant.accent}
                  />
              }
          >
              <Box>
                  <Heading color={HeadingColor.accent} variant={HeadingVariant.h2} text={'Контакты'} />
                  <p>Вы можете связаться с нами</p>
              </Box>
              <Box>
                  <List spacing={32}>
                    <List.Item className={'text-2xl text-accent'}><a href={"mailto:info@clean-car.net"}>info@clean-car.net</a></List.Item>
                    <List.Item className={'text-2xl text-accent'}><a href={"tel:+74991309595"}>+7 499 130 95 95</a></List.Item>
                  </List>
              </Box>
              <Box className={'col-span-full'}>
                  <Heading color={HeadingColor.accent} variant={HeadingVariant.h2} text={'Адрес'} />
                  <p className={'text-accent'}>127106, РОССИЯ, Г МОСКВА, ПРОЕЗД НОВОВЛАДЫКИНСКИЙ, Д 12А, ЭТ 3, ПОМ 5</p>
                  <p className={'text-gray-2'}>ООО "КЛИНКАР" ИНН 7702464454 КПП 771501001 ОГРН 1197746158752</p>
                  {/* <DList label={<Heading color={HeadingColor.accent} variant={HeadingVariant.h3} text={'Адрес'} />} title={'ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ "КЛИНКАР"'} className={'mb-4'}/> */}
                  {/* <DList  label={<Heading color={HeadingColor.accent} variant={HeadingVariant.h3} text={'Юридический адрес'} />}  title={'127106, РОССИЯ, Г МОСКВА, ПРОЕЗД НОВОВЛАДЫКИНСКИЙ, Д 12А, ЭТ 3, ПОМ 5'}  className={'mb-4'}/> */}
                  {/* <DList  label={<Heading color={HeadingColor.accent} variant={HeadingVariant.h3} text={'ИНН'} />} title={'7702464454'}  className={'mb-4'}/> */}
                  {/* <DList  label={<Heading color={HeadingColor.accent} variant={HeadingVariant.h3} text={'ОГРН'} />} title={'1197746158752'}  className={'mb-4'}/> */}
                  {/* <ul> */}
                  {/*     <li>Название организации: ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ "КЛИНКАР"</li> */}

                  {/*     <li> */}
                  {/*         Юридический адрес организации: 127106, РОССИЯ, Г МОСКВА, ПРОЕЗД НОВОВЛАДЫКИНСКИЙ, Д 12А, ЭТ 3 */}
                  {/*         ПОМ 5 */}
                  {/*     </li> */}
                  {/*     <li>ИНН: 7702464454</li> */}
                  {/*     /!* <li>КПП: 771501001</li> *!/ */}
                  {/*     <li>ОГРН: 1197746158752</li> */}
                  {/*     /!* <li>Расчетный счет: 40702810310000813103</li> *!/ */}
                  {/*     /!* <li>Банк: АО "ТИНЬКОФФ БАНК"</li> *!/ */}
                  {/*     /!* <li>ИНН банка: 7710140679</li> *!/ */}
                  {/*     /!* <li>БИК : 044525974</li> *!/ */}
                  {/*     /!* <li>Корреспондентский счет банка : 30101810145250000974</li> *!/ */}
                  {/*     /!* <li>Юридический адрес банка : Москва, 127287, ул. Хуторская 2-я, д. 38А, стр. 26</li> *!/ */}
                  {/* </ul> */}
                  <IconTinkoff
                      style={{ width: rem(80), height: rem(80) }}
                      stroke={1.5}
                      color='var(--mantine-color-blue-filled)'
                  />
              </Box>
              {memoModal}
          </Panel>
      </Section>
  )
}

export default observer(SupportPage)
