import { autorun, computed, flow, get, makeAutoObservable, observable, ObservableMap, reaction, runInAction, set, values } from "mobx";
import agent, { PaginationProps } from 'utils/agent'
import { hydrateStore, makePersistable } from "mobx-persist-store";

export class CatalogStore {
    constructor() {
        makeAutoObservable(this, {

        })
        makePersistable(this, {
            name: 'catalogStore',
            properties: [
                'cities',
                'currentServiceSubtypesOptions',
                'carBrands',
                'targetModelId',
                'brandModels',
                'carBrandModels',
                'services',
                'subtypesByService',
                'currentService',
                'currentServiceSubtypes',
                'loadingState'
            ],
            storage: window.sessionStorage,
        }, {fireImmediately: true})

        reaction(() => this.loadingState.brands,
          (brands) => {
              if (!brands) {
                this.getCarBrands().then(r => runInAction(() => {
                    console.log('loadded brands')
                    this.loadingState.brands = true
                }))
              }}
        )
        reaction(() => this.loadingState.services,
          (services) => {
              if (!services) {
                  this.getServices().then(r => runInAction(() => {
                      console.log('loadded services')
                      this.loadingState.services = true
                  }))
              }}
        )
        reaction(() => this.loadingState.cities,
          (cities) => {
              if (!cities) {
                this.getAllCities().then(r => runInAction(() => {
                    console.log('loadded cities')

                    this.loadingState.cities  = true
                }))

            }
        })
        reaction(() => this.cities,
                  (cities) => {
                      if (cities.size == 0) {
                        this.getAllCities().then(r => runInAction(() => {
                            console.log('loadded cities')
                            this.loadingState.cities  = true
                        }))

            }
        })

        reaction(
            () => this.currentService,
            (service) => {
                if (service !== 0) {
                    this.getServiceSubtypes(service)
                }
            },
        )
        reaction(
            () => this.targetModelId,
            async (targetModelId) => {
                if (targetModelId !== 0) {
                    try {
                        await this.getCarModelWithBrand(targetModelId)
                    } catch (e) {
                        console.log(e)
                    }
                }
            },
        )
    }
    loadingState = {
        cities: true,
        brands: true,
        models: true,
        services: true,
        types: true,
        subtypes: true,
    }
    setLoadingStateFalse() {
        this.loadingState = {
            cities: false,
            brands: false,
            models: false,
            services: false,
            types: false,
            subtypes: false,
        }
    }
    targetModelId = 0
    cities: Map<any, any> = observable.map([])
    services: Map<any, any> = observable.map([])
    currentService = 0
    subtypesByService: Map<any, any> = observable.map([])
    carBrands: Map<any, any> = observable.map([])
    brandModels = observable.array([])
    currentServiceSubtypes = observable.array(<any>[])
    currentServiceSubtypesOptions = new Map([])
    carBrandModels: Map<any, any> = observable.map([])
    carBrandModelsCount = 0
    currentCarModelWithBrand: any = {}
    carBrandModelsReference: any[] = []
    get brandModelsCurrent() {
        return this.brandModels
    }

