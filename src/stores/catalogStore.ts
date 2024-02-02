import { action, autorun, flow, makeAutoObservable, observable, ObservableMap, reaction, runInAction, values } from "mobx";
import agent, { PaginationProps } from 'utils/agent'
import { hydrateStore, makePersistable } from "mobx-persist-store";
import { errors } from "jose";
import FormCreateCarBrand from "components/Form/FormCreateCarBrand/FormCreateCarBrand";
import paramsStore from "stores/paramStore";

type City = {
    id: number
    name: string
}

export class CatalogStore {
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
        makePersistable(this, {
            name: 'catalogStore',
            properties: [
                'cities',
                'currentServiceSubtypesOptions',
                'carBrands',
                'brandModels',
                'carBrandModels',
                'services',
                'subtypesByService',
                'currentService',
                'currentServiceSubtypes',
            ],
            storage: window.sessionStorage,
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
            () => this.carBrandModels,(carBrandModels) => {

                if (carBrandModels.size !== 0) {
                     this.getCarBrandsModels()
                }
            }
        )
        reaction(() => this.getAllCities(),
            async (cities) => {
                if (this.cities.size === 0) {
                    try {
                        await cities
                    } catch (e) {
                        console.log(e)
                    }
                }
            },
        )
        reaction(
            () => this.carBrandModels,
            async (carBrandModels) => {
                if (carBrandModels.size === 0) {
                    try {
                        await this.getCarBrandsModels()
                    } catch (e) {
                        console.log(e)
                    }
                }
            },
        )
        reaction(
            () => this.carBrands,
            async (carBrands) => {
                if (carBrands.size === 0) {
                    try {
                        await this.getCarBrands()
                    } catch (e) {
                        console.log(e)
                    }
                }
            },
        )
        reaction(() => this.targetModelId, async (targetModelId) => {
            if (targetModelId !== 0) {
                try {
                    await this.getCarModelWithBrand(targetModelId)
                } catch (e) {
                    console.log(e)
                }
            }
        })
        reaction(
            () => this.services,
            async (services) => {
                if (services.size === 0) {
                    await this.getServices()
                }
            },
        )
    }
    targetModelId = 0
    textData = {
        path: 'car_brands',
        labelsForItem: ['Марка', 'Класс', 'Модель'],
        title: 'Марки автомобилей',
        create: 'Добавить',
        referenceTitle: 'Марка автомобиля',
        createPage: 'Добавить марку автомобиля',
        tableHeaders: [{label: 'Бренд', name: 'brand'},{label: 'Модель', name: 'name'}, {label: 'Тип', name: 'car_class'}],
        createPageDesc: 'Укажите основную информацию о марке автомобиля, для добавления в справочник.',
        createPageBack: 'Назад к списку марок автомобилей',
        editPageHeader: 'Редактировать марку автомобиля',
        editPageDesc: 'Укажите основную информацию о марке автомобиля, для добавления в справочник.',
    }
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
    currentCarModelWithBrand:any = {}
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
        console.log(this.subtypesByService.get(String(this.currentService)))
        if (!this.subtypesByService.has(this.currentService)) {
            this.subtypesByService.get(this.currentService)
        }
        console.log(this.subtypesByService.get(String(this.currentService)))
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
            console.log(data)
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
        let carBrandPage = 1;
        let carBrandLength = 0;
        let continueLoad:boolean = true ;
        const cMap = new Map([])
        const getAll = async () => {
            const { data, status, error } = await agent.Catalog.getCarModels({ page: carBrandPage })
            if (status === 200) {
                console.log()
                carBrandLength = data.count
                data.results.forEach((i: any) =>  cMap.set(String(i.id), i))
                carBrandPage = carBrandPage + 1;
                (carBrandLength != cMap.size) ? continueLoad = true : continueLoad = false
            }
            console.log(carBrandLength != cMap.size)
            console.log(carBrandLength)
            console.log(continueLoad)

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
        let models: any[] = []
        try {
            const { data, status }: any = await this.getCarBrands(params)
            if (status === 200) {
                console.log(data)
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
        console.log(brandId);
        const {data, status}:any = await agent.Catalog.getCarModelWithBrand(Number(brandId))
        if(status === 200) {
          runInAction(() => this.currentCarModelWithBrand = data)
        }
        return await data
    }
    get getCurrentCarModelWithBrand() {
        return this.currentCarModelWithBrand
    }
    getCities = flow(function* (this: CatalogStore, params?: PaginationProps) {
        let cities
        if (this.cities.size === 0) {
            try {
                const { data } = yield agent.Catalog.getCities(params)
                cities = data.results
                this.cities = cities
            } catch (error) {}
            return this.cities
        }
    })
    async getAllCities(params?: PaginationProps) {
        let cities: any = []

        let citiesPage = 1
        let citiesLength = 0
        const cMap = new Map([])
        const getAll = async () => {
            const { data, status, error } = await agent.Catalog.getCities({ page: citiesPage })
            if (status === 200) {
                console.log()
                citiesLength = data.count
                data.results.forEach((i: any) => cMap.set(String(i.id), i))
                citiesPage = citiesPage + 1
            }
            console.log(citiesLength != cMap.size)
            console.log(citiesLength)
            console.log(cMap.size)
            if (citiesLength !== cMap.size) {
                await getAll()
            } else {
                runInAction(() => {
                    this.cities = cMap
                })
            }
        }
        await getAll()
    }
    createCarBrand = flow(function* (   this: CatalogStore,
      {

          car_class,
          model,
          brandId,
          brandName
      }
    :{

        car_class: string
        model: string
        brandId?: number
        brandName?: string
    }) {
        if (brandId) {
            try {
                const { data } = yield agent.Catalog.createCarBrandWithExistBrand(brandId, car_class, model)
                return data
            } catch (error) {
                console.log(error)
            }
        }
        if (brandName) {
            try {
                const { data } = yield agent.Catalog.createCarBrandWithNewBrand(brandName, car_class, model)
                return data
            } catch (error) {
                console.log(error)
            }
        }
    })
    get carBrandsCurrent() {
        return this.carBrands
    }
    get brandAndModels() {
        return this.carBrandModelsReference
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
        return this.cities.get(id)
    }
}

const catalogStore = new CatalogStore()

export default catalogStore
