import { MantineProvider, createTheme, Select } from '@mantine/core';
import { useFormikContext } from 'formik'
import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import labels from "utils/labels";
const theme = createTheme({

});
 const SelectCustom = (
     {
         label,
         name,
         value,
         className,
         options,
         action,
         defaultValue
     }: {
         label?: string
         placeholder?: string
         value: any | string | number
         className?: string
         name: string
         options: any[] | any
			 		defaultValue?: any
         action?: (event: any) => void
     },

 ) => {
     const [tempValue, setValue] = useState(value)
     const ref = useRef<HTMLInputElement>(null)
     const { values, submitForm, setValues } = useFormikContext()

     const handleSelectChange = (event: any) => {
         setValue(event)
         // @ts-ignore
         if (name === 'city') {
             setValues(() => ({
                 // @ts-ignore
                 ...values,
                 city: event,
             }))
         } else if (name === 'application_type') {
             setValues(() => ({
                 // @ts-ignore
                 ...values,
                 application_type: event,
             }))
         } else {
             setValues(() => ({
                 // @ts-ignore
                 ...values,
                 [name]: event,
             }))
         }
     }

     return (
         <Select
             ref={ref}
             withCheckIcon={false}
             classNames={{
                 root: className,
                 dropdown: 'rounded-[0.625rem] border-color-[var(--formBorder)] hover:border-accent',
                 wrapper: `rounded-[0.625rem] ${className}`,
                 input: `rounded-[0.625rem] border-color-[var(--formBorder)] h-10`,
                 option: 'font-body text-gray-2 hover:bg-transparent hover:text-accent !font-medium data-[checked=true]:text-accent py-1.5 px-2',
             }}
             // @ts-ignore
             onChange={handleSelectChange}
             name={name}
             label={labels(label)}
             value={tempValue}
             data={options}
             defaultValue={defaultValue}
         />
     )
 }
	 export default SelectCustom
