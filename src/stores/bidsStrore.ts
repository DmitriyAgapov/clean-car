import { action, autorun, makeAutoObservable, observable, reaction, runInAction, values as val, values, when } from "mobx";
import agent, { CreateBidData, PaginationProps } from "utils/agent";
import catalogStore, { CatalogStore } from "stores/catalogStore";
import { makePersistable, hydrateStore, clearPersistedStore, StorageController } from "mobx-persist-store";
import usersStore from "stores/usersStore";
import carStore from "stores/carStore";
import companyStore from "stores/companyStore";
import { CurrentBidProps } from "stores/types/bidTypes";
import userStore from "stores/userStore";
export enum BidsStatus  {
	'Новая' = 'Новая',
	'Отменена' = 'Отменена',
	'Ждет подтверждение' = 'Ждет подтверждение',
	'Обрабатывается' = 'Обрабатывается',
	'Разбор' = 'Разбор',
	'В работе' = 'В работе',
	'Выполнено' = 'Выполнено',
	'Завершена' = 'Завершена',
	'Подтверждена'	 = 'Подтверждена',
	'Решено'	 = 'Решено',
}
const clone = (obj:any) => JSON.parse(JSON.stringify(obj))
export interface ResultsProps
    {
        address: string
        company: number | null
        conductor: number
        important: {
            label?: string
            value?: string
        }
        car: number
        phone: string
        parking:  {
            label?: string
            value?: string
        }
        secretKey:  {
            label?: string
            value?: string
        }
        customer_comment: string
        service_type: number
        service_option: number[]|[]
        service_subtype: number
        city: number
        time:  {
            label?: string
            value?: string
        }
        performer: number

    }

export const initialResult: ResultsProps = {
    address: '',
    company: null,
    conductor: 0,
    car: 0,
    important: {
        label: '',
        value: '',
    },
    secretKey: {
        label: '',
        value: 'true',
    },
    phone: '',
    customer_comment: '',
    service_type: 0,
    parking: {
        label: '',
        value: 'true',
    },
    service_option: [],
    service_subtype: 0,
    city: 0,
    time: {
        label: '',
        value: '',
    },
    performer: 0,
}
export class InitialResult {
    constructor() {}
    address = ''
    company = 0
    conductor = 0
    car = 0
    important = {
        label : '',
        value : ''
    }
    secretKey =  {
        label: '',
        value: 'true',
    }
    phone = ''
    customer_comment = ''
    service_type = 0
    parking = {
        label: '',
        value: 'true',
    }
    service_option = []
    service_subtype = 0
    city = 0
    time = {
        label: '',
        value: '',
    }
    performer = 0
}

interface PhotosProps {
    photos: number| null
    photosPreview: string | ArrayBuffer | null
    photosPreviewAr: []
}

