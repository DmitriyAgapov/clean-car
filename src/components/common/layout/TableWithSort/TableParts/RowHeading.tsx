import { useLocalStore } from "stores/localStore";
import { TableWithSortStore } from "components/common/layout/TableWithSort/TableWithSort.store";
import React, { useState } from "react";
import styles from "components/common/layout/TableWithSort/TableWithSort.module.scss";
import { SvgSort } from "components/common/ui/Icon";

const RowHeading = ({ ar, sort, action, total }: any) => {
	const localStore = useLocalStore()
	const [count, setCount] = useState({
		index: 0,
		reversed: false,
		count: total ?? 0,
	})
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
	return (
		<thead>
		<tr className={styles.tableheader + ' tableheader'}>
			{ar.map((arItem: { label: string, name: string }, index: number) => {
				return (
					<th
						key={`rh-${index}`}
						data-name={arItem.name}
						// style={(index !== 0 && index !== ar.length - 1) ? ({ width: `${100 / ar.length}%` } ): {}}
						className={styles.tableheading}
						onClick={() => handleSortKey(index)}
						data-sort-selected={index === count.index}
						data-sort-reversed={index === count.index && count.reversed === true}
					>
						<div style={{ display: 'flex' }}>
							<span>{arItem.label}</span>
							<SvgSort />
						</div>
					</th>
				)
			})}
		</tr>
		</thead>
	)
}
export default RowHeading
