import { useEffect,  useState } from "react";
import {  Checkbox, ScrollArea } from '@mantine/core'
import styles from './TransferList.module.scss'
import React from 'react'
import Panel, { PanelColor, PanelVariant } from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from "components/common/ui/Heading/Heading";
import { useStore } from "stores/store";
import TableSearch from "components/common/layout/TableWithSort/TableSearch";
import { observer } from "mobx-react-lite";
import { useFormContext } from "components/Form/FormCreateCompany/FormCreateUpdateCompany";
import { LocalRootStore, LocalStoreProvider, TransferComponentStore, TransferStoreProvider,  useTransferStore } from "stores/localStore";
import { Companies } from 'stores/companyStore'
import { SvgSearch } from "components/common/ui/Icon";

interface RenderListProps {
    options?: any
    onTransfer?: (options: string[]) => void
    type: 'forward' | 'backward'
    label: string
}

const RenderList = observer(({ options, onTransfer, type, label }: RenderListProps) => {
    const localStore = useTransferStore()
  const { values, setFieldValue } = useFormContext()
    //@ts-ignore
    const items = options?.filter((item: any) => item?.name?.toLowerCase().includes((localStore.params.getSearchParams.q !== null ? localStore.params.getSearchParams.q : "").toLowerCase().trim())).map((item: any) => (
            //@ts-ignore
            <label key={item.id} htmlFor={'company-' + item.id} className={styles.listItem + ' cursor-pointer'}>
                {item.name}
                <Checkbox
                    value={item}
                    checked={type === 'backward'}
                    id={'company-' + item.id}
                    type={'checkbox'}
                    name={'company-' + item.id}
                    className={'mr-6'}
                    onChange={(props) => {
                        // handleValueSelect(item)
                        type === "forward" ? localStore.moveToSelected(item.id) : localStore.moveToUnSelected(item.id)
                        setFieldValue('performer_company', localStore.getSelected.map((item:any) => item.id))

                        // onTransfer([item])
                    }}
                />
            </label>
        ))

    return (
        <Panel
            variant={PanelVariant.withPaddingSmWithBody}
            background={PanelColor.glass}
            className={'flex-1 w-full rounded-lg'}
            data-type={type}
        >
            <Heading text={label} variant={HeadingVariant.h4} color={HeadingColor.accent} />

          <TableSearch
            action={(e) => {
              localStore.setSearchString(e.target.value)
            }}
            inputProps={{ list: 'availible-list' }}
          />
            <div className={styles.SelectFromListList + ' ' + '!ml-0 mt-5'}>
                <ScrollArea h={160} offsetScrollbars classNames={styles}>
                    {items && items.length > 0 ? items : 'Не найдено....'}
                </ScrollArea>
            </div>
        </Panel>
    )
})

const TransferListComponent = observer(({ active = [] }: { active?: number[] }) => {

    const store = useStore()
    const localStore = useTransferStore<TransferComponentStore>()
    const performers  = store.companyStore.getCompaniesPerformers
    useEffect(() => {
        localStore.loadUnSelected(performers.filter((el:any) => !active.includes(el.id)))
        localStore.loadSelected(performers.filter((el:any) => active.includes(el.id)))
    }, [performers]);

    return (
        <>
            <RenderList
                label={'Доступные компании '}
                type='forward'
                options={localStore.getUnSelected}
                // onTransfer={(options) => handleTransfer(0, options)}
            />
            <RenderList
                label={'Выбранные компании'}
                type='backward'
                options={localStore.getSelected}
                // onTransfer={(options) => handleTransfer(1, options)}
            />
        </>
    )
})
const localStore = new TransferComponentStore()
const TransferListNew = (props:any) => {
	return (	<TransferStoreProvider stores={localStore}>
		<TransferListComponent {...props}/>
  </TransferStoreProvider>)
}
export default TransferListNew
