import React, { useMemo, useState } from 'react';
import styles from './PermissionTable.module.scss';
import Checkbox from "components/common/ui/Checkbox/Checkbox";
import { toJS } from 'mobx';

type PermissionTableRowProps = {
	create: boolean | null
	delete: boolean| null
	id:number
	name: string
	read:boolean| null
	update: boolean| null
}
type PermissionTableProps = {
	data: PermissionTableRowProps[]
	editable?: boolean
	action?: any
}
const PermissionTable = ({ data, editable = false, action }:PermissionTableProps) => {

	const handleChange = (event:Event, id: number) => {
		// @ts-ignore
		action(event, id)
		// // @ts-ignore
		// console.log(event.target.checked)
		// // @ts-ignore
		// console.log(event.target.name)
		// const indexAr = values.findIndex((value) => value.id === id);
		// const newArrayItem = {
		// 	...values[indexAr],
		// 	// @ts-ignore
		// 	[event.target.name]: event.target.checked
		// }
		// console.log(newArrayItem)
		// const newArray = toJS(values);
		// newArray.splice(indexAr, 1, newArrayItem);
		// console.log(newArray)
		//
		// setValues(() => newArray)
	}

	return (
		<div className={styles.PermissionTable}>
			<div className={styles.PermissionTableHeader}>
				<div  className={'flex justify-center'}>Просмотр</div>
				<div  className={'flex justify-center'}>Изменение</div>
				<div  className={'flex justify-center'}>Добавление</div>
				<div  className={'flex justify-center'}>Удаление</div>
			</div>
			{data.map((row:PermissionTableRowProps) => <div key={row.id} className={styles.PermissionTableRow}>
				<div>{row.name}</div>
				<div className={'flex justify-center items-center'}>
					<Checkbox action={(event: Event) => handleChange(event, row.id)} name={"read"} disabled={!editable} available={editable} checked={row.read}/>
				</div>
				<div  className={'flex justify-center items-center'}>
					<Checkbox action={(event: Event) => handleChange(event, row.id)} name={"update"} disabled={!editable} available={editable} checked={row.update}/>
				</div>
				<div  className={'flex justify-center items-center'}>
					<Checkbox action={(event: Event) => handleChange(event, row.id)} name={'create'} disabled={!editable} available={editable} checked={row.create}/>
				</div>
				<div  className={'flex justify-center items-center'}>
					<Checkbox action={(event: Event) => handleChange(event, row.id)} name={'delete'} disabled={!editable} available={editable} checked={row.delete}/>
				</div>
			</div>)}
		</div>
	);
};

export default PermissionTable;
