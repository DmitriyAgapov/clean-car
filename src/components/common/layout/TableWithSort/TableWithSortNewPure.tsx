import React, {  useState } from "react";
import styles from "./TableWithSort.module.scss";
import Panel, { PanelColor, PanelProps, PanelRouteStyle, PanelVariant } from "components/common/layout/Panel/Panel";
import { SvgChevron } from "components/common/ui/Icon";
import label from "utils/labels";
import { useViewportSize } from '@mantine/hooks'
import Heading, { HeadingVariant } from "components/common/ui/Heading/Heading";
import { NumberInput, Table } from "@mantine/core";
import { number } from "yup";
import { useStore } from "stores/store";
import { observer } from "mobx-react-lite";
type TableWithSortProps = {
    data?: any[]
    state: boolean
    className?: string
    background?: PanelColor
    ar: { label: string, name: string }[]
    style?: PanelRouteStyle
    search?: boolean
    initFilterParams?: {}
    total: number
    filter?: boolean
    offsetSticky?: number
    pageSize?: number
    variant?: PanelVariant
    edit?: boolean
    meta?: {
      company_id: string | number
      price_id: string | number
      label: string
    }
} & PanelProps

const RowHeadingPure = ({ ar,total }: any) => {
    return (
      <Table.Thead>
          <Table.Tr className={styles.tableRowPure + ' tableheader'}>
              {ar.map((arItem: { label: string, name: string }, index: number) => {
                  return (
                    <Table.Th
                      key={`rh-${index}`}
                      className={styles.tableheadingPure}
                    >
                        <div style={{ display: 'flex' }}>
                            <span>{arItem.label}</span>
                        </div>
                    </Table.Th>
                  )
              })}
          </Table.Tr>
      </Table.Thead>
    )
}

const RowDataPure = observer(({edit, meta, ...props}: any) => {
    const isSingle = Object.keys(props).length <= 2
    const store = useStore()

    const type = (() => {
      let _type:string = ""
      if(meta?.label) {
        switch (meta?.label) {
          case "Мойка":
            _type = "w_"
            break;
          case "Эвакуация":
            _type = "evac_"
            break;
          case "Шиномонтаж":
            _type = "tire_"
            break
        }
      }
      return _type
    })()

    const {width} = useViewportSize()
    const [open, setOpen] = useState(false);
  // console.log(props);
    const propsRender = React.useMemo(() => {
        const ar = []
        for (const key in props) {
          const priceValue = typeof props[key] === 'number' || props[key]?.toString().includes('%')

          if(key !== 'id' && key !== 'is_percent') {
            ar.push(
                <Table.Td key={key} className={styles.tableCellPure + ' ' + `${priceValue  ? '!pl-0 !pr-1' : ''}`} onClick={(event: any)  => (edit && typeof props[key] === 'number') && event.stopPropagation()} style={priceValue ? {width: 'calc(5rem * var(--mantine-scale))'} : (key === "service_option" && props[key] === "") ? {opacity: 0, border: 0, padding: 0} : {}} data-pricevalue={priceValue} data-label={label(key)}>
                    {edit && typeof props[key] === 'number' ? (
                        <NumberInput
                          data-id={props.id}
                          w={72}
                          className={'!pb-0'}
                          // thousandSeparator=" "
                          hideControls
                          classNames={{
                          input: 'h-4 min-h-8 px-1.5 text-xs ',
                            root: ''
                          }}

                          min={0}
                          max={999999999999}
                          onChange={(value) => {
                            return store.priceStore.handleChangeAmount({type: type, amount: value !== "" ? value : 0, id: props.id, initValue: props[key] === value, ...meta})
                          }}
                          suffix={props.is_percent ? " %" : " ₽"}
                          // decimalScale={2}
                          // fixedDecimalScale
                          value={store.priceStore.priceOnChange.get(`${type}_${props.id.toString()}`)?.amount ? store.priceStore.priceOnChange.get(`${type}_${props.id.toString()}`).amount : props[key]}

                        />
                    ) : (
                        <p className={`m-0 ${priceValue && 'text-accent'} `}>
                            {props[key]}
                            {typeof props[key] === 'number' && ' ₽'}
                        </p>
                    )}
                </Table.Td>,
            )
          }
        }
      return ar;
    }, [props])

  return (
    <Table.Tr data-single={isSingle} className={styles.tableRowPure} onClick={(width && width > 1023) ?  () => null: () => setOpen(prevState => !prevState)} data-state-mobile={!isSingle ? open : null}>
          {propsRender}
          {(width && width < 1024 && !isSingle) ? <td data-position={'icon-open'}
            // onClick={() => setOpen(prevState => !prevState)}
          >
              <SvgChevron/>
          </td> : null}
          {/* {(width && width < 961) && <td data-position="button-mobile" ><Button text={'Подробнее'} variant={ButtonVariant['accent-outline']} className={'w-full col-span-full max-w-xs m-auto mt-4'} size={ButtonSizeType.sm}/></td>} */}
      </Table.Tr>
    )
})

export const TableForPrice = (props: any) => {
    const Component = props.component
    const data = props.data
    return (
      <Panel variant={PanelVariant.default} >
          {props.title && <Heading text={props.title} variant={HeadingVariant.h4}/>}
          <Component data={data} to/>
      </Panel>
    )
}

export const TableWithSortNewPure = ({ meta, edit, variant, offsetSticky = 33, data, search = false, filter = false, state, className, total, ar, action, pageSize = 10, background = PanelColor.default, style = PanelRouteStyle.default, initFilterParams, ...props }: TableWithSortProps) => {
    const initCount = total || 0

    const RowDataMemoized = React.useMemo(() => {
        if(data && data.length > 0) return data.map((item: any, index: number) => {

          return <RowDataPure {...item} key={'_00' + index} edit={edit} meta={meta}
            // meta={{company_id: props.company, price_id: props.id}}
          />
        })
    }, [data, state])
    return (
      <Panel
        background={background ? background : PanelColor.glass}
        className={' ' + className + ' col-span-full grid grid-rows-[auto_1fr_auto]'}
        routeStyle={style}
        bodyClassName={''}
        variant={variant ? variant : PanelVariant.dataPadding}
        footerClassName={'px-6 pt-2 pb-6 flex  justify-end'}
        headerClassName={''}
        {...props}
      >       {(initCount === 0) ? <Heading className={'min-h-[40vh] flex items-center justify-center'} text={'Нет данных'} variant={HeadingVariant.h3} />:

        <Table stickyHeader stickyHeaderOffset={offsetSticky} withRowBorders={false} className={styles.TableWithSortPure} data-style={style}>
            <RowHeadingPure total={total} ar={ar} />
            <Table.Tbody>{RowDataMemoized}</Table.Tbody>
        </Table>
        }
      </Panel>
    )
}

export default TableWithSortNewPure;
