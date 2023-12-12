import { Option, Select } from '@material-tailwind/react'
import React from 'react'
import SelectCustom from "components/common/ui/Select/Select";

export type CreateInputProps = {
    text: string
    name: string
    action?: (e?: React.ChangeEvent<any>) => void
    getValue?: (value: {name: string, value: any}) => void
    value?: string | number
    placeholder?: string
    type: string
    depend?: any
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
            <input id={name} name={name} placeholder={placeholder} type={'number'} onChange={action} value={value} />
          </label>
        )
      break
  }
  return <>{input}</>
}
export default CreateInput
