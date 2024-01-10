import { autorun, flow, makeAutoObservable, makeObservable, observable } from 'mobx'
import agent from 'utils/agent'
import { makePersistable } from 'mobx-persist-store'

export class FormStore {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
    makePersistable(this, {
      name: 'formStore',
      properties: ['formCreateUser', 'formCreateCar'],
      storage: window.localStorage,
    })
  }
  loading = false
  formCreateUser:any = observable.object({})
  formCreateCar : any = observable.object({})

  addPropertyToForm(form : string | number, property: string, value: any) {
    // @ts-ignore
    this[form][property] = value
  }
  handleChangeForm(form: string | number, data: any) {
    // @ts-ignore
    this[form] = data
  }
  setFormData(form: string | number, data: any) {
    // @ts-ignore
    this[form] = data
  }
  getFormData(form: string | number) {
    // @ts-ignore
    return this[form]
  }
  formSendDataUser(form: string | number, data?: any) {
    this.loading = true
    try {
      const co_id = this.formCreateCar.company_id
      console.log(co_id);
      const response =  agent.Account.createCompanyUser(co_id, data || this.formCreateUser)
      console.log(response);
    }
    catch (e) {
      console.log(e);
    }
    this.loading = false
  }

  formClear(form: string | number) {
    // @ts-ignore
    this[form] = {}
  }
}

const formStore = new FormStore()
autorun(() => {
  console.log(formStore.formCreateUser);
})
export default formStore
