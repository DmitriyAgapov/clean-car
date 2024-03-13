import { action, makeAutoObservable, observable, reaction, runInAction, toJS, values } from "mobx";
import { makePersistable } from 'mobx-persist-store'
import agent, { PaginationProps } from 'utils/agent'
import paramsStore from 'stores/paramStore'
import { notifications } from "@mantine/notifications";
import { SvgClose } from "components/common/ui/Icon";
import React from "react";
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
        makePersistable(this, { name: 'priceStore', storage: window.localStorage, properties: ['prices', 'priceOnChange'] }, {fireImmediately: true})
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
        create: 'Создать прайс-лист для заказчика',
        labelsForItem: ['Город', 'Часовой пояс', 'Статус'],
        referenceTitle: 'Город',
        createPage: 'Добавить город',
        editPage: 'Редактировать город',
        tableHeaders: [
            { label: 'Компания', name: 'name' },
            { label: 'Тип', name: 'company_type' },
            { label: 'Филиал', name: 'root_company' }
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
    async getCurrentPrice(props:any, history: boolean) {
        action(() => this.loading = true);
        const mapEd = (ar:[], compareField:string) => {
            let newMap = new Map([])
            if(ar.length > 0) {
                ar.forEach((item: any) => {
                    newMap.set(item[compareField].name, ar.filter((i:any) => i[compareField].name == item[compareField].name))
                })}
            let result:any[] = []

            newMap.forEach((value:any, key) => {
                return result.push(Object.assign({service_option: key}, ...value.map((i:any, index:number) => ({[`service_subtype_${index}`]: i.amount}))))
            })
            return result
        }
        console.log(props, history);
        let data: any[] | any = []
        if (!userStore.isAdmin) {
            console.log('not admin');

            if (props.params.id && !history) {
                let tempId = props.params.id || userStore.myProfileData.company?.id
                const { data: dataEvac } = await agent.Price.getCurentCompanyPriceEvac(tempId);
                const { data: dataTire } = await agent.Price.getCurentCompanyPriceTire(tempId);
                const { data: dataWash } = await agent.Price.getCurentCompanyPriceWash(tempId);
                console.log('есть ID');
                runInAction(() => {
                    this.currentPrice = {
                    tabs: [{
                        label: 'Мойка', data: dataWash,
                        dataTable: dataWash
                    }, { label: 'Эвакуация', data: dataEvac, dataTable: mapEd(dataEvac.evacuation_positions, 'service_option') }, { label: 'Шиномонтаж', data: dataTire, dataTable: dataTire }]
                }
                this.loading = false
            })
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
                    this.loading = false
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
                        console.log(data);
                        console.log(dataResults, status);
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
                    const { data: dataResults, status } = await agent.Price.getAllPrice(paramsStore.qParams as PaginationProps)
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
                }
            }

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
        this.updatePrices()
        .then((r) => {
            console.log('success', r)
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
                                className: 'my-notification-class z-[9999] absolute top-12 right-12',
                                loading: false,
                            });
                            this.clearPriceOnChange()
                        } else {
                            notifications.show({
                                id: 'car-created',
                                withCloseButton: true,
                                // onClose: () => console.log('unmounted'),
                                // onOpen: () => console.log('mounted'),
                                autoClose: 5000,
                                title: "Ошибка",
                                message: 'Прайс не удалось обновить',
                                color: 'red',
                                className: 'my-notification-class z-[9999]',
                                style: { backgroundColor: 'red' },
                                loading: false,
                            });
                        }}
                    }, 2000)})

        })}
    // @ts-ignore
    handleChangeAmount({label, price_id, company_id, initValue, amount, id}) {

        if(!initValue) {
            // @ts-ignore
            this.priceOnChange.set(id.toString(), {amount: amount, label: label, price_id: price_id, company_id, id: id})
        } else {
            this.priceOnChange.delete(id.toString())
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
