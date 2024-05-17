import React from 'react'
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelColor, PanelVariant } from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import Button, { ButtonSizeType, ButtonVariant } from "components/common/ui/Button/Button";
import { Outlet, useLoaderData, useLocation, useNavigate, useParams } from "react-router-dom";
import { useStore } from 'stores/store'
import { observer } from 'mobx-react-lite'
import { PriceOptionsSVG, SvgBackArrow } from "components/common/ui/Icon";
import DList from 'components/common/ui/DList/DList'
import { PermissionNames } from "stores/permissionStore";
import label from "utils/labels";
import useSWR from "swr";
import { useDidUpdate, useDisclosure } from '@mantine/hooks'
import dayjs from 'dayjs'
import { Box, List} from '@mantine/core'
import SupportModal from "components/common/layout/Modal/SupportModal";

const SupportPage = () => {
  const store = useStore()
  const location = useLocation()
  const navigate = useNavigate()
  // const { user }: any = useLoaderData()
  const [opened, { open, close }] = useDisclosure(false)
  const memoModal = React.useMemo(() => {
    return <SupportModal opened={opened} onClose={close} />
  }, [opened])


  return (
    <Section
      type={SectionType.default}
    >
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
                className={'flex flex-[1_100%] items-center gap-2 font-medium text-[#606163] hover:text-gray-300 leading-none !mb-5'}
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
        bodyClassName={'desktop:grid flex flex-col desktop:grid-cols-2 items-start content-start desktop:gap-8 gap-4'}
        headerClassName={'flex desktop:gap-10 gap-4'}
        footer={ <Button
            action={open}
          type={'button'}
          text={'Написать в службу поддержки'}
          className={'float-right'}
          variant={ButtonVariant.accent}
        />}
      >
        <Box>
          <Heading
            color={HeadingColor.accent}
            variant={HeadingVariant.h2}
            text={'Контакты'}
          />
          <p>Вы можете связаться с нами</p>
        </Box>
        <Box>
          <List spacing={32} >
            <List.Item className={'text-2xl text-accent'}>Cleancar@info.ru</List.Item>
            <List.Item  className={'text-2xl text-accent'}>8 800 444 44 44</List.Item>
          </List>
        </Box>
        <Box className={'col-span-full'}>

          <Heading
            color={HeadingColor.accent}
            variant={HeadingVariant.h2}
            text={'Адрес'}
          />
          <p className={'text-accent'}>Москва, большой проспект N / 1 </p>
          <p>OOO Клин Кар ИНН 274823764 КПП7263767236383 Юридический адрес Москва проспект просвящения 287 43</p>
        </Box>
        {memoModal}

      </Panel>
    </Section>
  )
}

export default observer(SupportPage)
