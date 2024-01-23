import { flow, makeAutoObservable, runInAction } from "mobx";
import agent, { PaginationProps } from 'utils/agent'
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
            properties: ['cities', 'carBrands', 'brandModels', 'carBrandModels'],
            storage: window.sessionStorage,
        })
    }

    cities: City[] = []
    services: City[] = []
    carBrands = []
    brandModels = []
    carBrandModels = []
    carBrandModelsReference: any[] = []

    getServices = flow(function* (this: CatalogStore, params?: PaginationProps) {
        const { status, data } = yield agent.Catalog.getServices(params)
        if (status == 200) {
            this.services = data
        }
    })
    getCarBrandModels = flow(function* (this: CatalogStore, id: number, params?: PaginationProps) {
        try {
            const { data } = yield agent.Catalog.getCarBrandModels(id, params)
            this.carBrandModels = data.results
            runInAction(() => {
                this.brandModels = data.results.map((item: any) => ({ value: String(item.id), label: item.name }))
            })
        } catch (e) {
            console.log(e)
        }
    })
    getCarBrands = flow(function* (this: CatalogStore, params?: PaginationProps) {
        let tempCarBrands
        try {
            const { data }: any = yield agent.Catalog.getCarBrands(params)
            tempCarBrands = data.results
            this.carBrands = tempCarBrands
        } catch (error) {
            console.log(error)
        } finally {
            console.log(this.carBrands)
        }
        return tempCarBrands
    })
    loadCarBrandModelsReference = flow(function* (this: CatalogStore, params: PaginationProps) {
        let brands
        let models: any[] = []
        try {
            brands = yield this.getCarBrands(params)
        } catch (e) {
            console.log(e)
        } finally {
            brands.forEach((el: any) => {
                this.getCarBrandModels(el.id)
                    .then((r) => r)
                    .finally(() => {
                    runInAction(() => {
                        console.log(el)
                        this.carBrandModels.forEach((e: any) => {
                            this.carBrandModelsReference.push({
                                id: e.id,
                                name: el.name,
                                model: e.name,
                                car_class: e.car_class,
                            })
                        })
                    })})
            })
        }
    })
    getCities = flow(function* (this: CatalogStore, params?: PaginationProps) {
        let cities
        if (this.cities.length === 0) {
            try {
                const { data } = yield agent.Catalog.getCities(params)
                cities = data.results
                this.cities = cities
            } catch (error) {}
            return this.cities
        }
    })
    createCarBrand = flow(function* (this: CatalogStore, car_class: string, model: string, brandId?: number, brandName?: string) {
        if(brandId) {
            try {
                const { data } = yield agent.Catalog.createCarBrandWithExistBrand(brandId, car_class, model)
                return data
            } catch (error) {
                console.log(error)
            }
        }
        if(brandName) {
            try {
                const { data } = yield agent.Catalog.createCarBrandWithNewBrand(brandName, car_class, model)
                return data
            } catch (error) {
                console.log(error)
            }
        }
    })
    get brandAndModels() {
        return this.carBrandModelsReference
    }
    clearBrandModels() {
        this.brandModels = []
    }

    getCity(id: number) {
        return this.cities.filter((item: City) => item.id == id)[0].name
    }
}

const catalogStore = new CatalogStore()

export default catalogStore
