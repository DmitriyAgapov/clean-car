import React, { useEffect, useRef, useState } from 'react'
import styles from "./InputAutocomplete.module.scss";
import agent from "utils/agent";
import { Combobox, TextInput, useCombobox, Loader } from '@mantine/core'
import { useFormikContext } from 'formik'
import { useStore } from "stores/store";
import catalogStore from "stores/catalogStore";
import { SvgSearch } from "components/common/ui/Icon";

type InputAutocomplete = {}


export function InputAutocompleteWithCity(props:any) {

  const store= useStore()
  const { step1, step2 ,step3} = store.bidsStore.formDataAll
  const { values, touched,  errors, isValidating }:any = useFormikContext();

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });
  const ref = useRef(null)
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[] | null>([]);
  const [value, setValue] = useState('');
  const [tempAdress, setTempAdress] = useState('');
  const [empty, setEmpty] = useState(false);
  const abortController = useRef<AbortController>();

  async function getData(query: string) {
    try {
      // @ts-ignore
      const response = await agent.Utils.suggest({ query: query })
      // @ts-ignore
      setData(response)
      combobox.resetSelectedOption()
      // @ts-ignore
      const {data} = response
      return data.suggestions
    } catch (e) {
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {

    setData(null)
    tempAdress !== values.city ? values.address = '' : void null

    if (values.city && (!values.address || values.address === '')) {
      const cityName = store.catalogStore.getCity(values.city)

      cityName && setValue(cityName.name + ', ')

      if (ref && ref.current && cityName) {
        // @ts-ignore
        const cityNameLength = cityName.size
        // @ts-ignore
        ref.current.focus();
        // @ts-ignore
        ref.current.setSelectionRange(cityNameLength + 1, cityNameLength + 1)
      }
    }
    if(!values.city) {
      setValue('')
      setData([])
    }

  }, [values.city])

  const fetchOptions = (query: string) => {
    abortController.current?.abort();
    abortController.current = new AbortController();
    setLoading(true);

    getData(query)
    .then((result) => {
      // @ts-ignore
      setData(result);
      setLoading(false);

      setEmpty(result.length === 0);
      abortController.current = undefined;
    })
    .catch(() => {});
  };

  const options = (data || []).map((item, index) => (
    <Combobox.Option value={item.value} key={index} onClick={() => {
      values.address = item.value
      store.bidsStore.formResultSet({address: item.value})
      if(item.data.geo_lat && item.data.geo_lon) {
          values.lat = item.data.geo_lat;
          values.lon = item.data.geo_lon;

    }}}>
      {item.value}

    </Combobox.Option>
  ));

  return (
    <Combobox
      onOptionSubmit={(optionValue, optionProps) => {
        setValue(optionValue)
        props.action(values.address)
        combobox.closeDropdown()
      }}
      {...props}
      withinPortal={false}
      store={combobox}
    >
      <Combobox.Target>
        <label className={`account-form__input w-full flex-grow  !flex-[1_0_20rem] col-span-2`}
          htmlFor={'address'}
          data-form_error={errors.address && touched.address && 'error'}>
          {step3.fields[0].label}
        <TextInput
          leftSection={<SvgSearch  className={'absolute'}/>}
          ref={ref}
          // disabled={!values.city}

          placeholder='Адрес'
          value={value}

          onChange={(event: { currentTarget: { value: React.SetStateAction<string> } }) => {

            setValue(event.currentTarget.value)
            values.address = event.currentTarget.value;
            // @ts-ignore
            fetchOptions(event.currentTarget.value)
            combobox.resetSelectedOption()
            combobox.openDropdown()
          }}
          // onClick={() => values.address.length > 4 && combobox.openDropdown()}
          onFocus={() => {

            if (data && data.length !== 0) {
              combobox.openDropdown()
            }
            if (data === null) {
              fetchOptions(value)
            }
          }}
          onBlur={() => combobox.closeDropdown()}
          rightSection={loading && <Loader size={18} />}
        />
          {errors.address && touched.address ? (
            <div className={'form-error'}>{errors.address}</div>
          ) : null}
        </label>
      </Combobox.Target>

      <Combobox.Dropdown hidden={data === null}>
        <Combobox.Options onClick={(e) => console.log(options)}>
          {options}
          {empty && <Combobox.Empty>Не найдено</Combobox.Empty>}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  )
}

export default InputAutocompleteWithCity;
