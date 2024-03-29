import { Combobox, Input, InputBase, Menu, ScrollArea, TextInput, useCombobox } from '@mantine/core'
import React, { useState } from "react";
import Label = Menu.Label;

function ComboboxCustom({className, items, name, action, defaultValue}:{items: any,className?: string,defaultValue?: string, name: string, action: (props:any) => void}) {

	const [search, setSearch] = useState('');
	const [value, setValue] = useState<string | null>(defaultValue || null);
	const [selectedItem, setSelectedItem] = useState<string | null>(null);
	const combobox = useCombobox({ onDropdownClose: () => {
			combobox.resetSelectedOption();
			combobox.focusTarget();
			setSearch('');
		},

		onDropdownOpen: () => {
			combobox.focusSearchInput();
		}, });
	const options = items
	.filter((item:any) => item.name.toLowerCase().includes(search.toLowerCase().trim()))
	.map((item:any) => (
		<Combobox.Option value={item.name} key={item.name} onClick={(e:any) => {
			action(item)
			}}>
			{item.name}
		</Combobox.Option>
	));
	return (
			<label className={'account-form__input w-full flex-grow ' + className}
		>
			Марка
			<Combobox store={combobox}
				onOptionSubmit={(val) => {

					setSelectedItem(val);
					combobox.closeDropdown();
				}}>
				<Combobox.Target>
					<InputBase
						name={name}
						component="button"
						type="button"
						pointer
						rightSection={<Combobox.Chevron />}
						rightSectionPointerEvents="none"
						onClick={() => combobox.toggleDropdown()}
					>
						{value || selectedItem || <Input.Placeholder>Выбрать марку</Input.Placeholder>}
					</InputBase>
				</Combobox.Target>

				<Combobox.Dropdown>

					<Combobox.Search
						value={search}
						onChange={(event) => setSearch(event.currentTarget.value)}
						placeholder="Поиск..."
					/>

					<Combobox.Options>
						<ScrollArea.Autosize type="scroll" mah={200}>
							{options.length > 0 ? options : <Combobox.Empty>Nothing found</Combobox.Empty>}
						</ScrollArea.Autosize>


					</Combobox.Options>
					{/* <Combobox.Footer> */}
					{/* 	<Input */}
					{/* 		component="button" */}
					{/* 		type="button" */}
					{/* 		pointer */}
					{/* 		rightSection={<Combobox.Chevron />} */}
					{/* 		rightSectionPointerEvents="none" */}
					{/* 		onClick={() => { */}

					{/* 		}} */}
					{/* 	/> */}

					{/* 	 */}
					{/* </Combobox.Footer> */}
				</Combobox.Dropdown>
			</Combobox>
		</label>
	);
}

export default ComboboxCustom
