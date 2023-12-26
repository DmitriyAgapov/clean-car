import { flow, makeObservable, observable } from 'mobx'
import agent from 'utils/agent'
type City = {
  id: number
  name: string
}
export class CatalogStore {
  cities: City[] = []
  getCities = flow(function* (this: CatalogStore) {
    let cities
    if (this.cities.length === 0) {
      try {
        const { data } = yield agent.Catalog.getCities()
        cities = data.results
        this.cities = cities
      } catch (error) {}

      return this.cities
    }
  })

  constructor() {
    makeObservable(this, {
      cities: observable,
    })
  }
  getCity(id:number) {
    if(id) return this.cities.filter((item: City) => item.id == id)[0].name
  }
}

const catalogStore = new CatalogStore()

export default catalogStore
