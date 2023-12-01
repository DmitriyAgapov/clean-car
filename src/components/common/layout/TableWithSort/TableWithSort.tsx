import React, { useId } from 'react';
import styles from './TableWithSort.module.scss';
import { CustomerProfile, PerformerProfile } from "stores/companyStore";
import Panel, { PanelColor, PanelVariant } from "components/common/layout/Panel/Panel";
import { SvgFilter } from "components/common/ui/Icon";
import Chips from "components/common/ui/Chips/Chips";

type TableWithSortProps = {
	data: PerformerProfile[] | CustomerProfile[]
	state: boolean
}

const RowHeading = ({ ar }: any) => {
	const id = useId();
	return <div className={styles.tableheader}>{ ar.map((arItem: string) => <div key={id}
		className={styles.tableheading}>{arItem}</div>)}</div>
}

const RowData = ({status, company, type, city}:any) => {
	const id = useId();

	return <div className={styles.tableRow}>
			<div key={id} className={styles.tableCell}>
				<Chips state={status}/>
			</div>
			<div key={id} className={styles.tableCell}>{company}</div>
			<div key={id} className={styles.tableCell}>{type}</div>
			<div key={id} className={styles.tableCell}>{city}</div>
	</div>
}

const TableWithSort = ({data, state}:TableWithSortProps) => {

	if (state) return <div>'Loading'</div>

	return (
		<Panel className={styles.TableWithSortPanel + " " + "col-span-full"} variant={PanelVariant.default} background={PanelColor.glass}
			header={<div className={styles.btnFilter}><SvgFilter/></div>}
		>
			<div className={styles.TableWithSort}>
				<RowHeading ar={['Статус', 'Компания', 'Тип', 'Город']}/>
				{data.map((item:any) => <RowData status={item.company.is_active} company={item.company.name} type={item.company_type} city={item.city} />)}
			</div>
		</Panel>
	);
};

export default TableWithSort;
