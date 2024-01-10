import { flow, makeAutoObservable, makeObservable, observable } from 'mobx'
import agent from "utils/agent"
export enum  CarType {
  "Малые автомобили" = "small",
  "Средние автомобили" = "middle",
  "Бизнес-класс и кроссоверы" = "buisness_suv",
  "Представительские, внедорожники и микроавтобусы" = "previum",
  "Легковой фургон (каблук)" = "pickup",
  "Грузовой (Цельнометаллический фургон)" = "middle_truck",
  "Грузовой (автофургон, борт-тент, длинномер" = "truck"
}
type CarBrand = {
  id: number
  name: string
  country: string
}
type CarModel = {
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
  }
  loadingCars = false
  cars: Car[] = []
}

const catalogStore = new CarStore()

export default catalogStore
