import React from 'react'
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelColor, PanelVariant } from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import { SvgBackArrow } from 'components/common/ui/Icon'
import Button, { ButtonVariant } from 'components/common/ui/Button/Button'
import { useNavigate } from 'react-router-dom'
import 'yup-phone-lite'

export default function UsersPageCreateAction() {
  const navigate = useNavigate()

  return (
    <Section type={SectionType.default}>
      <Panel
        className={'col-span-full'}
        header={
          <>
            <Button
              text={
                <>
                  <SvgBackArrow />
                  Назад к списку пользователей{' '}
                </>
              }
              className={'flex items-center gap-2 font-medium text-[#606163] hover:text-gray-300 leading-none !mb-7'}
              action={() => navigate(-1)}
              variant={ButtonVariant.text}
            />
            <Heading
              text={'Добавить пользователя'}
              variant={HeadingVariant.h1}
              className={'!mb-0 inline-block'}
              color={HeadingColor.accent}
            />
          </>
        }
      ></Panel>
      <Panel
        className={'col-span-full  grid grid-rows-[1fr_auto]'}
        variant={PanelVariant.withPadding}
        footer={
          <div className={'accounts-group_header gap-4 text-[#606163] grid grid-cols-[1.25fr_2fr] grid- font-medium'}>
            <div className={'flex col-start-2 justify-end gap-5'}>
              <Button
                text={'Отменить'}
                action={() => navigate(-1)}
                className={'float-right'}
                variant={ButtonVariant['accent-outline']}
              />
              <Button
                text={'Сохранить'}
                action={async () => {
                  // @ts-ignore
                  // await store.permissionStore.createPermissionStoreAdmin(changes);
                  // setTimeout(() => navigate('/account/groups'), 500);
                  // navigate('/account/groups')
                }}
                className={'float-right'}
                variant={ButtonVariant.accent}
              />
            </div>
          </div>
        }
        background={PanelColor.glass}
      ></Panel>
    </Section>
  )
}
