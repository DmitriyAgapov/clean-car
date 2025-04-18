import { useLocalObservable } from 'mobx-react-lite'
import React from 'react'
import rootStore, { RootStore } from './index'
import {  configure, toJS } from "mobx";
configure({ enforceActions: "always" })

const storeContext = React.createContext<RootStore | null>(null)

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const store = useLocalObservable(() => rootStore)
  return <storeContext.Provider value={store}>{children}</storeContext.Provider>
}

export const useStore = () => {
  const store = React.useContext(storeContext)
  if (!store) {
    // this is especially useful in TypeScript so you don't need to be checking for null all the time
    throw new Error('useStore must be used within a StoreProvider.')
  }
  return store
}
