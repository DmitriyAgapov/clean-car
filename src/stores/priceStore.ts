import { makeAutoObservable, observable } from 'mobx'
import { makePersistable } from 'mobx-persist-store'
import agent, { PaginationProps } from 'utils/agent'
import paramsStore from 'stores/paramStore'

enum PriceTiresRadius {}
export enum CAR_TP {'легковой', 'внедорожный', 'коммерческий'}
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
        makePersistable(this, { name: 'priceStore', storage: window.sessionStorage, properties: ['prices'] })
    }

    prices: { count: number; next: string | null; previous: string | null; results: any[] } = observable.object({
        next: null,
        count: 0,
        previous: null,
        results: [],
    })
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
            { label: 'Филиал', name: 'root_company' },
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

    async loadPrices(params?: PaginationProps) {
        return await agent.Price.getAllPrice(paramsStore.params)
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
