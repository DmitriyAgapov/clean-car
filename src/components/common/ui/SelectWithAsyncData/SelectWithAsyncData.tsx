import React, { useState } from "react";
import styles from "./SelectWithAsyncData.module.scss";
import { Combobox, Input, InputBase, Loader, useCombobox } from '@mantine/core'
import { useFormContext } from "components/Form/FormCreateUpdateUsers/FormCreateUpdateUsers";

export default function SelectWithAsyncData() {
	const [value, setValue] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState<string[]>([]);
	const context = useFormContext()
	const combobox = useCombobox({
		onDropdownClose: () => combobox.resetSelectedOption(),
		onDropdownOpen: () => {
			if (data.length === 0 && !loading) {
				setLoading(true);
				// getAsyncData().then((response) => {
				// 	setData(response);
				// 	setLoading(false);
				// 	combobox.resetSelectedOption();
				// });
			}
		},
	});

	const options = data.map((item) => (
		<Combobox.Option value={item} key={item}>
			{item}
		</Combobox.Option>
	));

	return (
		<Combobox
			store={combobox}
			withinPortal={false}
			onOptionSubmit={(val) => {
				setValue(val);
				combobox.closeDropdown();
			}}
		>
			<Combobox.Target>
				<InputBase
					component="button"
					type="button"
					pointer
					rightSection={loading ? <Loader size={18} /> : <Combobox.Chevron />}
					onClick={() => combobox.toggleDropdown()}
					rightSectionPointerEvents="none"
				>
					{value || <Input.Placeholder>Pick value</Input.Placeholder>}
				</InputBase>
			</Combobox.Target>

			<Combobox.Dropdown>
				<Combobox.Options>
					{loading ? <Combobox.Empty>Loading....</Combobox.Empty> : options}
				</Combobox.Options>
			</Combobox.Dropdown>
		</Combobox>
	);
}
