import { MantineProvider, createTheme, Select } from '@mantine/core';
import React, { useRef, useState } from 'react'
const theme = createTheme({

});
 const SelectPure = ({label, name, value, className, options, action, ...props}:{label?: string, placeholder?: string,value: any | string | number,className?: string, name: string, options: any[] | any, action?: (event: any) => void}) => {
	if(options.includes(true)) {

		options = options.map((item:boolean) => {
			if(item) return 'Активна'
			return 'Деактивна'
		})
	}

	 const ref = useRef<HTMLInputElement>(null);
	const [curValue, setCurValue] = useState<string | null>(options[0])
	 const handleChange = (e:any) => {
		action && action(e)
		 setCurValue(e)
	 }
return   <MantineProvider>
			 <Select
				 ref={ref}
				 withCheckIcon={false}
					classNames={{
						label: "text-gray-1 uppercase text-xss tracking-tighter",
						dropdown: "rounded-[0.375rem] border-color-[var(--formBorder)] hover:border-accent",
						wrapper: `rounded-[0.375rem] ${className}`,
						input: `rounded-[0.375rem] bg-gray-3 text-gray-1  border-color-gray-2 h-10`,
						option: "font-body text-gray-2 hover:bg-transparent hover:text-accent !font-medium data-[checked=true]:text-accent py-1.5 px-2"
					}}
				 // @ts-ignore
				 onChange={handleChange}
				 name={name}
				label={label}
				 value={curValue}
				 // @ts-ignore
				data={options}
		/>
 </MantineProvider>
 }
	 export default SelectPure
