import { flow, makeAutoObservable, makeObservable, observable } from 'mobx'
import agent from 'utils/agent'
import { makePersistable } from 'mobx-persist-store'
type City = {
  id: number
  name: string
}
export class CatalogStore {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
    makePersistable(this, {
      name: 'catalogStore',
      properties: ['cities', 'carBrands'],
      storage: window.localStorage,
    })
    }

  cities: City[] = []
  carBrands = []
  brandModels = []
  getCarBrandModels = flow(function* (this: CatalogStore, id: number) {
    try {
      const { data } = yield agent.Catalog.getCarBrandModels(id)
      console.log(data);
      this.brandModels = data.results.map((item: any) => ({ value: String(item.id), label: item.name }))
      console.log(this.brandModels);

    } catch (e) {
      console.log(e);
    }

  })
  getCarBrands = flow(function* (this: CatalogStore) {

    let tempCarBrands

      try {
        const { data } = yield agent.Catalog.getCarBrands()
        tempCarBrands = data.results
        console.log(data);
        this.carBrands = tempCarBrands
      } catch (error) {
        console.log(error);
      }
      finally {
        console.log(this.carBrands);
      }

    return tempCarBrands
  })
  getCities = flow(function* (this: CatalogStore) {
    let cities
    if (this.cities.length === 0) {
      try {
        const { data } = yield agent.Catalog.getCities()
        cities = data.results
        console.log(data);
        this.cities = cities
      } catch (error) {}

      return this.cities
    }
  })

  clearBrandModels() {
    this.brandModels = []
  }

  getCity(id:number) {
    if(id) return this.cities.filter((item: City) => item.id == id)[0].name
  }
}

const catalogStore = new CatalogStore()

export default catalogStore
