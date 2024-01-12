import { flow, makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";
import agent from "utils/agent";
import appStore from "stores/appStore";
import { UserTypeEnum } from "stores/userStore";

export enum  CarType {
  "Малые автомобили" = "Малые автомобили",
  "Средние автомобили" = "Средние автомобили",
  "Бизнес-класс и кроссоверы" = "Бизнес-класс и кроссоверы",
  "Представительские, внедорожники и микроавтобусы" = "Представительские, внедорожники и микроавтобусы",
  "Легковой фургон (каблук)" = "Легковой фургон (каблук)",
  "Грузовой (Цельнометаллический фургон)" = "Грузовой (Цельнометаллический фургон)",
  "Грузовой (автофургон, борт-тент, длинномер" = "Грузовой (автофургон, борт-тент, длинномер"
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
      storage: window.sessionStorage,
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
