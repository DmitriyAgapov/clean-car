import { useFontSize } from "utils/utils";
import stylesGrid from "components/common/layout/TableWithSort/TableWithSortGrid.module.scss";
import RowHeading from "components/common/layout/TableWithSort/TableParts/RowHeading";
import RowData from "components/common/layout/TableWithSort/TableParts/RowData";
import styles from 'components/common/layout/TableWithSort/TableWithSort.module.scss'
import { ScrollArea, Table } from '@mantine/core'
import React from 'react'
import { useViewportSize } from "@mantine/hooks";
import { PanelColor, PanelProps, PanelRouteStyle, PanelVariant } from "components/common/layout/Panel/Panel";
import { FilterData } from "components/common/layout/TableWithSort/DataFilter";
import { TableWithSortProps } from "components/common/layout/TableWithSort/TableWithSortNew";




export const GridView = (props: {
	props: Omit<
		TableWithSortProps,
		| 'className'
		| 'withOutLoader'
		| 'headerBar'
		| 'filter'
		| 'ar'
		| 'view'
		| 'search'
		| 'initFilterParams'
		| 'background'
		| 'variant'
		| 'style'
		| 'state'
		| 'autoScroll'
	>
	dataStyle: any
	ar: { label: string; name: string }[]
	headerBar: undefined | boolean
	total: number | undefined
	autoScroll: boolean
	rows: any
	view?: boolean
	countFetch: any
	element: (item: any, index: number) => JSX.Element
}) => {
	const {width} = useViewportSize()
	const colsAmount = props.rows && props.rows.length ? Array.from(Object.entries(props.rows[0])).length : 0

	const { sectionWidth} = useFontSize(props.props.ref)
	if(sectionWidth === 0) return <div/>
	return (
		<ScrollArea
			classNames={{viewport: stylesGrid.scrollCustom}}
			mah={width > 768 ? `calc(100dvh - 20rem ${props.props.footerHeight ? '- ' + props.props.footerHeight : '- 0px'})` : "auto"}
			scrollbars={width && width > 741 ? "xy" : "y"}
			maw={sectionWidth}
			w={"100%"}
			h={width > 768 ? `calc(100dvh - 20rem ${props.props.footerHeight ? '- ' + props.props.footerHeight : '- 0px'})` : "auto"}
			mih={'100%'}
		>
			<div className={stylesGrid.TableWithSortGrid + " " + "w-full"} style={{gridTemplateColumns: ` repeat(${colsAmount}, minmax(auto, 1fr))`}}
				data-style={props.dataStyle}
				data-width={`${Math.floor(100 / props.ar.length)}`}>
				{props.headerBar && <RowHeading total={props.total} ar={props.ar} autoScroll={props.autoScroll} view={true}/>}
				{props.rows && <div data-panel={"content"}>{props.rows.map((item: any, index: number) =>
					<RowData view={true} style={props.dataStyle} {...item}
						key={item.id + "_00" + index} />
				)}</div>}
				{/* {props.rows  && <RowData style={props?.dataStyle}  view={true} {...props?.props}/>} */}
				<footer data-panel={"footer_row"}>
					{props?.props?.footerProps && props.countFetch && props.countFetch > 0 ? (
						<RowData style={props?.dataStyle}  view={true} {...props?.props?.footerProps}/>
					) : null}
				</footer>
			</div>
		</ScrollArea>
	)
}
export function TableView(props: {
	props: Omit<
		TableWithSortProps,
		| 'className'
		| 'withOutLoader'
		| 'headerBar'
		| 'filter'
		| 'ar'
		| 'view'
		| 'search'
		| 'initFilterParams'
		| 'background'
		| 'variant'
		| 'style'
		| 'state'
		| 'autoScroll'
	>
	dataStyle: any
	ar: { label: string; name: string }[]
	headerBar: undefined | boolean
	total: number | undefined
	autoScroll: boolean
	rows: any
	countFetch: any
	element: (item: any, index: number) => JSX.Element
}) {
	const {width} = useViewportSize()
	return (
		<Table.ScrollContainer
			// @ts-ignore
			scrollbars={width && width > 741 ? "xy" : "y"}
			style={{ width: '100%' }}

			classNames={{
				scrollContainer: styles.scrollCustom,
				scrollContainerInner: 'h-full',
			}}
			mah={`calc(100dvh - 20rem ${props.props.footerHeight ? '- ' + props.props.footerHeight : '- 0px'})`}
			maw={'68.5rem'}
			h={`calc(100dvh - 20rem ${props.props.footerHeight ? '- ' + props.props.footerHeight : '- 0px'})`}
			mih={'100%'}
			minWidth={'100%'}
		>
			<Table
				className={styles.TableWithSort}
				data-style={props.dataStyle}
				data-width={`${Math.floor(100 / props.ar.length)}`}
				stickyHeader

				stickyHeaderOffset={0}
			>
				{props.headerBar && <RowHeading total={props.total} ar={props.ar} autoScroll={props.autoScroll} />}
				<Table.Tbody style={{ height: 0 }}>
					{props.rows && props.countFetch && props.countFetch > 0 ? props.rows.map(props.element) : null}
				</Table.Tbody>
				<Table.Tbody style={{ height: '100%' }}></Table.Tbody>
				<Table.Tbody>
					{/* {props.footerProps  && _countFetch && _countFetch > 0  ? <RowData style={style} {...props.footerProps} */}
					{/*   key={props.footerProps.id + "_00"} />: null} */}
				</Table.Tbody>
				<Table.Tfoot>
					{props.props.footerProps && props.countFetch && props.countFetch > 0 ? (
						<RowData style={props.dataStyle} {...props.props.footerProps} />
					) : null}
				</Table.Tfoot>
			</Table>
		</Table.ScrollContainer>
	)
}
