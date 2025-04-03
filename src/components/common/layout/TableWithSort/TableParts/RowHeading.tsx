import { useLocalStore } from "stores/localStore";
import { TableWithSortStore } from "components/common/layout/TableWithSort/TableWithSort.store";
import React, { useState } from "react";
import styles from "components/common/layout/TableWithSort/TableWithSort.module.scss";
import { SvgSort } from 'components/common/ui/Icon'
import { Table } from '@mantine/core'

function StickyHeader(props: { map: any, autoScroll: boolean }) {
	if (props.autoScroll)
        return (
            <Table.Thead>
                <Table.Tr className={styles.tableheader + ' tableheader'}>{props.map}</Table.Tr>
            </Table.Thead>
        )
    return (
        <thead>
            <tr className={styles.tableheader + ' tableheader'}>{props.map}</tr>
        </thead>
    )
}

const RowHeading = ({ ar, sort, action, total, autoScroll, view = false }: any) => {
	const localStore = useLocalStore()
	// console.log(localStore.params.getSearchParams.ordering && localStore.params.getSearchParams.ordering.length > 0)

	const [count, setCount] = useState({
		index: 0,
		reversed: false,
		count: total ?? 0,
	})
	React.useEffect(() => {
		if(localStore.params.getSearchParams.ordering && localStore.params.getSearchParams.ordering.length > 0) {
			ar.findIndex((item: { name: string }, index: number) => {
				// console.log(localStore.params.getSearchParams.ordering?.replace('-', ''));
				// console.log(item.name === localStore.params.getSearchParams.ordering?.replace('-', ''));
				if(item.name === localStore.params.getSearchParams.ordering?.replace('-', '')) {
					setCount({
						...count,
						index: index
					})
				}
			})
		}
	}, [localStore.params.searchParams.ordering])

	const handleSortKey = React.useCallback((index: number) => {
		let newVal = {
			index: index, reversed: false, count: 0,
		}
		if (count.index === index) {
			newVal.count = count.count + 1
		} else {
			newVal.index = index
			newVal.count = 0
		}
		if (newVal.count === 1) {
			newVal.reversed = true
		}
		if (newVal.count > 1) {
			newVal = {
				index: index,
				reversed: false,
				count: 0,
			}
		}
		setCount(newVal)
		// action(newVal)
		localStore.params.setSearchParams({page: 1, ordering: newVal.reversed ? `-${ar[index].name}` : ar[index].name})

	}, [count, ar, localStore.params.searchParams])
	if(view) {
		return <div data-panel={"header_row"}>
			{ar.map((arItem: { label: string, name: string }, index: number) => {
				if(autoScroll) return (
					<div data-panel={"header_cell"} key={`rh-${index}`}
						data-name={localStore.data?.canSort === false ? null : arItem.name}
						// style={(index !== 0 && index !== ar.length - 1) ? ({ width: `${100 / ar.length}%` } ): {}}
						className={styles.tableheading}
						onClick={() => localStore.data?.canSort === false ? void null : handleSortKey(index)}
						data-sort-selected={localStore.data?.canSort === false ? null : index === count.index}
						data-sort-reversed={localStore.data?.canSort === false ? null : index === count.index && count.reversed === true}>
						<div style={{ display: 'flex', alignItems: "center", gap: ".5rem" }}>
							<span>{arItem.label}</span>
							{localStore.data?.canSort === false ? null : <SvgSort />}
						</div>
					</div>
				)
			})}
		</div>
	}
	return (
		<StickyHeader autoScroll={autoScroll} map={ar.map((arItem: { label: string, name: string }, index: number) => {
			if(autoScroll) return (
				<Table.Th key={`rh-${index}`}
					data-name={localStore.data?.canSort === false ? null : arItem.name}
					// style={(index !== 0 && index !== ar.length - 1) ? ({ width: `${100 / ar.length}%` } ): {}}
					className={styles.tableheading}
					onClick={() => localStore.data?.canSort === false ? void null : handleSortKey(index)}
					data-sort-selected={localStore.data?.canSort === false ? null : index === count.index}
					data-sort-reversed={localStore.data?.canSort === false ? null : index === count.index && count.reversed === true}>
					<div style={{ display: 'flex' }}>
						<span>{arItem.label}</span>
						{localStore.data?.canSort === false ? null : <SvgSort />}
					</div>
				</Table.Th>
			)
			return (
				<th key={`rh-${index}`}
					data-name={localStore.data?.canSort === false ? null : arItem.name}
					// style={(index !== 0 && index !== ar.length - 1) ? ({ width: `${100 / ar.length}%` } ): {}}
					className={styles.tableheading}
					onClick={() => localStore.data?.canSort === false ? void null : handleSortKey(index)}
					data-sort-selected={localStore.data?.canSort === false ? null : index === count.index}
					data-sort-reversed={localStore.data?.canSort === false ? null : index === count.index && count.reversed === true}>
					<div style={{ display: 'flex' }}>
						<span>{arItem.label}</span>
						{localStore.data?.canSort === false ? null : <SvgSort />}
					</div>
				</th>
			)
		})} />
	)
}
export default RowHeading
