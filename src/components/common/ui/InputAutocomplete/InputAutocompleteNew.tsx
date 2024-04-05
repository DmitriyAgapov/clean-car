import React, { useEffect, useRef, useState } from 'react'
import styles from "./InputAutocomplete.module.scss";
import agent from "utils/agent";
import { Combobox, TextInput, useCombobox, Loader } from '@mantine/core'
import { useFormikContext } from 'formik'
import { useStore } from "stores/store";
import catalogStore from "stores/catalogStore";
import { useFormContext } from "components/Form/FormCreateCompany/FormCreateUpdateCompany";

export function InputAutocompleteNew(props:any) {

  const { values, isTouched,  errors } = props.ctx;

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
      const dataToform = { query: query, locations: [
          {
            // region: "Челябинская область",
            city: props.city,

          }
        ],
        restrict_value: true }
      // @ts-ignore
      const response = await agent.Utils.suggest(dataToform)
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
      // const cityName = store.catalogStore.getCity(values.city).name
      // cityName && setValue(cityName + ', ')

      if (ref && ref.current) {
        // @ts-ignore
        // const cityNameLength = cityName.size
        // @ts-ignore
        ref.current.focus();
        // @ts-ignore
        // ref.current.setSelectionRange(cityNameLength + 1, cityNameLength + 1)
      }
    }
    if(!values.city) {
      setValue('')
      setData([])
    }

  }, [values.city])
  const [prefix, setPrefix] = useState('')

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

      setPrefix(item.label)
      if(item.data.geo_lat && item.data.geo_lon) {
          values.lat = item.data.geo_lat;
          values.lon = item.data.geo_lon;

    }}}>
      {item.value}

    </Combobox.Option>
  ));
  // @ts-ignore
  return (
      <Combobox
          onOptionSubmit={(optionValue) => {
              setValue(optionValue + ' ')
              combobox.closeDropdown()
          }}
          {...props}
          withinPortal={true}
          store={combobox}
      >
          <Combobox.Target>
              <label
                  className={`account-form__input w-full flex-grow  flex-[1_0_20rem] ${!values.city && 'filter grayscale'}`}
                  htmlFor={'address'}
                  data-form_error={errors.address && isTouched('address') && 'error'}
              >
                  <text>{'Адрес'}{' '}
                  <span style={{color: 'var(--input-asterisk-color, var(--mantine-color-error))', paddingLeft: 0}} className='mantine-InputWrapper-required mantine-Select-required' aria-hidden='true'>

                      *
                  </span></text>
                  <TextInput
                      ref={ref}
                      disabled={!values.city}
                      placeholder='Введите адрес'
                      value={value}
                      onChange={(event: { currentTarget: { value: React.SetStateAction<string> } }) => {
                          setValue(event.currentTarget.value)
                          console.log(values.city_name.length)
                          values.address = event.currentTarget.value
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
                    error={errors.address && isTouched('address')}
                      // leftSectionWidth={widthLeftProp}
                      // //@ts-ignore
                      // leftSection={<>{values.city_name}, </>}
                      className={'text-sm'}
                      // leftSectionProps={{
                      //   className: 'w-auto pl-[8px] ',
                      //   style: {fontSize: '.875rem', lineHeight: 'normal', fontWeight: 500, color: 'rgb(96 97 99 / 1)', fontFamily: "Montserrat, sans-serif"}
                      //
                      // }}
                      onBlur={() => combobox.closeDropdown()}
                      rightSection={loading && <Loader size={18} />}
                  />
                  {errors.address && isTouched('address') ? <div className={'form-error'}>{errors.address}</div> : null}
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

export default InputAutocompleteNew;
