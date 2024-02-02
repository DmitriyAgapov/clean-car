import React, { useEffect, useRef, useState } from 'react'
import styles from "./InputAutocomplete.module.scss";
import agent from "utils/agent";
import { Combobox, TextInput, useCombobox, Loader } from '@mantine/core'
import { useFormikContext } from 'formik'
import { useStore } from "stores/store";
import catalogStore from "stores/catalogStore";

type InputAutocompleteComponent = {}


export function InputAutocompleteComponent(props:any) {
  const store= useStore()
  const { values, touched,  errors, isValidating }:any = useFormikContext();
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });
  const ref = useRef(null)
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[] | null>([]);
  const [value, setValue] = useState(values.address);
  const [tempAdress, setTempAdress] = useState(values.city);
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

    if (values.city && !values.address) {
      const cityName = store.catalogStore.getCity(values.city)
      cityName && setValue(cityName + ', ')

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
      if(item.data.geo_lat && item.data.geo_lon) {
          values.lat = item.data.geo_lat;
          values.lon = item.data.geo_lon;

    }}}>
      {item.value}

    </Combobox.Option>
  ));

  return (
    <Combobox
      onOptionSubmit={(optionValue) => {
        setValue(optionValue)
        combobox.closeDropdown()
      }}
      {...props}
      withinPortal={false}
      store={combobox}
    >
      <Combobox.Target>
        <label className={`account-form__input w-full flex-grow  !flex-[1_0_20rem] ${!values.city && "filter grayscale"}`}
          htmlFor={'address'}
          data-form_error={errors.address && touched.address && 'error'}>
          {'Адрес'}
        <TextInput
          ref={ref}
          disabled={!values.city}
          unstyled
          placeholder='Введите название компании'
          value={value}

          onChange={(event: { currentTarget: { value: React.SetStateAction<string> } }) => {
            setValue(event.currentTarget.value)
            values.address = event.currentTarget.value;
            // @ts-ignore
            fetchOptions(event.currentTarget.value)
            combobox.resetSelectedOption()
            combobox.openDropdown()
          }}
          onClick={() => combobox.openDropdown()}
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

export default InputAutocompleteComponent;
