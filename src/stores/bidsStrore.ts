import { action, autorun, flow, makeAutoObservable, observable, reaction, runInAction, values as val, values, when } from "mobx";
import agent, { client, PaginationProps } from "utils/agent";
import catalogStore from "stores/catalogStore";
import { makePersistable } from "mobx-persist-store";
import usersStore from "stores/usersStore";
import carStore from "stores/carStore";
import companyStore, { CompanyType } from "stores/companyStore";
import { CurrentBidProps } from "stores/types/bidTypes";
import userStore from "stores/userStore";
import appStore from "stores/appStore";
import paramsStore from "stores/paramStore";
import authStore from "stores/authStore";

export enum BidsStatus {
    'Ждет оплаты',
    'Новая' = 1,
    'В обработке' = 2,
    'Ожидает' = 3,
    'Согласовано' = 4,
    'В работе' = 5,
    'Выполнена' = 6,
    'Разбор' = 7,
    'Отмена' = 8,
    'Завершена' = 9
}

export type ReverseEnum = {[K in keyof typeof BidsStatus as typeof BidsStatus[K]]: K}
type EnumKeyFromValue = typeof BidsStatus[ReverseEnum[1]]
const clone = (obj:any) => JSON.parse(JSON.stringify(obj))
export interface BidPhoto {
    "id": number,
    "is_before": boolean,
    "foto": string,
    "created": string,
    "bid": null | string
}
export interface ResultsProps    {
        address: string | null
        address_from?: string  | null
        address_to?: string  | null
        company: number | null
        lat_from?: number  | null
        lon_from?: number  | null
        lat_to?: number  | null
        lon_to?: number  | null
        is_parking: boolean | null
        conductor: number
        important: {
            label?: string
            value?: string
        }  | null
        car: number
        phone: string  | null
        parking:  {
            label?: string  | null
            value?: string  | null
        }  | null
        secretKey:  {
            label?: string  | null
            value?: string  | null
        }  | null
        customer_comment: string  | null
        service_type: number
        service_option: number[]|[]
        service_subtype: number
        city: number
        time:  {
            label?: string  | null
            value?: string  | null
        }  | null
        performer: number
        fotos: BidPhoto[]
    }
export const initialResult: ResultsProps = {
    address: null,
    city: 0,
    address_from: "",
    address_to: "",
    company: 0,
    conductor: 0,
    lat_from: 0,
    lon_from: 0,
    lat_to: 0,
    lon_to: 0,
    car: 0,
    important: null,
    secretKey: null,
    phone: '',
    customer_comment: null,
    service_type: 0,
    parking: null,
    service_option: [],
    service_subtype: 0,
    is_parking: null,
    time: null,
    performer: 0,
    fotos: []
}
interface PhotosProps {
    photos: number| null
    photosPreview: string | ArrayBuffer | null
    photosPreviewAr: any[]
}

