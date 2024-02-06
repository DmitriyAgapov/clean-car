import { action, flow, makeAutoObservable, runInAction } from "mobx";
import { makePersistable } from "mobx-persist-store";
import agent from "utils/agent";
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
      properties: ['cars'],
      storage: sessionStorage,
    }, {
      fireImmediately: true,
    })
  }
  loadingCars = false
  cars: Car[] = []

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
    // console.log(this.cars);
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

}

const carStore = new CarStore()

export default carStore
