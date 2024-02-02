import { autorun, flow, makeAutoObservable, observable, reaction, runInAction } from "mobx";
import agent from 'utils/agent'
import { makePersistable } from 'mobx-persist-store'
import { initialResult, ResultsProps } from "stores/bidsStrore";
import permissionStore from "stores/permissionStore";
import carStore from "stores/carStore";

export class FormStore {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
    makePersistable(this, {
      name: 'formStore',
      properties: ['formCreateUser', 'formCreateCar'],
      storage: sessionStorage,
    })
    reaction(() => this.formCreateCar.company_id, (company_id) => {
      if (company_id !== 0) {
        permissionStore.loadCompanyPermissions(company_id)
      }
    })
    reaction(() => this.formCreateCar.employee, async (employee) => {
      if (employee.length !== 0) {
        await carStore.createCar(this.formCreateCar.company_id, this.formCreateCar)
      }
    }
  )}

  loading = false
  company_id: number = 0
  company_type: string = ''
  formCreateUser:any = {}
  formCreateCar: any = {}
  formSendDataUser = flow(function* ( this: FormStore, form: string | number, data?: any) {
    console.log(data);
    this.loading = true
    const response = yield agent.Account.createCompanyUser(Number(data.company_id), data || this.formCreateUser)
    console.log(response);

    this.loading = false
  })

  addPropertyToForm(form : string | number, property: string, value: any) {
    // @ts-ignore
    this[form][property] = value
  }

  handleChangeForm(form: string | number, data: any) {
    // @ts-ignore
    this[form] = data
  }

  setFormDataCreateCar(data: any) {
    console.log(data)
    this.formCreateCar = data
  }

   get getFormDataCarCreate() {
      return this.formCreateCar
   }
  getFormData(form: string | number) {
    // @ts-ignore
    return this[form]
  }
   sendCarFormData() {

      carStore.createCar(this.formCreateCar.company_id, this.formCreateCar)
      .then((res) => res)
      .then((res:any) => runInAction(() => {
        if(res && res.status > 199 && res.status < 300) {
          console.log(res);
          this.formCreateCar = {}
        }
      }))

  }
  formClear(form: string | number) {
    // @ts-ignore
    this[form] = {}
  }
}

const formStore = new FormStore()

export default formStore
