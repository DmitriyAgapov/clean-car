import React, { useState } from 'react';
import { Combobox, InputBase, useCombobox } from '@mantine/core';
import { useFormikContext } from "formik";

export function SelectCreatable({ items, createAction, defaultValue,  label}:{items: any[], defaultValue?: any, createAction: (e:any) => void, label: string}) {

	const initBrand = items.filter((i:any) => i.label === String(defaultValue))[0]?.label || null
	const combobox = useCombobox({
		onDropdownClose: () => combobox.resetSelectedOption(),
	});
	const [data, setData] = useState(items);
	const [value, setValue] = useState<string | null>(initBrand);
	const [search, setSearch] = useState(initBrand || '');
	const {setFieldValue, values} = useFormikContext();
	const exactOptionMatch = data.some((item) => item.label === search);
	console.log(exactOptionMatch);
	console.log(data);
	const filteredOptions = exactOptionMatch
		? data
		: data.filter((item) => item.label.toLowerCase().includes(search.toLowerCase().trim()));
	React.useEffect(() => {
		setValue(defaultValue)
	}, [])
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
				if (val === '$create') {
					// createAction(data.filter((e:any) => value === e.label)[0])
					setFieldValue('brand', search);
					setFieldValue('brandId', null);
					setData(prevValue => [...prevValue, {label: search, value: search}]);
					setValue(search);
				} else {
					setFieldValue('brandId', Number(val));
					setFieldValue('brand', null);
				}
				combobox.closeDropdown();
			}}
		>
			<Combobox.Target>
				<InputBase
					withAsterisk={true}
					classNames={{
					input: "bg-white data-[disabled=true]:bg-white rounded-[0.625rem] border-color-[var(--formBorder)] h-10"

				}}
					label={label}
					defaultValue={defaultValue}
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
