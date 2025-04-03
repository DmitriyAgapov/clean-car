import { useLocalObservable } from 'mobx-react-lite'
import React from 'react'
import { TableWithSortStore } from "components/common/layout/TableWithSort/TableWithSort.store";
import { keys, makeAutoObservable, observable, ObservableMap, reaction, values } from 'mobx'
import agent from "utils/agent";

const storeContext = React.createContext(null)

export const LocalStoreProvider = ({stores, children }: { stores: any, children: React.ReactNode }) => {
  const store = useLocalObservable(() => stores)
  return <storeContext.Provider value={store}>{children}</storeContext.Provider>
}

export const useLocalStore = <T extends LocalRootStore>(): T  => {
  const store = React.useContext(storeContext)
  if (!store) {
    // this is especially useful in TypeScript so you don't need to be checking for null all the time
    throw new Error('useStore must be used within a StoreProvider.')
  }
  return store
}
export const TransferStoreProvider = ({stores, children }: { stores: any, children: React.ReactNode }) => {
  const store = useLocalObservable(() => stores)
  return <storeContext.Provider value={store}>{children}</storeContext.Provider>
}

export const useTransferStore = <T extends TransferComponentStore>(): T  => {
  const store = React.useContext(storeContext)
  if (!store) {
    // this is especially useful in TypeScript so you don't need to be checking for null all the time
    throw new Error('useStore must be used within a StoreProvider.')
  }
  return store
}

export class LocalRootStore  {
  params: TableWithSortStore  = new TableWithSortStore()
  data: any | undefined | null  = null
  count_data: number | null = null
  isLoading: boolean  = true
  inFinitiveScroll: boolean = false
  inFinitiveScrollResults  = new Map([])
  constructor() {
    makeAutoObservable(this)
  }
  loadMore() {
    this.inFinitiveScroll = true
    const next = this.params.getSearchParams.page + 1

    this.params.setSearchParams({page: next, page_size: 10 })
  }
  set setData(data: any) {
    // const _initAr = this.getData
    if(data && data.count && this.count_data !== data.count) {
      this.count_data = data.count
    }
    if(data && data.results) {
      data.results.forEach((item:any, index:number) => {
        this.inFinitiveScrollResults.set(String(item.id), item)
      })
    }
    //
    // if(this.inFinitiveScrollResults.size === 0) {
    //   console.log('empty');
    //   data?.results?.forEach((item:any, index:number) => this.inFinitiveScrollResults.set(item.id, item))
    // } else if(this.inFinitiveScroll) {
    //   // if(data.results && data.results?.length !== 0) {
    //     data?.results?.forEach((item:any, index:number) => this.inFinitiveScrollResults.set(item.id, item))
    //   // }
    //   console.log(this.inFinitiveScrollResults);
    //
    // }

    this.data = data

  }
  get countData() {
    return this.count_data
  }
  set initParams(args: any) {
    this.params.clearParams()
  }
  set setIsLoading(value: boolean) {
    this.isLoading = value
  }
  get getIsLoading() {
    return this.isLoading
  }
  get getData() {
    // if(this.inFinitiveScroll) {
    //   return ({
    //     ...this.data,
    //     results: values(this.inFinitiveScrollResults)
    //   })
    // }
    return this.data
  }
}
// export class EditPage extends LocalRootStore {
//   constructor() {super();}
//   async loadCompanies() {
//     return agent.Companies
//   }
// }
export class TransferComponentStore {
  selected: ObservableMap = observable.map([])
  unSelected: ObservableMap = observable.map([])
  searchString: string = ''
  params: TableWithSortStore  = new TableWithSortStore()
  constructor() {
    makeAutoObservable(this)
  }
  setSearchString(value:string) {
    this.searchString = value
  }
  get getSearchString() {
    return this.searchString.toLowerCase().trim()
  }
  loadUnSelected(ar:any[]) {
    ar.forEach(el => this.unSelected.set(el.id, el))
  }
  loadSelected(ar:any[]) {
    ar.forEach(el => this.selected.set(el.id, el))
  }
  get getSelected() {
    return values(this.selected)
  }
  get getUnSelected() {
    return values(this.unSelected)
  }
  moveToSelected(id:string) {
    this.selected.set(id, this.unSelected.get(id))
    this.unSelected.delete(id)
  }
  moveToUnSelected(id:string) {
    this.unSelected.set(id, this.selected.get(id))
    this.selected.delete(id)
  }
}
