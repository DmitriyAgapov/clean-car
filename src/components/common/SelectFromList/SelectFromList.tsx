import React, { useCallback, useMemo, useState } from 'react'
import styles from './SelectFromList.module.scss'
import Heading, { HeadingColor, HeadingVariant } from 'components/common/ui/Heading/Heading'
import  TableSearch  from 'components/common/layout/TableWithSort/TableSearch'
import Panel, { PanelColor, PanelVariant } from 'components/common/layout/Panel/Panel'
import { SvgRightArrow } from 'components/common/ui/Icon'

type SelectFromListProps = {
	items: any
	selected?: (e: any) => void
	action?: (e: any) => void
}
const SelectListAvailible = ({ items, action, selected }: SelectFromListProps) => {
	const handleSelected = (event: any) => {
		if (selected) {selected(event);}
	}
    return (
        <div className={styles.SelectListAvailible}>
            <Panel
                variant={PanelVariant.textPadding}
                background={PanelColor.glass}
                className={'flex-1 w-full  rounded-lg'}
            >
                <Heading text={'Доступные компании '} variant={HeadingVariant.h4} color={HeadingColor.accent} />
                <TableSearch action={action} inputProps={{ list: 'availible-list' }} />
                <div className={styles.SelectFromListList}>
                    {items.map((item: any) => (
                        <label htmlFor={'company-' + item.id} className={styles.listItem}>
                            {item.company.name}
                            <input id={'company-' + item.id} type={'checkbox'} name={'company-' + item.id} onChange={handleSelected}/>
                        </label>
                    ))}
                </div>
            </Panel>
        </div>
    )
}

interface ChipsProps {
	value: string
	id: number
	action: (id:number) => void
}

const CompanyChips = ({id, value, action}: ChipsProps) => <span className={styles.chips}>{value}</span>
const SelectedCompanies = ({items}: SelectFromListProps) => {
	const memoized = useMemo(() => {
		let res;
		if(items) {
			res = items.map((item:any) =>
				<label htmlFor={"company-" + item.id} className={styles.listItem}>
					{item.company.name}
					<input id={"company-" + item.id} type={'checkbox'} name={"company-" + item.id} />
				</label>
			)
		}
		return res
	}, [items])
	return <div className={styles.SelectListAvailible}>
		<Panel variant={PanelVariant.dataPadding} background={PanelColor.glass} className={'flex-1 w-full rounded-lg'}>
		<Heading text={'Выбранные компании'} variant={HeadingVariant.h4} color={HeadingColor.accent}/>
		<div className={styles.SelectFromListList}>
			{memoized}
		</div>
		</Panel>
	</div>
}
const SelectFromList = ({items}:SelectFromListProps) => {
	const [filterString, setFilterString] = useState('');
	const [selectedCompanies, setSelectedCompanies] = useState();
	const [companies, setCompanies] = useState(items);

	const filterItemsAr = useMemo(() => {
				return companies.filter((a:any) => a.company.name.toLowerCase().includes(filterString.toLowerCase()))
	}, [filterString, companies]);

	const handleChange = (event: any) => {
		setFilterString(event.target.value)
	}
	const selectCompany = (props: any) => {
		let id = props.currentTarget.id.split('-')[1];
		const indexInAr = companies.findIndex((el:any) => el.id == id)
		const selected = []
		selected.push(companies[indexInAr])
	}
	return (
        <div className={styles.SelectFromList}>
            <SelectListAvailible selected={selectCompany} items={filterItemsAr} action={handleChange}/>
            <SvgRightArrow className={'text-accent self-center'} />
            <SelectedCompanies items={selectedCompanies} />
        </div>
    )
};
export default SelectFromList
