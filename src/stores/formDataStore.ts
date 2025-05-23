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
      storage: localStorage,
    })

  //   reaction(() => this.formCreateCar.employee, async (employee) => {
  //     if (employee.length !== 0) {
  //       await carStore.createCar(this.formCreateCar.company_id, this.formCreateCar)
  //     }
  //   }
  // )
  }

  loading = false
  company_id: number = 0
  company_type: string = ''
  formCreateUser:any = {}
  formCreateCar: any = {}
  formSendDataUser = flow(function* ( this: FormStore, form: string | number, data?: any) {

    this.loading = true
    const response = yield agent.Account.createCompanyUser(Number(data.company_id), data || this.formCreateUser)


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

    this.formCreateCar = data
  }

   get getFormDataCarCreate() {
      return this.formCreateCar
   }
  getFormData(form: string | number) {
    // @ts-ignore
    return this[form]
  }
  async sendCarFormData() {
    console.log('createCar');
      return carStore.createCar(this.formCreateCar.company_id, this.formCreateCar)
      .then((res) => res)
      .then((res:any) => {
        runInAction(() => {
            console.log(res);
            if(res && res.status > 199 && res.status < 300) {
              this.formCreateCar = {}

            }
          })
        return res
        }
      )
      .finally(() => formStore.formClear('formCreateCar'))
  }
  sendCarFormDataEdit() {
      return carStore.editCar(this.formCreateCar.company_id, this.formCreateCar.id, this.formCreateCar)
      .then((res) => res)
      .then((res:any) => runInAction(() => {
        if(res && res.status > 199 && res.status < 300) {

          this.formCreateCar = {}
        }
      }))
        .finally(() => formStore.formClear('formCreateCar'))
  }

  formClear(form: string | number) {
    // @ts-ignore
    this[form] = {}
  }
}

const formStore = new FormStore()

export default formStore
