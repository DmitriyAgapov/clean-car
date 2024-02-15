import React from "react";
import styles from "./SelectMantine.module.scss";
import { Select, SelectProps } from "@mantine/core";
import { useField } from "formik";
import { Observer } from "mobx-react-lite";
import SelectCustom from "components/common/ui/Select/Select";

type SelectMantineProps = {}
const SelectMantine = ({ label, required, onChange,...props }:SelectProps & {onChange?: (props:any) => void }) => {
	// @ts-ignore
	const [field, meta,helpers ] = useField(props);
	// @ts-ignore

	return (
        <label
            className={'account-form__input  flex-grow  !flex-[1_0_20rem]' + ' ' + props.className}
            htmlFor={props.id || props.name}
            data-form_error={meta.touched && meta.error ? 'error' : null}
        >
	          {required ? <div>{label}<i className='m-78a94662 mantine-InputWrapper-required mantine-Select-required' aria-hidden='true'> *</i></div> : label}
            <Select
                {...field}
                {...props}
                value={field.value}
                required={required}
                onChange={(e) => {
                  onChange && onChange(e)
                    helpers.setTouched(false, false)
                    helpers.setValue(e, true).then(() => helpers.setTouched(true, false))

                }}
                classNames={{
                    // dropdown: 'rounded-[0.625rem] border-color-[var(--formBorder)] hover:border-accent',
                    // wrapper: `rounded-[0.625rem]`,
                    // input: `rounded-[0.625rem] border-color-[var(--formBorder)] h-10`,
                    // option: 'font-body text-gray-2 hover:bg-transparent hover:text-accent !font-medium data-[checked=true]:text-accent py-1.5 px-2',
                }}
            />
            {meta.touched && meta.error ? <div className={'form-error'}>{meta.error}</div> : null}
        </label>
        // <div>
        // 	<label htmlFor={props.id || props.name}>{label}</label>
        // 	<Select {...field} {...props} value={field.value}
        // 		onChange={(e) => helpers.setValue(e, true)} />
        // 	{meta.touched && meta.error ? (
        // 		<div className="error">{meta.error}</div>
        // 	) : null}
        // </div>
    )
};
export default SelectMantine;
