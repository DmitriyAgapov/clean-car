import { flow, makeObservable, observable } from 'mobx'
import agent from 'utils/agent'

export class CatalogStore {
  cities = []
  getCities = flow(function* (this: CatalogStore) {
    let cities
    if (this.cities.length === 0) {
      try {
        const { data } = yield agent.Catalog.getCities()
        cities = data.results
        this.cities = cities
      } catch (error) {}
      return cities
    }
  })

  constructor() {
    makeObservable(this, {
      cities: observable,
    })
  }
}

const catalogStore = new CatalogStore()

export default catalogStore
