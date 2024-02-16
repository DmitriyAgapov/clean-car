import { useState } from 'react';
import { ActionIcon, Checkbox, Combobox, Group, TextInput, useCombobox } from '@mantine/core';
import styles from './TransferList.module.scss'
import React from 'react'
import { SvgChevron, SvgRightArrow } from "components/common/ui/Icon";
import Panel, { PanelColor, PanelVariant } from 'components/common/layout/Panel/Panel'
import Heading, { HeadingColor, HeadingVariant } from "components/common/ui/Heading/Heading";
import { useStore } from "stores/store";

const fruits = ['🍎 Apples', '🍌 Bananas', '🍓 Strawberries'];

const vegetables = ['🥦 Broccoli', '🥕 Carrots', '🥬 Lettuce'];


interface RenderListProps {
	options: any;
	onTransfer: (options: string[]) => void;
	type: 'forward' | 'backward';
	label: string
}

function RenderList({ options, onTransfer, type, label }: RenderListProps) {
	const store = useStore()
	console.log(store.companyStore.getCompaniesPerformers);
	const combobox = useCombobox();
	const [value, setValue] = useState<string[]>([]);
	const [search, setSearch] = useState('');

	const handleValueSelect = (val: string) =>
		setValue((current) =>
			current.includes(val) ? current.filter((v) => v !== val) : [...current, val]
		);

	const items = options
	.filter((item:string) => item.toLowerCase().includes(search.toLowerCase().trim()))
	.map((item:string) => (
		<Combobox.Option
			value={item}
			key={item}
			active={value.includes(item)}
			onMouseOver={() => combobox.resetSelectedOption()}
		>
			<Group gap="sm">
				<Checkbox
					checked={value.includes(item)}
					onChange={() => {}}
					aria-hidden
					tabIndex={-1}
					style={{ pointerEvents: 'none' }}
				/>
				<span>{item}</span>
			</Group>
		</Combobox.Option>
	));

	return (
		<Panel variant={PanelVariant.textPadding} background={PanelColor.glass} className={'flex-1 w-full rounded-lg'}  data-type={type}>
			<Heading text={label} variant={HeadingVariant.h4} color={HeadingColor.accent}/>
			<Combobox store={combobox} onOptionSubmit={handleValueSelect}>
				<Combobox.EventsTarget>
					<Group wrap="nowrap" gap={0} className={styles.controls + " " + 'form-search relative h-10'}>
						<TextInput
							placeholder="Быстрый поиск"
							className={styles.listItem + " " }
							value={search}
							onChange={(event) => {
								setSearch(event.currentTarget.value);
								combobox.updateSelectedOptionIndex();
							}}
						/>
						<ActionIcon
							radius={0}
							variant="default"
							size={36}
							className={styles.control}
							onClick={() => {
								onTransfer(value);
								setValue([]);
							}}
						>
							<SvgRightArrow className={'text-accent self-center'} />
						</ActionIcon>
					</Group>
				</Combobox.EventsTarget>

				<div className={styles.listItem}>
					<Combobox.Options>
						{items.length > 0 ? items : <Combobox.Empty>Nothing found....</Combobox.Empty>}
					</Combobox.Options>
				</div>
			</Combobox>
		</Panel>
	);
}

export function TransferList() {
	const store = useStore()
	const [data, setData] = useState<[string[], string[]]>([store.companyStore.getCompaniesPerformers.map((item:any) => item.name), []]);

	const handleTransfer = (transferFrom: number, options: string[]) =>
		setData((current) => {
			const transferTo = transferFrom === 0 ? 1 : 0;
			const transferFromData = current[transferFrom].filter((item) => !options.includes(item));
			const transferToData = [...current[transferTo], ...options];

			const result = [];
			result[transferFrom] = transferFromData;
			result[transferTo] = transferToData;
			return result as [string[], string[]];
		});

	return (
		<>
			<RenderList
				label={'Доступные компании '}
				type="forward"
				options={data[0]}
				onTransfer={(options) => handleTransfer(0, options)}
			/>
			<RenderList
				label={'Выбранные компании'}
				type="backward"
				options={data[1]}
				onTransfer={(options) => handleTransfer(1, options)}
			/>
		</>
	);
}
