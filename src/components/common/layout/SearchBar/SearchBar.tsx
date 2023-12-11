import React from 'react'
import styles from './SearchBar.module.scss'
import { SvgSearch } from 'components/common/ui/Icon'

type SearchBarProps = {}
const SearchBar = () => {
  return (
    <div className={styles.SearchBar + ' ' + 'form-search relative'}>
      <input type={'search'} placeholder={'Быстрый поиск'} className={'search-dashboard'} />
      <SvgSearch className={'inline-block absolute top-3 left-6 w-4 h-4 opacity-50'} />{' '}
    </div>
  )
}

export default SearchBar
