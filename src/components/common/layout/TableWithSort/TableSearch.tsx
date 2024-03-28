import { SvgSearch } from "components/common/ui/Icon";
import React, { EventHandler, useEffect, useState } from "react";
import { useStore } from "stores/store";
import { observer } from "mobx-react-lite";
import { useSearchParams } from "react-router-dom";
import { useDebouncedState, useDebouncedValue } from "@mantine/hooks";
import { runInAction } from "mobx";

const TableSearch = ({ inputProps, action }: { inputProps?: { list?: string }; action?: (e: any) => void }) => {
  const store = useStore()
  let [searchParams, setSearchParams] = useSearchParams()
  const [value, setValue] = useState("");
  const [debounced, cancel] = useDebouncedValue(value, 500);

 React.useEffect(() => {
    if(debounced !== "") {
      store.paramsStore.setParams({ page: 1, q: debounced})
      searchParams.set('q',debounced)
      searchParams.set('page', "1")
      setSearchParams(searchParams)
    } else {
      searchParams.delete('q')
      store.paramsStore.removeQParams();
      setSearchParams(() => (searchParams.toString()))
    }
  }, [debounced])

  return <div className={'form-search relative h-10'}>
    <input type={'search'}
      placeholder={'Быстрый поиск'}
      value={value}
      // onChange={action}
      onChange={(e:any) => setValue(e.target.value)}
      className={'search-dashboard'}
      {...inputProps} />
    <SvgSearch />
  </div>
}
export default observer(TableSearch)
