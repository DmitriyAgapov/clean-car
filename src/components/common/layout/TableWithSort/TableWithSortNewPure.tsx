import React, {  useState } from "react";
import styles from "./TableWithSort.module.scss";
import Panel, { PanelColor, PanelProps, PanelRouteStyle, PanelVariant } from "components/common/layout/Panel/Panel";
import { SvgChevron, SvgLoading, SvgSort } from "components/common/ui/Icon";
import Chips from "components/common/ui/Chips/Chips";
import label from "utils/labels";
import { useWindowDimensions } from "utils/utils";
import Button, { ButtonSizeType, ButtonVariant } from "components/common/ui/Button/Button";
import Status from "components/common/ui/Status/Status";
import Heading, { HeadingVariant } from "components/common/ui/Heading/Heading";
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
    pageSize?: number
    variant?: PanelVariant
} & PanelProps

const RowHeadingPure = ({ ar,total }: any) => {
    return (
      <thead>
          <tr className={styles.tableRowPure + ' tableheader'}>
              {ar.map((arItem: { label: string, name: string }, index: number) => {
                  return (
                    <th
                      key={`rh-${index}`}
                      className={styles.tableheadingPure}
                    >
                        <div style={{ display: 'flex' }}>
                            <span>{arItem.label}</span>
                        </div>
                    </th>
                  )
              })}
          </tr>
      </thead>
    )
}

const RowDataPure = (props: any) => {
    const {width} = useWindowDimensions()
    const [open, setOpen] = useState(false);
    const propsRender = () => {
        const ar = []
        for (const key in props) {
            ar.push(<td key={key}
              className={styles.tableCellPure} data-label={label(key)}>
                {' '}
                <p className={'m-0'}>{props[key]}{' '}</p>
            </td>,)
        }
        return ar
    }

    return (
      <tr className={styles.tableRowPure} onClick={(width && width > 961) ?  () => null: () => setOpen(prevState => !prevState)} data-state-mobile={open}>
          {propsRender()}
          {(width && width < 961) && <td data-position={'icon-open'} onClick={() => setOpen(prevState => !prevState)}>
              <SvgChevron/>
          </td>}
          {(width && width < 961) && <td data-position="button-mobile" ><Button text={'Подробнее'} variant={ButtonVariant['accent-outline']} className={'w-full col-span-full max-w-xs m-auto mt-4'} size={ButtonSizeType.sm}/></td>}
      </tr>
    )
}

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
export const TableWithSortNewPure = ({ variant, data, search = false, filter = false, state, className, total, ar, action, pageSize = 10, background = PanelColor.default, style = PanelRouteStyle.default, initFilterParams, ...props }: TableWithSortProps) => {
    const initCount = total || 0
    const RowDataMemoized = React.useMemo(() => {
        if(data && data.length > 0) return data.map((item: any, index: number) => <RowDataPure {...item} key={item.id + '_00' + index} />)
    }, [data])
    return (
      <Panel
        background={background ? background : PanelColor.glass}
        className={' ' + className + ' col-span-full grid grid-rows-[auto_1fr_auto]'}
        routeStyle={style}
        bodyClassName={'flex'}
        variant={variant ? variant : PanelVariant.dataPadding}
        footerClassName={'px-6 pt-2 pb-6 flex  justify-end'}
        headerClassName={''}

        {...props}
      >       {(initCount === 0) ? <Heading className={'min-h-[40vh] flex items-center justify-center'} text={'Нет данных'} variant={HeadingVariant.h3} />:
        <table className={styles.TableWithSortPure} data-style={style}>

            <RowHeadingPure total={total} ar={ar} />
            <tbody>{RowDataMemoized}</tbody>
        </table>}
      </Panel>
    )
}

export default TableWithSortNewPure;