export class BidsStore {
    bids = []
    loading = false
    photo: PhotosProps = {
        photos: null,
        photosPreview: null,
        photosPreviewAr: [],
    }
    error = ''
    bidPageData = new Map([])
    textData = {
        title: 'Заявки',
        create: 'Создать',
        loadExcel: 'Загрузить Excel',
        tableHeaders: [
            { label: '№', name: 'order' },
            { label: 'Статус', name: 'status' },
            { label: 'Дата/Время', name: 'date' },
            { label: 'Заказчик', name: 'customer' },
            { label: 'Партнер', name: 'partner' },
            { label: 'Пользователь', name: 'user' },
            { label: 'ТС', name: 'number' },
            { label: 'Город', name: 'city' },
            { label: 'Услуга', name: 'service' },
        ],
        createPageBack: 'Назад к списку заявок',
        createPage: 'Создать заявку',
        fillTemplate: 'Заполнить шаблон',
    }
    cities = catalogStore.cities
    currentPerformers = new Map([])
    formResult: any = observable.object(initialResult)
    formData = {
        step1: {
            title: 'Шаг 1. Основная информация',
            description: 'Укажите основную информацию о заявке',
            fields: [
                {
                    label: 'Город Заказчика',
                    name: 'city',
                    type: 'select',
                    value: 0,
                    required: true,
                    placeholder: 'Выберите город заказчика',
                    defaultValue: '1',
                },
                {
                    label: 'Заказчик',
                    name: 'customer',
                    type: 'select',
                    value: 0,
                    required: true,
                    placeholder: 'Выберите город заказчика',
                    defaultValue: '1',
                },
                {
                    label: 'Пользователь',
                    name: 'user',
                    type: 'select',
                    options: [],
                    required: true,
                    placeholder: 'Выберите город заказчика',
                    defaultValue: '1',
                },
                {
                    label: 'Номер телефона для связи',
                    name: 'phone',
                    type: 'text',
                    required: true,
                    placeholder: 'Введите номер телефона',
                },
                {
                    label: 'Автомобиль, марка, номер',
                    name: 'car',
                    type: 'select',
                    options: [],
                    required: true,
                    placeholder: 'Выберите город заказчика',
                    defaultValue: '1',
                },
            ],
        },
        step2: {
            title: 'Шаг 2. Детальная информация по услуге',
            description: 'Выберите услугу, тип и дополнительные опции (при наличии и необходимости) ',
            fields: [
                {
                    label: 'Услуга',
                    name: 'service_type',
                    type: 'select',
                    value: 0,
                    required: true,
                    placeholder: 'Выберите город заказчика',
                    defaultValue: '1',
                },
                {
                    label: 'Тип услуги',
                    name: 'service_subtype',
                    type: 'select',
                    value: 0,
                    required: true,
                    placeholder: 'Выберите город заказчика',
                    defaultValue: '1',
                },
                {
                    label: 'Дополнительные опции',
                    name: 'options',
                    type: 'checkbox',
                    required: true,
                    placeholder: 'Выберите город заказчика',
                    defaultValue: '1',
                },
                {
                    label: 'Номер телефона для связи',
                    name: 'phone',
                    type: 'text',
                    required: true,
                    placeholder: 'Введите номер телефона',
                },
                {
                    label: 'Автомобиль, марка, номер',
                    name: 'car',
                    type: 'select',
                    options: [],
                    required: true,
                    placeholder: 'Выберите город заказчика',
                    defaultValue: '1',
                },
            ],
        },
        step3: {
            title: 'Шаг 3. Дополнительная информация',
            description: 'Укажите информацию ',
            fields: [
                {
                    label: 'Куда подъехать?',
                    name: 'address',
                    type: 'text',
                    value: 0,
                    required: true,
                    placeholder: 'Адрес',
                },
                {
                    label: 'Есть ли парковочное место?',
                    name: 'parking',
                    type: 'select',
                    value: 0,
                    options: [
                        { value: 'true', label: 'Да' },
                        { value: 'false', label: 'Нет' },
                    ],
                    required: true,
                    defaultValue: 'true',
                },
                {
                    label: 'Секретка и ключ',
                    name: 'options',
                    type: 'select',
                    required: true,
                    //TODO: Варианты какие еще могут быть
                    options: [
                        { value: 'true', label: 'Есть секретка и ключ' },
                        { value: 'false', label: 'Нет секретки и ключа' },
                    ],
                    defaultValue: 'true',
                },
                {
                    label: 'Важность',
                    name: 'phone',
                    type: 'text',
                    required: true,
                    //TODO: Варианты какие еще могут быть
                    defaultValue: 'time',
                    options: [
                        { value: 'time', label: 'По времени' },
                        { value: 'fast', label: 'Побыстрее' },
                    ],
                    placeholder: 'Введите номер телефона',
                },
                {
                    label: 'Выберите время',
                    name: 'car',
                    type: 'time',
                    required: true,
                },
            ],
        },
        step4: {
            title: 'Шаг 4. Выбор исполнителя',
            description: 'Город Исполнителя определяется автоматически. При необходимости вы можете изменить город.',
            fields: [
                {
                    label: 'Город',
                    name: 'address',
                    type: 'text',
                    value: 0,
                    required: true,
                    placeholder: 'Адрес',
                },
                {
                    label: 'Партнер',
                    name: 'performer',
                    type: 'select',
                    value: 0,
                    options: [
                        { value: 'true', label: 'Да' },
                        { value: 'false', label: 'Нет' },
                    ],
                    required: true,
                    defaultValue: 'true',
                },
                {
                    label: 'Секретка и ключ',
                    name: 'options',
                    type: 'select',
                    required: true,
                    //TODO: Варианты какие еще могут быть
                    options: [
                        { value: 'true', label: 'Да' },
                        { value: 'false', label: 'Нет' },
                    ],
                    defaultValue: 'true',
                },
                {
                    label: 'Важность',
                    name: 'phone',
                    type: 'text',
                    required: true,
                    //TODO: Варианты какие еще могут быть
                    defaultValue: 'time',
                    options: [
                        { value: 'time', label: 'По времени' },
                        { value: 'Option 2', label: 'Нет' },
                    ],
                    placeholder: 'Введите номер телефона',
                },
                {
                    label: 'Выберите время',
                    name: 'car',
                    type: 'time',
                    required: true,
                },
            ],
        },
        step5: {
            title: 'Шаг 5. Заявка сформирована',
            description: 'Проверьте заявку и если все введено корректно вы можете оплатить',
        },
    }
    currentBid:CurrentBidProps  = observable.object<CurrentBidProps>({} as CurrentBidProps)
    justCreatedBid:any = {}
    tempDataPerformers = {
        count: 2,
        next: null,
        previous: null,
        results: [
            {
                id: 8,
                name: 'Исполнитель Москва',
                city: {
                    id: 1619,
                    name: 'Москва',
                },
                performerprofile: {
                    address: 'г Москва, Варшавское шоссе, д 1 стр 2',
                    contacts: 'вавыаыва',
                    service_percent: 12,
                    working_time: '',
                    lat: 55.704022,
                    lon: 37.625603,
                },
                amount: 1000.0,
            },
            {
                id: 2,
                name: 'ООО Рогоносец',
                city: {
                    id: 1619,
                    name: 'Москва',
                },
                performerprofile: {
                    address: 'г Москва, Дербеневская наб, д 2',
                    contacts: '++153618674641',
                    service_percent: 12,
                    working_time: '',
                    lat: 55.727582,
                    lon: 37.653451,
                },
                amount: 1000.0,
            },
            {
                id: 2,
                name: 'ООО Рогоносец',
                city: {
                    id: 1619,
                    name: 'Москва',
                },
                performerprofile: {
                    address: 'г Москва, Дербеневская наб, д 2',
                    contacts: '++153618674641',
                    service_percent: 12,
                    working_time: '',
                    lat: 55.627582,
                    lon: 37.553451,
                },
                amount: 1000.0,
            },
            {
                id: 2,
                name: 'ООО Рогоносец',
                city: {
                    id: 1619,
                    name: 'Москва',
                },
                performerprofile: {
                    address: 'г Москва, Дербеневская наб, д 2',
                    contacts: '++153618674641',
                    service_percent: 12,
                    working_time: '',
                    lat: 55.947582,
                    lon: 37.753451,
                },
                amount: 1000.0,
            },
        ],
    }
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
        makePersistable(this, {
            name: 'bidsStore',
            properties: ['formResult', 'bids', 'currentPerformers', 'justCreatedBid', 'currentBid'],
            storage: window.localStorage,
        }, {fireImmediately: true})

