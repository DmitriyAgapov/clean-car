import { MantineProvider, createTheme, Select } from '@mantine/core';
import { useFormikContext } from 'formik'
import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
const theme = createTheme({

});
 const SelectCustom = ({label, name, value, className, options, action, ...props}:{label?: string, placeholder?: string,value: any | string | number,className?: string, name: string, options: any[] | any, action?: (event: any) => void}) => {
	 const [tempValue, setValue] = useState(value)
	 const ref = useRef<HTMLInputElement>(null);
	 const { values, submitForm , setValues} = useFormikContext();
	 useEffect(() => {
		 console.log(values);
	 }, [values]);
	 const handleSelectChange = (event:any) => {
		 setValue(event)
		 // @ts-ignore
		if(name === 'city') {
			setValues(() => ({
				// @ts-ignore
				...values,
					city: event
			}))
		} else if
		(name === 'application_type') {
			setValues(() => ({
				// @ts-ignore
				...values,
				application_type: event
			}))
		} else {
			setValues(() => ({
				// @ts-ignore
				...values,
				[name]: event
			}))
		}



	 }

	 return   <MantineProvider>
			 <Select
				 ref={ref}
				 withCheckIcon={false}
					classNames={{
						dropdown: "rounded-[0.625rem] border-color-[var(--formBorder)] hover:border-accent",
						wrapper: `rounded-[0.625rem] ${className}`,
						input: `rounded-[0.625rem] border-color-[var(--formBorder)] h-10`,
						option: "font-body text-gray-2 hover:bg-transparent hover:text-accent !font-medium data-[checked=true]:text-accent py-1.5 px-2"
					}}
				 // @ts-ignore
				 onChange={handleSelectChange}
				 name={name}
				label={label}
			 value={tempValue}
			data={options}
		/>
 </MantineProvider>
 }
	 export default SelectCustom
