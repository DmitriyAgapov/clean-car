import React, { useState } from 'react';
import { Combobox, InputBase, useCombobox } from '@mantine/core';

const groceries = [
	'🍎 Apples',
	'🍌 Bananas',
	'🥦 Broccoli',
	'🥕 Carrots',
	'🍫 Chocolate',
	'🍇 Grapes',
];

export function SelectCreatable({ items, createaction, label }:{items: any[], createaction: () => void, label: string}) {
	const combobox = useCombobox({
		onDropdownClose: () => combobox.resetSelectedOption(),
	});
	const [data, setData] = useState(items);
	const [value, setValue] = useState<string | null>(null);
	const [search, setSearch] = useState('');

	const exactOptionMatch = data.some((item) => item.label === search);
	const filteredOptions = exactOptionMatch
		? data
		: data.filter((item) => item.label.toLowerCase().includes(search.toLowerCase().trim()));
	React.useEffect(() => {
		console.log(filteredOptions);
		console.log(exactOptionMatch);
		console.log(search);
		console.log(value);
	}, [filteredOptions])
	const options = filteredOptions.map((item) => (
		<Combobox.Option value={item.value} key={item.value} onClick={(val) => {
			setValue(item.label)
			setSearch(item.label)
		}}>
			{item.label}
		</Combobox.Option>
	));

	return (
		<Combobox
			store={combobox}
			withinPortal={false}
			onOptionSubmit={(val) => {
				console.log(val);
				if (val === '$create') {
					setData(prevValue => [...prevValue, {label: val, value: val}]);
					setValue(search);
				}

				combobox.closeDropdown();
			}}
		>
			<Combobox.Target>
				<InputBase
					classNames={{
					input: "bg-white data-[disabled=true]:bg-white rounded-[0.625rem] border-color-[var(--formBorder)] h-10"

				}}
					label={label}
					rightSection={<Combobox.Chevron />}
					value={search}
					onChange={(event) => {
						combobox.openDropdown();
						combobox.updateSelectedOptionIndex();
						setSearch(event.currentTarget.value);
					}}
					onClick={() => combobox.openDropdown()}
					onFocus={() => combobox.openDropdown()}
					onBlur={() => {
						combobox.closeDropdown();
						setSearch(value || '');
					}}
					placeholder="Найти марку"
					rightSectionPointerEvents="none"
				/>
			</Combobox.Target>

			<Combobox.Dropdown>
				<Combobox.Options mah={200} style={{ overflowY: 'auto' }}>
					{options}
					{!exactOptionMatch && search.trim().length > 0 && (
						<Combobox.Option value="$create">+ Создать марку {search}</Combobox.Option>
					)}
				</Combobox.Options>
			</Combobox.Dropdown>
		</Combobox>
	);
}