        reaction(() => this.justCreatedBid.id, (id) => {
            if(id) {
               this.loadBidByCompanyAndBidId()
            }
        })
        reaction(
            () => this.formResult.company,
            (customer, oldCustomer) => {

                if (customer !== 0 && customer !== null) {
                    runInAction(async () => {
                        await usersStore.getUsers(customer)
                        await carStore.getCarsByCompony(customer)
                        await companyStore.getCustomerCompanyData(customer)
                    })
                }
                if(customer === 0) {
                    this.formResult = observable.object(initialResult)
                }
            },
        )

        reaction(
            () => this.formResult.service_subtype,
            async (subtype) => {
                // console.log('changed', this.formResult, subtype)
                if (subtype !== "0" && subtype && this.formResult.company && this.formResult.car !== 0 && this.formResult.service_option) {
                    // console.log('changed', this.formResult, subtype)
                    await this.loadServiceSubtypeOptions(subtype)
                     this.loadCurrentPerformers(Number(this.formResult.company), {
                        car_id: this.formResult.car,
                        subtype_id: this.formResult.service_subtype,
                        options_idx: this.formResult.service_option
                    })
                }

                if(subtype === 0) {
                    action(() => catalogStore.currentServiceSubtypesOptions  = new Map([]))
                }
            },
        )
        reaction(
            () => this.formResult.service_type,
            async (service) => {
                if (service && service !== 0) {
                    await catalogStore.getServiceSubtypes(service)
                    runInAction(() => (catalogStore.currentService = service))
                }
            },
        )
        reaction(
            () => this.formResult.service_type,
            async (service) => {
                if (service && service !== 0) {
                    await catalogStore.getServiceSubtypes(service)
                }
            },
        )

    }
    async loadBidByCompanyAndBidId(company_id?: number, bid_id?: number) {
        const { data, status } = await agent.Bids.getBid(company_id ? company_id : this.justCreatedBid.company, bid_id ? bid_id : this.justCreatedBid.id);
        if (status === 200) {
            runInAction(() => {
                this.currentBid = data
            })
        }
    }
    get CurrentBid() {
        return this.currentBid
    }

    async loadServiceSubtypeOptions(service_subtype_id: number) {
        const { data, status } = await agent.Catalog.getServiceSubtypeOptions(service_subtype_id)
        if (status === 200) {
            catalogStore.currentServiceSubtypesOptions = new Map([])
            data.results.forEach((i: any) =>
                runInAction(() => {
                    catalogStore.currentServiceSubtypesOptions.set(String(i.id), i)
                }),
            )
        }
    }
    async loadCurrentPerformers(customer_id: number, data: { car_id: number, subtype_id: number, options_idx: number[] }) {
        this.currentPerformers.clear()
        const { data:performers, status }:any = await agent.Bids.getAvailablePerformers(customer_id, {
            car_id: this.formResult.car,
            subtype_id: this.formResult.service_subtype,
            options_idx: this.formResult.service_option
        })
        if (status === 200) {
            performers.results.length > 0 && performers.results.forEach((i: any) => runInAction(() => this.currentPerformers.set(String(i.id), i)))
        }
    }
    async updateBitStatus(company_id:number|string, bid_id:number|string, bidStatus: BidsStatus) {
        const { data:dataStatus, status }:any = await agent.Bids.updateBidStatus(Number(company_id), Number(bid_id), bidStatus)
        if (status === 200) {
            return ({
                data: dataStatus.status
            })
        }
    }
    get AvailablePerformers() {
        return this.currentPerformers
    }
    removeFile(index: number) {
        runInAction(() => {
            this.photo.photosPreviewAr.splice(index, 1)
        })
    }
    addFile(file: any[]) {
        const fd: any[] = []
        function readFileAsText(file: any) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onload = () => resolve(reader.result)
                reader.onerror = reject
            })
        }
        file.forEach((item: any) => {
            fd.push(readFileAsText(item))
        })
        Promise.all(fd).then((res: any) => runInAction(() => (this.photo.photosPreviewAr = res)))
    }
    uploadPhotos(ar:any) {
        console.log(ar)
    }
    initResults() {
            this.formResult.company = 0
            this.formResult.conductor = 0
            this.formResult.car = 0
            this.formResult.phone = ''
            this.formResult.customer_comment = ''
            this.formResult.service_type = 0
            this.formResult.service_option = []
            this.formResult.service_subtype = 0
            this.formResult.city = 0
            this.formResult.performer = 0
            // this.photo.photos = null,
            // this.photo.photosPreview = null,
            // this.photo.photosPreviewAr = []
    }
    async loadAllBids(params: PaginationProps) {
        try {
            action(() => (this.loading = true))
            if(userStore.myProfileData.company.company_type === "Администратор системы") {
                const { data, status } = await agent.Bids.getAllBids(params)
                if (status === 200) {
                    runInAction(() => {
                        this.bids = data
                    })
                }
            } else {
                const { data, status } = await agent.Bids.getAllCompanyBids(userStore.myProfileData.company.id, params)
                if (status === 200) {
                    runInAction(() => {
                        this.bids = data
                    })
                }
            }

        } catch (error: any) {
            this.error = error
        } finally {
            action(() => (this.loading = false))
        }
    }
    async formCreateBid() {
        this.justCreatedBid = {}
        console.log({
            company: this.formResult.company,
            car: this.formResult.car,
            customer_comment: this.formResult.customer_comment,
            conductor: this.formResult.conductor,
            phone: '+7' + this.formResult.phone,
            performer: this.formResult.performer,
            service_option: this.formResult.service_option,
            service_type: this.formResult.service_type,
            service_subtype: this.formResult.service_subtype
        });
        if(this.formResult.company) {
            const res:any = await agent.Bids.createBid(this.formResult.company, {
                company: this.formResult.company,
                car: this.formResult.car,
                customer_comment: this.formResult.customer_comment,
                conductor: this.formResult.conductor,
                phone: '+7' + this.formResult.phone,
                performer: this.formResult.performer,
                service_option: this.formResult.service_option,
                service_type: this.formResult.service_type,
                service_subtype: this.formResult.service_subtype
            })

            if(res.status === 200) {
                //@ts-ignore

                runInAction(() => this.justCreatedBid = res.data)
            }
            return res
        }
    }
    get formDataAll() {
        return this.formData
    }
    get formResultsAll(): ResultsProps {
        return this.formResult
    }

    get text() {
        return this.textData
    }
    formResultsClear() {
        this.currentBid  = observable.object<CurrentBidProps>({} as CurrentBidProps)
        this.formResult = observable.object(initialResult);
        this.currentPerformers.clear()
        this.currentPerformers = new Map([])
    }
    formResultSet(value: any) {
        this.formResult = {
            ...this.formResult,
            ...value,
        }
    }
    get bidsAll() {
        return {
            loading: this.loading,
            error: this.error,
            data: this.bids,
        }
    }
}
const bidsStore = new BidsStore()

export default bidsStore
