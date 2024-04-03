import { SvgSearch } from "components/common/ui/Icon";
import React, { EventHandler, useEffect, useRef, useState } from "react";
import { useStore } from "stores/store";
import { observer } from "mobx-react-lite";
import { useSearchParams } from "react-router-dom";
import { useDebouncedState, useDebouncedValue } from "@mantine/hooks";
import { runInAction } from "mobx";
import { useLocalStore } from "stores/localStore";

const TableSearch = ({ inputProps, action }: { inputProps?: { list?: string }; action?: (e: any) => void }) => {
  const localStore = useLocalStore()
  const [value, setValue] = useState("");
  const [debounced, cancel] = useDebouncedValue(value, 500);
  const ref = useRef(null)

 React.useEffect(() => {
    if(debounced !== "") {
      localStore.params.setSearchParams({page: 1, q: debounced})
    } else {
      localStore.params.setSearchParams({page: 1, q: null})
    }
  }, [debounced])

  return <div className={'form-search relative h-10'}>
    <input type={'search'}
      ref={ref}
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
