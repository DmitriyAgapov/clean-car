// import { Option, Select } from '@material-tailwind/react'
import React from 'react'
import SelectCustom from 'components/common/ui/Select/Select'
import { Field, useFormik, useFormikContext } from 'formik'

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
  //   console.log(event.target);
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
  switch (type) {
    case 'text':

      input = (
        <label className={'account-form__input w-full flex-grow ' + className} htmlFor={name}>
          {text}

          <input id={name} name={name} placeholder={placeholder} type={type}
            // @ts-ignore
            onChange={(e) => action(e)} value={value} {...props}/>
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

interface CreateFormikInputProps {
  fieldName: string
  placeHolder: string
  fieldType: string
  label: string
  className?: string
}

export function CreateFormikInput({fieldName, placeHolder = "", label, fieldType, className }:CreateFormikInputProps) {
  const {errors, touched}:any = useFormikContext()
  return <label
    className={'account-form__input w-full flex-grow  !flex-[1_0_20rem]' + " " + className}
    htmlFor={fieldName}
    data-form_error={errors[`${fieldName}`] && touched[fieldName] && 'error'}

  >
    {label}
    <Field
      id={fieldName}
      name={fieldName}
      placeholder={placeHolder}
      type={fieldType}
    />
    {errors[fieldName] && touched[fieldName] ? (
      <div className={'form-error'}>{errors[fieldName]}</div>
    ) : null}
  </label>
}
export default CreateInput
