import { autorun, flow, makeAutoObservable, observable } from 'mobx'
import agent from 'utils/agent'
import { makePersistable } from 'mobx-persist-store'

export class FormStore {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
    makePersistable(this, {
      name: 'formStore',
      properties: ['formCreateUser', 'formCreateCar'],
      storage: sessionStorage,
    })
  }
  loading = false
  company_id: number = 0
  company_type: string = ''
  formCreateUser:any = {}
  formCreateCar: any = {}
  formSendDataUser = flow(function* ( this: FormStore, form: string | number, data?: any) {
    this.loading = true
    const response = yield agent.Account.createCompanyUser(this.company_id, data || this.formCreateUser)
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

  formClear(form: string | number) {
    // @ts-ignore
    this[form] = {}
  }
}

const formStore = new FormStore()

export default formStore
