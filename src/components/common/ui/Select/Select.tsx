import { Select } from '@mantine/core';
import type { SelectProps } from '@mantine/core';

import { useFormikContext } from 'formik'
import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import labels from "utils/labels";
 const SelectCustom = (
     {
         label,
         name,
         value,
         className,
         options,
         action,
       placeholder,
         defaultValue,
       searchable,
      disabled = false,
       ...props
     }: {
         label?: string
         placeholder?: string
       searchable?: boolean
         className?: string
         name: string
         options: any[] | any
			 		defaultValue?: any
         action?: (event: any) => void
     } & SelectProps,

 ) => {
     const [tempValue, setValue] = useState(value)
     const ref = useRef<HTMLInputElement>(null)
     const { getFieldProps, values, submitForm, setFieldValue, setValues, touched, setTouched } = useFormikContext()
      //TODO Рефактирить надо выносить из компонента
      useEffect(() => {
        if(name === 'model') {
          getFieldProps('model').value === null && setValue(null)
        }
      }, [touched, values, getFieldProps])

     const handleSelectChange = (event: any) => {
         action && action(event)
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
         }  else if (name === 'company_id') {
             setValues(() => ({
                 // @ts-ignore
                 ...values,
               company_id: Number(event),
             }))
         }
         else if (name === 'is_active') {
             setValues(() => ({
                 // @ts-ignore
                 ...values,
               company_id: Boolean(event),
             }))
         }
         else if (name === 'user_status') {
             setValues(() => ({
                 // @ts-ignore
                 ...values,
               company_id: Boolean(event),
             }))
         }
         else {

             setValues(() => ({
                 // @ts-ignore
                 ...values,
                 [name]: event,
             }))

         }
     }

     return (
         <Select
            {...props}
           searchable={searchable}
              disabled={disabled}
             ref={ref}
              placeholder={placeholder}
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
