import { action, flow, IObservableValue, makeAutoObservable, observable, reaction, runInAction, values } from "mobx";
import { makePersistable } from "mobx-persist-store";
import agent, { client, PaginationProps } from 'utils/agent'
import appStore from "stores/appStore";
import userStore, { UserTypeEnum } from "stores/userStore";
import authStore from "stores/authStore";
import paramsStore from "stores/paramStore";
export const carHelperTable = [
['А','Легковой', '1 класс', 'До 2 тонн'],
['B','Легковой', '1 класс', 'До 2 тонн'],
['C','Легковой', '2 класс', 'До 2 тонн'],
['D','Легковой', '2 класс', 'До 2 тонн'],
['E','Легковой', '2 класс', 'До 2 тонн'],
['F','Легковой', '3 класс', 'От 2 тонн'],
['S','Легковой', '3 класс', 'До 2 тонн'],
['V','Внедорожный', '5 класс', 'От 2 тонн'],
['M','Внедорожный', '4 класс', 'От 2 тонн'],
['J','Внедорожный', '4 класс', 'От 2 тонн'],
['J1','Внедорожный', '5 класс', 'От 2 тонн'],
['K','Внедорожный', '3 класс', 'До 2 тонн'],
['P','Внедорожный', '4 класс', 'От 2 тонн'],
['CO1','Легковой', '6 класс', 'До 2 тонн'],
['CO2','Коммерческий', '7 класс', 'От 2 тонн'],
['CO3','Коммерческий', '8 класс', 'От 2 тонн']
]

export enum CarType {
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
  employees?: any[]
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
    reaction(() => this.cars,
      (cars) => {
        if(authStore.userIsLoggedIn) {
          console.log(cars);
          if (cars?.length === 0 && !this.loadingState.cars) {
            this.getCars(appStore.appType === "admin" ? 0 : userStore.myProfileData.company?.id)
            this.loadingState.cars = true
          }
        }
      })
    reaction(() => this.currentBrand,
      (currentBrand) => {
        if(authStore.userIsLoggedIn) {
          if(currentBrand !== null) {
            this.getCarBrandModels(currentBrand)
          }
        }
    })

  }
  loadingState = {
    cars: false
  }
  loadingCars = false
  cars: Car[] | any = []
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
    console.log('getCars');
    this.loadingCars = true
    try {
      if(appStore.appType === UserTypeEnum.admin) {
        const { data } = yield agent.Cars.getAdminCars(paramsStore.currentParams)
        this.cars = data
      }
      if(appStore.appType !== UserTypeEnum.admin && company_id) {
        const { data } = yield agent.Cars.getCompanyCars(company_id, paramsStore.currentParams)
        this.cars = data
      }

    } catch (error) {
      console.error(error)
    } finally {
      this.loadingCars = false
    }
    return this.cars
  })
  async getAllCars(params: any) {
      if (appStore.appType === UserTypeEnum.admin) {
          return client.carsAdminList(params)
      }
      if(appStore.appType !== UserTypeEnum.admin) {
        return client.carsList({ company_id: userStore.myProfileData.company.id, ...params })
      }
  }
  async getCarByCompanyId(company_id:string, id: number) {
    return client.carsRetrieve({company_id: company_id, id: id})
  }

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
      return yield agent.Cars.createCompanyCar(company_id, car).then((res) => res).finally(() => this.getCarsByCompony(company_id))
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
