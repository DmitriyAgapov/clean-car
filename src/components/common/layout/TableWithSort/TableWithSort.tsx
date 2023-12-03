import React from 'react';
import styles from './TableWithSort.module.scss';
import Panel, { PanelColor, PanelRouteStyle, PanelVariant } from "components/common/layout/Panel/Panel";
import { SvgFilter, SvgLoading, SvgSort } from "components/common/ui/Icon";
import Chips from "components/common/ui/Chips/Chips";
import { useLocation, useNavigate } from 'react-router-dom';

type TableWithSortProps = {
	data: any[]
	state: boolean
	ar: string[]
	style?: PanelRouteStyle
}

const RowHeading = ({ ar }: any) => {

	return <thead><tr className={styles.tableheader + " tableheader"}>{ ar.map((arItem: string, index: number) => <th key={`rh-${index}`}
		className={styles.tableheading}><span>{arItem}</span> <SvgSort/></th>)}</tr></thead>
}

const RowData = (props:any) => {
	const navigate = useNavigate();
	const location = useLocation();
	const handleClick = () => props.id ? navigate(location.pathname+`/${props.id}`) : void null;

	const propsRender = () => {
		const ar = [];
		for(const key in props) {
			if(typeof props[key] === "boolean") {
				ar.push(<td key={key}  className={styles.tableCell}>
					<Chips state={props[key]}/>
				</td>)
			} else if(key !== "id") {
				ar.push(<td key={key} className={styles.tableCell}>{props[key]}</td>)
			}
		}
		return ar
	}
	return <tr className={styles.tableRow} onClick={handleClick}>
		{propsRender()}
	</tr>
}

const TableWithSort = ({data, state, ar, style = PanelRouteStyle.default}:TableWithSortProps) => {

	if (state) return <SvgLoading className={'m-auto'}/>

	return (
		<Panel className={styles.TableWithSortPanel + " " + "col-span-full"} routeStyle={style} variant={PanelVariant.default} background={PanelColor.glass}
			header={<div className={styles.btnFilter}><SvgFilter/></div>}
		>
			<table className={styles.TableWithSort} data-style={style}>
				<RowHeading ar={ar}/>
				<tbody>{data.map((item:any, index: number) => <RowData {...item} key={item.id} />)}</tbody>
			</table>
		</Panel>
	);
};

export default TableWithSort;