    set clearOptions(val: any) {
        this.currentServiceSubtypesOptions.clear()
    }
    async getServices(params?: PaginationProps) {
        const { status, data } = await agent.Catalog.getServices(params)
        if (status == 200) {
            data.results.forEach((i: any) => this.services.set(String(i.id), i))
        }
    }
    async getServiceSubtypes(service_id: number, params?: PaginationProps) {
        const { status, data } = await agent.Catalog.getServiceSubtypesListByServiceId(service_id, params)
        if (status == 200) {
            runInAction(() => {
                this.currentServiceSubtypes = data.results
                data.results.forEach((i: any) => {
                    this.subtypesByService.set(String(service_id), i)
                })
            })
        }
    }
    get getSubtypesBySID() {

        if (!this.subtypesByService.has(this.currentService)) {
            this.subtypesByService.get(this.currentService)
        }

        return this.services.get(String(this.currentService))
    }
    getSubtypeByServiceId(service_id: number) {
        if (service_id !== 0) {
            return this.subtypesByService.get(String(service_id))
        }
        return []
    }
    async getCarBrandModels(id: number, params?: PaginationProps) {
        if (id) {
            const { data, status } = await agent.Catalog.getCarBrandModels(id, params)

            if (status === 200) {
                runInAction(() => {
                    this.brandModels = data.results.map((item: any) => ({ value: String(item.id), label: item.name }))
                })
            }
        }
    }
    async getCarBrands(params?: PaginationProps) {
        const { data, status }: any = await agent.Catalog.getCarBrands(params)
        if (status === 200) {
            data.results.forEach((i: any) => runInAction(() => this.carBrands.set(String(i.id), i)))
        }
    }
    async getCarBrandsModels() {
        let carBrandPage = 1
        let carBrandLength = 0
        let continueLoad: boolean = true
        const cMap = new Map([])
        const getAll = async () => {
            const { data, status, error } = await agent.Catalog.getCarModels({ page: carBrandPage })
            if (status === 200) {
                console.log('get cities ')
                carBrandLength = data.count
                data.results.forEach((i: any) =>  cMap.set(String(i.id), i))
                carBrandPage = carBrandPage + 1;
                (carBrandLength != cMap.size) ? continueLoad = true : continueLoad = false
            }
        }
        await getAll().finally(() => {
            if (continueLoad) {
                getAll()
            } else {
                runInAction(() => {
                    this.carBrandModels = cMap
                })
            }
        })
    }
    async loadCarBrandModelsReference(params: PaginationProps) {

        try {
            const { data, status }: any = await this.getCarBrands(params)
            if (status === 200) {
                values(data).forEach((el: any) => {
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
                            })
                        })
                })
            }
        } catch (e) {
            console.log(e)
        } finally {
        }
    }
    async getCarModelWithBrand(brandId: number) {
        const { data, status }: any = await agent.Catalog.getCarModelWithBrand(Number(brandId))
        if (status === 200) {
            runInAction(() => (this.currentCarModelWithBrand = data))
        }
        return await data
    }
    get getCurrentCarModelWithBrand() {
        if (this.carBrands.size === 0) {
            this.getCarBrands()
        }
        return this.currentCarModelWithBrand
    }
    getCities = flow(function* (this: CatalogStore, params?: PaginationProps) {
        let cities
        // if (this.cities.size === 0) {
            try {
                const { data } = yield agent.Catalog.getCities(params)
                cities = data.results
                this.cities = cities
            } catch (error) {}
            return this.allCities
        }
    )
    async getAllCities(params?: PaginationProps) {
        const { data, status, error } = await agent.Catalog.getCities({ page_size: 1000 })
        this.cities.clear()
        if (status === 200) {
            data.results.forEach((i: any) => runInAction(() => { set(this.cities, String(i.id), i)}))
        }
    }
    createCarBrand = flow(function* (
        this: CatalogStore,
        {
            car_type,
            model,
            brandId,
            brandName,
        }: {
            car_type: string
            model: string
            brandId?: number | undefined | null
            brandName?: string | undefined | null
        },
    ) {

        if (brandId) {
            try {
                const { data, status } = yield agent.Catalog.createCarBrandWithExistBrand(brandId, car_type, model)
                return { data, status }
            } catch (error) {
                console.log(error)
            }
        }
        if (brandName) {
            try {
                const { data, status }  = yield agent.Catalog.createCarBrandWithNewBrand(brandName, car_type, model)
                return { data, status }
            } catch (error) {
                console.log(error)
            }
        }
    })
    get carBrandsCurrent() {
        return values(this.carBrands)
    }
    get brandAndModels() {
        return this.carBrandModelsReference
    }


    get allCities() {
        return values(this.cities)
    }
    get carBrandsModels() {
        return values(this.carBrandModels)
    }
    clearBrandModels() {
        this.brandModels.clear()
    }
    hydrate() {
        hydrateStore('catalogStore')
    }

    getCity(id: number) {
        return get(this.cities, String(id))
    }
}

const catalogStore = new CatalogStore()

export default catalogStore
