import React, { JSX } from "react";
import Section, { SectionType } from 'components/common/layout/Section/Section'
import Panel, { PanelColor, PanelVariant } from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import Button, { ButtonDirectory, ButtonSizeType, ButtonVariant } from 'components/common/ui/Button/Button'
import { useStore } from 'stores/store'
import { Outlet, useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { SvgBackArrow } from 'components/common/ui/Icon'
import Checkbox from 'components/common/ui/Checkbox/Checkbox'
import { PermissionNames } from "stores/permissionStore";
import DList from "components/common/ui/DList/DList";

const ReferencePage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const store = useStore()
  const { data, textData }: any = useLoaderData()

  const memoizedData = React.useMemo(() => {
      let itemsAr: any[] = []
      const items = function () {
          let counter = 0
          for (let key in data.results) {
              if(key !== 'id')  {
                if(typeof data.results[key] === "boolean") {
                  itemsAr.push(<DList key={key} label={textData.labelsForItem[counter]}
                    title={data.results[key] ? <span className={'text-accent'}>Активен</span> : <span className={'text-red-500'}>Неактивен</span>} />)
                    counter++
                } else {
                  itemsAr.push(<DList  key={key} label={textData.labelsForItem[counter]}
                    title={data.results[key]} />)
                  counter++
                }
              }

          }
      }
      items()
      return itemsAr
  }, [data.results])
  if (location.pathname.includes('edit')) return <Outlet />
  if (location.pathname.includes('create') || location.pathname.includes('edit')) return <Outlet />
  return (
    <Section type={SectionType.default}>
      {/* <Panel variant={PanelVariant.withGapOnly} headerClassName={'flex justify-between'} state={false} */}
      {/*   header={<> */}
      {/*     <div> */}
      {/*       <Button text={<><SvgBackArrow />{textData.createPageBack}</>} className={'flex items-center gap-2 font-medium text-[#606163] hover:text-gray-300 leading-none !mb-4'} action={() => navigate(-1)} variant={ButtonVariant.text} /> */}
      {/*       <Heading text={textData.referenceTitle} variant={HeadingVariant.h1} className={'inline-block !mb-0'} color={HeadingColor.accent} /> */}
      {/*     </div> */}
      {/*   </>}></Panel> */}
      <Panel
        state={store.usersStore.loadingUsers}
        className={'col-span-full grid grid-rows-[auto_1fr_auto]'}
        variant={PanelVariant.textPadding}
        background={PanelColor.glass}
        bodyClassName={'!pl-44 grid grid-cols-2 items-start content-start gap-8'}
        headerClassName={'flex gap-10'}
        header={
          <>
            <div
              className={'w-24 h-24 flex rounded-full mr-2'}
              style={{ background: 'var(--gradient-directory)' }}
              data-app-type={'admin'}
            >
              <span className={'text-black font-sans uppercase text-3xl leading-none m-auto'}>
                {data.results.name[0]}
                {data.results.name[1]}
              </span>
            </div>

            {store.userStore.getUserCan(PermissionNames["Управление пользователями"], 'update') && <Button
              text={'Редактировать'}
              action={() => navigate(location.pathname + '/edit')}
              className={'justify-self-end ml-auto'}
              variant={ButtonVariant.default}
            />}
          </>
        }
      >
        {memoizedData}
      </Panel>

    </Section>
  )
}
export default ReferencePage
