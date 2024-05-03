import React from "react";
import styles from "./CarHelper.module.scss";
import Panel, { PanelColor, PanelVariant } from "components/common/layout/Panel/Panel";
import { carHelperTable } from "stores/carStore";

const CarHelper = ():JSX.Element => {
	const headerValues = ['Тип', 'Пример', 'Шиномонтаж', 'Мойка', 'Эвакуация']
	const Header = () => <ul className={'subgrid col-span-full bg-[#090909] !mt-0 pt-3 pb-2.5 !mb-8'} >{headerValues.map((item, index) => <li className={`${index === 0 && 'col-start-2'} text-[#929398] text-xss uppercase`} key={`${index}_listEl`}>{item}</li> )}</ul>

	return (
		<Panel  background={PanelColor.glass} headerClassName={' contents'} bodyClassName={' contents'} variant={PanelVariant.withPaddingSmWithBody} header={<Header/>} className={styles.row + " " + 'grid overflow-hidden grid-cols-[6rem_1fr_1fr_1fr_1fr_1fr] gap-2.5 !bg-gray-2/20 carHelper  pb-10 !border-accent !border'}>
			{carHelperTable.map((ar:any, index:number) => <ul className={'subgrid  col-span-full'} key={`${index}_rows`}>{ar.map((cell:any, index:number) => <li className={`${index === 0 ? 'text-accent text-sm  pl-6': 'font-medium text-xs' } `} key={`${index}_listEl`}>{cell}</li>)}</ul> )}
		</Panel>
	)
}
export default CarHelper;
