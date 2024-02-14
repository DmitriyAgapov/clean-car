import { action, flow, IObservableValue, makeAutoObservable, observable, reaction, runInAction, values } from "mobx";
import { makePersistable } from "mobx-persist-store";
import agent, { PaginationProps } from "utils/agent";
import appStore from "stores/appStore";
import { UserTypeEnum } from "stores/userStore";

export enum  CarType {
  "A" = "A",
  "B" = "B",
  "C" = "C",
  "D" = "D",
  "E" = "E",
  "F" = "F",
  "S" = "S",
  "V" = "V",
  "M" = "M",
  "J" = "J",
  "J1" = "J1",
  "K" = "K",
  "P" = "P",
  "CO1" = "CO1",
  "CO2" = "CO2",
  "CO3" = "CO3",
}
export type CarBrand = {
  id: number
  name: string
  country: string
}
export type CarModel = {
  id: number
  name: string
  car_class: string
  year_from: number
  year_to: number
}
export type Car = {
  id:number
  brand: CarBrand
  model: CarModel
  car_type: CarType
  number: string
}
type CarOptions = {
  wheel_radius: string
  status: boolean
}
type CarBelongsTo = {
  belongs_to: 'filial' | 'company'
  belong_to_list: any[]
}

export class CarStore {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
    makePersistable(this, {
      name: 'carStore',
      properties: ['cars', "brandModels", "currentBrand"],
      storage: localStorage,
    }, {
      fireImmediately: true,
    })
    reaction(() => this.currentBrand,
      (currentBrand) => {
          if(currentBrand) {
            this.getCarBrandModels(currentBrand)
          }
        })
  }
  loadingCars = false
  cars: Car[] = []
  currentBrand:null | number = null
  brandModels  = observable.array([])
  get getBrandModels() {
    return this.brandModels
  }
  get getCurrentBrand() {
    return values(this.currentBrand)
  }
  setBrand(id: number) {
    this.currentBrand = id
  }
  clearBrandModels() {
    this.brandModels = observable.array([])
    this.brandModels.clear()
  }
  async getCarBrandModels(id: number, params?: PaginationProps) {

    if (id) {
      const { data, status } = await agent.Catalog.getCarBrandModels(id, params)

      if (status === 200) {
        runInAction(() => {
          this.brandModels = data.results.map((item: any) =>  ({ value: String(item.id), label: item.name }))
        })
      }
    }
  }
  getCars = flow(function* (this: CarStore, company_id:number) {
    this.loadingCars = true
    try {
      if(appStore.appType === UserTypeEnum.admin) {
        const { data } = yield agent.Cars.getAdminCars()
        this.cars = data
      }
      if(appStore.appType !== UserTypeEnum.admin && company_id) {
        const { data } = yield agent.Cars.getCompanyCars(company_id)
        this.cars = data
      }

    } catch (error) {
      console.error(error)
    } finally {
      this.loadingCars = false
    }
    return this.cars
  })
  async getCarsByCompony(company_id:number) {
    this.loadingCars = true
    try {

        const { data } = await agent.Cars.getCompanyCars(company_id)
        runInAction(() => this.cars = data)


    } catch (error) {
      console.error(error)
    } finally {
      this.loadingCars = false
    }
  }
  get getCompanyCars() {

    return ({
      cars: this.cars
    })
  }
  createCar = flow(function* (this: CarStore, company_id: number, car: Car) {
    this.loadingCars = true
    try {
      yield agent.Cars.createCompanyCar(company_id, car)
    } catch (error) {
      console.error(error)
    }
    this.loadingCars = false
  })
  editCar = flow(function* (this: CarStore, company_id: number, id:number, car: Car) {
      this.loadingCars = true
      try {
        yield agent.Cars.editCompanyCar(company_id, id, car)
      } catch (error) {
        console.error(error)
      }
      this.loadingCars = false
    })

}

const carStore = new CarStore()

export default carStore