export class BidsStore {
    bids = []
    loading = false
    loadedPhoto:BidPhoto[] = []
    photo: PhotosProps = {
        photos: null,
        photosPreview: null,
        photosPreviewAr: [],
    }
    activeTab:string | null = null;
    modalState:boolean = false;
    img: FormData = new FormData()
    refreshBids: boolean = false
    error = ''
    bidPageData = new Map([])
    textData = {
        title: 'Заявки',
        create: 'Создать',
        loadExcel: 'Сохранить Excel',
        tableHeaders: [
            { label: '№', name: 'idnum' },
            { label: 'Статус', name: 'status' },
            { label: 'Дата/Время', name: 'created' },
            { label: 'Клиент', name: 'company' },
            { label: 'Партнер', name: 'performer' },
            { label: 'Водитель', name: 'conductor' },
            { label: 'Исполнитель', name: 'executor' },
            { label: 'ТС', name: 'car' },
            { label: 'Город', name: 'city__name' },
            { label: 'Услуга', name: 'service_type' },
        ],
        createPageBack: 'Назад к списку заявок',
        createPage: 'Создать заявку',
        editPage: 'Редактировать заявку',
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
                    label: 'Город Клиента',
                    name: 'city',
                    type: 'select',
                    value: 0,
                    required: true,
                    placeholder: 'Выберите город Клиента',
                    defaultValue: '1',
                },
                {
                    label: 'Клиент',
                    name: 'customer',
                    type: 'select',
                    value: 0,
                    required: true,
                    placeholder: 'Выберите город Клиента',
                    defaultValue: '1',
                },
                {
                    label: 'Пользователь',
                    name: 'user',
                    type: 'select',
                    options: [],
                    required: true,
                    placeholder: 'Выберите город Клиента',
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
                    placeholder: 'Выберите город Клиента',
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
                    placeholder: 'Выберите город Клиента',
                    defaultValue: '1',
                },
                {
                    label: 'Тип услуги',
                    name: 'service_subtype',
                    type: 'select',
                    value: 0,
                    required: true,
                    placeholder: 'Выберите город Клиента',
                    defaultValue: '1',
                },
                {
                    label: 'Дополнительные опции',
                    name: 'options',
                    type: 'checkbox',
                    required: true,
                    placeholder: 'Выберите город Клиента',
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
                    placeholder: 'Выберите город Клиента',
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
                        { value: 'есть секретка и ключ', label: 'есть секретка и ключ' },
                        { value: 'есть секретка и нет ключа', label: 'есть секретка и нет ключа' },
                        { value: 'нет секретки', label: 'нет секретки' },
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
            title: 'Шаг 4. Выбор Партнера',
            description: 'Город Партнера определяется автоматически. При необходимости вы можете изменить город.',
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
    currentBidPhotos = observable.array([])
    justCreatedBid:any = {}
    eventCounts: any = observable.object({})
    eventCountsState: boolean = false
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
        makePersistable(this, {
            name: 'bidsStore',
            properties: ['formResult', 'bids', 'loadedPhoto', 'currentBidPhotos', 'photo', 'currentPerformers', 'justCreatedBid', 'currentBid', 'refreshBids'],
            storage: window.localStorage,
        }, {fireImmediately: true})

        reaction(
            () => this.formResult.company,
            (customer, oldCustomer) => {
                if(authStore.userIsLoggedIn) {
                    if (customer !== "0" && customer !== 0 && customer !== null) {
                        console.log(customer);
                        runInAction(async () => {
                       userStore.myProfileState.company.company_type !== CompanyType.fizlico && await usersStore.getUsers(customer)
                            await carStore.getCarsByCompony(customer)
                            await companyStore.getCustomerCompanyData(customer)
                        })
                    }
                    if (customer === 0) {
                        this.formResult = observable.object(initialResult)
                    }
                }
            },
        )
        autorun(() => {
            if(this.justCreatedBid.id) {
                console.log('justCreated exist');
                if(!window.location.pathname.includes('bids/create')) {
                    this.formResultsClear()
                    this.justCreatedBid = {}
                }
            }
        })
        // autorun(() => {
        //     if(this.currentBid.id) {
        //         console.log('refresh', window.location.pathname.includes(`bids\'`));
        //         if (window.location.pathname.includes(`bids\'`)) {
        //             console.log('includes(\'bids\')');
        //             setTimeout(() => {
        //                 this.loadAllBids(paramsStore.qParams)
        //                 runInAction(() => this.refreshBids = false)
        //             }, 5000)
        //             runInAction(() => this.refreshBids = true)
        //         } else {
        //             runInAction(() => this.refreshBids = true)
        //         }
        //     }
        // })

        reaction(() => this.formResult.conductor,
            async (conductor)=> {
                if(conductor !== "0" && conductor !== null && conductor !== 0) {
                    //@ts-ignore
                    // runInAction(() => {
                    //     this.formResult.phone === usersStore.companyUsers.filter((user:any) => user.employee.id === this.formResult.conductor)[0].employee.phone
                    // });
                    await carStore.getCarsByCompony(this.formResult.company);
                }
            }
        )
        reaction(
            () => this.formResult.service_subtype,
            async (subtype) => {
                // console.log('changed', this.formResult, subtype)
                this.formResult.service_option = [];
                if (subtype !== "0" && subtype && this.formResult.company && this.formResult.car !== 0 && this.formResult.car !== null && this.formResult.service_option) {
                    // console.log('changed', this.formResult, subtype)
                        await this.loadServiceSubtypeOptions(subtype)
                    console.log('changed', this.formResult, subtype, this.formResult.service_option);

                    // if(this.formResult.company !== "0" && this.formResult.car !== "0" && this.formResult.car !== 0 && this.formResult.car !== null) {
                    //     this.loadCurrentPerformers(Number(this.formResult.company), {
                    //         car_id: this.formResult.car,
                    //         subtype_id: this.formResult.service_subtype,
                    //         options_idx: this.formResult.service_option
                    //     })
                    // }
                }
                if(subtype === 0) {
                    action(() => catalogStore.currentServiceSubtypesOptions  = new Map([]))
                }
            },
        )
        // reaction(() => this.formResult.service_option, async (options) => {
        //   if(options) {
        //     if (this.formResult.car !== "0" && this.formResult.car !== null  && this.formResult.service_subtype !== "0" && this.formResult.service_subtype !== 0 && this.formResult.service_subtype !== null) {
        //           await this.loadCurrentPerformers(Number(this.formResult.company), {
        //               car_id: this.formResult.car,
        //               subtype_id: this.formResult.service_subtype,
        //               options_idx: this.formResult.service_option
        //           })
        //       }
        //   }
        // })
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
                this.formResult.service_option = [];
                this.formResult.service_subtype = 0;
                if (service && service !== 0) {
                    await catalogStore.getServiceSubtypes(service)
                }
            },
        )
    }
    setEventCount(value:boolean) {
        this.eventCountsState = value
    }
    get getEventCount() {
        return ({
            data: this.eventCounts,
            isLoading: this.eventCountsState
        })
    }
    async loadEventCount() {
        if(authStore.userIsLoggedIn && appStore.token !== "") {
            this.setEventCount(true)
            try {
                if(appStore.appType === "admin") {
                    const {data, status}:any = await agent.Bids.getBidCountAdmin()
                    console.log(data, status);
                    runInAction(() => this.eventCounts = data)
                }
                if(appStore.appType === "customer") {
                    const {data, status}:any = await agent.Bids.getBidCountCustomer(userStore.myProfileData.company.id)
                    runInAction(() => this.eventCounts = data)
                }
                if(appStore.appType === "performer") {
                    const {data, status}:any = await agent.Bids.getBidCountPerformer(userStore.myProfileData.company.id)
                    runInAction(() => this.eventCounts = data)
                }
            } catch (e) {
                console.log(e);
            }
            this.setEventCount(true)
        }
    }
    get ActiveTab() {
        return this.activeTab
    }
    setActiveTab(label:string | null) {
        // console.log(label);
        this.activeTab = label
        // console.log(this.activeTab);
    }
    get modalCurrentState() {
        return this.modalState
    }
    setModalCurrentState(state:boolean) {
        // console.log(label);
        this.modalState = state
        // console.log(this.activeTab);
    }

    async loadBidByCompanyAndBidId(company_id?: number, bid_id?: number) {
        const { data, status } = await agent.Bids.getBid(company_id ? company_id : this.justCreatedBid.company, bid_id ? bid_id : this.justCreatedBid.id);

        if (status === 200) {
            runInAction(() => {
                if(this.currentBid.status !== data.status && this.currentBid.id === data.id) {
                    this.currentBid = data
                    if(company_id && bid_id) {
                        this.loadBidPhotos(company_id, bid_id)
                    }
                }
                if(this.currentBid.id !== data.id) {
                    this.currentBid = data
                    if(company_id && bid_id) {
                        this.loadBidPhotos(company_id, bid_id)
                    }
                }
            })
        }

    }
    get CurrentBid() {
        return this.currentBid
    }
    get CurrentBidPhotos() {
        return this.currentBid.photos
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
    async updateBitStatus(company_id:number|string, bid_id:number|string, bidStatus: BidsStatus, fotos?: number[]) {
        const { data:dataStatus, status }:any = await agent.Bids.updateBidStatus(Number(company_id), Number(bid_id), bidStatus, fotos)
        if (status === 200) {
            return ({
                data: dataStatus.status
            })
        }
    }
    get AvailablePerformers() {
        return this.currentPerformers
    }
    removeFile(company_id: number|string, id: number | string) {
        runInAction(() => {
            const targetToDelete = this.loadedPhoto.findIndex((e) => e.id === id)
            this.loadedPhoto.splice(targetToDelete, 1);
            agent.Img.deleteBidPhoto(company_id, id).then((res) => console.log(res))
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
    async sendFiles(files: File[], state: boolean, bid_id?: string, company_id?: string) {
        console.log(files, state, bid_id, company_id);
        async function* uploadFiles(this: BidsStore) {
            let i = 0;
            let result: any = null;
            while (i < files.length) {
                const formData = new FormData();
                let el = new File([files[i]], files[i].name, { type: 'image/jpeg' })
                formData.set(`foto`, el)
                formData.append(`is_before`, state ? 'true' : 'false');
                if(bid_id) {
                    formData.append(`bid`, bid_id);
                }
                await agent.Img.uploadFiles(formData, company_id ? company_id : this.formResult.company).then((res) => result = res).catch((e) => console.log(e));
                yield result
                i++;
            }
        }
        await (async () => {
            for await (const result of uploadFiles.call(this)) {
                if (result && result.data) {
                    this.loadedPhoto.push(result.data);
                }
            }
            this.formResultSet({ fotos: this.loadedPhoto.map((item: BidPhoto) => Number(item.id)) })
        })();
    }
    get getPhotos() {
        return this.loadedPhoto
    }
    clearPhotos() {
        this.loadedPhoto = []
    }
    get PhotoId() {
        if(this.loadedPhoto.length > 0) {
            return this.loadedPhoto.map((item: BidPhoto) => Number(item.id))
        }
        return []
    }
    async uploadPhotos(state: boolean, company_id?: string, bid_id?: string) {
        const res = await agent.Img.uploadFiles(this.img, bid_id ? bid_id : this.justCreatedBid.id);
        console.log(res);
        // if (res.status < 301) {
        //     this.photo.photosPreviewAr.forEach((item: any) => {
        //         agent.Img.createBidPhoto(bid_id ? bid_id : this.justCreatedBid.id, company_id ? company_id : this.justCreatedBid.company, item.name, state).then((res_1) => console.log("resCreatePhoto", res_1));
        //     });
        // }
        return res;
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
    async loadAllBids(params?:any) {

        try {
            action(() => (this.loading = true))
            if(appStore.appType === "admin") {
                const { data, status } = await agent.Bids.getAllBids({...paramsStore.currentParams, ...params})
                if (status === 200) {
                    runInAction(() => {
                        this.bids = data
                    })
                }
            } else {
                const { data, status } = await agent.Bids.getAllCompanyBids(userStore.myProfileData.company.id, paramsStore.currentParams)
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
     loadBidPhotos = flow(function* (this: BidsStore, company_id: number|string, bid_id: number|string) {
        // const urlParams = window.location.pathname.split('/');
        // const newCompany_id = urlParams[3];
        // const newBid_id = urlParams[4];
        let resData:any = null
        // if((company_id && bid_id) || (newCompany_id && newBid_id)) {
        const {data, status} = yield agent.Bids.loadBidPhotos(company_id, bid_id)
         console.log('loadBidPhotos', data, status);

         if(status < 300) {
             resData = data
             this.currentBidPhotos = data.results
         }

        return resData
    })
    async formCreateBid() {
        runInAction(() => this.justCreatedBid = {})
        if(this.formResult.company) {
            const res:any = await agent.Bids.createBid(this.formResult.company, {
                address_from: this.formResult.address_from,/**/
                address_to: this.formResult.address_to,/**/
                car: this.formResult.car,/**/
                city: this.formResult.city,/**/
                company: this.formResult.company,/**/
                conductor: this.formResult.conductor,/**/
                keys: this.formResult.secretKey?.value,/**/
                customer_comment: this.formResult.customer_comment,/**/
                is_parking: this.formResult.parking?.value === "true",/**/
                schedule: this.formResult.time,
                lat_from: this.formResult.lat_from,/**/
                lat_to: this.formResult.lat_to,/**/
                lon_from: this.formResult.lon_from,/**/
                lon_to: this.formResult.lon_to,/**/
                performer: this.formResult.performer,/**/
                phone: this.formResult.phone.replaceAll(" ", ""),/**/
                service_option: this.formResult.service_option,/**/
                service_subtype: this.formResult.service_subtype,/**/
                service_type: this.formResult.service_type,/**/
                truck_type: this.formResult.truck_type,/**/
                fotos: this.PhotoId,
                wheel_lock: Number(this.formResult.tire_destroyed)
                /**/
            })

            if(res.status === 201) {
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
    get CurrentBidPhotosAll() {
        return this.currentBidPhotos
    }
    formResultsClear() {
        this.currentBid  = observable.object<CurrentBidProps>({} as CurrentBidProps)
        this.formResult = observable.object(initialResult);
        this.currentPerformers.clear()
        this.currentPerformers = new Map([])
        this.photo = {
            photos: null,
            photosPreview: null,
            photosPreviewAr: [],
        }
        this.img = new FormData()
    }
    formResultSet(value: any) {
        this.formResult = {
            ...this.formResult,
            ...value,
        }
    }
    async loadBid(company_id: number, bid_id: number) {
        const photos = await agent.Bids.loadBidPhotos(company_id, bid_id).then(r => r.data)
        const bid = await agent.Bids.getBid(company_id, bid_id).then(r => r.data)
        const _res = {
            ...bid,
            photos: photos,
        }
        return _res
    }
    loadBids(args:any) {
        console.log(args);
        if(appStore.appType === "admin") {
            return client.bidsAllBidsList(args)
        } else {
            return client.bidsList({company_id: userStore.myProfileData.company.id, ...args})
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
