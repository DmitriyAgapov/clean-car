// import { Option, Select } from '@material-tailwind/react'
import React, { useEffect } from "react";
import SelectCustom from 'components/common/ui/Select/Select'
import { Field, useField, useFormik, useFormikContext } from "formik";
import Select from "components/common/ui/Select/Select";
import { InputBase, SelectProps } from "@mantine/core";
import { Observer } from "mobx-react-lite";
import { useStore } from "stores/store";
import SelectMantine from "components/common/ui/SelectMantine/SelectMantine";
import { IMaskInput } from "react-imask";

export type CreateInputProps = {
    text: string
    name: string
    action?: (e?: React.ChangeEvent<any>) => void
    getValue?: (value: {name: string, value: any}) => void
    value?: string | number
    placeholder?: string
    type: string
    depend?: any
    children?: React.ReactNode | React.ReactNode[]
    className?: string
    options?: never | { label: string; value?: boolean | string | number }[]
}

const CreateInput = ({
  text,
  name,
  placeholder,
  action,
  getValue,
  depend,
  // @ts-ignore
  value,
  type,
  children,
  options,
  className = '',
  ...props
}: CreateInputProps) => {
  let input: React.ReactNode | React.JSX.Element
  // const handleChange = (event: React.ChangeEvent<unknown>) => {

  //
  //   if(!event.target) {
  //     if (getValue) {
  //       getValue({
  //         name: name, value: event
  //       });
  //     }
  //   }
  //   // @ts-ignore
  //   action(event);
  //
  // }
  const { values, submitForm, errors , setFieldValue, touched, setValues } = useFormikContext()
  switch (type) {
    case 'text':

      input = (
        <label className={'account-form__input w-full flex-grow ' + className} htmlFor={name}  data-form_error={
          //@ts-ignore
           errors[name] && touched[name]  && 'error'}>
          {text}

          <input id={name} name={name} placeholder={placeholder} type={type} onInput={(event) =>

            setFieldValue(name, event.currentTarget.value, true)
          }
            // @ts-ignore
            onChange={(e) => action(e)} value={value} {...props}/>
          {//@ts-ignore
            errors[name] && touched[name] ? (<div className={'form-error'}>{errors[name]}</div>) : null}
        </label>
      )
      break
    case 'number':
      input = (
        <label className={'account-form__input w-full flex-grow ' + className} htmlFor={name}>
          {text}
          <input id={name} name={name} placeholder={placeholder} type={type}
            // @ts-ignore
            onChange={(e) => action(e)} value={value} {...props}/>
        </label>
      )
      break
    case 'select':
      input = (
        <SelectCustom label={text} className={'bg-white account-form__input  w-full flex-grow  flex-1'} options={options}
          // @ts-ignore
          name={name} value={value} action={(event) => action(event)}/>

      )
      break
    case 'depend':
      if (depend)
        input = (
            <label className={'account-form__input w-full flex-grow ' + className} htmlFor={name}>
                {text}
                <input
                    id={name}
                    name={name}
                    placeholder={placeholder}
                    type={'number'}
                    onChange={action}
                    value={value}
                />
            </label>
        )
      break
  }
  return <>{input}</>
}

type CreateFormikInputProps<props> =  Partial<SelectProps> &  {
  fieldName: string
  placeholder?: string
  fieldType: string
  label: string
  className?: string
  defaultValue?: string
  options?: any[]
  disabled?: boolean
  onChange?: (e: React.ChangeEvent<any>) => void
}

export function CreateFormikInput({fieldName, placeholder = "", onChange, defaultValue,  disabled = false, label, options, fieldType, className, ...props }:CreateFormikInputProps<any>):React.ReactElement {
  const {errors, touched, values, set}:any = useFormikContext()

  const store = useStore()

  const inputElement = React.useMemo(() => {
    if(fieldType == 'divider') return <hr className={'col-span-full flex-[1_100%]'}/>
    if(fieldType == 'select') return <label
      className={'account-form__input w-full flex-grow  !flex-[1_0_20rem]' + " " + className}
      htmlFor={fieldName}
      data-form_error={(errors[`${fieldName}`] && touched[`${fieldName}`]) ? 'error' : null}

    >
      {label}
      <Observer children={() => <SelectCustom {...props} onChange={onChange} defaultValue={defaultValue} name={fieldName}   disabled={disabled} options={fieldName == 'model' ? values.carModels : fieldName == 'models' ? store.carStore.getBrandModels : options} searchable={props.searchable}  placeholder={placeholder}  />}/>
      {(errors[`${fieldName}`] && touched[`${fieldName}`]) ? (
      <div className={'form-error'}>{errors[fieldName]}</div>
    ) : null}


  </label>
    if(fieldType == 'text') return <label
      className={'account-form__input w-full flex-grow  !flex-[1_0_20rem]' + " " + className}
      htmlFor={fieldName}
      data-form_error={(errors[`${fieldName}`] && touched[`${fieldName}`]) ? 'error' : null}

    >
      {label}<Field

      id={fieldName}
      name={fieldName}
      placeholder={placeholder}
      type={fieldType}
    />{(errors[`${fieldName}`] && touched[`${fieldName}`]) ? (
      <div className={'form-error'}>{errors[`${fieldName}`]}</div>
    ) : null}
    </label>

    if(fieldType == 'telphone') return <label
      className={'account-form__input w-full flex-grow  !flex-[1_0_20rem]' + " " + className}
      htmlFor={fieldName}
      data-form_error={(errors[`${fieldName}`] && touched[`${fieldName}`]) ? 'error' : null}

    >
      {label}<Field
      as={IMaskInput}
      //@ts-ignore
        mask='+7 000 000 0000' placeholder='+7 000 000 0000'
      id={fieldName}
      name={fieldName}
      type={fieldType}
    />{(errors[`${fieldName}`] && touched[`${fieldName}`]) ? (
      <div className={'form-error'}>{errors[`${fieldName}`]}</div>
    ) : null}
    </label>

  }, [values, errors, touched])
  return <>{inputElement}</>

}
export default CreateInput
