import { action, makeAutoObservable, observable, runInAction,  values } from "mobx";
import { makePersistable } from 'mobx-persist-store'
import agent, { PaginationProps } from 'utils/agent'
import paramsStore from 'stores/paramStore'
import { notifications } from "@mantine/notifications";
import userStore from "stores/userStore";
import appStore from "stores/appStore";
export enum CAR_RADIUS {
    'R14',
    'R15',
    'R16',
    'R17',
    'R18',
    'R19',
    'R20',
    'R21-23',
    'R15C',
    'R16C',
}
export enum CAR_RADIUSTEXT {
    'R14'= 'R14',
    'R15'= 'R15',
    'R16'= 'R16',
    'R17'= 'R17',
    'R18'= 'R18',
    'R19'= 'R19',
    'R20'= 'R20',
    'R21-23'= 'R21-23',
    'R15C'= 'R15C',
    'R16C'= 'R16C',
}
export enum CAR_CLASS   {
    '1 класс',
    '2 класс',
    '3 класс',
    '4 класс',
    '5 класс',
    '6 класс',
    '7 класс',
    '8 класс',
}
export const CAR_TYPES = {
    'A': ['легковой', CAR_CLASS[0], 'до 2 т', 'хэтчбек'],
    'B': ['легковой', CAR_CLASS[0], 'до 2 т', 'седан'],
    'C': ['легковой', CAR_CLASS[1], 'до 2 т', 'седан'],
    'D': ['легковой', CAR_CLASS[1], 'до 2 т', 'седан'],
    'E': ['легковой', CAR_CLASS[1], 'до 2 т', 'седан'],
    'F': ['легковой', CAR_CLASS[2], 'до 2 т', 'седан'],
    'S': ['легковой', CAR_CLASS[2], 'до 2 т', 'седан'],
    'V': ['внедорожный', CAR_CLASS[4], 'от 2 т', 'короткая база'],
    'M': ['внедорожный', CAR_CLASS[3], 'от 2 т', 'минивэн'],
    'J': ['внедорожный', CAR_CLASS[3], 'от 2 т', 'внедорожник'],
    'J1': ['внедорожный', CAR_CLASS[4], 'от 2 т', 'внедорожник'],
    'K': ['внедорожный', CAR_CLASS[2], 'до 2 т', 'кроссовер'],
    'P': ['внедорожный', CAR_CLASS[3], 'от 2 т', 'пикап'],
    'CO1': ['легковой', CAR_CLASS[5], 'до 2 т', 'универсал'],
    'CO2': ['коммерческий', CAR_CLASS[6], 'от 2 т', 'короткая база'],
    'CO3': ['коммерческий', CAR_CLASS[7], 'от 2 т', 'длинная база'],
}
export class PriceStore {
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
        makePersistable(this, { name: 'priceStore', storage: window.localStorage, properties: ['prices', 'priceOnChange', 'currentPrice'] }, {fireImmediately: true})
    }
    currentPrice: any = {}
    prices: { count: number; next: string | null; previous: string | null; results: any[] } = observable.object({
        next: null,
        count: 0,
        previous: null,
        results: [],
    })
    loading: boolean = false
    textData = {
        path: 'price',
        title: 'Прайс-листы',
        create: 'Создать прайс-лист для Клиента',
        labelsForItem: ['Город', 'Часовой пояс', 'Статус'],
        referenceTitle: 'Город',
        createPage: 'Добавить город',
        editPage: 'Редактировать город',
        tableHeaders: [
            { label: 'Компания', name: 'name' },
            { label: 'Филиал', name: 'company__parent__name' },
            { label: 'Тип', name: 'company_type' },
        ],
        createPageDesc: 'Добавьте новый город',
        editPageDesc: 'Вы можете изменить город или удалить его из системы',
        // createPageForm: FormCreateCity.bind(props),
        createPageBack: 'Назад к списку прайс-листов',
        createAction: agent.Catalog.createCity,
        editAction: agent.Catalog.editCity,
        // editPageForm: FormCreateCity.bind(props, { ...data, edit:true }),
    }
    priceOnChange  = observable.map([])
    async loadPrices(params?: PaginationProps) {
        return await agent.Price.getAllPrice(paramsStore.params)
    }
    get getPriceOnChange() {
        return this.priceOnChange
    }
    parseEntries() {
        const result = (ar:any[]) => ar.reduce((acc, item) => {
            acc[item.id] = item.amount;
            return acc;
        }, {});
        const data = values(this.priceOnChange)
        const resWash = data.filter((i) => i.label === 'Мойка')
        const resEvac = data.filter((i) => i.label === 'Эвакуация')
        const resTire = data.filter((i) => i.label === 'Шиномонтаж')

        return ({
            wash: resWash.length > 0 ? {
                company_id: resWash[0]?.company_id,
                price_id: resWash[0]?.price_id,
                data: result(resWash)
            } : null,
            evac: resEvac.length > 0 ? {
                company_id: resEvac[0]?.company_id,
                price_id: resEvac[0]?.price_id,
                data: result(resEvac)
            } : null,
            tire: resTire.length > 0 ? {
                company_id: resTire[0]?.company_id,
                price_id: resTire[0]?.price_id,
                data: result(resTire)
            } : null,
        })
    }
    clearPriceOnChange() {
        this.priceOnChange.clear()
    }
    get currentPriceById() {
        // console.log({
        //     data: this.currentPrice,
        //     loading: this.loading
        // });
        return ({
            data: this.currentPrice,
            loading: this.loading
        })
    }
    copyPrice(company_id: number, price_id: number) {
        return agent.Price.priceDoubling(company_id, price_id)
    }

    async getCurrentPrice(props:any, history: boolean) {
        console.log(props);
        action(() =>  this.loading = true)
        runInAction(() => {
            this.loading = true
            this.currentPrice = {}
        });

        const mapEd = (ar:[], compareField:string) => {
            let newMap = new Map([])
            if(ar && ar.length > 0) {
                ar.forEach((item: any) => {
                    newMap.set(item[compareField].name, ar.filter((i:any) => i[compareField].name == item[compareField].name))
                })}
            let result:any[] = []

            newMap.forEach((value:any, key) => {
                return result.push(Object.assign({service_option: key}, ...value.map((i:any, index:number) => ({[i.service_subtype.name]: i.amount}))))
            })
            return result
        }
        const mapEdWast = (ar: any[]) => {

            let newMap:any = new Map(ar.map((item: any) => [item.service_subtype.name,  ar.filter((it:any) => item.service_subtype.name === it.service_subtype.name)]));

            newMap.forEach((value:any, key: any) => {
                const newAr = new Map([])
                const  curVal = value;
                const  curKey = key;

                value.forEach((value:any, key: any) => {
                      if(value.service_option && value.service_option.name) {
                          newAr.set(value.service_option.name, curVal.filter((i: any) => i.service_option?.name == value.service_option?.name).sort((a:any, b:any) => {const nameA = a.car_class.toUpperCase();const nameB = b.car_class.toUpperCase();if (nameA < nameB) return -1;if (nameA > nameB) return 1;return 0;}).map((i:any) => ({id: i.id, label: i.car_class, value: i.amount})))
                      } else {
                          newAr.set('Мойка', curVal.filter((i: any) => !i.service_option).sort((a:any, b:any) => {const nameA = a.car_class.toUpperCase();const nameB = b.car_class.toUpperCase();if (nameA < nameB) return -1;if (nameA > nameB) return 1;return 0;}).map((i:any) => ({id: i.id, label: i.car_class, value: i.amount})))
                      }
                  }
                )
                newMap.set(key, newAr)
            })
            let result:any[] = []
            newMap.forEach((value: any, key: any) => {
                let resultInner: any[] = []
                value.forEach((value: any, key: any) => {
                    let resultInnerAr: any[] = []
                    value.forEach((value: any, key: any) => {
                        resultInnerAr.push(value)
                    })
                    resultInner.push({
                        service_option: key,
                        class1: resultInnerAr[0]?.value,
                        class2: resultInnerAr[1]?.value,
                        class3: resultInnerAr[2]?.value,
                        class4: resultInnerAr[3]?.value,
                        class5: resultInnerAr[4]?.value,
                        class6: resultInnerAr[5]?.value,
                        class7: resultInnerAr[6]?.value,
                        class8: resultInnerAr[7]?.value,
                    })
                })
                result.push({ label: key, data: resultInner })
            })
            // console.log(result);
            return result
        }
        const mapEdTire = (ar: any[], edit: boolean) => {
            let meta = {
                car_type: [],
                service_subtype: []

            }

            function innerData(ar: any[], propKey: string, propValue: any) {
                let at = ar.filter((i: any) => i[propKey].name == propValue)
                meta = {
                    ...meta,
                    [propKey]: at
                }
                return at
            }

            let newMap: any = new Map(ar.map((item: any) => [item.service_subtype.name, innerData(ar, 'service_subtype', item.service_subtype.name)]))

            newMap.forEach((value: any, key: any) => {
                const newAr = new Map([])
                const curVal = value;

                value.forEach((value: any, key: any) => {
                      const filtered = curVal.filter((i: any) => i.car_type == value.car_type)
                      const newArFC = new Map([])

                      filtered.forEach((value: any, key: any) => {
                          const filteredS = filtered.filter((i: any) => i.service_option.name == value.service_option.name)
                          const newArF = new Map([])

                          filteredS.forEach((value: any, key: any) => {
                              newArF.set(value.radius, value)
                          })
                          newArFC.set(value.service_option.name, newArF)
                      })
                      newAr.set(value.car_type, newArFC)
                  }
                )
                newMap.set(key, newAr)
            })

            let result: any[] = []
            newMap.forEach((value: any, key: any) => {
                let resultInner: any[] = []
                value.forEach((value: any, key: any) => {
                    let resultInnerAr: any[] = []
                    value.forEach((value: any, key: any) => {
                        let resultInnerCartypes: any[] = []
                        value.forEach((value: any, key: any) => {
                            let resultInnerOptions: any[] = []
                            // value.forEach((value:any, key: any) => {
                            //   resultInnerOptions.push
                            // })
                            resultInnerCartypes.push({ label: key, data: value.amount })
                        })
                        resultInnerAr.push({ label: key, data: resultInnerCartypes })
                    })
                    resultInner.push({ label: key, data: resultInnerAr })
                })
                result.push({ label: key, data: resultInner })
            })

            return result
        }
        // console.log(props, history);
        let data: any[] | any = []
        if (!userStore.isAdmin) {
            console.log('not admin');

            if (props.params.id && !history) {
                // console.log(props);
                let tempId = props.params.id || userStore.myProfileData.company?.id
                const { data: dataEvac } = await agent.Price.getCurentCompanyPriceEvac(tempId);
                const { data: dataTire } = await agent.Price.getCurentCompanyPriceTire(tempId);
                const { data: dataWash } = await agent.Price.getCurentCompanyPriceWash(tempId);
                // const { data: dataEvac } = await agent.Price.getCompanyPriceEvac(userStore.myProfileData.company?.id, props.params.id);
                // const { data: dataTire } = await agent.Price.getCompanyPriceTire(userStore.myProfileData.company?.id, props.params.id);
                // const { data: dataWash } = await agent.Price.getCompanyPriceWash(userStore.myProfileData.company?.id, props.params.id);
                console.log('есть ID', props.params.id);
                const tempAr:any[] = []
                // console.log(mapEdWast(dataWash.wash_positions));

                action(() =>  this.loading = false)
                runInAction(() => {
                    this.loading = false
                    this.currentPrice = {
                        tabs: [{
                            label: 'Мойка', data: dataWash,
                            dataTable: dataWash,
                            test: mapEdWast(dataWash.wash_positions)
                        }, { label: 'Эвакуация', data: dataEvac, dataTable: mapEd(dataEvac.evacuation_positions, 'service_option'), test: mapEd(dataEvac.evacuation_positions, 'service_option') }, { label: 'Шиномонтаж', data: dataTire, dataTable: dataTire,  test: mapEdTire(dataTire.tire_positions, false) }]
                    }
                });

                // runInAction(() => {
                //     dataWash && dataWash.wash_positions && dataWash.wash_positions.length !== 0 && tempAr.push({ label: 'Мойка', data: dataWash, dataTable: dataWash })
                //     dataEvac && dataEvac.evacuation_positions && dataEvac.evacuation_positions.length !== 0 && tempAr.push({ label: 'Эвакуация', data: dataEvac, dataTable: mapEd(dataEvac.evacuation_positions, 'service_option') })
                //     dataTire && dataTire.tire_positions && dataTire.tire_positions.length !== 0 && tempAr.push({ label: 'Шиномонтаж', data: dataTire, dataTable: dataTire })
                //     this.currentPrice = {
                //         tabs: tempAr
                //     }
                //
                //     this.loading = false
                // })
                console.log('statePriceFinish', this.loading);

            } else if(props.params.bid_id && history) {
                console.log('historyBid');
                let tempId = props.params.id || userStore.myProfileData.company?.id
                const { data: dataEvac } = await agent.Price.getCompanyPriceEvac(tempId, props.params.bid_id);
                const { data: dataTire } = await agent.Price.getCompanyPriceTire(tempId, props.params.bid_id);
                const { data: dataWash } = await agent.Price.getCompanyPriceWash(tempId, props.params.bid_id);
                const tempAr:any[] = []
                runInAction(() => {

                    dataWash && dataWash.wash_positions.length !== 0 && tempAr.push({ label: 'Мойка', data: dataWash, dataTable: dataWash })
                    dataEvac && dataEvac.evacuation_positions.length !== 0 && tempAr.push({ label: 'Эвакуация', data: dataEvac, dataTable: mapEd(dataEvac.evacuation_positions, 'service_option') })
                    dataTire && dataTire.tire_positions.length !== 0 && tempAr.push({ label: 'Шиномонтаж', data: dataTire, dataTable: dataTire })
                    this.currentPrice = {
                        tabs: tempAr
                    }

                this.loading = false
                })

                console.log('statePriceFinish', this.loading);
            } else if(props.params.id &&  history) {
                const { data: dataResults, status } = await agent.Price.getHistoryPrice(props.params.id, paramsStore.qParams as PaginationProps);

                if (status === 200) {
                    data = {
                        ...dataResults, results: dataResults.results.map((i: any) => {
                            let obj: any;
                            for (const key in i) {
                                if (i[key] === null) {
                                    obj = {
                                        ...obj,
                                        [key]: '-'
                                    }
                                } else {
                                    obj = {
                                        ...obj,
                                        [key]: i[key]
                                    }
                                }
                            }
                            return obj;
                        })
                    }

                    this.currentPrice = data
                    this.loading = false
                    console.log('statePriceFinish', this.loading);
                }
            } else {
                console.log('not admin price list');
                try {
                    const { data: dataResults, status } = await agent.Price.getAllCompanyPrices(userStore.myProfileData.company?.id, paramsStore.qParams as PaginationProps)

                    if (status === 200) {
                        data = {
                            ...dataResults, results: dataResults.results.map((i: any) => {
                                let obj: any;
                                for (const key in i) {
                                    if (i[key] === null) {
                                        obj = {
                                            ...obj,
                                            [key]: '-'
                                        }
                                    } else {
                                        obj = {
                                            ...obj,
                                            [key]: i[key]
                                        }
                                    }
                                }
                                return obj;
                            })
                        }
                        action(() =>  this.loading = false)
                        runInAction(() => {
                            this.loading = false
                            this.currentPrice = data
                        });
                    }
                } catch (e) {
                    console.log(e)
                }

            }

        } else {
            console.log('admin');

            if (props.params.id && !history) {
                console.log('есть ID admin');
                const { data: dataEvac } = await agent.Price.getCurentCompanyPriceEvac(props.params.id);
                const { data: dataTire } = await agent.Price.getCurentCompanyPriceTire(props.params.id);
                const { data: dataWash } = await agent.Price.getCurentCompanyPriceWash(props.params.id);

                runInAction(() => {
                    this.currentPrice = {
                        tabs: [{
                            label: 'Мойка', data: dataWash,
                            dataTable: dataWash
                        }, { label: 'Эвакуация', data: dataEvac, dataTable: mapEd(dataEvac.evacuation_positions, 'service_option') }, { label: 'Шиномонтаж', data: dataTire, dataTable: dataTire }]
                    }
                    setTimeout(() => {
                        this.loading = false
                    }, 500)
                })
            } else {
                if(history) {
                    if(!props.params.bid_id) {
                        const { data: dataResults, status } = await agent.Price.getHistoryPrice(props.params.id, paramsStore.qParams as PaginationProps);

                        if (status === 200) {
                            data = {
                                ...dataResults, results: dataResults.results.map((i: any) => {
                                    let obj: any;
                                    for (const key in i) {
                                        if (i[key] === null) {
                                            obj = {
                                                ...obj,
                                                [key]: '-'
                                            }
                                        } else {
                                            obj = {
                                                ...obj,
                                                [key]: i[key]
                                            }
                                        }
                                    }
                                    return obj;
                                })
                            }

                            this.currentPrice = data
                            this.loading = false
                            console.log('statePriceFinish', this.loading);
                        }
                    } else {
                        let tempId = props.params.id || userStore.myProfileData.company?.id
                        const { data: dataEvac } = await agent.Price.getCompanyPriceEvac(tempId, props.params.bid_id);
                        const { data: dataTire } = await agent.Price.getCompanyPriceTire(tempId, props.params.bid_id);
                        const { data: dataWash } = await agent.Price.getCompanyPriceWash(tempId, props.params.bid_id);
                        const tempAr:any[] = []
                        runInAction(() => {

                            dataWash && dataWash.wash_positions.length !== 0 && tempAr.push({ label: 'Мойка', data: dataWash, dataTable: dataWash })
                            dataEvac && dataEvac.evacuation_positions.length !== 0 && tempAr.push({ label: 'Эвакуация', data: dataEvac, dataTable: mapEd(dataEvac.evacuation_positions, 'service_option') })
                            dataTire && dataTire.tire_positions.length !== 0 && tempAr.push({ label: 'Шиномонтаж', data: dataTire, dataTable: dataTire })
                            this.currentPrice = {
                                tabs: tempAr
                            }

                            this.loading = false
                        })
                    }
                } else {
                    const { data: dataResults, status } = await agent.Price.getAllPrice(paramsStore.qParams)
                    if (status === 200) {
                        console.log('admin list', data);
                        data = {
                            ...dataResults, results: dataResults.results.map((i: any) => {
                                let obj: any;
                                for (const key in i) {
                                    if (i[key] === null) {
                                        obj = {
                                            ...obj,
                                            [key]: '-'
                                        }
                                    } else {
                                        obj = {
                                            ...obj,
                                            [key]: i[key]
                                        }
                                    }
                                }
                                return obj;
                            })
                        }
                        action(() =>  this.loading = false)
                        runInAction(() => {
                            this.loading = false
                            this.currentPrice = data
                        });
                        console.log('admin list', data);
                        console.log('admin listRes', dataResults);
                    }
                }
            }

        }
    }
    async getAllPrices({company_id, params}: {company_id:number, params:any}) {
        if(appStore.appType === "admin") {
            return agent.Price.getAllPrice(params).then(res => ({...res.data, results: res.data.results.map((i: any) => ({
                    name: i.name,
                    company_type: i.company_type,
                    id: i.id,
                    root_company: i.root_company ? i.root_company : '-',
            }))}))
        } else {
            return agent.Price.getAllCompanyPrices(company_id, params).then(res => ({...res.data, results: res.data.results.map((i: any) => ({
                    name: i.name,
                    // company_type: i.company_type,
                    id: i.id,
                    root_company: i.root_company ? i.root_company : '-',
                }))}))
        }
    }
    async updatePriceWash() {
        const values = this.parseEntries().wash

        if(values)  {
            const {data, status}:any = await agent.Price.updatePriceWash(values.company_id, values.price_id, values.data)
            return {data, status}
        }
        // return {data: null, status: 400}
    }
    async updatePriceTire() {
        const values = this.parseEntries().tire
        if(values)  {
            const {data, status}:any = await agent.Price.updatePriceTire(values.company_id, values.price_id, values.data)
            return {data, status}
        }

        // return {data: null, status: 400}
    }
    async updatePriceEvac() {
        const values = this.parseEntries().evac
        if(values)  {
            const {data, status}:any = await agent.Price.updatePriceEvac(values.company_id, values.price_id, values.data)
            return {data, status}
        }
        // return {data: null, status: 400}
    }
    async updatePrices() {
        return Promise.all([this.updatePriceWash(), this.updatePriceTire(), this.updatePriceEvac()])
    }
    async handleSavePrice() {
        return await this.updatePrices()
            .then((r) => {
                r.forEach((r: any) => {
                    setTimeout(() => {
                        if(r) {
                            if(r.status === 201) {
                                notifications.show({
                                    id: 'car-created',
                                    withCloseButton: true,
                                    autoClose: 5000,
                                    title: "Прайс обновлен",
                                    message: 'Возвращаемся на страницу прайса',
                                    color: 'var(--accentColor)',
                                    loading: false,
                                });

                            } else {
                                notifications.show({
                                    id: 'car-created',
                                    withCloseButton: true,
                                    // onClose: () => console.log('unmounted'),
                                    // onOpen: () => console.log('mounted'),
                                    autoClose: 5000,
                                    title: "Ошибка",
                                    message: 'Прайс не удалось обновить',
                                    color: 'var(--errorColor)',
                                    loading: false,
                                });
                            }}
                        }, 50)})

    })
          .finally(() =>       this.clearPriceOnChange())}
    // @ts-ignore
    handleChangeAmount({type, label, price_id, company_id, initValue, amount, id}) {

        if(!initValue) {
            // @ts-ignore
            this.priceOnChange.set(`${type}_${id.toString()}`, {amount: amount, label: label, price_id: price_id, company_id, id: id})
        } else {
            this.priceOnChange.delete(`${type}_${id.toString()}`)
        }

    }
    get TextData() {
        return this.textData
    }

    get allPrices() {
        return {
            data: this.prices,
            textData: this.textData,
        }
    }
}

const priceStore = new PriceStore()
export default priceStore
