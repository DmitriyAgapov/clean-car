import { useLocalObservable } from 'mobx-react-lite'
import React from 'react'
import { TableWithSortStore } from "components/common/layout/TableWithSort/TableWithSort.store";
import { makeAutoObservable } from "mobx";

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

export class LocalRootStore  {
  params: TableWithSortStore  = new TableWithSortStore()
  data: any | undefined | null  = null
  isLoading: boolean  = true
  constructor() {
    makeAutoObservable(this)
  }
  set setData(data: any) {
    this.data = data
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
    return this.data
  }
}

