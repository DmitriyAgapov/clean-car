import { SvgSearch } from "components/common/ui/Icon";
import React from 'react'

const TableSearch = ({ inputProps, action }: { inputProps?: { list?: string }; action?: (e: any) => void }) => (
  <div className={'form-search relative h-10'}>
    <input
      type={'search'}
      placeholder={'Быстрый поиск'}
      onChange={action}
      className={'search-dashboard'}
      {...inputProps}
    />
    <SvgSearch />
  </div>
)
export default TableSearch
