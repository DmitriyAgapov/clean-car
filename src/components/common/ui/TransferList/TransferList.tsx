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
import { LocalRootStore, LocalStoreProvider, useLocalStore } from "stores/localStore";
import { Companies } from 'stores/companyStore'

interface RenderListProps {
    options: any
    onTransfer: (options: string[]) => void
    type: 'forward' | 'backward'
    label: string
}

const RenderList = observer(({ options, onTransfer, type, label }: RenderListProps) => {
    const [value, setValue] = useState<any[]>([])
    const [search, setSearch] = useState('')

    const handleValueSelect = (val: string) =>
        setValue((current) => (current.includes(val) ? current.filter((v) => v !== val) : [...current, val]))

    //@ts-ignore
    const items = options
        ?.filter((item: any) => item?.name?.toLowerCase().includes(search.toLowerCase().trim()))
        .map((item: any) => (
            //@ts-ignore
            <label key={value.id} htmlFor={'company-' + item.id} className={styles.listItem + ' cursor-pointer'}>
                {item.name}
                <Checkbox
                    value={item}
                    checked={type === 'backward'}
                    id={'company-' + item.id}
                    type={'checkbox'}
                    name={'company-' + item.id}
                    className={' mr-6'}
                    onChange={(props) => {
                        handleValueSelect(item)
                        console.log([item])

                        onTransfer([item])
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
                    setSearch(e.target.value)
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


    const [data, setData] = useState<any[]>([[], []])

    const { values, setFieldValue } = useFormContext()


		useEffect(() => {
			const data = store.companyStore.getCompaniesPerformers;
			console.log(data, 'perfdata');
			if(data.length > 0) setData(prevState => [data, prevState[1]])
		}, [store.companyStore.companiesPerformers.length]);

    const handleTransfer = (transferFrom: number, options: any[]) =>
      setData((current:any) => {
          const transferTo = transferFrom === 0 ? 1 : 0
          const transferFromData = current[transferFrom].filter((item:any) => !options.includes(item))
          const transferToData = [...current[transferTo], ...options]

          const result = []
          result[transferFrom] = transferFromData
          result[transferTo] = transferToData
          return result as [string[], string[]]
      })

		useEffect(() => {

			setFieldValue('performer_company', data[1].map((item:any) => item.id));
		}, [data[1]]);

    return (
        <>
            <RenderList
                label={'Доступные компании '}
                type='forward'
                options={data[0]}
                onTransfer={(options) => handleTransfer(0, options)}
            />
            <RenderList
                label={'Выбранные компании'}
                type='backward'
                options={data[1]}
                onTransfer={(options) => handleTransfer(1, options)}
            />
        </>
    )
})
const localStore = new LocalRootStore()
const TransferList = (props:any) => {
	return (	<LocalStoreProvider stores={localStore}>
		<TransferListComponent {...props}/>
	</LocalStoreProvider>)
}
export default TransferList
